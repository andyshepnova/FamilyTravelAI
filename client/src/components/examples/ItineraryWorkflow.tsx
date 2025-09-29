import ItineraryWorkflow from '../ItineraryWorkflow';

export default function ItineraryWorkflowExample() {
  const handleCreateItinerary = (params: any) => {
    console.log('Creating itinerary with params:', params);
  };
  
  return (
    <div className="p-4">
      <ItineraryWorkflow onCreateItinerary={handleCreateItinerary} />
    </div>
  );
}
