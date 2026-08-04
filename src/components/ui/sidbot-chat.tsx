import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

const SUGGESTED = [
  "What projects has Siddharth built?",
  "Is he open to opportunities?",
  "What AI/ML skills does he have?",
  "Tell me about his hackathons",
];

export function SidBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const buildHistory = (msgs: Message[]) =>
    msgs.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);

    const userMsg: Message = { role: "user", text: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: buildHistory(messages), // send history BEFORE the new message
        }),
      });

      const data = await res.json() as { text?: string; error?: string };

      if (data.error) throw new Error(data.error);

      setMessages([...updated, { role: "model", text: data.text ?? "" }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  return (
    <div className="w-full flex flex-col items-center mt-3 md:mt-4">
      {/* Entry Banner — Always visible */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl
          bg-black/60 border border-emerald-500/30 backdrop-blur-xl
          hover:border-emerald-400/60 hover:bg-emerald-950/30
          transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.08)]
          hover:shadow-[0_0_30px_rgba(16,185,129,0.18)] cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-xs md:text-sm font-mono text-emerald-300 group-hover:text-emerald-200 transition-colors">
          Still have questions?&nbsp;
        </span>
        <span className="flex items-center gap-1.5 text-xs md:text-sm font-bold font-mono text-white group-hover:text-emerald-300 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Ask SidBot
          <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
        </span>
      </button>

      {/* Chat Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl overflow-hidden
                bg-[#06100a] border border-emerald-500/30 backdrop-blur-2xl
                shadow-[0_0_60px_rgba(16,185,129,0.2)] max-h-[85vh] flex flex-col cursor-default"
            >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/20 bg-emerald-950/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold font-mono text-white leading-none">SidBot</p>
                  <p className="text-[10px] text-emerald-400/70 font-mono mt-0.5">
                    AI · Ask me anything about him
                  </p>
                </div>
                <span className="ml-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
                  Gemini
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {messages.length > 0 && (
                  <button
                    onClick={resetChat}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    title="Reset chat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-900/40">
              {/* Welcome / Suggestions */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                      <p className="text-sm text-zinc-200 leading-relaxed">
                        Hey! I'm SidBot 👋 I know everything about Siddharth — his projects, skills, experience, and more. What would you like to know?
                      </p>
                    </div>
                  </div>
                  <div className="pl-9">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2">Quick questions</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-950/20
                            text-emerald-300/80 hover:text-emerald-200 hover:border-emerald-500/40 hover:bg-emerald-950/40
                            transition-all duration-200 text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${msg.role === "user"
                        ? "bg-white/10 border border-white/20"
                        : "bg-emerald-500/20 border border-emerald-500/30"
                      }`}
                  >
                    {msg.role === "user"
                      ? <User className="w-3.5 h-3.5 text-zinc-300" />
                      : <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    }
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed
                      ${msg.role === "user"
                        ? "bg-white/10 border border-white/10 text-white rounded-tr-sm"
                        : "bg-emerald-950/40 border border-emerald-500/20 text-zinc-200 rounded-tl-sm"
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center h-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <div className="text-xs text-red-400/80 font-mono text-center py-1">
                  ⚠ {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 pb-4 pt-2 border-t border-emerald-500/15">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Siddharth..."
                  disabled={loading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5
                    text-sm text-white placeholder-zinc-600 outline-none
                    focus:border-emerald-500/40 focus:bg-emerald-950/20
                    disabled:opacity-50 transition-all duration-200"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center
                    text-emerald-400 hover:bg-emerald-500/30 hover:border-emerald-500/50
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-all duration-200 flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[9px] text-zinc-600 font-mono text-center mt-2 tracking-wider uppercase">
                POWERED BY GEMINI 3.6 FLASH · TECHNICAL ADVISOR ON SIDDHARTH'S PORTFOLIO
              </p>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </div>
  );
}
