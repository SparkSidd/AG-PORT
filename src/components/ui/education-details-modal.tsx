"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, GraduationCap, Calendar, Building2, BookOpen, Sparkles, Award, CheckCircle2 } from "lucide-react"

interface EducationDetailsModalProps {
    isOpen: boolean
    onClose: () => void
}

const COURSEWORK_DETAILS = [
    {
        title: "Data Structures & Algorithms (DSA)",
        desc: "Advanced problem solving, tree & graph algorithms, dynamic programming, and space/time complexity analysis."
    },
    {
        title: "Database Management Systems (DBMS)",
        desc: "Relational database architecture, SQL optimization, indexing, ACID transactions, and ORM abstractions."
    },
    {
        title: "Computer Networks",
        desc: "TCP/IP model, OSI layers, socket programming, HTTP/HTTPS, DNS, and Cisco CCNA network fundamentals."
    },
    {
        title: "Operating Systems (OS)",
        desc: "Process synchronization, multi-threading, concurrency, memory management, paging, and POSIX Linux shell."
    },
    {
        title: "Software Engineering & System Design",
        desc: "Agile methodologies, SDLC, modular microservices architecture, clean code principles, and design patterns."
    },
    {
        title: "AI & Machine Learning",
        desc: "Supervised & unsupervised learning, deep neural networks, LLM RAG pipelines, TensorFlow, PyTorch, and NLP."
    },
    {
        title: "Compiler Design",
        desc: "Lexical analysis, parsing algorithms, Abstract Syntax Trees (AST), symbol table management, and code generation."
    },
    {
        title: "Web Technologies & Systems",
        desc: "Full-stack web architecture, React/Next.js, RESTful API design, WebSockets, and serverless edge functions."
    },
    {
        title: "Cloud Computing & DevOps",
        desc: "Containerization with Docker, AWS cloud infrastructure, automated CI/CD pipelines, and cloud deployments."
    }
]

export function EducationDetailsModal({ isOpen, onClose }: EducationDetailsModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 cursor-pointer"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-3xl bg-[#08120d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col relative max-h-[85vh] cursor-default"
                        >
                            {/* Ambient glow */}
                            <div className="absolute -top-32 -right-20 w-80 h-80 rounded-full bg-emerald-500/[0.08] blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-500/[0.06] blur-3xl pointer-events-none" />

                            {/* Top accent line */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent shrink-0" />

                            {/* ── Header ───────────────────────────────────── */}
                            <div className="relative z-10 px-6 pt-6 pb-4 flex items-start justify-between gap-4 shrink-0 border-b border-white/5">
                                <div className="flex-1 min-w-0 space-y-2">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Academic Dossier</span>
                                    </div>

                                    {/* Degree title */}
                                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                                        B.Tech in Computer Science & Engineering
                                    </h2>

                                    {/* Institution + period */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-300 font-light">
                                        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                                            Sikkim Manipal Institute of Technology (SMIT)
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono">
                                            <Calendar className="w-3.5 h-3.5 shrink-0 text-emerald-500/60" />
                                            2023 – 2027 Expected (Current 7th Semester)
                                        </span>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="shrink-0 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] hover:border-emerald-500/25 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* ── Scrollable Body ───────────────────────────── */}
                            <div className="relative z-10 px-6 py-5 space-y-5 overflow-y-auto flex-1 min-h-0 custom-scrollbar">

                                {/* Academic Overview */}
                                <div className="space-y-1.5">
                                    <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <BookOpen className="w-3 h-3 text-emerald-500" /> Overview & Core Curriculum
                                    </h3>
                                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                                        Pursuing a Bachelor of Technology in Computer Science and Engineering with comprehensive coursework spanning Data Structures & Algorithms, Systems Programming, Database Systems, Web Architectures, and Software Engineering. Combining rigorous core CS foundations with practical engineering across full-stack applications and network security.
                                    </p>
                                </div>

                                {/* Detailed Coursework Grid */}
                                <div className="space-y-3">
                                    <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3 text-emerald-500" /> Core Coursework & Subjects
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                        {COURSEWORK_DETAILS.map((item, idx) => (
                                            <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 hover:border-emerald-500/25 rounded-xl transition-all group">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                <p className="text-[11px] text-zinc-400 leading-relaxed pl-5 font-light">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Academic Highlights */}
                                <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-4 flex items-start gap-3.5">
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                        <Award className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-emerald-300">Academic Leadership & Certifications</p>
                                        <p className="text-xs text-zinc-300 leading-relaxed font-light">
                                            AI/ML Co-Lead at ENCODERS (Coding Club, SMIT). Certified in Cisco CCNA 1, 2, & 3 for Network Routing & Automation. Active participant and finalist across top collegiate hackathons.
                                        </p>
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
