import Hero from "@/components/Hero";
import MagazineGrid from "@/components/MagazineGrid";
import { getGeniusMoneyDailyArticles } from "@/lib/getGeniusMoneyDailyArticles";

export const revalidate = 60; // Revalidate content every 60 seconds

export default async function HomePage() {
  // Fetch articles filtered specifically for GeniusMoneyDaily via Supabase inner join
  const articles = await getGeniusMoneyDailyArticles();

  return (
    <div>
      {/* Hero Banner Section */}
      <Hero />

      {/* 3-Column Magazine News Hub Grid */}
      <MagazineGrid articles={articles} />
    </div>
  );
}
