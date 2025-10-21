import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body = req.body || {};

    const { destination, startDate, endDate, childrenAges, interests, dietary, mobility } = body;

    if (!destination || !startDate || !endDate) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    const prompt = `
You are a top-tier travel concierge specializing in family travel itineraries.
Use this data to build a warm, detailed, day-by-day plan.

Destination: ${destination}
Dates: ${startDate}–${endDate}
Children: ${childrenAges}
Interests: ${interests}
Dietary: ${dietary}
Mobility: ${mobility}

Please include booking links, pricing details, stroller accessibility, and kid-friendly notes.
`;

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const itinerary = completion.output_text || "No response generated.";
    res.status(200).json({ itinerary });
  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
}
