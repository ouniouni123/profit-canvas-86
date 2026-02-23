import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { dataGuideColumns, dataGuideDos, dataGuideDonts } from "@/lib/constants";

export function DataGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Data Guide">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Data Standardization Guide</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataGuideColumns.map((col) => (
              <TableRow key={col.name}>
                <TableCell className="font-mono text-sm">{col.name}</TableCell>
                <TableCell><Badge variant="secondary">{col.type}</Badge></TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{col.example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Do
            </h4>
            <ul className="space-y-1">
              {dataGuideDos.map((d) => (
                <li key={d} className="text-xs flex gap-1.5 items-start">
                  <CheckCircle2 className="h-3 w-3 mt-0.5 text-primary shrink-0" /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <XCircle className="h-4 w-4 text-destructive" /> Don't
            </h4>
            <ul className="space-y-1">
              {dataGuideDonts.map((d) => (
                <li key={d} className="text-xs flex gap-1.5 items-start">
                  <XCircle className="h-3 w-3 mt-0.5 text-destructive shrink-0" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
