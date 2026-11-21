import { cache } from "react";
import { newsResponse } from "@/lib/news/data";
import { NewsArticleModel } from "@/lib/news/model";
import { toPublicNewsArticle } from "@/lib/news/public";
import { connectMongo } from "@/lib/mongodb";
import { NewsViewCounterModel, withViewStats, emptyDeviceViews } from "@/lib/news/view-counter";
import type { NewsArticle } from "@/lib/news/types";

export const getPublicArticle = cache(async (id: string): Promise<NewsArticle | null> => {
  const seedArticle = newsResponse.articles.find((article) => article.id === id);
  if (!process.env.MONGODB_URI) return seedArticle ?? null;

  try {
    await connectMongo();
    const record = await NewsArticleModel.findOne({ slug: id }).lean();
    if (!record) return seedArticle ?? null;

    const { slug, ...storedArticle } = record;
    const article = toPublicNewsArticle({
      ...storedArticle,
      id: slug,
      viewCount: 0,
      deviceViews: emptyDeviceViews(),
    });
    const counter = await NewsViewCounterModel.findOne({ slug }).lean();
    return withViewStats(article, counter);
  } catch (error) {
    console.error("Could not load story from MongoDB; checking bundled stories.", error);
    return seedArticle ?? null;
  }
});
