import AppHeader from '../AppHeader';
import { useState } from 'react';

export default function AppHeaderExample() {
  const [workflow, setWorkflow] = useState<"inspiration" | "itinerary">("inspiration");
  
  return (
    <AppHeader 
      currentWorkflow={workflow}
      onWorkflowChange={setWorkflow}
    />
  );
}
