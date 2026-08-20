import Hero from "@/components/Hero";
import MagazineGrid from "@/components/MagazineGrid";
import { fetchPublishedArticles } from "@/lib/fetchArticles";

export const revalidate = 60; // Revalidate content every 60 seconds

export default async function HomePage() {
  // Server-side fetch pulling published posts from Supabase table 'posts' where workflow_status = 'published'
  const articles = await fetchPublishedArticles();

  return (
    <div>
      {/* Hero Banner Section */}
      <Hero />

      {/* 3-Column Magazine News Hub Grid */}
      <MagazineGrid articles={articles} />
    </div>
  );
}
