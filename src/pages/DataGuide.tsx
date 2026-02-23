import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, FileSpreadsheet, Info } from "lucide-react";

const columns = [
  { name: "date", type: "Date", example: "2024-01-15", description: "Transaction date" },
  { name: "product_id", type: "String", example: "PROD-042", description: "Unique product identifier" },
  { name: "product_name", type: "String", example: "Widget Pro", description: "Human-readable product name" },
  { name: "region", type: "String", example: "North America", description: "Sales region" },
  { name: "unit_price", type: "Number", example: "149.99", description: "Price per unit sold" },
  { name: "unit_cost", type: "Number", example: "87.50", description: "Cost per unit" },
  { name: "quantity", type: "Integer", example: "250", description: "Units sold" },
];

const dos = [
  "Use YYYY-MM-DD format for all dates",
  "Include headers in the first row",
  "Use UTF-8 encoding for your CSV file",
  "Use decimal points (not commas) for numbers",
  "Keep product IDs consistent across uploads",
];

const donts = [
  "Leave empty rows or columns in the data",
  "Use special characters in column headers",
  "Mix date formats within the same file",
  "Include currency symbols in numeric fields",
  "Exceed 50 MB per upload",
];

export default function DataGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Standardization Guide</h1>
        <p className="text-muted-foreground mt-1">
          Follow these specifications to ensure your CSV files are processed correctly.
        </p>
      </div>

      {/* Required columns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Required CSV Structure</CardTitle>
          </div>
          <CardDescription>
            Your file must contain these columns with the exact header names shown below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column Name</TableHead>
                <TableHead>Data Type</TableHead>
                <TableHead>Example</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((col) => (
                <TableRow key={col.name}>
                  <TableCell className="font-mono text-sm font-medium">{col.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{col.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{col.example}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {col.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dos and Don'ts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Do</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg">Don't</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {donts.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tip */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Pro Tip</p>
            <p className="text-muted-foreground mt-1">
              Download our{" "}
              <span className="font-medium text-primary cursor-pointer hover:underline">
                sample CSV template
              </span>{" "}
              to get started quickly. It includes all required columns pre-filled with example data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
