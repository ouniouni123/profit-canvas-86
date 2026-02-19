import { useState, useCallback } from "react";
import { Upload, FileUp } from "lucide-react";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
}

export function UploadZone({ onFileSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelected(file);
  }, [onFileSelected]);

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onFileSelected(file);
    };
    input.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
    >
      {isDragging ? (
        <FileUp className="h-12 w-12 text-primary" />
      ) : (
        <Upload className="h-12 w-12 text-muted-foreground" />
      )}
      <p className="mt-4 text-sm font-medium">
        {isDragging ? "Drop your file here" : "Drag & drop a file, or click to browse"}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Supports CSV, XLSX, JSON</p>
    </div>
  );
}
