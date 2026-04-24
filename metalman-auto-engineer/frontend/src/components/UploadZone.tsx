import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { CheckCircle2, Circle, UploadCloud, X, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  step: number;
  title: string;
  accept: string;
  multiple?: boolean;
  hint: string;
  onChange?: (filled: boolean) => void;
  onChangeFile?: (file: File | null) => void;
  onChangeFiles?: (files: File[]) => void;
}

export const UploadZone = ({ step, title, accept, multiple, hint, onChange, onChangeFile, onChangeFiles }: UploadZoneProps) => {
  const [fileList, setFileListObj] = useState<File[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filled = files.length > 0;

  const setList = (names: string[], objs: File[]) => {
    setFiles(names);
    setFileListObj(objs);
    onChange?.(names.length > 0);
    if (multiple) {
      onChangeFiles?.(objs);
    } else {
      onChangeFile?.(objs[0] || null);
    }
  };

  const handleFiles = (fl: FileList | null) => {
    if (!fl) return;
    const newFiles = Array.from(fl);
    const newNames = newFiles.map((f) => f.name);
    
    if (multiple) {
      setList([...files, ...newNames], [...fileList, ...newFiles]);
    } else {
      setList([newNames[0]], [newFiles[0]]);
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

  const removeFile = (i: number) => {
    const newNames = files.filter((_, idx) => idx !== i);
    const newObjs = fileList.filter((_, idx) => idx !== i);
    setList(newNames, newObjs);
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border-2 border-dashed bg-card p-5 transition-all",
        dragOver ? "border-primary bg-primary/5" : filled ? "border-success/40 bg-success/[0.03]" : "border-border hover:border-primary/40 hover:bg-secondary/30",
      )}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <div className="flex items-start gap-4">
        {/* Status indicator */}
        <div className="mt-0.5 shrink-0">
          {filled ? (
            <CheckCircle2 className="h-6 w-6 text-success animate-fade-in" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground/40" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Step {step}</span>
            <span className="font-mono text-[11px] text-muted-foreground/60">·</span>
            <span className="font-mono text-[11px] text-muted-foreground/80">{accept}</span>
          </div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>

          {!filled ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              Browse or drag files
            </button>
          ) : (
            <div className="mt-3 space-y-1.5">
              {files.map((name, i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-secondary/60 px-2.5 py-1.5 text-xs">
                  <FileIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="flex-1 truncate font-mono">{name}</span>
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {multiple && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-1 px-1 text-xs font-medium text-primary hover:underline"
                >
                  + Add more
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={onSelect} className="hidden" />
    </div>
  );
};