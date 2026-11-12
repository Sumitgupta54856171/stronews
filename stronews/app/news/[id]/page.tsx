import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import ArticleReader from "@/components/news/article-reader";
import { SITE_URL } from "@/lib/site-config";
import { getPublicArticle } from "@/lib/news/server";

type NewsArticlePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  await connection();
  const { id } = await params;
  const article = await getPublicArticle(id);
  if (!article) return { title: "Story not found", robots: { index: false, follow: false } };

  const canonicalUrl = `/news/${encodeURIComponent(article.id)}`;
  const description =
    article.subtitle || article.sixtyWordSummary || article.aiSummary.slice(0, 2).join(" ");

  return {
    title: article.title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.title,
      description,
      siteName: "Stronews",
      authors: [article.author.name],
      images: article.image ? [{ url: article.image, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.image ? [{ url: article.image, alt: article.title }] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  await connection();
  const { id } = await params;
  const article = await getPublicArticle(id);
  if (!article) notFound();
  const pageUrl = new URL(`/news/${encodeURIComponent(article.id)}`, SITE_URL).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.subtitle || article.sixtyWordSummary,
    image: article.image ? [article.image] : undefined,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: "Stronews", url: SITE_URL },
    mainEntityOfPage: pageUrl,
    articleSection: article.category,
  };
  const safeStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeStructuredData }}
      />
      <ArticleReader article={article} />
    </>
  );
}