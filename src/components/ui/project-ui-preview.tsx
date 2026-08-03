import React from "react";
import { 
  ShieldAlert, FileText, Activity, ShieldCheck, Wallet, Network, 
  BrainCircuit, Layout, CalendarCheck, Presentation, Apple, 
  FileSpreadsheet, Compass, Terminal, Cpu, Database, Server, Code2 
} from "lucide-react";

interface ProjectUIProps {
  id: string;
  title: string;
  category: string;
  techStack?: string[];
  howItWorks?: string[];
}

export function ProjectUIPreview({ id, title, category, techStack = [], howItWorks = [] }: ProjectUIProps) {
  // 1. PhishDetect AI
  if (id === "phishdetect-ai") {
    return (
      <div className="w-full h-full bg-[#050e09] p-6 text-emerald-400 font-sans flex flex-col justify-between select-none relative overflow-hidden rounded-xl border border-emerald-500/20 shadow-2xl">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-emerald-400 animate-pulse" />
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">PhishDetect Engine v3.4</h4>
              <p className="text-[10px] text-emerald-500/70 font-mono">Status: MONITORING_TRAFFIC</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono rounded-md">
            99.8% TRUST SCORE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-black/40 border border-emerald-500/20 p-3 rounded-lg">
            <p className="text-[10px] text-zinc-400 font-mono uppercase mb-1">Google Web Risk API</p>
            <p className="text-xs font-semibold text-emerald-300">Clean / Whitelisted</p>
          </div>
          <div className="bg-black/40 border border-emerald-500/20 p-3 rounded-lg">
            <p className="text-[10px] text-zinc-400 font-mono uppercase mb-1">Heuristic Engine</p>
            <p className="text-xs font-semibold text-emerald-300">0 Zero-day Signals</p>
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-lg p-3.5 space-y-2">
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Detection Pipeline</p>
          <div className="space-y-1.5 font-mono text-xs text-zinc-300">
            <div className="flex justify-between items-center bg-emerald-500/5 px-2.5 py-1.5 rounded border border-emerald-500/10">
              <span>1. Chrome Extension Scanner</span>
              <span className="text-emerald-400 text-[10px]">OK</span>
            </div>
            <div className="flex justify-between items-center bg-emerald-500/5 px-2.5 py-1.5 rounded border border-emerald-500/10">
              <span>2. Risk Classification</span>
              <span className="text-emerald-400 text-[10px]">PASS</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-3 border-t border-white/5">
          <span>FastAPI + Python Backend</span>
          <span>Latency: 14ms</span>
        </div>
      </div>
    );
  }

  // 2. NeuroDoc AI
  if (id === "neurodoc-ai") {
    return (
      <div className="w-full h-full bg-[#050a12] p-6 text-cyan-400 font-sans flex flex-col justify-between select-none relative overflow-hidden rounded-xl border border-cyan-500/20 shadow-2xl">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-cyan-400" />
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">NeuroDoc Semantic RAG</h4>
              <p className="text-[10px] text-cyan-500/70 font-mono">Gemini AI + OCR Active</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono rounded-md">
            PDF Indexing
          </span>
        </div>

        <div className="my-4 bg-black/40 border border-cyan-500/20 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="font-semibold">Document_Summary.pdf</span>
            <span className="text-cyan-400 font-mono text-[10px]">100% Vectorized</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </div>
          <p className="text-xs text-zinc-400 italic">"Extracted key financial figures and synthesized smart summaries via Gemini."</p>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-3 border-t border-white/5">
          <span>ElevenLabs Speech + FastAPI</span>
          <span>Tokens: 1,420</span>
        </div>
      </div>
    );
  }

  // 3. FinGuard AI
  if (id === "finguard-ai") {
    return (
      <div className="w-full h-full bg-[#070714] p-6 text-indigo-400 font-sans flex flex-col justify-between select-none relative overflow-hidden rounded-xl border border-indigo-500/20 shadow-2xl">
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">FinGuard Fraud Graph</h4>
              <p className="text-[10px] text-indigo-500/70 font-mono">SHAP Explainability Engine</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono rounded-md">
            REAL-TIME GRAPH
          </span>
        </div>

        <div className="my-4 bg-black/40 border border-indigo-500/20 p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-300">Account Network Analysis</span>
            <span className="text-indigo-400 font-mono text-[10px]">Risk Score: 0.12 (LOW)</span>
          </div>
          <div className="flex gap-2">
            {["NetworkX Graph", "PyTorch Anomaly", "SHAP Metrics"].map((item, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] rounded">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-3 border-t border-white/5">
          <span>Cytoscape.js + PostgreSQL</span>
          <span>WebSockets Active</span>
        </div>
      </div>
    );
  }

  // Generic Clean Fallback for all other projects
  return (
    <div className="w-full h-full bg-[#060a08] p-6 text-emerald-400 font-sans flex flex-col justify-between select-none relative overflow-hidden rounded-xl border border-emerald-500/20 shadow-2xl">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-emerald-400" />
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">{title}</h4>
            <p className="text-[10px] text-emerald-500/70 font-mono">Category: {category}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono rounded-md">
          ARCHITECTURE
        </span>
      </div>

      <div className="my-4 bg-black/40 border border-emerald-500/20 p-4 rounded-lg space-y-3">
        <p className="text-[10px] font-mono text-zinc-400 uppercase">Core Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] rounded font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-3 border-t border-white/5">
        <span>System Status: OPERATIONAL</span>
        <span>Verified Build</span>
      </div>
    </div>
  );
}
