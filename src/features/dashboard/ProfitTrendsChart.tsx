import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyProfitData } from "@/lib/mock-data";

export function ProfitTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Profit Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProfitData}>
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(222.2, 47.4%, 11.2%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(222.2, 47.4%, 11.2%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(215.4, 16.3%, 46.9%)" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(215.4, 16.3%, 46.9%)" }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214.3, 31.8%, 91.4%)",
                  borderRadius: "0.5rem",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Profit"]}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="hsl(222.2, 47.4%, 11.2%)"
                strokeWidth={2}
                fill="url(#profitGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
