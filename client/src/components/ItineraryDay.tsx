import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import ActivityCard from "./ActivityCard";

interface ItineraryDayProps {
  day: {
    dayNumber: number;
    date: string;
    theme: string;
    totalWalkingTime: string;
    activities: Array<{
      id: string;
      name: string;
      description: string;
      duration: string;
      ageRange: string;
      location: string;
      cost: string;
      rating: number;
      category: string;
      linkStatus: "verified" | "checking" | "failed";
      bookingUrl?: string;
      timeSlot: string;
    }>;
  };
  onModifyActivity: (activityId: string) => void;
  onViewRoute: (dayNumber: number) => void;
}

export default function ItineraryDay({ day, onModifyActivity, onViewRoute }: ItineraryDayProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Day {day.dayNumber}</span>
            <Badge variant="secondary">{day.date}</Badge>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewRoute(day.dayNumber)}
            data-testid={`button-view-route-day-${day.dayNumber}`}
          >
            <MapPin className="h-4 w-4 mr-2" />
            View Route
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span className="font-medium">Theme:</span>
            <Badge variant="outline">{day.theme}</Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Total walking: {day.totalWalkingTime}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {day.activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              timeSlot={activity.timeSlot}
              onModifyActivity={onModifyActivity}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
