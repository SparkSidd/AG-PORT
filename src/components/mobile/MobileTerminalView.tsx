"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { PROFILE } from "@/data/profile";
import {
  FileText,
  Mail,
  Copy,
  Github,
  Linkedin,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code,
  FolderGit2,
  Cpu,
  Home,
  MessageSquare,
  Zap,
  Volume2,
  VolumeX,
  ArrowUp,
  Share2,
  Search,
  X
} from "lucide-react";
import { ProjectDetailsModal } from "@/components/ui/project-details-modal";
import { ExperienceDetailsModal } from "@/components/ui/experience-details-modal";
import { EducationDetailsModal } from "@/components/ui/education-details-modal";
import { SidBotChat } from "@/components/ui/sidbot-chat";
import { useToast } from "@/components/ui/toast";
import { playCyberClick, playCyberHover, playCyberConfirm, triggerHaptic } from "@/lib/sound-fx";
import { useMusicStore } from "@/lib/music-store";

interface MobileCleanViewProps {
  onOpenResume: (doc: "resume" | "cv") => void;
}

type Project = (typeof PROFILE.projects)[number];

const companyLogos = [
  { name: "Aibi Technologies", short: "AIBI", src: "/logos/aibi.webp" },
  { name: "NBPDCL", short: "NBPDCL", src: "/logos/nbpdcl.webp" },
  { name: "Brain Up Labs", short: "BUL", src: "/logos/brainuplabs.webp" },
];

