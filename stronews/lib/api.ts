import axios from "axios";
import type { CreateNewsInput, DeviceType, DeviceViewCounts, NewsArticle, NewsResponse } from "@/lib/news/types";

const api = axios.create({ baseURL: "/api", headers: { Accept: "application/json" } });

export async function getNews(): Promise<NewsResponse> {
  const { data } = await api.get<NewsResponse>("/news");
  return data;
}

export async function getArticle(id: string): Promise<NewsArticle> {
  const { data } = await api.get<{ article: NewsArticle }>(`/news/${encodeURIComponent(id)}`);
  return data.article;
}

export async function recordArticleView(
  id: string,
  deviceType: DeviceType,
): Promise<{ viewCount: number; deviceViews: DeviceViewCounts }> {
  const { data } = await api.post<{ viewCount: number; deviceViews: DeviceViewCounts }>(
    `/news/${encodeURIComponent(id)}/views`,
    { deviceType },
  );
  return data;
}

export async function createArticle(
  input: CreateNewsInput,
  imageFile: File,
  sectionImageFiles: (File | null)[],
) {
  const formData = new FormData();
  formData.set("article", JSON.stringify(input));
  formData.set("image", imageFile);
  sectionImageFiles.forEach((file, index) => {
    if (file) formData.set(`section-image-${index}`, file);
  });
  const { data } = await api.post<{ article: NewsArticle }>("/news", formData);
  return data.article;
}