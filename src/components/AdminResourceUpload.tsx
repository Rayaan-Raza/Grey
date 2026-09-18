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

export default function AdminResourceUpload() {
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [dragOver, setDragOver] = useState(false);

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
              Upload New Resource
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] hover:bg-[#F4F7F8] transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors"
            >
              Publish Resource
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
                  <label htmlFor="resource-title" className={labelClass}>
                    Resource Title
                  </label>
                  <input
                    id="resource-title"
                    type="text"
                    placeholder="Enter resource title..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="resource-desc" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="resource-desc"
                    rows={4}
                    placeholder="Describe this resource for students..."
                    className={`${inputClass} resize-y min-h-[110px]`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="resource-category" className={labelClass}>
                      Category
                    </label>
                    <select id="resource-category" className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="handbooks">Clinical Handbooks</option>
                      <option value="textbooks">Comprehensive Textbooks</option>
                      <option value="apex">APEX Newsletter</option>
                      <option value="downloads">Clinical Downloads</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="resource-tags" className={labelClass}>
                      Tags
                    </label>
                    <input
                      id="resource-tags"
                      type="text"
                      placeholder="Add tags (press Enter)..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* File Upload */}
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
                File Upload
              </h2>

              <div
                role="button"
                tabIndex={0}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                }}
                className={`flex flex-col items-center justify-center text-center gap-3 rounded-[14px] border-2 border-dashed px-6 py-10 sm:py-12 transition-colors cursor-pointer ${
                  dragOver
                    ? "border-[#3A738D] bg-[#E8F1F5]"
                    : "border-[#D5DEE2] bg-[#F4F7F8] hover:border-[#3A738D]/50"
                }`}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#D5DEE2]">
                  <Image
                    src="/Admin-upload/upload-06.png"
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="w-6 h-6 object-contain"
                  />
                </span>
                <div>
                  <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px] mb-1">
                    Drag &amp; drop your file here, or click to browse
                  </p>
                  <p className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px]">
                    PDF, DOCX, XLSX, PPTX, MP4 — max 100MB
                  </p>
                </div>
                <input type="file" className="sr-only" aria-label="Upload file" />
              </div>

              <div className="flex items-center gap-3 my-5" aria-hidden="true">
                <div className="flex-1 h-px bg-[#D5DEE2]" />
                <span className="text-[#777779] font-inter-medium_18pt text-[12px]">
                  OR
                </span>
                <div className="flex-1 h-px bg-[#D5DEE2]" />
              </div>

              <div>
                <label htmlFor="external-url" className={labelClass}>
                  External URL
                </label>
                <input
                  id="external-url"
                  type="url"
                  placeholder="https://example.com/resource-link"
                  className={inputClass}
                />
              </div>
            </section>
          </div>

          {/* Assignment & Visibility */}
          <aside className={`${card} w-full xl:w-[300px] xl:flex-shrink-0 p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] mb-5">
              Assignment &amp; Visibility
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="assign-course" className={labelClass}>
                  Assign to Course
                </label>
                <select id="assign-course" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select courses...
                  </option>
                  <option value="endo">Foundations of Endodontics</option>
                  <option value="implant">Dental Implants Bootcamp</option>
                  <option value="radio">Oral Radiology</option>
                </select>
              </div>

              <div>
                <label htmlFor="instructor" className={labelClass}>
                  Instructor / Author
                </label>
                <select id="instructor" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select instructor
                  </option>
                  <option value="sarah">Dr. Sarah Mitchell</option>
                  <option value="ahmed">Dr. Ahmed Khan</option>
                  <option value="mariam">Dr. Mariam Ali</option>
                </select>
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
                          name="visibility"
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
                <label htmlFor="publish-date" className={labelClass}>
                  Publish Date
                </label>
                <select id="publish-date" className={inputClass} defaultValue="immediately">
                  <option value="immediately">Immediately</option>
                  <option value="schedule">Schedule for later</option>
                </select>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminDashboardShell>
  );
}
