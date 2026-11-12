import type { Metadata } from "next";
import PolicyPage, { type PolicySection } from "@/components/legal/policy-page";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "The standards Stronews aims to follow when selecting, researching, writing, editing and updating content.",
  alternates: { canonical: "/editorial-policy" },
};

const sections: PolicySection[] = [
  {
    title: "1. Editorial principles",
    paragraphs: [
      "We aim to value accuracy, fairness, independence, clarity, accountability and public interest. We seek to distinguish verified facts from analysis, commentary, predictions and opinion.",
    ],
  },
  {
    title: "2. Research and verification",
    paragraphs: [
      "Writers and editors should use credible and relevant sources, verify important claims where reasonably possible, and seek primary documents or direct sources when available. Significant claims should not rely solely on anonymous or unverified social-media posts. Where information cannot be independently confirmed, the article should make that limitation clear.",
    ],
  },
  {
    title: "3. Sources and attribution",
    paragraphs: [
      "We aim to identify sources and link to original material where practical. Quotes, data, images and other third-party material should be used lawfully and attributed where required. We do not knowingly present another publisher's work as our own.",
    ],
  },
  {
    title: "4. Breaking news and developing stories",
    paragraphs: [
      "Early reports may be incomplete. We aim to label developing information appropriately, update articles as reliable details emerge and correct material errors. We will avoid presenting rumours or speculation as confirmed facts.",
    ],
  },
  {
    title: "5. Headlines, images and presentation",
    paragraphs: [
      "Headlines, thumbnails and captions should accurately represent the article and must not deliberately mislead readers. Images should be authentic to the story or clearly identified as illustrative, archival, edited or AI-generated where that distinction could matter to readers.",
    ],
  },
  {
    title: "6. Opinion, analysis and sponsored content",
    paragraphs: [
      "Opinion and analysis should be distinguishable from straight reporting. Paid, sponsored or affiliate content should be clearly disclosed. Advertisers and commercial partners do not have the right to dictate independent editorial conclusions.",
    ],
  },
  {
    title: "7. Conflicts of interest",
    paragraphs: [
      "Contributors should disclose relevant financial, personal or professional interests that could reasonably affect coverage. Where a conflict cannot be managed, the contributor should not handle that story.",
    ],
  },
  {
    title: "8. Privacy, dignity and sensitive coverage",
    paragraphs: [
      "We aim to respect privacy and avoid unnecessary harm, especially when reporting on children, victims, private individuals and sensitive events. Public interest, relevance, verification and applicable law should be considered before identifying individuals or publishing sensitive details.",
    ],
  },
  {
    title: "9. Corrections and updates",
    paragraphs: [
      "Readers can report possible errors through our Contact Us page. We review credible correction requests and, when a material error is confirmed, correct the article and provide an appropriate note or update where practical. We may update minor errors without a separate note when that is clearer for readers.",
    ],
  },
  {
    title: "10. User-generated material",
    paragraphs: [
      "Comments, tips, photos or submissions from readers may be reviewed before publication. Submission does not guarantee publication. We may decline or remove material that is unlawful, abusive, misleading, defamatory, infringing or otherwise unsuitable.",
    ],
  },
  {
    title: "11. Use of AI tools",
    paragraphs: [
      "AI tools may be used to assist with research, translation, transcription, drafting or production. Human review remains important: contributors should verify factual claims, quotations, figures and sources before publication. AI-generated material must not be knowingly presented as verified reporting, and synthetic images or media should be labelled when readers could reasonably mistake them for documentary evidence.",
    ],
  },
  {
    title: "12. Accountability",
    paragraphs: [
      "We welcome reader feedback about our standards and published work. Editorial concerns and correction requests may be sent through our Contact Us page.",
    ],
  },
];

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Our standards for reporting, writing and corrections"
      title="Editorial Policy"
      description="The standards Stronews aims to follow when selecting, researching, writing, editing and updating content."
      effectiveDate="11 November 2026"
      intro="This Editorial Policy describes the standards Stronews aims to follow when selecting, researching, writing, editing and updating content. It applies to editorial material published on the website."
      sections={sections}
    />
  );
}
