"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatUsd } from "@/lib/money";

const inputClass =
  "w-full min-w-0 bg-[#F4F7F8] border border-[#D5DEE2] rounded-[10px] px-4 py-3 text-[#2F5F75] font-regular_18pt text-[14px] sm:text-[15px] outline-none focus:border-[#3A738D] transition-colors placeholder:text-[#777779]/70";

const labelClass =
  "block text-[#777779] font-regular_18pt text-[13px] mb-1.5";

type CourseInfo = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price_cents: number;
};

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course") || "endodontics-remote";
  const canceled = searchParams.get("canceled");

  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/courses/${courseSlug}`);
        const json = (await res.json()) as {
          course?: CourseInfo;
          error?: string;
        };
        if (!res.ok) throw new Error(json.error || "Course not found");
        if (!cancelled) setCourse(json.course ?? null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load course");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseSlug]);

  const priceCents = course?.price_cents ?? 0;
  const discountCents = promoApplied ? Math.round(priceCents * 0.1) : 0;
  const totalCents = Math.max(priceCents - discountCents, 0);

  const priceLabel = useMemo(() => formatUsd(priceCents), [priceCents]);
  const totalLabel = useMemo(() => formatUsd(totalCents), [totalCents]);

  async function onCompletePurchase() {
    if (!course) return;
    setPaying(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: course.slug }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(json.error || "Checkout failed");
      if (!json.url) throw new Error("No checkout URL returned");
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setPaying(false);
    }
  }

  return (
    <section
      className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden flex-1"
      style={{ background: "#F4F7F8" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 w-full min-w-0">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6"
        >
          <Link
            href="/courses"
            className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] hover:text-[#3A738D] transition-colors"
          >
            Courses
          </Link>
          <span className="text-[#777779]/60 font-regular_18pt text-[12px]">
            &gt;
          </span>
          <Link
            href={`/courses/${courseSlug}`}
            className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] hover:text-[#3A738D] transition-colors"
          >
            {course?.title || "Course"}
          </Link>
          <span className="text-[#777779]/60 font-regular_18pt text-[12px]">
            &gt;
          </span>
          <span className="text-[#3A738D] font-inter-medium_18pt text-[12px] sm:text-[13px]">
            Checkout
          </span>
        </nav>

        <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-tight mb-4">
          Complete Your Enrollment
        </h1>

        <p className="text-[#777779] font-regular_18pt text-[14px] mb-6 max-w-2xl">
          With dummy Stripe keys, purchase completes in demo mode and enrolls you
          immediately. Replace keys in <code>.env.local</code> to use real Stripe
          Checkout.
        </p>

        {canceled ? (
          <p className="text-[#B86E00] font-regular_18pt text-[14px] mb-4">
            Checkout was canceled. You can try again when ready.
          </p>
        ) : null}
        {error ? (
          <p className="text-red-600 font-regular_18pt text-[14px] mb-4">{error}</p>
        ) : null}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 w-full min-w-0 items-start">
          <div className="flex flex-col flex-1 min-w-0 w-full gap-9 sm:gap-10">
            <section>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[20px] sm:text-[22px] leading-snug mb-4 sm:mb-5">
                Billing details (optional in demo)
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="cardholder" className={labelClass}>
                    Cardholder Name
                  </label>
                  <input
                    id="cardholder"
                    name="cardholder"
                    type="text"
                    autoComplete="cc-name"
                    placeholder="Dr. Sarah Thompson"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    placeholder="United States"
                    className={inputClass}
                  />
                </div>
              </div>
              <p className="mt-4 text-[#777779] font-regular_18pt text-[13px]">
                Live mode uses Stripe&apos;s hosted payment page — card fields
                there replace this form.
              </p>
            </section>
          </div>

          <aside
            className="w-full lg:w-[380px] xl:w-[400px] lg:flex-shrink-0 min-w-0 rounded-[20px] sm:rounded-[24px] p-6 sm:p-7 md:p-8 text-white shadow-[0_12px_40px_rgba(58,115,141,0.22)]"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, #569CBC 0%, #3A738D 70%)",
            }}
          >
            <h2 className="font-semi_bold_24pt text-[20px] sm:text-[22px] leading-snug mb-5">
              Order Summary
            </h2>

            {loading ? (
              <p className="font-regular_18pt text-[14px] text-white/80">
                Loading course…
              </p>
            ) : (
              <>
                <h3 className="font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-2">
                  {course?.title || "Course"}
                </h3>
                <p className="font-regular_18pt text-[13px] sm:text-[14px] text-white/75 leading-relaxed mb-6">
                  {course?.description || "Dental training enrollment."}
                </p>

                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex items-center justify-between gap-3 font-regular_18pt text-[14px]">
                    <span className="text-white/80">Price</span>
                    <span>{priceLabel}</span>
                  </div>
                  {promoApplied ? (
                    <div className="flex items-center justify-between gap-3 font-regular_18pt text-[14px]">
                      <span className="text-white/80">Promo (10%)</span>
                      <span>-{formatUsd(discountCents)}</span>
                    </div>
                  ) : null}
                </div>

                <div className="relative mb-5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    aria-label="Promo code"
                    className="w-full bg-[#2F5F75]/55 border border-white/15 rounded-[10px] pl-4 pr-[92px] py-3 text-white font-regular_18pt text-[13px] sm:text-[14px] outline-none focus:border-white/40 placeholder:text-white/45"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (promoCode.trim()) setPromoApplied(true);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] px-3.5 py-1.5 rounded-[8px] hover:bg-[#E5F8F0] transition-colors"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-4 mb-6">
                  <span className="font-semi_bold_24pt text-[16px] sm:text-[17px]">
                    Total Price
                  </span>
                  <span className="font-semi_bold_24pt text-[22px] sm:text-[24px] leading-none">
                    {totalLabel}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={paying || !course}
                  onClick={onCompletePurchase}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#5ECAA0] hover:bg-[#7ED9B5] disabled:opacity-60 text-black px-5 py-3.5 rounded-[10px] font-inter-medium_18pt text-[15px] transition-colors"
                >
                  {paying ? "Processing…" : "Complete Purchase"}
                  <span aria-hidden="true">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/courses")}
                  className="mt-3 w-full text-center text-white/80 hover:text-white font-regular_18pt text-[13px]"
                >
                  Back to courses
                </button>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-[#777779] font-regular_18pt text-[14px]">
          Loading checkout…
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
