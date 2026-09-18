import { NextResponse } from "next/server";
import {
  createCourse,
  listCoursesWithStats,
  listPublishedCourses,
} from "@/lib/courses";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scope = searchParams.get("scope");

    if (scope === "admin") {
      const courses = await listCoursesWithStats();
      return NextResponse.json({ courses });
    }

    const courses = await listPublishedCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load courses";
    const status = message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: string;
      slug?: string;
      description?: string;
      subtitle?: string;
      instructor_name?: string;
      image_url?: string;
      module_count?: number;
      price_cents?: number;
      status?: "draft" | "published" | "archived";
    };

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "title and slug are required" },
        { status: 400 },
      );
    }

    const course = await createCourse({
      title: body.title,
      slug: body.slug,
      description: body.description,
      subtitle: body.subtitle,
      instructor_name: body.instructor_name,
      image_url: body.image_url,
      module_count: body.module_count,
      price_cents: body.price_cents,
      status: body.status,
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create course";
    const status =
      message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
