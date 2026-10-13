import { NextResponse } from "next/server";
import { getVideoArticlesForSitemap } from "@/lib/blogArticles";
import { SITE_URL } from "@/lib/site";

// Hand-written video sitemap: the Next.js version pinned in this project
// (14.2.x) doesn't support the native `videos` field on app/sitemap.js
// entries (that landed in a later major version), so this is the documented
// fallback — a separate sitemap using the video: XML namespace, referenced
// from robots.js.
export const revalidate = 600;

function escapeXml(value) {
  if (!value) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getVideoArticlesForSitemap();

  // Google's video sitemap requires thumbnail_loc, title, description, and
  // at least one of content_loc/player_loc on every <video:video> entry —
  // skip anything missing a poster or a playable source rather than emit
  // an invalid entry.
  const validArticles = articles.filter(
    (a) => a.video_poster_url && (a.video_youtube_id || a.video_mp4_url)
  );

  const entries = validArticles
    .map((article) => {
      const pageUrl = `${SITE_URL}/articles/${article.slug}`;
      const title = escapeXml(article.title);
      const description = escapeXml(article.meta_description || article.excerpt || article.title);
      const thumbnail = escapeXml(article.video_poster_url);
      const contentLoc = article.video_mp4_url
        ? `\n      <video:content_loc>${escapeXml(article.video_mp4_url)}</video:content_loc>`
        : "";
      const playerLoc = article.video_youtube_id
        ? `\n      <video:player_loc>${escapeXml(
            `https://www.youtube-nocookie.com/embed/${article.video_youtube_id}`
          )}</video:player_loc>`
        : "";
      const duration = article.video_duration_seconds
        ? `\n      <video:duration>${article.video_duration_seconds}</video:duration>`
        : "";
      const publicationDate = article.video_published_at || article.published_at;

      return `  <url>
    <loc>${pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnail}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>${contentLoc}${playerLoc}${duration}
      <video:publication_date>${new Date(publicationDate).toISOString()}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
