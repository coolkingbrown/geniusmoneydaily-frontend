import { SITE_URL } from "@/lib/site";

// /robots.txt: everything public is crawlable; admin, API and unsubscribe links are not
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/unsubscribe"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
