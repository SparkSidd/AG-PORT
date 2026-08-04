import { useState, useEffect, Suspense, lazy } from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import RainingLetters from "@/components/ui/modern-animated-hero-section";
import { MicroExpander } from "@/components/ui/micro-expander";
import { PROFILE } from "@/data/profile";
import { Github, Linkedin, Mail, FileText, Code, Database, Brain, Lock, Terminal, Cloud, Sparkles, GitGraph, Heart, Coffee, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactSection } from "@/components/ui/contact-section";
import { CareerDashboard } from "@/components/ui/career-dashboard";
import { SpiralSplash } from "@/components/SpiralSplash";
import { HoloDossier } from "@/components/ui/holo-dossier";
import { MusicPlayer } from "@/components/ui/music-player";
import { NeuralTechHub } from "@/components/ui/neural-tech-hub";
import { PixelCanvas } from "@/components/ui/pixel-perfect-hero";
import { InfiniteBentoPanBackground } from "@/components/ui/infinite-bento-pan-bg";



import { SidBotChat } from "@/components/ui/sidbot-chat";

// Lazy load heavy components
const NeonCrystalCity = lazy(() => import("@/components/ui/neon-crystal-city"));
const HoloProjectHub = lazy(() => import("@/components/ui/holo-project-hub").then(module => ({ default: module.HoloProjectHub })));
const NeuralBackground = lazy(() => import("@/components/ui/flow-field-background"));
const TechMatrixBackground = lazy(() => import("@/components/ui/tech-matrix-background").then(module => ({ default: module.TechMatrixBackground })));
const FallingPattern = lazy(() => import("@/components/ui/falling-pattern").then(module => ({ default: module.FallingPattern })));
const HexagonPattern = lazy(() => import("@/components/ui/hexagon-pattern").then(module => ({ default: module.HexagonPattern })));
const MobileProjectHub = lazy(() => import("@/components/ui/mobile-project-hub").then(module => ({ default: module.MobileProjectHub })));
const MobileCareerHub = lazy(() => import("@/components/ui/mobile-career-hub").then(module => ({ default: module.MobileCareerHub })));
const NexusGateVideo = lazy(() => import("@/components/ui/gaming-login").then(module => ({ default: module.default.VideoBackground })));
const MarqueeHero = lazy(() => import("@/components/ui/marquee-hero").then(module => ({ default: module.MarqueeHero })));
const FlowGradientBackground = lazy(() => import("@/components/ui/flow-gradient-background").then(module => ({ default: module.FlowGradientBackground })));
const HeroSectionBackground = lazy(() => import("@/components/ui/hero-section-background").then(module => ({ default: module.HeroSectionBackground })));
const CyberRainBackground = lazy(() => import("@/components/ui/cyber-rain-background").then(module => ({ default: module.CyberRainBackground })));
const CybercoreBackground = lazy(() => import("@/components/ui/cybercore-section-hero"));
const AnimatedHeroSection = lazy(() => import("@/components/ui/animated-hero-section").then(module => ({ default: module.AnimatedHeroSection })));
const ParallaxHero = lazy(() => import("@/components/ui/parallax-hero").then(module => ({ default: module.ParallaxHero })));
const PrismaVideoBackground = lazy(() => import("@/components/ui/prisma-hero").then(module => ({ default: module.PrismaVideoBackground })));
const RevealWaveImage = lazy(() => import("@/components/ui/reveal-wave-image").then(module => ({ default: module.RevealWaveImage })));


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
    // 2. ABOUT
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
          {/* Subtle top vignette to keep nav readable, NO heavy overlay */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
          {/* Bottom fade into next section */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
          {/* Emerald scan-line texture — extremely subtle */}
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
          <HoloProjectHub />
        </div>
      ),
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 pointer-events-auto ${active ? 'opacity-100' : 'opacity-0'}`}>
          <InfiniteBentoPanBackground />
          {/* Subtle top/bottom fade so header text remains crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000c04]/30 via-transparent to-[#000c04]/30 pointer-events-none z-10" />
          {/* Subtle emerald tint to unify with theme */}
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
          {/* Subtle dark veil so skill text remains sharp */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" style={{ zIndex: 1 }} />
          {/* Neural Tech Hub — sits on top of video canvas */}
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <NeuralTechHub />
          </div>
        </div>
      ),
    },
    // 5. ACHIEVEMENTS & POSITIONS
    {
      id: "achievements",
      leftLabel: "Feat",
      rightLabel: "Lead",
      title: (
        <CareerDashboard />
      ),
      renderBackground: (active: boolean) => (
        <div className={`absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-1000 bg-black ${active ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <NexusGateVideo videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />
          </Suspense>
        </div>
      ),
    },

    // 6. CONTACT
    {
      id: "contact",
      leftLabel: "Touch",
      rightLabel: "End",
      title: (
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center space-y-4 md:space-y-5 pointer-events-auto pt-14 pb-4 h-full">
          <div className="w-full max-w-2xl px-2">
            <ContactSection />
            <SidBotChat />
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center pt-1">
            <a href={`mailto:${PROFILE.email}`}>
              <MicroExpander text="Email Me" icon={<Mail className="w-4 h-4" />} />
            </a>
            <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
              <MicroExpander text="GitHub" icon={<Github className="w-4 h-4" />} variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black" />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <MicroExpander text="LinkedIn" icon={<Linkedin className="w-4 h-4" />} variant="ghost" className="text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300 border border-emerald-500/20" />
            </a>
            <a href="/sid resume.pdf" target="_blank" rel="noopener noreferrer">
              <MicroExpander text="Resume" icon={<FileText className="w-4 h-4" />} variant="default" className="bg-emerald-600 hover:bg-emerald-500 text-white border-none" />
            </a>
            <a href="/sid CV.pdf" target="_blank" rel="noopener noreferrer">
              <MicroExpander text="CV" icon={<FileText className="w-4 h-4" />} variant="outline" className="text-emerald-400 border-emerald-500/40 hover:bg-emerald-950/40" />
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
            src="/hacker-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          />
          {/* Pixel canvas shimmer overlay — emerald theme colors */}
          <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
            <PixelCanvas
              colors={["#022c22", "#064e3b", "#065f46", "#10b981", "#10b981", "#34d399"]}
              gap={8}
              speed={25}
            />
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

  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      {/* Splash Screen */}
      {showSplash && (
        <SpiralSplash onEnter={() => setShowSplash(false)} />
      )}

      {/* Global Music Player */}
      <MusicPlayer />

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
              <div className="flex items-center justify-around">
                <a href={`mailto:${PROFILE.email}`} className="text-xs font-mono text-emerald-400 hover:underline">
                  EMAIL
                </a>
                <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white">
                  GITHUB
                </a>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white">
                  LINKEDIN
                </a>
                <a href="/sid resume.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white">
                  RESUME
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Global Recruiter Action Bar */}
      <div className={`fixed top-4 left-4 md:top-6 md:left-8 z-[9999] pointer-events-auto hidden md:flex items-center gap-2 transition-all duration-1000 ${showSplash ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'}`}>
        <a 
          href={`mailto:${PROFILE.email}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-all group shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <Mail className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-50">Hire Me</span>
        </a>
        <a 
          href="/sid resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-all group shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-50">Resume</span>
        </a>
      </div>

      {/* Main Content Area */}
      <div className={`relative z-10 text-white transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>

        {!isMobile ? (
          /* DESKTOP / TABLET VIEW (≥768px) - Cinematic Scroll Snapping with Dual Rails */
          // @ts-ignore
          <FullScreenScrollFX
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
                    <HoloProjectHub />
                  ) : section.id === 'skills' ? (
                    <NeuralTechHub />
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

