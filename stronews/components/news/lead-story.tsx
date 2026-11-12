"use client";

import { ArrowUpRight, Bookmark, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StoryImage from "@/components/news/story-image";
import type { NewsArticle } from "@/lib/news/types";
import { useSavedStories } from "@/lib/news/use-saved-stories";
import { useOpenArticle } from "@/lib/store/use-open-article";

export default function LeadStory({ article }: { article: NewsArticle }) {
  const openStory = useOpenArticle();
  const { hasToken, isSaving, isSaved, toggleSaved } = useSavedStories();
  const saved = isSaved(article.id);

  function toggleStorySaved() {
    toggleSaved(article.id);
  }

  return <Card className="overflow-hidden rounded-lg border-[#e3e0d8] bg-white py-0 shadow-[0_3px_14px_rgba(27,30,27,0.04)]">
    <button className="group relative block aspect-[16/8.5] w-full overflow-hidden bg-stone-900 text-left" onClick={() => openStory(article.id)} aria-label={`Read ${article.title}`}>
      <StoryImage src={article.image} alt={article.title} priority className="transition duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
      <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">{article.isBreaking && <Badge className="rounded-sm bg-rose-700 text-[10px] uppercase tracking-wider text-white hover:bg-rose-700">Breaking</Badge>}<Badge className="rounded-sm bg-black/55 text-[10px] text-white backdrop-blur-sm hover:bg-black/55">{article.category}</Badge></div>
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6"><span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200"><span className="size-1.5 rounded-full bg-emerald-300" />Lead story</span><h1 className="font-editorial mt-2 max-w-4xl text-[clamp(1.7rem,4vw,3rem)] leading-[1.02] text-white">{article.title}</h1></div>
    </button>
    <CardContent className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div><p className="max-w-3xl text-sm leading-6 text-stone-600">{article.subtitle}</p><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-stone-500"><span className="font-semibold text-stone-800">{article.author.name}</span><span>{article.publishedAt}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3" />{article.readTime}</span></div>
        <div className="mt-5 flex flex-wrap gap-2"><Button size="sm" className="bg-[#176f58]" onClick={() => openStory(article.id)}>Read the story <ArrowUpRight /></Button><Button size="sm" variant="outline" disabled={hasToken && isSaving} onClick={toggleStorySaved}><Bookmark className={saved ? "fill-current" : ""} />{hasToken ? (saved ? "Saved" : "Save story") : "Sign in to save"}</Button></div>
      </div>
      <div className="flex flex-col justify-center border-t border-[#ebe8e1] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0"><span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-stone-500">Story views</span><span className="mt-1 font-mono text-lg font-semibold text-emerald-800">{article.viewCount.toLocaleString()}</span></div>
    </CardContent>
  </Card>;
}
