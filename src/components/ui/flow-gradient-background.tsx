"use client"
import { useRef, useEffect } from "react"

interface FlowGradientBackgroundProps {
  isDark?: boolean
  className?: string
}

export function FlowGradientBackground({ isDark = true, className = "" }: FlowGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)

      // Base fill
      ctx.fillStyle = isDark ? "#050505" : "#f0f0f0"
      ctx.fillRect(0, 0, w, h)

      // Animated blobs
      const blobs = [
        { x: 0.3 + 0.2 * Math.sin(t * 0.4), y: 0.3 + 0.15 * Math.cos(t * 0.3), r: 0.5, color: "rgba(34,197,94," },
        { x: 0.7 + 0.2 * Math.cos(t * 0.35), y: 0.6 + 0.15 * Math.sin(t * 0.45), r: 0.4, color: "rgba(16,185,129," },
        { x: 0.5 + 0.25 * Math.sin(t * 0.25), y: 0.8 + 0.1 * Math.cos(t * 0.5), r: 0.35, color: "rgba(52,211,153," },
      ]

      blobs.forEach(b => {
        const grd = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * Math.min(w, h))
        grd.addColorStop(0, b.color + "0.08)")
        grd.addColorStop(1, b.color + "0)")
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, w, h)
      })

      t += 0.008
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
}

export default FlowGradientBackground
