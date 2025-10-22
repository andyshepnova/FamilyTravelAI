// api/generate-itinerary.ts
import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { destination, startDate, endDate, childAges, budget, interests } = req.body || {};

    if (!destination || !startDate || !endDate) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const prompt = `
You are a top-tier travel concierge specializing in family travel itineraries for children aged 0–12.
Create a day-by-day itinerary for a trip based on these details:
Destination: ${destination}
Dates: ${startDate} to ${endDate}
Children: ${childAges || "not specified"}
Budget: ${budget || "medium"}
Interests: ${interests || "general family activities"}

Format the output clearly by day, with engaging descriptions and practical tips.
Include direct, live, clickable links to official attraction or booking pages where relevant.
Keep tone warm, concise, and family-oriented.
`;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const itinerary = completion.output_text || "No response generated.";
    res.status(200).json({ itinerary });
  } catch (err: any) {
    console.error("Error generating itinerary:", err);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
}
