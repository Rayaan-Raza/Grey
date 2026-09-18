import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { completeEnrollmentPurchase } from "@/lib/orders";
import { getStripe, isStripeDemoMode } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isStripeDemoMode()) {
    return NextResponse.json({
      received: true,
      demo: true,
      message: "Webhook ignored in demo mode",
    });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret || webhookSecret.includes("dummy")) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const courseId = session.metadata?.courseId;
    const amountCents = session.amount_total ?? 0;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "Missing metadata on session" },
        { status: 400 },
      );
    }

    try {
      await completeEnrollmentPurchase({
        userId,
        courseId,
        amountCents,
        stripeSessionId: session.id,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fulfill order";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
