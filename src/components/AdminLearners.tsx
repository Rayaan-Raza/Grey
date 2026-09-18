"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AdminDashboardShell from "@/components/AdminDashboardShell";
import type { LearnerRow } from "@/lib/supabase/types";

const ICON = "/Admin-learn";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

function icon(name: string) {
  return `${ICON}/${encodeURIComponent(name)}`;
}

type LearnerStatus = "Active" | "Inactive";

export default function AdminLearners() {
  const [learners, setLearners] = useState<LearnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | LearnerStatus>("All");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/learners");
        const json = (await res.json()) as {
          learners?: LearnerRow[];
          error?: string;
        };
        if (!res.ok) throw new Error(json.error || "Failed to load learners");
        if (!cancelled) setLearners(json.learners ?? []);
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

  const metrics = useMemo(() => {
    const active = learners.filter((l) => l.status === "Active").length;
    const avg =
      learners.length === 0
        ? 0
        : Math.round(
            learners.reduce((sum, l) => sum + l.progress, 0) / learners.length,
          );
    const enrolled = learners.reduce((sum, l) => sum + l.courses, 0);
    return [
      {
        label: "Total Learners",
        value: String(learners.length),
        meta: "From profiles",
        icon: icon("users (2).png"),
      },
      {
        label: "Active",
        value: String(active),
        meta: "With active enrollments",
        icon: icon("activity.png"),
      },
      {
        label: "Avg. Completion",
        value: `${avg}%`,
        meta: "Across enrollments",
        icon: icon("check-circle.png"),
      },
      {
        label: "Total Enrollments",
        value: String(enrolled),
        meta: "All learner seats",
        icon: icon("user-plus.png"),
      },
    ];
  }, [learners]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return learners.filter((l) => {
      const matchesStatus = status === "All" || l.status === status;
      const name = (l.full_name || "").toLowerCase();
      const matchesQuery = !q || name.includes(q) || l.id.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [learners, query, status]);

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="min-w-0">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            Learners
          </h1>
          <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
            Profiles and enrollment progress from Supabase.
          </p>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <article key={m.label} className={`${card} p-5`}>
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
              <p className="text-[#777779] font-regular_18pt text-[12px]">
                {m.meta}
              </p>
            </article>
          ))}
        </div>

        <section className={`${card} p-5`}>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search learners..."
              className="flex-1 px-4 py-2.5 rounded-[10px] bg-[#F4F7F8] text-[#2F5F75] font-regular_18pt text-[13px] outline-none"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "All" | LearnerStatus)}
              className="px-3 py-2.5 rounded-[10px] border border-[#D5DEE2] text-[#2F5F75] font-regular_18pt text-[13px]"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {loading ? (
            <p className="text-[#777779] font-regular_18pt text-[14px]">
              Loading learners…
            </p>
          ) : visible.length === 0 ? (
            <p className="text-[#777779] font-regular_18pt text-[14px]">
              No learners yet. Sign up a student account to see them here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-[#D5DEE2]">
                    {["Learner", "Role", "Courses", "Progress", "Status", "Updated"].map(
                      (h) => (
                        <th
                          key={h}
                          className="pb-3 pr-4 text-[#777779] font-inter-medium_18pt text-[11px] uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((l) => (
                    <tr key={l.id} className="border-b border-[#D5DEE2] last:border-0">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={l.avatar_url || "/Student_Dashboard/avatar.png"}
                            alt=""
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <span className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                            {l.full_name || "Unnamed learner"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px] capitalize">
                        {l.role}
                      </td>
                      <td className="py-4 pr-4 text-[#2F5F75] font-regular_18pt text-[14px]">
                        {l.courses}
                      </td>
                      <td className="py-4 pr-4 text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                        {l.progress}%
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full font-inter-medium_18pt text-[11px] ${
                            l.status === "Active"
                              ? "bg-[#E5F8F0] text-[#2F5F75]"
                              : "bg-[#F4F7F8] text-[#777779]"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#777779] font-regular_18pt text-[13px]">
                        {l.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminDashboardShell>
  );
}
