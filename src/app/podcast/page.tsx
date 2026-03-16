'use client';

import { useState } from "react";
import { GlassCard } from "../components/landing/GlassCard";
import { InteractiveBackground } from "../components/landing/InteractiveBackground";

interface Episode {
    id: string;
    number: string;
    title: string;
    guest: string;
    duration: string;
    description: string;
}

export default function PodcastPage() {
    const episodes: Episode[] = [
        {
            id: "sPzc6hMg7So",
            number: "EXPERT 06",
            title: "Multi-Agent Orchestration: CrewAI & AutoGen",
            guest: "Apollo Experts",
            duration: "50:00",
            description: "One agent is powerful; a team is unstoppable. We dive into Multi-Agent frameworks like CrewAI and AutoGen. Learn to assign roles and have them collaborate to solve complex, multi-step tasks."
        },
        {
            id: "TRjq7t2Ms5I",
            number: "EXPERT 05",
            title: "Advanced RAG: Beyond Naive Retrieval",
            guest: "Apollo Experts",
            duration: "45:00",
            description: "Explore advanced retrieval techniques: Hybrid Search, Parent-Child Indexing, and Re-ranking to drastically improve retrieval quality for production AI systems."
        },
        {
            id: "NiLb5DK4_rU",
            number: "EXPERT 04",
            title: "Hands-on: Building Custom AI Tools",
            guest: "Apollo Experts",
            duration: "40:00",
            description: "Learn how to build and wire custom tools—like stock fetchers and sentiment analyzers—into LangChain agents for real-world functionality."
        },
        {
            id: "7E-qdsVEoB8",
            number: "EXPERT 03",
            title: "Function Calling Fundamentals",
            guest: "Apollo Experts",
            duration: "35:00",
            description: "Understanding how to give LLMs 'hands'. We master tool schemas and handle model outputs to connect AI to databases and APIs."
        },
        {
            id: "T-D1OfcDW1M",
            number: "EXPERT 02",
            title: "RAG & Vector Databases",
            guest: "Apollo Experts",
            duration: "45:00",
            description: "The bridge between frozen model weights and private data. We explore vector embeddings and retrieval strategies to ground AI outputs."
        },
        {
            id: "KoJAC3hVr5g",
            number: "EXPERT 01",
            title: "The Autonomous Agent Loop",
            guest: "Apollo Experts",
            duration: "40:00",
            description: "Moving from chatbots to agents. We dissect the 'Thought-Action-Observation' loop that enables autonomous problem solving."
        },
        {
            id: "FemFuZZA26M",
            number: "EP. 04",
            title: "Prompt Engineering! Getting Great Answers from AI",
            guest: "Apollo Team",
            duration: "15:20",
            description: "In this session, we dive deep into the art and science of prompt engineering. Learn the specific strategies and techniques to get the most out of large language models."
        },
        {
            id: "sNvuH-iTi4c",
            number: "EP. 03",
            title: "AI Agents in 38 Minutes - Complete Course",
            guest: "Marina Wyss",
            duration: "38:00",
            description: "Complete course from Beginner to Pro covering all the fundamentals you need to know about AI agents."
        },
        {
            id: "OhI005_aJkA",
            number: "EP. 02",
            title: "AI Agents for Beginners (Full Course)",
            guest: "Microsoft Developer",
            duration: "1:00:00",
            description: "Lessons 1-10 covering the complete lifecycle and tools for building AI Agents from scratch."
        },
        {
            id: "ZaPbP9DwBOE",
            number: "EP. 01",
            title: "AI Agent Fundamentals",
            guest: "KodeKloud",
            duration: "24:00",
            description: "Don't learn AI Agents without learning these fundamentals. Explore the shift from static LLMs to autonomous capabilities."
        }
    ];

    const [selectedEpisode, setSelectedEpisode] = useState<Episode>(episodes[0]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <InteractiveBackground />

            <div className="relative z-10 pt-20 pb-32 px-8 max-w-[1400px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Player Section */}
                    <div className="lg:col-span-8">
                        <GlassCard className="p-1 mb-8">
                            <div className="aspect-video bg-black rounded-xl relative overflow-hidden group shadow-2xl">
                                <iframe
                                    className="w-full h-full object-cover"
                                    src={`https://www.youtube.com/embed/${selectedEpisode.id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </GlassCard>

                        <div className="prose prose-invert max-w-none">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                                    {selectedEpisode.number}
                                </span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-400 font-medium">with {selectedEpisode.guest}</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-white">
                                {selectedEpisode.title}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {selectedEpisode.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Playlist */}
                    <div className="lg:col-span-4">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Recent Episodes
                        </h3>

                        <div className="space-y-4">
                            {episodes.map((ep) => (
                                <GlassCard
                                    key={ep.id}
                                    className={`cursor-pointer group transition-all duration-300 ${selectedEpisode.id === ep.id
                                        ? "border-cyan-500/50 bg-cyan-500/5"
                                        : "hover:bg-white/5 border-white/5"
                                        }`}
                                    onClick={() => setSelectedEpisode(ep)}
                                >
                                    <div className="p-4 flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded bg-white/5 flex flex-col items-center justify-center border transition-colors ${selectedEpisode.id === ep.id ? "border-cyan-500/30 text-cyan-400" : "border-white/10 text-gray-500"
                                            } font-mono text-xs`}>
                                            <span className={`font-bold ${selectedEpisode.id === ep.id ? "text-cyan-400" : "text-white"}`}>
                                                {ep.number.split(' ')[1]}
                                            </span>
                                            <span>{ep.number.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className={`font-bold transition-colors line-clamp-1 ${selectedEpisode.id === ep.id ? "text-cyan-400" : "text-white group-hover:text-cyan-400"
                                                }`}>
                                                {ep.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                w/ {ep.guest} • {ep.duration}
                                            </p>
                                        </div>
                                        {selectedEpisode.id === ep.id && (
                                            <div className="ml-auto">
                                                <span className="flex h-3 w-3 relative">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                                                </span>
                                            </div>
                                        )}
                                        {selectedEpisode.id !== ep.id && (
                                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

