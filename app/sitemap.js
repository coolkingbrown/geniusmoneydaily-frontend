import { TOOL_SLUGS } from "@/lib/toolsConfig";
import { getAllPublishedArticleSlugs } from "@/lib/blogArticles";

const SITE_URL = "https://www.geniusmoneydaily.com";

// Content launch date for pages without a tracked "last modified" field
// (the tool pages, legal pages, etc.) — set once, not regenerated per
// request, so it reflects when this content actually shipped rather than
// implying a constant-update cadence it doesn't have.
const TOOLS_LAST_MODIFIED = new Date("2026-10-07");

const CATEGORY_SLUGS = [
  "loans",
  "credit",
  "savings",
  "real-estate",
  "taxes",
  "lifestyle",
  "auto-insurance",
  "life-insurance",
  "home-services",
];

const STATIC_PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/articles", priority: 0.9, changeFrequency: "daily" },
  { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
  { path: "/signup", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/how-it-works", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-notice", priority: 0.3, changeFrequency: "yearly" },
  { path: "/data-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/ccpa", priority: 0.3, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
  { path: "/advertiser-disclosure", priority: 0.3, changeFrequency: "yearly" },
  { path: "/editorial-guidelines", priority: 0.3, changeFrequency: "yearly" },
  { path: "/unsubscribe", priority: 0.1, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: TOOLS_LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const categoryEntries = CATEGORY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/articles/category/${slug}`,
    lastModified: TOOLS_LAST_MODIFIED,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const toolEntries = TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tools/${slug}`,
    lastModified: TOOLS_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const publishedArticles = await getAllPublishedArticleSlugs();
  const articleEntries = publishedArticles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.published_at ? new Date(article.published_at) : TOOLS_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...toolEntries, ...categoryEntries, ...articleEntries];
}
