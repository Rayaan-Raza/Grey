import Image from "next/image";
import Link from "next/link";

const ASSET = "/Student_Dashboard";
const card =
  "flex flex-col min-w-0 bg-white rounded-[16px] shadow-[0_8px_30px_rgba(47,95,117,0.06)] p-6";

const myCourses = [
  {
    title: "Endodontics Foundation",
    tag: "Remote Learning",
    progress: 70,
    href: "/courses/endodontics-remote",
    image: `${ASSET}/course-thumb.jpg`,
    primary: true,
  },
  {
    title: "Foundations of Endodontics",
    tag: "Immersive Residency",
    progress: 45,
    href: "/courses/endodontics-residency",
    image: "/Course_Details/immersive.jpg",
    primary: false,
  },
];

const activity = [
  {
    who: "Dr. John Smith",
    text: "Started a discussion in Implantology",
    when: "10m ago",
    avatar: `${ASSET}/avatar.png`,
  },
  {
    who: "You",
    text: "Received case feedback on Case 12",
    when: "1h ago",
    avatar: `${ASSET}/avatar.png`,
  },
  {
    who: "Editor Board",
    text: "Invited you to the live Implantology session",
    when: "Yesterday",
    avatar: `${ASSET}/avatar.png`,
  },
];

const quickActions = [
  { label: "Join Community", href: "/student-dashboard/community", icon: `${ASSET}/Icon (28).svg` },
  { label: "Download Certificate", href: "/student-dashboard/certificates", icon: `${ASSET}/Container (9).svg`, boxed: true },
  { label: "Book Workshop", href: "/student-dashboard/workshops", icon: `${ASSET}/Icon (29).svg` },
  { label: "Ask Instructor", href: "/contact", icon: `${ASSET}/Icon (30).svg` },
  { label: "Browse Resources", href: "/student-dashboard/resources", icon: `${ASSET}/book-open.svg` },
  { label: "View Assignments", href: "/student-dashboard/assignments", icon: `${ASSET}/Icon (22).svg` },
];

const weekHours = [
  { day: "Mon", hours: 1.8 },
  { day: "Tue", hours: 2.4 },
  { day: "Wed", hours: 1.2 },
  { day: "Thu", hours: 3.1 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 4.5 },
  { day: "Sun", hours: 3.5 },
];

const achievements = [
  {
    date: "Aug 1",
    title: "Completed Module 5",
    body: "Passed final clinical validation with 95% score.",
  },
  {
    date: "Jul 28",
    title: "Earned Clinical Badge",
    body: "Recognized for micro-surgery case precision.",
  },
  {
    date: "Jul 20",
    title: "Certificate Issued",
    body: "Completed Dental Restoration Track successfully.",
  },
];

