import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { formatUsd } from "@/lib/money";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("*, course:courses(title, slug)")
    .eq("stripe_session_id", sessionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    order: {
      id: order.id,
      status: order.status,
      amount: formatUsd(order.amount_cents),
      amountCents: order.amount_cents,
      courseTitle:
        (order.course as { title?: string } | null)?.title ?? "Course",
      courseSlug: (order.course as { slug?: string } | null)?.slug ?? null,
      sessionId: order.stripe_session_id,
      createdAt: order.created_at,
    },
  });
}
