import { Suspense } from "react";
import LoginPage from "@/components/LoginPage";

export const metadata = {
  title: "Log In | Grey Dental",
  description:
    "Log in to Grey Dental to access your dashboard, courses, and clinical files.",
};

export default function LoginRoute() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
