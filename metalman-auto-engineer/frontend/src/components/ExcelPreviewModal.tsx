import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Download, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  filename: string | null;
  onClose: () => void;
}

export const ExcelPreviewModal = ({ filename, onClose }: Props) => {
  const actualFilename = filename?.split('/').pop() || "";
  const previewUrl = `http://127.0.0.1:8000/api/preview/${actualFilename}`;

  const handleDownload = () => {
    if (filename) {
        window.open(`http://127.0.0.1:8000/outputs/${actualFilename}`, '_blank');
    }
  };

  return (
    <Dialog open={!!filename} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[98vw] w-[1400px] max-h-[96vh] h-[96vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl">
        <DialogHeader className="p-4 border-b bg-white">
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Maximize2 className="h-6 w-6 text-primary" />
              Document Preview: <span className="font-mono text-sm font-normal text-muted-foreground">{actualFilename}</span>
            </DialogTitle>
            <div className="flex items-center gap-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold bg-secondary px-2 py-1 rounded">High Fidelity Preview</p>
              <Button size="sm" variant="outline" onClick={handleDownload} className="h-9 border-primary/30 text-primary hover:bg-primary/5 font-bold">
                <Download className="mr-2 h-4 w-4" /> Download Excel (.xlsx)
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 bg-slate-200 flex flex-col">
          <iframe 
            src={previewUrl}
            className="w-full h-full border-none bg-white"
            title="Excel Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
