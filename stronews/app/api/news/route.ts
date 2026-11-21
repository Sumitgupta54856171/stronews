import { newsResponse } from "@/lib/news/data";
import { connectMongo } from "@/lib/mongodb";
import { NewsArticleModel } from "@/lib/news/model";
import { NewsViewCounterModel, withViewStats } from "@/lib/news/view-counter";
import { deleteNewsImage, getImageValidationError, storeNewsImage } from "@/lib/news/images";
import { toPublicNewsArticle } from "@/lib/news/public";
import { makeNewsSlug, parseCreateNewsInput } from "@/lib/news/validation";
import type { NewsArticle } from "@/lib/news/types";
import { getAuthenticatedUserId, isAuthConfigured } from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { NEWS_PUBLISHER_EMAIL } from "@/lib/site-config";
import mongoose from "mongoose";

function getBundledNewsResponse() {
  return {
    ...newsResponse,
    articles: newsResponse.articles.map(toPublicNewsArticle),
  };
}

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return Response.json(getBundledNewsResponse(), {
      headers: { "Cache-Control": "no-store", "X-News-Source": "bundled" },
    });
  }

  try {
    await connectMongo();
    const records = await NewsArticleModel.find().sort({ createdAt: -1 }).lean();
    const articleRecords = records.map(({ slug, ...article }) =>
      toPublicNewsArticle({ ...article, id: slug }),
    );
    const allArticles = [
      ...articleRecords,
      ...newsResponse.articles.filter(
        (article) => !articleRecords.some((record) => record.id === article.id),
      ),
    ];
    const counters = await NewsViewCounterModel.find({
      slug: { $in: allArticles.map((article) => article.id) },
    }).lean();
    const countersBySlug = new Map(counters.map((counter) => [counter.slug, counter]));
    const articles: NewsArticle[] = allArticles.map((article) =>
      withViewStats(article, countersBySlug.get(article.id)),
    );
    return Response.json({
      ...newsResponse,
      articles,
      trends: articles.map((article, index) => ({
        rank: String(index + 1).padStart(2, "0"),
        views: article.viewCount,
        query: article.trendQuery || article.title,
        category: article.category,
        articleId: article.id,
        whyTrending: article.subtitle,
      })),
    });
  } catch (error) {
    console.error("Could not load news from MongoDB; serving bundled stories.", error);
    return Response.json(getBundledNewsResponse(), {
      headers: { "Cache-Control": "no-store", "X-News-Source": "bundled-fallback" },
    });
  }
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Configure authentication before publishing stories." },
      { status: 503 },
    );
  }

  const userId = getAuthenticatedUserId(request);
  if (!userId) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "Configure MONGODB_URI before uploading stories." }, { status: 503 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("email").lean();
    if (!user) {
      return Response.json({ error: "Not signed in." }, { status: 401 });
    }
    if (user.email.trim().toLowerCase() !== NEWS_PUBLISHER_EMAIL) {
      return Response.json({ error: "Only the authorized publisher can upload stories." }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "Could not verify publisher access." }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? "Upload a multipart form with an article and image." : "Invalid upload." },
      { status: 400 },
    );
  }

  const rawArticle = formData.get("article");
  const imageFile = formData.get("image");
  if (typeof rawArticle !== "string" || !(imageFile instanceof File)) {
    return Response.json({ error: "Both article details and a cover image file are required." }, { status: 400 });
  }
  const coverImageError = await getImageValidationError(imageFile);
  if (coverImageError) return Response.json({ error: coverImageError }, { status: 400 });

  let articlePayload: unknown;
  try {
    articlePayload = JSON.parse(rawArticle);
  } catch {
    return Response.json({ error: "Story details must be valid JSON." }, { status: 400 });
  }
  const rawSections = typeof articlePayload === "object" && articlePayload !== null && "sections" in articlePayload
    ? articlePayload.sections
    : undefined;
  if (!Array.isArray(rawSections) || rawSections.length === 0 || rawSections.length > 30) {
    return Response.json({ error: "Add between 1 and 30 story sections." }, { status: 400 });
  }

  const coverImageId = new mongoose.mongo.ObjectId();
  const sectionImageIds: string[] = [];
  const sectionImageFiles: { file: File; id: string }[] = [];
  for (const [index] of rawSections.entries()) {
    const value = formData.get(`section-image-${index}`);
    if (!(value instanceof File) || value.size === 0) {
      sectionImageIds.push("");
      continue;
    }
    const validationError = await getImageValidationError(value);
    if (validationError) return Response.json({ error: `Section ${index + 1}: ${validationError}` }, { status: 400 });
    const id = new mongoose.mongo.ObjectId().toHexString();
    sectionImageIds.push(`/api/news/images/${id}`);
    sectionImageFiles.push({ file: value, id });
  }

  let input;
  try {
    input = parseCreateNewsInput(articlePayload, `/api/news/images/${coverImageId.toHexString()}`, sectionImageIds);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Invalid news article." },
      { status: 400 },
    );
  }

  const storedImageIds = [coverImageId.toHexString(), ...sectionImageFiles.map(({ id }) => id)];
  try {
    await storeNewsImage(imageFile, storedImageIds[0]);
    for (const { file, id } of sectionImageFiles) await storeNewsImage(file, id);
    const record = await NewsArticleModel.create({
      ...input,
      bodyParagraphs: input.sections?.flatMap((section) => section.paragraphs) ?? input.bodyParagraphs,
      slug: makeNewsSlug(input.title),
      publishedAt: "Just now",
    });
    const { slug, ...article } = record.toObject();
    return Response.json({
      article: withViewStats(toPublicNewsArticle({ ...article, id: slug })),
    }, { status: 201 });
  } catch (error) {
    await Promise.all(storedImageIds.map(async (id) => {
      try { await deleteNewsImage(id); } catch { /* The image may not have reached GridFS. */ }
    }));
    const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
    return Response.json(
      { error: duplicate ? "A story with this title already exists." : "Could not save the story to MongoDB." },
      { status: duplicate ? 409 : 503 },
    );
  }
}
