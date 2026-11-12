export const SITE_URL = "https://stronews.carecircle-ai.xyz";
export const NEWS_PUBLISHER_EMAIL = "stronews@proton.me";

export const siteContact = {
  general: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  editorial: process.env.NEXT_PUBLIC_EDITORIAL_EMAIL ?? "",
  business: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "",
  privacy: process.env.NEXT_PUBLIC_PRIVACY_EMAIL ?? "",
};
