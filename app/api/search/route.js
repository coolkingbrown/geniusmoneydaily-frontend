import { NextResponse } from "next/server";
import { searchArticles } from "@/lib/blogArticles";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchArticles(query, 8);
  return NextResponse.json({ results });
}
