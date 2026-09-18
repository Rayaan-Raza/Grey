"use client";

import { useState } from "react";
import Image from "next/image";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const AN = "/Admin-Analytics";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

function anIcon(name: string) {
  return `${AN}/${encodeURIComponent(name)}`;
}

const kpis = [
  {
    label: "Total Revenue",
    value: "$48,350",
    meta: "18% vs last month",
    up: true,
  },
  {
    label: "Course Completions",
    value: "156",
    meta: "Within selected period",
    up: false,
  },
  {
    label: "Avg Session Time",
    value: "42 min",
    meta: "Platform engagement",
    up: false,
  },
  {
    label: "Student Satisfaction",
    value: "4.7 / 5",
    meta: "Post-course survey average",
    up: false,
  },
];

const enrollments = [
  { month: "Apr", value: 42, capacity: 70 },
  { month: "May", value: 58, capacity: 78 },
  { month: "Jun", value: 65, capacity: 82 },
  { month: "Jul", value: 78, capacity: 90 },
  { month: "Aug", value: 88, capacity: 95 },
  { month: "Sep", value: 96, capacity: 100 },
];

const revenueSegments = [
  { label: "Course Fees", pct: 62, color: "#2F5F75" },
  { label: "Workshop Registrations", pct: 24, color: "#569CBC" },
  { label: "Certificate Fees", pct: 14, color: "#5ECAA0" },
];

const topCourses = [
  {
    title: "Foundations of Endodontics — Remote Learning",
    students: 312,
    pct: 100,
  },
  {
    title: "Dental Implants Bootcamp",
    students: 245,
    pct: 78,
  },
  {
    title: "Foundations of Endodontics — Immersive Residency",
    students: 203,
    pct: 65,
  },
];

const recentCerts = [
  {
    name: "Dr. Emily Chen",
    course: "Foundations of Endodontics",
    date: "Sep 6, 2026",
  },
  {
    name: "Dr. James Park",
    course: "Foundations of Endodontics",
    date: "Sep 5, 2026",
  },
  {
    name: "Dr. Maria Lopez",
    course: "Dental Implants Bootcamp",
    date: "Sep 5, 2026",
  },
];

const engagement = [
  {
    value: "47",
    label: "New registrations",
    icon: anIcon("icon-container.png"),
    bg: "bg-[#2F5F75]",
  },
  {
    value: "81%",
    label: "Avg quiz score",
    icon: anIcon("award (2).png"),
    bg: "bg-[#3A738D]",
  },
  {
    value: "1,247",
    label: "Resources downloaded",
    icon: anIcon("icon-container (1).png"),
    bg: "bg-[#5ECAA0]",
  },
  {
    value: "834",
    label: "Active learners this week",
    icon: anIcon("icon-container (2).png"),
    bg: "bg-[#569CBC]",
  },
];

const activity = [
  {
    name: "Dr. Mariam Ali passed Quiz 3",
    detail: "Completed Foundations of Endodontics with 95% score",
    when: "5m ago",
    avatar: "/Instructors/faculty-elena.png",
  },
  {
    name: "Dr. Usman Tariq submitted Case Study",
    detail: "Implant Placement Bootcamp clinical writeup uploaded",
    when: "1h ago",
    avatar: "/Instructors/faculty-julian.jpg",
  },
  {
    name: "Certificate issued to Dr. Ahmed Khan",
    detail: "Completed 10 hours of CE credits in Implant Dentistry",
    when: "3h ago",
    avatar: "/Instructors/faculty-daniel.png",
  },
  {
    name: "Certificate issued to Dr. Sarah Mitchell",
    detail: "Completed Foundations of Endodontics remote pathway",
    when: "3h ago",
    avatar: "/Student_Dashboard/avatar.png",
  },
];

function EnrollmentChart() {
  const max = Math.max(...enrollments.map((e) => e.capacity));
  return (
    <div className="flex items-end gap-3 sm:gap-4 h-[200px] sm:h-[220px] w-full pt-2">
      {enrollments.map((e) => (
        <div
          key={e.month}
          className="flex-1 min-w-0 h-full flex flex-col items-center justify-end gap-2"
        >
          <div className="relative w-full max-w-[44px] h-full flex items-end justify-center">
            <div
              className="absolute bottom-0 w-[70%] rounded-t-[6px] opacity-35"
              style={{
                height: `${(e.capacity / max) * 100}%`,
                background:
                  "repeating-linear-gradient(90deg, #569CBC 0 2px, transparent 2px 4px)",
              }}
            />
            <div
              className="relative w-[70%] rounded-t-[6px] bg-[#3A738D]"
              style={{ height: `${(e.value / max) * 100}%` }}
            />
          </div>
          <span className="text-[#777779] font-regular_18pt text-[11px] sm:text-[12px]">
            {e.month}
          </span>
        </div>
      ))}
    </div>
  );
}

