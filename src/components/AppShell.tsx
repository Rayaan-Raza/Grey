"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard =
    pathname.startsWith("/student-dashboard") ||
    pathname.startsWith("/admin-dashboard");
  const isAuth =
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/signup/") ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/forgot-password/");

  if (isDashboard) {
    return (
      <div className="h-dvh w-full min-w-0 overflow-hidden bg-[#F4F7F8]">
        {children}
      </div>
    );
  }

  if (isAuth) {
    return (
      <div className="min-h-dvh w-full min-w-0 overflow-x-hidden bg-white">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto w-full min-w-0 flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
