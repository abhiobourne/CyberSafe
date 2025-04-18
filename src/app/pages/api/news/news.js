import { auth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  const { userId } = auth();
  
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const API_KEY = process.env.NEWS_API_KEY;
  const URL = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${API_KEY}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
