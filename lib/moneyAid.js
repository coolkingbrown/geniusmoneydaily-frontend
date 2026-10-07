// All external offer CTAs route through MoneyAid Ops' tracking redirector
// rather than linking directly to the advertiser. MoneyAid Ops owns the
// actual destination URL for each offer slug server-side; this project only
// ever needs to know the offer slug and which tool sent the click.
const MONEYAID_BASE_URL = "https://moneyaid-ops.vercel.app/api/go";

// Canonical offer slugs used across every tool page and embed.
export const OFFER_SLUGS = {
  SAFE_BET_LOANS: "safe-bet-loans",
  SAFE_BET_AUTO: "safe-bet-auto",
  SAFE_BET_LIFE: "safe-bet-life",
  DEBTHUNCH: "debthunch",
  HOME_ADVISOR: "home-advisor",
};

export function buildMoneyAidLink(offerSlug, toolSlug) {
  const params = new URLSearchParams({ utm_source: "gmd-tool", utm_content: toolSlug });
  return `${MONEYAID_BASE_URL}/${offerSlug}?${params.toString()}`;
}
