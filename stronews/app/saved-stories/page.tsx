import type { Metadata } from "next";
import SavedStoriesView from "@/components/news/saved-stories-view";

export const metadata: Metadata = {
  title: "Saved Stories",
  description: "Stories saved privately to your Stronews account.",
  alternates: { canonical: "/saved-stories" },
  robots: { index: false, follow: false },
};

export default function SavedStoriesPage() {
  return <SavedStoriesView />;
}
