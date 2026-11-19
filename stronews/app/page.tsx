import type { Metadata } from "next";
import BauvalBannerAd from "@/components/ads/bauval-banner-ad";
import FixedAadsBanner from "@/components/ads/fixed-aads-banner";
import NewsDashboard from "@/components/news/news-dashboard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <BauvalBannerAd />
      <NewsDashboard />
      <FixedAadsBanner />
    </>
  );
}
