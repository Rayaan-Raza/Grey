"use client";

import Image from "next/image";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const ASSET = "/Student_Dashboard";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

const metrics = [
  {
    label: "Total Enrolled Learners",
    value: "1,284",
    meta: "+12% this month",
    metaPositive: true,
    progress: 72,
    icon: `${ASSET}/Icon (16).svg`,
    bar: "#5ECAA0",
  },
  {
    label: "Active Courses",
    value: "2",
    meta: "1 upcoming",
    metaPositive: false,
    progress: 45,
    icon: `${ASSET}/book-open.svg`,
    bar: "#3A738D",
  },
  {
    label: "Course Enrollments",
    value: "5,842",
    meta: "+15.3% this month",
    metaPositive: true,
    progress: 80,
    icon: `${ASSET}/Icon (9).svg`,
    bar: "#5ECAA0",
  },
  {
    label: "Certificates Issued",
    value: "412",
    meta: "98% pass rate",
    metaPositive: true,
    progress: 98,
    icon: `${ASSET}/star.svg`,
    bar: "#5ECAA0",
  },
];

const activity = [
  {
    name: "Emily Chen",
    avatar: "/Instructors/faculty-elena.png",
    course: "Foundations of Endodontics — Remote",
    progress: 85,
    lastActive: "5 min ago",
    status: "In Progress" as const,
  },
  {
    name: "James Wilson",
    avatar: "/Instructors/faculty-julian.jpg",
    course: "Dental Implants Bootcamp",
    progress: 100,
    lastActive: "2 hours ago",
    status: "Completed" as const,
  },
  {
    name: "Priya Patel",
    avatar: "/Instructors/faculty-olivia.png",
    course: "Foundations of Endodontics",
    progress: 45,
    lastActive: "Yesterday",
    status: "In Progress" as const,
  },
];

const coursePerformance = [
  {
    title: "Foundations of Endodontics (Remote Learning)",
    students: "248 Students",
    rate: 62,
  },
  {
    title: "Foundations of Endodontics (Immersive Residency)",
    students: "186 Students",
    rate: 88,
  },
  {
    title: "Dental Implants Bootcamp (for General Practitioner)",
    students: "312 Students",
    rate: 79,
  },
];

const workshops = [
  {
    date: "Sep 15",
    title: "Advanced Implant Techniques",
    time: "10:00 AM",
    attendees: 24,
  },
  {
    date: "Sep 18",
    title: "Endodontic Case Review",
    time: "2:00 PM",
    attendees: 18,
  },
  {
    date: "Sep 22",
    title: "Digital Dentistry Workshop",
    time: "9:00 AM",
    attendees: 32,
  },
];

