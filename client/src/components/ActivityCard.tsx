import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, ExternalLink, Star } from "lucide-react";
import LinkValidationBadge from "./LinkValidationBadge";

interface ActivityCardProps {
  activity: {
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
  };
  timeSlot: string;
  onModifyActivity: (id: string) => void;
}

export default function ActivityCard({ activity, timeSlot, onModifyActivity }: ActivityCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "outdoor":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cultural":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "entertainment":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "dining":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {timeSlot}
            </Badge>
            <Badge className={`text-xs ${getCategoryColor(activity.category)}`}>
              {activity.category}
            </Badge>
          </div>
          <LinkValidationBadge status={activity.linkStatus} />
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{activity.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            <span className="text-sm font-medium">{activity.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {activity.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{activity.ageRange}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{activity.location}</span>
          </div>
          <div className="font-semibold">
            {activity.cost}
          </div>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onModifyActivity(activity.id)}
            data-testid={`button-modify-${activity.id}`}
          >
            Modify
          </Button>
          {activity.bookingUrl && (
            <Button 
              size="sm" 
              className="flex-1"
              data-testid={`button-book-${activity.id}`}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