export function MobileTerminalView({ onOpenResume }: MobileCleanViewProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "projects" | "skills" | "career" | "contact">("hero");
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("ALL");
  const [careerTab, setCareerTab] = useState<"exp" | "edu" | "certs">("exp");
  
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExp, setSelectedExp] = useState<any | null>(null);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const isPlaying = useMusicStore((state) => state.isPlaying);
  const togglePlay = useMusicStore((state) => state.togglePlay);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    e?.preventDefault();
    playCyberConfirm();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email);
      showToast("Email copied to clipboard!", "success");
    }
  };

  const handleShare = async () => {
    playCyberClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Siddharth Kumar - Portfolio",
          text: "Check out Siddharth Kumar's Full Stack & AI/ML engineering portfolio.",
          url: window.location.href,
        });
        showToast("Shared successfully!", "success");
      } catch (_) {
        // User cancelled or share failed
      }
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast("Portfolio link copied to clipboard!", "success");
      }
    }
  };

  const scrollTo = (id: string, tab: "hero" | "projects" | "skills" | "career" | "contact") => {
    playCyberClick();
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    playCyberClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Track active section and back to top visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowBackToTop(scrollPos > 350);

      const sections = ["hero", "projects", "skills", "career", "contact"] as const;
      const targetPos = scrollPos + 240;

      for (const s of sections) {
        const el = document.getElementById(`sec-${s}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (targetPos >= top && targetPos < top + height) {
            setActiveTab(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track horizontal carousel scroll index
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = carouselRef.current.offsetWidth * 0.88;
    if (itemWidth > 0) {
      const idx = Math.round(scrollLeft / itemWidth);
      setActiveProjectIndex(Math.min(idx, 2));
    }
  };

  // Calculate dynamic counts for project categories
  const projectCategories = useMemo(() => {
    const counts: Record<string, number> = { ALL: PROFILE.projects.length };
    PROFILE.projects.forEach(p => {
      const cat = p.category?.toUpperCase() || "AI/ML";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return [
      { id: "ALL", label: `ALL (${counts.ALL})` },
      { id: "AI/ML", label: `AI/ML (${counts["AI/ML"] || 0})` },
      { id: "SYSTEMS", label: `SYSTEMS (${counts["SYSTEMS"] || 0})` },
      { id: "WEB DEV", label: `WEB DEV (${counts["WEB DEV"] || 0})` },
    ];
  }, []);

  // Filter projects with category and live search query
  const filteredProjects = useMemo(() => {
    let list = projectFilter === "ALL"
      ? PROFILE.projects
      : PROFILE.projects.filter(p => p.category?.toUpperCase() === projectFilter);

    if (projectSearchQuery.trim()) {
      const q = projectSearchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack?.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [projectFilter, projectSearchQuery]);

  // Calculate dynamic counts for skill categories
  const skillCategories = useMemo(() => {
    const counts: Record<string, number> = { ALL: PROFILE.skills.length };
    PROFILE.skills.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    const list = ["ALL", "Frontend", "AI & ML", "Backend", "Languages", "DevOps", "Databases"];
    return list.map(c => ({
      id: c,
      label: `${c} (${counts[c] || 0})`
    }));
  }, []);

  const filteredSkills = skillFilter === "ALL"
    ? PROFILE.skills
    : PROFILE.skills.filter(s => s.category === skillFilter);

  return (
    <div className="min-h-screen bg-[#030708] text-white font-sans selection:bg-emerald-500/30 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] overflow-x-hidden">
      
      {/* ─── AMBIENT GLOW BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-0 w-[240px] h-[240px] bg-teal-500/8 rounded-full blur-[90px]" />
        <div className="absolute bottom-20 left-0 w-[280px] h-[280px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* ─── STICKY GLASS TOP BAR ─── */}
      <header className="sticky top-0 z-40 bg-[#030708]/85 backdrop-blur-2xl border-b border-white/10 px-3.5 py-2.5 flex items-center justify-between shadow-2xl shadow-black/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">SIDDHARTH KUMAR</span>
            <span className="text-[9px] font-mono text-emerald-400 tracking-wider">FULL STACK &bull; AI/ML</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Share Portfolio Button */}
          <button
            onClick={handleShare}
            aria-label="Share Portfolio"
            className="cursor-pointer p-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-all flex items-center justify-center"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          {/* Audio Music Toggle Button */}
          <button
            onClick={() => {
              playCyberClick();
              togglePlay();
            }}
            aria-label="Toggle Ambient Audio"
            className={`cursor-pointer p-1.5 rounded-full border transition-all flex items-center justify-center ${
              isPlaying
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              playCyberClick();
              onOpenResume("resume");
            }}
            className="cursor-pointer px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10.5px] font-mono font-bold hover:bg-emerald-500/25 transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
          >
            <FileText className="w-3 h-3 text-emerald-400" />
            RESUME
          </button>
          <button
            onClick={() => {
              playCyberClick();
              onOpenResume("cv");
            }}
            className="cursor-pointer px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10.5px] font-mono font-bold hover:bg-white/10 hover:text-white transition-all"
          >
            CV
          </button>
        </div>
      </header>

      {/* ─── MAIN CONTAINER ─── */}
      <main className="relative z-10 px-4 pt-6 space-y-12 max-w-md mx-auto">
        
        {/* ══════════════════════════════════════════════════════
            1. HERO SECTION
        ══════════════════════════════════════════════════════ */}
        <section id="sec-hero" className="scroll-mt-20 space-y-5 text-center pt-2">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl text-emerald-300 text-[10px] font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AVAILABLE FOR HIGH-IMPACT ROLES</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
              SIDDHARTH <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                KUMAR
              </span>
            </h1>
            <p className="text-sm font-mono text-zinc-400 tracking-wide">
              Full Stack Engineer &bull; AI/ML Builder
            </p>
          </div>

          {/* Bio text */}
          <p className="text-xs text-zinc-300 leading-relaxed font-light px-2">
            Building software at the intersections of <span className="text-white font-medium">Full-Stack Architecture</span>, <span className="text-emerald-400 font-medium">Cybersecurity</span>, and <span className="text-teal-300 font-medium">Machine Learning</span>. Shipping resilient systems that scale.
          </p>

          {/* Quick Experience Badge Stack */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex -space-x-2">
              {companyLogos.map((comp) => (
                <div
                  key={comp.short}
                  className="w-7 h-7 rounded-full bg-zinc-900 border border-white/20 overflow-hidden shadow-md flex items-center justify-center"
                >
                  <img src={comp.src} alt={comp.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              Aibi &bull; NBPDCL &bull; Brain Up Labs
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("sec-projects", "projects")}
              className="cursor-pointer flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] active:scale-95 transition-all"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyEmail}
              className="cursor-pointer px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>COPY EMAIL</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { val: "14+", label: "Projects Built" },
              { val: "60%", label: "Field Time Cut" },
              { val: "8.04", label: "CGPA @ SMIT" },
            ].map((stat) => (
              <div key={stat.label} className="p-2.5 rounded-xl bg-zinc-950/70 border border-white/5 backdrop-blur-md">
                <div className="text-base font-black text-emerald-400 font-mono">{stat.val}</div>
                <div className="text-[9.5px] text-zinc-400 uppercase tracking-tight mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. FLAGSHIP PROJECTS (LIVE SEARCH & SWIPEABLE SNAP CAROUSEL)
        ══════════════════════════════════════════════════════ */}
        <section id="sec-projects" className="scroll-mt-20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-0.5">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>PORTFOLIO WORK</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">FEATURED PROJECTS</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">{filteredProjects.length} OF {PROFILE.projects.length}</span>
          </div>

          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={projectSearchQuery}
              onChange={(e) => setProjectSearchQuery(e.target.value)}
              placeholder="Search e.g. FastAPI, PyTorch, Flutter, React..."
              className="w-full bg-zinc-950/80 border border-white/10 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            {projectSearchQuery && (
              <button
                onClick={() => setProjectSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs with Dynamic Count Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playCyberClick();
                  setProjectFilter(cat.id);
                  setActiveProjectIndex(0);
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-full text-[10.5px] font-mono whitespace-nowrap transition-all ${
                  projectFilter === cat.id
                    ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* If Not Expanded and No Search Query: Horizontal Scroll-Snap Carousel */}
          {!isProjectsExpanded && !projectSearchQuery ? (
            <div className="space-y-2">
              <div
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 pb-2 -mx-1 px-1"
              >
                {filteredProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      playCyberClick();
                      setSelectedProject(project);
                    }}
                    className="w-[86vw] max-w-[340px] shrink-0 snap-center group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl shadow-black/40"
                  >
                    {/* Thumbnail image */}
                    {project.image && (
                      <div className="relative h-38 w-full overflow-hidden bg-black/80">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        
                        {/* Badges on image */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono text-emerald-400 uppercase font-bold">
                            {project.category || "AI/ML"}
                          </span>
                          {(project as any).featured && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-[9px] font-mono text-emerald-300 font-bold">
                              ★ FLAGSHIP
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="p-1 rounded-full bg-white/5 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 font-light">
                        {project.description}
                      </p>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack?.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[9.5px] font-mono text-zinc-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Horizontal Pagination Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {filteredProjects.slice(0, 3).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeProjectIndex === idx
                        ? "w-5 bg-emerald-400 shadow-[0_0_8px_#10b981]"
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* If Expanded or Searching: Full Vertical List */
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-zinc-950/60 border border-white/5 text-zinc-500 font-mono text-xs">
                  No projects match your search keyword.
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      playCyberClick();
                      setSelectedProject(project);
                    }}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl shadow-black/40"
                  >
                    {project.image && (
                      <div className="relative h-40 w-full overflow-hidden bg-black/80">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono text-emerald-400 uppercase font-bold">
                            {project.category || "AI/ML"}
                          </span>
                          {(project as any).featured && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-[9px] font-mono text-emerald-300 font-bold">
                              ★ FLAGSHIP
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="p-1 rounded-full bg-white/5 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 font-light">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack?.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[9.5px] font-mono text-zinc-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* View More Button (if not searching) */}
          {!projectSearchQuery && filteredProjects.length > 3 && (
            <button
              onClick={() => {
                playCyberClick();
                setIsProjectsExpanded(!isProjectsExpanded);
              }}
              className="cursor-pointer w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/5"
            >
              <span>{isProjectsExpanded ? "SHOW FEWER PROJECTS" : `VIEW ALL ${filteredProjects.length} PROJECTS`}</span>
              {isProjectsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════
            3. TECH & SKILLS MATRIX
        ══════════════════════════════════════════════════════ */}
        <section id="sec-skills" className="scroll-mt-20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-0.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>CORE STACK</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">TECHNICAL MATRIX</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">{filteredSkills.length} SKILLS</span>
          </div>

          {/* Skill Filter Tabs with Live Count Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playCyberClick();
                  setSkillFilter(cat.id);
                }}
                className={`cursor-pointer px-3 py-1.5 rounded-full text-[10.5px] font-mono whitespace-nowrap transition-all ${
                  skillFilter === cat.id
                    ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 2-Column Clean Skill Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {(isSkillsExpanded ? filteredSkills : filteredSkills.slice(0, 6)).map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-2.5 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Code className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{skill.name}</p>
                  <p className="text-[9.5px] font-mono text-zinc-400 truncate">{skill.description || skill.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View More Skills Toggle */}
          {filteredSkills.length > 6 && (
            <button
              onClick={() => {
                playCyberClick();
                setIsSkillsExpanded(!isSkillsExpanded);
              }}
              className="cursor-pointer w-full py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>{isSkillsExpanded ? "SHOW FEWER SKILLS" : `VIEW ALL ${filteredSkills.length} SKILLS`}</span>
              {isSkillsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════
            4. CAREER & ACHIEVEMENTS
        ══════════════════════════════════════════════════════ */}
        <section id="sec-career" className="scroll-mt-20 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-0.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>TRACK RECORD</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">CAREER & MILESTONES</h2>
          </div>

          {/* Segmented Switch */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950 border border-white/10 rounded-xl">
            {[
              { id: "exp", label: "Experience", icon: Briefcase },
              { id: "edu", label: "Education", icon: GraduationCap },
              { id: "certs", label: "Honors", icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = careerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playCyberClick();
                    setCareerTab(tab.id as any);
                  }}
                  className={`cursor-pointer py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Experience Tab Content */}
          {careerTab === "exp" && (
            <div className="space-y-3">
              {PROFILE.experience.map((exp) => (
                <div
                  key={exp.role}
                  onClick={() => {
                    playCyberClick();
                    setSelectedExp(exp);
                  }}
                  className="cursor-pointer p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                      <p className="text-xs font-mono text-emerald-400">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light line-clamp-3">
                    {exp.description}
                  </p>

                  {exp.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((t) => (
                        <span key={t} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Tab Content */}
          {careerTab === "edu" && (
            <div
              onClick={() => {
                playCyberClick();
                setIsEduModalOpen(true);
              }}
              className="cursor-pointer p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  UNDERGRADUATE
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{PROFILE.education[0].year}</span>
              </div>
              <h3 className="text-base font-bold text-white">{PROFILE.education[0].degree}</h3>
              <p className="text-xs text-zinc-300 font-light">{PROFILE.education[0].institution}</p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">CGPA: {PROFILE.education[0].score}</span>
                <span className="text-zinc-400 flex items-center gap-1">Tap to view coursework &rarr;</span>
              </div>
            </div>
          )}

          {/* Honors & Certs Tab Content */}
          {careerTab === "certs" && (
            <div className="space-y-2.5">
              {[
                { title: "Smart India Hackathon Finalist", org: "Govt of India", year: "2024", badge: "Hackathon" },
                { title: "Oracle Cloud Certified Generative AI Professional", org: "Oracle", year: "2024", badge: "Certification" },
                { title: "NPTEL Elite + Gold in Cloud Computing", org: "IIT Kharagpur", year: "2024", badge: "Top 1%" },
                { title: "AI/ML Vertical Lead @ Encoders SMIT", org: "SMIT", year: "2024–Pres", badge: "Leadership" },
              ].map((cert) => (
                <div key={cert.title} className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center justify-between gap-2 shadow-sm">
                  <div>
                    <h4 className="text-xs font-bold text-white">{cert.title}</h4>
                    <p className="text-[10.5px] text-zinc-400">{cert.org} &bull; {cert.year}</p>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {cert.badge}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════
            5. CONTACT & SIDBOT
        ══════════════════════════════════════════════════════ */}
        <section id="sec-contact" className="scroll-mt-20 space-y-4">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S CONNECT</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">START A CONVERSATION</h2>
          </div>

          {/* Contact Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-emerald-500/30 text-center space-y-4 shadow-2xl shadow-emerald-500/5">
            <div>
              <p className="text-xs text-zinc-300 font-light">Direct Contact Gateway</p>
              <p className="text-sm font-mono text-emerald-400 font-bold mt-0.5">{PROFILE.email}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopyEmail}
                className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>COPY EMAIL ADDRESS</span>
              </button>

              <a
                href={`mailto:${PROFILE.email}`}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>OPEN MAIL CLIENT</span>
              </a>
            </div>

            {/* Social & Share Buttons */}
            <div className="flex items-center justify-center gap-2.5 pt-2 border-t border-white/10">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition-all font-mono"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-all font-mono"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white transition-all font-mono cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Interactive SidBot Assistant */}
          <div className="p-3 rounded-2xl bg-zinc-950/90 border border-white/10">
            <SidBotChat />
          </div>

          {/* Footer */}
          <div className="text-center text-zinc-600 text-[10px] font-mono pt-4">
            <p>&copy; {new Date().getFullYear()} SIDDHARTH KUMAR &bull; ALL RIGHTS RESERVED</p>
          </div>
        </section>

      </main>

      {/* ─── FLOATING "BACK TO TOP" QUICK PILL ─── */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] right-4 z-40 p-2.5 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/80 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* ─── FLOATING FROSTED GLASS BOTTOM DOCK (WITH IPHONE SAFE AREA) ─── */}
      <nav className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] left-4 right-4 z-50 bg-[#030708]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-1.5 flex items-center justify-around shadow-2xl shadow-black">
        {[
          { id: "hero", label: "HOME", icon: Home },
          { id: "projects", label: "WORK", icon: FolderGit2 },
          { id: "skills", label: "STACK", icon: Cpu },
          { id: "career", label: "EXP", icon: Briefcase },
          { id: "contact", label: "TOUCH", icon: MessageSquare },
        ].map((item) => {
          const Icon = item.icon;
          const isCurrent = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(`sec-${item.id}`, item.id as any)}
              className={`cursor-pointer flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all ${
                isCurrent
                  ? "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[8.5px] font-mono font-bold tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ─── MODALS ─── */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ExperienceDetailsModal
        experience={selectedExp}
        onClose={() => setSelectedExp(null)}
      />
      <EducationDetailsModal
        isOpen={isEduModalOpen}
        onClose={() => setIsEduModalOpen(false)}
      />
    </div>
  );
}
