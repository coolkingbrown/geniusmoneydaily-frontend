// Single source of truth for the MoneyAid app's base URL — the same app
// serves both the lead/offer data APIs and the public tracking routes
// (/go/:slug, /s/gmd/:code) on this domain. Every GMD call into that app
// should build its URL from this constant rather than hard-coding the
// domain again. (next.config.js is the one exception: Next.js loads that
// file via plain Node require before the app's module graph exists, so it
// can't import this — keep its /s/:code redirect destination in sync with
// this value by hand if the domain ever changes again.)
export const POSTPROGO_BASE_URL = "https://www.postprogo.com";
