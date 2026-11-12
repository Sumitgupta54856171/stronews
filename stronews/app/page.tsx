import type { Metadata } from "next";
import NewsDashboard from "@/components/news/news-dashboard";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <NewsDashboard />;
}
