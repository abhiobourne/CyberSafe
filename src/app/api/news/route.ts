import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  const URL = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${API_KEY}`;

  try {
    const response = await fetch(URL, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ error: `News API error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
