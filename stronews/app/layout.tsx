import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Ambient3DScene from "@/components/news/ambient-3d-scene";
import Providers from "@/components/providers";
import NewsHeader from "@/components/news/news-header";
import SiteFooter from "@/components/news/site-footer";
import { trends } from "@/lib/news/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "stronews | Real-time news and trends",
  description: "Breaking stories, sharp briefs, and live search trends.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Ambient3DScene />
        <div className="relative z-10 flex min-h-full flex-col">
          <Suspense fallback={<div className="min-h-screen bg-[#f7f6f2]" />}>
            <Providers>
              <NewsHeader trends={trends} />
              {children}
              <SiteFooter />
            </Providers>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
