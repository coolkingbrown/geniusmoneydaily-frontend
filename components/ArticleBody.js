import sanitizeHtml from "sanitize-html";

const SANITIZE_OPTIONS = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "figure", "figcaption"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "width", "height", "loading"],
    a: ["href", "name", "target", "rel"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
};

export default function ArticleBody({ html }) {
  const clean = sanitizeHtml(html || "", SANITIZE_OPTIONS);

  return <div className="article-body" dangerouslySetInnerHTML={{ __html: clean }} />;
}
