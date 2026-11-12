import Link from "next/link";
import AuthorAvatar from "@/components/AuthorAvatar";

function formatPublishedDateTime(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
}

// Bloomberg-opinion-style byline: date/time, a rule, author block (photo +
// name + title + summary), a closing rule. Renders nothing if there's no
// author to show — e.g. the guest_author_id points at a deactivated author
// MoneyAid's RLS policy won't let the anon key read — rather than showing
// a half-populated byline with no name.
export default function ArticleByline({ author, publishedAt }) {
  if (!author) return null;

  const formatted = formatPublishedDateTime(publishedAt);

  return (
    <div className="space-y-3">
      {formatted && (
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{formatted}</p>
      )}

      <div className="border-t border-slate-200" />

      <div className="flex items-start gap-3 py-1">
        <AuthorAvatar author={author} size={44} />

        <div className="space-y-1 min-w-0">
          <p className="text-sm leading-snug">
            <span className="text-slate-500">By </span>
            <Link
              href={`/authors/${author.slug}`}
              className="font-bold text-brand-navy hover:text-brand-teal transition-colors"
            >
              {author.name}
            </Link>
          </p>
          {author.title_line && (
            <p className="text-xs text-slate-500 font-semibold">{author.title_line}</p>
          )}
          {author.summary && (
            <p className="text-xs text-slate-500 leading-relaxed">{author.summary}</p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200" />
    </div>
  );
}
