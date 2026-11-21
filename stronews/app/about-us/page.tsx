import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Eye, Scale, ShieldCheck, Newspaper, Award, Users } from "lucide-react";
import { SITE_URL, siteOrganization } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Stronews, an independent digital news organization delivering contextual journalism across India, technology, markets, policy, and sports.",
  alternates: { canonical: "/about-us" },
};

const principles = [
  {
    icon: Eye,
    title: "Accurate & Accountable",
    text: "We prioritize factual accuracy, verified primary sources, and clear context. When an error occurs, we correct it transparently and promptly.",
  },
  {
    icon: Scale,
    title: "Independent Journalism",
    text: "Editorial decisions are strictly independent. Commercial sponsors and advertising networks never dictate our reporting, angles, or conclusions.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Publishing",
    text: "We adhere to ethical journalism standards, respect individual privacy, and clearly distinguish between breaking news, analysis, and opinion.",
  },
];

const teamMembers = [
  {
    name: "Siddharth Verma",
    role: "Senior Infrastructure & Policy Editor",
    bio: "Covers public infrastructure, railways, transport networks, and urban governance with over a decade of industry reporting experience.",
  },
  {
    name: "Ananya Krishnan",
    role: "AI & DeepTech Correspondent",
    bio: "Focuses on artificial intelligence research, semiconductor supply chains, startup ecosystems, and cloud compute developments.",
  },
  {
    name: "Vikram Sengupta",
    role: "Financial Markets & Banking Analyst",
    bio: "Reports on Reserve Bank of India policy, macro-economic indicators, fintech innovation, and debt markets.",
  },
  {
    name: "Rohan Kulkarni",
    role: "Sports Desk Lead",
    bio: "Specializes in Indian cricket analytics, tournament strategy, Olympic sports development, and youth athlete pathways.",
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
            About {siteOrganization.name}
          </p>
          <h1 className="font-editorial mt-3 max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            Independent journalism, contextual insights.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
            {siteOrganization.name} is an independent digital news and information platform
            committed to delivering verified, in-depth, and accessible reporting across India,
            technology, markets, policy, cricket, and contemporary culture.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500">
            <span>Published from New Delhi, India</span>
            <span>•</span>
            <a
              href={SITE_URL}
              className="text-emerald-800 underline decoration-emerald-300 underline-offset-4"
            >
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>
        <div className="rounded-2xl bg-[#171918] p-6 text-[#eeeee9] sm:p-7">
          <Compass className="size-6 text-emerald-300" />
          <p className="font-editorial mt-5 text-2xl leading-snug">
            Context matters. Accuracy is non-negotiable.
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-300">
            In an era of rapid headlines and algorithmic noise, Stronews provides structured
            breakdowns, objective analysis, and verified facts to help readers understand the world
            around them.
          </p>
        </div>
      </section>

      <section className="py-11">
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
            Our Mission
          </p>
          <h2 className="font-editorial mt-2 text-3xl">Informing with clarity and depth</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#4e524f]">
            Our newsroom produces original reporting, deep explainers, and policy analysis. We
            believe good digital journalism should be clear without being superficial, fast without
            sacrificing verification, and accessible to everyone.
          </p>
        </div>
      </section>

      <section className="grid gap-4 border-t border-[#dedbd2] py-11 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-xl border border-[#e2dfd7] bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <Icon className="size-5 text-emerald-800" />
            <h3 className="mt-4 font-semibold text-[#242724]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
          </article>
        ))}
      </section>

      <section className="border-t border-[#dedbd2] py-11">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
            The Newsroom
          </p>
          <h2 className="font-editorial mt-2 text-3xl">Editorial Team & Contributors</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Our team brings together experienced journalists, domain analysts, and researchers
            dedicated to impartial coverage.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-[#e2dfd7] bg-white p-5 shadow-sm"
            >
              <div className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-800">
                <Users className="size-5" />
              </div>
              <h3 className="mt-3 font-semibold text-[#1f221f]">{member.name}</h3>
              <p className="text-xs font-medium text-emerald-800">{member.role}</p>
              <p className="mt-2 text-xs leading-5 text-stone-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-t border-[#dedbd2] py-11 lg:grid-cols-2">
        <div className="rounded-xl border border-[#e2dfd7] bg-white p-6 shadow-sm">
          <Award className="size-6 text-emerald-800" />
          <h2 className="font-editorial mt-4 text-2xl">Editorial Standards & Fact-Checking</h2>
          <p className="mt-3 text-[14px] leading-6 text-[#4e524f]">
            Every article undergoes editorial review for source corroboration, factual integrity,
            and balanced perspective. We consult primary official data, verified scientific
            publications, government gazettes, and industry experts before publishing.
          </p>
          <Link
            href="/editorial-policy"
            className="mt-4 inline-flex text-xs font-semibold text-emerald-800 underline underline-offset-4"
          >
            Read our full Editorial Policy →
          </Link>
        </div>

        <div className="rounded-xl border border-[#e2dfd7] bg-white p-6 shadow-sm">
          <Newspaper className="size-6 text-emerald-800" />
          <h2 className="font-editorial mt-4 text-2xl">Advertising & Commercial Policy</h2>
          <p className="mt-3 text-[14px] leading-6 text-[#4e524f]">
            Stronews sustains its journalism through digital advertising from third-party networks.
            We maintain strict separation between advertising sales and editorial coverage.
            Advertisements are clearly marked as &quot;Advertisement&quot; or &quot;Sponsored&quot;
            and do not determine or alter our editorial stance.
          </p>
          <Link
            href="/terms-and-conditions"
            className="mt-4 inline-flex text-xs font-semibold text-emerald-800 underline underline-offset-4"
          >
            Review Advertising Terms →
          </Link>
        </div>
      </section>

      <section className="border-t border-[#dedbd2] py-11">
        <h2 className="font-editorial text-3xl">Get in touch</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#4e524f]">
          We welcome reader inquiries, corrections, story tips, and commercial feedback. Our
          editorial and operational desks are available directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact-us"
            className="inline-flex rounded-lg bg-[#176f58] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#125943]"
          >
            Contact Stronews
          </Link>
          <Link
            href="/editorial-policy"
            className="inline-flex rounded-lg border border-[#dedbd2] bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Editorial Policy
          </Link>
        </div>
      </section>
    </main>
  );
}
