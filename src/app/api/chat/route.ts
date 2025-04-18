import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Google API key is missing!");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // @ts-expect-error: 'apiVersion' is required by the API but not defined in the type, allowing it temporarily to avoid type error.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", apiVersion: "v1" });

    // ✅ Use correct API structure
    const chat = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const reply =
      chat.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that.";

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error("Chat Error:", error);
    return new Response(JSON.stringify({ error: "Error processing request" }), {
      status: 500,
    });
  }
}
