"use client"
import { useState } from "react"
import { Send, X, CheckCircle, AlertCircle } from "lucide-react"
import { PROFILE } from "@/data/profile"
import { cn } from "@/lib/utils"

type FormState = "idle" | "sending" | "success" | "error"

export function SecureMessageGateway() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<FormState>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const sub = encodeURIComponent(`[Portfolio] ${form.subject || "Contact"} — ${form.name}`)
      const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
      window.location.href = `mailto:${PROFILE.email}?subject=${sub}&body=${body}`
      setTimeout(() => setStatus("success"), 600)
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <CheckCircle className="w-14 h-14 text-emerald-400 animate-pulse" />
      <p className="text-white font-mono tracking-widest uppercase text-sm">Transmission Successful</p>
      <p className="text-zinc-500 text-xs font-mono">Your mail client should have opened</p>
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />
        <p className="text-[10px] font-mono text-emerald-500 tracking-[0.3em] uppercase">Secure Channel Active</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            placeholder="What's this about?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Your message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4" /> Something went wrong. Try emailing directly.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-mono uppercase tracking-widest text-xs font-bold transition-all",
            status === "sending"
              ? "bg-emerald-500/50 text-black/50 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-400 text-black"
          )}
        >
          <Send className="w-4 h-4" />
          {status === "sending" ? "Transmitting..." : "Transmit Message"}
        </button>
      </form>
    </div>
  )
}
