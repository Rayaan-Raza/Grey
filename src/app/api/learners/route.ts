import { NextResponse } from "next/server";
import { listLearners } from "@/lib/learners";

export async function GET() {
  try {
    const learners = await listLearners();
    return NextResponse.json({ learners });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load learners";
    const status =
      message === "Forbidden" || message === "Not authenticated" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
