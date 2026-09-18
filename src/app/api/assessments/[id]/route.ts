import { NextResponse } from "next/server";
import {
  getAssessmentForTaking,
  submitAssessment,
} from "@/lib/assessments";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const payload = await getAssessmentForTaking(id);
    return NextResponse.json(payload);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load assessment";
    const status =
      message === "Not authenticated"
        ? 401
        : message === "Assessment not found"
          ? 404
          : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await request.json()) as {
      answers?: Record<string, number>;
      cheated?: boolean;
    };

    const submission = await submitAssessment({
      assessmentId: id,
      answers: body.answers ?? {},
      cheated: Boolean(body.cheated),
    });

    return NextResponse.json({ submission });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit assessment";
    const status = message === "Not authenticated" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
