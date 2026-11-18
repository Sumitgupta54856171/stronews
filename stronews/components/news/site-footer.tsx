import Image from "next/image";
import Link from "next/link";
import { NEWS_CATEGORY_ROUTES } from "@/lib/news/category-routes";

const legalLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[#dedbd2] bg-[#f2f0ea] px-4 py-10 text-stone-600 sm:px-7">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Grid */}
        <div className="grid gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/stronews-logo.png"
                alt="Stronews"
                width={2048}
                height={2048}
                className="h-8 w-28 rounded-sm object-cover object-center"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Digital Journalism
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-stone-500">
              Stronews is an independent newsroom delivering contextual journalism, policy explainers,
              market data, and technology updates across India and the globe.
            </p>
            <p className="text-[11px] text-stone-400">
              Published from New Delhi, India. Supported by policy-compliant advertising.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171918]">
              News Categories
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              {NEWS_CATEGORY_ROUTES.map((route) => (
                <li key={route.slug}>
                  <Link
                    href={`/${route.slug}`}
                    className="transition hover:text-emerald-900 hover:underline"
                  >
                    {route.category}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/briefs" className="transition hover:text-emerald-900 hover:underline">
                  Quick Briefs
                </Link>
              </li>
              <li>
                <Link href="/trends" className="transition hover:text-emerald-900 hover:underline">
                  Trending Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171918]">
              Standards & Legal
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-emerald-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/games" className="transition hover:text-emerald-900 hover:underline">
                  Games & Puzzles
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Advertising Transparency Notice */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#dedbd2] pt-6 text-[11px] text-stone-400 sm:flex-row">
          <p>© 2026 Stronews Digital Media. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Advertisements on this site are served by third-party advertising networks.
          </p>
        </div>
      </div>
    </footer>
  );
}
