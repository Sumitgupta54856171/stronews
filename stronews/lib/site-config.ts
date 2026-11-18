export const SITE_URL = "https://stronews.carecircle-ai.xyz";
export const NEWS_PUBLISHER_EMAIL = "stronews@proton.me";

export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX";

export const siteContact = {
  general: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@stronews.carecircle-ai.xyz",
  editorial: process.env.NEXT_PUBLIC_EDITORIAL_EMAIL || "editorial@stronews.carecircle-ai.xyz",
  business: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "business@stronews.carecircle-ai.xyz",
  privacy: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "privacy@stronews.carecircle-ai.xyz",
  backup: "stronews@proton.me",
};

export const siteOrganization = {
  name: "Stronews",
  legalName: "Stronews Digital Media",
  description:
    "Independent digital journalism platform covering technology, policy, markets, sports, and infrastructure.",
  foundingDate: "2024",
  country: "India",
  location: "New Delhi, India",
  editorInChief: "Editorial Desk",
};
