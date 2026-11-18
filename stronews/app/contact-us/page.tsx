import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageSquareText, MapPin, Clock } from "lucide-react";
import ContactDetails from "@/components/legal/contact-details";
import ContactForm from "@/components/legal/contact-form";
import { SITE_URL, siteContact, siteOrganization } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Stronews editorial desk, corrections team, advertising partners, and press office.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-9 sm:px-7 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 transition hover:text-emerald-900"
      >
        <ArrowLeft className="size-3.5" /> Back to Stronews
      </Link>

      <header className="mt-8 max-w-3xl border-b border-[#dedbd2] pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
          Get in touch with {siteOrganization.name}
        </p>
        <h1 className="font-editorial mt-3 text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Contact Our Newsroom
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          We welcome reader questions, editorial tips, correction requests, and commercial
          enquiries. Our editorial team reviews incoming messages daily.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-emerald-800" /> New Delhi, India
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-emerald-800" /> Response window: 24–48 hours
          </span>
          <span>•</span>
          <a
            href={SITE_URL}
            className="inline-flex items-center gap-1 text-emerald-800 underline decoration-emerald-300 underline-offset-4"
          >
            {SITE_URL.replace(/^https?:\/\//, "")} <ExternalLink className="size-3" />
          </a>
        </div>
      </header>

      {/* Direct Contact Channels */}
      <div className="mt-9 grid gap-4 md:grid-cols-2">
        <ContactDetails email={siteContact.general}>
          <p>For general inquiries, reader feedback, and site assistance.</p>
        </ContactDetails>
        <ContactDetails email={siteContact.editorial}>
          <p>For editorial tips, article corrections, and press releases.</p>
        </ContactDetails>
        <ContactDetails email={siteContact.business}>
          <p>For advertising inquiries, Google AdSense partnerships, and sponsorships.</p>
        </ContactDetails>
        <ContactDetails email={siteContact.privacy}>
          <p>For data protection, CCPA/GDPR requests, and privacy questions.</p>
        </ContactDetails>
      </div>

      {/* Interactive Contact Form */}
      <section className="mt-12 border-t border-[#dedbd2] pt-10">
        <div className="mb-6 max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
            Direct Message
          </p>
          <h2 className="font-editorial mt-1 text-3xl">Send Us a Message</h2>
          <p className="mt-2 text-sm text-stone-600">
            Fill out the form below and our desk will route your message to the appropriate editor or department.
          </p>
        </div>
        <ContactForm />
      </section>

      {/* Guidelines */}
      <div className="mt-12 grid gap-8 border-t border-[#dedbd2] pt-10 lg:grid-cols-2">
        <section className="rounded-xl border border-[#dedbd2] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <MessageSquareText className="size-5" />
            <h2 className="font-editorial text-2xl text-[#1f221f]">
              Corrections & Fact-Checking
            </h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#555956]">
            We are dedicated to accuracy. When reporting an error, please include the exact article
            URL, the sentence or data point in question, supporting documentation, and your contact
            details so we can verify the claim.
          </p>
        </section>

        <section className="rounded-xl border border-[#dedbd2] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <ExternalLink className="size-5" />
            <h2 className="font-editorial text-2xl text-[#1f221f]">
              Advertising & Commercial Policies
            </h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#555956]">
            All advertising units are managed in strict adherence to Google AdSense Publisher
            Policies and industry ethics. Editorial coverage is completely distinct from
            advertising agreements.
          </p>
        </section>
      </div>
    </main>
  );
}
