"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Briefcase, Calendar, Building2, Layers, Sparkles } from "lucide-react"

interface Experience {
    role: string
    company: string
    period: string
    description: string
    tech?: string[]
}

interface ExperienceDetailsModalProps {
    experience: Experience | null
    onClose: () => void
}

function getTakeaway(role: string, company: string): string {
    const r = role.toLowerCase()
    if (r.includes("mobile")) return `Gained real-world experience shipping a production mobile app at ${company}, bridging web and native platforms using Flutter & Dart.`
    if (r.includes("intern") && r.includes("it")) return `Delivered measurable impact — the anomaly detection dashboard at ${company} cut manual inspection work by 60%, turning raw data into clear, actionable insights.`
    if (r.includes("ai") || r.includes("ml") || company.toLowerCase().includes("encoders")) return `Co-leading the AI/ML vertical at Encoders Coding Club, SMIT — running workshops and mentoring peers on machine learning and generative AI fundamentals.`
    if (company.toLowerCase().includes("brain")) return `Developing intelligent web applications, AI tools, and full-stack solutions at Brain Up Labs.`
    if (r.includes("hackathon") || r.includes("technical")) return `Led cross-functional teams to finalist positions at multiple national hackathons including SIH and InnoFusion, building full-stack MVPs under tight constraints.`
    return `Made a meaningful contribution at ${company} by applying technical skills across real-world problems and shipping solutions that matter.`
}

const tagColors = [
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    "bg-teal-500/10 text-teal-300 border-teal-500/20",
    "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    "bg-green-500/10 text-green-300 border-green-500/20",
    "bg-lime-500/10 text-lime-300 border-lime-500/20",
]

export function ExperienceDetailsModal({ experience, onClose }: ExperienceDetailsModalProps) {
    if (!experience) return null

    const takeaway = getTakeaway(experience.role, experience.company)

    return (
        <AnimatePresence>
            {experience && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-pointer"
                    >
                        {/* Modal — wider, roomier */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 28 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 28 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-xl bg-[#07100d] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col relative max-h-[80vh] cursor-default"
                        >
                            {/* Ambient glow blobs */}
                            <div className="absolute -top-32 -right-20 w-80 h-80 rounded-full bg-emerald-500/[0.07] blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-500/[0.05] blur-3xl pointer-events-none" />

                            {/* Top accent line */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent shrink-0" />

                            {/* ── Header ───────────────────────────────────── */}
                            <div className="relative z-10 px-6 pt-6 pb-4 flex items-start justify-between gap-4 shrink-0">
                                <div className="flex-1 min-w-0 space-y-2.5">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/8 border border-emerald-500/15 rounded-full">
                                        <Briefcase className="w-3 h-3 text-emerald-400" />
                                        <span className="text-[10px] font-semibold text-emerald-400/90 tracking-widest uppercase">Experience</span>
                                    </div>

                                    {/* Role title */}
                                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">
                                        {experience.role}
                                    </h2>

                                    {/* Company + period */}
                                    <div className="flex flex-col gap-1">
                                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                                            {experience.company}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-normal">
                                            <Calendar className="w-3 h-3 shrink-0" />
                                            {experience.period}
                                        </span>
                                    </div>
                                </div>

                                {/* Close */}
                                <button
                                    onClick={onClose}
                                    className="shrink-0 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] hover:border-emerald-500/25 text-zinc-500 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="mx-6 h-px bg-white/[0.06] shrink-0" />

                            {/* ── Scrollable content ───────────────────────── */}
                            <div className="relative z-10 px-6 py-5 space-y-5 overflow-y-auto flex-1 min-h-0 custom-scrollbar">

                                {/* Description */}
                                <div>
                                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-normal">
                                        {experience.description}
                                    </p>
                                </div>

                                {/* Tech stack */}
                                {experience.tech && experience.tech.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-1.5">
                                            <Layers className="w-3 h-3 text-zinc-500" />
                                            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Technologies</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {experience.tech.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-2.5 py-1 text-[11px] font-medium border rounded-full cursor-default transition-all duration-200 ${tagColors[idx % tagColors.length]}`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Key takeaway */}
                                <div className="rounded-xl border border-emerald-500/[0.14] bg-gradient-to-br from-emerald-500/[0.06] to-teal-600/[0.04] p-3.5 flex gap-3">
                                    <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-emerald-300">Key takeaway</p>
                                        <p className="text-xs text-zinc-400 leading-relaxed">
                                            {takeaway}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom accent */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent shrink-0" />
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
