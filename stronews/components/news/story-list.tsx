"use client";

import { ArrowUpRight, Bookmark, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StoryImage from "@/components/news/story-image";
import type { NewsArticle } from "@/lib/news/types";
import { useSavedStories } from "@/lib/news/use-saved-stories";
import { useOpenArticle } from "@/lib/store/use-open-article";

type StoryListProps = {
  articles: NewsArticle[];
  title?: string;
  headingId?: string;
};

export default function StoryList({
  articles,
  title = "Latest pulse",
  headingId = "latest-heading",
}: StoryListProps) {
  const openStory = useOpenArticle();
  const { hasToken, isSaving, isSaved, toggleSaved } = useSavedStories();

  return <section aria-labelledby={headingId}><div className="mb-3 flex items-end justify-between border-b border-[#dedbd2] pb-2"><h2 id={headingId} className="font-editorial text-2xl">{title}</h2><span className="font-mono text-[10px] text-stone-500">{articles.length} STORIES</span></div>
    <div className="space-y-3">{articles.map((article) => { const saved = isSaved(article.id); return <Card key={article.id} className="grid grid-cols-[116px_minmax(0,1fr)] gap-3 rounded-lg border-[#e3e0d8] bg-white p-3 shadow-none sm:grid-cols-[176px_minmax(0,1fr)] sm:gap-4 sm:p-4">
      <button className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-200" onClick={() => openStory(article.id)} aria-label={`Read ${article.title}`}><StoryImage src={article.image} alt={article.title} /></button>
      <div className="flex min-w-0 flex-col justify-between"><div><div className="mb-1.5 flex flex-wrap items-center gap-2"><Badge variant="outline" className="h-5 rounded-sm px-1.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-900">{article.category}</Badge>{article.isBreaking && <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700">Breaking</span>}</div><button className="text-left" onClick={() => openStory(article.id)}><h3 className="font-editorial text-[17px] leading-[1.12] text-stone-900 hover:text-emerald-800 sm:text-[21px]">{article.title}</h3></button><p className="mt-1.5 hidden text-xs leading-5 text-stone-600 sm:block">{article.subtitle}</p></div>
        <div className="mt-2 flex items-center justify-between gap-2"><span className="flex flex-wrap items-center gap-1.5 text-[10px] text-stone-500">{article.publishedAt}<span className="text-stone-300">/</span><Clock3 className="size-3" />{article.readTime}<span className="text-stone-300">/</span>{article.viewCount.toLocaleString()} views</span><div className="flex items-center gap-1"><Button size="icon-sm" variant="ghost" disabled={hasToken && isSaving} aria-label={hasToken ? (saved ? "Remove saved story" : "Save story") : "Sign in to save story"} onClick={() => toggleSaved(article.id)}><Bookmark className={saved ? "fill-current text-emerald-800" : ""} /></Button><Button size="icon-sm" variant="ghost" aria-label="Open story" onClick={() => openStory(article.id)}><ArrowUpRight /></Button></div></div>
      </div></Card>; })}</div>
  </section>;
}
