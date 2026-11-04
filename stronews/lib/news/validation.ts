import type { CreateNewsInput, NewsCategory, NewsSection } from "@/lib/news/types";

const categories: NewsCategory[] = [
  "Tech & AI",
  "India & Infra",
  "Cricket & Sports",
  "Cinema & OTT",
  "Markets & Policy",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, field: string, maximum = 5000): string {
  if (typeof value !== "string" || !value.trim() || value.length > maximum) {
    throw new Error(`${field} is required and must be under ${maximum} characters.`);
  }
  return value.trim();
}

function readStringList(value: unknown, field: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    throw new Error(`${field} must be a list of text values.`);
  }
  return value.map((entry) => entry.trim()).filter(Boolean).slice(0, 12);
}

export function parseCreateNewsInput(
  value: unknown,
  image: string,
  sectionImages: string[] = [],
): CreateNewsInput {
  if (!isRecord(value)) throw new Error("A JSON news article is required.");
  if (typeof value.category !== "string" || !categories.includes(value.category as NewsCategory)) {
    throw new Error("Choose a valid news category.");
  }
  if (!isRecord(value.author) || !isRecord(value.keyStat)) {
    throw new Error("Author and key figure details are required.");
  }

  if (!/^\/api\/news\/images\/[a-f0-9]{24}$/.test(image)) {
    throw new Error("Upload a valid story image file.");
  }

  const rawSections = value.sections === undefined ? [] : value.sections;
  if (!Array.isArray(rawSections) || rawSections.length > 30) {
    throw new Error("A story can contain up to 30 sections.");
  }
  const sections: NewsSection[] = rawSections.map((section, index) => {
    if (!isRecord(section)) throw new Error(`Section ${index + 1} is invalid.`);
    const rawMediaUrl = section.mediaUrl;
    let mediaUrl = "";
    if (typeof rawMediaUrl === "string" && rawMediaUrl.trim()) {
      try {
        const parsedUrl = new URL(rawMediaUrl.trim());
        if (parsedUrl.protocol !== "https:") throw new Error();
        mediaUrl = parsedUrl.toString();
      } catch {
        throw new Error(`Section ${index + 1} media link must be a valid HTTPS URL.`);
      }
    }
    return {
      paragraphs: readStringList(section.paragraphs, `Section ${index + 1} paragraphs`),
      image: sectionImages[index] ?? "",
      mediaUrl,
    };
  });

  return {
    title: readString(value.title, "Title", 180),
    category: value.category as NewsCategory,
    isBreaking: value.isBreaking === true,
    trendQuery: readString(value.trendQuery || value.title, "Trend query", 180),
    trendSpike: "+0%",
    readTime: "3 min read",
    subtitle: readString(value.subtitle, "Subtitle", 500),
    image,
    author: {
      name: readString(value.author.name, "Author name", 100),
      role: typeof value.author.role === "string" && value.author.role.trim()
        ? value.author.role.trim().slice(0, 120)
        : "Staff writer",
      avatar: "",
    },
    keyStat: {
      value: typeof value.keyStat.value === "string" ? value.keyStat.value.trim().slice(0, 40) : "",
      label: typeof value.keyStat.label === "string" ? value.keyStat.label.trim().slice(0, 100) : "",
    },
    aiSummary: readStringList(value.aiSummary, "Summary"),
    sixtyWordSummary: typeof value.sixtyWordSummary === "string"
      ? value.sixtyWordSummary.trim().slice(0, 1200)
      : "",
    bodyParagraphs: readStringList(value.bodyParagraphs, "Body paragraphs"),
    sections,
  };
}

export function makeNewsSlug(title: string) {
  const normalized = title.normalize("NFKD").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
  return `${normalized || "news"}-${Date.now().toString(36)}`;
}