"use client";

import React, { useState } from "react";
import { Github, Globe, Code2, AlertCircle, CheckCircle, Sparkles, Activity, Layers, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/data/profile";
import { motion, AnimatePresence } from "framer-motion";

type Project = (typeof PROFILE.projects)[number];

export function ProjectShowcase() {
  const projects = PROFILE.projects as Project[];
  const [activeProject, setActiveProject] = useState<Project>(projects[0] || null);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8 select-none w-full max-w-[1450px] mx-auto font-sans h-[85vh] lg:h-[78vh] py-4 px-4 relative z-10">
      
      {/* ─── LEFT SIDEBAR: PROJECT TABS (20-25% width) ─── */}
      <div className="flex flex-col w-full lg:w-[22%] h-[20vh] lg:h-full justify-between shrink-0">
        <div className="space-y-4">
          <div className="space-y-1 border-l-2 border-[#10b981] pl-3">
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#10b981] uppercase">
              Control Panel
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              PROJECTS_SYS
            </h2>
          </div>

          {/* Tab List */}
          <div 
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[60vh] pb-2 lg:pb-0 pr-1 custom-scrollbar w-full"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#10b98120 transparent" }}
          >
            {projects.map((project, index) => {
              const isActive = activeProject?.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 shrink-0 w-[200px] lg:w-full",
                    isActive
                      ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.08)]"
                      : "bg-black/20 border-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg border flex items-center justify-center font-mono text-[10px] transition-colors duration-300 shrink-0",
                    isActive 
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400" 
                      : "border-white/5 bg-white/5 text-zinc-500"
                  )}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span className={cn(
                    "text-xs font-bold truncate transition-colors duration-200",
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-300"
                  )}>
                    {project.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block font-mono text-[9px] text-zinc-600 border-t border-white/5 pt-3">
          <span>PORTFOLIO DIRECTORY V2</span>
        </div>
      </div>

      {/* ─── RIGHT PANEL: INTEGRATED DOSSIER DASHBOARD (75-80% width) ─── */}
      <div className="flex-1 min-w-0 h-[60vh] lg:h-full">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 lg:p-7 flex flex-col lg:flex-row gap-6 relative overflow-hidden shadow-2xl"
            >
              {/* Dynamic decorative radar rings inside dashboard background */}
              <div className="absolute right-0 top-0 w-[450px] h-[450px] pointer-events-none opacity-20 z-0 flex items-center justify-center">
                <div className="w-[380px] h-[380px] rounded-full border border-emerald-500/5 animate-pulse" />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-emerald-500/10" />
                <div className="absolute w-[180px] h-[180px] rounded-full border border-emerald-500/10" />
              </div>

              {/* ── Dashboard Left half: Details (60% width) ── */}
              <div className="flex-[1.2] flex flex-col justify-between min-w-0 z-10">
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[45vh] lg:max-h-[52vh]">
                  {/* Header info */}
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono tracking-wider uppercase rounded-full">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      Project Dossier
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight uppercase">
                      {activeProject.title}
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-400 tracking-wide uppercase">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* Overview Text */}
                  <div className="space-y-1.5">
                    <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      Overview
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      {activeProject.longDescription || activeProject.description}
                    </p>
                  </div>

                  {/* Problem & Solution Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {activeProject.problem && (
                      <div className="p-3.5 rounded-xl border border-red-500/10 bg-red-500/5">
                        <div className="text-[9px] font-mono uppercase text-red-400 flex items-center gap-1.5 mb-1.5">
                          <AlertCircle className="w-3.5 h-3.5" /> Problem
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-normal font-light">
                          {activeProject.problem}
                        </p>
                      </div>
                    )}
                    {activeProject.solution && (
                      <div className="p-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/5">
                        <div className="text-[9px] font-mono uppercase text-emerald-400 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle className="w-3.5 h-3.5" /> Solution
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-normal font-light">
                          {activeProject.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* How it works */}
                  {activeProject.howItWorks && activeProject.howItWorks.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h4 className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">
                        Pipeline Steps
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {activeProject.howItWorks.map((step, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs text-zinc-400 font-light">
                            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Highlights */}
                  {activeProject.engineeringHighlights && (
                    <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex gap-2.5 items-start">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[10px] font-bold text-emerald-300 font-mono uppercase tracking-wider">Engineering Highlight</h5>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-light mt-1">
                          {activeProject.engineeringHighlights}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer stack and buttons */}
                <div className="border-t border-white/5 pt-4 mt-4 space-y-4">
                  {/* Tech stack */}
                  {activeProject.techStack && activeProject.techStack.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[10px] font-mono text-zinc-300 border border-white/10 bg-white/5 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    {activeProject.githubLink && (
                      <a
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 text-zinc-400 hover:text-white transition-all text-xs font-mono flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    {activeProject.liveLink && (
                      <a
                        href={activeProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 text-zinc-400 hover:text-white transition-all text-xs font-mono flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Dashboard Right half: Screenshot & Metrics (40% width) ── */}
              <div className="hidden md:flex flex-1 flex-col justify-between border-l border-white/5 pl-6 z-10 min-w-[220px]">
                {/* Large high-tech display screen */}
                <div className="relative flex-1 w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-2 group">
                  <img
                    src={activeProject.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"}
                    alt={activeProject.title}
                    className="w-full h-full object-cover rounded-lg opacity-85 transition-opacity duration-300"
                  />
                  {/* Neon screen grid */}
                  <div className="absolute inset-0 top-3 left-3 right-3 bottom-3 border border-emerald-500/10 rounded pointer-events-none" />
                </div>

                {/* Live System Diagnostics / Stats */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-4 text-center font-mono">
                  <div>
                    <div className="text-lg font-black text-emerald-400">
                      {activeProject.techStack?.length || 0}
                    </div>
                    <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Techs</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-emerald-400">
                      {activeProject.howItWorks?.length || 0}
                    </div>
                    <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Pipelines</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-[#10b981] flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
                      Active
                    </div>
                    <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Status</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default ProjectShowcase;
