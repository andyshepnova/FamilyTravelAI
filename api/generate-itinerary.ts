// File: /api/generate-itinerary.ts

import { NextRequest, NextResponse } from "next/server"; // Works fine on Vercel
import OpenAI from "openai";

// Create a Google Search function
async function fetchGoogleResults(query: string) {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;

  if (!apiKey || !cx) {
    console.warn("⚠️ Missing Google Search credentials");
    return "No live data available — missing API credentials.";
  }

  try {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&key=${apiKey}&cx=${cx}`;
    const res = await fetch(searchUrl);
    const data = await res.json();

    if (!data.items) return "No live data found for this location.";

    // Format the results for the AI
    return data.items
      .slice(0, 5)
      .map((item: any) => `• [${item.title}](${item.link}) — ${item.snippet}`)
      .join("\n");
  } catch (error) {
    console.error("Google Search error:", error);
    return "Error fetching live search data.";
  }
}

export const config = {
  runtime: "edge", // ensures faster serverless execution on Vercel
};

// Main API handler
export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Only POST requests allowed." }, { status: 405 });
  }

  try {
    const body = await req.json();
    const {
      destination,
      startDate,
      endDate,
      kidsAges,
      interests,
      dietary,
      mobility,
    } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    // Run Google Search
    const liveResults = await fetchGoogleResults(
      `${destination} family attractions things to do with kids`
    );

    // Build the Ultimate Prompt
    const prompt = `
You are a top-tier family travel concierge and content creator for the “Travel After Kids” brand — a trusted UK-based guide helping parents confidently plan family trips.

Use the live Google search data below to build a real, bespoke, day-by-day family itinerary.

---

### 🌍 LIVE GOOGLE DATA
${liveResults}

---

### 🧾 TRIP DETAILS
- Destination: ${destination}
- Dates: ${startDate} to ${endDate}
- Children’s ages: ${Array.isArray(kidsAges) ? kidsAges.join(", ") : kidsAges}
- Family interests: ${Array.isArray(interests) ? interests.join(", ") : interests}
- Dietary preferences: ${dietary || "None specified"}
- Mobility notes: ${mobility || "None specified"}

---

### 🎯 INSTRUCTIONS
Generate a bespoke family travel itinerary that is:
- 🧒 Family-friendly
- ⏰ Moderately paced (1–2 main activities per day)
- ✍️ Easy to read, warm, and parent-friendly
- 💡 Grounded in real attractions using links from the live data above

**Format Guidelines:**
1. Begin with a short, warm introduction paragraph about visiting ${destination} as a family.
2. Then provide a detailed **Day-by-Day breakdown**, where each day includes:
   - 🏖️ Playful title (e.g., “Jungle Safari & Splash Time”)
   - Morning activity (with link, description, price info, booking tip)
   - Lunch recommendation (with link, family dishes, price range)
   - Afternoon activity
   - Dinner recommendation
   - Include naps or rest periods as appropriate
3. Use emojis 🧸🥐🚲🌄 for readability.
4. Add ticketing and accessibility notes.
5. End with a short “Final Tips” section.

**Rules:**
- Use real clickable links in markdown format, like [Attraction Name](https://example.com)
- Never invent URLs
- Use British English and a friendly, practical tone

Now create the complete itinerary:
`;

    // Call OpenAI
    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.8,
    });

    const itinerary = completion.output_text || "No response generated.";

    return NextResponse.json({ itinerary });
  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json({ error: "Failed to generate itinerary." }, { status: 500 });
  }
}
