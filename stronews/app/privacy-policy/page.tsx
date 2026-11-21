import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/legal/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Stronews collects, uses, and protects personal data under applicable privacy standards.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: PolicySection[] = [
  {
    title: "1. Overview and Scope",
    paragraphs: [
      "Stronews ('we', 'us', or 'our') is committed to protecting the privacy of our readers and visitors. This Privacy Policy explains what personal information and device data we collect, how we use it, how we safeguard it, and your legal rights under applicable privacy legislation, including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and Indian data protection standards.",
      "This policy applies to all visitors accessing https://stronews.carecircle-ai.xyz and any associated subdomains, features, or services.",
    ],
  },
  {
    title: "2. Information We Collect",
    paragraphs: [
      "We collect information in three ways: information you provide directly, automated technical information collected during your visit, and information from third-party advertising partners.",
      "(a) Information you provide directly: When you create an account, subscribe to newsletters, submit news tips, submit correction requests, or contact us through our Contact Us form, we collect your name, email address, and any correspondence you submit.",
      "(b) Automated technical data: Like most digital publishing platforms, our web servers and content delivery networks log standard internet protocol data, including your IP address, browser user-agent, operating system, referring URL, pages viewed, time spent on pages, and date/time stamps.",
      "(c) Cookies and web beacons: We and our advertising partners use cookies, local storage, pixel tags, and similar technologies to remember your preferences, keep you logged in, analyze reader traffic, and deliver personalized and non-personalized advertisements.",
    ],
  },
  {
    title: "3. Third-Party Advertising",
    paragraphs: [
      "We use third-party advertising networks, including HilltopAds, Adsterra, Monetag, and A-Ads, to display advertisements. These providers may collect or receive technical data such as IP address, browser details, referring page, and ad interactions, and may use cookies or similar technologies under their own privacy policies.",
      "Advertising providers and the technologies they use may change over time. Please review the applicable provider's privacy policy for details about its data practices and available controls.",
      "You can manage cookies through your browser settings. Depending on your location, you may also have rights to object to or limit certain data processing under applicable privacy laws.",
    ],
  },
  {
    title: "4. Cookies and Tracking Technologies",
    paragraphs: [
      "Cookies are small text files placed on your device to help web services operate efficiently and deliver analytics and advertising:",
      "• Strictly Necessary Cookies: Essential for authentication, security, and session management. You cannot disable these without impairing core site functionality.",
      "• Functional & Performance Cookies: Remember your site preferences, reading history, and saved stories.",
      "• Analytics Cookies: Help us understand reader traffic patterns, popular articles, and technical performance to improve our journalism.",
      "• Advertising Cookies & Web Beacons: Advertising networks may use these technologies to display ads, prevent fraud, limit ad frequency, or measure campaign effectiveness.",
      "You can configure your web browser to block or delete cookies. Please note that disabling cookies may affect your ability to stay logged in or access certain interactive features.",
    ],
  },
  {
    title: "5. How We Use Your Information",
    paragraphs: [
      "We process collected information for legitimate editorial and operational purposes, including:",
      "• Delivering, maintaining, and enhancing our news reporting and digital content.",
      "• Authenticating registered users and securing accounts.",
      "• Responding to editorial inquiries, news tips, and correction requests.",
      "• Monitoring website security, detecting spam, fraud, or unauthorized activities.",
      "• Displaying policy-compliant advertisements to support independent publishing.",
      "• Complying with applicable laws, judicial orders, and regulatory obligations.",
    ],
  },
  {
    title: "6. Data Sharing and Third Parties",
    paragraphs: [
      "We do not sell, rent, or trade your personal contact details to third parties for monetary compensation.",
      "We may share data under the following limited conditions: (a) with technical providers that help operate the website; (b) with advertising networks, including HilltopAds, Adsterra, Monetag, and A-Ads, to deliver and measure advertisements; (c) when required by law or regulatory authorities; or (d) to protect the security, safety, and legal rights of Stronews, our staff, and the public.",
    ],
  },
  {
    title: "7. Your Rights Under GDPR (European Economic Area & UK)",
    paragraphs: [
      "If you reside in the European Economic Area (EEA) or the United Kingdom, you hold specific statutory rights under the General Data Protection Regulation (GDPR), including:",
      "• The right to access and receive a copy of your personal data.",
      "• The right to rectify incomplete or inaccurate personal data.",
      "• The right to request erasure ('right to be forgotten') of your data.",
      "• The right to restrict or object to the processing of your personal information.",
      "• The right to data portability.",
      "• The right to withdraw consent at any time without affecting the lawfulness of processing based on consent prior to its withdrawal.",
      "To exercise these rights, please contact our Data Privacy Officer via our Contact Us page or email privacy@stronews.carecircle-ai.xyz.",
    ],
  },
  {
    title: "8. Your California Privacy Rights (CCPA / CPRA)",
    paragraphs: [
      "Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents are entitled to know what categories of personal information we collect, the business purposes for collection, and the right to request deletion or opt out of the sale or sharing of personal data for cross-context behavioral advertising.",
      "We do not sell personal information for financial compensation. You may opt out of third-party advertising cookies using our Cookie Consent banner or via the DAA WebChoices tool at https://www.aboutads.info/choices.",
    ],
  },
  {
    title: "9. Children's Online Privacy Protection (COPPA)",
    paragraphs: [
      "Stronews is a general audience digital news publication and does not knowingly collect personal data from children under the age of 13 (or under 16 where required by local law). If we become aware that a child has provided us with personal information without parental consent, we will take immediate steps to delete such data.",
    ],
  },
  {
    title: "10. Data Retention and Security",
    paragraphs: [
      "We retain account information for as long as your account remains active. Server logs and analytics records are retained only for the duration necessary for technical troubleshooting and security audits. We employ industry-standard encryption, cryptographic hashing (scrypt/HS256), and security firewalls to protect your information against unauthorized access, alteration, or disclosure.",
    ],
  },
  {
    title: "11. Updates to This Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect new legal requirements, advertising standards, or changes to our editorial operations. The updated policy will always be posted here with an updated effective date.",
    ],
  },
  {
    title: "12. Contact Information",
    paragraphs: [
      "For questions, privacy requests, or data protection inquiries, please contact us:",
      "Email: privacy@stronews.carecircle-ai.xyz (or contact@stronews.carecircle-ai.xyz)",
      "Website: https://stronews.carecircle-ai.xyz/contact-us",
      "Stronews Editorial & Privacy Desk, New Delhi, India.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Compliance & Data Protection"
      title="Privacy Policy"
      description="How Stronews collects, uses, and protects personal data under applicable privacy standards."
      effectiveDate="16 November 2026"
      intro="This Privacy Policy describes our practices regarding the collection, use, and disclosure of personal and technical data when you visit Stronews, including third-party advertising."
      sections={sections}
    />
  );
}
