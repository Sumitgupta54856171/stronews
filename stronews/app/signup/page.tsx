import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create an account",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
