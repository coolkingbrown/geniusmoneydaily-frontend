// Post-sanitization HTML surgery for <table> elements in article bodies —
// same lightweight regex-based approach already used by
// lib/insertVideoCard.js, rather than a full HTML parser. Safe to run
// after sanitizeHtml() since it only ever adds hardcoded, safe class names
// and a wrapper — it never incorporates additional unsanitized content.
//
// Does two things:
// 1. Wraps each table in a double div (outer: border/radius/clip, inner:
//    horizontal scroll) so a wide comparison table scrolls within itself
//    on narrow viewports instead of breaking the page layout. Split this
//    way (rather than one div with overflow-x) so overflow-x:auto on the
//    scrolling axis doesn't fight overflow:hidden needed to clip the
//    table's square corners to the wrapper's rounded border.
// 2. Adds class="price-cell" to the first <td>/<th> of each row when its
//    text contains "$" — CSS alone can't select an element by its text
//    content, so this has to happen here rather than in globals.css.
const TABLE_REGEX = /<table\b[^>]*>[\s\S]*?<\/table>/gi;
const ROW_REGEX = /<tr\b[^>]*>[\s\S]*?<\/tr>/gi;
const FIRST_CELL_REGEX = /<(td|th)\b([^>]*)>([\s\S]*?)<\/\1>/i;

function stripTags(html) {
  return html.replace(/<[^>]*>/g, "");
}

function addPriceCellClass(attrs) {
  if (/\bclass\s*=\s*"[^"]*"/.test(attrs)) {
    return attrs.replace(/\bclass\s*=\s*"([^"]*)"/, (_match, existing) => `class="${existing} price-cell"`.trim());
  }
  return `${attrs} class="price-cell"`;
}

function enhanceRow(rowHtml) {
  const match = FIRST_CELL_REGEX.exec(rowHtml);
  if (!match) return rowHtml;

  const [fullMatch, tag, attrs, inner] = match;
  if (!stripTags(inner).includes("$")) return rowHtml;

  const newCell = `<${tag}${addPriceCellClass(attrs)}>${inner}</${tag}>`;
  return rowHtml.slice(0, match.index) + newCell + rowHtml.slice(match.index + fullMatch.length);
}

export function enhanceTables(html) {
  if (!html || !html.includes("<table")) return html;

  return html.replace(TABLE_REGEX, (tableHtml) => {
    const withPriceCells = tableHtml.replace(ROW_REGEX, enhanceRow);
    return `<div class="table-scroll-outer"><div class="table-scroll-inner">${withPriceCells}</div></div>`;
  });
}
