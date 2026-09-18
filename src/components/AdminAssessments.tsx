"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const ICON = "/Admin-Ass";
const LEARN = "/Admin-learn";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

function assIcon(name: string) {
  return `${ICON}/${encodeURIComponent(name)}`;
}

function learnIcon(name: string) {
  return `${LEARN}/${encodeURIComponent(name)}`;
}

type AssessmentStatus = "Active" | "Completed" | "Draft";
type AssessmentType = "Quiz" | "Practical" | "Written";

const metrics = [
  {
    label: "Total Assessments",
    value: "24",
    meta: "+2 new",
    metaClass: "text-[#5ECAA0]",
    icon: assIcon("clipboard.png"),
  },
  {
    label: "Avg. Score",
    value: "84.2%",
    meta: "+1.4% MoM",
    metaClass: "text-[#5ECAA0]",
    icon: learnIcon("check-circle.png"),
  },
  {
    label: "Pass Rate",
    value: "91%",
    meta: "+0.8% MoM",
    metaClass: "text-[#5ECAA0]",
    icon: learnIcon("activity.png"),
  },
  {
    label: "Pending Reviews",
    value: "8",
    meta: "-4 today",
    metaClass: "text-[#C45C5C]",
    icon: learnIcon("clock (1).png"),
  },
];

const assessments = [
  {
    name: "Endodontic Procedures Final",
    type: "Quiz" as AssessmentType,
    course: "Endodontics",
    tasks: "50 questions",
    avgScore: 88,
    submissions: 214,
    status: "Active" as AssessmentStatus,
  },
  {
    name: "Implant Placement Practical",
    type: "Practical" as AssessmentType,
    course: "Implant Dentistry",
    tasks: "8 tasks",
    avgScore: 81,
    submissions: 96,
    status: "Active" as AssessmentStatus,
  },
  {
    name: "Radiograph Interpretation Quiz",
    type: "Quiz" as AssessmentType,
    course: "Oral Radiology",
    tasks: "35 questions",
    avgScore: 79,
    submissions: 168,
    status: "Completed" as AssessmentStatus,
  },
  {
    name: "Case Documentation Written Exam",
    type: "Written" as AssessmentType,
    course: "Clinical Documentation",
    tasks: "4 essays",
    avgScore: 76,
    submissions: 54,
    status: "Draft" as AssessmentStatus,
  },
  {
    name: "Rotary Instrumentation Skills Check",
    type: "Practical" as AssessmentType,
    course: "Endodontics",
    tasks: "6 tasks",
    avgScore: 85,
    submissions: 142,
    status: "Active" as AssessmentStatus,
  },
  {
    name: "Prosthodontics Midterm Review",
    type: "Quiz" as AssessmentType,
    course: "Prosthodontics",
    tasks: "40 questions",
    avgScore: 72,
    submissions: 88,
    status: "Completed" as AssessmentStatus,
  },
];

