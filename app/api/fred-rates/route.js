import { NextResponse } from "next/server";

const FRED_BASE_URL = "https://api.stlouisfed.org/fred/series/observations";

const FALLBACK_RATES = {
  fedRate: 5.25,
  mortgage30y: 6.42,
};

async function fetchLatestObservation(seriesId) {
  const url = `${FRED_BASE_URL}?series_id=${seriesId}&api_key=${process.env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;

  // FRED data moves rarely (monthly/weekly), so cache for 24h to stay well under rate limits.
  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    throw new Error(`FRED request failed for ${seriesId}: ${res.status}`);
  }

  const data = await res.json();
  const value = parseFloat(data?.observations?.[0]?.value);
  return Number.isFinite(value) ? value : null;
}

export async function GET() {
  // Client-side cache: browsers/CDNs can reuse this for an hour, and keep
  // serving a stale copy for up to a day while revalidating in the background.
  const headers = { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" };

  if (!process.env.FRED_API_KEY) {
    console.warn("FRED_API_KEY is not set; returning fallback rates.");
    return NextResponse.json({ ...FALLBACK_RATES, source: "fallback" }, { headers });
  }

  try {
    const [fedRate, mortgage30y] = await Promise.all([
      fetchLatestObservation("FEDFUNDS"),
      fetchLatestObservation("MORTGAGE30US"),
    ]);

    return NextResponse.json(
      {
        fedRate: fedRate ?? FALLBACK_RATES.fedRate,
        mortgage30y: mortgage30y ?? FALLBACK_RATES.mortgage30y,
        source: "fred",
      },
      { headers }
    );
  } catch (err) {
    // Covers both network failures and FRED rate-limit responses.
    console.error("Error fetching FRED rates:", err);
    return NextResponse.json({ ...FALLBACK_RATES, source: "fallback" }, { headers });
  }
}
