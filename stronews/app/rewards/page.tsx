import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RewardsDashboard from "@/components/rewards/rewards-dashboard";
import { REWARDS_ENABLED } from "@/lib/rewards/feature";

export const metadata: Metadata = {
  title: "Rewards",
  alternates: { canonical: "/rewards" },
  robots: { index: false, follow: false },
};

export default function RewardsPage() {
  if (!REWARDS_ENABLED) notFound();
  return <RewardsDashboard />;
}
