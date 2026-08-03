"use client"
import { useRef, useEffect } from "react"

interface TechMatrixBackgroundProps {
  opacity?: number
  className?: string
}

export function TechMatrixBackground({ opacity = 0.5, className = "" }: TechMatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener("resize", resize)

    const columns = Math.floor(canvas.width / 20)
    const rows = Math.floor(canvas.height / 20)
    
    // Grid states
    const cells = Array.from({ length: columns * rows }, () => ({
      active: Math.random() > 0.9,
      life: Math.random(),
    }))

    const draw = () => {
      ctx.fillStyle = `rgba(0,0,0,0.1)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const w = canvas.width / columns
      const h = canvas.height / rows

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i + j * columns
          const cell = cells[idx]
          
          if (cell.active) {
            cell.life -= 0.02
            if (cell.life <= 0) cell.active = false
            
            ctx.fillStyle = `rgba(34,197,94,${cell.life * opacity})`
            ctx.fillRect(i * w + 1, j * h + 1, w - 2, h - 2)
          } else {
            if (Math.random() > 0.999) {
              cell.active = true
              cell.life = 1
            }
          }
        }
      }
      
      // Moving line scanner
      const time = Date.now() * 0.001
      const scanY = (Math.sin(time) * 0.5 + 0.5) * canvas.height
      ctx.fillStyle = `rgba(34,197,94,${0.2 * opacity})`
      ctx.fillRect(0, scanY - 5, canvas.width, 10)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [opacity])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ background: "#050505" }} />
}

export default TechMatrixBackground
