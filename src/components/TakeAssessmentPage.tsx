"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StudentDashboardShell from "@/components/StudentDashboardShell";
import type { PublicQuestion } from "@/lib/supabase/types";

const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

type Phase = "loading" | "rules" | "taking" | "done" | "error";

export default function TakeAssessmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const assessmentId = params.id;

  const [phase, setPhase] = useState<Phase>("loading");
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState<string | null>(null);
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    score: number | null;
    cheated: boolean;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const takingRef = useRef(false);
  const submittedRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/assessments/${assessmentId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        if (cancelled) return;

        const course = json.assessment?.course;
        const courseObj = Array.isArray(course) ? course[0] : course;
        setTitle(json.assessment?.title || "Assessment");
        setCourseTitle(courseObj?.title ?? null);

        if (json.alreadySubmitted) {
          submittedRef.current = true;
          setResult({
            score: json.submission?.score ?? 0,
            cheated: Boolean(json.submission?.cheated),
          });
          setPhase("done");
          return;
        }

        setQuestions(json.questions ?? []);
        setPhase("rules");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
          setPhase("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [assessmentId]);

  const finalize = useCallback(
    async (cheated: boolean) => {
      if (submittedRef.current || submitting) return;
      submittedRef.current = true;
      takingRef.current = false;
      setSubmitting(true);
      try {
        const res = await fetch(`/api/assessments/${assessmentId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: answersRef.current,
            cheated,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Submit failed");
        setResult({
          score: json.submission?.score ?? (cheated ? 0 : null),
          cheated: Boolean(json.submission?.cheated || cheated),
        });
        setPhase("done");
      } catch (err) {
        submittedRef.current = false;
        setError(err instanceof Error ? err.message : "Submit failed");
        setPhase("error");
      } finally {
        setSubmitting(false);
      }
    },
    [assessmentId, submitting],
  );

  useEffect(() => {
    function onLeave() {
      if (!takingRef.current || submittedRef.current) return;
      void finalize(true);
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") onLeave();
    }

    function onBlur() {
      onLeave();
    }

    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pagehide", onLeave);

    return () => {
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pagehide", onLeave);
    };
  }, [finalize]);

  function startExam() {
    takingRef.current = true;
    setPhase("taking");
  }

  const allAnswered =
    questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div>
          <Link
            href="/student-dashboard/assignments"
            className="text-[#777779] hover:text-[#3A738D] font-regular_18pt text-[13px]"
          >
            ← Back to assessments
          </Link>
          <h1 className="mt-3 text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            {title}
          </h1>
          {courseTitle ? (
            <p className="mt-1 text-[#777779] font-regular_18pt text-[14px]">
              {courseTitle}
            </p>
          ) : null}
        </div>

        {phase === "loading" ? (
          <p className="text-[#777779] font-regular_18pt text-[14px]">Loading…</p>
        ) : null}

        {phase === "error" ? (
          <div className={`${card} p-6`}>
            <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
          </div>
        ) : null}

        {phase === "rules" ? (
          <section className={`${card} p-6 sm:p-8 max-w-2xl`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[18px] mb-3">
              Exam rules
            </h2>
            <ul className="list-disc pl-5 text-[#777779] font-regular_18pt text-[14px] leading-relaxed space-y-2 mb-6">
              <li>This is a timed knowledge check with multiple-choice questions.</li>
              <li>
                <strong className="text-[#2F5F75]">Do not leave this tab</strong>,
                switch windows, or hide the browser — that is treated as cheating.
              </li>
              <li>
                If you leave the page, the exam ends immediately and your score is{" "}
                <strong className="text-[#2F5F75]">0</strong>.
              </li>
              <li>You cannot retake after submitting or failing for cheating.</li>
            </ul>
            <button
              type="button"
              onClick={startExam}
              className="inline-flex items-center justify-center px-5 py-3 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[14px]"
            >
              I understand — start exam
            </button>
          </section>
        ) : null}

        {phase === "taking" ? (
          <section className={`${card} p-5 sm:p-7 flex flex-col gap-6`}>
            <div className="rounded-[12px] bg-[#FFF4E5] border border-[#F0D7A8] px-4 py-3 text-[#8A6A2F] font-regular_18pt text-[13px]">
              Stay on this tab. Leaving or switching away will end the exam with a
              score of 0.
            </div>

            {questions.map((q, index) => (
              <fieldset key={q.id} className="border-b border-[#D5DEE2] pb-5 last:border-0">
                <legend className="text-[#2F5F75] font-semi_bold_24pt text-[15px] sm:text-[16px] mb-3">
                  {index + 1}. {q.prompt}
                </legend>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, optIndex) => {
                    const selected = answers[q.id] === optIndex;
                    return (
                      <label
                        key={`${q.id}-${optIndex}`}
                        className={`flex items-start gap-3 rounded-[10px] border px-3.5 py-3 cursor-pointer transition-colors ${
                          selected
                            ? "border-[#3A738D] bg-[#E8F1F5]"
                            : "border-[#D5DEE2] hover:border-[#3A738D]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          className="mt-1 accent-[#3A738D]"
                          checked={selected}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: optIndex }))
                          }
                        />
                        <span className="text-[#2F5F75] font-regular_18pt text-[14px]">
                          {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <button
              type="button"
              disabled={!allAnswered || submitting}
              onClick={() => void finalize(false)}
              className="self-start inline-flex items-center justify-center px-5 py-3 rounded-[10px] bg-[#5ECAA0] hover:bg-[#7ED9B5] disabled:opacity-50 text-black font-inter-medium_18pt text-[14px]"
            >
              {submitting ? "Submitting…" : "Submit answers"}
            </button>
          </section>
        ) : null}

        {phase === "done" && result ? (
          <section className={`${card} p-6 sm:p-8 max-w-xl text-center`}>
            {result.cheated ? (
              <>
                <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[22px] mb-2">
                  Exam voided — cheating detected
                </h2>
                <p className="text-[#777779] font-regular_18pt text-[14px] mb-4">
                  You left the assessment tab or window. Per exam rules, your score
                  is 0.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[22px] mb-2">
                  Assessment submitted
                </h2>
                <p className="text-[#777779] font-regular_18pt text-[14px] mb-4">
                  Your score has been recorded.
                </p>
              </>
            )}
            <p className="text-[#3A738D] font-semi_bold_24pt text-[40px] leading-none mb-6">
              {result.score ?? 0}%
            </p>
            <button
              type="button"
              onClick={() => router.push("/student-dashboard/assignments")}
              className="inline-flex items-center justify-center px-5 py-3 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[14px]"
            >
              Back to assessments
            </button>
          </section>
        ) : null}
      </div>
    </StudentDashboardShell>
  );
}
