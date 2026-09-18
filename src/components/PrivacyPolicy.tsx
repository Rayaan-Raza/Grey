import Link from "next/link";
import type { ReactNode } from "react";

const useBullets = [
  "Create, maintain, and verify your professional student account.",
  "Process educational transactions, invoice billing, and deliver curriculum textbooks.",
  "Facilitate workshop scheduling, webinar streaming, and issue verifiable CE certificates.",
  "Diagnose technical difficulties and evaluate course interactions to optimize our educational methodologies.",
  "Enforce website security and comply with statutory legal frameworks.",
];

const rightsBullets = [
  "Access and obtain a copy of the personal data we hold about you.",
  "Request correction of inaccurate or incomplete information.",
  "Request deletion of your personal data where legally permitted.",
  "Object to or restrict certain types of processing.",
  "Withdraw consent for marketing communications at any time.",
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

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-w-0 flex flex-col flex-1">
      {/* Hero */}
      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden bg-[#3A738D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-white/50 text-white font-inter-medium_18pt text-[11px] sm:text-[12px] tracking-[0.12em] uppercase px-3.5 py-1.5 mb-5 sm:mb-6">
            Legal Documentation
          </span>
          <h1 className="text-white font-semi_bold_24pt text-[32px] sm:text-[42px] md:text-[52px] leading-[1.15] tracking-tight mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/80 font-regular_18pt text-[14px] sm:text-[15px]">
            Last Updated: August 21, 2024
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 flex flex-col gap-8 sm:gap-10">
          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
            Grey Dental Academy values the trust of dental professionals who
            engage with our specialized clinical education programs. This Privacy
            Policy explains how we gather, utilize, store, and protect personal
            data when you browse our website, enroll in remote courses, register
            for immersive residencies, or interact with our professional
            discussion communities.
          </p>

          <Section title="Information We Collect" showDivider={false}>
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-[#3A738D] font-semi_bold_24pt text-[15px] sm:text-[16px] mb-1.5">
                  Personal Information:
                </h3>
                <p>
                  When you create a student account or enroll, we collect identity
                  details such as your full legal name, professional email
                  address, phone number, dental practice or clinic affiliation,
                  and professional credentials or license numbers.
                </p>
              </div>
              <div>
                <h3 className="text-[#3A738D] font-semi_bold_24pt text-[15px] sm:text-[16px] mb-1.5">
                  Educational Information:
                </h3>
                <p>
                  We maintain records of your course enrollments, module
                  completion progress, assessment scores, CE credit hours earned,
                  certificate issuance dates, and workshop attendance.
                </p>
              </div>
              <div>
                <h3 className="text-[#3A738D] font-semi_bold_24pt text-[15px] sm:text-[16px] mb-1.5">
                  Technical Information:
                </h3>
                <p>
                  Like most educational platforms, we automatically log technical
                  data including IP addresses, browser type, device identifiers,
                  referring URLs, and session analytics to maintain platform
                  security and improve user experience.
                </p>
              </div>
            </div>
          </Section>

          <Section title="How We Use Your Information">
            <p className="mb-4">
              We use the information we collect to operate and improve Grey
              Dental Academy, including to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 flex flex-col gap-2.5 mb-5">
              {useBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <span className="text-[#2F5F75] font-semi_bold_24pt">
                Marketing Note:
              </span>{" "}
              We may send promotional emails about new courses, workshops, or
              educational resources. You can unsubscribe at any time via the link
              in each email or by contacting us directly.
            </p>
          </Section>

          <Section title="Payments">
            <p>
              Full payment for courses and physical study materials is collected
              through highly secure, third-party payment gateways. Grey Dental
              Academy receives transaction metadata (such as confirmation of
              payment, billing country, and subscription status) but never stores
              or directly accesses your raw credit/debit card numbers or security
              codes. All billing data is processed in accordance with PCI-DSS
              guidelines.
            </p>
          </Section>

          <Section title="Educational Communities and Discussion Forums">
            <p>
              As part of our collaborative model, you may gain access to
              interactive discussion boards, peer-to-peer messaging spaces, and
              clinical mentorship channels. Any information, clinical thoughts, or
              case documentation you voluntarily share in these zones is visible
              to other authorized members. You are strictly prohibited from
              posting passwords, personal identity files, confidential patient
              documents, or unauthorized proprietary files.
            </p>
          </Section>

          <Section title="Patient Information">
            <p>
              Grey Dental Academy is an educational resource, not a certified
              clinical repository or Electronic Health Record (EHR) database. When
              sharing clinical case histories, radiographs, or treatment protocols
              for educational review, clinicians are completely responsible for
              ensuring that all patient identities are fully anonymized. No real
              names, national ID numbers, or distinct identifying facial
              photographs must ever be uploaded without explicit written patient
              authorization.
            </p>
          </Section>

          <Section title="Cookies and Tracking Technologies">
            <p>
              We use functional, analytical, and marketing cookies to preserve
              your login states across browser sessions, remember custom learning
              preferences, track aggregated site analytics, and help deliver
              contextual product notices. For detailed information on controlling
              your cookie tracking parameters, please review our comprehensive{" "}
              <Link
                href="/cookies"
                className="text-[#3A738D] font-inter-medium_18pt hover:underline"
              >
                Cookie Policy
              </Link>{" "}
              page.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>
              We coordinate with select service providers to execute platform
              operations, including video streaming infrastructure (for webinars),
              LMS platforms, physical courier systems (for dental handbooks),
              transactional email relays, and financial processors. These partners
              act as processors on our behalf and are legally bound to protect
              your personal details with equivalent standard administrative
              safeguards.
            </p>
          </Section>

          <Section title="How We Protect Your Information">
            <p>
              We enforce standard administrative, physical, and technological
              security controls—such as end-to-end database encryption (SSL/TLS),
              strict internal data access policies, and automated system
              patches—to defend against unauthorized access, loss, or alteration.
              However, no digital transmission channel can ever be completely
              guaranteed; we advise utilizing highly complex passwords and keeping
              your credentials confidential.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain your personal, billing, and course progress records only
              for the period necessary to fulfill the educational or tax
              obligations outlined in this policy. For instance, CE transcripts
              are stored indefinitely so that you can verify your earned credit
              units to local medical/dental licensing boards. When data is no
              longer necessary for these legal, financial, or tracking purposes,
              it is securely destroyed or entirely anonymized.
            </p>
          </Section>

          <Section title="Your Rights">
            <p className="mb-4">
              Depending on applicable law, you may have rights regarding your
              personal information, including the ability to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 flex flex-col gap-2.5">
              {rightsBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Our curriculum is designed exclusively for adult dental graduates,
              dental students, and licensed practitioners. We do not knowingly
              collect personal information from anyone under the age of 18. If we
              become aware that we have collected data from a minor, we will
              delete it promptly.
            </p>
          </Section>

          <Section title="International Users">
            <p>
              As a global education platform serving clinicians worldwide, your
              information may be transferred to, stored, and processed in the
              United Kingdom or other regions where our service providers operate.
              By using our platform, you acknowledge and accept these cross-border
              data transfer practices.
            </p>
          </Section>

          <Section title="Changes to This Privacy Policy">
            <p>
              We reserve the right to revise this Privacy Policy to reflect
              updates in our educational workflows, technology stack, or global
              compliance laws. Modifications will be published directly to this
              page with an updated &quot;Last Updated&quot; timestamp. We
              recommend visiting this page periodically to stay informed.
            </p>
            <p className="mt-4">
              Related documents:{" "}
              <Link
                href="/terms"
                className="text-[#3A738D] font-inter-medium_18pt hover:underline"
              >
                Terms of Service
              </Link>
              {" · "}
              <Link
                href="/cookies"
                className="text-[#3A738D] font-inter-medium_18pt hover:underline"
              >
                Cookie Policy
              </Link>
            </p>
          </Section>
        </div>
      </section>
    </div>
  );
}
