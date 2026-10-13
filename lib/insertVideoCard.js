// Finds the article's "Quick Answer" block in already-sanitized body HTML
// and splits the string into everything up to (and including) its closing
// </div>, and everything after. Real markup (confirmed against a live
// article) looks like:
//
//   <div class="quick-answer">
//     <h2>Quick Answer</h2>
//     <p>...</p>
//   </div>
//
// with no nested <div> inside it, so the first </div> after the opening tag
// is always the correct closing tag. If no quick-answer div is found,
// `found` is false and the caller should skip inserting anything rather
// than guess a fallback position.
const QUICK_ANSWER_OPEN_TAG = /<div\s+class="[^"]*\bquick-answer\b[^"]*"[^>]*>/i;

export function splitAfterQuickAnswer(html) {
  if (!html) return { before: html || "", after: "", found: false };

  const openMatch = QUICK_ANSWER_OPEN_TAG.exec(html);
  if (!openMatch) return { before: html, after: "", found: false };

  const searchFrom = openMatch.index + openMatch[0].length;
  const closeIndex = html.indexOf("</div>", searchFrom);
  if (closeIndex === -1) return { before: html, after: "", found: false };

  const splitPoint = closeIndex + "</div>".length;
  return {
    before: html.slice(0, splitPoint),
    after: html.slice(splitPoint),
    found: true,
  };
}
