"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Trend } from "@/lib/news/types";
import { useOpenArticle } from "@/lib/store/use-open-article";

export default function TrendsView({ trends }: { trends: Trend[] }) {
  const openStory = useOpenArticle();
  const mostRead = trends
    .filter((trend) => trend.views > 0)
    .toSorted((left, right) => right.views - left.views);

  return <main className="mx-auto max-w-[1120px] px-4 py-8 sm:px-7"><div className="mb-6 border-b border-[#dedbd2] pb-5"><span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800"><TrendingUp className="size-3.5" /> Reader favorites</span><h1 className="font-editorial mt-2 text-3xl sm:text-4xl">Most-read stories</h1><p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">Stories ranked by actual reader views. New stories appear here after they receive a view.</p></div>
    {mostRead.length > 0 ? <div className="grid gap-3 md:grid-cols-2">{mostRead.map((trend, index) => <Card key={trend.articleId} className="rounded-lg border-[#e3e0d8] bg-white py-0 shadow-none transition-colors hover:border-emerald-800/40"><CardContent className="p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[10px] text-stone-400">#{String(index + 1).padStart(2, "0")}</span><Badge variant="outline" className="h-5 rounded-sm px-1.5 text-[9px] uppercase text-stone-600">{trend.category}</Badge><Badge className="h-5 rounded-sm bg-emerald-50 px-1.5 font-mono text-[10px] text-emerald-900 hover:bg-emerald-50">{trend.views.toLocaleString()} views</Badge></div><h2 className="mt-3 text-base font-semibold leading-snug">{trend.query}</h2><p className="mt-1.5 text-xs leading-5 text-stone-600">{trend.whyTrending}</p></div></div><div className="mt-4 flex justify-end border-t border-[#ebe8e1] pt-3"><Button size="sm" variant="ghost" className="text-emerald-900" onClick={() => openStory(trend.articleId)}>Read story <ArrowUpRight /></Button></div></CardContent></Card>)}</div> : <p className="rounded-lg border border-dashed border-[#c9c5bb] bg-white/70 px-4 py-10 text-center text-sm text-stone-600">No stories have views yet. Stories will appear here after readers open them.</p>}
  </main>;
}