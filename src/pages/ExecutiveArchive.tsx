import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, Download, Trash2 } from "lucide-react";
import { executiveReports } from "@/lib/constants";

export default function ExecutiveArchive() {
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState(executiveReports);

  const updateSummary = (id: number, summary: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, summary } : r)));
  };

  const deleteReport = (id: number) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Executive Archive</h1>
        <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
          {isEditing ? <><Save className="h-4 w-4" /> Save</> : <><Pencil className="h-4 w-4" /> Edit</>}
        </Button>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="flex items-start gap-4 rounded-lg border p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-semibold">{report.title}</h3>
                <span className="text-xs text-muted-foreground">{report.date}</span>
              </div>
              {isEditing ? (
                <Textarea
                  value={report.summary}
                  onChange={(e) => updateSummary(report.id, e.target.value)}
                  className="mt-2 text-sm min-h-[60px]"
                />
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">{report.summary}</p>
              )}
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" title="Download PDF">
                <Download className="h-4 w-4" />
              </Button>
              {isEditing && (
                <Button variant="ghost" size="icon" onClick={() => deleteReport(report.id)} title="Delete">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
