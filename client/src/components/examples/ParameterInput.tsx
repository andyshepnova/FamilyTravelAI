import ParameterInput from '../ParameterInput';
import { useState } from 'react';

export default function ParameterInputExample() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [weather, setWeather] = useState('');
  
  return (
    <div className="p-4 space-y-4 max-w-md">
      <h3 className="font-semibold">Parameter Input Examples</h3>
      
      <ParameterInput
        type="text"
        label="Destination"
        value={destination}
        onChange={setDestination}
        placeholder="Where would you like to go?"
        icon="location"
      />
      
      <ParameterInput
        type="select"
        label="Weather Preference"
        value={weather}
        onChange={setWeather}
        placeholder="Select weather preference"
        options={["Hot", "Warm", "Mild", "Cool", "Any"]}
        icon="calendar"
      />
      
      <ParameterInput
        type="number"
        label="Budget (per day)"
        value={budget}
        onChange={setBudget}
        placeholder="Enter daily budget"
        icon="budget"
      />
      
      <ParameterInput
        type="text"
        label="Trip Duration"
        value={duration}
        onChange={setDuration}
        placeholder="How many days?"
        icon="calendar"
      />
    </div>
  );
}
