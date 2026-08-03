"use client"
import { useRef, useEffect } from "react"

interface CyberRainBackgroundProps { className?: string }

export function CyberRainBackground({ className = "" }: CyberRainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener("resize", resize)
    const cols = Math.floor(canvas.width / 16)
    const drops: number[] = Array(cols).fill(1)
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01"
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#22c55e"; ctx.font = "14px monospace"
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16)
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ background: "#000" }} />
}
export default CyberRainBackground
