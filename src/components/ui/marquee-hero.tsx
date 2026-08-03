"use client";

import { ArrowRight, Download, Mail } from "lucide-react";
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
  { emoji: "🚀", label: "PROJECTS DEPLOYED", value: `${PROFILE.projects.length}+` },
  { emoji: "🧠", label: "AI/ML MODELS", value: "Verified" },
  { emoji: "🛡️", label: "SECURITY AUDITS", value: "Passed" },
  { emoji: "🏆", label: "ACHIEVEMENTS", value: `${PROFILE.achievements.length}+` },
];

function AvatarStack() {
  return (
    <div className="flex -space-x-4">
      {rolesAvatars.map((role, i) => (
        <Avatar
          className="w-14 h-14 border-2 border-emerald-500 bg-zinc-900"
          key={role.initials}
          style={{ zIndex: rolesAvatars.length - i }}
        >
          <AvatarImage alt={`Role ${role.initials}`} src={role.src} />
          <AvatarFallback className="bg-zinc-800 text-emerald-400 text-[10px] font-bold font-mono">
            {role.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      <div className="flex items-center justify-center pl-6 pr-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono text-zinc-400">
         MULTIFACETED.
      </div>
    </div>
  );
}

function StatsMarquee() {
  return (
    <div className="w-full max-w-4xl border-y border-white/10 bg-black/20 backdrop-blur-md relative z-20">
      <Marquee
        className="py-3 sm:py-4 [--duration:40s] [--gap:3rem]"
        pauseOnHover
        repeat={4}
      >
        {stats.map((stat) => (
          <div
            className="flex items-center gap-3 whitespace-nowrap"
            key={stat.label}
          >
            <span className="font-bold font-mono text-emerald-400 text-sm sm:text-base tracking-wide drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
              {stat.value}
            </span>
            <span className="font-medium font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-[0.2em]">
              {stat.label}
            </span>
            <span className="text-base sm:text-lg">{stat.emoji}</span>
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-4 md:pb-6">
        <div className="space-y-4 md:space-y-6">
          <AvatarStack />
          <StatsMarquee />
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-6 sm:pb-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full space-y-8 lg:w-3/5">
            <h1 className="font-medium text-5xl text-white leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              I <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">architect</span>, you{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">succeed</span>
              <br />
              <span className="text-zinc-400 font-light">— that's the deal.</span>
            </h1>
            
            <div className="flex gap-4">
              <a href={`mailto:${PROFILE.email}`}>
                <Button className="rounded-full py-6 px-6 overflow-hidden bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] hover:drop-shadow-[0_0_25px_rgba(52,211,153,0.7)] group">
                  <span className="font-mono uppercase tracking-widest text-xs flex items-center gap-2">
                    <Mail className="w-4 h-4 transition-transform group-hover:scale-110" /> Contact Agent
                  </span>
                </Button>
              </a>
              <a href="/sid resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full py-6 px-6 overflow-hidden bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-all">
                  <span className="font-mono uppercase tracking-widest text-xs flex items-center gap-2">
                    <Download className="w-4 h-4" /> Resume
                  </span>
                </Button>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col gap-8 justify-center">
            <motion.div 
                className="text-base sm:text-lg text-zinc-300 font-mono uppercase tracking-wide leading-relaxed text-center text-pretty drop-shadow-md"
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
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-6 border-t border-white/10 text-center lg:text-left">
                <div className="space-y-1 lg:ml-auto">
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase tracking-[0.2em]">Operator</p>
                    <p className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-md uppercase">{PROFILE.name}</p>
                </div>
                <div className="space-y-1 lg:ml-auto">
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase tracking-[0.2em]">Base</p>
                    <p className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-md uppercase">{PROFILE.location}</p>
                </div>
                <div className="space-y-1 lg:ml-auto">
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase tracking-[0.2em]">Primary Focus</p>
                    <p className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-md uppercase truncate">{PROFILE.role.split('|')[0].trim()}</p>
                </div>
                <div className="space-y-1 lg:ml-auto">
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase tracking-[0.2em]">Education</p>
                    <p className="text-sm md:text-base font-bold text-white tracking-widest drop-shadow-md uppercase truncate" title={PROFILE.education[0].degree}>B.Tech CSE</p>
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
