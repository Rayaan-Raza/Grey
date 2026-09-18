"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminDashboardShell from "@/components/AdminDashboardShell";
import type { Resource } from "@/lib/supabase/types";

const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/resources?scope=admin");
        const json = (await res.json()) as {
          resources?: Resource[];
          error?: string;
        };
        if (!res.ok) throw new Error(json.error || "Failed to load resources");
        if (!cancelled) setResources(json.resources ?? []);
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

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resources;
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.category || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q),
    );
  }, [resources, query]);

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Resources
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
              Manage clinical downloads and learning materials from the database.
            </p>
          </div>
          <Link
            href="/admin-dashboard/resources/upload"
            className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors flex-shrink-0"
          >
            Upload Resource
          </Link>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : null}

        <section className={`${card} p-5 sm:p-6`}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full max-w-md mb-5 px-4 py-2.5 rounded-[10px] bg-[#F4F7F8] border border-transparent focus:border-[#D5DEE2] text-[#2F5F75] font-regular_18pt text-[13px] outline-none"
          />

          {loading ? (
            <p className="text-[#777779] font-regular_18pt text-[14px]">
              Loading resources…
            </p>
          ) : visible.length === 0 ? (
            <p className="text-[#777779] font-regular_18pt text-[14px]">
              No resources found. Run seed_content.sql if the table is empty.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-[#D5DEE2]">
              {visible.map((r) => (
                <li
                  key={r.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                      {r.title}
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px] mt-0.5">
                      {r.category || r.resource_type}
                      {r.is_public ? " · Public" : " · Restricted"}
                      {r.file_size ? ` · ${r.file_size}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {r.file_url ? (
                      <a
                        href={r.file_url}
                        className="px-3 py-2 rounded-[10px] border border-[#D5DEE2] text-[#2F5F75] font-inter-medium_18pt text-[12px] hover:bg-[#F4F7F8]"
                      >
                        Open
                      </a>
                    ) : null}
                    <Link
                      href="/admin-dashboard/resources/edit"
                      className="px-3 py-2 rounded-[10px] border border-[#D5DEE2] text-[#2F5F75] font-inter-medium_18pt text-[12px] hover:bg-[#F4F7F8]"
                    >
                      Edit
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminDashboardShell>
  );
}
