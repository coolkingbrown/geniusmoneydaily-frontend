import { NextResponse } from "next/server";
import { getFredRates } from "@/lib/fredRates";

export async function GET() {
  const rates = await getFredRates();

  // Client-side cache: browsers/CDNs can reuse this for an hour, and keep
  // serving a stale copy for up to a day while revalidating in the background.
  const headers = { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" };

  return NextResponse.json(rates, { headers });
}
