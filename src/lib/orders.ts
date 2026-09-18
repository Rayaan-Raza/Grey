import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || key.includes("REPLACE") || key.includes("dummy")) {
    return null;
  }
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function completeEnrollmentPurchase(input: {
  userId: string;
  courseId: string;
  amountCents: number;
  stripeSessionId: string;
}) {
  const service = createServiceClient();
  const supabase = service ?? (await createClient());

  const { error: orderError } = await supabase.from("orders").upsert(
    {
      user_id: input.userId,
      course_id: input.courseId,
      amount_cents: input.amountCents,
      stripe_session_id: input.stripeSessionId,
      status: "paid",
    },
    { onConflict: "stripe_session_id" },
  );

  if (orderError) throw new Error(orderError.message);

  const { error: enrollError } = await supabase.from("enrollments").upsert(
    {
      user_id: input.userId,
      course_id: input.courseId,
      status: "active",
      progress: 0,
    },
    { onConflict: "user_id,course_id" },
  );

  if (enrollError) throw new Error(enrollError.message);
}
