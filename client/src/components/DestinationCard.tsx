import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, ExternalLink } from "lucide-react";
import LinkValidationBadge from "./LinkValidationBadge";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    country: string;
    description: string;
    bestFor: string[];
    rating: number;
    weatherInfo: string;
    estimatedBudget: string;
    imageUrl: string;
    keyAttractions: string[];
    familyFriendlyScore: number;
    linkStatus: "verified" | "checking" | "failed";
  };
  onSelectDestination: (id: string) => void;
}

export default function DestinationCard({ destination, onSelectDestination }: DestinationCardProps) {
  return (
    <Card className="hover-elevate cursor-pointer transition-all duration-200 h-full">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
          <MapPin className="h-12 w-12 text-primary/60" />
        </div>
        <div className="absolute top-2 right-2">
          <LinkValidationBadge status={destination.linkStatus} />
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-current" />
            <span>{destination.rating}</span>
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{destination.name}</span>
          <Badge variant="outline" className="text-xs">
            {destination.country}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {destination.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Family Score:</span>
            <Badge variant="default" className="text-xs">
              {destination.familyFriendlyScore}/10
            </Badge>
          </div>
          
          <div className="text-sm">
            <span className="text-muted-foreground">Weather:</span>
            <span className="ml-2">{destination.weatherInfo}</span>
          </div>
          
          <div className="text-sm">
            <span className="text-muted-foreground">Budget:</span>
            <span className="ml-2 font-semibold">{destination.estimatedBudget}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {destination.bestFor.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          onClick={() => onSelectDestination(destination.id)}
          className="w-full"
          data-testid={`button-select-destination-${destination.id}`}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Explore Destination
        </Button>
      </CardContent>
    </Card>
  );
}
