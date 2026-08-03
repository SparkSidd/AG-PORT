"use client";
import React, { useMemo } from "react";
import {
Atom, Code, Server, Brain, Sparkles, Container,
Cloud, Database, Terminal, Shield, GitBranch, Layers,
Eye, Activity, Cpu, Box, Smartphone
} from "lucide-react";
import { PROFILE } from "@/data/profile";
import { motion } from "framer-motion";
// Helper for mapping category to an Icon
const CAT_ICON: Record<string, any> = {
"Languages": Code,
"Frontend": Atom,
"Backend": Server,
"Databases": Database,
"AI & ML": Brain,
"Data": Activity,
"Vision & Speech": Eye,
"Docs & Cyber": Shield,
"DevOps": Box,
"Mobile": Smartphone,
};
const SKILL_ICON = (name: string, cls?: string) => {
switch (name) {
case "atom":      return <Atom      className={cls} />;
case "code":      return <Code      className={cls} />;
case "server":    return <Server    className={cls} />;
case "brain":     return <Brain     className={cls} />;
case "sparkles":  return <Sparkles  className={cls} />;
case "container": return <Container className={cls} />;
case "cloud":     return <Cloud     className={cls} />;
case "database":  return <Database  className={cls} />;
case "terminal":  return <Terminal  className={cls} />;
case "shield":    return <Shield    className={cls} />;
case "git":       return <GitBranch className={cls} />;
default:          return <Layers    className={cls} />;
}
};
export function NeuralTechHub() {
const skills = PROFILE.skills as any[];
// Group skills by category
const categories = useMemo(() => {
const mapped: Record<string, any[]> = {};
skills.forEach(skill => {
if (!mapped[skill.category]) mapped[skill.category] = [];
mapped[skill.category].push(skill);
});
// Ordered to ensure trees balance beautifully across columns
const order = [
"Frontend", "Backend", "Languages", 
"AI & ML", "Mobile", "Databases", "DevOps", 
"Vision & Speech", "Data", "Docs & Cyber" 
];
return order.map(name => ({
name,
skills: mapped[name] || []
})).filter(c => c.skills.length > 0);
}, [skills]);
return (
<div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-16 md:py-20 lg:py-24 font-sans selection:bg-[#22c55e]/30 overflow-hidden pointer-events-none">
{/* Cinematic Environmental Details */}
<div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-10" 
style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '64px 64px' }} 
/>
<div className="w-full h-full max-w-[1600px] pointer-events-auto flex flex-col relative z-20">
{/* Massive Background Watermarks avoiding conflict with the actual text */}
<div className="absolute top-[-5%] left-0 text-[10vw] font-black text-white/[0.015] tracking-tighter select-none pointer-events-none mix-blend-overlay uppercase">
NEURAL
</div>
<div className="absolute bottom-[-5%] right-0 text-[10vw] font-black text-[#22c55e]/[0.015] tracking-tighter select-none pointer-events-none mix-blend-overlay text-right uppercase">
PATHWAYS
</div>
{/* Hero Header Area */}
<div className="mb-12 shrink-0 border-l-4 border-[#22c55e] pl-5 flex flex-col justify-center">
<motion.h1 
initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
>
CORE_ARCHITECTURE <span className="text-[#22c55e] mix-blend-lighten opacity-80">TREE</span>
</motion.h1>
<motion.div 
initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
className="flex items-center gap-3 mt-3 md:mt-4"
>
<div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
<p className="text-[10px] md:text-xs text-zinc-400 font-mono tracking-[0.4em] uppercase">
[LIVE SYNC // BRANCH INDEX MAPPED]
</p>
</motion.div>
</div>
{/* Tree Columns Architecture - Flowing Masonry Design */}
{/* Tree Columns Architecture - Flowing Masonry Design */}
<div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar pr-4">
<motion.div 
className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 md:gap-12 lg:gap-16 w-full space-y-10 md:space-y-14 block"
initial="hidden" animate="show"
variants={{
hidden: { opacity: 0 },
show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}}
>
{categories.map((cat, i) => (
<TechTree key={cat.name} category={cat} index={i} />
))}
</motion.div>
</div>
</div>
</div>
);
}
// ─── Sub-Branch Diagram Node ──────────────────────────────────────────────────
function TechTree({ category, index: _index }: { category: any; index: number }) {
const Icon = CAT_ICON[category.name] || Layers;
return (
<motion.div 
variants={{
hidden: { opacity: 0, scale: 0.96, y: 15 },
show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } }
}}
// Prevents the tree from being sliced abruptly across masonry columns
className="flex flex-col group break-inside-avoid w-full pb-4 md:pb-6 relative before:absolute before:inset-0 before:bg-gradient-to-r hover:before:from-[#22c55e]/[0.02] before:to-transparent before:-m-4 before:rounded-xl before:transition-all before:duration-500"
>
{/* Root Node Header */}
<div className="flex items-center gap-4 mb-5 relative z-10 cursor-default">
<div className="w-10 h-10 bg-[#161616] border border-[#333] group-hover:border-[#22c55e]/70 group-hover:bg-[#22c55e]/10 transition-all duration-300 flex items-center justify-center shrink-0 rounded shadow-[0_0_15px_rgba(34,197,94,0)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-105">
<Icon className="w-4 h-4 md:w-5 md:h-5 text-[#22c55e]" />
</div>
<h2 className="text-xl md:text-2xl font-black text-white/90 uppercase tracking-tighter group-hover:text-white transition-colors drop-shadow-md">
/{category.name}
</h2>
</div>
{/* Sub Branches Container */}
<div className="relative pl-5 ml-4 flex flex-col gap-4 relative z-10 w-full mt-2">
{/* Pure continuous vertical line for the entire tree */}
<div className="absolute top-[-30px] bottom-[16px] left-[0px] w-px bg-[#262626] group-hover:bg-gradient-to-b group-hover:from-[#22c55e]/80 group-hover:to-[#22c55e]/10 transition-all duration-700" />
{category.skills.map((skill: any, i: number) => {
const isLast = i === category.skills.length - 1;
return (
<div key={skill.name} className="relative flex items-center group/skill w-full cursor-default py-0.5">
{/* Horizontal connector mapping back to vertical tree line */}
<div className="absolute top-1/2 left-0 w-5 h-px bg-[#262626] group-hover/skill:bg-[#22c55e] group-hover/skill:w-6 transition-all duration-300 origin-left" />
{/* The actual tech content */}
<div className="flex items-center gap-3 pl-8 transition-transform duration-300 group-hover/skill:translate-x-3 w-full">
<span className="text-zinc-600 group-hover/skill:text-[#22c55e] transition-colors shrink-0 hidden sm:block">
{SKILL_ICON(skill.icon, "w-3.5 h-3.5")}
</span>
<div className="flex flex-col min-w-0">
<div className="text-[13px] md:text-[15px] font-bold text-zinc-400 group-hover/skill:text-white transition-colors truncate">
{skill.name}
</div>
{/* Subtle description expanding on hover */}
<div className="h-0 overflow-hidden group-hover/skill:h-auto group-hover/skill:mt-1 opacity-0 group-hover/skill:opacity-100 transition-all duration-300">
<span className="inline-block text-[9px] font-mono text-[#22c55e] uppercase tracking-widest bg-[#22c55e]/15 border border-[#22c55e]/30 px-1.5 py-0.5 rounded-[2px] truncate max-w-full shadow-[0_0_8px_rgba(34,197,94,0.1)]">
{skill.description}
</span>
</div>
</div>
</div>
</div>
)
})}
</div>
</motion.div>
)
}
export default NeuralTechHub;
