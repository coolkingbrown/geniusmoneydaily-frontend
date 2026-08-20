import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using your newly added Vercel variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getGeniusMoneyDailyArticles() {
  // Fetch articles filtered specifically for GeniusMoneyDaily
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      created_at,
      wordpress_sites!inner(site_name)
    `)
    // 1. THIS IS THE MAGIC LINE: It strictly filters for this specific site
    .eq('wordpress_sites.site_name', 'GeniusMoneyDaily')
    // 2. Only show completed/published articles
    .eq('status', 'synced') 
    // 3. Show the newest articles first
    .order('created_at', { ascending: false })
    // 4. Limit to 6 for the homepage grid
    .limit(6); 

  if (error) {
    console.error('Error fetching GeniusMoneyDaily articles:', error);
    return [];
  }

  return articles || [];
}
