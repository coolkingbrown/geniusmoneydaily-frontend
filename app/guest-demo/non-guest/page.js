import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import ArticleBody from "@/components/ArticleBody";
import ArticleByline from "@/components/ArticleByline";
import ArticleDisclaimer from "@/components/ArticleDisclaimer";
import GuestArticleFrame from "@/components/GuestArticleFrame";
import GuestDisclosureNote from "@/components/GuestDisclosureNote";
import OfferCTA from "@/components/OfferCTA";
import { verticalLabel } from "@/lib/verticals";
import { MOCK_NON_GUEST_ARTICLE } from "../mockData";

export const metadata = {
  title: "[Demo] Normal Non-Guest Article | GeniusMoneyDaily",
  robots: { index: false, follow: false },
};

// Demo-only — mirrors app/articles/[slug]/page.js's logic exactly, with
// mock data standing in for the two Supabase fetches, so Randy can review
// the real rendering logic on the preview without needing live guest data.
export default function GuestDemoNonGuest() {
  const article = MOCK_NON_GUEST_ARTICLE;
  const guestAuthor = null;
  const offers = [];
  const hasStickyOffer = false;

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const isGuest = Boolean(article.is_guest);
  const showGuestByline = isGuest && Boolean(guestAuthor);
  const frameDisclosures = Array.isArray(article.frame_disclosures) ? article.frame_disclosures : [];

  return (
    <div className={`min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 ${hasStickyOffer ? "pb-28 lg:pb-10" : ""}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-brand-teal/15 text-emerald-800 text-xs font-extrabold px-3 py-2 rounded-lg text-center uppercase tracking-wider">
          Demo page — mock data, not indexed — normal article, zero guest UI
        </div>

        <div className="flex items-center justify-between">
          <Link href="/articles" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors">
            <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to Articles
          </Link>
          {article.vertical && (
            <span className="bg-brand-teal/15 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {verticalLabel(article.vertical)}
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
              {showGuestByline ? (
                <ArticleByline author={guestAuthor} publishedAt={article.published_at} />
              ) : (
                formattedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-4 border-t border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-brand-teal" /> Published {formattedDate}
                  </div>
                )
              )}
            </div>

            {article.featured_image_url && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-inner">
                <Image src={article.featured_image_url} alt={article.title} fill priority className="object-cover" />
              </div>
            )}

            <ArticleBody html={article.body_content} />

            <ArticleDisclaimer
              sources={article.sources}
              disclaimerNote={isGuest ? null : article.disclaimer_note}
              sourcesHeading={isGuest ? "Sources" : undefined}
            />

            {isGuest && (
              <>
                <GuestArticleFrame disclosures={frameDisclosures} author={guestAuthor} />
                <GuestDisclosureNote isPaid={Boolean(guestAuthor?.paid_placement)} />
              </>
            )}

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
