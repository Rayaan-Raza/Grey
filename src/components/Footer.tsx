import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="w-full bg-blueBg pt-14 sm:pt-20 pb-8 border-t border-[#2F5F75]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="flex flex-col min-w-0 lg:flex-[2] lg:pr-8">
            <div className="mb-5 sm:mb-6 w-fit">
              <BrandLogo height={44} className="mix-blend-multiply" />
            </div>
            <p className="text-gray-400 font-regular_18pt text-[15px] leading-relaxed mb-6 sm:mb-8 max-w-sm">
              The future of clinical dental education. Evidence-based, expert-led, practice-focused.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="#" className="w-10 h-10 rounded bg-[#2F5F75] flex items-center justify-center hover:bg-blueBtnBg transition-colors" aria-label="Facebook">
                <Image src="/footer-icons/facebook.svg" alt="" width={16} height={16} className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-[#2F5F75] flex items-center justify-center hover:bg-blueBtnBg transition-colors" aria-label="LinkedIn">
                <Image src="/footer-icons/linkedin.svg" alt="" width={16} height={16} className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-[#2F5F75] flex items-center justify-center hover:bg-blueBtnBg transition-colors" aria-label="Twitter">
                <Image src="/footer-icons/twitter.svg" alt="" width={16} height={16} className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-[#2F5F75] flex items-center justify-center hover:bg-blueBtnBg transition-colors" aria-label="YouTube">
                <Image src="/footer-icons/youtube.svg" alt="" width={16} height={16} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row flex-wrap min-w-0 lg:flex-[3] gap-10 sm:gap-12 lg:gap-8 lg:justify-between">
            <div className="flex flex-col min-w-[140px]">
              <h4 className="text-[15px] font-semi_bold_24pt tracking-[0.1em] text-white uppercase mb-5 sm:mb-6">
                About
              </h4>
              <ul className="flex flex-col gap-3 sm:gap-4">
                <li><Link href="/about#mission" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Our Mission</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Community</Link></li>
                <li><Link href="/instructors" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Instructors</Link></li>
                <li><Link href="/partners" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Partners</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div className="flex flex-col min-w-[140px]">
              <h4 className="text-[15px] font-semi_bold_24pt tracking-[0.1em] text-white uppercase mb-5 sm:mb-6">
                Education
              </h4>
              <ul className="flex flex-col gap-3 sm:gap-4">
                <li><Link href="/education" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Dental Education</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Courses</Link></li>
                <li><Link href="/workshops" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Workshops</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Resources</Link></li>
              </ul>
            </div>

            <div className="flex flex-col min-w-[140px]">
              <h4 className="text-[15px] font-semi_bold_24pt tracking-[0.1em] text-white uppercase mb-5 sm:mb-6">
                Explore
              </h4>
              <ul className="flex flex-col gap-3 sm:gap-4">
                <li><Link href="/courses/endodontics-remote" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Endodontic Track</Link></li>
                <li><Link href="/courses/implants-bootcamp" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Implantology Track</Link></li>
                <li><Link href="/education#pathways" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Certification Programs</Link></li>
                <li><Link href="/instructors#join-faculty" className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors">Join as Instructor</Link></li>
              </ul>
            </div>

            <div className="flex flex-col min-w-[140px]">
              <h4 className="text-[15px] font-semi_bold_24pt tracking-[0.1em] text-white uppercase mb-5 sm:mb-6">
                Legal
              </h4>
              <ul className="flex flex-col gap-3 sm:gap-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-400 hover:text-white text-[15px] font-regular_18pt transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2F5F75] flex flex-col justify-center items-center">
          <p className="text-gray-500 font-regular_18pt text-[14px] text-center">
            © 2026 Grey Dental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
