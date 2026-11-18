import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Ambient3DScene from "@/components/news/ambient-3d-scene";
import Providers from "@/components/providers";
import NewsHeader from "@/components/news/news-header";
import SiteFooter from "@/components/news/site-footer";
import CookieConsent from "@/components/legal/cookie-consent";
import { trends } from "@/lib/news/data";
import { SITE_URL, ADSENSE_CLIENT_ID, siteOrganization } from "@/lib/site-config";
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
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: siteOrganization.name,
        legalName: siteOrganization.legalName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/stronews-logo.png`,
          width: 512,
          height: 512,
        },
        description: siteOrganization.description,
        publishingPrinciples: `${SITE_URL}/editorial-policy`,
        ethicsPolicy: `${SITE_URL}/editorial-policy`,
        correctionsPolicy: `${SITE_URL}/editorial-policy`,
        diversityPolicy: `${SITE_URL}/editorial-policy`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: siteOrganization.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

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
        <meta name="coinzilla" content="7321c80fa6e33cdf1cfff09ecfd9c39c" />
        <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        {/* Google AdSense automated ad script */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              <CookieConsent />
            </Providers>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
