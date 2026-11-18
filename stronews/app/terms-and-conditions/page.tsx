import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/legal/policy-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms governing access to and use of the Stronews website.",
  alternates: { canonical: "/terms-and-conditions" },
};

const sections: PolicySection[] = [
  {
    title: "1. Website Content and General Information",
    paragraphs: [
      "Stronews provides news reporting, explainers, industry updates, and analysis for general informational and educational purposes. While we strive for accuracy, currency, and editorial excellence, we do not guarantee that every article is entirely free of typographical errors or that breaking events will not evolve after publication.",
    ],
  },
  {
    title: "2. No Professional or Financial Advice",
    paragraphs: [
      "No material published on Stronews constitutes personalized investment, financial, legal, tax, medical, or other professional advice. Readers should exercise independent judgment and consult certified professional advisers before making significant financial, legal, or investment decisions. Markets and financial assets involve risk.",
    ],
  },
  {
    title: "3. Permitted and Prohibited Use",
    paragraphs: [
      "You are granted a non-exclusive, non-transferable license to access and read the website for personal, non-commercial use.",
      "You agree not to: (a) engage in automated data scraping, harvesting, or bulk extraction without express written consent; (b) disrupt or overload website infrastructure; (c) bypass access controls or security measures; (d) introduce viruses, malware, or malicious code; or (e) use the website to distribute unlawful, defamatory, or abusive material.",
    ],
  },
  {
    title: "4. Intellectual Property Rights",
    paragraphs: [
      "All text, graphics, logos, user interfaces, layouts, and software on Stronews are the property of Stronews or its content licensors and are protected under Indian and international copyright and intellectual property laws. Unauthorized reproduction, re-syndication, or commercial exploitation is strictly prohibited without prior written authorization.",
    ],
  },
  {
    title: "5. User Communications, Tips, and Submissions",
    paragraphs: [
      "When you submit news tips, corrections, or feedback, you warrant that you possess the lawful right to transmit such information. We reserve the right to review, edit, verify, or decline any submitted material. Submissions do not create an employment, agency, or confidential fiduciary relationship.",
    ],
  },
  {
    title: "6. Third-Party Links and External Content",
    paragraphs: [
      "Our website contains links to third-party websites, source documents, and external references. We do not endorse, supervise, or assume responsibility for external web content, terms of service, or privacy practices. Following external links is done at your own discretion.",
    ],
  },
  {
    title: "7. Third-Party Advertising and Commercial Disclosures",
    paragraphs: [
      "Stronews displays advertisements served by third-party advertising partners, including Google AdSense. These third-party ad networks may use cookies and tracking beacons to serve relevant advertisements according to industry standards.",
      "Editorial Independence: Commercial advertising, sponsored placements, and affiliate relationships do not influence our editorial coverage, headline selection, or journalistic conclusions. All advertisements are clearly distinguished from editorial news stories with appropriate labels.",
      "Transactions or interactions with third-party advertisers found on Stronews are solely between you and the respective advertiser.",
    ],
  },
  {
    title: "8. Availability and Disclaimers",
    paragraphs: [
      "We reserve the right to modify, suspend, or discontinue any feature, article, or service on the website at any time without notice. The website is provided on an 'as-is' and 'as-available' basis without warranties of any kind, whether express, implied, or statutory.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by applicable law, Stronews, its editors, journalists, and officers shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the website, or reliance on any information published.",
    ],
  },
  {
    title: "10. Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless Stronews, its staff, and affiliates from any claims, damages, liabilities, and expenses arising out of your violation of these Terms & Conditions or unlawful use of the platform.",
    ],
  },
  {
    title: "11. Governing Law and Jurisdiction",
    paragraphs: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of India. Any legal dispute or proceeding arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.",
    ],
  },
  {
    title: "12. Contact and Inquiries",
    paragraphs: [
      "If you have questions or concerns regarding these Terms & Conditions, please contact us at legal@stronews.carecircle-ai.xyz or visit our Contact Us page.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      eyebrow="Terms of Service"
      title="Terms & Conditions"
      description="The terms governing access to and use of Stronews."
      effectiveDate="16 November 2026"
      intro="These Terms & Conditions govern your access to and use of Stronews. By browsing, reading, or creating an account on the website, you agree to comply with and be bound by these terms."
      sections={sections}
    />
  );
}
