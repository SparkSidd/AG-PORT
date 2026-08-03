"use client"
import { useRef, useEffect } from "react"

interface HeroSectionBackgroundProps {
  className?: string
}

export function HeroSectionBackground({ className = "" }: HeroSectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number, t = 0

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener("resize", resize)

    // Star field
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.5,
      speed: 0.0002 + Math.random() * 0.0005,
      alpha: 0.2 + Math.random() * 0.8,
    }))

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)

      // Nebula blobs
      const grad = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.5)
      grad.addColorStop(0, "rgba(34,197,94,0.06)")
      grad.addColorStop(1, "transparent")
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h)

      // Stars
      stars.forEach(s => {
        s.y -= s.speed
        if (s.y < 0) { s.y = 1; s.x = Math.random() }
        const flicker = s.alpha * (0.7 + 0.3 * Math.sin(t * 3 + s.x * 100))
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,197,94,${flicker})`
        ctx.fill()
      })

      // Horizon glow
      const hGrad = ctx.createLinearGradient(0, h * 0.6, 0, h)
      hGrad.addColorStop(0, "transparent")
      hGrad.addColorStop(1, "rgba(34,197,94,0.04)")
      ctx.fillStyle = hGrad; ctx.fillRect(0, 0, w, h)

      t += 0.016
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
}

export default HeroSectionBackground
