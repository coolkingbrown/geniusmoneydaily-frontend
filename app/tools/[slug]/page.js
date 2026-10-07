import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getToolConfig, TOOL_SLUGS } from "@/lib/toolsConfig";
import { parseToolParams } from "@/lib/toolParams";
import { getFredRates } from "@/lib/fredRates";

export async function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const tool = getToolConfig(params.slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: "website",
      url: `/tools/${tool.slug}`,
    },
  };
}

function formatAsOfDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default async function ToolPage({ params, searchParams }) {
  const tool = getToolConfig(params.slug);

  if (!tool) {
    notFound();
  }

  const initialValues = parseToolParams(tool, searchParams || {});
  const ToolComponent = tool.Component;
  const { content } = tool;

  // Only tools with a live-data source (currently Mortgage & Refi) need an
  // extra fetch for the as-of date shown in the Sources section.
  const hasLiveSource = content.sources.some((s) => s.live);
  const liveRates = hasLiveSource ? await getFredRates() : null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: `https://www.geniusmoneydaily.com/tools/${tool.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-teal" /> All Calculators
        </Link>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">{tool.title}</h1>
          <p className="text-lg text-slate-600">{tool.dek}</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <ToolComponent initialValues={initialValues} />
        </div>

        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 article-body">
          <h2>How to Use This Calculator</h2>
          {content.howItUse.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <h2>What the Inputs Mean</h2>
          <ul>
            {content.inputsExplained.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.text}
              </li>
            ))}
          </ul>

          <h2>Assumptions &amp; Formula</h2>
          <ul>
            {content.assumptions.map((assumption, i) => (
              <li key={i}>{assumption}</li>
            ))}
          </ul>
          <p>
            <strong>Formula:</strong> {content.formula}
          </p>

          <h2>Worked Example</h2>
          <p>{content.workedExample}</p>

          <h2>Frequently Asked Questions</h2>
          {content.faqs.map((faq) => (
            <div key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}

          <h2>Sources</h2>
          <ul>
            {content.sources.map((source) => (
              <li key={source.name}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.name}
                  </a>
                ) : (
                  source.name
                )}
                {source.text ? ` — ${source.text}` : ""}
                {source.live && liveRates?.mortgage30yAsOf && (
                  <> (as of {formatAsOfDate(liveRates.mortgage30yAsOf)})</>
                )}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
