"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const ASSET = "/Student-Workshop";
const DASH = "/Student_Dashboard";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

const liveWorkshops = [
  {
    title: "Endo Access & Canal Shaping — Live Demo",
    instructor: "Dr. Sarah Mitchell",
    avatar: asset("f6a4a7f5cf7d4c7df0030029ed6e95e90deddb96.png"),
    date: "Sep 3, 2026",
    duration: "2 hours",
    time: "2:00 PM",
    registered: 42,
    category: "Endodontics",
  },
  {
    title: "Hands-On Obturation Techniques",
    instructor: "Dr. James Carter",
    avatar: asset("bdd0321b287978f43523bf5a82582c77b5261ac4.png"),
    date: "Sep 17, 2026",
    duration: "3 hours",
    time: "1:00 PM",
    registered: 28,
    category: "Endodontics",
  },
  {
    title: "Implant Site Preparation & Placement",
    instructor: "Dr. Ahmed Khalil",
    avatar: asset("c040503634ac81f55fa0eec351fcfac433e9f782.png"),
    date: "Sep 10, 2026",
    duration: "4 hours",
    time: "10:00 AM",
    registered: 35,
    category: "Implants",
  },
];

const videos = [
  {
    tag: "ENDODONTICS REMOTE",
    title: "Pulp Vitality & Diagnosis Review",
    series: "Foundations of Endodontics",
    rating: 4.9,
    duration: "30 min",
    views: "1.2k views",
    thumb: asset("b4d691d91389824b0cd06d2f5b09e9dc168a01d3.png"),
    category: "Endodontics",
  },
  {
    tag: "ENDODONTICS IMMERSIVE",
    title: "Live Case Walkthrough",
    series: "Advanced Clinical Series",
    rating: 4.8,
    duration: "55 min",
    views: "980 views",
    thumb: asset("5cd47d63724f7ef75e526c44c8344b009e78770a.png"),
    category: "Endodontics",
  },
  {
    tag: "IMPLANT BOOTCAMP",
    title: "Implant Prosthetics for the GP",
    series: "Dental Implants Bootcamp",
    rating: 4.7,
    duration: "40 min",
    views: "1.5k views",
    thumb: asset("2da7759fc7ff0b1d57b80f1640b28b9ada2e728d.png"),
    category: "Implants",
  },
];

function RatingStars({ rating }: { rating: number }) {
  const fullBase = Math.floor(rating);
  const frac = rating - fullBase;
  const full = frac >= 0.85 ? fullBase + 1 : fullBase;
  const hasHalf = frac >= 0.25 && frac < 0.85;
  const gradientId = `admin-ws-half-${rating.toString().replace(".", "-")}`;

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        if (n <= full) return <Star key={n} fill="full" />;
        if (n === full + 1 && hasHalf)
          return <Star key={n} fill="half" gradientId={gradientId} />;
        return <Star key={n} fill="empty" />;
      })}
    </div>
  );
}

