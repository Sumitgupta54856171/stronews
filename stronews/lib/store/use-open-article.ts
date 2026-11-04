"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { recordArticleView } from "@/lib/api";
import { openArticle as selectArticle } from "@/lib/store/feed-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import type { DeviceType, NewsResponse } from "@/lib/news/types";

function getDeviceType(): DeviceType {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/ipad|tablet|kindle|silk/.test(userAgent)) return "tablet";
  if (/mobi|iphone|ipod|android/.test(userAgent)) return "mobile";
  return "desktop";
}

export function useOpenArticle() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return async (id: string) => {
    dispatch(selectArticle(id));
    try {
      const stats = await recordArticleView(id, getDeviceType());
      queryClient.setQueryData<NewsResponse>(["news"], (current) => current && ({
        ...current,
        articles: current.articles.map((article) =>
          article.id === id ? { ...article, ...stats } : article,
        ),
        trends: current.trends.map((trend) =>
          trend.articleId === id ? { ...trend, views: stats.viewCount } : trend,
        ),
      }));
    } catch (error) {
      console.error("Could not record this story view.", error);
    }
    router.push(`/news/${encodeURIComponent(id)}`);
  };
}