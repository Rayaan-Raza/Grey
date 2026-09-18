"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StudentDashboardShell from "@/components/StudentDashboardShell";

const cardShadow = "shadow-[0_8px_30px_rgba(47,95,117,0.06)]";
const card = `bg-white border border-[#D5DEE2] rounded-[20px] ${cardShadow}`;

type Category =
  | "all"
  | "getting-started"
  | "courses"
  | "certificates"
  | "account"
  | "billing";

const tabs: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "getting-started", label: "Getting Started" },
  { id: "courses", label: "Courses" },
  { id: "certificates", label: "Certificates" },
  { id: "account", label: "Account" },
  { id: "billing", label: "Billing" },
];

const defaultOpenByTab: Record<Category, string> = {
  all: "gs-enroll",
  "getting-started": "gs-enroll",
  courses: "course-enroll",
  certificates: "cert-download",
  account: "acct-profile",
  billing: "bill-payment",
};

const faqs: {
  id: string;
  question: string;
  answer: string;
  category: Exclude<Category, "all">;
  href?: string;
  hrefLabel?: string;
}[] = [
  // Getting Started
  {
    id: "gs-enroll",
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a new course, browse the 'Courses' catalog in the main navigation. Click on your desired course card to view the syllabus and details, then click the 'Enroll Now' button to instantly add it to your student portal.",
    category: "getting-started",
    href: "/courses",
    hrefLabel: "Browse courses",
  },
  {
    id: "gs-certificate",
    question: "How do I download my certificate?",
    answer:
      "Once you pass all final evaluations of a course, go to the 'Certificates' tab in your student portal. You will see a list of earned credentials with direct PDF download links.",
    category: "getting-started",
    href: "/student-dashboard/certificates",
    hrefLabel: "Open certificates",
  },
  {
    id: "gs-password",
    question: "How do I reset my password?",
    answer:
      "From the login page, choose Forgot Password, enter the email on your account, and follow the reset link we send. For security, links expire after a short window.",
    category: "getting-started",
    href: "/forgot-password",
    hrefLabel: "Reset password",
  },
  {
    id: "gs-support",
    question: "How do I contact support?",
    answer:
      "Email support@greydental.edu, call +44 20 7123 4567, or start a live chat from this Help Center. Our team usually responds within a few minutes during business hours.",
    category: "getting-started",
    href: "/contact",
    hrefLabel: "Contact page",
  },
  {
    id: "gs-payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), corporate invoicing options for hospitals, and digital payments via secure gateways.",
    category: "getting-started",
    href: "/checkout",
    hrefLabel: "Go to checkout",
  },
  {
    id: "gs-progress",
    question: "How do I track my learning progress?",
    answer:
      "Visit Learning Progress in the sidebar to see module completion, upcoming deadlines, and CE hours. Course cards on My Courses also show your current percentage complete.",
    category: "getting-started",
    href: "/student-dashboard/progress",
    hrefLabel: "View progress",
  },
  {
    id: "gs-dashboard",
    question: "How do I access my student dashboard?",
    answer:
      "Log in with your registered email and password, then select Dashboard from the main menu. From there you can reach courses, assignments, certificates, community, and account settings.",
    category: "getting-started",
    href: "/student-dashboard",
    hrefLabel: "Open dashboard",
  },
  {
    id: "gs-offline",
    question: "Can I access my courses offline?",
    answer:
      "Video lessons require an internet connection for streaming. Downloadable PDFs, slide decks, and clinical guides in the Resources section can be saved for offline review on your device.",
    category: "getting-started",
    href: "/student-dashboard",
    hrefLabel: "Go to dashboard",
  },

  // Courses
  {
    id: "course-enroll",
    question: "How do I enroll in a new course?",
    answer:
      "To enroll in a new course, browse the 'Courses' catalog in the main navigation. Click on your desired course card to view the syllabus and details, then click the 'Enroll Now' button to instantly add it to your student portal.",
    category: "courses",
    href: "/courses",
    hrefLabel: "Browse courses",
  },
  {
    id: "course-retake",
    question: "Can I retake a course after completing it?",
    answer:
      "Yes. Completed courses remain in My Courses with full access to lessons and materials. You can revisit modules anytime to refresh your knowledge before clinical exams or board renewals.",
    category: "courses",
    href: "/student-dashboard/courses",
    hrefLabel: "My courses",
  },
  {
    id: "course-access",
    question: "How long do I have access to a course?",
    answer:
      "Standard enrollments include 12 months of full access from the purchase date. Extended access plans are available at checkout for practitioners who need longer review periods.",
    category: "courses",
    href: "/courses",
    hrefLabel: "View courses",
  },
  {
    id: "course-paced",
    question: "Are courses self-paced or scheduled?",
    answer:
      "Most programs are self-paced so you can study around clinic hours. Live workshops and cohort-based modules include scheduled sessions—you'll see dates on the course page and in your dashboard calendar.",
    category: "courses",
    href: "/student-dashboard/courses",
    hrefLabel: "My courses",
  },
  {
    id: "course-progress",
    question: "How do I track my course progress?",
    answer:
      "Open Learning Progress in the sidebar for a breakdown by module, quiz scores, and CE hours earned. Each course card on My Courses also displays a completion percentage.",
    category: "courses",
    href: "/student-dashboard/progress",
    hrefLabel: "View progress",
  },
  {
    id: "course-download",
    question: "Can I download course materials for offline use?",
    answer:
      "Supplementary resources—PDFs, checklists, and case-study packs—can be downloaded from each module. Video content is streamed and not available for offline download due to licensing.",
    category: "courses",
    href: "/student-dashboard/courses",
    hrefLabel: "My courses",
  },
  {
    id: "course-assignments",
    question: "How do assignments affect my course grade?",
    answer:
      "Assignments contribute to your final evaluation alongside module quizzes. Submit work before the listed deadline in the Assignments tab; late submissions may receive reduced credit depending on the course policy.",
    category: "courses",
    href: "/student-dashboard/assignments",
    hrefLabel: "View assignments",
  },
  {
    id: "course-workshops",
    question: "Are live workshops included with course enrollment?",
    answer:
      "Some bundled programs include complimentary workshop seats. Standalone courses may offer workshops as add-ons at checkout—check the course syllabus for what's included.",
    category: "courses",
    href: "/courses",
    hrefLabel: "Browse courses",
  },

  // Certificates
  {
    id: "cert-download",
    question: "How do I download my certificate?",
    answer:
      "Once you pass all final evaluations of a course, go to the 'Certificates' tab in your student portal. You will see a list of earned credentials with direct PDF download links.",
    category: "certificates",
    href: "/student-dashboard/certificates",
    hrefLabel: "Open certificates",
  },
  {
    id: "cert-requirements",
    question: "What are the requirements to earn a certificate?",
    answer:
      "Complete all required modules, pass final assessments with the minimum score stated in the syllabus, and finish any mandatory assignments. Certificates are issued automatically once all criteria are met.",
    category: "certificates",
    href: "/student-dashboard/certificates",
    hrefLabel: "View certificates",
  },
  {
    id: "cert-replacement",
    question: "Can I get a replacement certificate?",
    answer:
      "Yes. If your original file is lost or your name has changed, contact support@greydental.edu with your enrollment details. We can reissue a verified PDF at no extra charge.",
    category: "certificates",
    href: "/contact",
    hrefLabel: "Contact support",
  },
  {
    id: "cert-accredited",
    question: "Are certificates accredited?",
    answer:
      "Many programs carry continuing education credits recognized by major dental boards. Accreditation details and CE hour counts are listed on each course page and printed on your certificate.",
    category: "certificates",
    href: "/courses",
    hrefLabel: "View accredited courses",
  },
  {
    id: "cert-linkedin",
    question: "How do I share my certificate on LinkedIn?",
    answer:
      "From the Certificates tab, open your credential and use the Share option to add it directly to your LinkedIn Licenses & Certifications section, or download the PDF and upload it manually.",
    category: "certificates",
    href: "/student-dashboard/certificates",
    hrefLabel: "Open certificates",
  },
  {
    id: "cert-timing",
    question: "How long does it take to receive my certificate?",
    answer:
      "Digital certificates are generated within 24 hours of passing your final evaluation. You'll receive an email notification when your credential is ready to download.",
    category: "certificates",
    href: "/student-dashboard/certificates",
    hrefLabel: "Check certificates",
  },
  {
    id: "cert-ce",
    question: "Do certificates include continuing education credits?",
    answer:
      "Eligible programs display CE hours on the course page and certificate. Credits vary by jurisdiction—verify acceptance with your local dental board before claiming them.",
    category: "certificates",
    href: "/courses",
    hrefLabel: "Browse CE courses",
  },

  // Account
  {
    id: "acct-profile",
    question: "How do I update my profile information?",
    answer:
      "To edit your profile details, navigate to the 'Profile' section under Main Menu. Click the edit icon, update your specialized field, license number or personal details, and tap save.",
    category: "account",
    href: "/student-dashboard/profile",
    hrefLabel: "Edit profile",
  },
  {
    id: "acct-password",
    question: "How do I reset my password?",
    answer:
      "From the login page, choose Forgot Password, enter the email on your account, and follow the reset link we send. You can also change your password under Account Settings in the dashboard.",
    category: "account",
    href: "/forgot-password",
    hrefLabel: "Reset password",
  },
  {
    id: "acct-email",
    question: "Can I change my registered email address?",
    answer:
      "Yes. Go to Settings → Account Settings, update your email field, and confirm the change via the verification link sent to your new address. Your login credentials will switch once verified.",
    category: "account",
    href: "/student-dashboard/settings",
    hrefLabel: "Account settings",
  },
  {
    id: "acct-2fa",
    question: "How do I enable two-factor authentication?",
    answer:
      "In Settings → Privacy & Data, turn on Two-Factor Authentication and follow the setup wizard. We support authenticator apps and SMS codes for an extra layer of account security.",
    category: "account",
    href: "/student-dashboard/settings",
    hrefLabel: "Privacy settings",
  },
  {
    id: "acct-delete",
    question: "How do I delete my account?",
    answer:
      "Account deletion is available under Settings → Privacy & Data. This permanently removes your profile, progress records, and certificates. Contact support if you need a data export before closing your account.",
    category: "account",
    href: "/student-dashboard/settings",
    hrefLabel: "Privacy settings",
  },
  {
    id: "acct-notifications",
    question: "How do I manage notification preferences?",
    answer:
      "Open Settings → Notifications to control email alerts, workshop reminders, and community updates. Toggle each category on or off to match how you prefer to stay informed.",
    category: "account",
    href: "/student-dashboard/settings",
    hrefLabel: "Notification settings",
  },
  {
    id: "acct-specializations",
    question: "How do I update my clinical specializations?",
    answer:
      "Visit your Profile page and scroll to Clinical Specializations. Add or remove focus areas to personalize course recommendations and community forum tags.",
    category: "account",
    href: "/student-dashboard/profile",
    hrefLabel: "Edit profile",
  },

  // Billing
  {
    id: "bill-payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), corporate invoicing options for hospitals, and digital payments via secure gateways.",
    category: "billing",
    href: "/checkout",
    hrefLabel: "Go to checkout",
  },
  {
    id: "bill-update",
    question: "How do I update my payment information?",
    answer:
      "Go to Settings → Billing & Subscription to add, remove, or set a default card. Changes apply to future purchases; existing subscriptions update on the next billing cycle.",
    category: "billing",
    href: "/student-dashboard/settings",
    hrefLabel: "Billing settings",
  },
  {
    id: "bill-refund",
    question: "Can I get a refund for a course?",
    answer:
      "Refunds are available within 14 days of purchase if you have not completed more than 20% of the course content. Submit a request through support@greydental.edu with your order reference.",
    category: "billing",
    href: "/contact",
    hrefLabel: "Contact support",
  },
  {
    id: "bill-invoice",
    question: "How do I download my invoice?",
    answer:
      "Invoices for every purchase appear under Settings → Billing & Subscription in your transaction history. Click any order to download a PDF receipt for expense reporting.",
    category: "billing",
    href: "/student-dashboard/settings",
    hrefLabel: "Billing history",
  },
  {
    id: "bill-cancel",
    question: "What is your cancellation policy?",
    answer:
      "You may cancel a subscription before the next renewal date without penalty. One-time course purchases are non-recurring—access continues until the enrollment period ends.",
    category: "billing",
    href: "/terms",
    hrefLabel: "Read terms",
  },
  {
    id: "bill-group",
    question: "Are there discounts for group subscriptions?",
    answer:
      "Yes. Clinics and dental schools enrolling five or more practitioners qualify for volume pricing. Email partnerships@greydental.edu with your team size for a custom quote.",
    category: "billing",
    href: "/contact",
    hrefLabel: "Contact sales",
  },
  {
    id: "bill-installments",
    question: "Can I pay in installments?",
    answer:
      "Selected programs offer split-payment plans at checkout. You'll see installment options on eligible courses—payments are charged monthly until the full tuition is covered.",
    category: "billing",
    href: "/courses",
    hrefLabel: "Browse courses",
  },
];

