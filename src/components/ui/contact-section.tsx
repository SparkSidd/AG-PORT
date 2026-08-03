"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SecureMessageGateway } from "@/components/ui/secure-message-gateway";
import { cn } from "@/lib/utils";

export const ContactSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex justify-center items-center pointer-events-auto">
            {!isOpen ? (
                <div
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer group relative flex flex-col items-center justify-center py-10"
                >
                    <h2
                        className={cn(
                            "text-3xl sm:text-5xl md:text-7xl font-bold text-white transition-all duration-500 glitch",
                            "group-hover:text-green-400 group-hover:scale-105 group-hover:tracking-wider",
                            "group-active:scale-95"
                        )}
                        data-text="Let's Connect"
                    >
                        Let's Connect
                    </h2>
                    <p className="mt-4 text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Click to Initialize Secure Channel
                    </p>
                </div>
            ) : (
                <div className="w-full max-w-2xl px-4 animate-in fade-in zoom-in duration-500 relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute -top-12 right-4 md:-right-12 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        aria-label="Close Secure Channel"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <SecureMessageGateway />
                </div>
            )}
        </div>
    );
};
