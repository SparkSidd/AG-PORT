import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import RainingLetters from "@/components/ui/modern-animated-hero-section";
import { MicroExpander } from "@/components/ui/micro-expander";
import { PROFILE } from "@/data/profile";
import { Github, Linkedin, Mail, FileText, Code, Database, Brain, Lock, Terminal, Cloud, Sparkles, GitGraph, Heart, Coffee, Menu, X, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SpiralSplash } from "@/components/SpiralSplash";
import { ResumePreviewModal } from "@/components/ui/resume-preview-modal";
import { useToast } from "@/components/ui/toast";
import { playCyberConfirm, playCyberClick, playCyberHover } from "@/lib/sound-fx";

// Lazy load heavy components
const CareerDashboard = lazy(() => import("@/components/ui/career-dashboard").then(module => ({ default: module.CareerDashboard })));
const ContactSection = lazy(() => import("@/components/ui/contact-section").then(module => ({ default: module.ContactSection })));
const SidBotChat = lazy(() => import("@/components/ui/sidbot-chat").then(module => ({ default: module.SidBotChat })));
const MusicPlayer = lazy(() => import("@/components/ui/music-player").then(module => ({ default: module.MusicPlayer })));
const NeuralTechHub = lazy(() => import("@/components/ui/neural-tech-hub").then(module => ({ default: module.NeuralTechHub })));
const PixelCanvas = lazy(() => import("@/components/ui/pixel-perfect-hero").then(module => ({ default: module.PixelCanvas })));
const InfiniteBentoPanBackground = lazy(() => import("@/components/ui/infinite-bento-pan-bg").then(module => ({ default: module.InfiniteBentoPanBackground })));
const NeonCrystalCity = lazy(() => import("@/components/ui/neon-crystal-city"));
const HoloProjectHub = lazy(() => import("@/components/ui/holo-project-hub").then(module => ({ default: module.HoloProjectHub })));
const MarqueeHero = lazy(() => import("@/components/ui/marquee-hero").then(module => ({ default: module.MarqueeHero })));
const PrismaVideoBackground = lazy(() => import("@/components/ui/prisma-hero").then(module => ({ default: module.PrismaVideoBackground })));
const NexusGateVideo = lazy(() => import("@/components/ui/gaming-login").then(module => ({ default: module.default.VideoBackground })));

