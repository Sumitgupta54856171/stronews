import type { Metadata } from "next";
import NativeBannerAd from "@/components/ads/native-banner-ad";
import FixedAadsBanner from "@/components/ads/fixed-aads-banner";
import NewsDashboard from "@/components/news/news-dashboard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <NativeBannerAd />
      <NewsDashboard />
      <FixedAadsBanner />
    </>
  );
}
