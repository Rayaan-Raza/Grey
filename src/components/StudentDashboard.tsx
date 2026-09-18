"use client";

import Image from "next/image";
import Link from "next/link";
import StudentDashboardMore from "@/components/StudentDashboardMore";
import StudentDashboardShell from "@/components/StudentDashboardShell";

const ASSET = "/Student_Dashboard";

const metrics = [
  {
    value: "03",
    label: "Enrolled Courses",
    sub: "Active learning programs",
    icon: `${ASSET}/book-open.svg`,
    visual: "bars" as const,
  },
  {
    value: "70%",
    label: "Overall Progress",
    sub: "Average course completion",
    icon: `${ASSET}/bar-chart-3.svg`,
    visual: "progress" as const,
    progress: 70,
    href: "/student-dashboard/progress",
  },
  {
    value: "18.5",
    label: "Learning Hours",
    sub: "+3.2h this week",
    subAccent: true,
    icon: `${ASSET}/clock.svg`,
    visual: "hours" as const,
    progress: 62,
  },
  {
    value: "02",
    label: "Certificates",
    sub: "1 ready to claim",
    icon: `${ASSET}/star.svg`,
    visual: "certs" as const,
    href: "/student-dashboard/certificates",
  },
];

const deadlines = [
  {
    title: "Module Quiz",
    sub: "Endodontics Ch.7",
    when: "Friday",
    icon: `${ASSET}/Icon (22).svg`,
  },
  {
    title: "Workbook Submission",
    sub: "Clinical workbook",
    when: "Aug 12",
    icon: `${ASSET}/Icon (23).svg`,
  },
  {
    title: "Live Q&A Session",
    sub: "Office hours",
    when: "Saturday",
    icon: `${ASSET}/Icon (24).svg`,
  },
];

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

const cardShadow = "shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

