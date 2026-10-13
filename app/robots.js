import { SITE_URL } from "@/lib/site";

// /robots.txt: everything public is crawlable; admin, API and unsubscribe links are not
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/unsubscribe", "/s/"] }],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-videos.xml`],
    host: SITE_URL,
  };
}