function Star({
  fill,
  gradientId,
}: {
  fill: "full" | "half" | "empty";
  gradientId?: string;
}) {
  if (fill === "full") {
    return (
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M7 1.4l1.62 3.28 3.62.53-2.62 2.55.62 3.61L7 9.66l-3.24 1.71.62-3.61L1.76 5.21l3.62-.53L7 1.4z"
          fill="#5ECAA0"
        />
      </svg>
    );
  }
  if (fill === "half" && gradientId) {
    return (
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#5ECAA0" />
            <stop offset="50%" stopColor="#D5DEE2" />
          </linearGradient>
        </defs>
        <path
          d="M7 1.4l1.62 3.28 3.62.53-2.62 2.55.62 3.61L7 9.66l-3.24 1.71.62-3.61L1.76 5.21l3.62-.53L7 1.4z"
          fill={`url(#${gradientId})`}
        />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 1.4l1.62 3.28 3.62.53-2.62 2.55.62 3.61L7 9.66l-3.24 1.71.62-3.61L1.76 5.21l3.62-.53L7 1.4z"
        fill="#D5DEE2"
      />
    </svg>
  );
}

export default function AdminWorkshops() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");

  const liveVisible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return liveWorkshops.filter((w) => {
      const catOk =
        category === "All Categories" || w.category === category;
      const qOk =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.instructor.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, category]);

  const videosVisible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => {
      const catOk =
        category === "All Categories" || v.category === category;
      const qOk =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.series.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, category]);

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Workshops
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
              Manage live clinical sessions and on-demand workshop videos for
              learners.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors flex-shrink-0"
          >
            <span className="text-[16px] leading-none">+</span>
            Add New Workshop
          </button>
        </div>

        {/* Filters */}
        <div className={`${card} p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center`}>
          <label className="relative flex-1 min-w-0">
            <span className="sr-only">Search workshops</span>
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workshops..."
              className="w-full pl-10 pr-3 py-2.5 rounded-[10px] bg-[#F4F7F8] border border-transparent focus:border-[#D5DEE2] focus:bg-white text-[#2F5F75] font-regular_18pt text-[13px] outline-none placeholder:text-[#777779]/65"
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] outline-none"
            aria-label="Category filter"
          >
            <option>All Categories</option>
            <option>Endodontics</option>
            <option>Implants</option>
          </select>
        </div>

        {/* Upcoming Live */}
        <section className="w-full min-w-0">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Upcoming Live Workshops
          </h2>
          <div className="flex flex-col gap-3">
            {liveVisible.map((w) => (
              <article
                key={w.title}
                className={`${card} flex flex-col lg:flex-row lg:items-center gap-4 px-4 sm:px-5 py-4`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[15px] leading-snug">
                      {w.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5F8F0] text-[#2F5F75] font-inter-medium_18pt text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5ECAA0]" />
                      Scheduled
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                    <span className="inline-flex items-center gap-2 text-[#777779] font-regular_18pt">
                      <Image
                        src={w.avatar}
                        alt=""
                        width={24}
                        height={24}
                        unoptimized
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      {w.instructor}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#777779] font-regular_18pt">
                      <Image
                        src={asset("calendar (1).png")}
                        alt=""
                        width={14}
                        height={14}
                        unoptimized
                        className="w-3.5 h-3.5 object-contain"
                      />
                      {w.date} • {w.time} ({w.duration})
                    </span>
                    <span className="text-[#777779] font-regular_18pt">
                      {w.registered} registered
                    </span>
                  </div>
                </div>
                <Link
                  href="/admin-dashboard/workshops/edit"
                  className="inline-flex items-center justify-center self-start lg:self-center px-3.5 py-2 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[13px] hover:bg-[#5ECAA0] hover:border-[#5ECAA0] hover:text-black transition-colors flex-shrink-0"
                >
                  Edit
                </Link>
              </article>
            ))}
            {liveVisible.length === 0 && (
              <div className={`${card} px-5 py-8 text-center`}>
                <p className="text-[#777779] font-regular_18pt text-[14px]">
                  No live workshops match your search.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* On-demand videos */}
        <section className="w-full min-w-0">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Popular On-Demand Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {videosVisible.map((v) => (
              <article
                key={v.title}
                className={`${card} overflow-hidden flex flex-col`}
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E8ECED]">
                  <Image
                    src={v.thumb}
                    alt={v.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Image
                      src="/play-square.png"
                      alt=""
                      width={48}
                      height={48}
                      unoptimized
                      className="w-12 h-12 object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <span className="inline-flex self-start rounded-[6px] bg-[#E8F1F5] text-[#3A738D] font-inter-medium_18pt text-[10px] tracking-wide uppercase px-2 py-1 mb-2.5">
                    {v.tag}
                  </span>
                  <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[14px] sm:text-[15px] leading-snug mb-1">
                    {v.title}
                  </h3>
                  <p className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] mb-3">
                    {v.series}
                  </p>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <RatingStars rating={v.rating} />
                      <span className="text-[#2F5F75] font-inter-medium_18pt text-[12px]">
                        {v.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0">
                      {v.duration} • {v.views}
                    </span>
                  </div>
                  <Link
                    href="/admin-dashboard/workshops/edit"
                    className="mt-auto self-start text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {videosVisible.length === 0 && (
            <div className={`${card} px-5 py-8 text-center`}>
              <p className="text-[#777779] font-regular_18pt text-[14px]">
                No on-demand videos match your search.
              </p>
            </div>
          )}
        </section>
      </div>
    </AdminDashboardShell>
  );
}
