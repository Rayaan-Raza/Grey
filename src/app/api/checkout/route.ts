import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { completeEnrollmentPurchase } from "@/lib/orders";
import { formatUsd } from "@/lib/money";
import { getStripe, isStripeDemoMode } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { courseId?: string; courseSlug?: string };
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!body.courseId && !body.courseSlug) {
      return NextResponse.json(
        { error: "courseId or courseSlug is required" },
        { status: 400 },
      );
    }

    let courseQuery = supabase.from("courses").select("*");
    courseQuery = body.courseId
      ? courseQuery.eq("id", body.courseId)
      : courseQuery.eq("slug", body.courseSlug!);

    const { data: course, error: courseError } = await courseQuery.maybeSingle();
    if (courseError) throw new Error(courseError.message);
    if (!course || course.status !== "published") {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const origin = new URL(request.url).origin;
    const amountCents = course.price_cents ?? 0;

    // Free course or dummy Stripe key → enroll immediately (swap keys to use real Stripe)
    if (amountCents === 0 || isStripeDemoMode()) {
      const sessionId = `demo_${crypto.randomUUID()}`;
      await completeEnrollmentPurchase({
        userId: user.id,
        courseId: course.id,
        amountCents,
        stripeSessionId: sessionId,
      });

      return NextResponse.json({
        mode: isStripeDemoMode() && amountCents > 0 ? "demo" : "free",
        url: `${origin}/checkout/success?session_id=${sessionId}&course=${course.slug}`,
        amount: formatUsd(amountCents),
        courseTitle: course.title,
      });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email ?? undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: course.title,
              description: course.description ?? undefined,
              images: course.image_url?.startsWith("http")
                ? [course.image_url]
                : undefined,
            },
          },
        },
      ],
      metadata: {
        userId: user.id,
        courseId: course.id,
        courseSlug: course.slug,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&course=${course.slug}`,
      cancel_url: `${origin}/checkout?course=${course.slug}&canceled=1`,
    });

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      course_id: course.id,
      amount_cents: amountCents,
      stripe_session_id: session.id,
      status: "pending",
    });

    if (orderError) throw new Error(orderError.message);
    if (!session.url) throw new Error("Stripe did not return a checkout URL");

    return NextResponse.json({
      mode: "stripe",
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
