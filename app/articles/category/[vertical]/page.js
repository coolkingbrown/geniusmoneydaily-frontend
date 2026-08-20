import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPublishedArticles } from "@/lib/blogArticles";

const VERTICAL_LABELS = {
  loans: "Loans",
  credit: "Credit",
  savings: "Savings",
  "real-estate": "Real Estate",
  taxes: "Taxes",
  lifestyle: "Lifestyle",
};

function labelFor(vertical) {
  return VERTICAL_LABELS[vertical] || vertical.replace(/-/g, " ");
}

export async function generateMetadata({ params }) {
  const label = labelFor(params.vertical);
  return {
    title: `${label} Articles | GeniusMoneyDaily`,
    description: `Latest ${label.toLowerCase()} news, rate updates, and strategies from GeniusMoneyDaily.`,
  };
}

export default async function ArticlesCategoryPage({ params, searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page, 10) || 1);
  const label = labelFor(params.vertical);
  const { articles, totalPages } = await getPublishedArticles({ page, vertical: params.vertical });
  const basePath = `/articles/category/${params.vertical}`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link href="/articles" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors">
          <ArrowLeft className="w-4 h-4 text-brand-teal" /> All Articles
        </Link>

        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-brand-navy-light shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="bg-brand-teal text-brand-navy text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
              {label} Intelligence
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Latest {label} News &amp; Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Verified market updates, rates, analytical reports, and consumer advice for {label.toLowerCase()}.
            </p>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-semibold">
            No {label.toLowerCase()} articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} basePath={basePath} />
      </div>
    </div>
  );
}