export default function AdminAssessments() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | AssessmentType>("All");
  const [course, setCourse] = useState("All Courses");
  const [status, setStatus] = useState<"All" | AssessmentStatus>("All");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assessments.filter((a) => {
      const matchesType = type === "All" || a.type === type;
      const matchesStatus = status === "All" || a.status === status;
      const matchesCourse =
        course === "All Courses" || a.course === course;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.course.toLowerCase().includes(q);
      return matchesType && matchesStatus && matchesCourse && matchesQuery;
    });
  }, [query, type, course, status]);

  function resetFilters() {
    setQuery("");
    setType("All");
    setCourse("All Courses");
    setStatus("All");
    setPage(1);
  }

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Assessments
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
              Create, manage, and review assessments to evaluate learner
              knowledge and skills.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors flex-shrink-0"
          >
            <span className="text-[16px] leading-none">+</span>
            Create Assessment
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <article
              key={m.label}
              className={`${card} p-5 overflow-hidden relative`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-[#777779] font-regular_18pt text-[13px]">
                  {m.label}
                </p>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E8F1F5] flex-shrink-0">
                  <Image
                    src={m.icon}
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                    className="w-[18px] h-[18px] object-contain"
                  />
                </span>
              </div>
              <p className="text-[#2F5F75] font-semi_bold_24pt text-[28px] leading-none tracking-tight mb-2">
                {m.value}
              </p>
              <p className={`font-inter-medium_18pt text-[12px] mb-3 ${m.metaClass}`}>
                {m.meta}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3A738D]/25">
                <div className="h-full w-2/3 bg-[#3A738D]" />
              </div>
            </article>
          ))}
        </div>

        {/* Filters */}
        <section className={`${card} p-4 sm:p-5`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <label className="relative flex-1 min-w-0">
              <span className="sr-only">Search assessments</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777779] pointer-events-none"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M20 20l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search assessments by name or course..."
                className="w-full pl-10 pr-3 py-2.5 rounded-[10px] bg-[#F4F7F8] border border-transparent focus:border-[#D5DEE2] focus:bg-white text-[#2F5F75] font-regular_18pt text-[13px] outline-none placeholder:text-[#777779]/65"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as "All" | AssessmentType);
                  setPage(1);
                }}
                className="px-3 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] outline-none"
                aria-label="Type filter"
              >
                <option value="All">Type: All</option>
                <option value="Quiz">Type: Quiz</option>
                <option value="Practical">Type: Practical</option>
                <option value="Written">Type: Written</option>
              </select>

              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] outline-none"
                aria-label="Course filter"
              >
                <option value="All Courses">Course: All Courses</option>
                <option value="Endodontics">Endodontics</option>
                <option value="Implant Dentistry">Implant Dentistry</option>
                <option value="Oral Radiology">Oral Radiology</option>
                <option value="Clinical Documentation">Clinical Documentation</option>
                <option value="Prosthodontics">Prosthodontics</option>
              </select>

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as "All" | AssessmentStatus);
                  setPage(1);
                }}
                className="px-3 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] outline-none"
                aria-label="Status filter"
              >
                <option value="All">Status: All Statuses</option>
                <option value="Active">Status: Active</option>
                <option value="Completed">Status: Completed</option>
                <option value="Draft">Status: Draft</option>
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="px-2 py-2 text-[#3A738D] font-inter-medium_18pt text-[12px] sm:text-[13px] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className={`${card} p-5 sm:p-6 overflow-hidden`}>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D5DEE2]">
                  {[
                    "Assessment Name",
                    "Type",
                    "Course",
                    "Tasks",
                    "Avg. Score",
                    "Submissions",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="pb-3 pr-4 text-[#777779] font-inter-medium_18pt text-[11px] sm:text-[12px] uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-[#D5DEE2] last:border-0"
                  >
                    <td className="py-4 pr-4">
                      <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px] leading-snug">
                        {row.name}
                      </p>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-[#E8F1F5] text-[#3A738D] font-inter-medium_18pt text-[11px]">
                        {row.type}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                      {row.course}
                    </td>
                    <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                      {row.tasks}
                    </td>
                    <td className="py-4 pr-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[#E8F1F5] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#5ECAA0]"
                            style={{ width: `${row.avgScore}%` }}
                          />
                        </div>
                        <span className="text-[#2F5F75] font-inter-medium_18pt text-[12px] w-9">
                          {row.avgScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-[#2F5F75] font-regular_18pt text-[14px]">
                      {row.submissions}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full font-inter-medium_18pt text-[11px] ${
                          row.status === "Active"
                            ? "bg-[#E5F8F0] text-[#2F5F75]"
                            : row.status === "Completed"
                              ? "bg-[#E8F1F5] text-[#2F5F75]"
                              : "bg-[#FFF4E5] text-[#B86E00]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-[8px] border border-[#D5DEE2] text-[#3A738D] font-inter-medium_18pt text-[12px] hover:bg-[#F4F7F8] transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-[#777779] font-regular_18pt text-[14px]"
                    >
                      No assessments match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <p className="text-[#777779] font-regular_18pt text-[13px]">
            Showing {visible.length} of 24 assessments
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-[8px] border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8] font-inter-medium_18pt text-[13px]"
            >
              ‹
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-[8px] font-inter-medium_18pt text-[13px] transition-colors ${
                  page === n
                    ? "bg-[#3A738D] text-white"
                    : "border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8]"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-[#777779] font-regular_18pt text-[13px]">
              …
            </span>
            <button
              type="button"
              onClick={() => setPage(4)}
              className={`w-8 h-8 rounded-[8px] font-inter-medium_18pt text-[13px] transition-colors ${
                page === 4
                  ? "bg-[#3A738D] text-white"
                  : "border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8]"
              }`}
            >
              4
            </button>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(4, p + 1))}
              className="w-8 h-8 rounded-[8px] border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8] font-inter-medium_18pt text-[13px]"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardShell>
  );
}
