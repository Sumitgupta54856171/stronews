import type { Metadata } from "next";
import PublisherUpload from "@/components/news/publisher-upload";

export const metadata: Metadata = {
  title: "Publish a story",
  alternates: { canonical: "/news/upload" },
  robots: { index: false, follow: false },
};

export default function UploadNewsPage() {
  return <PublisherUpload />;
}