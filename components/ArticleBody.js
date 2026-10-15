import sanitizeHtml from "sanitize-html";
import { splitHtmlWithToolEmbeds } from "@/lib/parseToolEmbeds";
import { splitAfterQuickAnswer } from "@/lib/insertVideoCard";
import { enhanceTables } from "@/lib/tableEnhancements";
import EmbeddedTool from "@/components/EmbeddedTool";
import ArticleVideoCard from "@/components/ArticleVideoCard";

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

function renderToolEmbedSegments(html, keyPrefix) {
  const segments = splitHtmlWithToolEmbeds(html);
  return segments.map((segment, i) =>
    segment.type === "tool" ? (
      <EmbeddedTool key={`${keyPrefix}-tool-${i}`} slug={segment.slug} rawParams={segment.rawParams} />
    ) : (
      <div key={`${keyPrefix}-html-${i}`} dangerouslySetInnerHTML={{ __html: segment.content }} />
    )
  );
}

// `video` is optional: { youtubeId, mp4Url, posterUrl, title }. When present
// and the article's HTML contains a "Quick Answer" section, the video card
// is inserted as its own full-width block directly after it. When absent,
// or when no Quick Answer section is found, rendering is identical to the
// no-video case — a single pass through the tool-embed splitter, same as
// before this feature existed.
export default function ArticleBody({ html, video }) {
  const clean = enhanceTables(sanitizeHtml(html || "", SANITIZE_OPTIONS));

  if (!video) {
    return <div className="article-body">{renderToolEmbedSegments(clean, "body")}</div>;
  }

  const { before, after, found } = splitAfterQuickAnswer(clean);

  if (!found) {
    return <div className="article-body">{renderToolEmbedSegments(clean, "body")}</div>;
  }

  return (
    <div className="article-body">
      {renderToolEmbedSegments(before, "before")}
      <ArticleVideoCard
        youtubeId={video.youtubeId}
        mp4Url={video.mp4Url}
        posterUrl={video.posterUrl}
        title={video.title}
      />
      {renderToolEmbedSegments(after, "after")}
    </div>
  );
}
