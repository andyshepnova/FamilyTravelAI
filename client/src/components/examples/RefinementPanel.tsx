import RefinementPanel from '../RefinementPanel';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function RefinementPanelExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"inspiration" | "itinerary">("inspiration");
  
  const handleRefine = async (feedback: string, quickOption?: string) => {
    console.log('Refining with:', { feedback, quickOption });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  
  // todo: remove mock functionality
  const mockSuggestions = [
    "Consider Barcelona for great architecture and beaches",
    "Look into Costa Brava for family-friendly resorts",
    "Portugal offers excellent weather and budget options"
  ];
  
  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        <Button onClick={() => { setType("inspiration"); setIsOpen(true); }}>
          Open Inspiration Refinement
        </Button>
        <Button onClick={() => { setType("itinerary"); setIsOpen(true); }}>
          Open Itinerary Refinement
        </Button>
      </div>
      
      <RefinementPanel
        type={type}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRefine={handleRefine}
        currentSuggestions={mockSuggestions}
      />
    </div>
  );
}
