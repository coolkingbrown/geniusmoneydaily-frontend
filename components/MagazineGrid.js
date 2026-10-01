import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, ArrowUpRight, ChevronRight, Bookmark } from "lucide-react";

const CATEGORY_CHIPS = [
  { label: "Loans", slug: "loans" },
  { label: "Credit", slug: "credit" },
  { label: "Savings", slug: "savings" },
  { label: "Real Estate", slug: "real-estate" },
  { label: "Taxes", slug: "taxes" },
  { label: "Lifestyle", slug: "lifestyle" },
];

function formatVertical(vertical) {
  if (!vertical) return null;
  return vertical
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(dateStr) {
  if (!dateStr) return "Today";
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch (e) {
    return dateStr;
  }
}

export default function MagazineGrid({ articles = [] }) {
  const safeArticles = Array.isArray(articles) ? articles : [];

  // 1. Center Column: Featured Article (Article 0)
  const featuredArticle = safeArticles[0] || null;

  // 2. Left Column: Top Stories (Articles 1 and 2)
  const topStories = safeArticles.slice(1, 3);

  // 3. Right Column: Recently Published (Articles 3, 4, 5)
  // Note: this is the next-most-recently-published articles, not a real
  // "most read" ranking — there is no page-view/analytics tracking
  // anywhere in this codebase to rank by, so "trending" is positional.
  const trendingArticles = safeArticles.slice(3, 6);

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
            <Link href="/" className="px-3 py-1.5 bg-brand-navy text-white rounded-full font-semibold whitespace-nowrap">
              All Stories
            </Link>
            {CATEGORY_CHIPS.map((chip) => (
              <Link
                key={chip.slug}
                href={`/articles/category/${chip.slug}`}
                className="px-3 py-1.5 whitespace-nowrap hover:bg-slate-200 rounded-full transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        {!featuredArticle ? (
          <div className="text-center py-20 text-slate-400 font-semibold">
            No articles published yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Top Stories */}
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
                    key={story.id || story.slug}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={
                          story.featured_image_url ||
                          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {story.vertical && (
                        <span className="absolute top-2 left-2 bg-brand-navy/90 text-brand-teal text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                          {formatVertical(story.vertical)}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">
                        <Link href={`/articles/${story.slug}`}>
                          {story.title}
                        </Link>
                      </h4>
                      <div className="flex items-center justify-end text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {formatDate(story.published_at)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* CENTER COLUMN: Featured Article */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={
                      featuredArticle.featured_image_url ||
                      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop"
                    }
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
                    {featuredArticle.vertical && (
                      <span className="bg-brand-navy/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-md">
                        {formatVertical(featuredArticle.vertical)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{formatDate(featuredArticle.published_at)}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-brand-navy transition-colors leading-tight">
                    <Link href={`/articles/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h3>

                  {featuredArticle.excerpt && (
                    <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  )}

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <Link
                      href={`/articles/${featuredArticle.slug}`}
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

            {/* RIGHT COLUMN: Recently Published */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-brand-teal" /> Recently Published
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">Latest</span>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
                {trendingArticles.map((article, index) => {
                  const numberFormatted = String(index + 1).padStart(2, "0");
                  return (
                    <article
                      key={article.id || article.slug || index}
                      className="p-4 hover:bg-slate-50 transition-colors group flex items-start gap-4"
                    >
                      <span className="text-2xl font-black text-brand-teal group-hover:scale-110 transition-transform flex-shrink-0">
                        {numberFormatted}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {article.vertical && (
                            <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                              {formatVertical(article.vertical)}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            {formatDate(article.published_at)}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-brand-navy transition-colors">
                          <Link href={`/articles/${article.slug}`}>
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
                <h4 className="text-sm font-bold leading-tight text-white">
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
        )}

      </div>
    </section>
  );
}
