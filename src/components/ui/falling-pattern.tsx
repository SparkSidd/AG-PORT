"use client"
import { useRef, useEffect } from "react"

interface FallingPatternProps {
  className?: string
  color?: string
}

export function FallingPattern({ className = "", color = "#22c55e" }: FallingPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener("resize", resize)

    const symbols = "◆◇▲△▼▽●○■□★☆"
    const cols = Math.floor(canvas.width / 30)
    const drops = Array.from({ length: cols }, () => -Math.random() * canvas.height / 25)

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = "18px monospace"
      drops.forEach((y, i) => {
        const sym = symbols[Math.floor(Math.random() * symbols.length)]
        const alpha = 0.1 + Math.random() * 0.4
        ctx.fillStyle = color.startsWith("#")
          ? `rgba(${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)},${alpha})`
          : color
        ctx.fillText(sym, i * 30, y * 25)
        drops[i] += 0.3
        if (drops[i] * 25 > canvas.height && Math.random() > 0.97) drops[i] = 0
      })
      animId = requestAnimationFrame(draw)
    }

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [color])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ background: "#000" }} />
}

export default FallingPattern