export default function StudentDashboard() {
  return (
    <StudentDashboardShell>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-5 sm:gap-6">
          {/* Row: Welcome + Deadlines */}
          <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 w-full min-w-0 xl:items-stretch">
            <section
              className={`relative overflow-hidden flex-1 min-w-0 rounded-[20px] sm:rounded-[24px] bg-white border border-[#D5DEE2] ${cardShadow} px-6 sm:px-8 py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center gap-6`}
            >
              {/* Soft mint glow — Figma */}
              <div
                className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-2xl opacity-90"
                style={{
                  background:
                    "radial-gradient(circle, #5ECAA04D 0%, #3A738D1A 45%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 min-w-0 relative z-10">
                <h1 className="text-[26px] sm:text-[30px] md:text-[34px] font-semi_bold_24pt text-[#2F5F75] leading-[1.2] tracking-tight mb-2.5 sm:mb-3">
                  Welcome Back, Dr. Sarah!
                </h1>
                <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-6 sm:mb-7">
                  Continue building your clinical skills and stay on track with
                  your learning journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto min-w-0">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 bg-[#5ECAA0] hover:bg-[#7ED9B5] text-black px-5 py-3 rounded-[12px] font-inter-medium_18pt text-[14px] sm:text-[15px] transition-colors shadow-[0_4px_14px_rgba(94,202,160,0.35)]"
                  >
                    <Image
                      src={asset("Icon (26).svg")}
                      alt=""
                      width={12}
                      height={12}
                      className="w-3 h-3"
                    />
                    Resume Learning
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center bg-white border border-[#3A738D] text-[#3A738D] hover:bg-[#3A738D] hover:text-white px-5 py-3 rounded-[12px] font-inter-medium_18pt text-[14px] sm:text-[15px] transition-colors"
                  >
                    Browse Courses
                  </Link>
                </div>
              </div>

              <div className="hidden sm:flex relative z-10 items-center justify-center flex-shrink-0 w-[150px] md:w-[180px] lg:w-[200px]">
                <Image
                  src="/hero-sections/main-page-tooth.svg"
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(47,95,117,0.15)]"
                />
              </div>
            </section>

            <aside className="w-full xl:w-[340px] xl:flex-shrink-0 min-w-0 flex flex-col">
              <article
                className={`flex flex-col flex-1 w-full min-w-0 bg-white border border-[#D5DEE2] rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 ${cardShadow}`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug">
                    Upcoming Deadlines
                  </h2>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1F5] text-[#3A738D] font-semi_bold_24pt text-[12px]">
                    3
                  </span>
                </div>

                <ul className="flex flex-col w-full min-w-0 mt-2">
                  {deadlines.map((item, index) => (
                    <li
                      key={item.title}
                      className={`flex items-center gap-3 py-4 ${
                        index < deadlines.length - 1
                          ? "border-b border-[#D5DEE2]"
                          : "pb-0"
                      } ${index === 0 ? "pt-3" : ""}`}
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-[12px] bg-[#F4F7F8] flex-shrink-0">
                        <Image
                          src={item.icon}
                          alt=""
                          width={18}
                          height={18}
                          className="w-[18px] h-[18px]"
                        />
                      </span>
                      <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                        <span className="text-[#2F5F75] font-semi_bold_24pt text-[14px] leading-snug truncate">
                          {item.title}
                        </span>
                        <span className="text-[#777779] font-regular_18pt text-[12px] leading-snug truncate">
                          {item.sub}
                        </span>
                      </div>
                      <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0">
                        {item.when}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </aside>
          </div>

          {/* Metrics */}
          <section className="flex flex-col sm:flex-row flex-wrap xl:flex-nowrap gap-4 w-full min-w-0">
            {metrics.map((m) => {
              const href = "href" in m ? m.href : undefined;
              const className = `flex flex-col flex-1 min-w-0 sm:min-w-[calc(50%-0.5rem)] xl:min-w-0 bg-white border border-[#D5DEE2] rounded-[18px] sm:rounded-[20px] p-5 ${cardShadow} ${
                href ? "hover:border-[#3A738D]/50 transition-colors" : ""
              }`;
              const body = (
                <>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span className="text-[#777779] font-regular_18pt text-[13px] leading-snug">
                    {m.label}
                  </span>
                  <Image
                    src={m.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] flex-shrink-0 opacity-55"
                  />
                </div>
                <p className="text-[#2F5F75] font-semi_bold_24pt text-[30px] sm:text-[32px] leading-none tracking-tight mb-1.5">
                  {m.value}
                </p>
                <p
                  className={`font-regular_18pt text-[12px] sm:text-[13px] leading-snug mb-4 ${
                    m.subAccent ? "text-[#5ECAA0]" : "text-[#777779]"
                  }`}
                >
                  {m.sub}
                </p>

                {m.visual === "bars" && (
                  <div className="flex items-end gap-1.5 h-9 mt-auto">
                    {[36, 58, 44, 78, 52, 68].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-[3px] bg-[#3A738D]/20"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                )}
                {m.visual === "progress" && (
                  <div className="mt-auto h-2 rounded-full bg-[#F4F7F8] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#5ECAA0]"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                )}
                {m.visual === "hours" && (
                  <div className="mt-auto h-2 rounded-full bg-[#F4F7F8] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#3A738D]"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                )}
                {m.visual === "certs" && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {["Earned", "Earned"].map((label, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F8F0] px-2.5 py-1 text-[11px] font-inter-medium_18pt text-[#2F5F75]"
                      >
                        <Image
                          src={`${ASSET}/star.svg`}
                          alt=""
                          width={12}
                          height={12}
                          className="w-3 h-3"
                        />
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                </>
              );
              return href ? (
                <Link key={m.label} href={href} className={className}>
                  {body}
                </Link>
              ) : (
                <article key={m.label} className={className}>
                  {body}
                </article>
              );
            })}
          </section>

          {/* Continue Learning */}
          <section className="flex flex-col w-full min-w-0">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[18px] sm:text-[20px] leading-snug">
                Continue Learning
              </h2>
              <Link
                href="/student-dashboard/courses"
                className="text-[#3A738D] hover:text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors"
              >
                See All
              </Link>
            </div>

            <article
              className={`flex flex-col md:flex-row gap-5 w-full min-w-0 bg-white border border-[#D5DEE2] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 ${cardShadow}`}
            >
              <div className="relative w-full md:w-[210px] lg:w-[230px] h-[148px] md:h-[168px] rounded-[14px] overflow-hidden flex-shrink-0 bg-[#E8F1F5]">
                <Image
                  src={`${ASSET}/course-thumb.jpg`}
                  alt="Endodontics Foundation course"
                  fill
                  className="object-cover"
                  sizes="230px"
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0 py-0.5">
                <span className="inline-flex self-start bg-[#E8F1F5] text-[#3A738D] font-semi_bold_24pt text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full mb-2.5">
                  Clinical
                </span>
                <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[19px] leading-snug mb-1">
                  Endodontics Foundation
                </h3>
                <p className="text-[#777779] font-regular_18pt text-[13px] leading-snug">
                  Dr. John Smith
                </p>
                <p className="text-[#777779] font-regular_18pt text-[13px] leading-snug mb-4">
                  Clinical Demo Video
                </p>

                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                    70%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#F4F7F8] overflow-hidden mb-4">
                  <div className="h-full w-[70%] rounded-full bg-[#5ECAA0]" />
                </div>

                <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] flex-1 min-w-0">
                    <span className="inline-flex items-center gap-1.5">
                      <Image
                        src={`${ASSET}/clock.svg`}
                        alt=""
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 opacity-55"
                      />
                      ~3h remaining
                    </span>
                    <span>Chapter 7 of 10</span>
                    <Link
                      href="/courses/endodontics-remote"
                      className="inline-flex items-center gap-1 text-[#3A738D] hover:text-[#2F5F75] font-inter-medium_18pt"
                    >
                      Details
                      <Image
                        src={asset("Icon (27).svg")}
                        alt=""
                        width={12}
                        height={12}
                        className="w-3 h-3"
                      />
                    </Link>
                  </div>
                  <Link
                    href="/courses/endodontics-remote"
                    className="inline-flex items-center justify-center gap-2 self-stretch sm:self-auto bg-[#5ECAA0] hover:bg-[#7ED9B5] text-black px-5 py-2.5 rounded-[12px] font-inter-medium_18pt text-[14px] transition-colors flex-shrink-0 shadow-[0_4px_12px_rgba(94,202,160,0.3)]"
                  >
                    <Image
                      src={asset("Icon (26).svg")}
                      alt=""
                      width={12}
                      height={12}
                      className="w-3 h-3"
                    />
                    Resume
                  </Link>
                </div>
              </div>
            </article>
          </section>

          <StudentDashboardMore />
        </div>
    </StudentDashboardShell>
  );
}
