import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getGuestAuthorBySlug } from "@/lib/guestAuthors";
import { getArticlesByGuestAuthorId } from "@/lib/blogArticles";
import ArticleCard from "@/components/ArticleCard";
import AuthorAvatar from "@/components/AuthorAvatar";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }) {
  const author = await getGuestAuthorBySlug(params.slug);
  if (!author) return {};

  const title = `${author.name} | GeniusMoneyDaily`;
  const description = author.summary || `Articles by ${author.name} on GeniusMoneyDaily.`;

  return {
    title,
    description,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/authors/${author.slug}`,
      images: author.image_url ? [author.image_url] : undefined,
    },
  };
}

export default async function GuestAuthorPage({ params }) {
  const author = await getGuestAuthorBySlug(params.slug);

  if (!author) {
    notFound();
  }

  const articles = await getArticlesByGuestAuthorId(author.id);
  const isOrganization = author.author_type === "organization";

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": isOrganization ? "Organization" : "Person",
    "@id": `${SITE_URL}/authors/${author.slug}`,
    name: author.name,
    url: `${SITE_URL}/authors/${author.slug}`,
    ...(author.image_url ? { image: author.image_url } : {}),
    ...(author.summary ? { description: author.summary } : {}),
    ...(author.title_line ? { jobTitle: author.title_line } : {}),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }} />

      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to Articles
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <AuthorAvatar author={author} size={96} />

            <div className="flex-1 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">{author.name}</h1>
              {author.title_line && (
                <p className="text-sm font-semibold text-slate-500">{author.title_line}</p>
              )}
              {author.summary && (
                <p className="text-sm text-slate-600 leading-relaxed">{author.summary}</p>
              )}
            </div>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Articles by {author.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No articles from {author.name} yet.</p>
        )}
      </div>
    </div>
  );
}
