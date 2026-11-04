"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadStory from "@/components/news/lead-story";
import StoryList from "@/components/news/story-list";
import TrendRail from "@/components/news/trend-rail";
import { getNews } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { resetFilters } from "@/lib/store/feed-slice";
import { useOpenArticle } from "@/lib/store/use-open-article";

export default function NewsDashboard() {
  const dispatch = useAppDispatch();
  const openStory = useOpenArticle();
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["news"], queryFn: getNews });
  const feed = useAppSelector((state) => state.feed);

  if (isPending) return <main className="mx-auto grid max-w-[1320px] gap-5 px-4 py-8 sm:px-7 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="aspect-[16/8] animate-pulse rounded-lg bg-stone-200" /><div className="h-72 animate-pulse rounded-lg bg-stone-200" /></main>;
  if (isError || !data) return <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center"><AlertCircle className="size-8 text-rose-700" /><h1 className="font-editorial text-3xl">The news desk is offline</h1><p className="max-w-sm text-sm text-stone-600">We couldn’t load the latest stories. Try the connection again.</p><Button onClick={() => void refetch()}><RefreshCw /> Retry</Button></main>;

  const filteredArticles = data.articles.filter((item) => {
    const matchesCategory = feed.category === "All Pulse" || item.category === feed.category;
    const searchText = `${item.title} ${item.subtitle} ${item.trendQuery} ${item.category}`.toLowerCase();
    return matchesCategory && searchText.includes(feed.searchQuery.trim().toLowerCase()) && (!feed.showSavedOnly || feed.savedIds.includes(item.id));
  });

  const [lead, ...remaining] = filteredArticles;
  const content = lead ? <main className="mx-auto max-w-[1320px] px-4 py-6 sm:px-7 sm:py-8"><div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">Monday, November 1</p><h1 className="font-editorial mt-1 text-3xl sm:text-4xl">The pulse, right now.</h1></div><span className="hidden text-[10px] text-stone-500 sm:block">A sharper read on what matters</span></div><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-7"><LeadStory article={lead} />{remaining.length > 0 && <StoryList articles={remaining} />}</div><TrendRail trends={data.trends} onSelect={openStory} /></div></main> : <main className="mx-auto max-w-[1320px] px-4 py-16 text-center sm:px-7"><p className="font-editorial text-3xl">No stories found</p><p className="mt-2 text-sm text-stone-600">Change your category or search to see more coverage.</p><Button className="mt-4" variant="outline" onClick={() => dispatch(resetFilters())}>Clear filters</Button></main>;

  return <div className="min-h-screen pb-8">{content}</div>;
}