import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPublishedArticles } from "@/lib/blogArticles";

export const metadata = {
  title: "Articles | GeniusMoneyDaily",
  description:
    "Browse the latest financial insights, rate updates, and money-saving strategies from GeniusMoneyDaily.",
};

const VERTICALS = [
  { label: "Loans", slug: "loans" },
  { label: "Credit", slug: "credit" },
  { label: "Savings", slug: "savings" },
  { label: "Real Estate", slug: "real-estate" },
  { label: "Taxes", slug: "taxes" },
  { label: "Lifestyle", slug: "lifestyle" },
];

export default async function ArticlesHubPage({ searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page, 10) || 1);
  const { articles, totalPages } = await getPublishedArticles({ page });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-brand-navy-light shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="bg-brand-teal text-brand-navy text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
              GMD Articles
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Financial Insights &amp; Daily Briefings
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Verified rate updates, strategy breakdowns, and consumer advice across every financial vertical.
            </p>
          </div>
        </div>

        {/* Vertical filter bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold text-slate-600">
          <Link href="/articles" className="px-3.5 py-1.5 whitespace-nowrap bg-brand-navy text-white rounded-full font-semibold">
            All Articles
          </Link>
          {VERTICALS.map((v) => (
            <Link
              key={v.slug}
              href={`/articles/category/${v.slug}`}
              className="px-3.5 py-1.5 whitespace-nowrap hover:bg-slate-200 rounded-full transition-colors"
            >
              {v.label}
            </Link>
          ))}
        </div>

        {/* Article grid */}
        {articles.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-semibold">
            No articles published yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} basePath="/articles" />
      </div>
    </div>
  );
}
