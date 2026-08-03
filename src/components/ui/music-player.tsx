"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { create } from "zustand";

export const useMusicStore = create<{
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
  togglePlay: () => void;
}>((set) => ({
  isPlaying: false,
  setPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

export function MusicPlayer() {
    const { isPlaying, setPlaying, togglePlay } = useMusicStore();
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt to auto-play after interaction or if allowed
        // Note: Most browsers block auto-play without interaction
        if (audioRef.current) {
            audioRef.current.volume = 0.4; // Set initial volume to 40%
        }
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error("Playback failed:", error);
                    setPlaying(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, setPlaying]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 group pointer-events-auto">
            {/* Visualizer (Only visible when playing) */}
            <div
                className={cn(
                    "flex items-end gap-0.5 h-6 transition-opacity duration-500",
                    isPlaying ? "opacity-100" : "opacity-0"
                )}
            >
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1 bg-green-500 rounded-t-sm animate-music-bar"
                        style={{
                            height: isPlaying ? `${Math.random() * 100}%` : '20%',
                            animationDuration: `${0.5 + Math.random() * 0.5}s`
                        }}
                    />
                ))}
            </div>

            <div className="flex items-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 gap-3 hover:bg-black/70 transition-colors">
                <button
                    onClick={togglePlay}
                    className="text-white hover:text-green-400 transition-colors flex items-center gap-2"
                    aria-label={isPlaying ? "Pause Music" : "Play Music"}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="text-xs font-mono hidden md:inline-block">
                        {isPlaying ? "PLAYING" : "PAUSED"}
                    </span>
                </button>

                <div className="w-px h-4 bg-white/20" />

                <button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
            </div>

            <audio
                ref={audioRef}
                src="/freedom.mp3"
                loop
                onEnded={() => setPlaying(false)}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes music-bar {
          0% { height: 20%; }
          50% { height: 100%; }
          100% { height: 20%; }
        }
        .animate-music-bar {
          animation: music-bar 1s ease-in-out infinite;
        }
      `}} />
        </div>
    );
}
