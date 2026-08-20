import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { fetchArticleBySlug } from "@/lib/fetchArticles";

export async function generateMetadata({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  return {
    title: `${article.title} | GeniusMoneyDaily`,
    description: article.excerpt || "High-authority financial publication & daily insights.",
  };
}

export default async function ArticlePage({ params }) {
  const article = await fetchArticleBySlug(params.slug);

  return (
    <article className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to GeniusMoneyDaily News Hub
          </Link>
          <span className="bg-brand-teal/15 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category || "Financial Brief"}
          </span>
        </div>

        {/* Header content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Author metadata */}
          <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-100 text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-teal font-extrabold flex items-center justify-center text-sm shadow">
                {(article.author || "G")[0]}
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-sm">{article.author || "GeniusMoneyDaily Editors"}</p>
                <p className="text-[11px] text-slate-400">{article.author_role || "Senior Financial Analyst"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-slate-500 text-xs">
              <span>Published: <strong>{article.published_at || "August 19, 2026"}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-teal" /> {article.read_time || "4 min read"}
              </span>
            </div>
          </div>

          {/* Featured Header Image */}
          {article.image_url && (
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-200 mt-6 border border-slate-200 shadow-inner">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-slate max-w-none pt-6 text-slate-700 leading-relaxed text-base sm:text-lg space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content || `
              <p class="text-xl font-medium text-slate-700 leading-relaxed">
                Navigating modern financial markets requires verifiable data, interest rate awareness, and disciplined execution.
              </p>
              <h2 class="text-2xl font-extrabold text-brand-navy mt-8 mb-4">Strategic Wealth Framework</h2>
              <p>
                Whether you are evaluating mortgage refinancing, consolidating credit card liabilities, or optimizing high-yield emergency funds, structured timing dictates your total net savings.
              </p>
              <ul class="list-disc pl-6 space-y-2 font-medium">
                <li><strong>Audit your interest exposure</strong> twice a year to capture lender rate cuts.</li>
                <li><strong>Automate yield optimization</strong> by transferring idle checking balances to high-rate FDIC-insured reserves.</li>
                <li><strong>Leverage tax-advantaged accounts</strong> to shield compounding interest from federal bracket creep.</li>
              </ul>
              <h2 class="text-2xl font-extrabold text-brand-navy mt-8 mb-4">Summary & Next Steps</h2>
              <p>
                Stay ahead of macroeconomic shifts by monitoring daily financial briefings. Actionable execution today protects capital through economic cycles.
              </p>
            ` }}
          />

          {/* CTA Box inside Article */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 sm:p-8 mt-10 border border-brand-navy-light space-y-4">
            <span className="text-xs font-black text-brand-teal uppercase tracking-widest">
              NEXT STEP FOR READERS
            </span>
            <h3 className="text-xl font-bold">
              Ready to optimize your personal loan rates and tax position?
            </h3>
            <p className="text-sm text-slate-300">
              Get your customized daily briefing and rate comparison toolkit completely free.
            </p>
            <div>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Get Your Free Offers
              </Link>
            </div>
          </div>

        </div>

      </div>
    </article>
  );
}