// Icon mapping helper
const getIcon = (name: string) => {
  const low = name.toLowerCase();
  if (low.includes("react") || low.includes("front") || low.includes("type") || low.includes("java")) return <Code className="h-6 w-6 text-white" />;
  if (low.includes("python") || low.includes("back") || low.includes("node") || low.includes("linux")) return <Terminal className="h-6 w-6 text-white" />;
  if (low.includes("data") || low.includes("mongo") || low.includes("sql")) return <Database className="h-6 w-6 text-white" />;
  if (low.includes("ai") || low.includes("tensor") || low.includes("brain")) return <Brain className="h-6 w-6 text-white" />;
  if (low.includes("llm") || low.includes("genai")) return <Sparkles className="h-6 w-6 text-white" />;
  if (low.includes("security") || low.includes("cyber")) return <Lock className="h-6 w-6 text-white" />;
  if (low.includes("aws") || low.includes("cloud")) return <Cloud className="h-6 w-6 text-white" />;
  if (low.includes("git")) return <GitGraph className="h-6 w-6 text-white" />;
  return <Code className="h-6 w-6 text-white" />;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeInitialDoc, setResumeInitialDoc] = useState<"resume" | "cv">("resume");
  const [isMobile, setIsMobile] = useState(false);
  const [isPage6Visible, setIsPage6Visible] = useState(false);
  const { showToast } = useToast();
  const scrollFXRef = useRef<FullScreenFXAPI | null>(null);

  const handleOpenResume = (doc: "resume" | "cv" = "resume") => {
    playCyberConfirm();
    setResumeInitialDoc(doc);
    setIsResumeModalOpen(true);
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    e?.preventDefault();
    playCyberConfirm();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email);
      showToast("Email copied to clipboard!", "success");
    }
  };

  const sections = [
    // 1. HERO
    {
      id: "hero",
      title: "", // Title handled by RainingLetters internally
      leftLabel: "Start",
      rightLabel: "Intro",
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
          <RainingLetters />
        </div>
      ),
    },

    // 2. ABOUT (Cinematic Dual-Mesh Reality Matrix)
    {
      id: "about",
      leftLabel: "Who",
      rightLabel: "Bio",
      title: (
        <div className="w-full h-full pointer-events-auto">
          <Suspense fallback={<div className="w-full h-full bg-black text-emerald-400 font-mono flex items-center justify-center">Loading Bio...</div>}>
            <MarqueeHero />
          </Suspense>
        </div>
      ),
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-1000 bg-[#000408] ${active ? 'opacity-100' : 'opacity-0'}`}>
          {/* WebGL raymarched infinite neon city — mouse-look enabled */}
          <Suspense fallback={<div className="w-full h-full bg-[#000408]" />}>
            <NeonCrystalCity cameraSpeed={3} tileSize={2} unionK={0.5} maxSteps={100} maxDist={100} surfDist={0.001} />
          </Suspense>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #22c55e 0px, transparent 1px, transparent 3px)",
              backgroundSize: "100% 4px",
            }}
          />
        </div>
      ),
    },

    // 3. PROJECTS
    {
      id: "projects",
      leftLabel: "Work",
      rightLabel: "Dev",
      title: (
        <div className="pointer-events-auto w-full h-full">
          <Suspense fallback={<div className="w-full h-full bg-black text-emerald-400 font-mono flex items-center justify-center">Loading Projects...</div>}>
            <HoloProjectHub />
          </Suspense>
        </div>
      ),
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 pointer-events-auto ${active ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={null}>
            <InfiniteBentoPanBackground />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000c04]/30 via-transparent to-[#000c04]/30 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-emerald-950/10 pointer-events-none z-10" />
        </div>
      ),
    },

    // 4. SKILLS
    {
      id: "skills",
      leftLabel: "Stack",
      rightLabel: "Tech",
      title: <div />,
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 bg-[#0c0c0c] ${active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <Suspense fallback={<div className="w-full h-full bg-[#0c0c0c]" />}>
            <PrismaVideoBackground />
          </Suspense>
          <div className="absolute inset-0 bg-black/30 pointer-events-none" style={{ zIndex: 1 }} />
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-500">Loading Tech Matrix...</div>}>
              <NeuralTechHub />
            </Suspense>
          </div>
        </div>
      ),
    },

    // 5. CAREER & ACHIEVEMENTS
    {
      id: "achievements",
      leftLabel: "Record",
      rightLabel: "Feat",
      title: (
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-500">Loading Career Dashboard...</div>}>
          <CareerDashboard />
        </Suspense>
      ),
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-1000 bg-black ${active ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <NexusGateVideo videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />
          </Suspense>
        </div>
      ),
    },

    // 6. CONTACT & FOOTER
    {
      id: "contact",
      leftLabel: "Touch",
      rightLabel: "End",
      title: (
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center space-y-4 md:space-y-5 pointer-events-auto pt-14 pb-4 h-full">
          <div className="w-full max-w-2xl px-2">
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
            <Suspense fallback={null}>
              <SidBotChat />
            </Suspense>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center pt-1">
            <button onClick={handleCopyEmail} className="cursor-pointer">
              <MicroExpander 
                text="Copy Email" 
                icon={<Copy className="w-4 h-4 text-emerald-400" />} 
                variant="outline"
                className="bg-black/60 text-emerald-300 border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-500/60 hover:text-emerald-200 backdrop-blur-md"
              />
            </button>
            <a href={`mailto:${PROFILE.email}`}>
              <MicroExpander 
                text="Email Me" 
                icon={<Mail className="w-4 h-4 text-zinc-300" />} 
                variant="outline"
                className="bg-black/60 text-zinc-200 border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-white backdrop-blur-md"
              />
            </a>
            <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
              <MicroExpander 
                text="GitHub" 
                icon={<Github className="w-4 h-4 text-zinc-300" />} 
                variant="outline" 
                className="bg-black/60 text-zinc-200 border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-white backdrop-blur-md" 
              />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <MicroExpander 
                text="LinkedIn" 
                icon={<Linkedin className="w-4 h-4 text-emerald-400" />} 
                variant="ghost" 
                className="bg-black/60 text-emerald-300 border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-500/60 hover:text-emerald-200 backdrop-blur-md" 
              />
            </a>
          </div>
          <div className="text-center text-zinc-400 text-xs pt-1 space-y-0.5 font-mono">
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest">{PROFILE.location}</p>
            <p className="text-[10px] text-zinc-400">&copy; {new Date().getFullYear()} Siddharth Kumar. Crafted with <Heart className="inline w-3 h-3 text-red-500 mx-0.5" /> & <Coffee className="inline w-3 h-3 text-amber-500 mx-0.5" /></p>
          </div>
        </div>
      ),
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hacker background image — static, object-cover */}
          <img
            src="/hacker-bg.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          />
          {/* Pixel canvas shimmer overlay — emerald theme colors */}
          <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
            <Suspense fallback={null}>
              <PixelCanvas
                colors={["#022c22", "#064e3b", "#065f46", "#10b981", "#10b981", "#34d399"]}
                gap={8}
                speed={25}
              />
            </Suspense>
          </div>
          {/* Vignette: edges fade to theme dark — softened so image is visible */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_center,transparent_55%,#000408_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000408] via-transparent to-transparent pointer-events-none" />
          {/* Subtle emerald grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Global Keyboard Navigation (↓ / ↑ / J / K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (showSplash || isMobile || isResumeModalOpen) return;

      if (e.key === "ArrowDown" || e.key.toLowerCase() === "j") {
        e.preventDefault();
        scrollFXRef.current?.next();
      } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "k") {
        e.preventDefault();
        scrollFXRef.current?.prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSplash, isMobile, isResumeModalOpen]);

  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPage6Visible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, [showSplash]);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      {/* Splash Screen */}
      {showSplash && (
        <SpiralSplash onEnter={() => setShowSplash(false)} />
      )}

      {/* Global Music Player */}
      <Suspense fallback={null}>
        <MusicPlayer />
      </Suspense>

      {/* Inline Resume & CV Previewer Modal */}
      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        initialDoc={resumeInitialDoc}
      />

      {/* Keyboard navigation HUD shortcut pill */}
      <div className={`fixed bottom-4 left-6 z-[9999] hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md bg-black/50 border border-white/10 text-[9px] font-mono text-zinc-400 pointer-events-none transition-opacity duration-500 shadow-lg ${showSplash ? 'opacity-0' : 'opacity-70 hover:opacity-100'}`}>
        <span className="text-zinc-500">Navigate:</span>
        <kbd className="px-1 py-0.5 rounded bg-white/10 text-emerald-300 text-[8px] font-bold">↓</kbd>
        <kbd className="px-1 py-0.5 rounded bg-white/10 text-emerald-300 text-[8px] font-bold">↑</kbd>
        <span className="text-zinc-600">/</span>
        <kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-300 text-[8px]">J</kbd>
        <kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-300 text-[8px]">K</kbd>
      </div>

      {/* Mobile Glassmorphic Header & Hamburger */}
      {isMobile && !showSplash && (
        <div className="fixed top-0 left-0 right-0 z-[9998] bg-black/80 backdrop-blur-xl border-b border-emerald-500/20 px-4 py-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">SIDDHARTH // PORTFOLIO</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-emerald-400" /> : <Menu className="w-4 h-4 text-emerald-400" />}
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              {isMobileMenuOpen ? "CLOSE" : "MENU"}
            </span>
          </button>
        </div>
      )}

      {/* Mobile Glassmorphic Navigation Drawer */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-mono font-bold tracking-widest text-white uppercase">NAVIGATION_SYSTEM</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-auto py-8 space-y-3">
              {[
                { id: "hero", label: "01 // START", sub: "Intro & Hero" },
                { id: "about", label: "02 // WHO", sub: "Bio & Overview" },
                { id: "projects", label: "03 // WORK", sub: "Projects & Demos" },
                { id: "skills", label: "04 // STACK", sub: "Core Architecture" },
                { id: "achievements", label: "05 // FEAT", sub: "Experience & Honors" },
                { id: "contact", label: "06 // TOUCH", sub: "Connect & Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all text-left group"
                >
                  <div>
                    <div className="text-base font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-zinc-400 font-sans mt-0.5">{item.sub}</div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-4">
              <div className="flex flex-wrap items-center justify-around gap-2">
                <button onClick={() => { setIsMobileMenuOpen(false); handleCopyEmail(); }} className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer">
                  COPY EMAIL
                </button>
                <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white">
                  GITHUB
                </a>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white">
                  LINKEDIN
                </a>
                <button onClick={() => { setIsMobileMenuOpen(false); handleOpenResume("resume"); }} className="text-xs font-mono text-zinc-400 hover:text-white cursor-pointer">
                  RESUME
                </button>
                <button onClick={() => { setIsMobileMenuOpen(false); handleOpenResume("cv"); }} className="text-xs font-mono text-zinc-400 hover:text-white cursor-pointer">
                  CV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Global Recruiter Action Bar */}
      <div className={`fixed top-4 left-4 md:top-6 md:left-8 z-[9999] hidden md:flex items-center gap-2 transition-all duration-500 ${showSplash || isPage6Visible ? 'opacity-0 pointer-events-none translate-y-[-20px]' : 'opacity-100 pointer-events-auto translate-y-0'}`}>
        <button 
          onClick={() => handleOpenResume("resume")}
          onMouseEnter={playCyberHover}
          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-all group shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-50">Resume</span>
        </button>
        <button 
          onClick={() => handleOpenResume("cv")}
          onMouseEnter={playCyberHover}
          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all group"
        >
          <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-200">CV</span>
        </button>
        <button 
          onClick={handleCopyEmail}
          onMouseEnter={playCyberHover}
          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all group"
          title="Copy email to clipboard"
        >
          <Copy className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-300">Copy Email</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`relative z-10 text-white transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>

        {!isMobile ? (
          /* DESKTOP / TABLET VIEW (≥768px) - Cinematic Scroll Snapping with Dual Rails */
          // @ts-ignore
          <FullScreenScrollFX
            ref={scrollFXRef}
            apiRef={scrollFXRef}
            sections={sections}
            showProgress={true}
            colors={{
              text: "#ffffff",
              pageBg: "transparent",
              stageBg: "transparent",
              overlay: "rgba(0,0,0,0.7)"
            }}
            fontFamily="Outfit, sans-serif"
          />
        ) : (
          /* MOBILE VIEW (<768px) - Vertical Responsive Scroll Stack */
          <div className="flex flex-col w-full overflow-x-hidden pt-12">
            {sections.map((section, index) => (
              <div key={section.id || index} id={section.id} className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 py-16 border-b border-white/5 scroll-mt-12">

                {/* Section Background */}
                <div className="absolute inset-0 z-0 opacity-50 overflow-hidden">
                  {section.renderBackground && section.renderBackground(true)}
                </div>

                {/* Section Content */}
                <div className="relative z-10 w-full max-w-4xl mx-auto">
                  {section.id === 'projects' ? (
                    <Suspense fallback={<div className="w-full h-48 flex items-center justify-center font-mono text-xs text-zinc-500">Loading Projects...</div>}>
                      <HoloProjectHub />
                    </Suspense>
                  ) : section.id === 'skills' ? (
                    <Suspense fallback={<div className="w-full h-48 flex items-center justify-center font-mono text-xs text-zinc-500">Loading Tech Matrix...</div>}>
                      <NeuralTechHub />
                    </Suspense>
                  ) : (
                    section.title
                  )}
                </div>

              </div>
            ))}

            {/* Mobile Footer */}
            <div className="py-8 text-center text-zinc-600 text-xs font-mono bg-black relative z-10">
              <p>SYSTEM STATUS: ONLINE</p>
              <p className="mt-2 text-[10px] opacity-50">&copy; {new Date().getFullYear()} SIDDHARTH KUMAR</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
