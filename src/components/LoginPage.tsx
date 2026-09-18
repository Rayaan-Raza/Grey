"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full min-w-0 bg-[#F4F7F8] border border-[#D5DEE2] rounded-[10px] px-4 py-3 text-[#2F5F75] font-regular_18pt text-[14px] sm:text-[15px] outline-none focus:border-[#3A738D] transition-colors placeholder:text-[#777779]/70";

const labelClass =
  "block text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] mb-1.5";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => searchParams.get("next") || "/student-dashboard",
    [searchParams],
  );

  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (profile?.role === "admin") {
        router.push("/admin-dashboard");
        router.refresh();
        return;
      }
    }

    router.push(nextPath.startsWith("/") ? nextPath : "/student-dashboard");
    router.refresh();
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
            Welcome back
          </h1>
          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed mb-6 sm:mb-7">
            Log in to access your dashboard, courses, and clinical files.
          </p>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2.5 w-full py-3 rounded-[10px] border border-[#D5DEE2] bg-white hover:bg-[#F4F7F8] transition-colors"
          >
            <Image
              src="/sign/login/Group.png"
              alt=""
              width={20}
              height={20}
              unoptimized
              className="w-5 h-5 object-contain"
            />
            <span className="text-[#3A738D] font-inter-medium_18pt text-[14px] sm:text-[15px]">
              Continue with Google
            </span>
          </button>

          <div className="flex items-center gap-3 my-5 sm:my-6" aria-hidden="true">
            <div className="flex-1 h-px bg-[#D5DEE2]" />
            <span className="text-[#777779] font-regular_18pt text-[12px] tracking-wide">
              OR
            </span>
            <div className="flex-1 h-px bg-[#D5DEE2]" />
          </div>

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

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D5DEE2] accent-[#5ECAA0] flex-shrink-0"
                />
                <span className="text-[#777779] font-regular_18pt text-[13px]">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[#777779] hover:text-[#3A738D] font-regular_18pt text-[13px] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {error ? (
              <p className="text-red-600 font-regular_18pt text-[13px]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center w-full py-3.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] disabled:opacity-60 text-white font-inter-medium_18pt text-[15px] transition-colors"
            >
              {loading ? "Logging in…" : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-[#777779] font-regular_18pt text-[13px] sm:text-[14px]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#3A738D] font-semi_bold_24pt hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
