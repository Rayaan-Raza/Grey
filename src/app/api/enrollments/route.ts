import { NextResponse } from "next/server";
import { enrollInCourse, listMyEnrollments } from "@/lib/courses";

export async function GET() {
  try {
    const enrollments = await listMyEnrollments();
    return NextResponse.json({ enrollments });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load enrollments";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { courseId?: string };
    if (!body.courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }
    const enrollment = await enrollInCourse(body.courseId);
    return NextResponse.json({ enrollment }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to enroll";
    const status = message === "Not authenticated" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
