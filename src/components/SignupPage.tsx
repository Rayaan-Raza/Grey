"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full min-w-0 bg-[#F4F7F8] border border-[#D5DEE2] rounded-[10px] px-4 py-3 text-[#2F5F75] font-regular_18pt text-[14px] sm:text-[15px] outline-none focus:border-[#3A738D] transition-colors placeholder:text-[#777779]/70";

const labelClass =
  "block text-[#2F5F75] font-inter-medium_18pt text-[13px] sm:text-[14px] mb-1.5";

type Role = "student" | "instructor";

const panelCopy: Record<Role, { title: string; body: string }> = {
  student: {
    title: "Join the Grey Dental clinical community",
    body: "Create an account to connect with peers, share insights, and stay updated on clinical best practices.",
  },
  instructor: {
    title: "Share Your Expertise with the Next Generation",
    body: "Are you a leading clinician with a passion for teaching? Join our global faculty and help shape the clinical standard of the future.",
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [agreed, setAgreed] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [license, setLicense] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isInstructor = role === "instructor";
  const copy = panelCopy[role];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName.trim(),
          role,
          institution: isInstructor ? institution.trim() : "",
          specialty: isInstructor ? specialty.trim() : "",
          license_number: isInstructor ? license.trim() : "",
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/student-dashboard");
      router.refresh();
      return;
    }

    setMessage("Check your email to confirm your account, then log in.");
    setLoading(false);
  }

  return (
    <div className="min-h-dvh w-full flex flex-col lg:flex-row bg-white">
      <div className="flex flex-1 min-w-0 items-start lg:items-center justify-center px-4 sm:px-8 py-10 sm:py-14 lg:py-16 overflow-y-auto">
        <div className="w-full max-w-[420px] flex flex-col">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] md:text-[32px] leading-[1.2] tracking-tight mb-2">
            Get started with Grey Dental
          </h1>
          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed mb-6 sm:mb-7">
            Set up your credentials to join our clinical community.
          </p>

          <div
            className="flex p-1 rounded-full bg-[#F4F7F8] border border-[#D5DEE2] mb-5 sm:mb-6"
            role="tablist"
            aria-label="Account type"
          >
            {(["student", "instructor"] as const).map((id) => {
              const selected = role === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setRole(id)}
                  className={`flex-1 py-2 rounded-full font-inter-medium_18pt text-[13px] sm:text-[14px] capitalize transition-colors ${
                    selected
                      ? "bg-white text-[#2F5F75] shadow-sm"
                      : "text-[#777779] hover:text-[#2F5F75]"
                  }`}
                >
                  {id}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2.5 w-full py-3 rounded-[10px] border border-[#D5DEE2] bg-white hover:bg-[#F4F7F8] transition-colors mb-5 sm:mb-6"
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

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Sarah Chen"
                className={inputClass}
              />
            </div>

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

            {isInstructor && (
              <>
                <div>
                  <label htmlFor="institution" className={labelClass}>
                    Institution / University
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    autoComplete="organization"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Harvard School of Dental Medicine"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="specialty" className={labelClass}>
                    Specialty
                  </label>
                  <input
                    id="specialty"
                    name="specialty"
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="Endodontics, Periodontics"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="license" className={labelClass}>
                    License / Certification Number
                  </label>
                  <input
                    id="license"
                    name="license"
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    placeholder="DDS-88421-US"
                    className={inputClass}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className={labelClass}>
                Create Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={inputClass}
              />
            </div>

            <label className="flex items-start gap-2.5 mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#D5DEE2] accent-[#5ECAA0] flex-shrink-0"
              />
              <span className="text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] leading-relaxed">
                I agree to the Grey Dental Clinical{" "}
                <Link
                  href="/terms"
                  className="text-[#3A738D] font-inter-medium_18pt hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#3A738D] font-inter-medium_18pt hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

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
              disabled={!agreed || loading}
              className="mt-2 inline-flex items-center justify-center w-full py-3.5 rounded-[10px] bg-[#3A738D] hover:bg-[#2F5F75] disabled:opacity-50 disabled:cursor-not-allowed text-white font-inter-medium_18pt text-[15px] transition-colors"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[#777779] font-regular_18pt text-[13px] sm:text-[14px]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#3A738D] font-semi_bold_24pt hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>

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
            {copy.title}
          </h2>
          <p className="font-regular_18pt text-[15px] xl:text-[16px] text-white/80 leading-relaxed">
            {copy.body}
          </p>
        </div>
      </aside>
    </div>
  );
}
