const FRED_BASE_URL = "https://api.stlouisfed.org/fred/series/observations";

export const FALLBACK_RATES = {
  fedRate: 5.25,
  mortgage30y: 6.42,
};

async function fetchLatestObservation(seriesId, fetchOptions) {
  const url = `${FRED_BASE_URL}?series_id=${seriesId}&api_key=${process.env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`FRED request failed for ${seriesId}: ${res.status}`);
  }

  const data = await res.json();
  const observation = data?.observations?.[0];
  const value = parseFloat(observation?.value);
  return {
    value: Number.isFinite(value) ? value : null,
    asOf: observation?.date || null,
  };
}

// Shared by app/api/fred-rates/route.js (client-side polling), the root
// layout (server-rendering the header ticker so the initial HTML — what
// crawlers, link previews, and slow connections see — already has live
// values), and any other Server Component that needs the rate/date at
// render time.
//
// `fetchOptions` controls caching on the underlying FRED fetch and defaults
// to always-fresh (no-store) for callers like the API route, which want
// the true current value on every invocation. The root layout passes its
// own ISR-style { next: { revalidate: 3600 } } instead — using no-store
// there would force every single page on the site into fully dynamic
// rendering, since that layout wraps the entire app.
export async function getFredRates(fetchOptions = { cache: "no-store" }) {
  if (!process.env.FRED_API_KEY) {
    return { ...FALLBACK_RATES, fedRateAsOf: null, mortgage30yAsOf: null, source: "fallback" };
  }

  try {
    const [fedRate, mortgage30y] = await Promise.all([
      fetchLatestObservation("FEDFUNDS", fetchOptions),
      fetchLatestObservation("MORTGAGE30US", fetchOptions),
    ]);

    return {
      fedRate: fedRate.value ?? FALLBACK_RATES.fedRate,
      fedRateAsOf: fedRate.value != null ? fedRate.asOf : null,
      mortgage30y: mortgage30y.value ?? FALLBACK_RATES.mortgage30y,
      mortgage30yAsOf: mortgage30y.value != null ? mortgage30y.asOf : null,
      source: "fred",
    };
  } catch (err) {
    console.error("Error fetching FRED rates:", err);
    return { ...FALLBACK_RATES, fedRateAsOf: null, mortgage30yAsOf: null, source: "fallback" };
  }
}
