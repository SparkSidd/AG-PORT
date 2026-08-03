import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Code2, Layers } from "lucide-react"
import { ProjectUIPreview } from "./project-ui-preview"
// CSS-only project visualizer — no canvas, no GPU drain
const PROJECT_THEMES: Record<string, { bg: string; grid?: string; glow: string }> = {
"phish-detect":       { bg: "#050f08", grid: "#22c55e", glow: "rgba(34,197,94,0.15)" },
"docfusion":          { bg: "#05080f", grid: "#38bdf8", glow: "rgba(56,189,248,0.12)" },
"finguard-ai":        { bg: "#050810", grid: "#818cf8", glow: "rgba(129,140,248,0.15)" },
"my-budget-ai":       { bg: "#0f0a05", grid: "#f59e0b", glow: "rgba(245,158,11,0.12)" },
"mental-health-bot":  { bg: "#08050f", grid: "#a78bfa", glow: "rgba(167,139,250,0.13)" },
"neuro-doc":          { bg: "#05080f", grid: "#22d3ee", glow: "rgba(34,211,238,0.12)" },
"ingredient-insight": { bg: "#0a0805", grid: "#fb923c", glow: "rgba(251,146,60,0.12)" },
"silent-bridge":          { bg: "#050f0a", grid: "#34d399", glow: "rgba(52,211,153,0.13)" },
"siddlang":           { bg: "#080808", grid: "#94a3b8", glow: "rgba(148,163,184,0.1)" },
};
function ProjectVisualizer({ projectId }: { projectId: string }) {
const theme = PROJECT_THEMES[projectId] || { bg: "#070f08", grid: "#22c55e", glow: "rgba(34,197,94,0.12)" };
return (
<div className="absolute inset-0" style={{ background: theme.bg }}>
{/* Dot grid */}
<div className="absolute inset-0 opacity-60" style={{
backgroundImage: `radial-gradient(circle, ${theme.grid}40 1px, transparent 1px)`,
backgroundSize: "32px 32px",
}} />
{/* Central radial glow */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div style={{
width: 320, height: 320,
borderRadius: "50%",
background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
}} />
</div>
{/* Animated rings */}
{[180, 260, 340].map((size, i) => (
<div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div style={{
width: size, height: size,
borderRadius: "50%",
border: `1px solid ${theme.grid}25`,
animation: `spin ${8 + i * 3}s linear infinite ${i % 2 ? "reverse" : ""}`,
}} />
</div>
))}
{/* Corner accent lines */}
<div className="absolute top-0 left-0 w-16 h-16 border-t border-l pointer-events-none" style={{ borderColor: `${theme.grid}30` }} />
<div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r pointer-events-none" style={{ borderColor: `${theme.grid}30` }} />
<style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
</div>
);
}
interface Project {
id: string
title: string
tagline?: string
description: string
longDescription?: string
problem?: string
solution?: string
howItWorks?: string[]
keyFeatures?: string
engineeringHighlights?: string
outcome?: string
image: string
techStack?: string[]
githubLink?: string
liveLink?: string
demoMedia?: string
}
interface ProjectDetailsModalProps {
project: Project | null
onClose: () => void
}
export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
if (!project) return null
return (
<AnimatePresence>
{project && (
<>
{/* Backdrop */}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
onClick={onClose}
className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8 hover:cursor-pointer"
>
{/* Modal Content */}
<motion.div
initial={{ opacity: 0, scale: 0.95, y: 30 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 30 }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}
onClick={(e) => e.stopPropagation()}
className="w-full max-w-6xl w-[95vw] lg:w-full h-auto lg:h-[85vh] bg-zinc-950 border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] relative cursor-default"
>
{/* Ambient glow */}
<div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none z-0" />
{/* Close Button */}
<button
onClick={onClose}
className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 bg-black/60 backdrop-blur-md hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all border border-white/10 hover:scale-105 shadow-xl"
>
<X className="w-5 h-5" />
</button>
<div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden custom-scrollbar relative z-10 w-full">
{/* Left Content */}
<div className="flex-1 flex flex-col p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 order-2 lg:order-1 lg:overflow-y-auto custom-scrollbar">
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col h-full">
{/* Header badge */}
<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-5 w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
<span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">Project Dossier</span>
</div>
{/* Title */}
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-3">
{project.title.split(' ').map((word, i, arr) => (
<span key={i}>
{i === arr.length - 1 ? (
<span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
{word}
</span>
) : (
word + " "
)}
</span>
))}
</h2>
{/* Tagline */}
{project.tagline && (
<p className="text-zinc-400 text-sm font-light italic mb-6 leading-relaxed">{project.tagline}</p>
)}
{/* Overview */}
<div className="space-y-2 mb-5">
<h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
<Layers className="w-3.5 h-3.5 text-emerald-500" /> Overview
</h3>
<p className="text-zinc-300 leading-relaxed text-sm font-light">
{project.longDescription || project.description}
</p>
</div>
{/* Problem & Solution */}
{(project.problem || project.solution) && (
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
{project.problem && (
<div className="bg-red-950/20 border border-red-500/10 rounded-xl p-3.5">
<p className="text-[9px] font-mono text-red-400/70 uppercase tracking-widest mb-1.5">Problem</p>
<p className="text-zinc-300 text-xs leading-relaxed">{project.problem}</p>
</div>
)}
{project.solution && (
<div className="bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-3.5">
<p className="text-[9px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1.5">Solution</p>
<p className="text-zinc-300 text-xs leading-relaxed">{project.solution}</p>
</div>
)}
</div>
)}
{/* How It Works */}
{project.howItWorks && project.howItWorks.length > 0 && (
<div className="space-y-2 mb-5">
<h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">How It Works</h3>
<ol className="space-y-1.5">
                            {project.howItWorks.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-zinc-400 leading-relaxed">
                                    <span className="font-mono text-emerald-400/80 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
{/* Action Buttons */}
<div className="flex flex-wrap gap-4 pt-5 mt-auto border-t border-white/5">
{project.liveLink && (
<a
href={project.liveLink}
target="_blank"
rel="noopener noreferrer"
className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 rounded-full text-black font-semibold transition-all group text-sm w-full sm:w-auto"
>
<ExternalLink className="w-4 h-4" />
Launch Preview
</a>
)}
{project.githubLink && (
<a
href={project.githubLink}
target="_blank"
rel="noopener noreferrer"
className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all group text-sm w-full sm:w-auto"
>
<Github className="w-4 h-4" />
Source Code
</a>
)}
</div>
</motion.div>
</div>
{/* Right — Visualization */}
<div className="flex-1 flex items-center justify-center p-4 min-h-[340px] lg:min-h-full relative overflow-hidden order-1 lg:order-2 bg-black/40 pointer-events-auto group/visualizer">
<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 lg:hidden pointer-events-none" />
<ProjectVisualizer projectId={project.id} />
{/* Optional Demo Media Renderer (Video or Image overlay) */}
{/* Explanatory Project Media / Image Display */}
<div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md pointer-events-auto">
  {project.demoMedia ? (
    <img 
      src={project.demoMedia} 
      alt={project.title} 
      className="w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
    />
  ) : (
    <ProjectUIPreview 
      id={project.id} 
      title={project.title} 
      category={project.category || "AI / ML"} 
      techStack={project.techStack} 
      howItWorks={project.howItWorks} 
    />
  )}
</div>
{/* Stats overlay */}
<div className="absolute bottom-6 left-6 right-6 z-30 hidden lg:flex items-center justify-between border-t border-white/10 pt-6">
<div>
<p className="text-2xl font-bold text-white font-mono">{project.techStack?.length || 0}</p>
<p className="text-[10px] uppercase tracking-widest text-zinc-500">Technologies</p>
</div>
<div className="w-px h-8 bg-white/10" />
<div>
<p className="text-2xl font-bold text-white font-mono">{project.howItWorks?.length || '—'}</p>
<p className="text-[10px] uppercase tracking-widest text-zinc-500">Pipeline Steps</p>
</div>
<div className="w-px h-8 bg-white/10" />
<div>
<p className="text-2xl font-bold text-emerald-400 font-mono">ACTIVE</p>
<p className="text-[10px] uppercase tracking-widest text-zinc-500">Status</p>
</div>
</div>
</div>
</div>
</motion.div>
</motion.div>
</>
)}
</AnimatePresence>
)
}
