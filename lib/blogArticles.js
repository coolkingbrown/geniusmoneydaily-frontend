import { verticalsFor } from "@/lib/verticals";
import { supabase } from "./supabaseClient";

const PAGE_SIZE = 9;

const HUB_FIELDS = "id, slug, title, excerpt, featured_image_url, vertical, published_at";
const HUB_FIELDS_WITH_GUEST = `${HUB_FIELDS}, is_guest, guest_author_id`;

// Cards need only a sliver of guest_authors — name, slug (for the /authors
// link), and a photo. Queried directly here rather than via a shared
// lib/guestAuthors.js helper so this stays a self-contained addition.
async function attachGuestAuthors(articles) {
  const ids = [...new Set(articles.filter((a) => a.is_guest && a.guest_author_id).map((a) => a.guest_author_id))];
  if (ids.length === 0) return articles;

  const { data, error } = await supabase.from("guest_authors").select("id, name, slug, image_url").in("id", ids);
  if (error) {
    console.error("Error fetching guest_authors for article cards:", error);
    return articles;
  }

  const byId = new Map((data || []).map((a) => [a.id, a]));
  return articles.map((a) =>
    a.is_guest && byId.has(a.guest_author_id) ? { ...a, guestAuthor: byId.get(a.guest_author_id) } : a
  );
}

export async function getPublishedArticles({ page = 1, vertical } = {}) {
  const currentPage = Math.max(1, page);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  function buildQuery(fields) {
    let query = supabase
      .from("blog_articles")
      .select(fields, { count: "exact" })
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .range(from, to);

    if (vertical) {
      // A parent category (Lifestyle) also lists its subcategories (Fashion, Fitness & Wellness)
      query = query.in("vertical", verticalsFor(vertical));
    }
    return query;
  }

  let { data, error, count } = await buildQuery(HUB_FIELDS_WITH_GUEST);

  // is_guest/guest_author_id may not exist yet in every environment — fall
  // back to the base field set rather than failing the whole page.
  if (error) {
    ({ data, error, count } = await buildQuery(HUB_FIELDS));
  }

  if (error) {
    console.error("Error fetching blog_articles:", error);
    return { articles: [], totalCount: 0, totalPages: 0, page: currentPage };
  }

  const articles = await attachGuestAuthors(data || []);

  return {
    articles,
    totalCount: count || 0,
    totalPages: Math.max(1, Math.ceil((count || 0) / PAGE_SIZE)),
    page: currentPage,
  };
}

// Unpaginated — used only by app/sitemap.js, which needs every published
// slug rather than one page of them.
export async function getAllPublishedArticleSlugs() {
  const { data, error } = await supabase
    .from("blog_articles")
    .select("slug, published_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching all published blog_article slugs:", error);
    return [];
  }

  return data || [];
}

// Used by /links (the bio-link page) — the 10 newest published articles that
// have a video summary attached, newest video first.
export async function getLatestVideoArticles(limit = 10) {
  const { data, error } = await supabase
    .from("blog_articles")
    .select("slug, title, featured_image_url, video_poster_url, video_published_at, published_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .or("video_youtube_id.not.is.null,video_mp4_url.not.is.null")
    .order("video_published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest video articles:", error);
    return [];
  }

  return data || [];
}

// Unpaginated — used only by app/sitemap-videos.xml/route.js, which needs
// every published article carrying a video summary.
export async function getVideoArticlesForSitemap() {
  const { data, error } = await supabase
    .from("blog_articles")
    .select(
      "slug, title, excerpt, meta_description, published_at, video_youtube_id, video_mp4_url, video_poster_url, video_duration_seconds, video_published_at"
    )
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .or("video_youtube_id.not.is.null,video_mp4_url.not.is.null");

  if (error) {
    console.error("Error fetching video articles for sitemap:", error);
    return [];
  }

  return data || [];
}

// Escapes ilike wildcards so a search term is matched literally, and strips
// comma/parenthesis — characters with special meaning in PostgREST's
// .or() filter grammar — so user input can't break out of the filter
// (e.g. a query like "x,id.eq.1" could otherwise inject an extra clause).
function sanitizeSearchTerm(raw) {
  return raw.replace(/[%_]/g, (c) => `\\${c}`).replace(/[,()]/g, "");
}

// Used by Header.js's search dropdown via app/api/search/route.js.
export async function searchArticles(query, limit = 8) {
  const trimmed = (query || "").trim();
  if (!trimmed) return [];

  const pattern = `%${sanitizeSearchTerm(trimmed)}%`;

  const { data, error } = await supabase
    .from("blog_articles")
    .select("slug, title, excerpt, primary_keyword, published_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .or(`title.ilike.${pattern},excerpt.ilike.${pattern},primary_keyword.ilike.${pattern}`)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error searching blog_articles:", error);
    return [];
  }

  return data || [];
}

export async function getArticleBySlug(slug) {
  const { data, error } = await supabase
    .from("blog_articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog article by slug:", error);
    return null;
  }

  return data || null;
}
