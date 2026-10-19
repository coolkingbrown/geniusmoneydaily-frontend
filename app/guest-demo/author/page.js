import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import AuthorAvatar from "@/components/AuthorAvatar";
import { MOCK_AUTHOR, MOCK_SYNDICATED_ARTICLE } from "../mockData";

export const metadata = {
  title: "[Demo] Guest Author Page | GeniusMoneyDaily",
  robots: { index: false, follow: false },
};

// Demo-only — mirrors app/authors/[slug]/page.js's logic exactly, with
// mock data in place of the Supabase fetches.
export default function GuestDemoAuthorPage() {
  const author = MOCK_AUTHOR;
  const articles = [MOCK_SYNDICATED_ARTICLE];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-brand-teal/15 text-emerald-800 text-xs font-extrabold px-3 py-2 rounded-lg text-center uppercase tracking-wider">
          Demo page — mock data, not indexed — real route is /authors/coopers-accounting
        </div>

        <Link href="/articles" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors">
          <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to Articles
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <AuthorAvatar author={author} size={96} />
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">{author.name}</h1>
              {author.title_line && <p className="text-sm font-semibold text-slate-500">{author.title_line}</p>}
              {author.summary && <p className="text-sm text-slate-600 leading-relaxed">{author.summary}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Articles by {author.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
