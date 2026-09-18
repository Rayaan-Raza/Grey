"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AdminDashboardShell from "@/components/AdminDashboardShell";
import type { CourseWithStats } from "@/lib/supabase/types";

const ICON = "/Admin-courses";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

function icon(name: string) {
  return `${ICON}/${encodeURIComponent(name)}`;
}

type StatusLabel = "Published" | "Draft" | "Archived";

function toLabel(status: string): StatusLabel {
  if (status === "published") return "Published";
  if (status === "archived") return "Archived";
  return "Draft";
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

const tabs: { id: "all" | StatusLabel; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Published", label: "Published" },
  { id: "Draft", label: "Draft" },
  { id: "Archived", label: "Archived" },
];

export default function AdminCourses() {
  const [tab, setTab] = useState<"all" | StatusLabel>("all");
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<CourseWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function loadCourses() {
    const res = await fetch("/api/courses?scope=admin");
    const json = (await res.json()) as {
      courses?: CourseWithStats[];
      error?: string;
    };
    if (!res.ok) throw new Error(json.error || "Failed to load courses");
    setCourses(json.courses ?? []);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadCourses();
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load courses");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(
    () =>
      courses.map((c) => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle || c.description || "",
        instructor: c.instructor_name || "Grey Dental Faculty",
        enrollments: c.enrollment_count,
        completion: c.avg_completion,
        status: toLabel(c.status),
        updated: formatDate(c.updated_at),
      })),
    [courses],
  );

  const summary = useMemo(() => {
    const published = rows.filter((r) => r.status === "Published").length;
    const drafts = rows.filter((r) => r.status === "Draft").length;
    const archived = rows.filter((r) => r.status === "Archived").length;
    return [
      {
        label: "Total Courses",
        value: String(rows.length).padStart(2, "0"),
        meta: "Across all categories",
        icon: icon("student.png"),
      },
      {
        label: "Published",
        value: String(published).padStart(2, "0"),
        meta: "Currently live courses",
        icon: icon("book-open (1).png"),
      },
      {
        label: "Drafts",
        value: String(drafts).padStart(2, "0"),
        meta: "Awaiting review",
        icon: icon("book-open (2).png"),
      },
      {
        label: "Archived",
        value: String(archived),
        meta: archived ? "Archived courses" : "No archived courses",
        icon: icon("clock.png"),
      },
    ];
  }, [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((c) => {
      const matchesTab = tab === "all" || c.status === tab;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query, rows]);

  async function onCreateCourse() {
    const title = window.prompt("Course title");
    if (!title?.trim()) return;
    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: `${slug}-${Date.now().toString(36)}`,
          status: "draft",
          instructor_name: "Grey Dental Faculty",
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Failed to create course");
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create course");
    } finally {
      setCreating(false);
    }
  }

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Courses
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
              Create and manage your dental courses, learning content, and course
              settings.
            </p>
          </div>
          <button
            type="button"
            disabled={creating}
            onClick={onCreateCourse}
            className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] disabled:opacity-60 text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors flex-shrink-0"
          >
            <span className="text-[16px] leading-none">+</span>
            {creating ? "Creating…" : "Create New Course"}
          </button>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {summary.map((item) => (
            <article key={item.label} className={`${card} p-5`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-[#777779] font-regular_18pt text-[13px]">
                  {item.label}
                </p>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E8F1F5] flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                    className="w-[18px] h-[18px] object-contain"
                  />
                </span>
              </div>
              <p className="text-[#2F5F75] font-semi_bold_24pt text-[28px] leading-none tracking-tight mb-2">
                {item.value}
              </p>
              <p className="text-[#777779] font-regular_18pt text-[12px]">
                {item.meta}
              </p>
            </article>
          ))}
        </div>

        <section className={`${card} p-5 sm:p-6 overflow-hidden`}>
          <div className="flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-4 mb-5">
            <label className="relative flex-1 min-w-0 max-w-md">
              <span className="sr-only">Search courses</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-4 pr-3 py-2.5 rounded-[10px] bg-[#F4F7F8] border border-transparent focus:border-[#D5DEE2] focus:bg-white text-[#2F5F75] font-regular_18pt text-[13px] outline-none placeholder:text-[#777779]/65"
              />
            </label>

            <div className="inline-flex items-center rounded-[10px] bg-[#F4F7F8] p-1 border border-[#D5DEE2]">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1.5 rounded-[8px] font-inter-medium_18pt text-[12px] sm:text-[13px] transition-colors ${
                    tab === t.id
                      ? "bg-white text-[#2F5F75] shadow-sm"
                      : "text-[#777779] hover:text-[#2F5F75]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-[#777779] font-regular_18pt text-[14px] py-6">
              Loading courses…
            </p>
          ) : (
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[760px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D5DEE2]">
                    {[
                      "Course",
                      "Instructor",
                      "Enrollments",
                      "Completion",
                      "Status",
                      "Updated",
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
                      key={row.id}
                      className="border-b border-[#D5DEE2] last:border-0"
                    >
                      <td className="py-4 pr-4">
                        <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px] leading-snug">
                          {row.title}
                        </p>
                        <p className="text-[#777779] font-regular_18pt text-[12px] mt-0.5">
                          {row.subtitle}
                        </p>
                      </td>
                      <td className="py-4 pr-4 text-[#3A738D] font-inter-medium_18pt text-[13px]">
                        {row.instructor}
                      </td>
                      <td className="py-4 pr-4 text-[#2F5F75] font-regular_18pt text-[14px]">
                        {row.enrollments.toLocaleString()}
                      </td>
                      <td className="py-4 pr-4 min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-[#E8F1F5] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#5ECAA0]"
                              style={{ width: `${row.completion}%` }}
                            />
                          </div>
                          <span className="text-[#2F5F75] font-inter-medium_18pt text-[12px] w-8">
                            {row.completion}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full font-inter-medium_18pt text-[11px] ${
                            row.status === "Published"
                              ? "bg-[#E5F8F0] text-[#2F5F75]"
                              : row.status === "Draft"
                                ? "bg-[#FFF4E5] text-[#B86E00]"
                                : "bg-[#F4F7F8] text-[#777779]"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#777779] font-regular_18pt text-[13px]">
                        {row.updated}
                      </td>
                    </tr>
                  ))}
                  {visible.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-[#777779] font-regular_18pt text-[14px]"
                      >
                        No courses match your search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminDashboardShell>
  );
}
