import Image from "next/image";

const bridges = [
  {
    number: "01",
    title: "The Student Gap",
    subtitle: "From Academic Theory to Clinical Mastery",
    gap: "Top dental colleges prioritize theory over repetitive hands-on clinical execution, resulting in a mean clinical skills score of just 30.56/100 across 27 colleges in Pakistan (National Study, 2023). Graduates enter the workforce without a structured bridge to clinical competence.",
    solution:
      'We combine digital-first learning with high-yield, and rigorous assessments in our Courses and Workshops and practice. By mastering the core clinical reasoning and "why" behind every procedure online first, students maximize their time during hands-on training and assessments—building muscle memory, clinical confidence, and measured competence rather than just collecting certificates.',
  },
  {
    number: "02",
    title: "The Graduate Gap",
    subtitle: "From Treatment Hesitation to Clinical Confidence",
    gap: "Clinical anxiety and uncertainty around complex procedures can prevent dentists from treating with confidence.",
    solution:
      "We train problem-solvers through practical modules, complication management, and clinical decision-making.",
  },
  {
    number: "03",
    title: "The Education Market Gap",
    subtitle: "Accessible, Localized Excellence",
    gap: "Many international CPD programs are costly and designed for different clinical settings, while structured local options remain limited.",
    solution:
      "We combine accessible online education with standardized, locally relevant hands-on training.",
  },
  {
    number: "04",
    title: "The Instructor Gap",
    subtitle: "From Personal Opinions to Standardized Outcomes",
    gap: "Traditional workshops can rely on personal preferences without clear learning outcomes or measurable evaluation.",
    solution:
      "Research-based curricula, measurable competencies, and transparent learning outcomes create meaningful clinical progress.",
  },
  {
    number: "05",
    title: "The Evidence Gap",
    subtitle: "Translating Research into Chairside Practice",
    gap: "Complex research and outdated clinical methods can make it difficult to apply current evidence in everyday practice.",
    solution:
      "We turn research into practical chairside tools, clinical handbooks, textbooks, and procedure resources.",
  },
  {
    number: "06",
    title: "The Documentation & Soft Skills Gap",
    subtitle: "Elevating Professional Standards",
    gap: "Limited training in documentation, communication, informed consent, and patient management can affect professional practice.",
    solution:
      "We provide practical templates, documentation protocols, and soft-skills training for better patient care and professional integrity.",
  },
  {
    number: "07",
    title: "The Psychological Safety Gap",
    subtitle: "From Professional Isolation to Community",
    gap: "Dentists often lack a safe space to discuss complications, ask questions, and learn from clinical challenges.",
    solution:
      "We create judgment-free forums for case discussion, peer learning, reflection, and mentorship.",
  },
  {
    number: "08",
    title: "The Job & Career Gap",
    subtitle: "Building Sustainable Skill Pathways",
    gap: "Many graduates lack guidance on developing specialized skills and building sustainable career pathways.",
    solution:
      "We provide continuous mentorship and growth opportunities that extend beyond the classroom.",
  },
];

