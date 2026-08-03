import React from "react";
import { 
  ShieldAlert, FileText, Activity, ShieldCheck, Wallet, Network, 
  BrainCircuit, Layout, CalendarCheck, Presentation, Apple, 
  FileSpreadsheet, Compass, Terminal, Cpu, Database, Server, Code2, ArrowRight, CheckCircle2, Workflow
} from "lucide-react";

interface ProjectUIProps {
  id: string;
  title: string;
  category: string;
  techStack?: string[];
  howItWorks?: string[];
}

export function ProjectUIPreview({ id, title, category, techStack = [], howItWorks = [] }: ProjectUIProps) {
  // 1. PhishDetect AI - Flow Architecture
  if (id === "phishdetect-ai") {
    return (
      <div className="w-full h-full bg-[#030b06] p-6 text-emerald-400 font-mono flex flex-col justify-between select-none relative overflow-hidden rounded-2xl border border-emerald-500/30 shadow-2xl">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Workflow className="w-4 h-4 text-emerald-400" />
            <span>SYSTEM FLOW ARCHITECTURE</span>
          </div>
          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">REAL-TIME</span>
        </div>

        {/* Diagram Flow Nodes */}
        <div className="flex flex-col gap-3 my-4">
          <div className="flex items-center justify-between bg-black/60 border border-emerald-500/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Chrome Extension</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500/60" />
            <span className="text-[10px] text-zinc-400">Page Evaluation</span>
          </div>

          <div className="flex items-center justify-between bg-black/60 border border-emerald-500/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-white">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Heuristic Engine</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500/60" />
            <span className="text-[10px] text-zinc-400">Risk Scoring</span>
          </div>

          <div className="flex items-center justify-between bg-black/60 border border-emerald-500/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-white">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Google Web Risk API</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500/60" />
            <span className="text-[10px] text-zinc-400">Threat Intel</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-3 border-t border-white/10">
          <span>Verdict: EXPLAINABLE_SAFE</span>
          <span>FastAPI + Python</span>
        </div>
      </div>
    );
  }

  // 2. NeuroDoc AI - RAG Pipeline Diagram
  if (id === "neurodoc-ai") {
    return (
      <div className="w-full h-full bg-[#030810] p-6 text-cyan-400 font-mono flex flex-col justify-between select-none relative overflow-hidden rounded-2xl border border-cyan-500/30 shadow-2xl">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <span>RAG RETRIEVAL & VECTOR PIPELINE</span>
          </div>
          <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded">PDF AI</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-4 text-center">
          <div className="bg-black/60 border border-cyan-500/20 p-2.5 rounded-lg flex flex-col items-center justify-center gap-1">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] text-white">1. PDF OCR</span>
          </div>
          <div className="bg-black/60 border border-cyan-500/20 p-2.5 rounded-lg flex flex-col items-center justify-center gap-1">
            <Database className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] text-white">2. Vector Store</span>
          </div>
          <div className="bg-black/60 border border-cyan-500/20 p-2.5 rounded-lg flex flex-col items-center justify-center gap-1">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] text-white">3. Gemini AI</span>
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 p-3 rounded-lg text-xs text-zinc-300 space-y-1">
          <p className="text-[10px] text-cyan-400 font-bold uppercase">Pipeline Step</p>
          <p className="text-[11px] text-zinc-400">Synthesizing PDF context into structured conversational response.</p>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-3 border-t border-white/10">
          <span>ElevenLabs TTS Integrated</span>
          <span>FastAPI + Python</span>
        </div>
      </div>
    );
  }

  // Generic Architecture Diagram Fallback for all other projects
  return (
    <div className="w-full h-full bg-[#040806] p-6 text-emerald-400 font-mono flex flex-col justify-between select-none relative overflow-hidden rounded-2xl border border-emerald-500/30 shadow-2xl">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Workflow className="w-4 h-4 text-emerald-400" />
          <span>PROJECT ARCHITECTURE & DATA FLOW</span>
        </div>
        <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">SYSTEM DIAGRAM</span>
      </div>

      <div className="space-y-2 my-3">
        {howItWorks.length > 0 ? (
          howItWorks.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-black/60 border border-emerald-500/20 p-2.5 rounded-lg text-xs text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                {idx + 1}
              </span>
              <span className="truncate">{step}</span>
            </div>
          ))
        ) : (
          <div className="bg-black/60 border border-emerald-500/20 p-4 rounded-lg text-center text-xs text-zinc-400">
            Full Pipeline & Data Flow Architecture Active
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-3 border-t border-white/10">
        <span>Stack: {techStack.slice(0, 3).join(", ")}</span>
        <span>Verified Pipeline</span>
      </div>
    </div>
  );
}
