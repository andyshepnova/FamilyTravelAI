import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Hero from "@/components/Hero";
import InspirationWorkflow from "@/components/InspirationWorkflow";
import ItineraryWorkflow from "@/components/ItineraryWorkflow";

function App() {
  const [currentWorkflow, setCurrentWorkflow] = useState<"inspiration" | "itinerary">("inspiration");
  const [showHero, setShowHero] = useState(true);

  const handleGetInspiration = (params: any) => {
    console.log('Getting inspiration with params:', params);
    setShowHero(false);
    // todo: implement OpenAI API call for inspiration
  };

  const handleCreateItinerary = (params: any) => {
    console.log('Creating itinerary with params:', params);
    setShowHero(false);
    // todo: implement OpenAI API call for itinerary creation
  };

  const handleWorkflowChange = (workflow: "inspiration" | "itinerary") => {
    setCurrentWorkflow(workflow);
    // Reset to show hero when switching workflows
    setShowHero(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <AppHeader 
            currentWorkflow={currentWorkflow}
            onWorkflowChange={handleWorkflowChange}
          />
          
          <main className="flex flex-col">
            {showHero && (
              <Hero 
                currentWorkflow={currentWorkflow}
                onWorkflowChange={handleWorkflowChange}
              />
            )}
            
            <div className="container mx-auto px-4 py-8">
              {currentWorkflow === "inspiration" ? (
                <InspirationWorkflow onGetInspiration={handleGetInspiration} />
              ) : (
                <ItineraryWorkflow onCreateItinerary={handleCreateItinerary} />
              )}
            </div>
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
