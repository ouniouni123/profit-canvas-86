import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ReportCardProps {
  title: string;
  date: string;
  summary: string;
  isEditMode: boolean;
  onSummaryChange: (value: string) => void;
}

export function ReportCard({ title, date, summary, isEditMode, onSummaryChange }: ReportCardProps) {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 space-y-3 p-5">
        <div className="flex h-24 items-center justify-center rounded-md bg-muted">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
        </div>
        {isEditMode ? (
          <Textarea
            value={summary}
            onChange={(e) => onSummaryChange(e.target.value)}
            className="text-xs min-h-[80px]"
          />
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed">{summary}</p>
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
}
