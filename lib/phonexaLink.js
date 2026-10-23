// Direct Phonexa affiliate link for the debt-relief offer (offer_id 16) —
// unlike lib/moneyAid.js's buildMoneyAidLink(), this does NOT route through
// PostProGo's /go tracking redirector. Per explicit decision, these CTAs
// click straight through to Phonexa; MoneyAid gets no click-level record
// of them beyond whatever Phonexa reports back on aff_sub2.
const PHONEXA_CLICK_URL = "https://leads-inst322-client.phonexa.com/lynx/click";

// contextLabel is the exact aff_sub2 value (e.g. "GMD_" + articleSlug, or
// "GMD_DebtConsolidation" / "GMD_CardPayoff" on a standalone tool page).
// URLSearchParams percent-encodes it, so any slug is safe to append as-is.
// subLabel is optional — when given, it's appended as aff_sub3 (e.g. to
// distinguish which button on a page was clicked).
export function buildPhonexaLink(contextLabel, subLabel) {
  const params = new URLSearchParams({
    offer_id: "16",
    aff_id: "20",
    aff_sub: "GMD",
    aff_sub2: contextLabel,
  });
  if (subLabel) params.set("aff_sub3", subLabel);
  return `${PHONEXA_CLICK_URL}?${params.toString()}`;
}
