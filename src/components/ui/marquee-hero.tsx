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
  { value: "14+", label: "Projects Shipped", emoji: "🚀" },
  { value: "60%", label: "Inspection Work Cut", emoji: "⚡" },
  { value: "0", label: "Production Downtime", emoji: "🛡️" },
];

function AvatarStack() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {rolesAvatars.map((role) => (
        <Avatar key={role.initials} className="w-7 h-7 sm:w-8 sm:h-8 border border-white/20">
          <AvatarImage src={role.src} alt={role.initials} />
          <AvatarFallback className="text-[10px] font-mono bg-zinc-900 text-emerald-400">
            {role.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      <div className="flex items-center justify-center pl-4 pr-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-mono text-zinc-400">
         MULTIFACETED.
      </div>
    </div>
  );
}

function StatsMarquee() {
  return (
    <div className="w-full max-w-3xl border-y border-white/10 bg-black/20 backdrop-blur-md relative z-20">
      <Marquee
        className="py-2 [--duration:40s] [--gap:2.5rem]"
        pauseOnHover
        repeat={4}
      >
        {stats.map((stat) => (
          <div
            className="flex items-center gap-2.5 whitespace-nowrap"
            key={stat.label}
          >
            <span className="font-bold font-mono text-emerald-400 text-xs sm:text-sm tracking-wide drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
              {stat.value}
            </span>
            <span className="font-medium font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-[0.18em]">
              {stat.label}
            </span>
            <span className="text-sm">{stat.emoji}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export function MarqueeHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-start justify-center pointer-events-auto overflow-hidden">
      
      {/* Fallback internal gradient blending if App.tsx background is not fully opaque */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-3 md:pb-4">
        <div className="space-y-3 md:space-y-4">
          <AvatarStack />
          <StatsMarquee />
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8">
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

            {/* Operator & System Metadata Grid — moved here to fill the button space */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 pt-4 border-t border-white/10 text-left max-w-md">
                <div className="space-y-0.5">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Operator</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase">{PROFILE.name}</p>
                </div>
                <div className="space-y-0.5">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Base</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase">{PROFILE.location}</p>
                </div>
                <div className="space-y-0.5">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Primary Focus</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase truncate">{PROFILE.role.split('|')[0].trim()}</p>
                </div>
                <div className="space-y-0.5">
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-[0.18em]">Education</p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-widest drop-shadow-md uppercase truncate" title={PROFILE.education[0].degree}>B.Tech CSE</p>
                </div>
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
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}

export default MarqueeHero;
