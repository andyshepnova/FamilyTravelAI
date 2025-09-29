import ActivityCard from '../ActivityCard';

export default function ActivityCardExample() {
  // todo: remove mock functionality
  const mockActivity = {
    id: "park-guell",
    name: "Park Güell",
    description: "Explore Gaudí's whimsical park with stunning city views, perfect for families with children of all ages.",
    duration: "2-3 hours",
    ageRange: "All ages",
    location: "Gràcia, Barcelona",
    cost: "€15 per adult",
    rating: 4.6,
    category: "Cultural",
    linkStatus: "verified" as const,
    bookingUrl: "https://example.com/park-guell"
  };
  
  const handleModify = (id: string) => {
    console.log('Modify activity:', id);
  };
  
  return (
    <div className="p-4 max-w-md">
      <ActivityCard 
        activity={mockActivity}
        timeSlot="9:00 AM"
        onModifyActivity={handleModify}
      />
    </div>
  );
}
