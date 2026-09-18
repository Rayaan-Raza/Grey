import { createClient } from "@/lib/supabase/server";
import type {
  Course,
  EnrollmentWithCourse,
  Profile,
  CourseWithStats,
} from "@/lib/supabase/types";

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

export async function listPublishedCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("title", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Course[];
}

export async function listAllCourses(): Promise<Course[]> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Course[];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as Course | null) ?? null;
}

export async function createCourse(input: {
  title: string;
  slug: string;
  description?: string;
  subtitle?: string;
  instructor_name?: string;
  image_url?: string;
  module_count?: number;
  price_cents?: number;
  status?: Course["status"];
}) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("courses")
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description ?? null,
      subtitle: input.subtitle ?? null,
      instructor_name: input.instructor_name ?? null,
      image_url: input.image_url ?? null,
      module_count: input.module_count ?? 0,
      price_cents: input.price_cents ?? 0,
      status: input.status ?? "draft",
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as Course;
}

export async function updateCourse(
  id: string,
  patch: Partial<
    Pick<
      Course,
      | "title"
      | "slug"
      | "description"
      | "subtitle"
      | "instructor_name"
      | "image_url"
      | "module_count"
      | "price_cents"
      | "status"
    >
  >,
) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("courses")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as Course;
}

export async function listMyEnrollments(): Promise<EnrollmentWithCourse[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("enrollments")
    .select("*, course:courses(*)")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as EnrollmentWithCourse[];
}

export async function enrollInCourse(courseId: string) {
  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from("enrollments")
    .upsert(
      {
        user_id: user.id,
        course_id: courseId,
        status: "active",
        progress: 0,
      },
      { onConflict: "user_id,course_id" },
    )
    .select("*, course:courses(*)")
    .single();

  if (error) throw new Error(error.message);
  return data as EnrollmentWithCourse;
}

export async function getMyProfile(): Promise<Profile | null> {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as Profile | null) ?? null;
}

export async function updateMyProfile(
  patch: Partial<
    Pick<
      Profile,
      | "full_name"
      | "phone"
      | "institution"
      | "specialty"
      | "license_number"
      | "avatar_url"
    >
  >,
) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as Profile;
}

export async function listCoursesWithStats(): Promise<CourseWithStats[]> {
  const courses = await listAllCourses();
  const { supabase } = await requireAdmin();

  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select("course_id, progress, status");

  if (error) throw new Error(error.message);

  return courses.map((course) => {
    const rows = (enrollments ?? []).filter((e) => e.course_id === course.id);
    const avg =
      rows.length === 0
        ? 0
        : Math.round(
            rows.reduce((sum, e) => sum + (e.progress ?? 0), 0) / rows.length,
          );
    return {
      ...course,
      enrollment_count: rows.length,
      avg_completion: avg,
    };
  });
}
