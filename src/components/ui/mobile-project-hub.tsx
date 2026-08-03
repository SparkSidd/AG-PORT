import React, { useState } from 'react';
import { PROFILE } from '@/data/profile';
import { Github, ExternalLink } from 'lucide-react';

export function MobileProjectHub() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="w-full relative z-10 font-sans">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 border-l-4 border-emerald-500 pl-3">
                WORK<span className="text-emerald-500">_</span>LOG
            </h2>
            <div className="flex flex-col gap-3">
                {PROFILE.projects.map((project) => {
                    const isOpen = expanded === project.id;
                    return (
                        <div
                            key={project.id}
                            className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.03]"
                        >
                            <button
                                className="w-full flex items-center gap-3 p-4 text-left"
                                onClick={() => setExpanded(isOpen ? null : project.id)}
                            >
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#22c55e]' : 'bg-zinc-700'}`} />
                                <span className={`text-sm font-bold uppercase tracking-tight flex-1 transition-colors ${isOpen ? 'text-white' : 'text-zinc-400'}`}>
                                    {project.title}
                                </span>
                                <span className="text-zinc-600 text-xs font-mono">{isOpen ? '−' : '+'}</span>
                            </button>
                            {isOpen && (
                                <div className="px-4 pb-4 space-y-3">
                                    <p className="text-zinc-400 text-xs leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack?.slice(0, 5).map((t) => (
                                            <span key={t} className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                               className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors">
                                                <Github size={12} /> GitHub
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                                               className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                                                <ExternalLink size={12} /> Live
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MobileProjectHub;
