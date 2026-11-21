import { newsResponse } from "@/lib/news/data";
import { connectMongo } from "@/lib/mongodb";
import { NewsArticleModel } from "@/lib/news/model";
import { NewsViewCounterModel, withViewStats } from "@/lib/news/view-counter";
import type { NewsArticle } from "@/lib/news/types";
import { toPublicNewsArticle } from "@/lib/news/public";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!process.env.MONGODB_URI) {
    const article = newsResponse.articles.find((item) => item.id === id);
    return article
      ? Response.json({ article: toPublicNewsArticle(article) })
      : Response.json({ error: "Story not found." }, { status: 404 });
  }

  try {
    await connectMongo();
    const record = await NewsArticleModel.findOne({ slug: id }).lean();
    const article = record
      ? (() => {
          const { slug, ...storedArticle } = record;
        return toPublicNewsArticle({
          ...storedArticle,
          id: slug,
        }) as Omit<NewsArticle, "viewCount" | "deviceViews">;
        })()
      : newsResponse.articles.find((item) => item.id === id);
    if (!article) return Response.json({ error: "Story not found." }, { status: 404 });
    const counter = await NewsViewCounterModel.findOne({ slug: id }).lean();
    return Response.json({ article: withViewStats(article, counter) });
  } catch (error) {
    console.error("Could not load story from MongoDB.", error);
    const article = newsResponse.articles.find((item) => item.id === id);
    if (article) {
      return Response.json(
        { article: toPublicNewsArticle(article) },
        {
          headers: {
            "Cache-Control": "no-store",
            "X-News-Source": "bundled-fallback",
          },
        },
      );
    }
    return Response.json({ error: "Could not connect to MongoDB." }, { status: 503 });
  }
}