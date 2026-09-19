"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { friendlyAuthError } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full min-w-0 bg-[#F4F7F8] border border-[#D5DEE2] rounded-[10px] px-4 py-3 text-[#2F5F75] font-regular_18pt text-[14px] sm:text-[15px] outline-none focus:border-[#3A738D] transition-colors placeholder:text-[#777779]/70";

const labelClass =
  "block text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] mb-1.5";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/login`,
        },
      );

      if (resetError) {
        setError(friendlyAuthError(resetError.message));
        setLoading(false);
        return;
      }

      setMessage("If that email exists, we sent a reset link.");
      setLoading(false);
    } catch (err) {
      setError(friendlyAuthError(err instanceof Error ? err.message : String(err)));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh w-full flex flex-col lg:flex-row bg-white">
      <aside
        className="hidden lg:flex w-[42%] xl:w-[40%] flex-shrink-0 flex-col justify-between p-10 xl:p-12 text-white min-h-dvh sticky top-0"
        style={{
          background:
            "radial-gradient(circle at 80% 15%, #569CBC 0%, #3A738D 55%, #2F5F75 100%)",
        }}
      >
        <div>
          <BrandLogo href="/" height={48} onDark className="mb-1" />
          <p className="text-white/70 font-inter-medium_18pt text-[10px] tracking-[0.14em] uppercase mt-2">
            Clinical Excellence Rooted in Care
          </p>
        </div>

        <div className="max-w-md pb-4">
          <h2 className="font-semi_bold_24pt text-[28px] xl:text-[32px] leading-snug tracking-tight mb-4">
            Advancing Excellence in Dental Education.
          </h2>
          <p className="font-regular_18pt text-[15px] xl:text-[16px] text-white/80 leading-relaxed">
            Access verified academic programs, complete interactive cases, and
            manage your clinical assignments seamlessly in one unified platform.
          </p>
        </div>
      </aside>

      <div className="flex flex-1 min-w-0 items-center justify-center px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
        <div className="w-full max-w-[420px] flex flex-col">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] md:text-[32px] leading-[1.2] tracking-tight mb-2">
            Reset your password
          </h1>
          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed mb-6 sm:mb-7">
            Enter your email address and we&apos;ll send you a link to reset your
            password and get back into your account.
          </p>

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarahkhan489@gmail.com"
                className={inputClass}
              />
            </div>

            {error ? (
              <p className="text-red-600 font-regular_18pt text-[13px]">{error}</p>
            ) : null}
            {message ? (
              <p className="text-[#2F5F75] font-regular_18pt text-[13px]">
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center w-full py-3.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] disabled:opacity-60 text-white font-inter-medium_18pt text-[15px] transition-colors"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-6 text-center text-[#777779] font-regular_18pt text-[13px] sm:text-[14px]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-[#3A738D] font-semi_bold_24pt hover:underline"
            >
              Back to Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
