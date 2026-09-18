import { createClient } from "@/lib/supabase/server";
import type { Workshop, WorkshopWithMeta } from "@/lib/supabase/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, user };
}

async function requireAdmin() {
  const { supabase, user } = await requireUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") throw new Error("Forbidden");
  return { supabase, user };
}

export async function listPublishedWorkshops(): Promise<WorkshopWithMeta[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("workshops")
    .select("*")
    .eq("status", "published")
    .order("starts_at", { ascending: true });

  if (error) throw new Error(error.message);

  const workshops = (data ?? []) as Workshop[];
  if (workshops.length === 0) return [];

  const ids = workshops.map((w) => w.id);
  const { data: regs } = await supabase
    .from("workshop_registrations")
    .select("workshop_id, user_id")
    .in("workshop_id", ids);

  return workshops.map((w) => {
    const rows = (regs ?? []).filter((r) => r.workshop_id === w.id);
    return {
      ...w,
      registered_count: rows.length,
      registered_by_me: user
        ? rows.some((r) => r.user_id === user.id)
        : false,
    };
  });
}

export async function listAllWorkshops(): Promise<Workshop[]> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("workshops")
    .select("*")
    .order("starts_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Workshop[];
}

export async function registerForWorkshop(workshopId: string) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("workshop_registrations")
    .upsert(
      { user_id: user.id, workshop_id: workshopId },
      { onConflict: "user_id,workshop_id" },
    )
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createWorkshop(input: {
  title: string;
  slug: string;
  description?: string;
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
  location?: string;
  status?: Workshop["status"];
}) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("workshops")
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description ?? null,
      starts_at: input.starts_at ?? null,
      ends_at: input.ends_at ?? null,
      capacity: input.capacity ?? null,
      location: input.location ?? "Online",
      status: input.status ?? "draft",
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Workshop;
}
