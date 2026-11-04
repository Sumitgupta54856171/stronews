import { Suspense } from "react";
import ArticleRoute from "@/components/news/article-route";

async function NewsArticleContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleRoute id={id} />;
}

export default function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<main className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-7"><div className="h-12 w-3/4 rounded bg-stone-200" /><div className="mt-8 aspect-[16/8] rounded-lg bg-stone-200" /></main>}>
      <NewsArticleContent params={params} />
    </Suspense>
  );
}