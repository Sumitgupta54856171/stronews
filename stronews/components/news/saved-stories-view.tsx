"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, LogIn } from "lucide-react";
import StoryList from "@/components/news/story-list";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/api";
import { useSavedStories } from "@/lib/news/use-saved-stories";

export default function SavedStoriesView() {
  const { hasToken, savedIds, isPending } = useSavedStories();
  const { data, isPending: isNewsPending } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  if (!hasToken) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <Bookmark className="size-8 text-emerald-800" />
        <h1 className="font-editorial mt-4 text-4xl">Your saved stories</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">
          Sign in to save stories to your account. Saved stories remain private to your account.
        </p>
        <Link
          href="/login?next=/saved-stories"
          className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#176f58] px-4 text-sm font-medium text-white transition hover:bg-[#125943]"
        >
          <LogIn className="size-4" /> Sign in
        </Link>
      </main>
    );
  }

  if (isPending || isNewsPending) {
    return (
      <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-7">
        <div className="h-10 w-56 animate-pulse rounded-lg bg-stone-200" />
        <div className="mt-5 space-y-3">
          <div className="h-32 animate-pulse rounded-lg bg-stone-200" />
          <div className="h-32 animate-pulse rounded-lg bg-stone-200" />
        </div>
      </main>
    );
  }

  const articles = (data?.articles ?? []).filter((article) =>
    savedIds.includes(article.id),
  );

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-7">
      <header className="mb-7 border-b border-[#dedbd2] pb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
          Private to your account
        </p>
        <h1 className="font-editorial mt-2 text-4xl">Your saved stories</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
          Only stories saved with this account appear here. Other accounts cannot see or change
          your saved list.
        </p>
      </header>
      {articles.length > 0 ? (
        <StoryList
          articles={articles}
          headingId="saved-stories-heading"
          title="Saved for later"
        />
      ) : (
        <section className="rounded-xl border border-dashed border-[#c9c5bb] bg-white/70 px-5 py-12 text-center">
          <Bookmark className="mx-auto size-6 text-stone-400" />
          <h2 className="font-editorial mt-3 text-2xl">No saved stories yet</h2>
          <p className="mt-2 text-sm text-stone-600">
            Choose the bookmark icon on any story to save it to this account.
          </p>
          <Button className="mt-5 bg-[#176f58]" onClick={() => window.history.back()}>
            Browse stories
          </Button>
        </section>
      )}
    </main>
  );
}
