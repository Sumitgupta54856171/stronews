import axios from "axios";
import type { CreateNewsInput, DeviceType, DeviceViewCounts, NewsArticle, NewsResponse } from "@/lib/news/types";
import { clearAuthToken, getAuthToken } from "@/lib/auth-client";

const api = axios.create({ baseURL: "/api", headers: { Accept: "application/json" } });

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAuthToken();
    }
    return Promise.reject(error);
  },
);

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

export type SavedStoriesResponse = {
  savedIds: string[];
};

export async function getSavedStories(): Promise<SavedStoriesResponse> {
  const { data } = await api.get<SavedStoriesResponse>("/saved-stories");
  return data;
}

export async function saveStory(articleId: string): Promise<void> {
  await api.post("/saved-stories", { articleId });
}

export async function removeSavedStory(articleId: string): Promise<void> {
  await api.delete("/saved-stories", { data: { articleId } });
}
