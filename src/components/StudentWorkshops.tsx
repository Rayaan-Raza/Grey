"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import StudentDashboardShell from "@/components/StudentDashboardShell";
import type { WorkshopWithMeta } from "@/lib/supabase/types";

const ASSET = "/Student-Workshop";
const DASH = "/Student_Dashboard";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";
const btnOutline =
  "inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors bg-white border border-[#D5DEE2] text-[#2F5F75] hover:bg-[#5ECAA0] hover:border-[#5ECAA0] hover:text-black disabled:opacity-60";

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

function formatWorkshopWhen(startsAt: string | null, endsAt: string | null) {
  if (!startsAt) return "Schedule TBA";
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;
  const date = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!end) return date;
  const hours = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60)),
  );
  return `${date} (${hours} hour${hours === 1 ? "" : "s"})`;
}

export default function StudentWorkshops() {
  const [workshops, setWorkshops] = useState<WorkshopWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/workshops");
    const json = (await res.json()) as {
      workshops?: WorkshopWithMeta[];
      error?: string;
    };
    if (!res.ok) throw new Error(json.error || "Failed to load workshops");
    setWorkshops(json.workshops ?? []);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await load();
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

  const myRegistered = useMemo(
    () => workshops.filter((w) => w.registered_by_me),
    [workshops],
  );

  async function onRegister(workshopId: string) {
    setBusyId(workshopId);
    setError(null);
    try {
      const res = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", workshopId }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Registration failed");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-7">
        <div className="min-w-0">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            Workshops
          </h1>
          <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-3xl">
            Explore upcoming live clinical sessions and register from the live
            catalog.
          </p>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px]">{error}</p>
        ) : null}

        <div className="flex flex-col xl:flex-row gap-6 w-full min-w-0 xl:items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <section className="w-full min-w-0">
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
                Upcoming Live Workshops
              </h2>

              {loading ? (
                <p className="text-[#777779] font-regular_18pt text-[14px]">
                  Loading workshops…
                </p>
              ) : workshops.length === 0 ? (
                <div className={`${card} p-8 text-center`}>
                  <p className="text-[#2F5F75] font-semi_bold_24pt text-[15px] mb-1">
                    No published workshops yet
                  </p>
                  <p className="text-[#777779] font-regular_18pt text-[13px]">
                    Run <code>seed_content.sql</code> in Supabase, then refresh.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {workshops.map((item) => (
                    <article
                      key={item.id}
                      className={`${card} p-5 flex flex-col`}
                    >
                      <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[15px] leading-snug mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#777779] font-regular_18pt text-[13px] mb-3 line-clamp-2">
                        {item.description || item.location || "Live session"}
                      </p>
                      <div className="flex items-center gap-1.5 mb-4">
                        <Image
                          src={asset("calendar (1).png")}
                          alt=""
                          width={14}
                          height={14}
                          unoptimized
                          className="w-3.5 h-3.5 object-contain flex-shrink-0"
                        />
                        <span className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px]">
                          {formatWorkshopWhen(item.starts_at, item.ends_at)}
                        </span>
                      </div>

                      <div className="border-t border-[#D5DEE2] pt-3.5 mb-4 flex items-center gap-2">
                        <Image
                          src={`${DASH}/avatar.png`}
                          alt=""
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover border-2 border-white"
                        />
                        <span className="text-[#777779] font-regular_18pt text-[12px]">
                          {item.registered_count} registered
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={item.registered_by_me || busyId === item.id}
                        onClick={() => onRegister(item.id)}
                        className={`mt-auto ${btnOutline}`}
                      >
                        {item.registered_by_me
                          ? "Registered"
                          : busyId === item.id
                            ? "Registering…"
                            : "Register Now"}
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className={`w-full xl:w-[280px] xl:flex-shrink-0 ${card} p-5`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] mb-4">
              My registrations
            </h2>
            {myRegistered.length === 0 ? (
              <p className="text-[#777779] font-regular_18pt text-[13px]">
                You have not registered for any workshops yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {myRegistered.map((w) => {
                  const d = w.starts_at ? new Date(w.starts_at) : null;
                  return (
                    <li key={w.id} className="flex items-start gap-3">
                      <div className="w-12 text-center flex-shrink-0">
                        <p className="text-[#3A738D] font-inter-medium_18pt text-[10px] uppercase">
                          {d
                            ? d.toLocaleDateString("en-US", { month: "short" })
                            : "—"}
                        </p>
                        <p className="text-[#2F5F75] font-semi_bold_24pt text-[18px] leading-none">
                          {d ? d.getDate() : "?"}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px] leading-snug">
                          {w.title}
                        </p>
                        <p className="text-[#777779] font-regular_18pt text-[12px]">
                          {d
                            ? d.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })
                            : "TBA"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </StudentDashboardShell>
  );
}
