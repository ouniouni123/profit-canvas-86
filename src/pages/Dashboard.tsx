import { DollarSign, TrendingUp, Percent, AlertTriangle } from "lucide-react";
import { MetricCard } from "@/features/dashboard/MetricCard";
import { ProfitTrendsChart } from "@/features/dashboard/ProfitTrendsChart";
import { RecentInsights } from "@/features/dashboard/RecentInsights";
import {
  revenueSparkline,
  profitSparkline,
  marginSparkline,
  anomalySparkline,
} from "@/lib/mock-data";

const metricCards = [
  { title: "Revenue", value: "$1.38M", icon: DollarSign, data: revenueSparkline, color: "hsl(142, 71%, 45%)" },
  { title: "Profit", value: "$679K", icon: TrendingUp, data: profitSparkline, color: "hsl(222, 47%, 11%)" },
  { title: "Margin %", value: "49.2%", icon: Percent, data: marginSparkline, color: "hsl(262, 83%, 58%)" },
  { title: "Anomalies", value: "15", icon: AlertTriangle, data: anomalySparkline, color: "hsl(0, 84%, 60%)" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            sparklineData={card.data}
            sparklineColor={card.color}
          />
        ))}
      </div>

      <ProfitTrendsChart />
      <RecentInsights />
    </div>
  );
}
