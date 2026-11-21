"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadStory from "@/components/news/lead-story";
import StoryList from "@/components/news/story-list";
import { getNews } from "@/lib/api";
import { useToast } from "@/components/ui/toast-provider";
import type { NewsCategory } from "@/lib/news/types";

export default function CategoryNewsFeed({
  category,
  title,
}: {
  category: NewsCategory;
  title: string;
}) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
  const toast = useToast();

  useEffect(() => {
    if (isError) toast.error("Couldn’t load the latest stories. Please try again.");
  }, [isError, toast]);

  if (isPending) {
    return (
      <main className="mx-auto grid min-h-[50vh] max-w-[1320px] gap-5 px-4 py-8 sm:px-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="aspect-[16/8] animate-pulse rounded-lg bg-stone-200" />
        <div className="h-72 animate-pulse rounded-lg bg-stone-200" />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <AlertCircle className="size-8 text-rose-700" />
        <h1 className="font-editorial text-3xl">The news desk is offline</h1>
        <p className="max-w-sm text-sm text-stone-600">
          We couldn’t load the latest stories. Try the connection again.
        </p>
        <Button onClick={() => void refetch()}>
          <RefreshCw /> Retry
        </Button>
      </main>
    );
  }

  const articles = data.articles.filter((article) => article.category === category);
  const [lead, ...remaining] = articles;

  return (
    <main className="mx-auto min-h-[50vh] max-w-[1320px] px-4 py-6 sm:px-7 sm:py-8">
      <header className="mb-5 border-b border-[#dedbd2] pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">
          Stronews category
        </p>
        <h1 className="font-editorial mt-1 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-stone-600">
          {articles.length} {articles.length === 1 ? "story" : "stories"} in this category
        </p>
      </header>

      {lead ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-7">
            <LeadStory article={lead} />
            {remaining.length > 0 && (
              <StoryList articles={remaining} title={`More ${title}`} />
            )}
          </div>
          <aside className="space-y-6">
            <div className="h-fit rounded-lg border border-[#d5e0d8] bg-[#e8f0eb] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-900">
                The brief
              </p>
              <p className="font-editorial mt-2 text-xl leading-tight text-[#183e32]">
                Clear updates and context on the topics that matter.
              </p>
            </div>
          </aside>
        </div>
      ) : (
        <section className="rounded-lg border border-dashed border-[#c9c5bb] bg-white/70 px-4 py-12 text-center">
          <h2 className="font-editorial text-2xl">No stories in this category yet</h2>
          <p className="mt-2 text-sm text-stone-600">
            New {title.toLowerCase()} stories will appear here when published.
          </p>
        </section>
      )}
    </main>
  );
}
