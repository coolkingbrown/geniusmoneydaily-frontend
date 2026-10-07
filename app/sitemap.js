import { supabase } from "@/lib/supabaseClient";
import { SITE_URL } from "@/lib/site";
import { VERTICAL_LABELS } from "@/lib/verticals";
import { TOOL_SLUGS } from "@/lib/toolsConfig";

// /sitemap.xml: every published article (lastmod = last update), every category page, the
// calculator tool pages, and the static pages. Regenerated at most every 10 minutes, so a
// newly published article appears on its own.
export const revalidate = 600;

// Ship date for the tool pages, which don't carry their own tracked "last modified" field.
const TOOLS_LAST_MODIFIED = new Date("2026-10-07");

const STATIC_PAGES = [
  "", "/articles", "/tools", "/how-it-works", "/editorial-guidelines", "/advertiser-disclosure",
  "/contact", "/privacy", "/privacy-notice", "/terms", "/ccpa", "/data-policy", "/accessibility",
  "/signup", "/unsubscribe",
];

async function publishedArticles() {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from("blog_articles")
      .select("slug, vertical, published_at, updated_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .range(from, from + 999);
    if (error) {
      console.error("sitemap: blog_articles query failed", error);
      break;
    }
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

export default async function sitemap() {
  const articles = await publishedArticles();
  const newest = articles[0]?.updated_at || articles[0]?.published_at || new Date().toISOString();
  const latestByVertical = {};
  for (const a of articles) {
    const t = a.updated_at || a.published_at;
    if (a.vertical && (!latestByVertical[a.vertical] || t > latestByVertical[a.vertical])) latestByVertical[a.vertical] = t;
  }
  return [
    ...STATIC_PAGES.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: p === "" || p === "/articles" ? newest : undefined,
      changeFrequency: p === "" || p === "/articles" ? "daily" : "monthly",
      priority: p === "" ? 1 : p === "/articles" || p === "/tools" ? 0.9 : 0.3,
    })),
    ...TOOL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/tools/${slug}`,
      lastModified: TOOLS_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...Object.keys(VERTICAL_LABELS).map((v) => ({
      url: `${SITE_URL}/articles/category/${v}`,
      lastModified: latestByVertical[v] || undefined,
      changeFrequency: "daily",
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/articles/${a.slug}`,
      lastModified: a.updated_at || a.published_at,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
