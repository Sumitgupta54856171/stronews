import type { Metadata } from "next";
import DataViewRoute from "@/components/news/data-view-route";

export const metadata: Metadata = {
  title: "News Briefs",
  description: "Catch up on the latest news with concise, clear news briefs from Stronews.",
  alternates: { canonical: "/briefs" },
};

export default function BriefsPage() {
  return <DataViewRoute view="briefs" />;
}