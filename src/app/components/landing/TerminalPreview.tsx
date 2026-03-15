"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TerminalPreview = () => {
    const text = '$ PROMPT: "Design a multi-agent system for autonomous customer support"';
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, index));
            index++;
            if (index > text.length) {
                clearInterval(interval);
            }
        }, 50); // Typing speed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-[#0a0e17] rounded-lg border border-white/10 overflow-hidden font-mono text-xs md:text-sm shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#12182b] p-3 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-auto text-gray-500">bash</div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-32 text-green-400">
                <span>$ </span>
                <span>{displayedText}</span>
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle"
                />
            </div>
        </div>
    );
};
