import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getArticleBySlug } from "@/lib/blogArticles";
import ArticleBody from "@/components/ArticleBody";
import OfferCTA from "@/components/OfferCTA";

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  const title = article.meta_title || `${article.title} | GeniusMoneyDaily`;
  const description = article.meta_description || article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: article.featured_image_url ? [article.featured_image_url] : undefined,
    },
  };
}

function parseSchemaMarkup(schema) {
  if (!schema) return null;
  if (typeof schema === "object") return schema;
  try {
    return JSON.parse(schema);
  } catch {
    return null;
  }
}

export default async function BlogArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const offers = Array.isArray(article.offer_links) ? article.offer_links : [];
  const hasStickyOffer = offers.some((o) => o.zone === "sticky-bar");
  const jsonLd = parseSchemaMarkup(article.schema_markup);

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className={`min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 ${hasStickyOffer ? "pb-28 lg:pb-10" : ""}`}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/articles" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors">
            <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to Articles
          </Link>
          {article.vertical && (
            <span className="bg-brand-teal/15 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.vertical.replace(/-/g, " ")}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-lg text-slate-600 font-medium leading-relaxed">{article.excerpt}</p>
              )}

              {formattedDate && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-4 border-t border-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-brand-teal" /> Published {formattedDate}
                </div>
              )}
            </div>

            {article.featured_image_url && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-inner">
                <Image
                  src={article.featured_image_url}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <ArticleBody html={article.body_content} />

            <OfferCTA offers={offers} zone="inline" />
            <OfferCTA offers={offers} zone="footer-cta" />
          </article>

          <aside className="lg:col-span-4">
            <OfferCTA offers={offers} zone="sidebar" />
          </aside>
        </div>
      </div>

      <OfferCTA offers={offers} zone="sticky-bar" />
    </div>
  );
}
