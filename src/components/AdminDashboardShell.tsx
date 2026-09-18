"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

const ASSET = "/Student_Dashboard";

const navItems = [
  { label: "Dashboard", icon: "Icon (8).svg", href: "/admin-dashboard", match: "/admin-dashboard" },
  { label: "Courses", icon: "Icon (9).svg", href: "/admin-dashboard/courses", match: "/admin-dashboard/courses" },
  { label: "Learners", icon: "Icon (16).svg", href: "/admin-dashboard/learners", match: "/admin-dashboard/learners" },
  { label: "Assessments", icon: "/Admin-Ass/clipboard.png", href: "/admin-dashboard/assessments", match: "/admin-dashboard/assessments", externalIcon: true },
  { label: "Certificates", icon: "Icon (12).svg", href: "/admin-dashboard/certificates", match: "/admin-dashboard/certificates" },
  { label: "Resources", icon: "Icon (15).svg", href: "/admin-dashboard/resources", match: "/admin-dashboard/resources" },
  { label: "Workshops", icon: "Icon (14).svg", href: "/admin-dashboard/workshops", match: "/admin-dashboard/workshops" },
  { label: "Analytics", icon: "bar-chart-3.svg", href: "/admin-dashboard/analytics", match: "/admin-dashboard/analytics" },
  { label: "Community", icon: "Icon (13).svg", href: "/admin-dashboard/community", match: "/admin-dashboard/community" },
  { label: "Settings", icon: "Icon (17).svg", href: "/admin-dashboard/settings", match: "/admin-dashboard/settings" },
];

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

function isNavActive(match: string, pathname: string) {
  if (match === "/admin-dashboard") return pathname === "/admin-dashboard";
  return pathname === match || pathname.startsWith(`${match}/`);
}

export default function AdminDashboardShell({
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
          <BrandLogo href="/admin-dashboard" fluid onDark />
        </div>

        <p className="px-5 mb-2.5 text-white/40 font-inter-medium_18pt text-[10px] tracking-[0.14em] uppercase">
          Admin Portal
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
                  src={"externalIcon" in item && item.externalIcon ? item.icon : asset(item.icon)}
                  alt=""
                  width={18}
                  height={18}
                  unoptimized={"externalIcon" in item && item.externalIcon}
                  className="w-[18px] h-[18px] opacity-90 object-contain"
                />
                <span className="font-inter-medium_18pt text-[13px] sm:text-[14px]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-3 pb-6 pt-3 border-t border-white/10 flex flex-col gap-1">
          <Link
            href="/admin-dashboard/help"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-colors ${
              pathname.startsWith("/admin-dashboard/help")
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

      <div className="h-dvh min-w-0 overflow-y-auto overflow-x-hidden lg:pl-[248px] flex flex-col">
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

          {pathname.startsWith("/admin-dashboard/resources/upload") ||
          pathname.startsWith("/admin-dashboard/resources/edit") ||
          pathname.startsWith("/admin-dashboard/workshops/edit") ? (
            <nav
              className="flex-1 min-w-0 flex items-center gap-2 font-regular_18pt text-[13px] sm:text-[14px]"
              aria-label="Breadcrumb"
            >
              {pathname.startsWith("/admin-dashboard/workshops/edit") ? (
                <>
                  <Link
                    href="/admin-dashboard/workshops"
                    className="text-[#3A738D] hover:underline"
                  >
                    Workshops
                  </Link>
                  <span className="text-[#777779]">/</span>
                  <span className="text-[#777779] truncate hidden sm:inline">
                    Endo Access &amp; Canal Shaping
                  </span>
                  <span className="text-[#777779] hidden sm:inline">/</span>
                  <span className="text-[#2F5F75] font-inter-medium_18pt truncate">
                    Edit
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href="/admin-dashboard/resources"
                    className="text-[#3A738D] hover:underline"
                  >
                    Resources
                  </Link>
                  <span className="text-[#777779]">/</span>
                  <span className="text-[#2F5F75] font-inter-medium_18pt truncate">
                    {pathname.startsWith("/admin-dashboard/resources/edit")
                      ? "Edit Resource"
                      : "Upload New Resource"}
                  </span>
                </>
              )}
            </nav>
          ) : (
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
                placeholder="Search courses, student records, assignments, analytics..."
                className="w-full min-w-0 pl-11 pr-4 py-3 rounded-full bg-[#F4F7F8] border border-transparent focus:border-[#D5DEE2] focus:bg-white text-[#2F5F75] font-regular_18pt text-[13px] sm:text-[14px] outline-none transition-colors placeholder:text-[#777779]/65"
              />
            </label>
          )}

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
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#5ECAA0] ring-2 ring-white" />
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
            <div className="hidden sm:flex items-center gap-2.5 pl-1">
              <Image
                src="/Instructors/faculty-julian.jpg"
                alt="Admin User"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white border border-[#D5DEE2]"
              />
              <div className="min-w-0 leading-tight">
                <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px] truncate">
                  Admin User
                </p>
                <p className="text-[#777779] font-regular_18pt text-[11px]">
                  Administrator
                </p>
              </div>
            </div>
            <Image
              src="/Instructors/faculty-julian.jpg"
              alt="Admin User"
              width={40}
              height={40}
              className="sm:hidden w-10 h-10 rounded-full object-cover ring-2 ring-white border border-[#D5DEE2]"
            />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
