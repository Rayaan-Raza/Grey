"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const ASSET = "/Student-Workshop";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";
const labelClass =
  "block text-[#2F5F75] font-inter-medium_18pt text-[13px] mb-1.5";
const inputClass =
  "w-full px-3.5 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-regular_18pt text-[14px] outline-none focus:border-[#3A738D] placeholder:text-[#777779]/65";

function asset(name: string) {
  return `${ASSET}/${encodeURIComponent(name)}`;
}

type WorkshopType = "live" | "ondemand";

export default function AdminWorkshopEdit() {
  const [title, setTitle] = useState(
    "Endo Access & Canal Shaping — Live Demo"
  );
  const [description, setDescription] = useState(
    "Live demonstration of endodontic access cavity design and canal shaping protocols with Q&A."
  );
  const [workshopType, setWorkshopType] = useState<WorkshopType>("live");
  const [autoRecord, setAutoRecord] = useState(true);
  const [allowWaitlist, setAllowWaitlist] = useState(true);
  const [capacity] = useState(60);
  const [registered] = useState(45);

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <Link
              href="/admin-dashboard/workshops"
              className="inline-flex items-center gap-1.5 text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline mb-2"
            >
              <span aria-hidden="true">‹</span> Back to Workshops
            </Link>
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[24px] sm:text-[28px] leading-tight tracking-tight">
              Edit Workshop
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start">
            <Link
              href="/admin-dashboard/workshops"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] hover:bg-[#F4F7F8] transition-colors"
            >
              Discard
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-5 xl:gap-6 w-full min-w-0 xl:items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Workshop Details */}
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Workshop Details
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="ws-title" className={labelClass}>
                    Workshop Title
                  </label>
                  <input
                    id="ws-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="ws-desc" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="ws-desc"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputClass} resize-y min-h-[110px]`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ws-category" className={labelClass}>
                      Category
                    </label>
                    <select
                      id="ws-category"
                      className={inputClass}
                      defaultValue="endo-remote"
                    >
                      <option value="endo-remote">Endodontics Remote</option>
                      <option value="endo-immersive">Endodontics Immersive</option>
                      <option value="implant">Implant Bootcamp</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ws-status" className={labelClass}>
                      Status
                    </label>
                    <div className="relative">
                      <select
                        id="ws-status"
                        className={`${inputClass} pl-8`}
                        defaultValue="scheduled"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="draft">Draft</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5ECAA0] pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className={labelClass}>Workshop Type</p>
                  <div className="flex flex-wrap gap-4">
                    {(
                      [
                        { id: "live", label: "Live Session" },
                        { id: "ondemand", label: "On-Demand Video" },
                      ] as const
                    ).map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="workshop-type"
                          checked={workshopType === opt.id}
                          onChange={() => setWorkshopType(opt.id)}
                          className="w-4 h-4 accent-[#3A738D]"
                        />
                        <span className="text-[#2F5F75] font-regular_18pt text-[13px]">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Schedule & Duration */}
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Schedule &amp; Duration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ws-date" className={labelClass}>
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="ws-date"
                      type="text"
                      defaultValue="Sep 3, 2026"
                      className={`${inputClass} pr-10`}
                    />
                    <Image
                      src={asset("calendar (1).png")}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 object-contain opacity-70 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="ws-time" className={labelClass}>
                    Start Time
                  </label>
                  <div className="relative">
                    <input
                      id="ws-time"
                      type="text"
                      defaultValue="2:00 PM"
                      className={`${inputClass} pr-10`}
                    />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777779] pointer-events-none"
                    >
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M12 8v4.5l3 1.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="ws-duration" className={labelClass}>
                    Duration
                  </label>
                  <input
                    id="ws-duration"
                    type="text"
                    defaultValue="2 hours"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="ws-tz" className={labelClass}>
                    Timezone
                  </label>
                  <select id="ws-tz" className={inputClass} defaultValue="pkt">
                    <option value="pkt">PKT (UTC+5)</option>
                    <option value="gmt">GMT (UTC+0)</option>
                    <option value="est">EST (UTC-5)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ws-link" className={labelClass}>
                    Meeting Link
                  </label>
                  <input
                    id="ws-link"
                    type="url"
                    defaultValue="https://zoom.us/j/1234567890"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Materials & Resources */}
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Materials &amp; Resources
              </h2>

              <div className="flex flex-col gap-4">
                <div>
                  <p className={labelClass}>Pre-reading Materials</p>
                  <div className="flex items-center gap-3 p-3.5 rounded-[12px] border border-[#D5DEE2] bg-[#F4F7F8]">
                    <Image
                      src={`/Student-Resources/${encodeURIComponent("Uploaded Image.png")}`}
                      alt=""
                      width={32}
                      height={32}
                      unoptimized
                      className="w-8 h-8 object-contain flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px] truncate">
                        Endo Access Guide.pdf
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[#5ECAA0] font-inter-medium_18pt text-[12px] flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" fill="#5ECAA0" />
                        <path
                          d="M4.2 7.1L6 8.9L9.8 5.1"
                          stroke="white"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Uploaded
                    </span>
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Workshop Slides</p>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border-2 border-dashed border-[#D5DEE2] bg-[#F4F7F8] text-[#3A738D] font-inter-medium_18pt text-[13px] hover:border-[#3A738D]/50 transition-colors"
                  >
                    <Image
                      src="/Admin-upload/upload-06.png"
                      alt=""
                      width={18}
                      height={18}
                      unoptimized
                      className="w-[18px] h-[18px] object-contain"
                    />
                    Browse File
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div>
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                      Auto-record session
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px]">
                      Save a recording for on-demand replay
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoRecord}
                    onClick={() => setAutoRecord((v) => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      autoRecord ? "bg-[#3A738D]" : "bg-[#D5DEE2]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        autoRecord ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="w-full xl:w-[300px] xl:flex-shrink-0 flex flex-col gap-5">
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Instructor Information
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="ws-instructor" className={labelClass}>
                    Instructor
                  </label>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] border border-[#D5DEE2] bg-white">
                    <Image
                      src={asset("f6a4a7f5cf7d4c7df0030029ed6e95e90deddb96.png")}
                      alt=""
                      width={28}
                      height={28}
                      unoptimized
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                    <select
                      id="ws-instructor"
                      className="flex-1 min-w-0 bg-transparent text-[#2F5F75] font-regular_18pt text-[13px] outline-none"
                      defaultValue="sarah"
                    >
                      <option value="sarah">Dr. Sarah Mitchell</option>
                      <option value="james">Dr. James Carter</option>
                      <option value="ahmed">Dr. Ahmed Khalil</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="ws-co" className={labelClass}>
                    Co-Instructor
                  </label>
                  <button
                    type="button"
                    id="ws-co"
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] border border-dashed border-[#D5DEE2] text-[#3A738D] font-inter-medium_18pt text-[13px] hover:bg-[#F4F7F8] transition-colors"
                  >
                    <span className="text-[16px] leading-none">+</span>
                    Add co-instructor
                  </button>
                </div>

                <div>
                  <label htmlFor="ws-bio" className={labelClass}>
                    Instructor Bio
                  </label>
                  <textarea
                    id="ws-bio"
                    rows={4}
                    defaultValue="Endodontist with 12+ years of clinical experience specializing in complex canal negotiation and access design."
                    className={`${inputClass} resize-y min-h-[100px]`}
                  />
                </div>
              </div>
            </section>

            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Registration &amp; Capacity
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="ws-capacity" className={labelClass}>
                    Max Capacity
                  </label>
                  <input
                    id="ws-capacity"
                    type="number"
                    defaultValue={capacity}
                    className={inputClass}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                      Current Registrations
                    </p>
                    <p className="text-[#3A738D] font-inter-medium_18pt text-[13px]">
                      {registered} / {capacity}
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#E8F1F5] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#5ECAA0]"
                      style={{ width: `${(registered / capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ws-deadline" className={labelClass}>
                    Registration Deadline
                  </label>
                  <div className="relative">
                    <input
                      id="ws-deadline"
                      type="text"
                      defaultValue="Sep 1, 2026"
                      className={`${inputClass} pr-10`}
                    />
                    <Image
                      src={asset("calendar (1).png")}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 object-contain opacity-70 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div>
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                      Allow Waitlist
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px]">
                      Queue learners after capacity is full
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={allowWaitlist}
                    onClick={() => setAllowWaitlist((v) => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      allowWaitlist ? "bg-[#3A738D]" : "bg-[#D5DEE2]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        allowWaitlist ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AdminDashboardShell>
  );
}
