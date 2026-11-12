import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

export type PolicySection = {
  title: string;
  paragraphs: string[];
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  effectiveDate?: string;
  intro: string;
  sections: PolicySection[];
  children?: React.ReactNode;
};

export default function PolicyPage({
  eyebrow,
  title,
  description,
  effectiveDate,
  intro,
  sections,
  children,
}: PolicyPageProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-9 sm:px-7 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 transition hover:text-emerald-900"
      >
        <ArrowLeft className="size-3.5" /> Back to Stronews
      </Link>

      <header className="mt-8 max-w-3xl border-b border-[#dedbd2] pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
          {eyebrow}
        </p>
        <h1 className="font-editorial mt-3 text-4xl leading-[1.08] tracking-tight text-[#171918] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">{description}</p>
        {effectiveDate && (
          <p className="mt-5 flex items-center gap-2 text-xs font-medium text-stone-500">
            <CalendarDays className="size-3.5 text-emerald-700" /> Effective date: {effectiveDate}
          </p>
        )}
      </header>

      <div className="mt-9 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 rounded-xl border border-[#e2dfd7] bg-white/75 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
              On this page
            </p>
            <ol className="mt-3 space-y-1">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    href={`#section-${index + 1}`}
                    className="block rounded-md px-2 py-1.5 text-xs leading-5 text-stone-600 transition hover:bg-[#eef3ef] hover:text-emerald-900"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <p className="text-[15px] leading-7 text-[#343835]">{intro}</p>
          {children}
          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title} className="scroll-mt-28">
                <h2 className="font-editorial text-2xl leading-tight text-[#202320] sm:text-[28px]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[15px] leading-7 text-[#4e524f]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
