import type { ReactNode } from "react";
import Link from "next/link";

const thirdPartyCookies = [
  "Analytics providers",
  "Payment gateways and processors",
  "Video-hosting and streaming platforms",
  "Interactive webinar hosting tools",
  "Specialized marketing and communication suites",
  "Integrated social media networks",
];

const manageCookies = [
  "View currently stored cookies on your device",
  "Selectively delete unwanted cookies",
  "Block all cookies from being saved entirely",
  "Restrict only third-party tracking cookies",
  "Receive direct alerts or notifications when new cookies are used",
];

function Section({
  title,
  children,
  showDivider = true,
}: {
  title: string;
  children: ReactNode;
  showDivider?: boolean;
}) {
  return (
    <section
      className={
        showDivider ? "pt-8 sm:pt-10 border-t border-[#D5DEE2]" : undefined
      }
    >
      <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[20px] sm:text-[22px] md:text-[24px] leading-snug tracking-tight mb-3 sm:mb-4">
        {title}
      </h2>
      <div className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function CookieType({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h3 className="text-[#3A738D] font-semi_bold_24pt text-[15px] sm:text-[16px] mb-1.5">
        {title}
      </h3>
      <p>{children}</p>
    </div>
  );
}

export default function CookiePolicy() {
  return (
    <div className="w-full min-w-0 flex flex-col flex-1">
      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden bg-[#3A738D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-white/50 text-white font-inter-medium_18pt text-[11px] sm:text-[12px] tracking-[0.12em] uppercase px-3.5 py-1.5 mb-5 sm:mb-6">
            Legal Documentation
          </span>
          <h1 className="text-white font-semi_bold_24pt text-[32px] sm:text-[42px] md:text-[52px] leading-[1.15] tracking-tight mb-3 sm:mb-4">
            Cookie Policy
          </h1>
          <p className="text-white/80 font-regular_18pt text-[14px] sm:text-[15px]">
            Last Updated: August 21, 2026
          </p>
        </div>
      </section>

      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 flex flex-col gap-8 sm:gap-10">
          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
            This Cookie Policy explains how Grey Dental Academy uses cookies and
            similar tracking technologies when you visit our website, student
            portal, checkout, and related educational services. It should be read
            together with our Privacy Policy.
          </p>

          <Section title="What Are Cookies?" showDivider={false}>
            <p>
              Cookies are small text files stored on your device when you visit a
              website. They help the site remember your session, keep you signed
              in, understand how pages are used, and, where permitted, support
              relevant educational communications. Similar technologies such as
              pixels, local storage, and session identifiers may be used for the
              same purposes.
            </p>
          </Section>

          <Section title="Why We Use Cookies">
            <p className="mb-5">
              Grey Dental Academy may use cookies for several purposes:
            </p>
            <div className="flex flex-col gap-5">
              <CookieType title="Essential Cookies">
                Necessary for the website to function properly. They help with
                account login, authentication, security, shopping and checkout,
                course access, and session management. Generally, these cannot
                be disabled because certain core platform functions may not work
                without them.
              </CookieType>
              <CookieType title="Preference Cookies">
                Help remember choices such as your language preferences, display
                preferences, and other custom website configurations that you
                select during your session.
              </CookieType>
              <CookieType title="Analytics Cookies">
                Used to understand how visitors interact with our website, which
                pages are most frequently visited, how users navigate the
                interface, and overall website performance. This data helps us
                continuously improve the user experience and educational
                platform.
              </CookieType>
              <CookieType title="Marketing Cookies">
                Where applicable and with appropriate permissions, we use these
                to measure the efficiency of our marketing campaigns, understand
                interactions with advertisements, deliver more relevant
                educational communications, and measure student enrollment
                conversions.
              </CookieType>
            </div>
          </Section>

          <Section title="Third-Party Cookies">
            <p className="mb-4">
              Some cookies may be placed by trusted third-party services that
              integrate directly into our system. These include:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 flex flex-col gap-2.5 mb-4">
              {thirdPartyCookies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              These third-party platforms may collect information in accordance
              with their own independent privacy and cookie policies.
            </p>
          </Section>

          <Section title="Managing Cookies">
            <p className="mb-4">
              You can control, review, or delete cookies at any time through your
              web browser&apos;s setting panels. Most modern web browsers allow
              you to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 flex flex-col gap-2.5 mb-4">
              {manageCookies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Please be aware that disabling certain critical cookies may
              directly impact basic website functionalities—including portal login
              capabilities, course access, final secure checkout, and other
              custom settings.
            </p>
          </Section>

          <Section title="Cookie Consent">
            <p>
              Where required by applicable global privacy and medical data
              protection regulations, your active consent will be explicitly
              requested before placing non-essential cookies. You have the
              freedom to change or completely withdraw your cookie preferences
              through the interactive cookie preference mechanism built directly
              into our site&apos;s footer.
            </p>
          </Section>

          <Section title="Changes to This Cookie Policy">
            <p>
              We may occasionally update this Cookie Policy when new
              technologies, educational services, or legislative changes are
              introduced. Any modifications will be directly posted to this page
              with the modified &quot;Last Updated&quot; timestamp updated at the
              top. We encourage you to review this policy periodically.
            </p>
            <p className="mt-4">
              Related documents:{" "}
              <Link
                href="/privacy"
                className="text-[#3A738D] font-inter-medium_18pt hover:underline"
              >
                Privacy Policy
              </Link>
              {" · "}
              <Link
                href="/terms"
                className="text-[#3A738D] font-inter-medium_18pt hover:underline"
              >
                Terms of Service
              </Link>
            </p>
          </Section>
        </div>
      </section>
    </div>
  );
}
