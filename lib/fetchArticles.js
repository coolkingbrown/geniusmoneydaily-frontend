import { supabase } from "./supabaseClient";

// Realistic fallback high-authority financial articles
const MOCK_ARTICLES = [
  {
    id: "feat-1",
    slug: "fed-interest-rate-pivot-2026-strategy",
    title: "Federal Reserve Signals Key Rate Pivot: How to Position Your Portfolio Today",
    excerpt: "With inflation moderating and employment metrics shifting, Wall Street strategists outline top high-yield cash reserves, bond strategies, and stock allocations for 2026.",
    category: "Loans",
    read_time: "5 min read",
    published_at: "2026-08-19",
    author: "Elena Rostova",
    author_role: "Senior Market Analyst",
    image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
    workflow_status: "published",
    is_featured: true,
  },
  {
    id: "top-1",
    slug: "7-high-yield-savings-accounts-beating-inflation",
    title: "7 High-Yield Savings Accounts Currently Offering Over 5.2% APY",
    excerpt: "Maximize your emergency fund returns with FDIC-insured digital banks offering record yields.",
    category: "Savings",
    read_time: "3 min read",
    published_at: "2026-08-18",
    author: "Marcus Vance",
    image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop",
    workflow_status: "published",
  },
  {
    id: "top-2",
    slug: "credit-score-hacks-boost-50-points-30-days",
    title: "3 Credit Score Hacks to Add 50 Points to Your FICO in 30 Days",
    excerpt: "Simple utilization strategies and reporting techniques mortgage lenders don't always advertise.",
    category: "Credit",
    read_time: "4 min read",
    published_at: "2026-08-17",
    author: "Sophia Chen",
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    workflow_status: "published",
  },
  {
    id: "top-3",
    slug: "commercial-real-estate-opportunities-suburbs",
    title: "Suburban Commercial Real Estate: Where Smart Money is Capitalizing",
    excerpt: "Demographic shifts are driving high cap rates in secondary and tertiary suburban markets.",
    category: "Real Estate",
    read_time: "6 min read",
    published_at: "2026-08-16",
    author: "David Miller",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    workflow_status: "published",
  },
  {
    id: "trend-1",
    slug: "2026-tax-bracket-changes-wealth-preservation",
    title: "2026 Tax Bracket Adjustments: Crucial Deductions Every High Earner Must Lock In Now",
    category: "Taxes",
    read_time: "4 min read",
    published_at: "2026-08-19",
    reads: "14.2k",
    workflow_status: "published",
  },
  {
    id: "trend-2",
    slug: "mortgage-rate-lock-strategies-homebuyers",
    title: "Mortgage Rates Ease to 6-Month Lows: Should You Buy or Wait for Autumn?",
    category: "Real Estate",
    read_time: "5 min read",
    published_at: "2026-08-18",
    reads: "11.8k",
    workflow_status: "published",
  },
  {
    id: "trend-3",
    slug: "best-balance-transfer-cards-zero-apr",
    title: "Best 0% Intro APR Balance Transfer Credit Cards for Wiping Out Debt Fast",
    category: "Credit",
    read_time: "3 min read",
    published_at: "2026-08-18",
    reads: "9.5k",
    workflow_status: "published",
  },
  {
    id: "trend-4",
    slug: "personal-loans-vs-home-equity-renovation",
    title: "Personal Loans vs. HELOC: Comparing Total Cost for Home Improvement Projects",
    category: "Loans",
    read_time: "4 min read",
    published_at: "2026-08-17",
    reads: "8.1k",
    workflow_status: "published",
  },
  {
    id: "trend-5",
    slug: "roth-ira-conversion-strategy-backdoor",
    title: "Backdoor Roth IRA Masterclass: Legal Tax Shielding for High-Income Professionals",
    category: "Taxes",
    read_time: "7 min read",
    published_at: "2026-08-15",
    reads: "7.9k",
    workflow_status: "published",
  },
];

export async function fetchPublishedArticles() {
  try {
    // Server-side fetch to pull latest published articles from Supabase 'posts' table
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("workflow_status", "published")
      .order("published_at", { ascending: false })
      .limit(9);

    if (error || !data || data.length === 0) {
      console.warn("Supabase fetch notice: Using fallback articles for Magazine Grid display.", error?.message);
      return MOCK_ARTICLES;
    }

    // Combine fetched data with missing fallback fields if necessary
    if (data.length < 6) {
      const existingIds = new Set(data.map((item) => item.id));
      const remainingMock = MOCK_ARTICLES.filter((item) => !existingIds.has(item.id));
      return [...data, ...remainingMock].slice(0, 9);
    }

    return data;
  } catch (err) {
    console.error("Error fetching articles from Supabase:", err);
    return MOCK_ARTICLES;
  }
}

export async function fetchArticleBySlug(slug) {
  const articles = await fetchPublishedArticles();
  const match = articles.find((a) => a.slug === slug);
  if (match) return match;

  // Generic fallback detail
  return {
    id: "fallback-single",
    slug: slug,
    title: slug.replace(/-/g, " ").toUpperCase(),
    excerpt: "Comprehensive financial guide and strategic insights delivered directly from the GeniusMoneyDaily editorial team.",
    content: `
      <p class="lead">Navigating modern financial decisions requires up-to-the-minute data, regulatory awareness, and strategic discipline.</p>
      <h2>Key Takeaways for Smart Investors</h2>
      <p>Whether you are optimizing interest yields, leveraging tax deductions, or refinancing debt, timing and structure dictate your net ROI.</p>
      <ul>
        <li><strong>Audit your fixed interest liabilities</strong> every 6 months to spot refinancing windows.</li>
        <li><strong>Automate yield maximization</strong> by routing surplus operational cash into high-rate capital market accounts.</li>
        <li><strong>Consult certified financial planners</strong> prior to triggering taxable events.</li>
      </ul>
      <h2>Strategic Implementation</h2>
      <p>Financial independence is built on systematic execution. By following verified frameworks and staying disciplined through market cycles, investors build resilient balance sheets.</p>
    `,
    category: "Loans",
    published_at: new Date().toISOString().split("T")[0],
    read_time: "5 min read",
    author: "GeniusMoneyDaily Editors",
    image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
  };
}
