import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCw, Mail } from "lucide-react";
import { useState } from "react";
import ParameterInput from "./ParameterInput";
import ItineraryDay from "./ItineraryDay";
import RefinementPanel from "./RefinementPanel";

interface ItineraryWorkflowProps {
  onCreateItinerary: (params: any) => void;
}

export default function ItineraryWorkflow({ onCreateItinerary }: ItineraryWorkflowProps) {
  const [params, setParams] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    childAges: "",
    budget: "",
    interests: "",
    email: "",
  });

  const [itinerary, setItinerary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRefinement, setShowRefinement] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  /**
   * Generate itinerary by calling the backend API
   */
  const handleCreateItinerary = async () => {
    if (!params.destination || !params.startDate || !params.endDate) {
      alert("Please fill in the destination and travel dates before continuing.");
      return;
    }

    setIsLoading(true);
    setItinerary([]);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: params.destination,
          startDate: params.startDate,
          endDate: params.endDate,
          childAges: params.childAges,
          budget: params.budget,
          interests: params.interests,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to generate itinerary. Please try again.");
      }

      const data = await response.json();
      const itineraryText = data.itinerary || data.message || "No itinerary was returned.";

      // Display the AI-generated result as a single itinerary card
      setItinerary([
        {
          dayNumber: 1,
          theme: "AI-Generated Itinerary",
          activities: [
            {
              id: "ai-itinerary",
              name: "Bespoke Family Plan",
              description: itineraryText,
              duration: "",
              location: "",
              cost: "",
              rating: "",
              category: "",
              linkStatus: "verified" as const,
              timeSlot: "",
            },
          ],
        },
      ]);
    } catch (error: any) {
      console.error("Error generating itinerary:", error);
      alert(error.message || "Something went wrong while generating your itinerary.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Dummy refinement logic — placeholder for future AI improvements
   */
  const handleRefinement = async (feedback: string, quickOption?: string) => {
    console.log("Refining itinerary with:", { feedback, quickOption });
    // Future enhancement: send refinement feedback to AI
  };

  /**
   * Dummy email sender (placeholder for backend integration)
   */
  const handleEmailItinerary = async () => {
    if (!params.email) {
      alert("Please provide an email address to send your itinerary.");
      return;
    }

    setIsSendingEmail(true);
    setTimeout(() => {
      console.log("Email sent to:", params.email);
      setIsSendingEmail(false);
      alert("Your itinerary has been sent successfully!");
    }, 2000);
  };

  const handleModifyActivity = (activityId: string) => {
    console.log("Modify activity:", activityId);
    setShowRefinement(true);
  };

  const handleViewRoute = (dayNumber: number) => {
    console.log("View route for day:", dayNumber);
    // Future: integrate Google Maps API
  };

  return (
    <div className="space-y-6">
      {/* Trip Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>Plan Your Family Itinerary</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ParameterInput
              type="text"
              label="Destination"
              value={params.destination}
              onChange={(v) => setParams((p) => ({ ...p, destination: v }))}
              placeholder="Where are you going?"
              icon="location"
            />
            <ParameterInput
              type="date"
              label="Start Date"
              value={params.startDate}
              onChange={(v) => setParams((p) => ({ ...p, startDate: v }))}
              icon="calendar"
            />
            <ParameterInput
              type="date"
              label="End Date"
              value={params.endDate}
              onChange={(v) => setParams((p) => ({ ...p, endDate: v }))}
              icon="calendar"
            />
            <ParameterInput
              type="text"
              label="Children’s Ages"
              value={params.childAges}
              onChange={(v) => setParams((p) => ({ ...p, childAges: v }))}
              placeholder="e.g., 3, 7, 10"
              icon="users"
            />
            <ParameterInput
              type="text"
              label="Daily Budget"
              value={params.budget}
              onChange={(v) => setParams((p) => ({ ...p, budget: v }))}
              placeholder="Budget per day"
              icon="budget"
            />
            <ParameterInput
              type="text"
              label="Interests & Preferences"
              value={params.interests}
              onChange={(v) => setParams((p) => ({ ...p, interests: v }))}
              placeholder="Museums, beaches, soft play..."
            />
          </div>

          <div className="mt-6">
            <Button
              onClick={handleCreateItinerary}
              disabled={isLoading || !params.destination}
              className="w-full md:w-auto"
              data-testid="button-create-itinerary"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating Your Perfect Itinerary...
                </>
              ) : (
                <>
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Create Itinerary
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Itinerary Display */}
      {itinerary.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold">Your Family Itinerary</h2>
            <div className="flex space-x-2">
              <ParameterInput
                type="text"
                label="Email Address"
                value={params.email}
                onChange={(v) => setParams((p) => ({ ...p, email: v }))}
                placeholder="Enter email to send itinerary"
                className="w-64"
              />
              <Button
                variant="outline"
                onClick={() => setShowRefinement(true)}
                data-testid="button-refine-itinerary"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refine
              </Button>
              <Button
                onClick={handleEmailItinerary}
                disabled={isSendingEmail || !params.email}
                data-testid="button-email-itinerary"
              >
                {isSendingEmail ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Itinerary
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {itinerary.map((day) => (
              <ItineraryDay
                key={day.dayNumber}
                day={day}
                onModifyActivity={handleModifyActivity}
                onViewRoute={handleViewRoute}
              />
            ))}
          </div>
        </div>
      )}

      {/* Refinement Panel */}
      <RefinementPanel
        type="itinerary"
        isOpen={showRefinement}
        onClose={() => setShowRefinement(false)}
        onRefine={handleRefinement}
        currentSuggestions={itinerary.map((d) => d.theme)}
      />
    </div>
  );
}
