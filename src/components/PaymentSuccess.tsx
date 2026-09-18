"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type OrderInfo = {
  id: string;
  status: string;
  amount: string;
  courseTitle: string;
  courseSlug: string | null;
  sessionId: string | null;
  createdAt: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const courseSlug = searchParams.get("course");

  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
        );
        const json = (await res.json()) as { order?: OrderInfo; error?: string };
        if (!res.ok) throw new Error(json.error || "Could not load order");
        if (!cancelled) setOrder(json.order ?? null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load order");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const dashboardHref = "/student-dashboard/courses";
  const courseHref = order?.courseSlug
    ? `/courses/${order.courseSlug}`
    : courseSlug
      ? `/courses/${courseSlug}`
      : "/courses";

  const dateLabel = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  const details = [
    {
      label: "Course Name",
      value: order?.courseTitle || "Your course",
    },
    {
      label: "Amount Paid",
      value: order?.amount || "$0.00 USD",
      accent: true,
    },
    {
      label: "Status",
      value: order?.status || "paid",
    },
    {
      label: "Transaction Date",
      value: dateLabel,
    },
  ];

  return (
    <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden flex-1 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-16 md:py-20 w-full min-w-0 flex flex-col items-center text-center">
        <div
          className="flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-[#5ECAA0] mb-6 sm:mb-7"
          aria-hidden="true"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path
              d="M5 12.5L9.5 17L19 7.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[28px] sm:text-[34px] md:text-[40px] leading-[1.15] tracking-tight mb-3 sm:mb-4">
          Payment Successful!
        </h1>

        <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed mb-8 sm:mb-10 max-w-lg">
          {loading
            ? "Confirming your enrollment…"
            : error
              ? error
              : (
                  <>
                    Thank you for your enrollment. Your order reference is{" "}
                    <span className="text-[#2F5F75] font-semi_bold_24pt">
                      {order?.sessionId || sessionId || "GD-DEMO"}
                    </span>
                  </>
                )}
        </p>

        <div className="w-full min-w-0 bg-[#F4F7F8] rounded-[16px] sm:rounded-[20px] px-5 sm:px-7 md:px-8 py-6 sm:py-7 text-left mb-8 sm:mb-10">
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-5">
            Enrollment Details
          </h2>

          <dl className="flex flex-col gap-4">
            {details.map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4"
              >
                <dt className="text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] flex-shrink-0">
                  {row.label}
                </dt>
                <dd
                  className={`font-regular_18pt text-[14px] sm:text-[15px] sm:text-right min-w-0 ${
                    row.accent
                      ? "text-[#3A738D] font-semi_bold_24pt"
                      : "text-[#2F5F75]"
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href={dashboardHref}
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] text-white font-inter-medium_18pt text-[14px] transition-colors"
          >
            Go to My Courses
          </Link>
          <Link
            href={courseHref}
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-[10px] border border-[#D5DEE2] bg-white text-[#2F5F75] font-inter-medium_18pt text-[14px] hover:bg-[#F4F7F8] transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-[#777779] font-regular_18pt text-[14px]">
          Loading…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
