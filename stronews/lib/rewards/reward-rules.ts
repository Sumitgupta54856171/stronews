import { NewsArticleModel } from "@/lib/news/model";
import { newsResponse } from "@/lib/news/data";
import type { ArticleRewardCategory, NewsArticle, NewsCategory } from "@/lib/news/types";

const personalFinanceTerms =
  /\b(personal finance|budget(?:ing)?|tax(?:es|ation)?|savings?|retirement|pensions?|credit score|household finances?)\b/i;
const stockTerms =
  /\b(stocks?|shares?|equities|ipo|sensex|nifty|stock market|share market)\b/i;
const investingTerms =
  /\b(investing|investments?|investors?|mutual funds?|etfs?|portfolio|bonds?|asset allocation|fixed deposits?|fd rates)\b/i;
const insuranceAndLoanTerms =
  /\b(insurance|loans?|mortgages?|lending|credit cards?|emis?|borrowers?)\b/i;
const technologyTerms =
  /\b(technology|tech|artificial intelligence|ai|software|semiconductors?|cybersecurity|smartphones?|apps?|cloud computing|data centers?)\b/i;
const businessTerms =
  /\b(business(?:es)?|corporate|companies|company|enterprise|merger|acquisition|earnings|revenue|startups?|start-ups?)\b/i;

const highRewardCategories: ArticleRewardCategory[] = [
  "Personal Finance",
  "Stock News",
  "Investing News",
  "Insurance / Loans",
  "Technology News",
  "Business News",
];

function isRewardCategory(value: unknown): value is ArticleRewardCategory {
  return value === "Other News" || highRewardCategories.includes(value as ArticleRewardCategory);
}

export function getArticleRewardCategory(
  article: Pick<NewsArticle, "category" | "rewardCategory" | "title" | "subtitle" | "trendQuery">,
) {
  if (isRewardCategory(article.rewardCategory)) return article.rewardCategory;

  const searchText = `${article.title} ${article.subtitle} ${article.trendQuery}`;
  if (personalFinanceTerms.test(searchText)) return "Personal Finance";
  if (stockTerms.test(searchText)) return "Stock News";
  if (investingTerms.test(searchText)) return "Investing News";
  if (insuranceAndLoanTerms.test(searchText)) return "Insurance / Loans";
  if (article.category === "Tech & AI" || technologyTerms.test(searchText)) {
    return "Technology News";
  }
  if (businessTerms.test(searchText)) return "Business News";
  return "Other News";
}

export function getCoinsForRewardCategory(category: ArticleRewardCategory) {
  return category === "Other News" ? 2 : 3;
}

export async function getArticleRewardDetails(articleId: string) {
  const record = await NewsArticleModel.findOne({ slug: articleId })
    .select("slug title category rewardCategory subtitle trendQuery")
    .lean();
  const article = record
    ? {
        id: record.slug,
        title: record.title,
        category: record.category as NewsCategory,
        rewardCategory: record.rewardCategory as ArticleRewardCategory | undefined,
        subtitle: record.subtitle,
        trendQuery: record.trendQuery,
      }
    : newsResponse.articles.find((item) => item.id === articleId);

  if (!article) return null;

  const category = getArticleRewardCategory(article);
  return {
    articleId,
    title: article.title,
    category,
    coins: getCoinsForRewardCategory(category),
  };
}
