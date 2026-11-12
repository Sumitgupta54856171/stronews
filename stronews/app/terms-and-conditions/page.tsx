import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/legal/policy-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms governing access to and use of the Stronews website.",
  alternates: { canonical: "/terms-and-conditions" },
};

const sections: PolicySection[] = [
  {
    title: "1. Website content and information",
    paragraphs: [
      "Content is provided for general information and educational purposes. We aim for accuracy but do not warrant that every article is complete, current, error-free or suitable for every purpose. News and circumstances can change after publication.",
    ],
  },
  {
    title: "2. No professional advice",
    paragraphs: [
      "Nothing on Stronews constitutes personalised financial, investment, legal, medical, tax or other professional advice, or a recommendation to buy, sell or hold any asset or product. Make independent decisions and consult a qualified professional where appropriate. Financial markets and other activities involve risk.",
    ],
  },
  {
    title: "3. Permitted use",
    paragraphs: [
      "You may access and read the website for lawful personal use. You must not misuse the website, attempt unauthorised access, interfere with its operation, introduce malware, scrape or harvest data in a way that violates law or these terms, impersonate another person, or use the website to distribute unlawful or harmful material.",
    ],
  },
  {
    title: "4. Intellectual property",
    paragraphs: [
      "Unless otherwise stated, text, design, logos, graphics and other materials on the website are owned by or licensed to the website operator and are protected by applicable intellectual-property laws. You may not reproduce, republish, distribute or commercially exploit material without prior permission, except where permitted by law. Third-party names, marks and materials remain the property of their respective owners.",
    ],
  },
  {
    title: "5. User communications",
    paragraphs: [
      "If you send us a message, tip, feedback or other material, you confirm that you have the right to provide it. Do not submit unlawful, defamatory, infringing, confidential or malicious material. We may review, decline or remove submissions at our discretion and are not obliged to publish them.",
    ],
  },
  {
    title: "6. Third-party links and services",
    paragraphs: [
      "The website may contain links, advertisements, embedded content or services operated by third parties. We do not control and are not responsible for third-party websites, products, services, claims or policies. Your dealings with third parties are at your own discretion and risk.",
    ],
  },
  {
    title: "7. Advertising and sponsored content",
    paragraphs: [
      "Stronews currently has no third-party advertising providers or affiliate links enabled. If paid or sponsored content is introduced later, it will be identified clearly. Third-party links that readers choose to follow are not endorsements or guarantees by Stronews.",
    ],
  },
  {
    title: "8. Availability and disclaimers",
    paragraphs: [
      "We may change, suspend or discontinue any part of the website at any time. To the extent permitted by law, the website is provided on an as-is and as-available basis, without warranties not expressly required by law.",
    ],
  },
  {
    title: "9. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, the website operator will not be liable for indirect, incidental, special or consequential loss, loss of profits, data or business, or decisions made in reliance on website content. Nothing in these terms excludes liability that cannot legally be excluded.",
    ],
  },
  {
    title: "10. Indemnity",
    paragraphs: [
      "To the extent permitted by law, you agree to be responsible for losses or claims arising from your unlawful use of the website or your violation of these terms or another person's rights.",
    ],
  },
  {
    title: "11. Changes to these terms",
    paragraphs: [
      "We may revise these terms by posting an updated version on this page. Your continued use of the website after changes are posted indicates acceptance of the revised terms, to the extent permitted by law.",
    ],
  },
  {
    title: "12. Governing law",
    paragraphs: [
      "These terms are subject to the laws of India, without prejudice to any mandatory consumer or other protections that apply to you. Any dispute will be handled by courts having jurisdiction under applicable law.",
    ],
  },
  {
    title: "13. Contact",
    paragraphs: [
      "Questions about these terms can be sent using the contact details published on our Contact Us page.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      eyebrow="Terms governing use of Stronews"
      title="Terms & Conditions"
      description="The terms governing access to and use of Stronews."
      effectiveDate="11 November 2026"
      intro="These Terms & Conditions govern your access to and use of Stronews. By accessing or using the website, you agree to these terms. If you do not agree, please do not use the website."
      sections={sections}
    />
  );
}