/** Monthly enrollments Jan–Dec for the trends chart */
const enrollmentData = [320, 410, 480, 560, 720, 980, 1284, 1100, 980, 860, 920, 1050];
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function EnrollmentChart() {
  const width = 720;
  const height = 240;
  const padX = 36;
  const padY = 24;
  const maxY = 1200;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = enrollmentData.map((v, i) => {
    const x = padX + (i / (enrollmentData.length - 1)) * innerW;
    const y = padY + innerH - (v / maxY) * innerH;
    return { x, y, v };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(padY + innerH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padY + innerH).toFixed(1)} Z`;

  const peak = points[6]; // July = 1,284

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height + 28}`}
        className="w-full min-w-[520px] h-auto"
        role="img"
        aria-label="Enrollment trends over the last 12 months"
      >
        <defs>
          <linearGradient id="enrollFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ECAA0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#5ECAA0" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 200, 400, 600, 800, 1000, 1200].map((tick) => {
          const y = padY + innerH - (tick / maxY) * innerH;
          return (
            <g key={tick}>
              <line
                x1={padX}
                x2={width - padX}
                y1={y}
                y2={y}
                stroke="#D5DEE2"
                strokeDasharray="4 4"
              />
              <text
                x={padX - 8}
                y={y + 4}
                textAnchor="end"
                fill="#777779"
                fontSize="10"
                fontFamily="inherit"
              >
                {tick === 0 ? "0" : tick.toLocaleString()}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#enrollFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#5ECAA0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Peak marker (July) */}
        <line
          x1={peak.x}
          x2={peak.x}
          y1={peak.y}
          y2={padY + innerH}
          stroke="#5ECAA0"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx={peak.x} cy={peak.y} r="5" fill="#5ECAA0" stroke="white" strokeWidth="2" />
        <rect
          x={peak.x - 28}
          y={peak.y - 36}
          width="56"
          height="24"
          rx="6"
          fill="#2F5F75"
        />
        <text
          x={peak.x}
          y={peak.y - 20}
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="600"
          fontFamily="inherit"
        >
          1,284
        </text>

        {months.map((m, i) => (
          <text
            key={m}
            x={points[i].x}
            y={height + 16}
            textAnchor="middle"
            fill="#777779"
            fontSize="10"
            fontFamily="inherit"
          >
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}

function MeetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="14" height="14" rx="2" fill="#00897B" />
      <path d="M16 10l6-3v10l-6-3V10z" fill="#00897B" />
    </svg>
  );
}

export default function AdminDashboard() {
  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        {/* Welcome banner */}
        <section
          className="relative w-full min-w-0 overflow-hidden rounded-[20px] sm:rounded-[24px] px-6 sm:px-8 py-7 sm:py-8"
          style={{
            background:
              "radial-gradient(circle at 25% 20%, #569CBC 0%, #3A738D 55%, #2F5F75 100%)",
          }}
        >
          <div className="relative z-10 max-w-xl">
            <h1 className="text-white font-semi_bold_24pt text-[24px] sm:text-[30px] leading-tight tracking-tight mb-2">
              Welcome Back, Admin!
            </h1>
            <p className="text-white/80 font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed">
              Manage learning, learners, courses, and platform activity from one
              place.
            </p>
          </div>
          <Image
            src="/Admin-dash/ad7b866c0d763c2f177b94453672c0d33ded855a.png"
            alt=""
            width={160}
            height={160}
            unoptimized
            className="pointer-events-none absolute right-4 sm:right-10 bottom-[-8px] w-[100px] sm:w-[140px] h-auto object-contain opacity-95"
          />
        </section>

        {/* Metrics */}
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
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </span>
              </div>
              <p className="text-[#2F5F75] font-semi_bold_24pt text-[28px] leading-none tracking-tight mb-2">
                {m.value}
              </p>
              <p
                className={`font-inter-medium_18pt text-[12px] mb-3 ${
                  m.metaPositive ? "text-[#5ECAA0]" : "text-[#777779]"
                }`}
              >
                {m.meta}
              </p>
              <div className="h-1.5 w-full rounded-full bg-[#E8F1F5] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${m.progress}%`, backgroundColor: m.bar }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Recent Activity */}
        <section className={`${card} p-5 sm:p-6 overflow-hidden`}>
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-5">
            Recent Activity
          </h2>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D5DEE2]">
                  {["Learners", "Course Enrolled", "Progress", "Last Active", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="pb-3 pr-4 text-[#777779] font-inter-medium_18pt text-[12px] uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {activity.map((row) => (
                  <tr key={row.name} className="border-b border-[#D5DEE2] last:border-0">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={row.avatar}
                          alt=""
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                      {row.course}
                    </td>
                    <td className="py-4 pr-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[#E8F1F5] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#5ECAA0]"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span className="text-[#2F5F75] font-inter-medium_18pt text-[12px] w-8">
                          {row.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                      {row.lastActive}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full font-inter-medium_18pt text-[11px] ${
                          row.status === "Completed"
                            ? "bg-[#E5F8F0] text-[#2F5F75]"
                            : "bg-[#FFF4E5] text-[#B86E00]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Course Performance */}
        <section className="w-full min-w-0">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Course Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coursePerformance.map((c) => (
              <article key={c.title} className={`${card} p-5`}>
                <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[14px] sm:text-[15px] leading-snug mb-2">
                  {c.title}
                </h3>
                <p className="text-[#777779] font-regular_18pt text-[13px] mb-4">
                  {c.students}
                </p>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[#3A738D] font-inter-medium_18pt text-[13px]">
                    {c.rate}% Completion Rate
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E8F1F5] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#5ECAA0]"
                    style={{ width: `${c.rate}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Workshops */}
        <section className="w-full min-w-0">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Upcoming Workshops &amp; Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workshops.map((w) => (
              <article key={w.title} className={`${card} p-5`}>
                <span className="inline-flex rounded-[8px] bg-[#2F5F75] text-white font-inter-medium_18pt text-[11px] px-2.5 py-1 mb-3">
                  {w.date}
                </span>
                <h3 className="text-[#3A738D] font-semi_bold_24pt text-[15px] leading-snug mb-2">
                  {w.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[#777779] font-regular_18pt text-[13px] mb-4">
                  <span>{w.time}</span>
                  <span>•</span>
                  <MeetIcon />
                  <span>Google Meet</span>
                </div>
                <div className="flex items-center gap-2 text-[#777779] font-regular_18pt text-[13px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3.5" stroke="#777779" strokeWidth="1.5" />
                    <path
                      d="M3.5 18.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5"
                      stroke="#777779"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="17" cy="9" r="2.5" stroke="#777779" strokeWidth="1.5" />
                    <path
                      d="M20.5 18c0-2-1.6-3.6-3.5-3.6"
                      stroke="#777779"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {w.attendees} attendees
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Enrollment Trends */}
        <section className={`${card} p-5 sm:p-6`}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug">
              Enrollment Trends
            </h2>
            <span className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px]">
              Last 12 months
            </span>
          </div>
          <EnrollmentChart />
        </section>
      </div>
    </AdminDashboardShell>
  );
}
