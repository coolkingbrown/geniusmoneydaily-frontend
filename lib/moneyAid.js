// All external offer CTAs route through PostProGo's tracking redirector
// rather than linking directly to the advertiser. PostProGo owns the
// actual destination URL for each offer slug server-side; this project only
// ever needs to know the offer slug and which tool sent the click. Never
// hard-code the link base anywhere else — import OFFER_LINK_BASE_URL or use
// buildMoneyAidLink() instead.
import { POSTPROGO_BASE_URL } from "./postProGo";

export const OFFER_LINK_BASE_URL = `${POSTPROGO_BASE_URL}/go`;

// Canonical offer slugs used across every tool page and embed.
export const OFFER_SLUGS = {
  SAFE_BET_LOANS: "safe-bet-loans",
  SAFE_BET_AUTO: "safe-bet-auto",
  SAFE_BET_LIFE: "safe-bet-life",
  HOME_ADVISOR: "home-advisor",
};

export function buildMoneyAidLink(offerSlug, toolSlug) {
  const params = new URLSearchParams({ utm_source: "gmd-tool", utm_content: toolSlug });
  return `${OFFER_LINK_BASE_URL}/${offerSlug}?${params.toString()}`;
}
