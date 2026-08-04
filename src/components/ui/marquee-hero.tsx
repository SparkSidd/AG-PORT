"use client";

import { ArrowRight, Download, Mail, FileText, Code, Layers } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Marquee } from "./marquee";
import { PROFILE } from "@/data/profile";
import { motion } from "framer-motion";
import { HoverLinkAnimation } from "./hover-link-animation";

const rolesAvatars = [
  {
    initials: "DEV",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    initials: "AI",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    initials: "SEC",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    initials: "SYS",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

const stats = [
  { value: "14+", label: "Projects Shipped" },
  { value: "60%", label: "Inspection Work Cut" },
  { value: "0", label: "Production Downtime" },
];

function AvatarStack() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {rolesAvatars.map((avatar, idx) => (
          <Avatar key={idx} className="border-2 border-zinc-950 w-9 h-9 sm:w-10 sm:h-10">
            <AvatarImage src={avatar.src} alt={avatar.initials} />
            <AvatarFallback className="bg-zinc-800 text-emerald-400 font-mono text-xs">
              {avatar.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        <span className="text-emerald-400 font-bold">FULL-STACK</span> &bull; AI &bull; SECURITY &bull; SYSTEMS
      </div>
    </div>
  );
}

function StatsMarquee() {
  return (
    <div className="relative overflow-hidden w-full py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl backdrop-blur-sm">
      <Marquee repeat={4} className="[--duration:20s] [--gap:2rem]">
        {stats.map((s, idx) => (
          <div key={idx} className="flex items-center gap-2 mx-3 shrink-0">
            <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
              {s.value}
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
              {s.label}
            </span>
            <span className="text-zinc-600 text-xs ml-3">•</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export function MarqueeHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    // Dispatch custom navigation event for full-screen scroll FX listener
    window.dispatchEvent(new CustomEvent("nav-goto-section", { detail: id }));
  };

  return (
    <section className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-transparent py-4 sm:py-6 pointer-events-auto">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8">
        <div className="space-y-3 md:space-y-4 mb-6">
          <AvatarStack />
          <StatsMarquee />
        </div>
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full space-y-6 lg:w-3/5">
            <h1
              className="font-medium text-white leading-[1.15] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.5rem)' }}
            >
              I <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">architect</span>, you{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">succeed</span>
              <br />
              <span className="text-zinc-400 font-light">— that's the deal.</span>
            </h1>
            
            <div className="flex gap-3">
              <button 
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer"
              >
                <Button className="rounded-full py-3 px-5 overflow-hidden bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all drop-shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:drop-shadow-[0_0_20px_rgba(52,211,153,0.6)] group">
                  <span className="font-mono uppercase tracking-widest text-[11px] flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 transition-transform group-hover:scale-110" /> View Projects
                  </span>
                </Button>
              </button>
              <button 
                onClick={() => scrollToSection("skills")}
                className="cursor-pointer"
              >
                <Button className="rounded-full py-3 px-5 overflow-hidden bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all">
                  <span className="font-mono uppercase tracking-widest text-[11px] flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> Explore Stack
                  </span>
                </Button>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col gap-6 justify-center">
            <motion.div 
                className="text-xs sm:text-sm text-zinc-300 font-mono uppercase tracking-wide leading-relaxed text-center lg:text-left text-pretty drop-shadow-md"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { duration: 0.6, staggerChildren: 0.03 },
                    },
                }}
                initial="hidden"
                animate="show"
            >
              {PROFILE.biography.split('\n\n')[0].split(' ').map((word, i) => {
                  const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, '');
                  const keywords = [
                      'applications', 'security', 'models', 'boundaries', 'development', 'cybersecurity', 'AI/ML',
                      'resilient', 'threats', 'production', 'versatility', 'intersections'
                  ];
                  const isKeyword = keywords.some(k => cleanWord.toLowerCase().includes(k.toLowerCase()));

                  if (isKeyword) {
                      return (
                          <span key={i}>
                              <motion.span 
                                  variants={{
                                      hidden: { opacity: 0, y: 12 },
                                      show: { opacity: 1, y: 0 },
                                  }}
                                  className="inline-block font-bold text-white"
                              >
                                  <HoverLinkAnimation highlightColor="#0d0d0d" className="text-[#22c55e]">
                                      {word}
                                  </HoverLinkAnimation>
                              </motion.span>{' '}
                          </span>
                      );
                  }
                  return (
                      <span key={i}>
                          <motion.span 
                              variants={{
                                  hidden: { opacity: 0, y: 12 },
                                  show: { opacity: 1, y: 0 },
                              }}
                              className="inline-block"
                          >
                              {word}
                          </motion.span>{' '}
                      </span>
                  );
              })}
            </motion.div>
            
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 pt-4 border-t border-white/10 text-center lg:text-left">
                <div className="space-y-0.5 lg:ml-auto">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Operator</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase">{PROFILE.name}</p>
                </div>
                <div className="space-y-0.5 lg:ml-auto">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Base</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase">{PROFILE.location}</p>
                </div>
                <div className="space-y-0.5 lg:ml-auto">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Primary Focus</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase truncate">{PROFILE.role.split('|')[0].trim()}</p>
                </div>
                <div className="space-y-0.5 lg:ml-auto">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Education</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase truncate" title={PROFILE.education[0].degree}>B.Tech CSE</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}

export default MarqueeHero;
