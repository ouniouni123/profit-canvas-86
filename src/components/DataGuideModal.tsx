import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle } from "lucide-react";
import { dataGuideColumns, dataGuideDos, dataGuideDonts } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DataGuideModalProps {
  buttonLabel?: string;
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
}

export function DataGuideModal({
  buttonLabel = "Data Guide",
  className,
  size = "sm",
  variant = "destructive",
}: DataGuideModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn("shadow-sm", className)} title="Data Guide">
          <HelpCircle className="h-4 w-4" />
          <span>{buttonLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Data Standardization Guide</DialogTitle>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Review this before every upload</AlertTitle>
          <AlertDescription>
            Keep your file close to these field names. If your headers differ, you can now map them during upload.
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-2">
          {dataGuideColumns.map((column) => (
            <Badge key={column.name} variant="outline" className="px-3 py-1">
              {column.name}
            </Badge>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Required Column</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataGuideColumns.map((col) => (
              <TableRow key={col.name}>
                <TableCell className="font-mono text-sm">{col.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{col.type}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{col.example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Do
            </h4>
            <ul className="space-y-1">
              {dataGuideDos.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              <XCircle className="h-4 w-4 text-destructive" /> Don't
            </h4>
            <ul className="space-y-1">
              {dataGuideDonts.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs">
                  <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-destructive" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

