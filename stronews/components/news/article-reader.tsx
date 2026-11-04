"use client";

import { ArrowLeft, Bookmark, Clock3, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SponsoredAdSlot from "@/components/news/sponsored-ad-slot";
import StoryImage from "@/components/news/story-image";
import type { NewsArticle } from "@/lib/news/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleSaved } from "@/lib/store/feed-slice";

export default function ArticleReader({ article }: { article: NewsArticle }) {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((state) => state.feed.savedIds.includes(article.id));
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-7 sm:py-9">
      <Link
        href="/"
        className="mb-5 inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-stone-700 hover:bg-stone-200"
      >
        <ArrowLeft className="size-4" /> Back to feed
      </Link>
      <article>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-sm text-[10px] uppercase tracking-wide">
            {article.category}
          </Badge>
          {article.isBreaking && (
            <Badge className="rounded-sm bg-rose-700 text-[10px] uppercase text-white hover:bg-rose-700">
              Breaking
            </Badge>
          )}
        </div>
        <h1 className="font-editorial max-w-3xl text-4xl leading-[1.03] sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600">{article.subtitle}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-[#dedbd2] py-3">
          <div>
            <p className="text-xs font-semibold">{article.author.name}</p>
            <p className="mt-0.5 text-[10px] text-stone-500">
              {article.publishedAt} <span aria-hidden="true">·</span>{" "}
              {article.viewCount.toLocaleString()} views
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-stone-500">
            <span className="flex items-center gap-1">
              <Clock3 className="size-3" />
              {article.readTime}
            </span>
            <Button size="sm" variant="outline" onClick={() => dispatch(toggleSaved(article.id))}>
              <Bookmark className={isSaved ? "fill-current" : ""} />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
          <p className="mt-2 w-full text-[10px] text-stone-500">
            Reads by device: {article.deviceViews.mobile.toLocaleString()} mobile ·{" "}
            {article.deviceViews.tablet.toLocaleString()} tablet ·{" "}
            {article.deviceViews.desktop.toLocaleString()} desktop
          </p>
        </div>
        <div className="relative mt-5 aspect-[16/8] overflow-hidden rounded-lg bg-stone-200">
          <StoryImage src={article.image} alt={article.title} priority />
        </div>

        <div className="mt-8">
          <div className="space-y-5 text-[15px] leading-7 text-stone-700">
            <Card className="rounded-lg border-[#d7e4dc] bg-[#edf3ef] py-0 shadow-none">
              <CardContent className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-900">
                  The short version
                </p>
                <ul className="mt-2 space-y-2 text-xs leading-5 text-stone-700">
                  {article.aiSummary.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-emerald-700" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <SponsoredAdSlot placement="article-inline" />
            {article.sections?.length ? (
              article.sections.map((section, index) => (
                <div key={`${article.id}-section-${index}`}>
                  <section className="space-y-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${index}-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                    {section.image && (
                      <figure className="relative my-5 aspect-[16/9] overflow-hidden rounded-lg bg-stone-200">
                        <StoryImage
                          src={section.image}
                          alt={`${article.title}, section ${index + 1}`}
                        />
                        <figcaption className="sr-only">
                          Inline image for section {index + 1}
                        </figcaption>
                      </figure>
                    )}
                    {section.mediaUrl && (
                      <a
                        href={section.mediaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border-b border-emerald-800/30 py-2 text-sm font-medium text-emerald-900 hover:border-emerald-800"
                      >
                        <ExternalLink className="size-4" />
                        Open related media
                      </a>
                    )}
                  </section>
                  <div className="mt-5">
                    <SponsoredAdSlot placement="article-inline" />
                  </div>
                </div>
              ))
            ) : (
              <>
                {article.bodyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <SponsoredAdSlot placement="article-inline" />
              </>
            )}
          </div>
        </div>
        <div className="mt-8">
          <SponsoredAdSlot placement="article-inline" />
        </div>
      </article>
    </main>
  );
}