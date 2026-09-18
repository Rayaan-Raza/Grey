const values = [
  {
    number: "01",
    title: "Ilm: Commitment to Knowledge",
    body: "We foster continuous learning, encouraging dentists to understand the “why” behind every procedure through clinical reasoning and the latest research.",
  },
  {
    number: "02",
    title: "Ihsan: Excellence in Skill & Patient Care",
    body: "We strive for meticulous clinical work, precise procedures, clear communication, and treatment plans that put the patient first.",
  },
  {
    number: "03",
    title: "Evidence-Based Clinical Practice",
    body: "Our protocols are grounded in peer-reviewed research and validated by years of clinical outcomes.",
  },
  {
    number: "04",
    title: "Accessibility",
    body: "We make high-quality, hands-on training accessible to every dentist, from fresh graduates to experienced general and specialist practitioners.",
  },
  {
    number: "05",
    title: "Integrity in Education",
    body: "We set realistic expectations from Day 1, providing a clear roadmap of what can be started independently after a course and what requires further mentorship.",
  },
  {
    number: "06",
    title: "Community & Peer Learning",
    body: "We foster mentorship and impact through experienced instructors and peer learning, helping dentists navigate challenges together.",
  },
];

export default function OurValues() {
  return (
    <section
      id="values"
      className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-greyBg py-16 sm:py-20 md:py-28 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full min-w-0 flex flex-col">
        <div className="bg-white border border-gray-200/80 px-5 py-2 rounded-full mb-6 inline-flex self-start shadow-sm">
          <span className="text-[12px] font-semi_bold_24pt tracking-[0.14em] text-darkBlueText uppercase">
            Our Values
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semi_bold_24pt text-darkBlueText leading-[1.15] tracking-tight mb-4 max-w-3xl">
          Guided by Knowledge, Excellence &amp; Integrity
        </h2>
        <p className="text-[#777779] font-regular_18pt text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed mb-10 sm:mb-12 max-w-2xl">
          Our values shape how we approach clinical education, patient care, and
          professional growth.
        </p>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 sm:gap-5 w-full min-w-0">
          {values.map((value) => (
            <article
              key={value.number}
              className="flex flex-col min-w-0 w-full md:w-[calc(50%-0.625rem)] bg-white border border-[#D5DEE2] border-l-[4px] border-l-[#5ECAA0] rounded-[16px] p-5 sm:p-6 shadow-[0_4px_16px_rgba(58,115,141,0.04)]"
            >
              <p className="text-[#3A738D] font-inter-medium_18pt text-[12px] sm:text-[13px] tracking-wide uppercase mb-2">
                Value {value.number}
              </p>
              <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-2.5">
                {value.title}
              </h3>
              <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] leading-relaxed">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
