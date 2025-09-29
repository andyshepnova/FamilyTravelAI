import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, MessageSquare, X } from "lucide-react";
import { useState } from "react";

interface RefinementPanelProps {
  type: "inspiration" | "itinerary";
  isOpen: boolean;
  onClose: () => void;
  onRefine: (feedback: string, quickOption?: string) => void;
  currentSuggestions?: string[];
}

export default function RefinementPanel({ 
  type, 
  isOpen, 
  onClose, 
  onRefine, 
  currentSuggestions = [] 
}: RefinementPanelProps) {
  const [customFeedback, setCustomFeedback] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  const quickRefinements = type === "inspiration" 
    ? [
        "Show more budget-friendly options",
        "Focus on warmer destinations",
        "Include more outdoor activities",
        "Show options with shorter flights",
        "More family resorts"
      ]
    : [
        "Less walking between activities",
        "More indoor backup options",
        "Earlier start times",
        "More time for meals",
        "Add more free activities"
      ];

  const handleQuickRefine = async (option: string) => {
    setIsRefining(true);
    await onRefine("", option);
    setIsRefining(false);
  };

  const handleCustomRefine = async () => {
    if (!customFeedback.trim()) return;
    setIsRefining(true);
    await onRefine(customFeedback);
    setCustomFeedback("");
    setIsRefining(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              <span>Refine Your {type === "inspiration" ? "Inspiration" : "Itinerary"}</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Quick Refinements</h3>
            <div className="flex flex-wrap gap-2">
              {quickRefinements.map((option, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover-elevate transition-all"
                  onClick={() => handleQuickRefine(option)}
                  data-testid={`badge-quick-refine-${index}`}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Custom Feedback</span>
            </h3>
            <Textarea
              placeholder={`Tell us what you'd like to change about the ${type === "inspiration" ? "suggested destinations" : "itinerary"}...`}
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              className="min-h-[100px]"
              data-testid="textarea-custom-feedback"
            />
          </div>
          
          {currentSuggestions.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Current Suggestions</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {currentSuggestions.map((suggestion, index) => (
                  <div key={index} className="text-sm p-2 bg-muted rounded text-muted-foreground">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCustomRefine}
              disabled={!customFeedback.trim() || isRefining}
              data-testid="button-apply-refinement"
            >
              {isRefining ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refining...
                </>
              ) : (
                "Apply Refinement"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
