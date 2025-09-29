import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";

interface ParameterInputProps {
  type: "text" | "select" | "number" | "date";
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: string[];
  icon?: "calendar" | "location" | "users" | "budget";
  className?: string;
}

export default function ParameterInput({
  type,
  label,
  value,
  onChange,
  placeholder,
  options,
  icon,
  className
}: ParameterInputProps) {
  const getIcon = () => {
    switch (icon) {
      case "calendar":
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
      case "location":
        return <MapPin className="h-4 w-4 text-muted-foreground" />;
      case "users":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "budget":
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger data-testid={`select-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium flex items-center space-x-2">
        {getIcon()}
        <span>{label}</span>
      </Label>
      {renderInput()}
    </div>
  );
}
