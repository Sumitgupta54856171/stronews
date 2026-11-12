import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DailySpinWheel from "@/components/rewards/daily-spin-wheel";
import { REWARDS_ENABLED } from "@/lib/rewards/feature";

export const metadata: Metadata = {
  title: "Daily Spin",
  description: "Spin once each day for a chance to earn 1–8 Stronews coins.",
  alternates: { canonical: "/spin" },
  robots: { index: false, follow: false },
};

export default function SpinPage() {
  if (!REWARDS_ENABLED) notFound();
  return <DailySpinWheel />;
}
