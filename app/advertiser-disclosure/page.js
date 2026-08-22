import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Advertiser Disclosure | GeniusMoneyDaily",
  description: "GeniusMoneyDaily advertiser disclosure and partner relationship details.",
};

const PARTNERS = [
  "Debthunch",
  "Debt Republic",
  "Loanhunch",
  "SafeBetLoans",
  "SafeBetAuto",
  "SafeBetLife",
  "Highwinds",
];

export default function AdvertiserDisclosurePage() {
  return (
    <LegalPageShell title="Advertiser Disclosure">
      <p>
        The content featured across GeniusMoneyDaily.com—including but not limited to articles, rankings, product
        comparison matrices, reviews, tools, calculators, links, and the ordering of featured services—is presented
        as commercial advertising content. GeniusMoneyDaily is compensated by third-party advertising partners when
        readers click on featured links, interact with interactive comparison tools, or complete qualifying partner
        actions (such as submitting an inquiry, applying for a product, or finalizing a purchase).
      </p>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Sponsored Placement & Dynamic Rankings</h2>
        <p>
          Commercial partners may receive prominent placement across our platform. These financial arrangements
          influence how, where, and in what order partners appear on our category pages, article callouts, and
          comparison matrices. While data benchmarks, historical user engagement, and contextual relevance inform
          our layouts, commercial compensation is a primary factor determining partner placement and visual
          highlight across the site.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Editorial Integrity & Research Methodology</h2>
        <p>
          Although GeniusMoneyDaily receives financial compensation from featured partners, our editorial framework
          remains grounded in thorough market research, data verification, and objective evaluation. We aim to
          deliver structured, data-driven financial intelligence, lifestyle insights, and actionable frameworks to
          support our readers&apos; decision-making process. Our evaluation process incorporates independent rate
          tracking, public regulatory documentation, market benchmark monitoring, and hands-on product analysis.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Accuracy & Ongoing Maintenance</h2>
        <p>
          We prioritize maintaining up-to-date and accurate information across all published content and
          interactive calculators. However, financial rates, loan terms, insurance premiums, and partner offers
          change dynamically. When terms shift, our editorial team updates published materials accordingly. If you
          identify outdated or inaccurate information, please notify our editorial staff at:{" "}
          <a href="mailto:info@geniusmoneydaily.com" className="text-brand-teal font-semibold hover:underline">
            info@geniusmoneydaily.com
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Affiliate Relationships</h2>
        <p>
          Select links across GeniusMoneyDaily are tracking links or affiliate links. When you click these links
          and complete a designated action, GeniusMoneyDaily may earn an affiliate commission. This compensation
          occurs at zero additional cost to you and supports our operations, allowing us to deliver our daily
          briefing and platform tools completely free of charge.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Our Current Advertising Partners</h2>
        <p>GeniusMoneyDaily maintains commercial partnerships with the following organizations (listed in no particular order):</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          {PARTNERS.map((partner) => (
            <li key={partner}>{partner}</li>
          ))}
        </ul>
      </div>
    </LegalPageShell>
  );
}
