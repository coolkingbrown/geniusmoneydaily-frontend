import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Bookmark } from "lucide-react";
import { fetchPublishedArticles } from "@/lib/fetchArticles";

function toTitleCase(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params }) {
  const categoryLabel = toTitleCase(params.category);
  const allArticles = await fetchPublishedArticles();
  
  const filteredArticles = allArticles.filter(
    (a) => a.category?.toLowerCase() === params.category.toLowerCase().replace("-", " ") ||
           a.category?.toLowerCase().includes(params.category.toLowerCase())
  );

  const displayArticles = filteredArticles.length > 0 ? filteredArticles : allArticles;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy">
            <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to News Hub
          </Link>
          <span className="text-xs text-slate-400 font-medium">GeniusMoneyDaily Category Hub</span>
        </div>

        {/* Category Header */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-brand-navy-light shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="bg-brand-teal text-brand-navy text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
              {categoryLabel} Intelligence
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Latest {categoryLabel} News & Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Verified market updates, rates, analytical reports, and consumer advice for {categoryLabel.toLowerCase()}.
            </p>
          </div>
        </div>

        {/* Category Article List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={article.image_url || "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-brand-navy text-brand-teal text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase shadow-sm">
                    {article.category || categoryLabel}
                  </span>
                </div>
                
                <div className="p-6 space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-navy transition-colors">
                    <Link href={`/article/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-brand-teal" />
                  {article.read_time || "4 min read"}
                </span>
                <Link
                  href={`/article/${article.slug}`}
                  className="font-extrabold text-brand-navy hover:text-brand-teal transition-colors"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
