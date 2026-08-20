import { supabase } from "./supabaseClient";

const PAGE_SIZE = 9;

const HUB_FIELDS = "id, slug, title, excerpt, featured_image_url, vertical, published_at";

export async function getPublishedArticles({ page = 1, vertical } = {}) {
  const currentPage = Math.max(1, page);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("blog_articles")
    .select(HUB_FIELDS, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(from, to);

  if (vertical) {
    query = query.eq("vertical", vertical);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching blog_articles:", error);
    return { articles: [], totalCount: 0, totalPages: 0, page: currentPage };
  }

  return {
    articles: data || [],
    totalCount: count || 0,
    totalPages: Math.max(1, Math.ceil((count || 0) / PAGE_SIZE)),
    page: currentPage,
  };
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
