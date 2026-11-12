import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/legal/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Stronews collects, uses, discloses and protects information when you visit the website.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: PolicySection[] = [
  {
    title: "1. Information we may collect",
    paragraphs: [
      "Depending on how you use the website, we may collect: (a) information you choose to provide, such as your name, email address and message when you contact us; (b) technical and usage information, such as IP address, browser type, device information, pages viewed, referring pages, approximate location derived from IP address and timestamps; and (c) cookie or similar technology information, where enabled.",
    ],
  },
  {
    title: "2. How we use information",
    paragraphs: [
      "We may use information to operate, maintain and secure the website; respond to enquiries; understand readership and improve content and performance; detect spam, abuse or technical problems; comply with legal obligations; and protect our rights and users.",
    ],
  },
  {
    title: "3. Cookies and similar technologies",
    paragraphs: [
      "The website may use cookies, local storage or similar technologies for essential functionality and preferences. You can manage cookies through your browser settings. Blocking some cookies may affect website functionality. If required by applicable law, we will provide a consent mechanism before using non-essential cookies or similar technologies.",
    ],
  },
  {
    title: "4. Advertising and third-party services",
    paragraphs: [
      "Stronews currently has no third-party advertising providers enabled. If advertising is introduced later, this policy will be updated to identify relevant data practices. Third-party analytics, video, social-media or embedded-content providers may collect information when their features are used; their privacy practices are governed by their own policies.",
    ],
  },
  {
    title: "5. Sharing of information",
    paragraphs: [
      "We do not sell personal information in exchange for money. We may share information with service providers that help operate the website, professional advisers, law-enforcement or government authorities where legally required, or other parties in connection with a business transfer or to protect rights and safety. We aim to limit sharing to what is reasonably necessary.",
    ],
  },
  {
    title: "6. Data retention and security",
    paragraphs: [
      "We retain information for as long as reasonably necessary for the purposes described in this policy, unless a longer period is required by law. We use reasonable administrative and technical safeguards, but no internet transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "7. Your choices and rights",
    paragraphs: [
      "Depending on your location and applicable law, you may have rights to request access to, correction of or deletion of personal information, object to or restrict certain processing, withdraw consent, or raise a complaint with a relevant authority. To make a request, contact us using the details on our Contact Us page. We may need to verify your request.",
    ],
  },
  {
    title: "8. Children's privacy",
    paragraphs: [
      "The website is not intended to knowingly collect personal information from children in circumstances where parental consent is required. If you believe a child has provided personal information improperly, contact us so we can review the matter.",
    ],
  },
  {
    title: "9. External links",
    paragraphs: [
      "Our website may link to third-party websites. We are not responsible for their content, security or privacy practices. Review their policies before providing information.",
    ],
  },
  {
    title: "10. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated effective date.",
    ],
  },
  {
    title: "11. Contact us",
    paragraphs: [
      "For privacy questions or requests, use the contact details published on our Contact Us page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="How Stronews handles information"
      title="Privacy Policy"
      description="How Stronews collects, uses, discloses and protects information when you visit the website."
      effectiveDate="11 November 2026"
      intro="This Privacy Policy explains how Stronews (we, us or our) may collect, use, disclose and protect information when you visit our website."
      sections={sections}
    />
  );
}
