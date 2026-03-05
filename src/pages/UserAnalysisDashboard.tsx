import { Link } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowLeftRight, Database, LineChart, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUploadSession } from "@/lib/upload-session";
import { uploadedAnalysisRows, uploadedMonthlyPerformance, uploadedRegionPerformance } from "@/lib/constants";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function UserAnalysisDashboard() {
  const uploadSession = getUploadSession();

  if (!uploadSession) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Analysis Dashboard</h1>
          <p className="text-sm text-muted-foreground">Upload a file first to unlock mapped analysis views.</p>
        </div>

        <Alert>
          <Upload className="h-4 w-4" />
          <AlertTitle>No uploaded dataset yet</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>Go to the Command Center, upload a file, map the columns, and then come back here.</span>
            <Button asChild>
              <Link to="/">Go to uploader</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalRevenue = uploadedAnalysisRows.reduce((sum, row) => sum + row.unit_price * row.quantity, 0);
  const totalCost = uploadedAnalysisRows.reduce((sum, row) => sum + row.unit_cost * row.quantity, 0);
  const totalUnits = uploadedAnalysisRows.reduce((sum, row) => sum + row.quantity, 0);
  const totalProfit = totalRevenue - totalCost;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Analysis Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            This view uses your mapped upload to show table-based analysis plus a visual breakdown.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{uploadSession.fileName}</Badge>
          <Badge variant="secondary">{uploadSession.rowCount} demo rows</Badge>
          <Badge variant="secondary">Mapped {Object.keys(uploadSession.mapping).length} fields</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currency.format(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currency.format(totalProfit)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Uploaded At</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{new Date(uploadSession.uploadedAt).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LineChart className="h-4 w-4 text-primary" />
              Revenue and profit trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uploadedMonthlyPerformance}>
                  <defs>
                    <linearGradient id="analysisRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                    formatter={(value: number) => currency.format(value)}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#analysisRevenue)" />
                  <Area type="monotone" dataKey="profit" stroke="hsl(var(--destructive))" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-primary" />
              Region comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uploadedRegionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="region" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                    formatter={(value: number) => currency.format(value)}
                  />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Uploaded rows preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedAnalysisRows.map((row) => (
                  <TableRow key={`${row.date}-${row.product_id}`}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell className="font-mono text-xs">{row.product_id}</TableCell>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>{row.region}</TableCell>
                    <TableCell>{currency.format(row.unit_price)}</TableCell>
                    <TableCell>{currency.format(row.unit_cost)}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ArrowLeftRight className="h-4 w-4 text-primary" />
              Saved column mapping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(uploadSession.mapping).map(([target, source]) => (
              <div key={target} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <span className="font-medium">{target}</span>
                <Badge variant="outline">{source}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
