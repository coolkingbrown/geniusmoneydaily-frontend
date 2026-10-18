import sanitizeHtml from "sanitize-html";
import CalcCTA from "@/components/calculators/CalcCTA";
import AuthorAvatar from "@/components/AuthorAvatar";

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
// nothing rather than guessing a fallback presentation.
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
      return item.text && item.href ? <CalcCTA href={item.href} label={item.text} /> : null;

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
// them (which includes any cta/originally_published entries wherever they
// placed them), then the author box.
export default function GuestArticleFrame({ disclosures, author }) {
  const items = Array.isArray(disclosures) ? disclosures : [];

  if (items.length === 0 && !author) return null;

  return (
    <div className="space-y-4">
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item, i) => (
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
          <CalcCTA href={author.link_url} label={`More from ${author.name} →`} variant="secondary" />
        </div>
      )}
    </div>
  );
}
