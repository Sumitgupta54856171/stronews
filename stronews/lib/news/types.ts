export type NewsCategory =
  | "Tech & AI"
  | "India & Infra"
  | "Cricket & Sports"
  | "Cinema & OTT"
  | "Markets & Policy";

export const ARTICLE_REWARD_CATEGORIES = [
  "Personal Finance",
  "Stock News",
  "Investing News",
  "Insurance / Loans",
  "Technology News",
  "Business News",
  "Other News",
] as const;

export type ArticleRewardCategory = (typeof ARTICLE_REWARD_CATEGORIES)[number];

export type NewsArticle = {
  id: string;
  viewCount: number;
  deviceViews: DeviceViewCounts;
  category: NewsCategory;
  rewardCategory?: ArticleRewardCategory;
  isBreaking: boolean;
  trendQuery: string;
  trendSpike: string;
  publishedAt: string;
  readTime: string;
  title: string;
  subtitle: string;
  image: string;
  author: { name: string; role: string; avatar: string };
  keyStat: { value: string; label: string };
  aiSummary: string[];
  sixtyWordSummary: string;
  bodyParagraphs: string[];
  sections?: NewsSection[];
};

export type DeviceType = "mobile" | "tablet" | "desktop";
export type DeviceViewCounts = Record<DeviceType, number>;

export type NewsSection = {
  paragraphs: string[];
  image?: string;
  mediaUrl?: string;
  quiz?: NewsQuiz;
};

export type NewsQuiz = {
  question: string;
  options: string[];
};

export type ArticleQuiz = NewsQuiz & {
  correctOption: number;
};

export type CreateNewsSection = Omit<NewsSection, "quiz"> & {
  quiz?: ArticleQuiz;
};

export type Trend = {
  rank: string;
  views: number;
  query: string;
  category: NewsCategory;
  articleId: string;
  whyTrending: string;
};

export type NewsResponse = { articles: NewsArticle[]; trends: Trend[] };
export type FeedView = "feed" | "briefs" | "trends";

export type CreateNewsInput = Omit<
  NewsArticle,
  "id" | "publishedAt" | "viewCount" | "deviceViews" | "sections"
> & {
  sections: CreateNewsSection[];
};

export const NEWS_CATEGORIES = [
  "All Pulse",
  "Tech & AI",
  "India & Infra",
  "Cricket & Sports",
  "Cinema & OTT",
  "Markets & Policy",
] as const;

export type CategoryFilter = (typeof NEWS_CATEGORIES)[number];
