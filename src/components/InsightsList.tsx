import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { recentInsights } from "@/lib/constants";

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colors = {
  info: "text-primary",
  warning: "text-warning",
  error: "text-destructive",
};

export function InsightsList() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">Recent Insights</h3>
      {recentInsights.map((item) => {
        const Icon = icons[item.severity];
        return (
          <div key={item.id} className="flex gap-3 rounded-lg border p-3">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${colors[item.severity]}`} />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
