import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, ExternalLink, ShieldCheck } from "lucide-react";

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: "resume" | "cv";
}

export function ResumePreviewModal({ isOpen, onClose, initialDoc = "resume" }: ResumePreviewModalProps) {
  const [activeDoc, setActiveDoc] = useState<"resume" | "cv">(initialDoc);

  useEffect(() => {
    setActiveDoc(initialDoc);
  }, [initialDoc, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentFile = activeDoc === "resume" ? "/sid resume.pdf" : "/sid CV.pdf";
  const currentTitle = activeDoc === "resume" ? "Siddharth Kumar — Resume" : "Siddharth Kumar — Extended CV";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl h-[90vh] bg-zinc-950 border border-emerald-500/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/60 backdrop-blur-lg shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Document
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
                <button
                  onClick={() => setActiveDoc("resume")}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                    activeDoc === "resume"
                      ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Resume
                </button>
                <button
                  onClick={() => setActiveDoc("cv")}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                    activeDoc === "cv"
                      ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Academic CV
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={currentFile}
                download
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                Download
              </a>
              <a
                href={currentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Document Display Canvas */}
          <div className="flex-1 w-full h-full bg-zinc-900 relative overflow-hidden">
            <iframe
              key={currentFile}
              src={`${currentFile}#toolbar=1&navpanes=0`}
              title={currentTitle}
              className="w-full h-full border-0"
            />
            {/* Fallback overlay for mobile devices if iframe is blocked */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none sm:hidden">
              <a
                href={currentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto px-4 py-2 bg-emerald-500 text-black font-mono font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Open PDF Directly
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
