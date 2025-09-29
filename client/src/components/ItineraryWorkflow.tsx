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
    email: ""
  });
  
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRefinement, setShowRefinement] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleCreateItinerary = async () => {
    setIsLoading(true);
    
    // todo: remove mock functionality
    setTimeout(() => {
      const mockItinerary = [
        {
          dayNumber: 1,
          date: "March 15, 2024",
          theme: "Cultural Exploration",
          totalWalkingTime: "2.5 hours",
          activities: [
            {
              id: "sagrada-familia",
              name: "Sagrada Familia",
              description: "Visit Gaudí's masterpiece with skip-the-line tickets",
              duration: "2 hours",
              ageRange: "6+ years",
              location: "Eixample",
              cost: "€26 per adult",
              rating: 4.8,
              category: "Cultural",
              linkStatus: "verified" as const,
              bookingUrl: "https://example.com/sagrada",
              timeSlot: "9:00 AM"
            },
            {
              id: "lunch-tapas",
              name: "Tapas Lunch",
              description: "Family-friendly restaurant near the cathedral",
              duration: "1 hour",
              ageRange: "All ages",
              location: "Gothic Quarter",
              cost: "€45 for family",
              rating: 4.5,
              category: "Dining",
              linkStatus: "verified" as const,
              timeSlot: "12:30 PM"
            },
            {
              id: "park-guell",
              name: "Park Güell",
              description: "Explore Gaudí's whimsical park with stunning city views",
              duration: "2-3 hours",
              ageRange: "All ages",
              location: "Gràcia",
              cost: "€15 per adult",
              rating: 4.6,
              category: "Cultural",
              linkStatus: "verified" as const,
              bookingUrl: "https://example.com/park-guell",
              timeSlot: "3:00 PM"
            }
          ]
        },
        {
          dayNumber: 2,
          date: "March 16, 2024",
          theme: "Beach & Relaxation",
          totalWalkingTime: "1 hour",
          activities: [
            {
              id: "barceloneta-beach",
              name: "Barceloneta Beach",
              description: "Family beach time with nearby cafes and playgrounds",
              duration: "3 hours",
              ageRange: "All ages",
              location: "Barceloneta",
              cost: "Free",
              rating: 4.3,
              category: "Outdoor",
              linkStatus: "verified" as const,
              timeSlot: "10:00 AM"
            },
            {
              id: "aquarium",
              name: "Barcelona Aquarium",
              description: "One of Europe's largest aquariums with underwater tunnel",
              duration: "2 hours",
              ageRange: "All ages",
              location: "Port Vell",
              cost: "€22 per adult",
              rating: 4.4,
              category: "Entertainment",
              linkStatus: "checking" as const,
              bookingUrl: "https://example.com/aquarium",
              timeSlot: "2:00 PM"
            }
          ]
        }
      ];
      setItinerary(mockItinerary);
      setIsLoading(false);
    }, 3000);
  };

  const handleModifyActivity = (activityId: string) => {
    console.log('Modify activity:', activityId);
    setShowRefinement(true);
  };

  const handleViewRoute = (dayNumber: number) => {
    console.log('View route for day:', dayNumber);
    // todo: integrate with Google Maps API
  };

  const handleRefinement = async (feedback: string, quickOption?: string) => {
    console.log('Refining itinerary with:', { feedback, quickOption });
    // todo: implement refinement logic
  };

  const handleEmailItinerary = async () => {
    if (!params.email) {
      alert('Please provide an email address');
      return;
    }
    
    setIsSendingEmail(true);
    // todo: implement email sending
    setTimeout(() => {
      console.log('Email sent to:', params.email);
      setIsSendingEmail(false);
      alert('Itinerary sent successfully!');
    }, 2000);
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
              onChange={(value) => setParams(prev => ({ ...prev, destination: value }))}
              placeholder="Where are you going?"
              icon="location"
            />
            
            <ParameterInput
              type="date"
              label="Start Date"
              value={params.startDate}
              onChange={(value) => setParams(prev => ({ ...prev, startDate: value }))}
              icon="calendar"
            />
            
            <ParameterInput
              type="date"
              label="End Date"
              value={params.endDate}
              onChange={(value) => setParams(prev => ({ ...prev, endDate: value }))}
              icon="calendar"
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
              type="text"
              label="Daily Budget"
              value={params.budget}
              onChange={(value) => setParams(prev => ({ ...prev, budget: value }))}
              placeholder="Budget per day"
              icon="budget"
            />
            
            <ParameterInput
              type="text"
              label="Interests & Preferences"
              value={params.interests}
              onChange={(value) => setParams(prev => ({ ...prev, interests: value }))}
              placeholder="What do you enjoy?"
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

      {/* Itinerary Results */}
      {itinerary.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold">Your Family Itinerary</h2>
            <div className="flex space-x-2">
              <ParameterInput
                type="text"
                label="Email Address"
                value={params.email}
                onChange={(value) => setParams(prev => ({ ...prev, email: value }))}
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

      <RefinementPanel
        type="itinerary"
        isOpen={showRefinement}
        onClose={() => setShowRefinement(false)}
        onRefine={handleRefinement}
        currentSuggestions={itinerary.map(day => day.theme)}
      />
    </div>
  );
}
