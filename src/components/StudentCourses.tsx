"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StudentDashboardShell from "@/components/StudentDashboardShell";
import type { EnrollmentWithCourse } from "@/lib/supabase/types";

const cardShadow = "shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

type Filter = "all" | "progress" | "completed";

type CourseCard = {
  id: string;
  title: string;
  image: string;
  modules: number;
  progress: number;
  href: string;
};

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All Courses" },
  { id: "progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

function mapEnrollment(row: EnrollmentWithCourse): CourseCard | null {
  if (!row.course) return null;
  return {
    id: row.course.id,
    title: row.course.title,
    image: row.course.image_url || "/main-page-featured/feature-1.jpg",
    modules: row.course.module_count,
    progress: row.progress,
    href: `/courses/${row.course.slug}`,
  };
}

export default function StudentCourses() {
  const [filter, setFilter] = useState<Filter>("all");
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/enrollments");
        const json = (await res.json()) as {
          enrollments?: EnrollmentWithCourse[];
          error?: string;
        };
        if (!res.ok) throw new Error(json.error || "Failed to load courses");
        if (cancelled) return;
        setCourses(
          (json.enrollments ?? [])
            .map(mapEnrollment)
            .filter((c): c is CourseCard => Boolean(c)),
        );
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

  const visible = useMemo(() => {
    if (filter === "all") return courses;
    if (filter === "completed") return courses.filter((c) => c.progress >= 100);
    return courses.filter((c) => c.progress < 100);
  }, [filter, courses]);

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              My Courses
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed">
              Manage and track your enrolled dental training programs.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center self-start bg-[#3A738D] hover:bg-[#2F5F75] text-white px-5 py-2.5 rounded-[12px] font-inter-medium_18pt text-[14px] transition-colors flex-shrink-0"
          >
            Browse Catalog
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors ${
                  filter === tab.id
                    ? "bg-[#3A738D] text-white"
                    : "bg-white border border-[#D5DEE2] text-[#777779] hover:text-[#2F5F75]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-[#777779] font-regular_18pt text-[14px]">Loading courses…</p>
        ) : error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : visible.length === 0 ? (
          <div
            className={`bg-white border border-[#D5DEE2] rounded-[20px] px-6 py-16 text-center ${cardShadow}`}
          >
            <p className="text-[#2F5F75] font-semi_bold_24pt text-[16px] mb-1">
              No courses yet
            </p>
            <p className="text-[#777779] font-regular_18pt text-[14px] mb-4">
              Browse the catalog and enroll to see your courses here.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[14px]"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 w-full min-w-0">
            {visible.map((course) => (
              <article
                key={course.id}
                className={`flex flex-col min-w-0 w-full md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)] bg-white border border-[#D5DEE2] rounded-[20px] overflow-hidden ${cardShadow}`}
              >
                <div className="relative h-[168px] w-full bg-[#E8F1F5]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-1.5">
                    {course.title}
                  </h2>
                  <p className="text-[#777779] font-regular_18pt text-[13px] mb-5">
                    {course.modules} modules
                  </p>

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[#777779] font-regular_18pt text-[13px]">
                      Course Progress
                    </span>
                    <span className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E9EDF2] overflow-hidden mb-5">
                    <div
                      className="h-full rounded-full bg-[#3A738D]"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <Link
                    href={course.href}
                    className="mt-auto inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-[12px] font-inter-medium_18pt text-[14px] transition-colors bg-white border border-[#D5DEE2] text-[#2F5F75] hover:bg-[#5ECAA0] hover:border-[#5ECAA0] hover:text-[#2F5F75]"
                  >
                    {course.progress === 0 ? "Start Course" : "Continue Learning"}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </StudentDashboardShell>
  );
}
