import type {
  CreateNewsSection,
  NewsArticle,
  NewsSection,
} from "@/lib/news/types";

type ArticleWithStoredQuiz = Omit<NewsArticle, "sections"> & {
  sections?: (NewsSection | CreateNewsSection)[];
};

export function toPublicNewsArticle<T extends ArticleWithStoredQuiz>(
  article: T,
): Omit<ArticleWithStoredQuiz, "sections"> & { sections?: NewsSection[] } {
  const { sections, ...publicArticle } = article;
  return {
    ...publicArticle,
    ...(sections
      ? {
          sections: sections.map(({ quiz, ...section }) => ({
            ...section,
            ...(quiz ? { quiz: { question: quiz.question, options: quiz.options } } : {}),
          })),
        }
      : {}),
  };
}
