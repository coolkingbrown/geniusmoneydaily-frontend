import { getPublishedArticles } from "./blogArticles";

// Homepage feed: delegates to the same blog_articles query used across
// /articles and /articles/category/[vertical], which already works
// correctly for anonymous visitors under RLS. Kept as a thin wrapper
// (rather than inlining in app/page.js) so the homepage's call site
// doesn't need to change.
export async function getGeniusMoneyDailyArticles() {
  const { articles } = await getPublishedArticles({ page: 1 });
  return articles;
}
