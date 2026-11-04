"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StoryImage from "@/components/news/story-image";
import type { NewsArticle } from "@/lib/news/types";
import { useOpenArticle } from "@/lib/store/use-open-article";

export default function BriefsView({ articles }: { articles: NewsArticle[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const openStory = useOpenArticle();
  const article = articles[activeIndex];
  if (!article) return null;
  const changeIndex = (direction: number) => setActiveIndex((index) => (index + direction + articles.length) % articles.length);

  return <main className="mx-auto max-w-3xl px-4 py-8 sm:px-7"><div className="mb-4 flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">The quick read</p><h1 className="font-editorial mt-1 text-3xl">60-word briefs</h1></div><div className="flex items-center gap-1"><Button size="icon" variant="outline" aria-label="Previous brief" onClick={() => changeIndex(-1)}><ArrowLeft /></Button><span className="min-w-12 text-center font-mono text-[11px] text-stone-500">{activeIndex + 1} / {articles.length}</span><Button size="icon" variant="outline" aria-label="Next brief" onClick={() => changeIndex(1)}><ArrowRight /></Button></div></div>
    <div className="mb-3 grid grid-cols-5 gap-1.5" aria-label="Brief progress">{articles.map((item, index) => <button key={item.id} aria-label={`Show brief ${index + 1}`} onClick={() => setActiveIndex(index)} className={`h-1 rounded-full ${index === activeIndex ? "bg-emerald-800" : "bg-stone-300"}`} />)}</div>
    <Card className="overflow-hidden rounded-lg border-[#e3e0d8] bg-white py-0 shadow-sm"><div className="relative aspect-[16/8] bg-stone-900"><StoryImage src={article.image} alt={article.title} priority /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-4 left-5 right-5 text-white sm:bottom-6 sm:left-7"><span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">{article.category} / {article.viewCount.toLocaleString()} story views</span><h2 className="font-editorial mt-1 text-3xl leading-tight sm:text-4xl">{article.title}</h2></div></div>
    <CardContent className="p-5 sm:p-7"><p className="text-[15px] leading-7 text-stone-700">{article.sixtyWordSummary}</p><div className="mt-5 flex items-center justify-between border-t border-[#ebe8e1] pt-4 text-[10px] text-stone-500"><span>By {article.author.name}</span><span>{article.readTime}</span></div><Button className="mt-5 bg-[#171918]" onClick={() => openStory(article.id)}>Read full story <ArrowUpRight /></Button></CardContent>
    </Card></main>;
}