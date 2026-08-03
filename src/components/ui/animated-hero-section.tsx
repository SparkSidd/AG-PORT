"use client"
import { useRef, useEffect } from "react"

export function AnimatedHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    // Pong state
    const ball = { x: canvas.width / 2, y: canvas.height / 2, vx: 3, vy: 2, r: 6 }
    const paddleH = 80, paddleW = 10
    const p1 = { y: canvas.height / 2 - paddleH / 2 }
    const p2 = { y: canvas.height / 2 - paddleH / 2 }
    let score1 = 0, score2 = 0

    const reset = () => {
      ball.x = canvas.width / 2; ball.y = canvas.height / 2
      ball.vx = (Math.random() > 0.5 ? 1 : -1) * 3
      ball.vy = (Math.random() > 0.5 ? 1 : -1) * 2
    }

    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.fillStyle = "rgba(0,0,0,0.15)"
      ctx.fillRect(0, 0, w, h)

      // Move ball
      ball.x += ball.vx; ball.y += ball.vy
      if (ball.y - ball.r < 0 || ball.y + ball.r > h) ball.vy *= -1

      // AI paddles
      p1.y += (ball.y - (p1.y + paddleH / 2)) * 0.06
      p2.y += (ball.y - (p2.y + paddleH / 2)) * 0.06
      p1.y = Math.max(0, Math.min(h - paddleH, p1.y))
      p2.y = Math.max(0, Math.min(h - paddleH, p2.y))

      // Collisions
      if (ball.x - ball.r < 30 + paddleW && ball.y > p1.y && ball.y < p1.y + paddleH) ball.vx = Math.abs(ball.vx)
      if (ball.x + ball.r > w - 30 - paddleW && ball.y > p2.y && ball.y < p2.y + paddleH) ball.vx = -Math.abs(ball.vx)
      if (ball.x < 0) { score2++; reset() }
      if (ball.x > w) { score1++; reset() }

      // Draw elements
      ctx.strokeStyle = "rgba(34,197,94,0.15)"
      ctx.setLineDash([10, 10])
      ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke()
      ctx.setLineDash([])

      // Paddles
      ctx.fillStyle = "rgba(34,197,94,0.7)"
      ctx.shadowColor = "#22c55e"; ctx.shadowBlur = 15
      ctx.fillRect(30, p1.y, paddleW, paddleH)
      ctx.fillRect(w - 30 - paddleW, p2.y, paddleW, paddleH)
      ctx.shadowBlur = 0

      // Ball
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
      ctx.fillStyle = "#22c55e"; ctx.shadowColor = "#22c55e"; ctx.shadowBlur = 20
      ctx.fill(); ctx.shadowBlur = 0

      // Score
      ctx.fillStyle = "rgba(34,197,94,0.2)"; ctx.font = "bold 80px monospace"; ctx.textAlign = "center"
      ctx.fillText(score1.toString(), w / 4, h / 2 + 30)
      ctx.fillText(score2.toString(), 3 * w / 4, h / 2 + 30)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#0c0c0c" }}
    />
  )
}

export default AnimatedHeroSection
