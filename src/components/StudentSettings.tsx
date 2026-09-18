"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StudentDashboardShell from "@/components/StudentDashboardShell";

const ASSET = "/Student_Dashboard";
const card =
  "bg-white border border-[#D5DEE2] rounded-[20px] shadow-[0_8px_30px_rgba(47,95,117,0.06)]";

const inputClass =
  "w-full min-w-0 bg-[#F4F7F8] border border-[#D5DEE2] rounded-[10px] px-4 py-3 text-[#2F5F75] font-regular_18pt text-[14px] outline-none focus:border-[#3A738D] transition-colors placeholder:text-[#777779]/70";

const labelClass =
  "block text-[#2F5F75] font-inter-medium_18pt text-[13px] mb-1.5";

type Tab = "account" | "billing" | "notifications" | "privacy";

const tabs: { id: Tab; label: string; icon: "user" | "card" | "bell" | "shield" }[] = [
  { id: "account", label: "Account Settings", icon: "user" },
  { id: "billing", label: "Billing & Subscription", icon: "card" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "privacy", label: "Privacy & Data", icon: "shield" },
];

function TabIcon({ type }: { type: (typeof tabs)[number]["icon"] }) {
  if (type === "user") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "card") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === "bell") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
        on ? "bg-[#5ECAA0]" : "bg-[#D5DEE2]"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          on ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function StudentSettings() {
  const [tab, setTab] = useState<Tab>("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [privacyPrefs, setPrivacyPrefs] = useState({
    publicProfile: true,
    showProgress: true,
    showCertificates: false,
    shareAnalytics: true,
  });
  const [notifPrefs, setNotifPrefs] = useState({
    newsletter: true,
    courseUpdates: true,
    assignments: true,
    certificates: false,
    workshops: true,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/profile");
        const json = (await res.json()) as {
          profile?: {
            full_name?: string | null;
            phone?: string | null;
          } | null;
          email?: string | null;
          error?: string;
        };
        if (!res.ok) throw new Error(json.error || "Failed to load profile");
        if (cancelled) return;
        setName(json.profile?.full_name || "");
        setPhone(json.profile?.phone || "");
        setEmail(json.email || "");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load profile");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name.trim(),
          phone: phone.trim(),
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setMessage("Profile saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <StudentDashboardShell>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 md:py-8 w-full min-w-0 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="text-[#2F5F75] font-semi_bold_24pt text-[26px] sm:text-[30px] leading-tight tracking-tight">
            Settings
          </h1>
          <button
            type="button"
            disabled={saving || loading}
            onClick={onSave}
            className="inline-flex items-center justify-center self-start sm:self-auto px-5 py-2.5 rounded-[10px] bg-[#5ECAA0] hover:bg-[#7ED9B5] disabled:opacity-60 text-black font-inter-medium_18pt text-[14px] transition-colors"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>

        {error ? (
          <p className="text-red-600 font-regular_18pt text-[13px]">{error}</p>
        ) : null}
        {message ? (
          <p className="text-[#2F5F75] font-regular_18pt text-[13px]">{message}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#D5DEE2]">
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`inline-flex items-center gap-2 pb-2.5 font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors ${
                  active
                    ? "text-[#2F5F75] border-b-2 border-[#3A738D]"
                    : "text-[#777779] hover:text-[#2F5F75] border-b-2 border-transparent"
                }`}
              >
                <span className={active ? "text-[#3A738D]" : "text-[#777779]"}>
                  <TabIcon type={item.icon} />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>

        {tab === "account" && (
          <>
            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug">
                Profile Information
              </h2>
              <p className="mt-1 text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] mb-5">
                Manage your personal details and keep your contact info up to date.
              </p>

              <div className="flex items-center gap-3.5 mb-6">
                <Image
                  src={`${ASSET}/avatar.png`}
                  alt={name || "Profile"}
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-[12px] object-cover border border-[#D5DEE2]"
                />
                <p className="text-[#2F5F75] font-semi_bold_24pt text-[15px] sm:text-[16px] truncate">
                  {loading ? "Loading…" : name || "Your name"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="settings-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="settings-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="settings-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="settings-email"
                    type="email"
                    value={email}
                    readOnly
                    className={`${inputClass} opacity-80`}
                  />
                </div>
                <div>
                  <label htmlFor="settings-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="settings-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </section>

            <section className={`${card} p-5 sm:p-6`}>
              <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] leading-snug mb-4">
                Security
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                      Two-factor authentication
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[13px]">
                      Extra protection for your account (UI only for now).
                    </p>
                  </div>
                  <Toggle
                    on={twoFactor}
                    onChange={() => setTwoFactor((v) => !v)}
                    label="Two-factor authentication"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[#2F5F75] font-inter-medium_18pt text-[14px]">
                      Login alerts
                    </p>
                    <p className="text-[#777779] font-regular_18pt text-[13px]">
                      Notify me about new sign-ins (UI only for now).
                    </p>
                  </div>
                  <Toggle
                    on={loginAlerts}
                    onChange={() => setLoginAlerts((v) => !v)}
                    label="Login alerts"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {tab === "billing" && (
          <section className={`${card} p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px]">
              Billing & Subscription
            </h2>
            <p className="mt-2 text-[#777779] font-regular_18pt text-[14px]">
              Payment history will appear here after Stripe checkout is connected.
            </p>
          </section>
        )}

        {tab === "notifications" && (
          <section className={`${card} p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] mb-4">
              Notifications
            </h2>
            <div className="flex flex-col gap-3">
              {(
                [
                  ["newsletter", "Newsletter"],
                  ["courseUpdates", "Course updates"],
                  ["assignments", "Assignments"],
                  ["certificates", "Certificates"],
                  ["workshops", "Workshops"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <p className="text-[#2F5F75] font-regular_18pt text-[14px]">{label}</p>
                  <Toggle
                    on={notifPrefs[key]}
                    onChange={() =>
                      setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    label={label}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "privacy" && (
          <section className={`${card} p-5 sm:p-6`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[17px] sm:text-[18px] mb-4">
              Privacy & Data
            </h2>
            <div className="flex flex-col gap-3">
              {(
                [
                  ["publicProfile", "Public profile"],
                  ["showProgress", "Show learning progress"],
                  ["showCertificates", "Show certificates"],
                  ["shareAnalytics", "Share analytics"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <p className="text-[#2F5F75] font-regular_18pt text-[14px]">{label}</p>
                  <Toggle
                    on={privacyPrefs[key]}
                    onChange={() =>
                      setPrivacyPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    label={label}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-[#777779] font-regular_18pt text-[13px]">
              See our{" "}
              <Link href="/privacy" className="text-[#3A738D] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        )}
      </div>
    </StudentDashboardShell>
  );
}
