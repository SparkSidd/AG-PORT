"use client"
import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type FormState = "idle" | "sending" | "success" | "error"

const WEB3FORMS_ACCESS_KEY = "d11b2361-facf-49c5-acab-f6b62513e3f6"

export function SecureMessageGateway() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject ? `[Portfolio] ${form.subject}` : `[Portfolio] Contact from ${form.name}`,
          message: form.message,
          from_name: form.name,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error(data.message || "Failed to transmit message.")
      }
    } catch (err: any) {
      console.error("Web3Forms error:", err)
      setErrorMsg(err.message || "Network error. Please try again.")
      setStatus("error")
    }
  }

  if (status === "success") return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-emerald-400 animate-pulse" />
      </div>
      <p className="text-white font-mono tracking-widest uppercase text-base font-bold">Transmission Successful</p>
      <p className="text-emerald-400/80 text-xs font-mono max-w-sm">
        Your message has been securely transmitted to Siddharth's inbox.
      </p>
      <button
        onClick={() => setStatus("idle")}
        className="mt-2 text-xs font-mono text-zinc-400 hover:text-white underline uppercase tracking-wider"
      >
        Send another message
      </button>
    </div>
  )

  return (
    <div className="w-full space-y-5 bg-[#06100a] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />
          <p className="text-[10.5px] font-mono text-emerald-400 tracking-[0.25em] uppercase font-semibold">
            Secure Gateway Active
          </p>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
          Direct Inbox Relay
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest">Name *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              disabled={status === "sending"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:bg-emerald-950/20 transition-all disabled:opacity-50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              disabled={status === "sending"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:bg-emerald-950/20 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            placeholder="What is this regarding?"
            disabled={status === "sending"}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:bg-emerald-950/20 transition-all disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest">Message *</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Your message..."
            disabled={status === "sending"}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:bg-emerald-950/20 transition-all resize-none disabled:opacity-50"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg || "Transmission failed. Please check connection."}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-mono uppercase tracking-widest text-xs font-bold transition-all cursor-pointer",
            status === "sending"
              ? "bg-emerald-500/50 text-black/50 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          )}
        >
          <Send className="w-4 h-4" />
          {status === "sending" ? "Transmitting..." : "Transmit Message"}
        </button>
      </form>
    </div>
  )
}
