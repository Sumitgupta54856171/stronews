import type { Metadata } from "next";
import FixedAadsBanner from "@/components/ads/fixed-aads-banner";
import HomePopunderAd from "@/components/ads/home-popunder-ad";
import NewsDashboard from "@/components/news/news-dashboard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomePopunderAd />
      <NewsDashboard />
      <FixedAadsBanner />
    </>
  );
}
