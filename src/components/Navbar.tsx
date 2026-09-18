"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { href: "/about", label: "About us" },
  { href: "/education", label: "Dental Education" },
  { href: "/community", label: "Community" },
  { href: "/resources", label: "Resources" },
  { href: "/instructors", label: "Instructors" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-whiteBg border-b border-border relative z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4">
        <div onClick={() => setOpen(false)}>
          <BrandLogo height={44} priority />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 font-inter-medium_18pt text-blueText text-[15px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-black transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 font-inter-medium_18pt text-[15px]">
            <motion.div whileHover="hover" className="inline-block">
              <Link
                href="/courses"
                className="bg-greenBg text-black px-5 py-2.5 rounded font-medium flex items-center gap-2 hover:bg-[#7ED9B5] transition-colors"
              >
                <span>Enroll now</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
            <Link
              href="/login"
              className="text-blueText hover:text-black transition-colors whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-blueText hover:text-black transition-colors whitespace-nowrap"
            >
              Sign up
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-blueText border border-border"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-border bg-whiteBg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter-medium_18pt text-blueText text-[15px] py-3 border-b border-border/60 hover:text-black transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 pb-2">
                <Link
                  href="/courses"
                  className="bg-greenBg text-black px-5 py-3 rounded font-medium inline-flex items-center justify-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  Enroll now
                </Link>
                <Link
                  href="/login"
                  className="font-inter-medium_18pt text-blueText text-[15px] py-3 text-center hover:text-black transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="font-inter-medium_18pt text-blueText text-[15px] py-3 text-center hover:text-black transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
