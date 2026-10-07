// Splits sanitized article HTML around <div data-gmd-tool="slug" ...></div>
// markers into an ordered array of { type: "html", content } and
// { type: "tool", slug, rawParams } segments. ArticleBody renders "html"
// segments via dangerouslySetInnerHTML and "tool" segments as a live
// calculator component — this is how a server-rendered React tree can
// include live components inside a CMS-authored HTML blob without a
// client-side DOM-walking/portal step.
//
// The marker is always expected empty (no children), per the embed spec:
// <div data-gmd-tool="personal-loan-calculator" data-amount="15000"></div>

const EMBED_REGEX = /<div\b[^>]*\bdata-gmd-tool="([a-z0-9-]+)"[^>]*><\/div>/gi;
const ATTR_REGEX = /data-([a-z-]+)="([^"]*)"/gi;

function kebabToCamel(key) {
  return key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function extractRawParams(tagHtml) {
  const rawParams = {};
  ATTR_REGEX.lastIndex = 0;
  let attrMatch;
  while ((attrMatch = ATTR_REGEX.exec(tagHtml)) !== null) {
    const [, key, value] = attrMatch;
    if (key === "gmd-tool") continue;
    rawParams[kebabToCamel(key)] = value;
  }
  return rawParams;
}

export function splitHtmlWithToolEmbeds(html) {
  if (!html) return [{ type: "html", content: "" }];

  const segments = [];
  let lastIndex = 0;
  let match;

  EMBED_REGEX.lastIndex = 0;
  while ((match = EMBED_REGEX.exec(html)) !== null) {
    const [fullMatch, slug] = match;

    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) });
    }

    segments.push({ type: "tool", slug, rawParams: extractRawParams(fullMatch) });
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) });
  }

  return segments;
}
