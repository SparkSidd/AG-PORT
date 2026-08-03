import React from "react"
import { cn } from "@/lib/utils"

interface HexagonPatternProps {
  className?: string
}

export function HexagonPattern({ className }: HexagonPatternProps) {
  return (
    <svg
      className={cn("w-full h-full opacity-30", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <polygon
            points="28,2 54,16 54,44 28,58 2,44 2,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <polygon
            points="28,30 54,44 54,72 28,86 2,72 2,44"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  )
}

export default HexagonPattern
