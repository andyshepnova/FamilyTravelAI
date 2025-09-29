import Hero from '../Hero';
import { useState } from 'react';

export default function HeroExample() {
  const [workflow, setWorkflow] = useState<"inspiration" | "itinerary">("inspiration");
  
  return (
    <Hero 
      currentWorkflow={workflow}
      onWorkflowChange={setWorkflow}
    />
  );
}
