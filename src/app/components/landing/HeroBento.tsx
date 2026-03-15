"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { TerminalPreview } from "./TerminalPreview";

export const HeroBento = () => {
    return (
        <section className="relative z-10 pt-20 pb-32 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:min-h-[600px]">

                {/* 1. Main Headline Block (Large - Spans 8 cols) */}
                <GlassCard className="col-span-1 md:col-span-8 p-10 flex flex-col justify-center min-h-[400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                                Version 2.0 Live
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-6">
                            Master the Art of <br />
                            <span className="bg-gradient-to-br from-white via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                                Agentic AI
                            </span>
                        </h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-10">
                            The comprehensive curriculum for developers, product managers, and decision makers. Learn to build autonomous AI agents and multi-agent systems.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/dashboard"
                                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                            >
                                Start Learning Now
                            </a>
                            <a
                                href="#courses"
                                className="px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
                            >
                                Browse Courses
                            </a>
                        </div>
                    </motion.div>
                </GlassCard>

                {/* 2. Interactive Terminal (Side - Spans 4 cols on rows 1 & 2) */}
                <GlassCard className="col-span-1 md:col-span-4 p-6 flex flex-col items-center justify-center bg-black/20" delay={0.2}>
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-2 animate-bounce">⚡</div>
                        <h3 className="text-xl font-bold text-white">Live Sandbox</h3>
                        <p className="text-sm text-gray-400">Test your prompts in real-time</p>
                    </div>
                    <TerminalPreview />
                    <a href="/sandbox" className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                        Open Full Prompt Sandbox &rarr;
                    </a>
                </GlassCard>

                {/* 3. Stats Bar (Bottom - Spans 12 cols) */}
                <GlassCard className="col-span-1 md:col-span-12 p-8 flex flex-wrap items-center justify-around bg-gradient-to-r from-white/[0.05] to-transparent" delay={0.4}>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">500+</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">Active Students</div>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">User Rating</div>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">100%</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">Completion Rate</div>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0e27] bg-gray-600 flex items-center justify-center text-xs font-bold">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-400 ml-2">
                            Join the community
                        </div>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
};
