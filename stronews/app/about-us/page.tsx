import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Eye, Scale, ShieldCheck } from "lucide-react";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Stronews, an independent digital news and information platform.",
  alternates: { canonical: "/about-us" },
};

const principles = [
  {
    icon: Eye,
    title: "Clear and accountable",
    text: "We aim to distinguish reporting from opinion, provide useful context and correct material errors when they are brought to our attention.",
  },
  {
    icon: Scale,
    title: "Independent by design",
    text: "Editorial decisions are made independently and are not for sale to commercial partners.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible publishing",
    text: "We aim to respect privacy, avoid unnecessary harm and identify sponsored, illustrative, archival or AI-generated material when relevant.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-9 sm:px-7 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 transition hover:text-emerald-900"
      >
        <ArrowLeft className="size-3.5" /> Back to Stronews
      </Link>

      <section className="mt-8 grid gap-10 border-b border-[#dedbd2] pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            About Stronews
          </p>
          <h1 className="font-editorial mt-3 max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            Useful information, easier to discover.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
            Stronews is an independent digital news and information platform. Our aim is to make
            useful, relevant and understandable information easier to discover.
          </p>
          <a
            href={SITE_URL}
            className="mt-5 inline-flex text-sm font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-4"
          >
            {SITE_URL.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <div className="rounded-2xl bg-[#171918] p-6 text-[#eeeee9] sm:p-7">
          <Compass className="size-6 text-emerald-300" />
          <p className="font-editorial mt-5 text-2xl leading-snug">
            Context matters. So does getting the story right.
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-300">
            Stronews may publish news, explainers, analysis and updates across topics of public
            interest as the platform develops.
          </p>
        </div>
      </section>

      <section className="py-11">
        <h2 className="font-editorial text-3xl">What we cover</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#4e524f]">
          Coverage may include general news, business, technology, finance, sports, entertainment,
          education and other topics of public interest. The mix may change as the website evolves.
        </p>
      </section>

      <section className="grid gap-4 border-t border-[#dedbd2] py-11 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-xl border border-[#e2dfd7] bg-white p-5 shadow-sm">
            <Icon className="size-5 text-emerald-800" />
            <h3 className="mt-4 font-semibold text-[#242724]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 border-t border-[#dedbd2] py-11 lg:grid-cols-2">
        <div>
          <h2 className="font-editorial text-3xl">Who we serve</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#4e524f]">
            Our content is intended for readers who want accessible information and context.
            Articles are provided for general information and should not be treated as personalised
            financial, legal, medical or other professional advice.
          </p>
        </div>
        <div>
          <h2 className="font-editorial text-3xl">Independence and transparency</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#4e524f]">
            Stronews currently has no third-party advertising providers or affiliate links enabled.
            If that changes, any paid or commercially influenced content will be identified clearly
            and will not determine editorial conclusions.
          </p>
        </div>
      </section>

      <section className="border-t border-[#dedbd2] py-11">
        <h2 className="font-editorial text-3xl">Contact</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#4e524f]">
          For editorial questions, corrections, feedback or business enquiries, please use the
          details on our Contact Us page.
        </p>
        <Link
          href="/contact-us"
          className="mt-5 inline-flex rounded-lg bg-[#176f58] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#125943]"
        >
          Contact Stronews
        </Link>
      </section>
    </main>
  );
}
