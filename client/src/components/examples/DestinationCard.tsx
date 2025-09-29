import DestinationCard from '../DestinationCard';

export default function DestinationCardExample() {
  // todo: remove mock functionality
  const mockDestination = {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    description: "A vibrant coastal city perfect for families, with stunning architecture, beautiful beaches, and incredible food culture.",
    bestFor: ["Beach", "Culture", "Architecture", "Food"],
    rating: 4.8,
    weatherInfo: "Warm and sunny",
    estimatedBudget: "$150-200/day",
    imageUrl: "/placeholder-barcelona.jpg",
    keyAttractions: ["Park Güell", "Sagrada Familia", "Beach"],
    familyFriendlyScore: 9,
    linkStatus: "verified" as const
  };
  
  const handleSelect = (id: string) => {
    console.log('Selected destination:', id);
  };
  
  return (
    <div className="p-4 max-w-sm">
      <DestinationCard 
        destination={mockDestination}
        onSelectDestination={handleSelect}
      />
    </div>
  );
}
