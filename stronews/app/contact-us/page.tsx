import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageSquareText } from "lucide-react";
import ContactDetails from "@/components/legal/contact-details";
import { SITE_URL, siteContact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Stronews for general enquiries, editorial feedback, news tips and partnerships.",
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
          Get in touch with Stronews
        </p>
        <h1 className="font-editorial mt-3 text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          We welcome questions, feedback, news tips and correction requests from readers.
        </p>
        <a
          href={SITE_URL}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-4"
        >
          {SITE_URL.replace(/^https?:\/\//, "")} <ExternalLink className="size-3.5" />
        </a>
      </header>

      <div className="mt-9 grid gap-4 md:grid-cols-2">
        <ContactDetails email={siteContact.general}>
          <p>For general questions and enquiries about the website.</p>
        </ContactDetails>
        <ContactDetails email={siteContact.editorial}>
          <p>For correction requests, editorial feedback and news tips.</p>
        </ContactDetails>
        <ContactDetails email={siteContact.business}>
          <p>For advertising, sponsorship and partnership discussions.</p>
        </ContactDetails>
        <div className="rounded-xl border border-[#e2dfd7] bg-[#171918] p-5 text-[#eeeee9]">
          <MessageSquareText className="size-5 text-emerald-300" />
          <h2 className="mt-4 font-semibold">Before you write</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            For corrections, include the article URL, the passage in question, an explanation and,
            where possible, supporting sources.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-10 border-t border-[#dedbd2] pt-10 lg:grid-cols-2">
        <section>
          <h2 className="font-editorial text-2xl">Editorial feedback and corrections</h2>
          <p className="mt-3 text-sm leading-7 text-[#555956]">
            We review correction requests and may update an article when warranted. News tips and
            relevant information are also welcome, but submission does not guarantee publication.
            Please do not send confidential or restricted material unless you are authorised to do
            so.
          </p>
        </section>
        <section>
          <h2 className="font-editorial text-2xl">Advertising and partnerships</h2>
          <p className="mt-3 text-sm leading-7 text-[#555956]">
            Commercial enquiries are handled separately from editorial decisions. We aim to review
            messages within a reasonable time, although response times vary with the nature and
            volume of enquiries.
          </p>
        </section>
      </div>
    </main>
  );
}
