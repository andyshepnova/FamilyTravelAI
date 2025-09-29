import { Plane } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  currentWorkflow: "inspiration" | "itinerary";
  onWorkflowChange: (workflow: "inspiration" | "itinerary") => void;
}

export default function AppHeader({ currentWorkflow, onWorkflowChange }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Travel After Kids</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={currentWorkflow === "inspiration" ? "default" : "ghost"}
                size="sm"
                onClick={() => onWorkflowChange("inspiration")}
                data-testid="button-inspiration-mode"
                className="text-sm"
              >
                Find Inspiration
              </Button>
              <Button
                variant={currentWorkflow === "itinerary" ? "default" : "ghost"}
                size="sm"
                onClick={() => onWorkflowChange("itinerary")}
                data-testid="button-itinerary-mode"
                className="text-sm"
              >
                Plan Itinerary
              </Button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
