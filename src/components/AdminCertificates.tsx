"use client";

import { useState } from "react";
import Image from "next/image";
import AdminDashboardShell from "@/components/AdminDashboardShell";

const CERT = "/Admin-Cert";
const card =
  "bg-white border border-[#D5DEE2] rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";
const btnOutline =
  "inline-flex items-center justify-center px-3.5 py-2 rounded-[10px] font-inter-medium_18pt text-[12px] sm:text-[13px] transition-colors bg-white border border-[#D5DEE2] text-[#2F5F75] hover:bg-[#5ECAA0] hover:border-[#5ECAA0] hover:text-black";

const templates = [
  {
    title: "Course Completion Certificate",
    course: "Foundations of Endodontics",
    issued: "248 issued",
  },
  {
    title: "Immersive Residency Certificate",
    course: "Foundations of Endodontics — Immersive",
    issued: "186 issued",
  },
  {
    title: "Implant Bootcamp Certificate",
    course: "Dental Implants Bootcamp",
    issued: "312 issued",
  },
];

const issued = [
  {
    id: "CERT-2026-001",
    learner: "Dr. Sarah Mitchell",
    course: "Foundations of Endodontics",
    template: "Course Completion",
    issueDate: "Aug 28, 2026",
    expiryDate: "Aug 28, 2028",
    status: "Valid" as const,
  },
  {
    id: "CERT-2026-002",
    learner: "Dr. Ahmed Khan",
    course: "Dental Implants Bootcamp",
    template: "Implant Bootcamp",
    issueDate: "Aug 22, 2026",
    expiryDate: "Aug 22, 2028",
    status: "Valid" as const,
  },
  {
    id: "CERT-2026-003",
    learner: "Dr. Priya Patel",
    course: "Foundations of Endodontics",
    template: "Course Completion",
    issueDate: "Aug 15, 2026",
    expiryDate: "Aug 15, 2028",
    status: "Valid" as const,
  },
  {
    id: "CERT-2026-004",
    learner: "Dr. James Wilson",
    course: "Foundations of Endodontics — Immersive",
    template: "Immersive Residency",
    issueDate: "Aug 5, 2026",
    expiryDate: "Aug 5, 2028",
    status: "Valid" as const,
  },
  {
    id: "CERT-2026-005",
    learner: "Dr. Maria Santos",
    course: "Foundations of Endodontics",
    template: "Course Completion",
    issueDate: "Jul 30, 2026",
    expiryDate: "Jul 30, 2028",
    status: "Expired" as const,
  },
];

export default function AdminCertificates() {
  const [page, setPage] = useState(1);

  return (
    <AdminDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Certificates
            </h1>
            <p className="mt-1.5 text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
              Issue, manage, and track professional certificates for course
              completions.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors flex-shrink-0"
          >
            <span className="text-[16px] leading-none">+</span>
            Create Certificate Template
          </button>
        </div>

        {/* Templates */}
        <section className="w-full min-w-0">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Certificate Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {templates.map((t) => (
              <article
                key={t.title}
                className={`${card} overflow-hidden flex flex-col`}
              >
                <div className="bg-[#F4F7F8] px-5 pt-5 pb-4 flex items-center justify-center border-b border-[#D5DEE2]">
                  <Image
                    src={`${CERT}/MiniCertificatePreview.png`}
                    alt={`${t.title} preview`}
                    width={280}
                    height={160}
                    unoptimized
                    className="w-full max-w-[260px] h-auto object-contain rounded-[10px]"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[15px] leading-snug mb-1">
                    {t.title}
                  </h3>
                  <p className="text-[#777779] font-regular_18pt text-[13px] mb-1">
                    {t.course}
                  </p>
                  <p className="text-[#3A738D] font-inter-medium_18pt text-[12px] mb-4">
                    {t.issued}
                  </p>
                  <button type="button" className={`mt-auto self-start ${btnOutline}`}>
                    Edit Template
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recently Issued */}
        <section className="w-full min-w-0">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
            Recently Issued
          </h2>
          <div className={`${card} p-5 sm:p-6 overflow-hidden`}>
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[820px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D5DEE2]">
                    {[
                      "Certificate ID",
                      "Learner Name",
                      "Course",
                      "Template",
                      "Issue Date",
                      "Expiry Date",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="pb-3 pr-4 text-[#777779] font-inter-medium_18pt text-[11px] sm:text-[12px] uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {issued.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-[#D5DEE2] last:border-0"
                    >
                      <td className="py-4 pr-4 text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                        {row.id}
                      </td>
                      <td className="py-4 pr-4">
                        <button
                          type="button"
                          className="text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline text-left"
                        >
                          {row.learner}
                        </button>
                      </td>
                      <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                        {row.course}
                      </td>
                      <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                        {row.template}
                      </td>
                      <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                        {row.issueDate}
                      </td>
                      <td className="py-4 pr-4 text-[#777779] font-regular_18pt text-[13px]">
                        {row.expiryDate}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full font-inter-medium_18pt text-[11px] ${
                            row.status === "Valid"
                              ? "bg-[#E5F8F0] text-[#2F5F75]"
                              : "bg-[#FDECEC] text-[#C45C5C]"
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
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
            <p className="text-[#777779] font-regular_18pt text-[13px]">
              Showing 5 of 412 certificates
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-[8px] border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8] font-inter-medium_18pt text-[13px]"
              >
                ‹
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-[8px] font-inter-medium_18pt text-[13px] transition-colors ${
                    page === n
                      ? "bg-[#3A738D] text-white"
                      : "border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8]"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="px-1 text-[#777779] font-regular_18pt text-[13px]">
                …
              </span>
              <button
                type="button"
                onClick={() => setPage(83)}
                className={`min-w-8 h-8 px-2 rounded-[8px] font-inter-medium_18pt text-[13px] transition-colors ${
                  page === 83
                    ? "bg-[#3A738D] text-white"
                    : "border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8]"
                }`}
              >
                83
              </button>
              <button
                type="button"
                aria-label="Next page"
                onClick={() => setPage((p) => Math.min(83, p + 1))}
                className="w-8 h-8 rounded-[8px] border border-[#D5DEE2] bg-white text-[#2F5F75] hover:bg-[#F4F7F8] font-inter-medium_18pt text-[13px]"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminDashboardShell>
  );
}
