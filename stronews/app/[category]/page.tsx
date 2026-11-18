import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryNewsFeed from "@/components/news/category-news-feed";
import {
  getNewsCategoryRoute,
  NEWS_CATEGORY_ROUTES,
} from "@/lib/news/category-routes";

export function generateStaticParams() {
  return NEWS_CATEGORY_ROUTES.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const route = getNewsCategoryRoute(slug);
  if (!route) return {};

  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: `/${route.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const route = getNewsCategoryRoute(slug);
  if (!route) notFound();

  return <CategoryNewsFeed category={route.category} title={route.title} />;
}
