"use client";

import React, { useState, useMemo } from "react";
import { Github, ExternalLink, Filter, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { ProjectDetailsModal } from "./project-details-modal";

type Project = (typeof PROFILE.projects)[number];

export function HoloProjectHub() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("LATEST");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Extract unique category types for filtering
  const filters = useMemo(() => {
    const list = new Set<string>();
    PROFILE.projects.forEach((p) => {
      if (p.category) {
        list.add(p.category.toUpperCase());
      }
    });
    return ["ALL", ...Array.from(list)];
  }, []);

  // Filter and sort the projects array
  const filteredProjects = useMemo(() => {
    let result = [...PROFILE.projects];

    if (activeFilter !== "ALL") {
      result = result.filter(
        (p) => p.category?.toUpperCase() === activeFilter
      );
    }

    if (sortBy === "LATEST") {
      // Keep original listing order or sort by id desc
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [activeFilter, sortBy]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortBy]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-10 font-sans relative z-10">
      <div className="w-full bg-[#010905]/85 backdrop-blur-xl border border-emerald-500/15 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* ─── HEADER PANEL ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-emerald-500/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />
            03 // Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            PROJECTS<span className="text-emerald-400">_</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light max-w-md">
            A showcase of systems, applications and experiments built with code, data and curiosity.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter By:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 text-[10px] font-mono rounded border transition-all duration-300 ${
                    activeFilter === f
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                      : "bg-black/20 border-white/5 text-zinc-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          </div>

          <div className="flex items-center gap-4">
            {totalPages > 1 && (
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded hidden sm:inline-block">
                PAGE {currentPage} / {Math.max(1, totalPages)}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Sort By:
              </span>
              <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/30 border border-white/10 rounded px-2.5 py-1 text-[10px] font-mono text-zinc-300 focus:outline-none focus:border-emerald-500/30"
            >
              <option value="LATEST">LATEST</option>
              <option value="FEATURED">FEATURED</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── GRID CARDS DISPLAY ─── */}
      <div className="relative mt-4">
        {/* Left Arrow */}
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 lg:p-3 rounded-full bg-black/80 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/50 hover:scale-105 disabled:opacity-0 disabled:pointer-events-none transition-all backdrop-blur-md hidden md:flex items-center justify-center shadow-lg shadow-black/50"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        )}

        {/* Right Arrow */}
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 lg:p-3 rounded-full bg-black/80 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/50 hover:scale-105 disabled:opacity-0 disabled:pointer-events-none transition-all backdrop-blur-md hidden md:flex items-center justify-center shadow-lg shadow-black/50"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/65 hover:border-emerald-500/40 hover:bg-zinc-900/40 transition-all duration-500 cursor-pointer flex flex-col justify-between h-[360px] shadow-lg shadow-black/20"
          >
            {/* Visualizer Theme overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none" />
            
            {/* Project Cover Image */}
            <div className="relative h-44 w-full overflow-hidden border-b border-white/10">
              <img
                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
              />
              <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                {project.category || "AI/ML"}
              </div>
            </div>

            {/* Info details */}
            <div className="p-5 flex-1 flex flex-col justify-between z-20">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-light line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Footer row */}
              <div className="border-t border-white/5 pt-4 mt-3 flex items-center justify-between">
                {/* Tech chips */}
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] font-mono text-zinc-400 bg-white/5 border border-white/5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* External links */}
                <div className="flex items-center gap-2">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 text-zinc-400 hover:text-white transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 text-zinc-400 hover:text-white transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* ─── MOBILE PAGINATION CONTROLS ─── */}
      <div className="md:hidden flex justify-center items-center gap-4 mt-8 pt-6 border-t border-emerald-500/10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-[10px] font-mono rounded border border-white/10 bg-black/20 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          PREV
        </button>
        
        <span className="text-[10px] font-mono text-zinc-400">
          PAGE {currentPage} / {Math.max(1, totalPages)}
        </span>
        
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 text-[10px] font-mono rounded border border-white/10 bg-black/20 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          NEXT
        </button>
      </div>

      {/* Render ProjectDetailsModal when a grid card is clicked */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      </div>
    </div>
  );
}

export default HoloProjectHub;
