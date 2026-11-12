"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import BriefsView from "@/components/news/briefs-view";
import TrendsView from "@/components/news/trends-view";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/api";
import { useToast } from "@/components/ui/toast-provider";

export default function DataViewRoute({ view }: { view: "briefs" | "trends" }) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
  const toast = useToast();

  useEffect(() => {
    if (isError) toast.error("This news view couldn’t load. Please try again.");
  }, [isError, toast]);

  if (isPending) return <main className="mx-auto max-w-3xl animate-pulse px-4 py-8"><div className="aspect-[16/9] rounded-lg bg-stone-200" /></main>;
  if (isError || !data) return <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center"><AlertCircle className="size-8 text-rose-700" /><p className="font-editorial text-2xl">This view is unavailable</p><Button variant="outline" onClick={() => void refetch()}><RefreshCw /> Retry</Button></main>;

  return view === "briefs" ? <BriefsView articles={data.articles} /> : <TrendsView trends={data.trends} />;
}