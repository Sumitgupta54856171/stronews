"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import ArticleReader from "@/components/news/article-reader";
import { Button } from "@/components/ui/button";
import { getArticle } from "@/lib/api";
import { useToast } from "@/components/ui/toast-provider";

export default function ArticleRoute({ id }: { id: string }) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getArticle(id),
  });
  const toast = useToast();

  useEffect(() => {
    if (isError) toast.error("This story couldn’t load. Please try again.");
  }, [isError, toast]);

  if (isPending) return <main className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-7"><div className="h-12 w-3/4 rounded bg-stone-200" /><div className="mt-4 h-6 w-2/3 rounded bg-stone-200" /><div className="mt-8 aspect-[16/8] rounded-lg bg-stone-200" /></main>;
  if (isError || !data) return <main className="flex min-h-[55vh] flex-col items-center justify-center gap-3 px-4 text-center"><AlertCircle className="size-8 text-rose-700" /><h1 className="font-editorial text-3xl">Story unavailable</h1><p className="max-w-md text-sm text-stone-600">This story may have been removed or the news service is unavailable.</p><Button variant="outline" onClick={() => void refetch()}><RefreshCw /> Retry</Button></main>;

  return <ArticleReader article={data} />;
}