export default function OurApproach() {
  return (
    <section
      id="our-approach"
      className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-white py-16 sm:py-20 md:py-28 overflow-x-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full min-w-0 flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16">
          <div className="bg-white border border-[#D5DEE2] px-5 py-2 rounded-full mb-5 sm:mb-6 inline-flex shadow-sm">
            <span className="text-[11px] sm:text-[12px] font-semi_bold_24pt tracking-[0.14em] text-[#3A738D] uppercase">
              OUR APPROACH
            </span>
          </div>

          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-[44px] font-semi_bold_24pt text-[#3A738D] leading-[1.15] tracking-tight mb-5 sm:mb-6 max-w-4xl">
            Identifying the Greys and Providing Solutions
          </h2>
        </div>

        {/* Intro + image */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 sm:gap-10 lg:gap-14 mb-12 sm:mb-16 md:mb-20 w-full min-w-0">
          <div className="flex flex-col flex-1 min-w-0 gap-5 sm:gap-6">
            <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
              Through years of clinical practice, we noticed consistent gaps that
              prevent dentists from growing after attending advanced courses. This
              is because most programs focus heavily on theory and textbook
              protocols, but offer little guidance on case selection, patient
              communication, or managing complications when a real case walks into
              the clinic. The gaps create a cycle where dentists attend courses but
              still hesitate to start complex cases in their own practice.
            </p>

            <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
              <span className="text-[#3A738D] font-semi_bold_24pt">
                What are the Greys?
              </span>{" "}
              We define greys as problem areas that are not clear, and therefore,
              they are problems we continue to face in dentistry. They include the
              gaps in learning and clinical practice as well as the gaps in
              opportunities and growth in the field. We are based in Pakistan and
              therefore address unique problems faced by the diaspora of dentists
              in Pakistan and around first but our approach remains global in
              solving them as we believe we are all one big community.
            </p>

            <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
              All the greys or problems areas are challenges we have taken on and
              we envision doing something about them and providing solutions.
            </p>
          </div>

          <div className="relative w-full lg:w-[42%] lg:flex-shrink-0 min-w-0 min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_12px_32px_rgba(58,115,141,0.1)] border border-[#D5DEE2] bg-[#F4F7F8]">
            <Image
              src="/about-us/our-approach-icons/our-approach-image.jpg"
              alt="Identifying the Greys and providing solutions"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Eight bridges */}
        <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 w-full min-w-0 mb-12 sm:mb-16 md:mb-20">
          {bridges.map((bridge) => (
            <article
              key={bridge.number}
              className="flex flex-col w-full min-w-0 bg-[#F4F7F8] border border-[#D5DEE2] border-l-[4px] border-l-[#5ECAA0] rounded-[16px] sm:rounded-[20px] p-5 sm:p-7 md:p-8 shadow-[0_4px_20px_rgba(58,115,141,0.05)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 mb-5 sm:mb-6">
                <span className="text-[#5ECAA0] font-semi_bold_24pt text-[28px] sm:text-[32px] leading-none tracking-tight flex-shrink-0">
                  {bridge.number}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[#3A738D] font-semi_bold_24pt text-[18px] sm:text-[20px] md:text-[22px] leading-snug tracking-tight">
                    {bridge.title}
                  </h3>
                  <p className="text-[#777779] font-regular_18pt text-[14px] sm:text-[15px] mt-1.5">
                    {bridge.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 w-full min-w-0">
                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="text-[#3A738D] font-semi_bold_24pt text-[13px] sm:text-[14px] tracking-[0.08em] uppercase mb-2 sm:mb-2.5">
                    The Gap
                  </h4>
                  <p className="text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
                    {bridge.gap}
                  </p>
                </div>

                <div className="hidden lg:block w-px self-stretch bg-[#D5DEE2] flex-shrink-0" aria-hidden="true" />

                <div className="flex flex-col flex-1 min-w-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#D5DEE2]">
                  <h4 className="text-[#5ECAA0] font-semi_bold_24pt text-[13px] sm:text-[14px] tracking-[0.04em] mb-2 sm:mb-2.5">
                    Our Solution
                  </h4>
                  <p className="text-[#777779] font-regular_18pt text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
                    {bridge.solution}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Ihsan philosophy */}
        <div className="w-full min-w-0 bg-[#3A738D] rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14 shadow-[0_12px_40px_rgba(58,115,141,0.18)]">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/25 mb-5 sm:mb-6">
            <span className="text-[11px] sm:text-[12px] font-semi_bold_24pt tracking-[0.14em] text-[#5ECAA0] uppercase">
              Core Philosophy
            </span>
          </div>

          <h3 className="text-white font-semi_bold_24pt text-[24px] sm:text-[28px] md:text-[32px] leading-tight tracking-tight mb-4 sm:mb-5">
            The Core Philosophy of Our Approach: Ihsan
          </h3>

          <p className="text-white/85 font-regular_18pt text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-4xl">
            Ihsan means striving for excellence in the smallest details. We train
            you to deliver meticulous clinical work with genuine care—precise
            procedures, clear communication, and treatment plans that put the
            patient first. Our founder derives inspiration from Ihsan as it brings
            deeper meaning to the practice of excellence in the Islamic tradition.
            It constitutes divine awareness: to do anything as if we see Allah,
            and if one cannot see Him then know that He sees us.
          </p>
        </div>
      </div>
    </section>
  );
}