const safetyTips = [
  "Never share private patient information or photos.",
  "Ensure compliance with international dental board guidelines.",
];

export default function StudentHelpCenter() {
  const [tab, setTab] = useState<Category>("getting-started");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(defaultOpenByTab["getting-started"]);

  const visibleFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchesTab = tab === "all" || item.category === tab;
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  useEffect(() => {
    if (query.trim()) return;
    const preferred = defaultOpenByTab[tab];
    const exists = visibleFaqs.some((item) => item.id === preferred);
    setOpenId(exists ? preferred : visibleFaqs[0]?.id ?? "");
  }, [tab, query, visibleFaqs]);

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="min-w-0">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            Help Center
          </h1>
        </div>

        <section
          className="w-full min-w-0 rounded-[20px] sm:rounded-[24px] px-5 sm:px-8 py-8 sm:py-10 flex flex-col items-center text-center"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, #569CBC 0%, #3A738D 65%, #2F5F75 100%)",
          }}
        >
          <h2 className="text-white font-semi_bold_24pt text-[22px] sm:text-[28px] md:text-[32px] leading-snug tracking-tight mb-5 sm:mb-6 max-w-xl">
            What can we help you with today?
          </h2>
          <label className="relative w-full max-w-lg">
            <span className="sr-only">Search help</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777779] pointer-events-none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help FAQs, resources..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/95 border border-white/40 text-[#2F5F75] font-regular_18pt text-[14px] outline-none focus:ring-2 focus:ring-white/50 placeholder:text-[#777779]/70"
            />
          </label>
        </section>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#D5DEE2]">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`pb-2.5 font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors ${
                tab === item.id
                  ? "text-[#2F5F75] border-b-2 border-[#3A738D]"
                  : "text-[#777779] hover:text-[#2F5F75] border-b-2 border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6 w-full min-w-0 xl:items-start">
          <section className="flex-1 min-w-0">
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[18px] sm:text-[20px] leading-snug mb-4">
              Frequently Asked Questions
            </h2>
            <ul className="flex flex-col gap-3">
              {visibleFaqs.map((item) => {
                const open = openId === item.id;
                return (
                  <li key={item.id} className={`${card} overflow-hidden`}>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? "" : item.id)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                      aria-expanded={open}
                    >
                      <span className="text-[#2F5F75] font-semi_bold_24pt text-[14px] sm:text-[15px] leading-snug">
                        {item.question}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className={`flex-shrink-0 text-[#3A738D] transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {open && (
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] leading-relaxed border-t border-[#D5DEE2] pt-4">
                          {item.answer}
                        </p>
                        {item.href && item.hrefLabel && (
                          <Link
                            href={item.href}
                            className="inline-flex mt-3 text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline"
                          >
                            {item.hrefLabel} →
                          </Link>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
              {visibleFaqs.length === 0 && (
                <li className={`${card} px-5 py-8 text-center`}>
                  <p className="text-[#777779] font-regular_18pt text-[14px]">
                    No FAQs match your search. Try another keyword or tab.
                  </p>
                </li>
              )}
            </ul>
          </section>

          <aside className="w-full xl:w-[300px] xl:flex-shrink-0 flex flex-col gap-6">
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] leading-snug mb-2">
                Contact Support
              </h2>
              <p className="text-[#777779] font-regular_18pt text-[13px] leading-relaxed mb-5">
                Can&apos;t find what you need? Our dedicated team is ready to help
                with your clinical studies or billing questions.
              </p>

              <ul className="flex flex-col gap-4 mb-5">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-[#E5F8F0] flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11zm1.7.5 6.3 4.2L18.3 7H5.7z"
                        fill="#3A738D"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[#777779] font-regular_18pt text-[12px]">
                      Email Support
                    </p>
                    <a
                      href="mailto:support@greydental.edu"
                      className="text-[#2F5F75] font-inter-medium_18pt text-[13px] hover:underline break-all"
                    >
                      support@greydental.edu
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-[#E5F8F0] flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                        fill="#3A738D"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[#777779] font-regular_18pt text-[12px]">Phone</p>
                    <a
                      href="tel:+442071234567"
                      className="text-[#2F5F75] font-inter-medium_18pt text-[13px] hover:underline"
                    >
                      +44 20 7123 4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-[#E5F8F0] flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5V14a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5V5.5z"
                        fill="#3A738D"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[#777779] font-regular_18pt text-[12px]">
                      Live Chat
                    </p>
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                      Online{" "}
                      <span className="text-[#777779] font-regular_18pt">
                        (Usually responds in 5m)
                      </span>
                    </p>
                  </div>
                </li>
              </ul>

              <button
                type="button"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-[12px] bg-[#5ECAA0] hover:bg-[#7ED9B5] text-black font-inter-medium_18pt text-[14px] transition-colors"
              >
                Start Live Chat
              </button>
            </section>

            <section className={`${card} p-5 sm:p-6`}>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E5F8F0] flex-shrink-0">
                  <Image
                    src="/Community_Dash/Vector.png"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="w-4 h-4 object-contain"
                  />
                </span>
                <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] leading-snug">
                  Forum Safety
                </h2>
              </div>
              <ul className="flex flex-col gap-2.5">
                {safetyTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-[#777779] font-regular_18pt text-[13px] leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5ECAA0] flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
              <Link
                href="/student-dashboard/community"
                className="mt-4 inline-flex text-[#3A738D] font-inter-medium_18pt text-[13px] hover:underline"
              >
                Visit Community →
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </StudentDashboardShell>
  );
}
