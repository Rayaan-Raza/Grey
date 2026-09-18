import { createClient } from "@/lib/supabase/server";
import type {
  AssessmentListItem,
  PublicQuestion,
} from "@/lib/supabase/types";

export type { AssessmentListItem, PublicQuestion };

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, user };
}

export async function listMyAssessments(): Promise<AssessmentListItem[]> {
  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from("assessments")
    .select("id, title, assessment_type, due_at, status, course:courses(title, slug)")
    .eq("status", "published")
    .order("due_at", { ascending: true });

  if (error) throw new Error(error.message);

  const ids = (data ?? []).map((a) => a.id);
  const { data: subs } = await supabase
    .from("assessment_submissions")
    .select("assessment_id, score, status, cheated")
    .eq("user_id", user.id)
    .in("assessment_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);

  return (data ?? []).map((a) => {
    const course = a.course as
      | { title?: string; slug?: string }
      | { title?: string; slug?: string }[]
      | null;
    const courseObj = Array.isArray(course) ? course[0] : course;
    const sub = (subs ?? []).find((s) => s.assessment_id === a.id);
    return {
      id: a.id,
      title: a.title,
      assessment_type: a.assessment_type,
      due_at: a.due_at,
      status: a.status,
      course_title: courseObj?.title ?? null,
      course_slug: courseObj?.slug ?? null,
      my_submission: sub
        ? {
            score: sub.score,
            status: sub.status,
            cheated: Boolean(sub.cheated),
          }
        : null,
    };
  });
}

export async function getAssessmentForTaking(assessmentId: string) {
  const { supabase, user } = await requireUser();

  const { data: assessment, error } = await supabase
    .from("assessments")
    .select("id, title, assessment_type, due_at, status, course:courses(title, slug)")
    .eq("id", assessmentId)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!assessment) throw new Error("Assessment not found");

  const { data: existing } = await supabase
    .from("assessment_submissions")
    .select("*")
    .eq("assessment_id", assessmentId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing && (existing.status === "graded" || existing.cheated)) {
    return {
      assessment,
      questions: [] as PublicQuestion[],
      alreadySubmitted: true as const,
      submission: existing,
    };
  }

  const { data: questions, error: qError } = await supabase
    .from("assessment_questions")
    .select("id, prompt, options, sort_order")
    .eq("assessment_id", assessmentId)
    .order("sort_order", { ascending: true });

  if (qError) throw new Error(qError.message);

  const publicQuestions: PublicQuestion[] = (questions ?? []).map((q) => ({
    id: q.id,
    prompt: q.prompt,
    options: Array.isArray(q.options) ? (q.options as string[]) : [],
    sort_order: q.sort_order,
  }));

  return {
    assessment,
    questions: publicQuestions,
    alreadySubmitted: false as const,
    submission: existing,
  };
}

export async function submitAssessment(input: {
  assessmentId: string;
  answers: Record<string, number>;
  cheated?: boolean;
}) {
  const { supabase, user } = await requireUser();

  const { data: existing } = await supabase
    .from("assessment_submissions")
    .select("*")
    .eq("assessment_id", input.assessmentId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing && (existing.status === "graded" || existing.cheated)) {
    return existing;
  }

  if (input.cheated) {
    const payload = {
      assessment_id: input.assessmentId,
      user_id: user.id,
      answers: input.answers,
      score: 0,
      status: "graded",
      cheated: true,
      submitted_at: new Date().toISOString(),
    };

    if (existing) {
      const { data, error } = await supabase
        .from("assessment_submissions")
        .update(payload)
        .eq("id", existing.id)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const { data, error } = await supabase
      .from("assessment_submissions")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data: questions, error: qError } = await supabase
    .from("assessment_questions")
    .select("id, correct_index")
    .eq("assessment_id", input.assessmentId);

  if (qError) throw new Error(qError.message);
  const list = questions ?? [];
  if (list.length === 0) throw new Error("No questions found");

  let correct = 0;
  for (const q of list) {
    if (input.answers[q.id] === q.correct_index) correct += 1;
  }
  const score = Math.round((correct / list.length) * 100);

  const payload = {
    assessment_id: input.assessmentId,
    user_id: user.id,
    answers: input.answers,
    score,
    status: "graded",
    cheated: false,
    submitted_at: new Date().toISOString(),
  };

  if (existing) {
    const { data, error } = await supabase
      .from("assessment_submissions")
      .update(payload)
      .eq("id", existing.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const { data, error } = await supabase
    .from("assessment_submissions")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}
