import sanitizeHtml from "sanitize-html";
import AuthorAvatar from "@/components/AuthorAvatar";
import GuestAuthorCTA from "@/components/GuestAuthorCTA";

const NOTE_CLASS = "text-xs text-slate-500 italic leading-relaxed";

// frame_disclosures' `html` field (before_you_decide) is MoneyAid-authored
// content living outside body_content, so it still gets sanitized before
// dangerouslySetInnerHTML, same discipline as body_content itself.
function sanitizeFrameHtml(html) {
  return sanitizeHtml(html || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h3", "h4"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

function originallyPublishedLabel(item) {
  if (item.text) return item.text;
  if (!item.href) return null;
  try {
    return new URL(item.href).hostname.replace(/^www\./, "");
  } catch {
    return item.href;
  }
}

// Renders one frame_disclosures[] entry by its `kind`. Unknown kinds render
// nothing rather than guessing a fallback presentation. The "cta" case here
// only fires for the rare edge case of a cta item with no author to anchor
// it to (see below) — the normal single-cta-plus-author case never reaches
// it, since that cta is extracted and relocated into the author box.
function FrameDisclosureItem({ item }) {
  switch (item.kind) {
    case "tax_relief_note":
    case "not_advice":
      return item.text ? <p className={NOTE_CLASS}>{item.text}</p> : null;

    case "before_you_decide": {
      const clean = sanitizeFrameHtml(item.html);
      if (!clean) return null;
      return (
        <div
          className="mai-before-you-decide bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600"
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      );
    }

    case "cta":
      return <GuestAuthorCTA href={item.href} label={item.text} />;

    case "originally_published": {
      const label = originallyPublishedLabel(item);
      return item.href && label ? (
        <p className="text-xs text-slate-400">
          Originally published at{" "}
          <a
            href={item.href}
            target="_blank"
            rel="noopener sponsored"
            className="font-semibold text-brand-teal hover:underline"
          >
            {label}
          </a>
        </p>
      ) : null;
    }

    default:
      return null;
  }
}

// Page-frame content below the author's text — never inserted into
// body_content. Order is: frame_disclosures in the order MoneyAid sent
// them, except the single "cta" entry (when there's an author to show) is
// pulled out of that sequence and rendered inside the author box instead,
// in place of what used to be a separate "More from [Author]" button —
// same destination, one button instead of two. If there's a cta item but
// no author box to put it in, it stays in its normal sequential position
// rather than being dropped.
export default function GuestArticleFrame({ disclosures, author }) {
  const items = Array.isArray(disclosures) ? disclosures : [];

  const ctaIndex = author ? items.findIndex((d) => d?.kind === "cta") : -1;
  const authorBoxCta = ctaIndex !== -1 ? items[ctaIndex] : null;
  const sequentialItems = authorBoxCta ? items.filter((_, i) => i !== ctaIndex) : items;

  if (sequentialItems.length === 0 && !author) return null;

  return (
    <div className="space-y-4">
      {sequentialItems.length > 0 && (
        <div className="space-y-3">
          {sequentialItems.map((item, i) => (
            <FrameDisclosureItem key={i} item={item} />
          ))}
        </div>
      )}

      {author && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <AuthorAvatar author={author} size={64} />
          <div className="flex-1 space-y-1">
            <p className="font-extrabold text-slate-900">{author.name}</p>
            {author.summary && <p className="text-sm text-slate-500 leading-relaxed">{author.summary}</p>}
          </div>
          {authorBoxCta && <GuestAuthorCTA href={authorBoxCta.href} label={authorBoxCta.text} />}
        </div>
      )}
    </div>
  );
}
