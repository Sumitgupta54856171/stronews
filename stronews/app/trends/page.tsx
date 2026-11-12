import type { Metadata } from "next";
import DataViewRoute from "@/components/news/data-view-route";

export const metadata: Metadata = {
  title: "Trending News",
  description: "Explore the topics and stories trending in India and around the world.",
  alternates: { canonical: "/trends" },
};

export default function TrendsPage() {
  return <DataViewRoute view="trends" />;
}