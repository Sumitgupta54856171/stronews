import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Ambient3DScene from "@/components/news/ambient-3d-scene";
import Providers from "@/components/providers";
import NewsHeader from "@/components/news/news-header";
import SiteFooter from "@/components/news/site-footer";
import { trends } from "@/lib/news/data";
import { SITE_URL } from "@/lib/site-config";
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
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  title: {
    default: "Stronews | Latest News, Technology, Finance and India",
    template: "%s | Stronews",
  },
  description:
    "Discover the latest India news, technology, business, finance, markets, sports, and entertainment updates with clear explainers and concise briefs.",
  applicationName: "Stronews",
  icons: {
    icon: [{ url: "/stronews-icon.png?v=2", type: "image/png", sizes: "256x256" }],
    shortcut: "/stronews-icon.png?v=2",
    apple: "/stronews-icon.png?v=2",
  },
  verification: {
    google: "YLKsFNaBIJdtuL8iX8kGGfkf5yQJN9ThYfyZThZnpcI",
  },
  keywords: [
    "India news",
    "latest news",
    "technology news",
    "business news",
    "personal finance",
    "stock market news",
    "sports news",
    "entertainment news",
  ],
  openGraph: {
    type: "website",
    siteName: "Stronews",
    locale: "en_IN",
    title: "Stronews | Latest News, Technology, Finance and India",
    description:
      "Discover the latest India news, technology, business, finance, markets, sports, and entertainment updates.",
    url: `${SITE_URL}/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Stronews | Latest News, Technology, Finance and India",
    description:
      "Discover the latest India news, technology, business, finance, markets, sports, and entertainment updates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="3807e1be7bd40e8cddad3fc27633914644d0f3bb"
        />
      </head>
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
