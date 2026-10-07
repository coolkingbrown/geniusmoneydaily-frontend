import sanitizeHtml from "sanitize-html";
import { splitHtmlWithToolEmbeds } from "@/lib/parseToolEmbeds";
import EmbeddedTool from "@/components/EmbeddedTool";

// Attribute names a <div data-gmd-tool="..."> embed marker may carry, across
// every tool's paramKeys (see lib/toolsConfig.js). Multi-word keys use
// kebab-case here, matching normal HTML attribute convention — see
// lib/parseToolEmbeds.js for how they're converted back to camelCase.
const TOOL_EMBED_ATTRIBUTES = [
  "data-gmd-tool",
  "data-amount",
  "data-apr",
  "data-term",
  "data-balance",
  "data-payment",
  "data-tab",
  "data-sqft",
  "data-roof-age",
  "data-windows",
  "data-bill",
  "data-year",
  "data-age",
  "data-premium",
  "data-income",
  "data-debt",
  "data-dependents",
  "data-down",
  "data-rate",
  "data-card-apr",
  "data-loan-apr",
  "data-housing",
  "data-transportation",
  "data-food",
  "data-utilities",
  "data-insurance",
  "data-entertainment",
  "data-savings",
  "data-other",
  "data-mode",
  "data-goal-amount",
  "data-goal-months",
];

const SANITIZE_OPTIONS = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "figure", "figcaption"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "width", "height", "loading"],
    a: ["href", "name", "target", "rel"],
    div: TOOL_EMBED_ATTRIBUTES,
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
};

export default function ArticleBody({ html }) {
  const clean = sanitizeHtml(html || "", SANITIZE_OPTIONS);
  const segments = splitHtmlWithToolEmbeds(clean);

  return (
    <div className="article-body">
      {segments.map((segment, i) =>
        segment.type === "tool" ? (
          <EmbeddedTool key={`tool-${i}`} slug={segment.slug} rawParams={segment.rawParams} />
        ) : (
          <div key={`html-${i}`} dangerouslySetInnerHTML={{ __html: segment.content }} />
        )
      )}
    </div>
  );
}
