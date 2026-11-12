import { newsResponse } from "@/lib/news/data";
import { NewsArticleModel } from "@/lib/news/model";
import type { ArticleQuiz, CreateNewsSection } from "@/lib/news/types";

const seedCorrectOptions: Record<string, number[]> = {
  "vande-bharat-sleeper-trial-180kmh": [2],
  "india-ai-compute-subsidy-startups": [1],
  "rbi-upi-offline-tap-lite-x-limit": [3],
  "ind-vs-aus-squad-announcement-breakout": [2],
  "ott-weekend-releases-box-office-tracker": [1],
};

export async function getArticleQuizzes(articleId: string): Promise<ArticleQuiz[] | null> {
  const record = await NewsArticleModel.findOne({ slug: articleId })
    .select("sections.quiz")
    .lean<{ sections?: CreateNewsSection[] }>();

  if (record) {
    const quizzes = record.sections
      ?.map((section) => section.quiz)
      .filter((quiz): quiz is ArticleQuiz => Boolean(quiz));
    if (
      !quizzes?.length ||
      quizzes.some(
        (quiz) =>
          !quiz ||
          typeof quiz.question !== "string" ||
          !quiz.question.trim() ||
          !Array.isArray(quiz.options) ||
          quiz.options.length !== 4 ||
          quiz.options.some((option) => typeof option !== "string" || !option.trim()) ||
          !Number.isInteger(quiz.correctOption) ||
          quiz.correctOption < 0 ||
          quiz.correctOption >= quiz.options.length,
      )
    ) {
      return null;
    }
    return quizzes;
  }

  const article = newsResponse.articles.find((item) => item.id === articleId);
  const answers = seedCorrectOptions[articleId];
  if (!article?.sections?.length || !answers || answers.length !== article.sections.length) {
    return null;
  }

  return article.sections.map((section, index) => {
    if (!section.quiz) throw new Error(`Seed article ${articleId} is missing a section quiz.`);
    return { ...section.quiz, correctOption: answers[index] };
  });
}
