const FRED_BASE_URL = "https://api.stlouisfed.org/fred/series/observations";

export const FALLBACK_RATES = {
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
  const observation = data?.observations?.[0];
  const value = parseFloat(observation?.value);
  return {
    value: Number.isFinite(value) ? value : null,
    asOf: observation?.date || null,
  };
}

// Shared by app/api/fred-rates/route.js (client-side polling) and any
// Server Component that needs the live rate/date at render time without an
// extra HTTP round-trip through its own API route.
export async function getFredRates() {
  if (!process.env.FRED_API_KEY) {
    return { ...FALLBACK_RATES, fedRateAsOf: null, mortgage30yAsOf: null, source: "fallback" };
  }

  try {
    const [fedRate, mortgage30y] = await Promise.all([
      fetchLatestObservation("FEDFUNDS"),
      fetchLatestObservation("MORTGAGE30US"),
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
