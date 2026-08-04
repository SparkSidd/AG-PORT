"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SecureMessageGateway } from "@/components/ui/secure-message-gateway";
import { cn } from "@/lib/utils";

export const ContactSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex justify-center items-center pointer-events-auto">
            {/* Always visible main trigger button */}
            <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer group relative flex flex-col items-center justify-center py-2"
            >
                <h2
                    className={cn(
                        "text-3xl sm:text-5xl md:text-6xl font-bold text-white transition-all duration-500 glitch tracking-tight",
                        "group-hover:text-emerald-400 group-hover:scale-105 group-hover:tracking-wider",
                        "group-active:scale-95"
                    )}
                    data-text="Let's Connect"
                >
                    Let's Connect
                </h2>
                <p className="mt-2 text-xs md:text-sm text-zinc-400 opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Click to Initialize Secure Channel
                </p>
            </div>

            {/* Modal popup when opened */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="w-full max-w-2xl px-2 animate-in fade-in zoom-in duration-300 relative cursor-default max-h-[85vh] overflow-y-auto"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer z-20"
                            aria-label="Close Secure Channel"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <SecureMessageGateway />
                    </div>
                </div>
            )}
        </div>
    );
};
