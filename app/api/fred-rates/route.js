import { NextResponse } from "next/server";
import { getFredRates } from "@/lib/fredRates";

// Prevents Next.js from statically freezing this route at build/deploy
// time (it has no dynamic request data, so it's otherwise eligible for
// static optimization) — without this, the FRED fetch below could run
// once and then never again across deploys, no matter what revalidate
// value it's given.
export const dynamic = "force-dynamic";

export async function GET() {
  const rates = await getFredRates();

  // Client-side cache: browsers/CDNs can reuse this for an hour, and keep
  // serving a stale copy for up to a day while revalidating in the background.
  const headers = { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" };

  return NextResponse.json(rates, { headers });
}
