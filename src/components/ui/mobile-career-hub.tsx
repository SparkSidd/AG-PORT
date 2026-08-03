import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Zap, Briefcase } from 'lucide-react';
import { PROFILE } from '@/data/profile';

export function MobileCareerHub() {
    return (
        <div className="w-full px-4 py-8 space-y-12 font-sans relative z-10">

            {/* HEADER */}
            <div className="text-left border-b border-white/10 pb-6">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#131313] border border-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-white" /> Career_Log
                </div>
                <h2 className="text-3xl font-semibold text-white tracking-tighter">
                    Journey
                </h2>
            </div>

            {/* SKILLS SCROLLER (TAPE STYLE) */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {PROFILE.skills.slice(0, 10).map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#0a0a0a] border border-white/10 text-xs text-zinc-300 font-mono">
                            {skill.name}
                        </span>
                    ))}
                    <span className="px-3 py-1.5 bg-transparent border border-white/5 text-xs text-zinc-500 font-mono">
                        + more.
                    </span>
                </div>
            </div>

            {/* EXPERIENCE TIMELINE */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                    <Briefcase className="w-3 h-3" /> Experience
                </h3>
                <div className="space-y-6 border-l border-white/10 ml-1.5 pl-6">
                    {PROFILE.experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 bg-white/20 border border-[#0a0a0a]" />

                            <div className="bg-[#0a0a0a] border border-white/10 p-5">
                                <div className="flex flex-col mb-2">
                                    <h4 className="text-white font-semibold text-lg">{exp.role}</h4>
                                    <span className="text-[9px] font-mono uppercase text-zinc-500 mt-1">{exp.period}</span>
                                </div>
                                <div className="text-sm text-zinc-300 font-medium mb-3">{exp.company}</div>
                                <p className="text-sm text-zinc-500 font-light leading-relaxed mb-4">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech?.slice(0, 4).map((t, idx) => (
                                        <span key={idx} className="text-[9px] font-mono text-zinc-400 bg-[#131313] px-2 py-0.5 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* EDUCATION COMPACT */}
            <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest flex items-center gap-2 mb-4">
                    <GraduationCap className="w-3 h-3" /> Education
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {PROFILE.education.map((edu, i) => (
                        <div key={i} className="flex flex-col p-4 bg-[#0a0a0a] border border-white/10">
                            <div className="text-white font-semibold">{edu.degree}</div>
                            <div className="text-sm text-zinc-500 font-light mt-1">{edu.institution}</div>
                            <div className="text-[10px] font-mono text-zinc-400 mt-3">{edu.year}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
