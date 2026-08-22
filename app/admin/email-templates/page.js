import EmailTemplateBrowser from "@/components/EmailTemplateBrowser";
import {
  getWelcomeEmail,
  getHighYieldEmail,
  getDebtConsolidationEmail,
  getAutoInsuranceEmail,
  getLifeInsuranceEmail,
  getContactAcknowledgementEmail,
  getMatchedOffersEmail,
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
  // Rendered server-side so each template's HTML is computed once here and
  // passed down as plain strings — see lib/emailTemplates.js.
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
      ...getMatchedOffersEmail({ firstName: SAMPLE_NAME, matchedOffers: SAMPLE_MATCHED_OFFERS }),
    },
    {
      id: "matched-offers-empty",
      label: "Matched Offers (No Matches)",
      ...getMatchedOffersEmail({ firstName: SAMPLE_NAME, matchedOffers: [] }),
    },
  ];

  return <EmailTemplateBrowser templates={templates} />;
}
