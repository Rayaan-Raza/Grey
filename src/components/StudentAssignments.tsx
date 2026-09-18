"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StudentDashboardShell from "@/components/StudentDashboardShell";
import type { AssessmentListItem } from "@/lib/supabase/types";

const cardShadow = "shadow-[0_8px_30px_rgba(47,95,117,0.06)]";
const card = `bg-white border border-[#D5DEE2] rounded-[20px] ${cardShadow}`;

type Filter = "all" | "pending" | "submitted" | "graded";

export default function StudentAssignments() {
  const [filter, setFilter] = useState<Filter>("all");
  const [assessments, setAssessments] = useState<AssessmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/assessments");
        const json = (await res.json()) as {
          assessments?: AssessmentListItem[];
          error?: string;
        };
        if (!res.ok) throw new Error(json.error || "Failed to load");
        if (!cancelled) setAssessments(json.assessments ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    return assessments.map((a) => {
      const sub = a.my_submission;
      let status: "pending" | "submitted" | "graded" = "pending";
      let dueLabel = a.due_at
        ? `Due ${new Date(a.due_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`
        : "Open";

      if (sub?.cheated) {
        status = "graded";
        dueLabel = "Voided (cheating) — 0%";
      } else if (sub?.status === "graded") {
        status = "graded";
        dueLabel = `Score ${sub.score ?? 0}%`;
      } else if (sub) {
        status = "submitted";
        dueLabel = "Submitted";
      }

      return {
        id: a.id,
        title: a.title,
        course: a.course_title || "Course",
        dueLabel,
        status,
        canTake: !sub || (!sub.cheated && sub.status !== "graded"),
      };
    });
  }, [assessments]);

  const visible = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((r) => r.status === filter);
  }, [filter, rows]);

  const metrics = useMemo(() => {
    const pending = rows.filter((r) => r.status === "pending").length;
    const submitted = rows.filter((r) => r.status === "submitted").length;
    const graded = rows.filter((r) => r.status === "graded").length;
    return [
      { label: "Total", value: String(rows.length), sub: "Published assessments" },
      { label: "Pending", value: String(pending), sub: "Not started / incomplete" },
      { label: "Submitted", value: String(submitted), sub: "Awaiting grade" },
      { label: "Graded", value: String(graded), sub: "Completed or voided" },
    ];
  }, [rows]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "submitted", label: "Submitted" },
    { id: "graded", label: "Graded" },
  ];

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="min-w-0">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            Assessments
          </h1>
          <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed">
            MCQ exams and assignments. Leaving the exam tab scores an automatic
            zero.
          </p>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <article key={m.label} className={`${card} p-5`}>
              <p className="text-[#777779] font-regular_18pt text-[13px] mb-2">
                {m.label}
              </p>
              <p className="text-[#2F5F75] font-semi_bold_24pt text-[28px] leading-none mb-2">
                {m.value}
              </p>
              <p className="text-[#777779] font-regular_18pt text-[12px]">{m.sub}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full font-inter-medium_18pt text-[13px] ${
                filter === tab.id
                  ? "bg-[#3A738D] text-white"
                  : "bg-white border border-[#D5DEE2] text-[#777779]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section className={`${card} overflow-hidden`}>
          {loading ? (
            <p className="p-6 text-[#777779] font-regular_18pt text-[14px]">
              Loading assessments…
            </p>
          ) : visible.length === 0 ? (
            <p className="p-6 text-[#777779] font-regular_18pt text-[14px]">
              No assessments yet. Run <code>schema_assessments_mcq.sql</code> in
              Supabase.
            </p>
          ) : (
            <ul className="divide-y divide-[#D5DEE2]">
              {visible.map((row) => (
                <li
                  key={row.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-[#2F5F75] font-semi_bold_24pt text-[15px] sm:text-[16px]">
                      {row.title}
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[13px] mt-1">
                      {row.course} · {row.dueLabel}
                    </p>
                  </div>
                  {row.canTake ? (
                    <Link
                      href={`/student-dashboard/assessments/${row.id}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] flex-shrink-0"
                    >
                      Take exam
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#E5F8F0] text-[#2F5F75] font-inter-medium_18pt text-[12px]">
                      {row.status === "graded" ? "Completed" : "Submitted"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </StudentDashboardShell>
  );
}
