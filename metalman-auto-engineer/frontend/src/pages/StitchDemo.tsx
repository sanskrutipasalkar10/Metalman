import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ExternalLink, ChevronRight } from "lucide-react";

/* ── module metadata ─────────────────────────────────────── */
const MODULE_META: Record<string, { label: string; icon: string; desc: string }> = {
  admin_library_metalmind_data_sync:  { label: "Document Library",    icon: "folder_open",             desc: "PPAP Document Registry & Distribution" },
  ai_engineering_assistant_metalman:  { label: "AI Assistant",        icon: "smart_toy",               desc: "Engineering Chatbot Interface" },
  ai_health_review_metalman:          { label: "AI Health Review",    icon: "neurology",               desc: "Model Confidence & Drift Analysis" },
  bi_analytics_metalmind_data_sync:   { label: "BI Analytics",        icon: "analytics",               desc: "Plant Operations Analytics" },
  document_correction_metalman:       { label: "Doc Correction",      icon: "edit_document",           desc: "Manual Correction Workflow" },
  fmea_recommendations_metalman:      { label: "FMEA Tools",          icon: "precision_manufacturing", desc: "Failure Mode & Effects Analysis" },
  process_registry_metalmind_data_sync:{ label: "Process Registry",   icon: "factory",                 desc: "Manufacturing Process Registry" },
  product_status_metalmind_data_sync: { label: "Product Status",      icon: "inventory_2",             desc: "NPD Product Status Dashboard" },
  task_management_metalman:           { label: "Task Management",     icon: "assignment",              desc: "Engineering Task Tracker" },
};

/* ── helpers ─────────────────────────────────────────────── */
const getFrameSrc = (folder: string) =>
  `http://127.0.0.1:8000/stitch-demo/${folder}/content_only.html`;

const getLabel = (folder: string) =>
  MODULE_META[folder]?.label ?? folder.replace(/_/g, " ");

const getIcon = (folder: string) =>
  MODULE_META[folder]?.icon ?? "widgets";

/* ── component ───────────────────────────────────────────── */
const StitchDemo = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/demo-folders")
      .then(r => r.json())
      .then((data: string[]) => {
        setFolders(data);
        if (data.length > 0) setActive(data[0]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff]">
      {/* ── Unified Sidebar ─────────────────────────────────── */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-[#e2bfb4]/60 bg-[#eff4ff] shadow-[2px_0_12px_rgba(0,0,0,0.04)]">
        
        {/* Brand – Metalman logo (no duplication) */}
        <div className="flex items-center gap-3 border-b border-[#e2bfb4]/40 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-orange-700 shadow-md shadow-orange-200">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
              <path d="M3 7l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="text-[15px] font-black tracking-tight text-orange-700">METALMAN</div>
            <div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-orange-400">
              Auto Ltd • NPD Suite
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="px-5 py-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5a4139]/50">
            Manufacturing Modules
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          {folders.map(folder => {
            const isActive = active === folder;
            return (
              <button
                key={folder}
                onClick={() => setActive(folder)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#d04408] text-white shadow-md shadow-orange-200"
                    : "text-[#4c6078] hover:bg-[#dce9ff] hover:text-[#0b1c30]"
                )}
              >
                <span
                  className="material-symbols-outlined text-[18px] leading-none shrink-0"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {getIcon(folder)}
                </span>
                <span className="truncate leading-tight">{getLabel(folder)}</span>
                {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#e2bfb4]/40 p-3 space-y-1">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-[#4c6078] hover:bg-[#dce9ff] hover:text-[#0b1c30] transition-all"
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            Back to Dashboard
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Thin top bar (module title + external link) */}
        <header className="flex h-11 shrink-0 items-center justify-between border-b border-[#e2bfb4]/40 bg-white/70 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-[13px] font-semibold text-[#0b1c30]">
            {active && (
              <>
                <span className="material-symbols-outlined text-[16px] text-[#d04408]">
                  {getIcon(active)}
                </span>
                {getLabel(active)}
                <span className="mx-1 text-[#8e7067]">·</span>
                <span className="text-[11px] font-normal text-[#5a4139]/60">
                  {MODULE_META[active]?.desc ?? "Integration Prototype"}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-orange-600 sm:inline">
              Prototype
            </span>
            {active && (
              <button
                onClick={() => window.open(`http://127.0.0.1:8000/stitch-demo/${active}/code.html`, "_blank")}
                className="flex items-center gap-1.5 rounded-md border border-[#e2bfb4]/60 px-2.5 py-1 text-[11px] font-medium text-[#4c6078] hover:bg-[#dce9ff] transition-all"
              >
                <ExternalLink className="h-3 w-3" /> Full View
              </button>
            )}
          </div>
        </header>

        {/* Iframe – content_only.html (sidebar already stripped) */}
        <main className="flex-1 overflow-hidden">
          {active ? (
            <iframe
              key={active}
              ref={iframeRef}
              src={getFrameSrc(active)}
              className="h-full w-full border-none"
              title={getLabel(active)}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-[#5a4139]/50">
              <span className="material-symbols-outlined text-5xl">widgets</span>
              <p className="text-sm">Select a module from the sidebar</p>
            </div>
          )}
        </main>
      </div>

      {/* Material Symbols font (needed for icons in sidebar) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default StitchDemo;
