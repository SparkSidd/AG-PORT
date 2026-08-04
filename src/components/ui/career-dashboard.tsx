import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Trophy, MapPin, Calendar, Zap, Star } from 'lucide-react'
import { PROFILE } from '@/data/profile'
import { ExperienceDetailsModal } from './experience-details-modal'
import { EducationDetailsModal } from './education-details-modal'

const college = PROFILE.education[0]

const BADGE = "text-[9.5px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 rounded px-2 py-0.5 shrink-0 whitespace-nowrap"
const TAG   = "px-2.5 py-0.5 text-[9px] font-mono text-zinc-300 border border-white/8 bg-white/5 rounded-full hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all cursor-default"
const LABEL = "text-[8.5px] font-mono uppercase tracking-[0.18em] text-zinc-400 font-semibold"
const IBOX  = "w-7.5 h-7.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-500/40 transition-all duration-300 shadow-inner"

export function CareerDashboard() {
    const [selectedExp, setSelectedExp] = useState<any | null>(null);
    const [isEduModalOpen, setIsEduModalOpen] = useState<boolean>(false);

    return (
        <div className='w-full max-w-[1140px] mx-auto px-4 md:px-8 h-full flex items-center justify-center font-sans relative z-10 pt-12 pb-2'>
            <div className="w-full grid grid-cols-12 grid-rows-6 gap-3 h-[72vh] min-h-[480px] max-h-[660px]">

                {/* ══ HERO TILE ══════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="col-span-12 md:col-span-5 row-span-2 relative rounded-2xl overflow-hidden group"
                >
                    {/* layered bg */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-black/80 to-black/90" />
                    <div className="absolute inset-0 border border-emerald-500/15 rounded-2xl group-hover:border-emerald-500/35 transition-all duration-500" />
                    {/* glow orb */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/15 rounded-full blur-[50px] group-hover:bg-emerald-500/25 transition-all duration-700" />
                    {/* top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500/80 via-emerald-400/40 to-transparent" />

                    <div className="relative z-10 h-full p-4 md:p-5 flex flex-col justify-center items-center text-center">
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 text-[8.5px] text-emerald-400 font-mono tracking-[0.2em] uppercase mb-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.12)]">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                                System Online
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter leading-[1.05] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-emerald-400 transition-all duration-500 mb-1.5">
                                Career<br />
                                <span className="text-emerald-400/90">Nexus</span>
                            </h2>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-xs mx-auto">
                                A definitive timeline of architectural milestones and professional tenures.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ══ EDUCATION TILE ═════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="col-span-12 md:col-span-4 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
                    onClick={() => setIsEduModalOpen(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-emerald-950/30 group-hover:from-emerald-950/40 transition-all duration-500" />
                    <div className="absolute inset-0 border border-white/6 rounded-2xl group-hover:border-emerald-500/40 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]" />

                    <div className="relative z-10 h-full p-4 md:p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <div className={IBOX}><GraduationCap className="w-4 h-4 text-emerald-400" /></div>
                                <span className={LABEL}>Education & Coursework</span>
                            </div>
                            <div className="flex items-center gap-1 text-[8.5px] font-mono text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0 group-hover:bg-emerald-500/20 transition-all">
                                <Zap className="w-2.5 h-2.5 text-emerald-400" />
                                View Dossier
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-1.5">
                            <div>
                                <div className="text-xs md:text-sm font-bold text-white uppercase leading-snug mb-0.5 group-hover:text-emerald-300 transition-colors duration-300">
                                    {college.degree}
                                </div>
                                <div className="text-[11px] text-zinc-400 font-mono uppercase truncate mb-1.5">{college.institution}</div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200">
                                <span>Core CS Syllabus & Academic Focus</span>
                                <span className="text-emerald-400 font-semibold group-hover:underline">View Dossier &rarr;</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ══ HONORS TILE ════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="col-span-6 md:col-span-3 row-span-2 relative rounded-2xl overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-amber-950/20" />
                    <div className="absolute inset-0 border border-white/6 rounded-2xl group-hover:border-amber-500/30 transition-all duration-500" />

                    <div className="relative z-10 h-full p-3.5 md:p-4 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <div className="w-6.5 h-6.5 rounded-md bg-black/60 border border-white/10 flex items-center justify-center group-hover:border-amber-500/40 transition-all">
                                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            </div>
                            <span className={LABEL}>Honors</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-2">
                            {PROFILE.achievements.slice(0, 3).map((ach, i) => (
                                <div key={i} className="flex gap-1.5 items-start">
                                    <div className="w-3.5 h-3.5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Star className="w-1.5 h-1.5 text-amber-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10.5px] font-semibold text-white leading-tight line-clamp-1 group-hover:text-amber-200 transition-colors">{ach.title}</div>
                                        <div className="text-[9px] text-zinc-400 font-light line-clamp-1">{ach.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ══ EXPERIENCE TILE ════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="col-span-12 md:col-span-9 row-span-4 relative rounded-2xl overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-emerald-950/20" />
                    <div className="absolute inset-0 border border-white/6 rounded-2xl group-hover:border-emerald-500/25 transition-all duration-500" />

                    <div className="relative z-10 h-full p-4 md:p-5 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 shrink-0">
                            <div className={IBOX}><Briefcase className="w-4 h-4 text-emerald-400" /></div>
                            <span className={LABEL}>Experience Log</span>
                            <div className="ml-auto flex items-center gap-1 text-[8.5px] text-emerald-500/70 font-mono">
                                <Zap className="w-2.5 h-2.5" />
                                {PROFILE.experience.length} entries (Click to expand)
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-0"
                             style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(16,185,129,0.15) transparent' }}>
                            {PROFILE.experience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.35 + i * 0.08 }}
                                    className="group/exp relative pl-5 pb-3.5 last:pb-0 cursor-pointer hover:bg-white/[0.02] p-1.5 rounded-xl transition-all"
                                    onClick={() => setSelectedExp(exp)}
                                >
                                    {/* vertical line */}
                                    <div className="absolute left-0 top-2 bottom-0 w-[1.5px] bg-gradient-to-b from-emerald-500/30 via-white/5 to-transparent last:bg-none" />
                                    {/* dot */}
                                    <div className="absolute -left-[4px] top-1.5 w-[8.5px] h-[8.5px] rounded-full bg-black border-2 border-white/20 group-hover/exp:border-emerald-400 transition-all duration-300" />

                                    {/* role + period */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-0.5">
                                        <h3 className="text-xs md:text-sm font-bold text-white tracking-tight group-hover/exp:text-emerald-300 transition-colors leading-tight">
                                            {exp.role}
                                        </h3>
                                        <span className={BADGE}>{exp.period}</span>
                                    </div>

                                    {/* company */}
                                    <div className="flex items-center gap-1 text-[11px] text-zinc-300 mb-1">
                                        <MapPin className="w-3 h-3 text-emerald-500/60 shrink-0" />
                                        {exp.company}
                                    </div>

                                    {/* description */}
                                    <p className="text-[10.5px] text-zinc-400 leading-relaxed mb-1.5 max-w-4xl group-hover/exp:text-zinc-300 transition-colors line-clamp-2">
                                        {exp.description}
                                    </p>

                                    {/* tech */}
                                    <div className="flex flex-wrap gap-1">
                                        {exp.tech?.slice(0, 5).map((t, idx) => (
                                            <span key={idx} className={TAG}>{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ══ CREDENTIALS ══════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="col-span-6 md:col-span-3 row-span-4 relative rounded-2xl overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-emerald-950/20" />
                    <div className="absolute inset-0 border border-white/6 rounded-2xl group-hover:border-emerald-500/30 transition-all duration-500" />

                    <div className="relative z-10 h-full p-3.5 md:p-4 flex flex-col">
                        <div className="flex items-center gap-1.5 mb-2.5">
                            <div className={IBOX}><Award className="w-3.5 h-3.5 text-emerald-400" /></div>
                            <span className={LABEL}>Credentials</span>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-1 space-y-2"
                             style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(16,185,129,0.15) transparent' }}>
                            {PROFILE.certificates.map((cert, i) => (
                                <div key={i} className="p-1.5 rounded-lg hover:bg-white/4 border border-transparent hover:border-white/6 transition-all cursor-default group/cert">
                                    <div className="flex justify-between items-center mb-0.5 gap-1">
                                        <span className="text-[9px] font-mono text-emerald-500/70">{cert.date}</span>
                                        {cert.grade && <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 rounded px-1.5 py-0.5 shrink-0 whitespace-nowrap">{cert.grade}</span>}
                                    </div>
                                    <div className="text-xs font-semibold text-white group-hover/cert:text-emerald-300 transition-colors leading-tight mb-0.5">{cert.name}</div>
                                    <div className="text-[10px] text-zinc-400 font-light">{cert.issuer}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Render ExperienceDetailsModal when an experience item is clicked */}
            <ExperienceDetailsModal 
                experience={selectedExp} 
                onClose={() => setSelectedExp(null)} 
            />

            {/* Render EducationDetailsModal when education tile is clicked */}
            <EducationDetailsModal 
                isOpen={isEduModalOpen} 
                onClose={() => setIsEduModalOpen(false)} 
            />
        </div>
    )
}
