import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  }, []);

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setUploadedFile(file.name);
    };
    input.click();
  };

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Quick Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          {uploadedFile ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <p className="mt-2 text-sm font-medium">{uploadedFile}</p>
            </>
          ) : isDragging ? (
            <FileUp className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          {!uploadedFile && (
            <p className="mt-2 text-xs text-muted-foreground">
              Drop CSV, XLSX, or JSON here
            </p>
          )}
        </div>
        {uploadedFile && (
          <Button className="w-full" onClick={() => setUploadedFile(null)}>
            Upload & Process
          </Button>
        )}
        <p className="text-xs text-destructive">
          ⚠ 3-Strike Policy: Uploading harmful content leads to a permanent ban.
        </p>
      </CardContent>
    </Card>
  );
}
