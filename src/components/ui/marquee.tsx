import { cn } from "@/lib/utils"
import React from "react"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

export function Marquee({ className, reverse, pauseOnHover = false, children, vertical = false, repeat = 4, ...props }: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group flex overflow-hidden gap-4", vertical ? "flex-col" : "flex-row", className)}
    >
      {Array(repeat).fill(0).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 items-center gap-4")}
          style={{
            animation: `${vertical ? "marquee-vertical" : "marquee-horizontal"} var(--duration, 40s) linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState: "running",
          }}
          onMouseEnter={e => { if (pauseOnHover) (e.currentTarget as HTMLElement).style.animationPlayState = "paused" }}
          onMouseLeave={e => { if (pauseOnHover) (e.currentTarget as HTMLElement).style.animationPlayState = "running" }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee-horizontal { from { transform: translateX(0) } to { transform: translateX(-100%) } }
        @keyframes marquee-vertical { from { transform: translateY(0) } to { transform: translateY(-100%) } }
      `}</style>
    </div>
  )
}
