import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LinkValidationBadgeProps {
  status: "verified" | "checking" | "failed";
  className?: string;
}

export default function LinkValidationBadge({ status, className }: LinkValidationBadgeProps) {
  const getIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-3 w-3" />;
      case "checking":
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case "failed":
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getVariant = () => {
    switch (status) {
      case "verified":
        return "default" as const;
      case "checking":
        return "secondary" as const;
      case "failed":
        return "destructive" as const;
    }
  };

  const getText = () => {
    switch (status) {
      case "verified":
        return "Verified";
      case "checking":
        return "Checking";
      case "failed":
        return "Link Issue";
    }
  };

  return (
    <Badge 
      variant={getVariant()} 
      className={`inline-flex items-center space-x-1 text-xs ${className}`}
      data-testid={`badge-link-${status}`}
    >
      {getIcon()}
      <span>{getText()}</span>
    </Badge>
  );
}
