import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Globe, Star } from "lucide-react";

interface HeroProps {
  currentWorkflow: "inspiration" | "itinerary";
  onWorkflowChange: (workflow: "inspiration" | "itinerary") => void;
}

export default function Hero({ currentWorkflow, onWorkflowChange }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background with Dark Wash */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        {/* Placeholder for family travel imagery */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-orange-400/20 flex items-center justify-center">
          <div className="text-center text-primary/30">
            <Globe className="h-32 w-32 mx-auto mb-4" />
            <p className="text-sm">Family Travel Background Image</p>
          </div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          <Badge className="mb-4" variant="secondary">
            <Star className="h-3 w-3 mr-1" />
            Ultimate Family Travel Concierge
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-primary-foreground">
            Travel After Kids
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover amazing family destinations and create perfect day-by-day itineraries 
            designed specifically for families with children.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              size="lg" 
              variant={currentWorkflow === "inspiration" ? "default" : "outline"}
              onClick={() => onWorkflowChange("inspiration")}
              className="w-full sm:w-auto text-lg px-8 py-4 backdrop-blur-md bg-background/80 border-2"
              data-testid="button-hero-inspiration"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Inspiration
            </Button>
            <Button 
              size="lg" 
              variant={currentWorkflow === "itinerary" ? "default" : "outline"}
              onClick={() => onWorkflowChange("itinerary")}
              className="w-full sm:w-auto text-lg px-8 py-4 backdrop-blur-md bg-background/80 border-2"
              data-testid="button-hero-itinerary"
            >
              <Users className="h-5 w-5 mr-2" />
              Plan Itinerary
            </Button>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            <Card className="backdrop-blur-md bg-background/80 border-primary/20">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">AI-powered suggestions based on your family's needs</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-background/80 border-primary/20">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Age-Appropriate Planning</h3>
                <p className="text-sm text-muted-foreground">Activities perfectly suited for your children's ages</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-background/80 border-primary/20">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Verified Links</h3>
                <p className="text-sm text-muted-foreground">All recommendations include checked, working links</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
