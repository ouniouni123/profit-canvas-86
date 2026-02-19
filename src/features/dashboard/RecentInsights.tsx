import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { recentInsights } from "@/lib/mock-data";

const severityConfig = {
  info: { icon: Info, className: "text-blue-500" },
  warning: { icon: AlertTriangle, className: "text-yellow-500" },
  error: { icon: AlertCircle, className: "text-destructive" },
};

export function RecentInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentInsights.map((insight) => {
          const config = severityConfig[insight.severity];
          const SeverityIcon = config.icon;
          return (
            <div key={insight.id} className="flex gap-3 rounded-lg border p-3">
              <SeverityIcon className={`mt-0.5 h-5 w-5 shrink-0 ${config.className}`} />
              <div className="min-w-0">
                <p className="font-medium text-sm">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(insight.timestamp).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