function RevenueGauge() {
  // Semi-circle donut via SVG arcs
  const cx = 120;
  const cy = 110;
  const r = 78;
  const stroke = 22;
  const total = 180; // degrees for semi-circle
  let start = 180; // start from left

  function polar(deg: number, radius: number) {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  function arcPath(fromDeg: number, spanDeg: number) {
    const toDeg = fromDeg + spanDeg;
    const startP = polar(fromDeg, r);
    const endP = polar(toDeg, r);
    const large = spanDeg > 180 ? 1 : 0;
    return `M ${startP.x} ${startP.y} A ${r} ${r} 0 ${large} 1 ${endP.x} ${endP.y}`;
  }

  const arcs = revenueSegments.map((seg) => {
    const span = (seg.pct / 100) * total;
    const path = arcPath(start, span);
    start += span;
    return { ...seg, path };
  });

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 240 140" className="w-full max-w-[260px] h-auto">
        <path
          d={arcPath(180, 180)}
          fill="none"
          stroke="#E8F1F5"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {arcs.map((a) => (
          <path
            key={a.label}
            d={a.path}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        ))}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill="#777779"
          fontSize="12"
          fontFamily="inherit"
        >
          Revenue
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fill="#2F5F75"
          fontSize="22"
          fontWeight="600"
          fontFamily="inherit"
        >
          $48.3K
        </text>
      </svg>
      <ul className="w-full flex flex-col gap-2.5 mt-2">
        {revenueSegments.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between gap-2 text-[13px]"
          >
            <span className="inline-flex items-center gap-2 text-[#2F5F75] font-regular_18pt min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="truncate">{s.label}</span>
            </span>
            <span className="text-[#777779] font-inter-medium_18pt flex-shrink-0">
              {s.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminAnalytics() {
  const [range, setRange] = useState("Last 30 days");

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Analytics
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
              Platform performance, revenue tracking, and learning outcomes.
            </p>
          </div>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="self-start px-3.5 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[13px] outline-none"
            aria-label="Date range"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <article key={k.label} className={`${card} p-5`}>
              <p className="text-[#777779] font-regular_18pt text-[13px] mb-2">
                {k.label}
              </p>
              <p className="text-[#2F5F75] font-semi_bold_24pt text-[28px] leading-none tracking-tight mb-2">
                {k.value}
              </p>
              <p
                className={`font-inter-medium_18pt text-[12px] ${
                  k.up ? "text-[#5ECAA0]" : "text-[#777779]"
                }`}
              >
                {k.up ? "↑ " : ""}
                {k.meta}
              </p>
            </article>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-5">
          <section className={`${card} p-5 sm:p-6 xl:col-span-2`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-4">
              Student Enrollments
            </h2>
            <EnrollmentChart />
          </section>
          <section className={`${card} p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-3">
              Revenue Breakdown
            </h2>
            <RevenueGauge />
          </section>
        </div>

        {/* Top courses + recent certs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-5">
          <section className={`${card} p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
              Top Courses by Enrollment
            </h2>
            <ul className="flex flex-col gap-5">
              {topCourses.map((c) => (
                <li key={c.title}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] leading-snug min-w-0">
                      {c.title}
                    </p>
                    <span className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] flex-shrink-0">
                      {c.students} students
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#E8F1F5] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#3A738D]"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${card} p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
              Recent Certificates
            </h2>
            <ul className="flex flex-col gap-1">
              {recentCerts.map((c) => (
                <li
                  key={c.name + c.date}
                  className="flex items-start justify-between gap-3 px-3 py-3 rounded-[10px] hover:bg-[#F4F7F8] transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-[#3A738D] font-inter-medium_18pt text-[14px] leading-snug">
                      {c.name}
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px] mt-0.5">
                      {c.course}
                    </p>
                  </div>
                  <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0">
                    {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Engagement + LMS activity */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 xl:gap-5">
          <section className={`${card} p-5 sm:p-6 xl:col-span-2`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
              Learner Engagement
            </h2>
            <ul className="flex flex-col gap-4">
              {engagement.map((e) => (
                <li key={e.label} className="flex items-center gap-3.5">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-[10px] flex-shrink-0 ${e.bg}`}
                  >
                    <Image
                      src={e.icon}
                      alt=""
                      width={18}
                      height={18}
                      unoptimized
                      className="w-[18px] h-[18px] object-contain brightness-0 invert"
                    />
                  </span>
                  <p className="text-[#2F5F75] font-semi_bold_24pt text-[22px] leading-none tracking-tight w-16 flex-shrink-0">
                    {e.value}
                  </p>
                  <p className="text-[#777779] font-regular_18pt text-[13px] min-w-0">
                    {e.label}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${card} p-5 sm:p-6 xl:col-span-3`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-1">
              Recent LMS Activity
            </h2>
            <p className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] mb-5">
              Live learner events and compliance audits
            </p>
            <ul className="flex flex-col">
              {activity.map((a, i) => (
                <li
                  key={`${a.name}-${i}`}
                  className="flex items-start gap-3 py-3.5 border-b border-[#D5DEE2] last:border-0"
                >
                  <Image
                    src={a.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[#D5DEE2]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#3A738D] font-inter-medium_18pt text-[13px] sm:text-[14px] leading-snug">
                      {a.name}
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px] mt-0.5 leading-relaxed">
                      {a.detail}
                    </p>
                  </div>
                  <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0">
                    {a.when}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AdminDashboardShell>
  );
}
