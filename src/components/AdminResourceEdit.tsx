"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";
const labelClass =
  "block text-[#2F5F75] font-inter-medium_18pt text-[13px] mb-1.5";
const inputClass =
  "w-full px-3.5 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-regular_18pt text-[14px] outline-none focus:border-[#3A738D] placeholder:text-[#777779]/65";

type Visibility = "all" | "enrolled" | "instructors";

const versions = [
  { version: "v2.1", date: "Aug 12, 2026", note: "Current" },
  { version: "v2.0", date: "Jun 3, 2026", note: "Updated checklist layout" },
  { version: "v1.0", date: "Mar 18, 2026", note: "Initial upload" },
];

export default function AdminResourceEdit() {
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [title, setTitle] = useState("Endodontic Tray Setup Guide");
  const [description, setDescription] = useState(
    "Complete instrument checklist and tray organization for rotary and hand instrumentation."
  );
  const [tags, setTags] = useState("endodontics, tray setup, instruments");

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <Link
              href="/admin-dashboard/resources"
              className="inline-flex items-center gap-1.5 text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline mb-2"
            >
              <span aria-hidden="true">‹</span> Back to Resources
            </Link>
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Edit Resource
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start">
            <button
              type="button"
              className="text-[#C45C5C] font-inter-medium_18pt text-[13px] sm:text-[14px] hover:underline"
            >
              Delete Resource
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] bg-[#5ECAA0] hover:bg-[#7ED9B5] text-black font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-5 xl:gap-6 w-full min-w-0 xl:items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Resource Information */}
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Resource Information
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="edit-title" className={labelClass}>
                    Resource Title
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="edit-desc" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="edit-desc"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputClass} resize-y min-h-[110px]`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-category" className={labelClass}>
                      Category
                    </label>
                    <select
                      id="edit-category"
                      className={inputClass}
                      defaultValue="handbooks"
                    >
                      <option value="handbooks">Clinical Handbooks</option>
                      <option value="textbooks">Comprehensive Textbooks</option>
                      <option value="apex">APEX Newsletter</option>
                      <option value="downloads">Clinical Downloads</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="edit-tags" className={labelClass}>
                      Tags
                    </label>
                    <input
                      id="edit-tags"
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Current File */}
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                Current File
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-[12px] border border-[#D5DEE2] bg-[#F4F7F8] mb-5">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Image
                    src={`/Student-Resources/${encodeURIComponent("Uploaded Image.png")}`}
                    alt=""
                    width={40}
                    height={40}
                    unoptimized
                    className="w-10 h-10 object-contain flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px] truncate">
                      Endodontic_Tray_Setup_Guide.pdf
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[12px]">
                      4.2 MB • Uploaded Aug 12, 2026
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    className="px-3 py-2 text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-3.5 py-2 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[13px] hover:bg-[#E8F1F5] transition-colors"
                  >
                    Replace File
                  </button>
                </div>
              </div>

              <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[14px] mb-3">
                Version History
              </h3>
              <ul className="flex flex-col gap-3">
                {versions.map((v) => (
                  <li
                    key={v.version}
                    className="flex items-start justify-between gap-3 py-2 border-b border-[#D5DEE2] last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                        {v.version}
                        {v.note === "Current" && (
                          <span className="ml-2 inline-flex px-2 py-0.5 rounded-full bg-[#E5F8F0] text-[#2F5F75] font-inter-medium_18pt text-[10px]">
                            Current
                          </span>
                        )}
                      </p>
                      {v.note !== "Current" && (
                        <p className="text-[#777779] font-regular_18pt text-[12px] mt-0.5">
                          {v.note}
                        </p>
                      )}
                    </div>
                    <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0">
                      {v.date}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Assignment & Stats */}
          <aside className={`${card} w-full xl:w-[300px] xl:flex-shrink-0 p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
              Assignment &amp; Stats
            </h2>

            <div className="flex flex-col gap-5">
              <div>
                <p className={labelClass}>Assigned Courses</p>
                <span className="inline-flex px-2.5 py-1 rounded-full bg-[#E8F1F5] text-[#3A738D] font-inter-medium_18pt text-[12px]">
                  Foundations of Endodontics
                </span>
              </div>

              <div>
                <p className={labelClass}>Author / Instructor</p>
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/Student_Dashboard/avatar.png"
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border border-[#D5DEE2]"
                  />
                  <span className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                    Dr. Sarah Mitchell
                  </span>
                </div>
              </div>

              <div>
                <p className={labelClass}>Visibility</p>
                <ul className="flex flex-col gap-2.5">
                  {(
                    [
                      { id: "all", label: "All Students" },
                      { id: "enrolled", label: "Enrolled Students Only" },
                      { id: "instructors", label: "Instructors Only" },
                    ] as const
                  ).map((opt) => (
                    <li key={opt.id}>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="edit-visibility"
                          checked={visibility === opt.id}
                          onChange={() => setVisibility(opt.id)}
                          className="w-4 h-4 accent-[#3A738D]"
                        />
                        <span className="text-[#2F5F75] font-regular_18pt text-[13px]">
                          {opt.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={labelClass}>Quick Statistics</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[12px] bg-[#2F5F75] px-3 py-3.5 text-center">
                    <p className="text-white/70 font-regular_18pt text-[11px] mb-1">
                      Downloads
                    </p>
                    <p className="text-white font-semi_bold_24pt text-[22px] leading-none">
                      162
                    </p>
                  </div>
                  <div className="rounded-[12px] bg-[#F4F7F8] border border-[#D5DEE2] px-3 py-3.5 text-center">
                    <p className="text-[#777779] font-regular_18pt text-[11px] mb-1">
                      Bookmarks
                    </p>
                    <p className="text-[#2F5F75] font-semi_bold_24pt text-[22px] leading-none">
                      45
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminDashboardShell>
  );
}
