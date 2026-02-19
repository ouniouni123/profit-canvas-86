import { ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SecurityPolicy() {
  return (
    <Card className="border-warning bg-warning-muted">
      <CardContent className="flex items-start gap-3 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
        <div>
          <p className="font-semibold text-sm text-warning-foreground">3 Strikes Policy</p>
          <p className="text-xs text-warning-foreground/80 mt-1">
            Uploading illegal or harmful content will result in a permanent ban after three violations.
            All uploads are monitored and logged for compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
