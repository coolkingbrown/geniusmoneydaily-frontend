// Vertical slugs written by moneyaid-ops (blog_articles.vertical) and how GMD shows them.
// Fashion and Fitness & Wellness are their own verticals; the Lifestyle page lists them too.
export const VERTICAL_LABELS = {
  loans: "Loans",
  credit: "Credit",
  savings: "Savings",
  "real-estate": "Real Estate",
  taxes: "Taxes",
  lifestyle: "Lifestyle",
  fashion: "Fashion",
  "fitness-wellness": "Fitness & Wellness",
  "auto-insurance": "Auto Insurance",
  "life-insurance": "Life Insurance",
  "home-services": "Home Services",
};

// Verticals a category page lists: a parent category includes its subcategories
const SUBCATEGORIES = {
  lifestyle: ["fashion", "fitness-wellness"],
};

export function verticalLabel(vertical) {
  if (!vertical) return null;
  return (
    VERTICAL_LABELS[vertical] ||
    vertical
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function verticalsFor(vertical) {
  return [vertical, ...(SUBCATEGORIES[vertical] || [])];
}
