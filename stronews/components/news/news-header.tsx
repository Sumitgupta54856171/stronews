"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Newspaper, PenLine, Radio, Search, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NEWS_CATEGORIES, type FeedView, type Trend } from "@/lib/news/types";
import { getNews } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveView, setCategory, setSearchQuery, toggleSavedOnly } from "@/lib/store/feed-slice";

const navigation: { id: FeedView; label: string; icon: typeof Newspaper }[] = [
  { id: "feed", label: "Pulse feed", icon: Newspaper },
  { id: "briefs", label: "60-word briefs", icon: Zap },
  { id: "trends", label: "Trend radar", icon: TrendingUp },
];

export default function NewsHeader({ trends }: { trends: Trend[] }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useQuery({ queryKey: ["news"], queryFn: getNews });
  const { category, searchQuery, savedIds, showSavedOnly } = useAppSelector((state) => state.feed);
  const activeView: FeedView = pathname === "/briefs" ? "briefs" : pathname === "/trends" ? "trends" : "feed";
  const isHome = pathname === "/";

  return (
    <>
      <div className="bg-[#171918] text-[#eeeee9]"><div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 py-2 sm:px-7">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>Live news desk</div>
        <p className="hidden text-[11px] text-stone-400 sm:block">Monday edition <span className="px-2 text-stone-600">/</span> 01 Nov 2026</p>
        <p className="text-[10px] text-stone-400">Updated just now</p>
      </div></div>
      <div className="border-b border-[#e1ded6] bg-[#efede7]"><div className="mx-auto flex max-w-[1320px] items-center gap-3 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-7">
        <Badge className="h-6 shrink-0 rounded-sm bg-rose-700 px-2 text-[10px] tracking-wide text-white hover:bg-rose-700"><Radio /> Trending now</Badge>
        {(data?.trends ?? trends).slice(0, 4).map((trend) => <button key={trend.rank} className="flex shrink-0 items-center gap-2 rounded-sm border border-[#e2dfd7] bg-white px-2.5 py-1.5 text-left text-[11px] transition-colors hover:border-emerald-700" onClick={() => router.push("/trends")}><span className="font-medium">{trend.query}</span><span className="font-mono text-[10px] font-semibold text-emerald-800">{trend.views.toLocaleString()} views</span></button>)}
      </div></div>
      <header className="sticky top-0 z-30 border-b border-[#e2dfd7] bg-[#f7f6f2]/95 backdrop-blur-md"><div className="mx-auto max-w-[1320px] px-4 py-3 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <button className="flex items-center gap-2.5 text-left" onClick={() => { dispatch(setActiveView("feed")); router.push("/"); }} aria-label="stronews home"><span className="flex size-9 items-center justify-center rounded-sm bg-[#171918] font-mono text-[11px] font-bold text-white">S</span><span><span className="block text-[18px] font-extrabold leading-none tracking-tight">stronews</span><span className="mt-1 hidden text-[9px] uppercase tracking-[0.16em] text-stone-500 sm:block">Search-led editorial desk</span></span></button>
          <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto sm:order-none sm:w-auto">{navigation.map(({ id, label, icon: Icon }) => <Button key={id} size="sm" variant={activeView === id ? "secondary" : "ghost"} className={activeView === id ? "bg-white shadow-sm" : "text-stone-600"} onClick={() => { dispatch(setActiveView(id)); router.push(id === "feed" ? "/" : `/${id}`); }}><Icon />{label}</Button>)}</nav>
          <Link href="/news/upload" className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#176f58] px-2.5 text-xs font-medium text-white transition hover:bg-[#125943]"><PenLine className="size-3.5" /><span>Upload</span></Link>
          {isHome && <div className="ml-auto flex items-center gap-2 sm:ml-0"><label className="relative block"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" /><input value={searchQuery} onChange={(event) => dispatch(setSearchQuery(event.target.value))} className="h-8 w-[min(42vw,220px)] rounded-full border border-[#dedbd2] bg-white pl-8 pr-3 text-xs outline-none transition focus:border-emerald-700" placeholder="Search stories" aria-label="Search stories" /></label><Button size="sm" variant={showSavedOnly ? "default" : "outline"} className="gap-1.5 rounded-full bg-white px-2.5" aria-label="Show saved stories" onClick={() => dispatch(toggleSavedOnly())}><Bookmark className="size-3.5" /><span className="font-mono text-[11px]">{savedIds.length}</span></Button></div>}
        </div>
        {isHome && <div className="mt-3 flex gap-1 overflow-x-auto border-t border-[#e9e6df] pt-2.5 [scrollbar-width:none]">{NEWS_CATEGORIES.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "ghost"} className={category === item ? "shrink-0 rounded-full bg-[#171918] px-3 text-[11px] text-white hover:bg-[#2f3431]" : "shrink-0 rounded-full px-3 text-[11px] text-stone-600"} onClick={() => dispatch(setCategory(item))}>{item}</Button>)}</div>}
      </div></header>
    </>
  );
}