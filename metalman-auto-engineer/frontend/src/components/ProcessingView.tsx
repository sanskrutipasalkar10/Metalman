import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, Download, RotateCcw, Sparkles, AlertCircle, ExternalLink, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CADWireframe } from "./CADWireframe";
import { ExcelPreviewModal } from "./ExcelPreviewModal";
import { cn } from "@/lib/utils";

interface Props {
  taskId: string;
  onReset: () => void;
}

interface GeneratedFile {
  name: string;
  url: string;
  type: string;
}

export const ProcessingView = ({ taskId, onReset }: Props) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"queued" | "processing" | "completed" | "error">("queued");
  const [message, setMessage] = useState("Initializing NPD engineering pipeline...");
  const [stlUrl, setStlUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const pollStatus = useCallback(async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/api/status/${taskId}`);
      const data = await resp.json();
      
      if (data.status === "not_found") return;

      setStatus(data.status);
      setProgress(data.progress || 0);
      setMessage(data.message || "");
      
      if (data.stl_url && !stlUrl) {
        setStlUrl(`http://127.0.0.1:8000${data.stl_url}`);
      }

      if (data.status === "completed") {
        setFiles(data.files || []);
      }

      if (data.status === "error") {
        setError(data.error || "An unknown error occurred during generation.");
      }
    } catch (err) {
      console.error("Polling failed:", err);
    }
  }, [taskId, stlUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status !== "completed" && status !== "error") {
        pollStatus();
      }
    }, 1500);
    
    pollStatus(); // Initial poll
    
    return () => clearInterval(interval);
  }, [pollStatus, status]);

  if (status === "completed") {
    return (
      <div className="animate-in fade-in zoom-in duration-500 rounded-2xl border border-success/30 bg-card p-8 text-center shadow-elevated">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-9 w-9 text-success" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Generation Complete</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Manufacturing data successfully generated. {files.length} documents are ready for download.
        </p>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 text-left">
          {files.map((f) => (
            <div key={f.name} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4 transition-colors hover:border-success/30">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-success">
                  <CheckCircle2 className="h-3 w-3" /> Ready
                </div>
                <div className="truncate font-mono text-xs font-semibold">{f.name}</div>
              </div>
              <div className="flex gap-1.5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                  onClick={() => setPreviewFile(f.url)}
                  title="Preview Document"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs text-primary"
                  onClick={() => window.open(`http://127.0.0.1:8000${f.url}`, '_blank')}
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Get File
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            className="h-12 w-full bg-accent text-accent-foreground shadow-orange hover:bg-accent-hover"
            onClick={() => {
              if (files.length > 0) window.open(`http://127.0.0.1:8000${files[0].url}`, '_blank');
            }}
          >
            <Download className="mr-2 h-4 w-4" /> Download Primary Output
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              variant="secondary" 
              className="h-12 w-full border border-border"
              onClick={() => window.open(`/correction?taskId=${taskId}`, "_blank")}
            >
              <Edit className="mr-2 h-4 w-4" /> Document Correction
            </Button>
            <Button variant="outline" className="h-12 w-full" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Start New Project
            </Button>
          </div>
        </div>

        <ExcelPreviewModal 
          filename={previewFile} 
          onClose={() => setPreviewFile(null)} 
        />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="animate-in fade-in zoom-in duration-500 rounded-2xl border border-destructive/30 bg-card p-8 text-center shadow-elevated">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-9 w-9 text-destructive" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-destructive">Generation Failed</h2>
        <p className="mb-6 text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" className="h-12 w-full" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
      {/* 3D viewport */}
      <div className="relative h-[380px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        <CADWireframe stlUrl={stlUrl} />

        {/* HUD overlays */}
        <div className="pointer-events-none absolute left-4 top-4 space-y-1 font-mono text-[11px] text-white/70">
          <div className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 rounded-full bg-accent", status === "processing" ? "animate-pulse-glow" : "opacity-40")} /> 
            TASK ID — {taskId}
          </div>
          <div className="uppercase">PPAP / {status} MODE</div>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 text-right font-mono text-[11px] text-white/70">
          <div className="flex items-center justify-end gap-2"><Sparkles className="h-3 w-3 text-accent" /> METALMAN CORE</div>
          <div>ACTIVE NODES: 12</div>
        </div>
        
        {stlUrl && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-mono text-[10px] text-white/60">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              GEOMETRY STREAMING ACTIVE
            </div>
          </div>
        )}
      </div>

      {/* Progress section */}
      <div className="space-y-4 p-8">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {message}
          </div>
          <div className="font-mono text-2xl font-bold tabular-nums text-primary">{Math.floor(progress)}%</div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-7 gap-1.5 pt-2 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
          <div className={cn("transition-colors duration-500", progress >= 15 ? "text-success font-bold" : "")}>● Geometric NPD</div>
          <div className={cn("transition-colors duration-500", progress >= 60 ? "text-success font-bold" : "")}>● PPAP Docs</div>
          <div className={cn("transition-colors duration-500", progress >= 95 ? "text-success font-bold" : "")}>● Tooling List</div>
          <div className={cn("transition-colors duration-500", progress >= 97 ? "text-success font-bold" : "")}>● Fitment Sheet</div>
          <div className={cn("transition-colors duration-500", progress >= 98 ? "text-success font-bold" : "")}>● PFMEA</div>
          <div className={cn("transition-colors duration-500", progress >= 99 ? "text-success font-bold" : "")}>● Control Plan</div>
          <div className={cn("transition-colors duration-500", progress >= 99.5 ? "text-success font-bold" : "")}>● Fixture Plan</div>
        </div>
      </div>
    </div>
  );
};