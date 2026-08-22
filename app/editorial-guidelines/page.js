import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Editorial Guidelines | GeniusMoneyDaily",
  description: "GeniusMoneyDaily editorial standards, fact-checking policies, and journalistic principles.",
};

export default function EditorialGuidelinesPage() {
  return (
    <LegalPageShell title="Editorial Guidelines">
      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Fact-Checking & Accuracy Standards</h2>
        <p>
          Accuracy is the cornerstone of everything we publish at GeniusMoneyDaily. To ensure our content remains
          factual, complete, and free from external spin, every story undergoes a multi-tier editorial review
          process before going live. Content is evaluated by experienced senior editors to verify data points, rate
          benchmarks, and underlying sources. Our team of financial journalists and consumer experts brings decades
          of collective industry experience across personal finance, markets, and lifestyle analysis. Additionally,
          our editorial library is periodically audited and refreshed to ensure legacy guides reflect current
          interest rates, tax laws, and market dynamics.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Ethics & Journalistic Independence</h2>
        <p>
          GeniusMoneyDaily operates under strict journalistic standards. Our editorial team works independently
          from commercial influences. Writers and editors do not receive third-party commissions or direct
          incentives from financial partners for coverage. We are committed to publishing unbiased, educational,
          and engaging content designed solely to serve the financial health and lifestyle priorities of our
          readers.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Transparent Corrections Policy</h2>
        <p>
          We hold ourselves accountable for the accuracy of our reporting. When a factual error is identified, we
          promptly correct it and include a clear, prominent update notice alongside the revised content. We
          encourage our readers to submit correction feedback or flag outdated information by reaching out via our{" "}
          <a href="/contact" className="text-brand-teal font-semibold hover:underline">
            direct contact page
          </a>{" "}
          or emailing our team at{" "}
          <a href="mailto:info@geniusmoneydaily.com" className="text-brand-teal font-semibold hover:underline">
            info@geniusmoneydaily.com
          </a>
          .
        </p>
      </div>
    </LegalPageShell>
  );
}
