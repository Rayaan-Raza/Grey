import Image from "next/image";
import Link from "next/link";

const priceFeatures = [
  { icon: "/Specific_Course_Page/modules.svg", label: "11 modules" },
  { icon: "/Specific_Course_Page/hours.svg", label: "40 hours, 15 mins" },
  {
    icon: "/Specific_Course_Page/students.svg",
    label: "1,240+ students enrolled",
  },
  {
    icon: "/Specific_Course_Page/certificate-small.svg",
    label: "Remote Certificate included",
  },
  {
    icon: "/Specific_Course_Page/self-pace.svg",
    label: "Pay once, learn at your own pace",
  },
];

const summaryCards = [
  {
    icon: "/Specific_Course_Page/globe.svg",
    value: "100%",
    label: "Online Delivery",
  },
  {
    icon: "/Specific_Course_Page/clock.svg",
    value: "8 Weeks",
    label: "Digital Certificate",
  },
  {
    icon: "/Specific_Course_Page/diploma.svg",
    value: "Certificate",
    label: "Credential",
  },
  {
    icon: "/Specific_Course_Page/community.svg",
    value: "Community",
    label: "Student Discussion Forum",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/", icon: true },
  { label: "Courses", href: "/courses" },
  { label: "Endodontics", href: "/courses" },
  { label: "Foundations of Clinical Endodontics", href: null },
];

export default function CourseDetailLanding() {
  return (
    <section
      className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #9BF7CC1A 0%, #C8DDFF1A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 flex flex-col gap-8 sm:gap-10 md:gap-12">
        {/* Breadcrumb + title */}
        <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
          >
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.label} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <Image
                    src="/Specific_Course_Page/chevron.svg"
                    alt=""
                    width={5}
                    height={10}
                    className="w-[5px] h-[10px] flex-shrink-0"
                  />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="inline-flex items-center gap-1.5 text-[#777779] font-regular_18pt text-[12px] sm:text-[13px] hover:text-[#3A738D] transition-colors leading-none"
                  >
                    {crumb.icon && (
                      <Image
                        src="/Specific_Course_Page/home.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 shrink-0 -translate-y-[5px]"
                      />
                    )}
                    <span className={crumb.icon ? "hidden sm:inline" : undefined}>
                      {crumb.label}
                    </span>
                  </Link>
                ) : (
                  <span className="text-[#3A738D] font-inter-medium_18pt text-[12px] sm:text-[13px]">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>

          <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[52px] font-semi_bold_24pt text-[#3A738D] leading-[1.15] tracking-tight max-w-4xl">
            Foundations of Clinical Endodontics
          </h1>

          <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-2xl">
            A structured foundation course covering pulp biology, diagnosis,
            case selection, pain management, access, instrumentation, irrigation,
            obturation, restoration, and complication management.
          </p>
        </div>

        {/* Media + pricing */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-stretch w-full min-w-0">
          {/* Video / image */}
          <div className="relative flex w-full lg:flex-1 min-w-0 min-h-[240px] sm:min-h-[320px] lg:min-h-[420px] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(58,115,141,0.12)]">
            <Image
              src="/Specific_Course_Page/hero.png"
              alt="Foundations of Endodontics course preview"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/Specific_Course_Page/play.svg"
                alt="Play preview"
                width={74}
                height={71}
                className="w-14 h-14 sm:w-[74px] sm:h-[71px] drop-shadow-lg"
              />
            </div>
          </div>

          {/* Pricing card */}
          <div className="flex flex-col w-full lg:w-[360px] xl:w-[380px] lg:flex-shrink-0 min-w-0 bg-[#3A738D] rounded-[20px] sm:rounded-[24px] p-6 sm:p-7 md:p-8 shadow-[0_12px_40px_rgba(58,115,141,0.2)]">
            <span className="text-white/80 font-regular_18pt text-[13px] sm:text-[14px] mb-1">
              Course Price
            </span>
            <div className="text-white font-semi_bold_24pt text-[40px] sm:text-[48px] leading-none tracking-tight mb-6 sm:mb-8">
              $269
            </div>

            <ul className="flex flex-col gap-3 sm:gap-3.5 mb-7 sm:mb-8">
              {priceFeatures.map((feature) => (
                <li key={feature.label} className="flex items-center gap-3">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] flex-shrink-0"
                  />
                  <span className="text-white font-regular_18pt text-[13px] sm:text-[14px]">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/checkout?course=endodontics-remote"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#7ED9B5] hover:bg-[#5ECAA0] text-black px-5 py-3.5 rounded-[10px] font-inter-medium_18pt text-[15px] mb-5 transition-colors"
            >
              <Image
                src="/Specific_Course_Page/buy-icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Buy Course</span>
            </Link>

            <div className="flex flex-col items-center gap-3 pt-1">
              <p className="text-white/55 font-regular_18pt text-[10px] sm:text-[11px] tracking-[0.06em] uppercase text-center leading-relaxed">
                The payment process is secured by TLS data encryption
              </p>

              <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                <div
                  className="flex items-center justify-center h-8 min-w-[52px] px-2.5 rounded-[6px] bg-[#2F5F75] border border-white/10"
                  aria-label="Visa"
                >
                  <Image
                    src="/Specific_Course_Page/visa-logo.svg"
                    alt="Visa"
                    width={43}
                    height={14}
                    className="h-3.5 w-auto"
                  />
                </div>

                <div
                  className="flex items-center justify-center h-8 min-w-[52px] px-2 rounded-[6px] bg-[#2F5F75] border border-white/10"
                  aria-label="Mastercard"
                >
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.5" cy="8" r="6.5" fill="#EB001B" />
                    <circle cx="17.5" cy="8" r="6.5" fill="#F79E1B" />
                    <path
                      d="M14 2.9C15.15 3.85 15.9 5.55 15.9 8C15.9 10.45 15.15 12.15 14 13.1C12.85 12.15 12.1 10.45 12.1 8C12.1 5.55 12.85 3.85 14 2.9Z"
                      fill="#FF5F00"
                    />
                  </svg>
                </div>

                <div
                  className="flex items-center justify-center h-8 min-w-[52px] px-1.5 rounded-[6px] bg-[#2F5F75] border border-white/10"
                  aria-label="UnionPay"
                >
                  <Image
                    src="/Specific_Course_Page/UnionPay.svg"
                    alt="UnionPay"
                    width={40}
                    height={25}
                    className="h-5 w-auto"
                  />
                </div>

                <div
                  className="flex items-center justify-center h-8 min-w-[52px] px-2 rounded-[6px] bg-[#2F5F75] border border-white/10"
                  aria-label="Payoneer"
                >
                  <Image
                    src="/Specific_Course_Page/Payoneer.svg"
                    alt="Payoneer"
                    width={49}
                    height={17}
                    className="h-3.5 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Summary */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 w-full pt-2 sm:pt-4">
          <h2 className="text-[28px] sm:text-3xl md:text-4xl font-semi_bold_24pt text-[#3A738D] tracking-tight text-center">
            Course Summary
          </h2>

          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-4 sm:gap-5 w-full min-w-0">
            {summaryCards.map((card) => (
              <article
                key={card.value}
                className="flex flex-col items-center text-center justify-center w-full sm:w-[calc(50%-0.625rem)] lg:w-auto lg:flex-1 min-w-0 bg-white border border-[#E5E7EB] border-t-[4px] border-t-[#7ED9B5] rounded-[16px] sm:rounded-[20px] px-5 py-7 sm:py-8 shadow-[0_8px_24px_rgba(58,115,141,0.06)]"
              >
                <Image
                  src={card.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-5"
                />
                <div className="text-[22px] sm:text-[24px] font-semi_bold_24pt text-[#3A738D] mb-1.5 tracking-tight">
                  {card.value}
                </div>
                <p className="text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] leading-snug max-w-[160px]">
                  {card.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
