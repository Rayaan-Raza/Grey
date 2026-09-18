"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StudentDashboardShell from "@/components/StudentDashboardShell";
import type { Resource } from "@/lib/supabase/types";

const ASSET = "/Student-Resources";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

export default function StudentResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/resources");
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

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="min-w-0">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            Resources
          </h1>
          <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-3xl">
            Clinical handbooks and learning materials available to you.
          </p>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : null}

        {loading ? (
          <p className="text-[#777779] font-regular_18pt text-[14px]">
            Loading resources…
          </p>
        ) : resources.length === 0 ? (
          <div className={`${card} p-10 text-center`}>
            <p className="text-[#2F5F75] font-semi_bold_24pt text-[16px] mb-1">
              No resources yet
            </p>
            <p className="text-[#777779] font-regular_18pt text-[14px]">
              Run <code>seed_content.sql</code> in Supabase, then refresh.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((item) => (
              <article key={item.id} className={`${card} p-5 sm:p-6 flex flex-col`}>
                <span className="inline-flex self-start rounded-[6px] bg-[#E8F1F5] text-[#3A738D] font-inter-medium_18pt text-[10px] tracking-wide uppercase px-2 py-1 mb-3">
                  {item.category || item.resource_type}
                </span>
                <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] leading-snug mb-2">
                  {item.title}
                </h2>
                <p className="text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] leading-relaxed mb-4 flex-1">
                  {item.description || "Learning resource"}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#777779] font-regular_18pt text-[12px]">
                    {item.file_size || "—"}
                  </span>
                  {item.file_url ? (
                    <a
                      href={item.file_url}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[13px] hover:bg-[#5ECAA0] hover:border-[#5ECAA0] hover:text-black transition-colors"
                    >
                      Open
                      <Image
                        src={asset("FileIcon.png")}
                        alt=""
                        width={14}
                        height={14}
                        unoptimized
                        className="w-3.5 h-3.5 object-contain"
                      />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </StudentDashboardShell>
  );
}
