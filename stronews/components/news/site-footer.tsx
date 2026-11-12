import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/games", label: "Games" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-[#dedbd2] bg-[#f2f0ea] px-4 py-8 text-[10px] text-stone-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/stronews-logo.png"
            alt="Stronews"
            width={2048}
            height={2048}
            className="h-8 w-28 rounded-sm object-cover object-center"
          />
          <p>Independent reading, informed by what matters now.</p>
        </div>
        <nav aria-label="Legal and company pages" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-emerald-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
