"use client";

import Image from "next/image";
import Link from "next/link";
import StudentDashboardShell from "@/components/StudentDashboardShell";

const ASSET = "/Student_Dashboard";
const card =
  "bg-white border border-[#D5DEE2] rounded-[20px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

const stats = [
  { value: "24", label: "Courses Completed" },
  { value: "12", label: "Certificates Earned" },
  { value: "45.5", label: "CE Credits Acquired" },
  { value: "16h", label: "Workshop Hours" },
];

const journey = [
  {
    title: "Earned 'Endodontics Immersive Mastery' Certificate",
    detail: "Completing all 6 modules and clinical evaluation • 2 days ago",
    icon: `${ASSET}/star.svg`,
  },
  {
    title: "Started Advanced Implantology Bootcamp",
    detail: "In Progress: Module 2 (Site checklist & Planning) • Last active yesterday",
    icon: `${ASSET}/book-open.svg`,
  },
  {
    title: "Posted a clinical case study in Community Forum",
    detail: "'CBCT Analysis of Mandibular Canal Proximity' • 4 replies received • 3 days ago",
    icon: `${ASSET}/Icon (28).svg`,
  },
];

const badges = [
  {
    title: "Root Canal Guru",
    detail: "Completed 5 major endodontic masterclasses",
  },
  {
    title: "CE Champion",
    detail: "Acquired over 40 hours of CE credits",
  },
  {
    title: "Active Peer",
    detail: "Top 5% contributor in clinical discussions",
  },
];

const specializations = [
  "Endodontics",
  "Dental Implants",
  "Prosthodontics",
  "CBCT Analysis",
  "Rotary Instrumentation",
  "Minimally Invasive",
  "CAD/CAM Restoration",
];

function JourneyIcon({ src }: { src: string }) {
  return (
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E5F8F0] flex-shrink-0">
      <Image
        src={src}
        alt=""
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain"
      />
    </span>
  );
}

export default function StudentProfile() {
  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        {/* Profile header */}
        <section className={`${card} overflow-hidden`}>
          <div
            className="h-24 sm:h-28 w-full"
            style={{
              background:
                "linear-gradient(90deg, #2F5F75 0%, #3A738D 45%, #5ECAA0 100%)",
            }}
          />

          <div className="px-5 sm:px-7 pb-6 sm:pb-7 relative">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-6 sm:mb-7">
              <Image
                src={`${ASSET}/avatar.png`}
                alt="Sarah Mitchell"
                width={96}
                height={96}
                className="-mt-10 sm:-mt-12 w-20 h-20 sm:w-24 sm:h-24 rounded-[16px] object-cover border-4 border-white shadow-[0_4px_16px_rgba(47,95,117,0.12)] flex-shrink-0 bg-white relative z-10"
              />

              <div className="flex-1 min-w-0 pt-1 sm:pt-3">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[22px] sm:text-[26px] leading-tight tracking-tight">
                    Sarah Mitchell
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E5F8F0] text-[#2F5F75] font-inter-medium_18pt text-[11px] sm:text-[12px] px-2.5 py-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="6" cy="6" r="6" fill="#5ECAA0" />
                      <path
                        d="M3.5 6.2L5.1 7.8L8.5 4.2"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Verified
                  </span>
                </div>
                <p className="inline-flex items-center gap-1.5 text-[#777779] font-regular_18pt text-[13px] sm:text-[14px]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11zm1.7.5 6.3 4.2L18.3 7H5.7z"
                      fill="#777779"
                    />
                  </svg>
                  sarah.mitchell@gmail.com
                </p>
              </div>

              <Link
                href="/student-dashboard/settings"
                className="inline-flex items-center justify-center gap-2 self-start sm:mt-3 px-4 py-2.5 rounded-[10px] border border-[#3A738D] text-[#3A738D] hover:bg-[#E8F1F5] font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors flex-shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M11.3 2.3a1.5 1.5 0 0 1 2.1 2.1L5.5 12.3 2 13l.7-3.5L11.3 2.3z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit Profile
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-[#D5DEE2] border-t border-[#D5DEE2] pt-5 sm:pt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start sm:items-center text-left sm:text-center px-0 sm:px-4"
                >
                  <p className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-none tracking-tight mb-1.5">
                    {stat.value}
                  </p>
                  <p className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey + Badges */}
        <div className="flex flex-col xl:flex-row gap-6 w-full min-w-0 xl:items-start">
          <section className={`${card} flex-1 min-w-0 p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-5">
              Learning Journey
            </h2>
            <ul className="flex flex-col gap-5">
              {journey.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <JourneyIcon src={item.icon} />
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[#2F5F75] font-semi_bold_24pt text-[14px] sm:text-[15px] leading-snug mb-1">
                      {item.title}
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${card} w-full xl:w-[340px] xl:flex-shrink-0 p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-5">
              Badges & Achievements
            </h2>
            <ul className="flex flex-col gap-5">
              {badges.map((badge) => (
                <li key={badge.title} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E5F8F0] flex-shrink-0">
                    <Image
                      src={`${ASSET}/star.svg`}
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[#2F5F75] font-semi_bold_24pt text-[14px] sm:text-[15px] leading-snug mb-0.5">
                      {badge.title}
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] leading-relaxed">
                      {badge.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Specializations */}
        <section className={`${card} p-5 sm:p-6`}>
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Clinical Specializations
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {specializations.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#E8F1F5] text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] px-3.5 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </StudentDashboardShell>
  );
}
