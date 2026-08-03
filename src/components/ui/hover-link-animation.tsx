"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface HoverLinkAnimationProps {
  children: React.ReactNode
  className?: string
  highlightColor?: string
}

export function HoverLinkAnimation({ children, className, highlightColor = "#22c55e" }: HoverLinkAnimationProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      className={cn("relative inline-block cursor-pointer transition-colors duration-300", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-300 origin-left"
        style={{
          background: highlightColor,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </span>
  )
}
