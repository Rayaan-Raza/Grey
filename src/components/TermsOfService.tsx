import type { ReactNode } from "react";
import Link from "next/link";

const offeringBullets = [
  "Online, in-person, and hybrid dental education courses.",
  "Immersive clinical workshops and live interactable webinars.",
  "Specialized textbooks and dental clinical handbooks.",
  "Practical patient and clinic digital workflow templates.",
  "Skills assessments, certification programs, and credentials.",
  "Networking forums, discussion boards, and structured clinical mentorship.",
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

export default function TermsOfService() {
  return (
    <div className="w-full min-w-0 flex flex-col flex-1">
      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden bg-[#3A738D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-white/50 text-white font-inter-medium_18pt text-[11px] sm:text-[12px] tracking-[0.12em] uppercase px-3.5 py-1.5 mb-5 sm:mb-6">
            Legal Documentation
          </span>
          <h1 className="text-white font-semi_bold_24pt text-[32px] sm:text-[42px] md:text-[52px] leading-[1.15] tracking-tight mb-3 sm:mb-4">
            Terms of Service
          </h1>
          <p className="text-white/80 font-regular_18pt text-[14px] sm:text-[15px]">
            Last Updated: August 21, 2025
          </p>
        </div>
      </section>

      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-x-hidden bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 flex flex-col gap-8 sm:gap-10">
          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
            Welcome to Grey Dental Academy. These Terms of Service govern your
            access to and use of the Grey Dental Academy website, courses,
            workshops, webinars, educational materials, textbooks, clinical
            handbooks, workflow templates, discussion forums, and related
            services. By accessing or using our website or purchasing any of our
            products or services, you agree to these Terms. If you do not agree
            with these Terms, please do not use our services.
          </p>

          <Section title="About Grey Dental Academy" showDivider={false}>
            <p className="mb-4">
              Grey Dental Academy is an evidence-based and clinically driven
              dental education platform. Our educational services and product
              offerings include:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 flex flex-col gap-2.5">
              {offeringBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Eligibility and Accounts">
            <p>
              Our services are primarily tailored for dental professionals,
              dental students, and clinical graduates. To utilize certain parts
              of our ecosystem, you must register for a student portal account.
              You agree to provide fully accurate, updated information during
              registration. You remain solely responsible for the confidentiality
              of your account credentials and all activities occurring under your
              registered profile.
            </p>
          </Section>

          <Section title="Educational Purpose and Scope">
            <p>
              All course materials, lectures, and resources are provided strictly
              for educational and professional development purposes. They support
              continuing dental education and clinical reasoning. Participation
              in or completion of our courses does not replace direct clinical
              training, professional regulatory licensing, or patient-specific
              assessments. Enrolling in our educational pathways does not
              automatically authorize you to perform independent clinical
              procedures without appropriate statutory oversight.
            </p>
          </Section>

          <Section title="Clinical Responsibility">
            <p>
              While our clinical instructors present advanced dental procedures
              based on sound scientific evidence, every patient case presents
              unique biological variables. You are solely responsible for all
              diagnosis, treatment planning, informed consent protocols, clinical
              execution, post-operative monitoring, and complying with local
              medical regulations. Grey Dental Academy guarantees no specific
              clinical outcomes in your private practice.
            </p>
          </Section>

          <Section title="Course Registration and Access">
            <p>
              Access to our digital courses is granted based on the specific
              parameters outlined during purchase, which may be time-limited. All
              materials are restricted to personal, non-commercial educational
              use. Under no circumstances may you share your portal login
              credentials, or copy, redistribute, resell, or distribute our
              course elements. We reserve the immediate right to suspend or
              terminate accounts violating these access rules.
            </p>
          </Section>

          <Section title="Workshops and In-Person Training">
            <p>
              For all hands-on clinical workshops and in-person training events,
              you must adhere strictly to on-site instructor directions, local
              health and safety guidelines, and infection-control requirements.
              Participants are expected to behave in a professional and ethical
              manner at all times. We reserve the right to remove any participant
              whose actions pose clinical safety risks or breach code of conduct
              standards.
            </p>
          </Section>

          <Section title="Certificates and Assessments">
            <p>
              Certificates of completion are issued only to students who fulfill
              the designated learning benchmarks and pass the course assessments.
              These certificates represent the completion of a continuing
              education program and do not constitute a specialized clinical
              qualification or professional dental license in any regulatory
              jurisdiction.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All proprietary content—including course videos, lectures,
              textbooks, digital templates, clinical handbooks, illustrations,
              animations, branding, and text—is owned by or licensed to Grey
              Dental Academy. You may not copy, upload to external databases,
              screen-record, or use our educational assets to build commercial
              training products without explicit written permission from our
              administration.
            </p>
          </Section>

          <Section title="User-Generated Content">
            <p>
              When submitting case studies, peer reviews, comments, or clinical
              thoughts in our discussion boards, you retain copyright but grant
              Grey Dental Academy a non-exclusive license to use, display, and
              distribute this content for educational improvement. You are
              strictly prohibited from publishing defamatory materials, malicious
              code, or files violating copyright or professional obligations.
            </p>
          </Section>

          <Section title="Patient Cases and Clinical Images">
            <p>
              When uploading clinical imagery, radiographs, or case scenarios for
              peer review, clinicians are completely responsible for ensuring
              patient privacy. All personal identifying data must be completely
              anonymized. Grey Dental Academy reserves the right to immediately
              remove any case study or image containing patient identifiers
              uploaded without documented patient consent.
            </p>
          </Section>

          <Section title="Pricing and Payments">
            <p>
              Course and workshop fees are posted on the relevant listing pages
              at the time of purchase. You agree to provide accurate payment
              information and authorize us and our payment processors to charge
              the stated amount. Price changes will not affect registrations that
              have already been confirmed.
            </p>
          </Section>

          <Section title="Refunds and Cancellations">
            <p>
              Refund and cancellation policies vary between digital courses and
              hands-on workshops. Digital enrollments may be subject to a limited
              refund window after purchase. In-person events typically require
              cancellation by a stated deadline and may incur a processing fee.
              Specific terms are shown at checkout and in your confirmation
              email.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>
              Our platform may integrate third-party software for payments, video
              hosting, shipping, and related operations. Grey Dental Academy is
              not liable for outages, data handling, or other issues arising
              solely from those providers, except as required by applicable law.
            </p>
          </Section>

          <Section title="Website Availability">
            <p>
              We aim for high uptime so you can access courses and community
              tools reliably. We reserve the right to suspend or interrupt access
              for scheduled maintenance, upgrades, security incidents, or
              circumstances beyond our reasonable control.
            </p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>
              To the maximum extent permitted by applicable law, Grey Dental
              Academy provides its clinical education materials on an
              &quot;as-is&quot; and &quot;as-available&quot; basis, without
              warranties of any kind. Clinicians are responsible for constantly
              verifying treatment practices and using professional judgment.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              Under no circumstances will Grey Dental Academy, its speakers, or
              clinical instructors be held liable for any indirect, incidental, or
              consequential damages resulting from your implementation of the
              techniques taught or clinical files shared.
            </p>
          </Section>

          <Section title="Professional Conduct">
            <p>
              We promote a respectful, collaborative educational space.
              Harassment, verbal abuse, intellectual property piracy, fraudulent
              account sharing, or posting unconstructive feedback inside the
              clinical forums will result in immediate student suspension.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              We reserve the right to modify these Terms of Service. Every
              modification will be directly published to this page with the
              modified &quot;Last Updated&quot; timestamp reflected at the top of
              the page. Continued use of our portal constitutes acceptance of the
              updated terms.
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
