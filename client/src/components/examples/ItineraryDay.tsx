import ItineraryDay from '../ItineraryDay';

export default function ItineraryDayExample() {
  // todo: remove mock functionality
  const mockDay = {
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
      }
    ]
  };
  
  const handleModifyActivity = (id: string) => {
    console.log('Modify activity:', id);
  };
  
  const handleViewRoute = (dayNumber: number) => {
    console.log('View route for day:', dayNumber);
  };
  
  return (
    <div className="p-4 max-w-2xl">
      <ItineraryDay 
        day={mockDay}
        onModifyActivity={handleModifyActivity}
        onViewRoute={handleViewRoute}
      />
    </div>
  );
}
