import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/features/upload/UploadZone";
import { SecurityPolicy } from "@/features/upload/SecurityPolicy";
import { WizardStepper } from "@/features/upload/WizardStepper";

const mockColumns = ["Date", "Region", "Revenue", "Costs", "Profit"];
const mockMappings = ["date", "region", "revenue", "costs", "profit"];

export default function DataWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(1);
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const handleReset = () => { setCurrentStep(0); setSelectedFile(null); };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Wizard</h1>
      <WizardStepper currentStep={currentStep} />

      {currentStep === 0 && (
        <div className="space-y-4">
          <UploadZone onFileSelected={handleFileSelected} />
          <SecurityPolicy />
        </div>
      )}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Map Columns — {selectedFile?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {mockColumns.map((col, i) => (
                <div key={col} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">{col}</span>
                  <span className="rounded bg-muted px-2 py-1 text-xs font-mono">{mockMappings[i]}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Confirm Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-sm space-y-1">
              <p><span className="font-medium">File:</span> {selectedFile?.name}</p>
              <p><span className="font-medium">Columns:</span> {mockColumns.length} mapped</p>
              <p><span className="font-medium">Estimated rows:</span> 1,247</p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleReset}>Upload & Finish</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
