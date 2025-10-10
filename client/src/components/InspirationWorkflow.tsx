import React, { useState } from "react";

export default function ItineraryWorkflow() {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    kidsAges: "",
    interests: "",
    dietary: "",
    mobility: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          kidsAges: formData.kidsAges.split(",").map((a) => a.trim()),
          interests: formData.interests.split(",").map((i) => i.trim()),
        }),
      });

      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.itinerary);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating your itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">✨ Bespoke Family Itinerary Generator</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="destination"
          placeholder="Destination (e.g. Paris, France)"
          value={formData.destination}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="flex-1 border p-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="flex-1 border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="kidsAges"
          placeholder="Children's ages (e.g. 3, 6)"
          value={formData.kidsAges}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="interests"
          placeholder="Family interests (e.g. beaches, parks, museums)"
          value={formData.interests}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="dietary"
          placeholder="Dietary preferences (optional)"
          value={formData.dietary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="mobility"
          placeholder="Mobility needs (optional)"
          value={formData.mobility}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 whitespace-pre-line">
          <h3 className="text-xl font-bold mb-2">Your Family Itinerary</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: result.replace(/\n/g, "<br>"),
            }}
          />
        </div>
      )}
    </div>
  );
}
