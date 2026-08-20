import Link from "next/link";
import Image from "next/image";
import { Clock, TrendingUp, Flame, ArrowUpRight, ChevronRight, Bookmark } from "lucide-react";

export default function MagazineGrid({ articles = [] }) {
  // Separate incoming articles into Top Stories (3), Featured (1), and Trending (5)
  const featuredArticle = articles.find((a) => a.is_featured) || articles[0] || {};
  
  const topStories = articles
    .filter((a) => a.id !== featuredArticle.id && a.image_url)
    .slice(0, 3);

  const trendingArticles = articles
    .filter((a) => a.id !== featuredArticle.id && !topStories.some((ts) => ts.id === a.id))
    .slice(0, 5);

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b-2 border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-brand-teal rounded-full" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight uppercase">
              Financial Magazine Hub
            </h2>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 text-xs font-bold text-slate-600">
            <span className="text-slate-400 uppercase tracking-wider text-[10px] mr-1">Filter:</span>
            <Link href="/" className="px-3 py-1.5 bg-brand-navy text-white rounded-full font-semibold">
              All Stories
            </Link>
            <Link href="/category/loans" className="px-3 py-1.5 hover:bg-slate-200 rounded-full transition-colors">
              Loans
            </Link>
            <Link href="/category/credit" className="px-3 py-1.5 hover:bg-slate-200 rounded-full transition-colors">
              Credit
            </Link>
            <Link href="/category/savings" className="px-3 py-1.5 hover:bg-slate-200 rounded-full transition-colors">
              Savings
            </Link>
            <Link href="/category/real-estate" className="px-3 py-1.5 hover:bg-slate-200 rounded-full transition-colors">
              Real Estate
            </Link>
            <Link href="/category/taxes" className="px-3 py-1.5 hover:bg-slate-200 rounded-full transition-colors">
              Taxes
            </Link>
          </div>
        </div>

        {/* 3-Column News Hub Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Top Stories (3 compact vertical cards with small thumbnails) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-300">
              <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-brand-teal" /> Top Stories
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">Curated</span>
            </div>

            <div className="space-y-6">
              {topStories.map((story) => (
                <article
                  key={story.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-slate-200">
                    <Image
                      src={story.image_url || "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-brand-navy/90 text-brand-teal text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                      {story.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">
                      <Link href={`/article/${story.slug}`}>
                        {story.title}
                      </Link>
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {story.read_time || "3 min read"}
                      </span>
                      <span>{story.published_at || "Today"}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: Featured Article (1 large primary card with wide hero image, large headline, excerpt) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group">
              <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                <Image
                  src={featuredArticle.image_url || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop"}
                  alt={featuredArticle.title || "Featured Financial Story"}
                  fill
                  priority
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-brand-teal text-brand-navy text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                    FEATURED REPORT
                  </span>
                  <span className="bg-brand-navy/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-md">
                    {featuredArticle.category || "Loans"}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-semibold text-brand-navy">By {featuredArticle.author || "Elena Rostova"}</span>
                  <span>•</span>
                  <span>{featuredArticle.published_at || "August 19, 2026"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-brand-teal" />
                    {featuredArticle.read_time || "5 min read"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-brand-navy transition-colors leading-tight">
                  <Link href={`/article/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h3>

                <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <Link
                    href={`/article/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-navy group-hover:text-brand-teal transition-colors"
                  >
                    <span>Read Full Feature</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-teal" />
                  </Link>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    GENIUS INSIGHTS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Trending (Minimalist list of 5 text-only headlines with numbering) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-300">
              <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-brand-teal" /> Trending Briefs
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">Most Read</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
              {trendingArticles.map((article, index) => {
                const numberFormatted = String(index + 1).padStart(2, "0");
                return (
                  <article
                    key={article.id || index}
                    className="p-4 hover:bg-slate-50 transition-colors group flex items-start gap-4"
                  >
                    <span className="text-2xl font-black text-brand-teal group-hover:scale-110 transition-transform flex-shrink-0">
                      {numberFormatted}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                          {article.category || "Finance"}
                        </span>
                        <span className="text-[10px] text-slate-400">{article.reads || "8.5k reads"}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-brand-navy transition-colors">
                        <Link href={`/article/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Quick Financial Newsletter Mini Prompt */}
            <div className="bg-brand-navy rounded-xl p-5 text-white space-y-3 shadow-md">
              <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                Daily Market Alert
              </span>
              <h4 className="text-sm font-bold leading-tight">
                Get rate cuts & credit updates sent to your inbox every morning.
              </h4>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center w-full bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold py-2.5 rounded-lg transition-colors gap-1"
              >
                <span>Subscribe Free</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