export default function StudentDashboardMore() {
  const peakHours = Math.max(...weekHours.map((d) => d.hours));
  const yMax = 8;

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      {/* Top: 2/3 + 1/3 */}
      <div className="flex flex-col xl:flex-row gap-6 w-full min-w-0 xl:items-stretch">
        <section className={`${card} flex-1 xl:flex-[2]`}>
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[18px] sm:text-[20px] leading-none">
              My Courses
            </h2>
            <Link
              href="/student-dashboard/courses"
              className="text-[#777779] hover:text-[#3A738D] font-inter-medium_18pt text-[13px] sm:text-[14px] transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6 flex-1 min-w-0">
            {myCourses.map((course) => (
              <article
                key={course.title}
                className="flex flex-col flex-1 min-w-0"
              >
                <div className="relative w-full h-[140px] rounded-[12px] overflow-hidden bg-[#E8F1F5] flex-shrink-0 mb-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
                <h3 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] leading-snug mb-1.5">
                  {course.title}
                </h3>
                <p className="flex items-center gap-2 text-[#777779] font-regular_18pt text-[13px] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A738D] flex-shrink-0" />
                  {course.tag}
                </p>
                <div className="flex items-center justify-end mb-1.5">
                  <span className="text-[#2F5F75] font-inter-medium_18pt text-[13px]">
                    {course.progress}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#F4F7F8] overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full bg-[#3A738D]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <Link
                  href={course.href}
                  className={`mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-[10px] font-inter-medium_18pt text-[14px] transition-colors ${
                    course.primary
                      ? "bg-[#5ECAA0] hover:bg-[#7ED9B5] text-black"
                      : "bg-white border border-[#2F5F75] text-[#2F5F75] hover:bg-[#2F5F75] hover:text-white"
                  }`}
                >
                  <Image
                    src={`${ASSET}/${encodeURIComponent("Icon (26).svg")}`}
                    alt=""
                    width={12}
                    height={12}
                    className="w-3 h-3"
                  />
                  Continue Learning
                </Link>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <article className={card}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-4">
              Certificates Ready
            </h2>
            <div className="flex items-start gap-3 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E5F8F0] flex-shrink-0">
                <Image
                  src={`${ASSET}/star.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </span>
              <p className="text-[#777779] font-regular_18pt text-[13px] leading-relaxed min-w-0 pt-1">
                “Remote Learning Clinical Endodontics” has been issued.
              </p>
            </div>
            <Link
              href="/student-dashboard/certificates"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#5ECAA0] hover:bg-[#7ED9B5] text-black px-4 py-2.5 rounded-[10px] font-inter-medium_18pt text-[14px] transition-colors"
            >
              Download PDF
            </Link>
          </article>

          <article className={`${card} flex-1`}>
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-5">
              Community Activity
            </h2>
            <ul className="flex flex-col gap-5 w-full min-w-0">
              {activity.map((item) => (
                <li key={item.who + item.when} className="flex items-start gap-3 min-w-0">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                    <span className="text-[#2F5F75] font-semi_bold_24pt text-[13px] leading-snug">
                      {item.who}
                    </span>
                    <span className="text-[#777779] font-regular_18pt text-[13px] leading-snug truncate">
                      {item.text}
                    </span>
                  </div>
                  <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0 pt-0.5">
                    {item.when}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      {/* Bottom: 3 equal columns */}
      <div className="flex flex-col lg:flex-row gap-6 w-full min-w-0 lg:items-stretch">
        <section className={`${card} flex-1`}>
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-5">
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full min-w-0">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center justify-center text-center min-w-0 w-full sm:w-[calc(33.333%-0.5rem)] bg-[#F4F7F8] border border-[#D5DEE2] rounded-[12px] px-2 py-4 hover:bg-[#E8F1F5] transition-colors"
              >
                {action.boxed ? (
                  <Image
                    src={action.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 mb-2"
                  />
                ) : (
                  <span className="flex items-center justify-center w-8 h-8 rounded-[4px] bg-[#F3F4F6] mb-2">
                    <Image
                      src={action.icon}
                      alt=""
                      width={15}
                      height={15}
                      className="w-[15px] h-[15px]"
                    />
                  </span>
                )}
                <span className="text-[#2F5F75] font-inter-medium_18pt text-[12px] leading-snug">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${card} flex-1`}>
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug">
              Learning Activity
            </h2>
            <Link
              href="/student-dashboard/progress"
              className="text-[#3A738D] hover:text-[#2F5F75] font-inter-medium_18pt text-[12px] sm:text-[13px] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="flex gap-2 h-[148px] w-full min-w-0 mb-5">
            <div className="flex flex-col justify-between py-0.5 pr-1 flex-shrink-0 h-[calc(100%-22px)]">
              {[8, 6, 4, 2, 0].map((n) => (
                <span
                  key={n}
                  className="text-[#777779] font-regular_18pt text-[10px] leading-none"
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="flex items-end gap-2 flex-1 min-w-0 h-full">
              {weekHours.map((d) => {
                const isPeak = d.hours === peakHours;
                return (
                  <div
                    key={d.day}
                    className="flex flex-col items-center justify-end flex-1 min-w-0 h-full gap-2"
                  >
                    <span
                      className={`w-full max-w-[22px] rounded-t-[6px] ${
                        isPeak ? "bg-[#5A8FA5]" : "bg-[#E9EDF2]"
                      }`}
                      style={{ height: `${(d.hours / yMax) * 100}%` }}
                      title={`${d.hours}h`}
                    />
                    <span className="text-[#777779] font-regular_18pt text-[11px]">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#D5DEE2] mt-auto">
            <span className="inline-flex items-center gap-2 text-[#777779] font-regular_18pt text-[12px]">
              <span className="w-2 h-2 rounded-full bg-[#5A8FA5] flex-shrink-0" />
              Peak: Sat 4.5h
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#2F5F75] font-inter-medium_18pt text-[13px]">
              <Image
                src={`${ASSET}/bar-chart-3.svg`}
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5 opacity-70"
              />
              18.5h total
            </span>
          </div>
        </section>

        <section className={`${card} flex-1`}>
          <h2 className="text-[#2F5F75] font-semi_bold_24pt text-[16px] sm:text-[17px] leading-snug mb-5">
            Recent Achievements
          </h2>
          <ul className="flex flex-col gap-5 w-full min-w-0">
            {achievements.map((item) => (
              <li key={item.title} className="flex items-start gap-3 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#3A738D] flex-shrink-0 mt-1.5" />
                <div className="flex flex-col flex-1 min-w-0 gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[#2F5F75] font-semi_bold_24pt text-[14px] leading-snug min-w-0">
                      {item.title}
                    </span>
                    <span className="text-[#777779] font-regular_18pt text-[12px] flex-shrink-0">
                      {item.date}
                    </span>
                  </div>
                  <span className="text-[#777779] font-regular_18pt text-[12px] leading-relaxed">
                    {item.body}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
