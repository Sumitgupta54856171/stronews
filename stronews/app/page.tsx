import type { Metadata } from "next";
import BauvalAdSlot from "@/components/ads/bauval-ad-slot";
import FixedAadsBanner from "@/components/ads/fixed-aads-banner";
import NewsDashboard from "@/components/news/news-dashboard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <BauvalAdSlot />
      <NewsDashboard />
      <FixedAadsBanner />
    </>
  );
}
