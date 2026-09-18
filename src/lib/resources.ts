import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/supabase/types";

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

export async function listVisibleResources(): Promise<Resource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Resource[];
}

export async function listAllResources(): Promise<Resource[]> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Resource[];
}

export async function createResource(input: {
  title: string;
  description?: string;
  file_url?: string;
  resource_type?: Resource["resource_type"];
  category?: string;
  is_public?: boolean;
  course_id?: string;
  file_size?: string;
}) {
  const { supabase, user } = await requireAdmin();
  const { data, error } = await supabase
    .from("resources")
    .insert({
      title: input.title,
      description: input.description ?? null,
      file_url: input.file_url ?? null,
      resource_type: input.resource_type ?? "document",
      category: input.category ?? null,
      is_public: input.is_public ?? false,
      course_id: input.course_id ?? null,
      file_size: input.file_size ?? null,
      uploaded_by: user.id,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Resource;
}
