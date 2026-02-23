import { DollarSign, TrendingUp, Percent, AlertTriangle } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { TrendsChart } from "@/components/TrendsChart";
import { QuickUpload } from "@/components/QuickUpload";
import { InsightsList } from "@/components/InsightsList";
import { sparklines } from "@/lib/constants";

const metrics = [
  { title: "Revenue", value: "$1.38M", icon: DollarSign, data: sparklines.revenue, color: "hsl(142, 71%, 45%)" },
  { title: "Profit", value: "$679K", icon: TrendingUp, data: sparklines.profit, color: "hsl(222, 47%, 11%)" },
  { title: "Margin %", value: "49.2%", icon: Percent, data: sparklines.margin, color: "hsl(262, 83%, 58%)" },
  { title: "Anomalies", value: "15", icon: AlertTriangle, data: sparklines.anomalies, color: "hsl(0, 84%, 60%)" },
];

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Command Center</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard key={m.title} title={m.title} value={m.value} icon={m.icon} sparklineData={m.data} sparklineColor={m.color} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TrendsChart />
        </div>
        <div className="lg:col-span-2">
          <QuickUpload />
        </div>
      </div>

      <InsightsList />
    </div>
  );
}
