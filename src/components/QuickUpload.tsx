import { useState, useCallback } from "react";
import type { DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileUp, CheckCircle2, ArrowRight, Columns3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dataGuideColumns, uploadedAnalysisRows } from "@/lib/constants";
import { detectUploadColumns, saveUploadSession, suggestColumnMapping } from "@/lib/upload-session";
import { useToast } from "@/components/ui/use-toast";

interface UploadDraft {
  fileName: string;
  detectedColumns: string[];
  mapping: Record<string, string>;
  notice?: string;
}

export function QuickUpload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadDraft, setUploadDraft] = useState<UploadDraft | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  const prepareFile = useCallback(async (file: File) => {
    setIsPreparing(true);

    const { columns, notice } = await detectUploadColumns(file);

    setUploadDraft({
      fileName: file.name,
      detectedColumns: columns,
      mapping: suggestColumnMapping(columns),
      notice,
    });

    setIsPreparing(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback(async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) await prepareFile(file);
  }, [prepareFile]);

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.json";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) await prepareFile(file);
    };
    input.click();
  };

  const updateMapping = (targetColumn: string, sourceColumn: string) => {
    setUploadDraft((current) => {
      if (!current) return current;

      return {
        ...current,
        mapping: {
          ...current.mapping,
          [targetColumn]: sourceColumn,
        },
      };
    });
  };

  const hasCompleteMapping = dataGuideColumns.every((column) => uploadDraft?.mapping[column.name]);

  const handleProcess = () => {
    if (!uploadDraft || !hasCompleteMapping) return;

    saveUploadSession({
      fileName: uploadDraft.fileName,
      detectedColumns: uploadDraft.detectedColumns,
      mapping: uploadDraft.mapping,
      uploadedAt: new Date().toISOString(),
      rowCount: uploadedAnalysisRows.length,
      notice: uploadDraft.notice,
    });

    toast({
      title: "Upload mapped successfully",
      description: "Your file mapping is saved and the analysis dashboard is ready.",
    });

    navigate("/analysis");
  };

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">Quick Upload</CardTitle>
          <Badge variant="secondary">Map columns before processing</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          {uploadDraft ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <p className="mt-2 text-sm font-medium">{uploadDraft.fileName}</p>
              <p className="text-xs text-muted-foreground">Ready for column mapping</p>
            </>
          ) : isDragging ? (
            <FileUp className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}

          {!uploadDraft && (
            <p className="mt-2 text-xs text-muted-foreground">
              Drop CSV, XLSX, or JSON here
            </p>
          )}

          {isPreparing && <p className="mt-2 text-xs text-muted-foreground">Preparing your file for mapping…</p>}
        </div>

        {uploadDraft?.notice && (
          <Alert>
            <Columns3 className="h-4 w-4" />
            <AlertTitle>Mapping preview mode</AlertTitle>
            <AlertDescription>{uploadDraft.notice}</AlertDescription>
          </Alert>
        )}

        {uploadDraft && (
          <div className="space-y-4 rounded-lg border p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">Detected columns</h3>
                <Badge variant="outline">Step 2 of 3</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadDraft.detectedColumns.map((column) => (
                  <Badge key={column} variant="outline">{column}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {dataGuideColumns.map((column) => (
                <div key={column.name} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[160px_1fr] md:items-center">
                  <div>
                    <p className="text-sm font-medium">{column.name}</p>
                    <p className="text-xs text-muted-foreground">{column.type}</p>
                  </div>
                  <Select value={uploadDraft.mapping[column.name]} onValueChange={(value) => updateMapping(column.name, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Map ${column.name}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {uploadDraft.detectedColumns.map((sourceColumn) => (
                        <SelectItem key={sourceColumn} value={sourceColumn}>
                          {sourceColumn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button variant="outline" onClick={() => setUploadDraft(null)}>
                Choose another file
              </Button>
              <Button onClick={handleProcess} disabled={!hasCompleteMapping}>
                Process & open dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-destructive">
          ⚠ 3-Strike Policy: Uploading harmful content leads to a permanent ban.
        </p>
      </CardContent>
    </Card>
  );
}

