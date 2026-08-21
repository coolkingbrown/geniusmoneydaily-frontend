import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/components/LogoIcon";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop";

export default function ArticleCard({ article }) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 group flex flex-col">
      <Link href={`/articles/${article.slug}`} className="relative block w-full aspect-video overflow-hidden bg-slate-200">
        <Image
          src={article.featured_image_url || FALLBACK_IMAGE}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.vertical && (
          <span className="absolute top-3 left-3 bg-brand-navy/90 text-brand-teal text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm backdrop-blur-sm">
            {article.vertical.replace(/-/g, " ")}
          </span>
        )}
        <LogoIcon variant="default" size={28} className="absolute top-3 right-3 rounded-md shadow-sm" />
      </Link>

      <div className="p-5 flex flex-col flex-1 space-y-2">
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-navy transition-colors line-clamp-2">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>

        {article.excerpt && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">{article.excerpt}</p>
        )}

        {formattedDate && (
          <div className="pt-2 mt-auto border-t border-slate-100 text-[11px] font-semibold text-slate-400">
            {formattedDate}
          </div>
        )}
      </div>
    </article>
  );
}
