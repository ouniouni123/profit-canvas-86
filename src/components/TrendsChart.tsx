import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyProfitData } from "@/lib/constants";

export function TrendsChart() {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Recent Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProfitData}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(222, 47%, 11%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(222, 47%, 11%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(214,32%,91%)", borderRadius: "0.5rem" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Profit"]}
              />
              <Area type="monotone" dataKey="profit" stroke="hsl(222, 47%, 11%)" strokeWidth={2} fill="url(#profitGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
