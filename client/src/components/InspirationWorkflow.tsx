import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Search, RefreshCw } from "lucide-react";
import { useState } from "react";
import ParameterInput from "./ParameterInput";
import DestinationCard from "./DestinationCard";
import RefinementPanel from "./RefinementPanel";

interface InspirationWorkflowProps {
  onGetInspiration: (params: any) => void;
}

export default function InspirationWorkflow({ onGetInspiration }: InspirationWorkflowProps) {
  const [params, setParams] = useState({
    weather: "",
    budget: "",
    interests: "",
    childAges: "",
    duration: "",
    travelMonth: ""
  });
  
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRefinement, setShowRefinement] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    
    // todo: remove mock functionality
    setTimeout(() => {
      const mockResults = [
        {
          id: "barcelona",
          name: "Barcelona",
          country: "Spain",
          description: "A vibrant coastal city perfect for families, with stunning architecture, beautiful beaches, and incredible food culture.",
          bestFor: ["Beach", "Culture", "Architecture", "Food"],
          rating: 4.8,
          weatherInfo: "Warm and sunny",
          estimatedBudget: "$150-200/day",
          imageUrl: "/placeholder-barcelona.jpg",
          keyAttractions: ["Park Güell", "Sagrada Familia", "Beach"],
          familyFriendlyScore: 9,
          linkStatus: "verified" as const
        },
        {
          id: "lisbon",
          name: "Lisbon",
          country: "Portugal",
          description: "Charming European capital with historic trams, colorful tiles, and family-friendly attractions.",
          bestFor: ["History", "Trams", "Food", "Culture"],
          rating: 4.6,
          weatherInfo: "Mild and pleasant",
          estimatedBudget: "$120-180/day",
          imageUrl: "/placeholder-lisbon.jpg",
          keyAttractions: ["Belém Tower", "Tram 28", "Oceanarium"],
          familyFriendlyScore: 8,
          linkStatus: "checking" as const
        }
      ];
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleSelectDestination = (id: string) => {
    console.log('Selected destination:', id);
    // Here you could navigate to detailed view or start itinerary planning
  };

  const handleRefinement = async (feedback: string, quickOption?: string) => {
    console.log('Refining inspiration with:', { feedback, quickOption });
    // todo: implement refinement logic
  };

  return (
    <div className="space-y-6">
      {/* Parameter Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Find Your Perfect Family Destination</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ParameterInput
              type="select"
              label="Weather Preference"
              value={params.weather}
              onChange={(value) => setParams(prev => ({ ...prev, weather: value }))}
              placeholder="Select weather preference"
              options={["Hot", "Warm", "Mild", "Cool", "Any"]}
              icon="calendar"
            />
            
            <ParameterInput
              type="text"
              label="Daily Budget Range"
              value={params.budget}
              onChange={(value) => setParams(prev => ({ ...prev, budget: value }))}
              placeholder="e.g., $100-200 per day"
              icon="budget"
            />
            
            <ParameterInput
              type="text"
              label="Children's Ages"
              value={params.childAges}
              onChange={(value) => setParams(prev => ({ ...prev, childAges: value }))}
              placeholder="e.g., 5, 8, 12"
              icon="users"
            />
            
            <ParameterInput
              type="select"
              label="Travel Duration"
              value={params.duration}
              onChange={(value) => setParams(prev => ({ ...prev, duration: value }))}
              placeholder="How long?"
              options={["2-3 days", "4-6 days", "1 week", "2+ weeks"]}
              icon="calendar"
            />
            
            <ParameterInput
              type="select"
              label="Travel Month"
              value={params.travelMonth}
              onChange={(value) => setParams(prev => ({ ...prev, travelMonth: value }))}
              placeholder="When?"
              options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Flexible"]}
              icon="calendar"
            />
            
            <ParameterInput
              type="text"
              label="Interests & Activities"
              value={params.interests}
              onChange={(value) => setParams(prev => ({ ...prev, interests: value }))}
              placeholder="e.g., beaches, museums, parks"
            />
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full md:w-auto"
              data-testid="button-get-inspiration"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Finding Perfect Destinations...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Get Inspiration
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Perfect Destinations for Your Family</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowRefinement(true)}
              data-testid="button-refine-inspiration"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refine Results
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelectDestination={handleSelectDestination}
              />
            ))}
          </div>
        </div>
      )}

      <RefinementPanel
        type="inspiration"
        isOpen={showRefinement}
        onClose={() => setShowRefinement(false)}
        onRefine={handleRefinement}
        currentSuggestions={results.map(r => r.name)}
      />
    </div>
  );
}
