import { POSTPROGO_BASE_URL } from "./postProGo";

const LINKS_API_URL = `${POSTPROGO_BASE_URL}/api/public/links?site=gmd`;

// Best-effort, per-server-instance cache of the last successful response.
// On a failed request (503 or otherwise), /links falls back to this rather
// than showing nothing. Resets on cold start — there's no persistent store
// for it, which is an acceptable tradeoff for a bio-link page.
let lastGoodLinks = null;

export async function getBioLinks() {
  try {
    const res = await fetch(LINKS_API_URL, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Bio links request failed: ${res.status}`);

    const data = await res.json();
    if (!data?.success || !Array.isArray(data.links)) {
      throw new Error("Unexpected bio links response shape");
    }

    lastGoodLinks = data.links;
    return data.links;
  } catch (err) {
    console.error("Error fetching bio links, falling back to last good list:", err);
    return lastGoodLinks;
  }
}
