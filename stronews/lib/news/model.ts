import { model, models, Schema } from "mongoose";
import type { NewsArticle } from "@/lib/news/types";

export type StoredNewsArticle = Omit<NewsArticle, "id"> & { slug: string };

const newsArticleSchema = new Schema<StoredNewsArticle>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    isBreaking: { type: Boolean, default: false },
    trendQuery: { type: String, required: true },
    trendSpike: { type: String, default: "+0%" },
    publishedAt: { type: String, required: true },
    readTime: { type: String, default: "3 min read" },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      avatar: { type: String, default: "" },
    },
    keyStat: {
      value: { type: String, default: "" },
      label: { type: String, default: "" },
    },
    aiSummary: { type: [String], default: [] },
    sixtyWordSummary: { type: String, default: "" },
    bodyParagraphs: { type: [String], default: [] },
    sections: {
      type: [{
        paragraphs: { type: [String], default: [] },
        image: { type: String, default: "" },
        mediaUrl: { type: String, default: "" },
      }],
      default: [],
    },
  },
  { timestamps: true },
);

export const NewsArticleModel =
  models.NewsArticle ?? model<StoredNewsArticle>("NewsArticle", newsArticleSchema);