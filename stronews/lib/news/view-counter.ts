import { model, models, Schema } from "mongoose";
import type { DeviceType, DeviceViewCounts, NewsArticle } from "@/lib/news/types";

type NewsViewCounter = {
  slug: string;
  viewCount: number;
  deviceViews: DeviceViewCounts;
};

const viewCounterSchema = new Schema<NewsViewCounter>({
  slug: { type: String, required: true, unique: true, index: true },
  viewCount: { type: Number, default: 0, min: 0 },
  deviceViews: {
    mobile: { type: Number, default: 0, min: 0 },
    tablet: { type: Number, default: 0, min: 0 },
    desktop: { type: Number, default: 0, min: 0 },
  },
});

export const NewsViewCounterModel =
  models.NewsViewCounter ?? model<NewsViewCounter>("NewsViewCounter", viewCounterSchema);

export const emptyDeviceViews = (): DeviceViewCounts => ({
  mobile: 0,
  tablet: 0,
  desktop: 0,
});

export function withViewStats(
  article: Omit<NewsArticle, "viewCount" | "deviceViews">,
  counter?: NewsViewCounter | null,
): NewsArticle {
  return {
    ...article,
    viewCount: counter?.viewCount ?? 0,
    deviceViews: counter?.deviceViews ?? emptyDeviceViews(),
  };
}

export function isDeviceType(value: unknown): value is DeviceType {
  return value === "mobile" || value === "tablet" || value === "desktop";
}
