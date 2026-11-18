import type { MetadataRoute } from "next";
import { newsResponse } from "@/lib/news/data";
import { NewsArticleModel } from "@/lib/news/model";
import { connectMongo } from "@/lib/mongodb";
import { SITE_URL } from "@/lib/site-config";
import { NEWS_CATEGORY_ROUTES } from "@/lib/news/category-routes";
import { connection } from "next/server";

const publicPages = [
  "",
  "/briefs",
  "/trends",
  "/games",
  "/about-us",
  "/contact-us",
  "/editorial-policy",
  "/privacy-policy",
  "/terms-and-conditions",
  ...NEWS_CATEGORY_ROUTES.map(({ slug }) => `/${slug}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const pages: MetadataRoute.Sitemap = publicPages.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
  const articles = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const article of newsResponse.articles) {
    articles.set(article.id, {
      url: new URL(`/news/${encodeURIComponent(article.id)}`, SITE_URL).toString(),
    });
  }

  if (process.env.MONGODB_URI) {
    await connectMongo();
    const records = await NewsArticleModel.find().select("slug updatedAt").lean();
    for (const article of records) {
      articles.set(article.slug, {
        url: new URL(`/news/${encodeURIComponent(article.slug)}`, SITE_URL).toString(),
        lastModified: article.updatedAt,
      });
    }
  }

  return [...pages, ...articles.values()];
}
