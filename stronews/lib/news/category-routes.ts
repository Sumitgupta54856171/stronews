import type { NewsCategory } from "@/lib/news/types";

export const NEWS_CATEGORY_ROUTES = [
  {
    slug: "tech",
    category: "Tech & AI",
    title: "Technology & AI News",
    description: "Latest technology, artificial intelligence, and innovation news.",
  },
  {
    slug: "finance",
    category: "Markets & Policy",
    title: "Finance, Markets & Policy News",
    description: "Latest finance, markets, and policy news and explainers.",
  },
  {
    slug: "india",
    category: "India & Infra",
    title: "India & Infrastructure News",
    description: "Latest India, public policy, and infrastructure news.",
  },
  {
    slug: "sports",
    category: "Cricket & Sports",
    title: "Cricket & Sports News",
    description: "Latest cricket and sports news, updates, and analysis.",
  },
  {
    slug: "entertainment",
    category: "Cinema & OTT",
    title: "Cinema & OTT News",
    description: "Latest cinema, streaming, and entertainment news.",
  },
] as const satisfies readonly {
  slug: string;
  category: NewsCategory;
  title: string;
  description: string;
}[];

export type NewsCategoryRoute = (typeof NEWS_CATEGORY_ROUTES)[number];

export function getNewsCategoryRoute(slug: string) {
  return NEWS_CATEGORY_ROUTES.find((route) => route.slug === slug);
}

export function getNewsCategoryRoutePath(category: NewsCategory) {
  const route = NEWS_CATEGORY_ROUTES.find((item) => item.category === category);
  if (!route) throw new Error(`No URL route is configured for news category "${category}".`);
  return `/${route.slug}`;
}
