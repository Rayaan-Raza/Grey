import { createClient } from "@/lib/supabase/server";
import type { LearnerRow } from "@/lib/supabase/types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") throw new Error("Forbidden");
  return { supabase, user };
}

export async function listLearners(): Promise<LearnerRow[]> {
  const { supabase } = await requireAdmin();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, avatar_url, updated_at, created_at")
    .neq("role", "admin")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("user_id, progress, status");

  return (profiles ?? []).map((p) => {
    const rows = (enrollments ?? []).filter((e) => e.user_id === p.id);
    const progress =
      rows.length === 0
        ? 0
        : Math.round(
            rows.reduce((sum, e) => sum + (e.progress ?? 0), 0) / rows.length,
          );
    const updated = p.updated_at || p.created_at;
    return {
      id: p.id,
      full_name: p.full_name,
      email: null,
      role: p.role,
      avatar_url: p.avatar_url,
      courses: rows.length,
      progress,
      status: rows.some((e) => e.status === "active")
        ? ("Active" as const)
        : ("Inactive" as const),
      lastActive: updated
        ? new Date(updated).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
    };
  });
}
