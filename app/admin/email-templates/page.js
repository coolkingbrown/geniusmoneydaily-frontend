import EmailTemplateBrowser from "@/components/EmailTemplateBrowser";
import {
  getWelcomeEmail,
  getHighYieldEmail,
  getDebtConsolidationEmail,
  getAutoInsuranceEmail,
  getLifeInsuranceEmail,
  getContactAcknowledgementEmail,
  getSurveyMatchedOffersEmail,
} from "@/lib/emailTemplates";

export const metadata = {
  title: "Email Template Library | GeniusMoneyDaily Admin",
  robots: { index: false, follow: false },
};

const SAMPLE_NAME = "Alex";
const SAMPLE_MATCHED_OFFERS = [
  { offer_name: "Fast Cash Advance", offer_url: "https://safebetloans.com/" },
  { offer_name: "$250,000 Life Insurance Quote", offer_url: "http://safebetlife.com/" },
];

export default function EmailTemplateLibraryPage() {
  // Rendered server-side because the templates rely on Buffer (Node-only)
  // for the inline logo data URI — see lib/emailTemplates.js.
  const templates = [
    { id: "drip-day1", label: "Day 1 — Welcome", ...getWelcomeEmail({ firstName: SAMPLE_NAME }) },
    { id: "drip-day2", label: "Day 2 — High-Yield APY", ...getHighYieldEmail({ firstName: SAMPLE_NAME }) },
    { id: "drip-day3", label: "Day 3 — Debt Consolidation", ...getDebtConsolidationEmail({ firstName: SAMPLE_NAME }) },
    { id: "drip-day4", label: "Day 4 — Auto Insurance", ...getAutoInsuranceEmail({ firstName: SAMPLE_NAME }) },
    { id: "drip-day5", label: "Day 5 — Life Insurance", ...getLifeInsuranceEmail({ firstName: SAMPLE_NAME }) },
    {
      id: "contact-receipt",
      label: "Contact Receipt",
      ...getContactAcknowledgementEmail({ firstName: SAMPLE_NAME, reasonToConnect: "General Inquiry" }),
    },
    {
      id: "matched-offers",
      label: "Matched Offers",
      ...getSurveyMatchedOffersEmail({ firstName: SAMPLE_NAME, matchedOffers: SAMPLE_MATCHED_OFFERS }),
    },
  ];

  return <EmailTemplateBrowser templates={templates} />;
}
