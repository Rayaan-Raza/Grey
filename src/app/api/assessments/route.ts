import { NextResponse } from "next/server";
import { listMyAssessments } from "@/lib/assessments";

export async function GET() {
  try {
    const assessments = await listMyAssessments();
    return NextResponse.json({ assessments });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load assessments";
    const status = message === "Not authenticated" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
