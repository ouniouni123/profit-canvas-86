import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import { ReportCard } from "@/features/reports/ReportCard";
import { executiveReports } from "@/lib/mock-data";

export default function ExecutiveReports() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [reportSummaries, setReportSummaries] = useState(
    executiveReports.map((r) => r.summary)
  );

  const handleSummaryChange = (index: number, value: string) => {
    setReportSummaries((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Executive Reports</h1>
        <Button
          variant={isEditMode ? "default" : "outline"}
          onClick={() => setIsEditMode(!isEditMode)}
          className="gap-2"
        >
          {isEditMode ? <><Save className="h-4 w-4" /> Save Changes</> : <><Pencil className="h-4 w-4" /> Edit Mode</>}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {executiveReports.map((report, index) => (
          <ReportCard
            key={report.id}
            title={report.title}
            date={report.date}
            summary={reportSummaries[index]}
            isEditMode={isEditMode}
            onSummaryChange={(value) => handleSummaryChange(index, value)}
          />
        ))}
      </div>
    </div>
  );
}
