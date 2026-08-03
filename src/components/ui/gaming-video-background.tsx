"use client"
import { useRef, useEffect } from "react"

interface GamingVideoBackgroundProps {
  className?: string
}

export function GamingVideoBackground({ className = "" }: GamingVideoBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number, t = 0

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    // Particle grid - gaming aesthetic
    const cols = 20, rows = 12
    const particles: { x: number; y: number; pulse: number; speed: number }[] = []
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      particles.push({ x: i / (cols - 1), y: j / (rows - 1), pulse: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() })
    }

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.fillStyle = "rgba(0,0,0,0.2)"
      ctx.fillRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = "rgba(34,197,94,0.04)"; ctx.lineWidth = 1
      for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(i * w / cols, 0); ctx.lineTo(i * w / cols, h); ctx.stroke() }
      for (let j = 0; j <= rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * h / rows); ctx.lineTo(w, j * h / rows); ctx.stroke() }

      // Pulsing nodes
      particles.forEach(p => {
        const px = p.x * w, py = p.y * h
        const pulse = Math.sin(t * p.speed + p.pulse)
        const alpha = 0.15 + 0.35 * (pulse * 0.5 + 0.5)
        const r = 2 + 3 * (pulse * 0.5 + 0.5)
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,197,94,${alpha})`
        ctx.shadowColor = "#22c55e"; ctx.shadowBlur = 8 * (pulse * 0.5 + 0.5)
        ctx.fill(); ctx.shadowBlur = 0
      })

      // Scan line
      const scanY = (Math.sin(t * 0.3) * 0.5 + 0.5) * h
      const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      grad.addColorStop(0, "transparent"); grad.addColorStop(0.5, "rgba(34,197,94,0.06)"); grad.addColorStop(1, "transparent")
      ctx.fillStyle = grad; ctx.fillRect(0, scanY - 40, w, 80)

      t += 0.02
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ background: "#000" }} />
}

export default GamingVideoBackground
