'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from 'react'
import { useMusicStore } from "@/components/ui/music-player"

interface SpiralSplashProps {
    onEnter: () => void;
}

export const SpiralSplash = ({ onEnter }: SpiralSplashProps) => {
  const [startVisible, setStartVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const togglePlay = useMusicStore((state) => state.togglePlay)
  const setPlaying = useMusicStore((state) => state.setPlaying)
  
  // Handle navigation to personal site
  const handleEnter = () => {
    // Start music
    setPlaying(true);
    
    setIsExiting(true);
    setTimeout(() => {
        onEnter();
    }, 1500); // Wait for fade out
  }
  
  // Fade in the start button after animation loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartVisible(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden bg-black z-50 transition-opacity duration-[1500ms] ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Spiral Animation */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>
      
      {/* Simple Elegant Text Button with Pulsing Effect */}
      <div 
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-1500 ease-out
          ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <button 
          onClick={handleEnter}
          className="
            text-white text-2xl tracking-[0.2em] uppercase font-extralight
            transition-all duration-700
            hover:tracking-[0.3em] hover:text-green-400 animate-pulse outline-none
          "
        >
          Enter
        </button>
      </div>
    </div>
  )
}
