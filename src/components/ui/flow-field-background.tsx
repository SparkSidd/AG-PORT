"use client"
import { useRef, useEffect } from "react"

interface FlowFieldBackgroundProps {
  color?: string
  trailOpacity?: number
  speed?: number
  className?: string
}

export function FlowFieldBackground({ color = "#22c55e", trailOpacity = 0.6, speed = 1, className = "" }: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener("resize", resize)

    const NUM = 120
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0, vy: 0,
      life: Math.random(),
    }))

    let t = 0
    const draw = () => {
      ctx.fillStyle = `rgba(0,0,0,${0.05 * trailOpacity})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        // Perlin-like flow field using sin/cos
        const angle = Math.sin(p.x * 0.003 + t) * Math.cos(p.y * 0.003 + t * 0.7) * Math.PI * 2
        p.vx += Math.cos(angle) * 0.3 * speed
        p.vy += Math.sin(angle) * 0.3 * speed
        p.vx *= 0.95; p.vy *= 0.95
        p.x += p.vx; p.y += p.vy
        p.life -= 0.003

        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.vx = 0; p.vy = 0; p.life = 1
        }

        const alpha = p.life * 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = color.replace(")", `, ${alpha})`).replace("rgb(", "rgba(").replace("#", "rgba(").replace(/rgba\(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/, (_, r, g, b) => `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)}`)
        // Simplified: just use the color with opacity
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        ctx.fill()
        ctx.globalAlpha = 1
      })

      t += 0.005 * speed
      animId = requestAnimationFrame(draw)
    }

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [color, trailOpacity, speed])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ background: "#000" }} />
}

export default FlowFieldBackground
