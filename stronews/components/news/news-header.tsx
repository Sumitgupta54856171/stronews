"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Gamepad2, LogOut, Newspaper, PenLine, Radio, Search, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { NEWS_CATEGORIES, type FeedView, type Trend } from "@/lib/news/types";
import { getNews } from "@/lib/api";
import { getAuthHeaders } from "@/lib/auth-client";
import { NEWS_PUBLISHER_EMAIL } from "@/lib/site-config";
import {
  getNewsCategoryRoute,
  getNewsCategoryRoutePath,
} from "@/lib/news/category-routes";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setActiveView, setCategory, setSearchQuery } from "@/lib/store/feed-slice";
import { useSavedStories } from "@/lib/news/use-saved-stories";

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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const toast = useToast();
  const { category, searchQuery } = useAppSelector((state) => state.feed);
  const { hasToken, savedIds, signOut } = useSavedStories();
  const canPublish = userEmail?.trim().toLowerCase() === NEWS_PUBLISHER_EMAIL;
  const activeView: FeedView = pathname === "/briefs" ? "briefs" : pathname === "/trends" ? "trends" : "feed";
  const isHome = pathname === "/";
  const activeCategoryRoute = getNewsCategoryRoute(pathname.slice(1));
  const showCategories = isHome || Boolean(activeCategoryRoute);
  const activeCategory = activeCategoryRoute?.category ?? (isHome ? category : "All Pulse");

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { headers: getAuthHeaders() })
      .then(async (response) => {
        if (response.status === 401) return null;
        if (!response.ok) throw new Error("Could not check your sign-in status.");
        const result: unknown = await response.json();
        return typeof result === "object" && result !== null && "user" in result &&
          typeof result.user === "object" && result.user !== null && "email" in result.user &&
          typeof result.user.email === "string"
          ? result.user.email
          : null;
      })
      .then((email) => {
        if (active) setUserEmail(email);
      })
      .catch(() => {
        if (active) toast.error("Could not check your sign-in status.");
      });
    return () => {
      active = false;
    };
  }, [pathname, toast]);

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        toast.error("Could not sign out. Please try again.");
        return;
      }
      signOut();
      setUserEmail(null);
      toast.success("You’re signed out.");
      router.refresh();
    } catch {
      toast.error("Could not sign out. Please try again.");
    }
  }

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
          <button className="flex shrink-0 items-center text-left" onClick={() => { dispatch(setActiveView("feed")); router.push("/"); }} aria-label="stronews home"><Image src="/stronews-logo.png" alt="Stronews" width={2048} height={2048} priority className="h-12 w-40 rounded-sm object-cover object-center" /></button>
          <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto sm:order-none sm:w-auto">{navigation.map(({ id, label, icon: Icon }) => <Button key={id} size="sm" variant={activeView === id ? "secondary" : "ghost"} className={activeView === id ? "bg-white shadow-sm" : "text-stone-600"} onClick={() => { dispatch(setActiveView(id)); router.push(id === "feed" ? "/" : `/${id}`); }}><Icon />{label}</Button>)}</nav>
          <Link href="/games" className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dedbd2] bg-white px-2.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50"><Gamepad2 className="size-3.5 text-emerald-800" /><span>Games</span></Link>
          {userEmail && <>
            {canPublish && <Link href="/news/upload" className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#176f58] px-2.5 text-xs font-medium text-white transition hover:bg-[#125943]"><PenLine className="size-3.5" /><span>Upload</span></Link>}
          </>}
          <div className="flex items-center gap-2">
            {userEmail ? (
              <>
                <span className="hidden max-w-36 truncate text-xs text-stone-600 md:block">{userEmail}</span>
                <Button size="sm" variant="outline" className="gap-1.5 bg-white" onClick={handleLogout}>
                  <LogOut /><span>Sign out</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex h-8 items-center rounded-md px-2.5 text-xs font-medium text-stone-700 hover:bg-white">Sign in</Link>
                <Link href="/signup" className="inline-flex h-8 items-center rounded-md bg-[#176f58] px-2.5 text-xs font-medium text-white hover:bg-[#125943]">Sign up</Link>
              </>
            )}
          </div>
          {isHome && <div className="ml-auto flex items-center gap-2 sm:ml-0"><label className="relative block"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" /><input value={searchQuery} onChange={(event) => dispatch(setSearchQuery(event.target.value))} className="h-8 w-[min(42vw,220px)] rounded-full border border-[#dedbd2] bg-white pl-8 pr-3 text-xs outline-none transition focus:border-emerald-700" placeholder="Search stories" aria-label="Search stories" /></label><Link href={hasToken ? "/saved-stories" : "/login?next=/saved-stories"} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#dedbd2] bg-white px-2.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50" aria-label="Saved stories"><Bookmark className="size-3.5" /><span className="font-mono text-[11px]">{hasToken ? savedIds.length : 0}</span></Link></div>}
        </div>
        {showCategories && (
          <nav
            aria-label="News categories"
            className="mt-3 flex gap-1 overflow-x-auto border-t border-[#e9e6df] pt-2.5 [scrollbar-width:none]"
          >
            {NEWS_CATEGORIES.map((item) => {
              const isActive = activeCategory === item;
              const href = item === "All Pulse" ? "/" : getNewsCategoryRoutePath(item);

              return (
                <Link
                  key={item}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    if (item === "All Pulse") dispatch(setCategory("All Pulse"));
                    else dispatch(setCategory(item));
                  }}
                  className={`inline-flex h-8 shrink-0 items-center rounded-full px-3 text-[11px] transition ${
                    isActive
                      ? "bg-[#171918] font-medium text-white hover:bg-[#2f3431]"
                      : "text-stone-600 hover:bg-white"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        )}
      </div></header>
    </>
  );
}
