import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/courses";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load course";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
