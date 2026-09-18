"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

const ASSET = "/Student_Dashboard";

const navItems = [
  { label: "Dashboard", icon: "Icon (8).svg", href: "/student-dashboard", match: "/student-dashboard" },
  { label: "My Courses", icon: "Icon (9).svg", href: "/student-dashboard/courses", match: "/student-dashboard/courses" },
  { label: "Learning Progress", icon: "Icon (10).svg", href: "/student-dashboard/progress", match: "/student-dashboard/progress" },
  { label: "Assignments", icon: "Icon (11).svg", href: "/student-dashboard/assignments", match: "/student-dashboard/assignments" },
  { label: "Certificates", icon: "Icon (12).svg", href: "/student-dashboard/certificates", match: "/student-dashboard/certificates" },
  { label: "Community", icon: "Icon (13).svg", href: "/student-dashboard/community", match: "/student-dashboard/community" },
  { label: "Workshops", icon: "Icon (14).svg", href: "/student-dashboard/workshops", match: "/student-dashboard/workshops" },
  { label: "Resources", icon: "Icon (15).svg", href: "/student-dashboard/resources", match: "/student-dashboard/resources" },
  { label: "Profile", icon: "Icon (16).svg", href: "/student-dashboard/profile", match: "/student-dashboard/profile" },
  { label: "Settings", icon: "Icon (17).svg", href: "/student-dashboard/settings", match: "/student-dashboard/settings" },
];

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

function isNavActive(match: string, pathname: string) {
  if (match === "/student-dashboard") return pathname === "/student-dashboard";
  return pathname === match || pathname.startsWith(`${match}/`);
}

export default function StudentDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-dvh w-full min-w-0 overflow-hidden bg-[#F4F7F8]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#2F5F75]/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 h-dvh w-[248px] flex flex-col bg-[#2F5F75] transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-3.5 pt-5 pb-4">
          <BrandLogo href="/student-dashboard" fluid onDark />
        </div>

        <p className="px-5 mb-2.5 text-white/40 font-inter-medium_18pt text-[10px] tracking-[0.14em] uppercase">
          Main Menu
        </p>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-1 min-h-0">
          {navItems.map((item) => {
            const active = isNavActive(item.match, pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-colors ${
                  active
                    ? "bg-[#3A738D] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Image
                  src={asset(item.icon)}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 flex-shrink-0"
                />
                <span className="font-regular_18pt text-[14px] leading-snug truncate">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-3 pb-6 pt-3 border-t border-white/10 flex flex-col gap-1">
          <Link
            href="/student-dashboard/help"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-colors ${
              pathname === "/student-dashboard/help" ||
              pathname.startsWith("/student-dashboard/help/")
                ? "bg-[#3A738D] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center rounded-full border border-current text-[10px] font-semi_bold_24pt leading-none">
              ?
            </span>
            <span className="font-regular_18pt text-[14px]">Help Center</span>
          </Link>
          <Link
            href="/login"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-white/65 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 14H3.333A1.333 1.333 0 0 1 2 12.667V3.333A1.333 1.333 0 0 1 3.333 2H6M10.667 11.333 14 8l-3.333-3.333M14 8H6"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-regular_18pt text-[14px]">Logout</span>
          </Link>
        </div>
      </aside>

      <div className="h-dvh min-w-0 flex flex-col lg:ml-[248px] overflow-y-auto overflow-x-hidden">
        <header className="sticky top-0 z-30 bg-white border-b border-[#D5DEE2] px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F7F8] border border-[#D5DEE2] text-[#2F5F75]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3 4.5h12M3 9h12M3 13.5h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <label className="relative flex-1 min-w-0 max-w-xl lg:max-w-2xl">
            <span className="sr-only">Search</span>
            <Image
              src={asset("Icon (18).svg")}
              alt=""
              width={14}
              height={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search courses, resources, discussions..."
              className="w-full min-w-0 pl-11 pr-4 py-3 rounded-full bg-[#F4F7F8] border border-transparent focus:border-[#D5DEE2] focus:bg-white text-[#2F5F75] font-regular_18pt text-[13px] sm:text-[14px] outline-none transition-colors placeholder:text-[#777779]/65"
            />
          </label>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 ml-auto">
            <button
              type="button"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#D5DEE2] hover:border-[#3A738D]/40 transition-colors"
              aria-label="Notifications"
            >
              <Image
                src={`${ASSET}/bell.svg`}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#3A738D] ring-2 ring-white" />
            </button>
            <button
              type="button"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#D5DEE2] hover:border-[#3A738D]/40 transition-colors"
              aria-label="Messages"
            >
              <Image
                src={`${ASSET}/message-square.svg`}
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              />
            </button>
            <Image
              src={`${ASSET}/avatar.png`}
              alt="Dr. Sarah"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white border border-[#D5DEE2]"
            />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
