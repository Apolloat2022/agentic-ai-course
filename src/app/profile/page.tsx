'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '../../hooks/useProgress';

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            redirect('/sign-in');
        }
    }, [isLoaded, isSignedIn]);

    const { progress, getModuleScore } = useProgress();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isLoaded || !mounted) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }
    
    if (!isSignedIn) return null;

    // Calculate Stats
    const completedCount = progress.completedModules.length;
    const scores = progress.completedModules.map(id => getModuleScore(id)).filter(s => s > 0);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const promptsTested = progress.sandboxHistory ? progress.sandboxHistory.length : 0;

    // Determine Rank
    let rank = "Novice";
    if (completedCount >= 3) rank = "Apprentice";
    if (completedCount >= 5) rank = "Practitioner";
    if (completedCount >= 8) rank = "Agent Orchestrator";

    const userInitials = user?.firstName
        ? user.firstName.substring(0, 2).toUpperCase()
        : "US";

    return (
        <div className="min-h-screen pt-32 px-8 bg-[url('/grid.svg')] bg-fixed bg-center text-white">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="text-gray-400 hover:text-white mb-8 inline-block transition-colors">
                    ← Back to Dashboard
                </Link>

                <div className="bg-[#131b4d]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg shadow-cyan-500/20 border-4 border-[#0a0e27]">
                            {userInitials}
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold mb-2">{user?.fullName || "Student"}</h1>
                            <p className="text-gray-400 mb-4">{user?.primaryEmailAddress?.emailAddress}</p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                                <span className="text-cyan-400">Rank:</span>
                                <span className="font-bold">{rank}</span>
                            </div>
                        </div>

                        {/* Edit Profile (Mock) */}
                        <button className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium">
                            Edit Profile
                        </button>
                    </div>

                    <hr className="my-10 border-white/10" />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                            <div className="text-3xl font-bold text-cyan-400 mb-1">{completedCount}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Modules</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-1">{avgScore}%</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Score</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                            <div className="text-3xl font-bold text-pink-400 mb-1">{promptsTested}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Prompts Tested</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                            <div className="text-3xl font-bold text-green-400 mb-1">
                                {(avgScore >= 80 && completedCount > 0 ? 1 : 0) + (progress.finalExamScore && progress.finalExamScore >= 70 ? 1 : 0)}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Certificates</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                            <div className="text-3xl font-bold text-orange-400 mb-1">{completedCount * 150 + (promptsTested * 10) + (progress.finalExamScore ? progress.finalExamScore * 5 : 0)}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">XP</div>
                        </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className="mt-12">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span>🏆</span> Achievement Badges
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 w-32 ${completedCount > 0 ? 'bg-cyan-500/10 border-cyan-500/50 grayscale-0' : 'bg-white/5 border-white/10 grayscale opacity-40'}`}>
                                <span className="text-3xl">🚀</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Pioneer</span>
                            </div>
                            <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 w-32 ${promptsTested >= 5 ? 'bg-pink-500/10 border-pink-500/50 grayscale-0' : 'bg-white/5 border-white/10 grayscale opacity-40'}`}>
                                <span className="text-3xl">🧪</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Researcher</span>
                            </div>
                            <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 w-32 ${completedCount >= 5 ? 'bg-purple-500/10 border-purple-500/50 grayscale-0' : 'bg-white/5 border-white/10 grayscale opacity-40'}`}>
                                <span className="text-3xl">🧠</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Strategist</span>
                            </div>
                            <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 w-32 ${avgScore >= 95 ? 'bg-yellow-500/10 border-yellow-500/50 grayscale-0' : 'bg-white/5 border-white/10 grayscale opacity-40'}`}>
                                <span className="text-3xl">✨</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Perfectionist</span>
                            </div>
                            <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 w-32 ${progress.finalExamScore && progress.finalExamScore >= 70 ? 'bg-indigo-500/10 border-indigo-500/50 grayscale-0' : 'bg-white/5 border-white/10 grayscale opacity-40'}`}>
                                <span className="text-3xl">🎓</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Professional</span>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Gallery */}
                    <div className="mt-12">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span>📜</span> Certificate Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Level 1 Certificate */}
                            {avgScore >= 80 && completedCount > 0 && (
                                <Link
                                    href={`/certificate?course=Level 1 Fundamentals&id=AP-${userInitials}-L1`}
                                    className="p-6 rounded-xl bg-gradient-to-br from-[#1c245d] to-[#131b4d] border border-cyan-500/30 hover:border-cyan-500 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-cyan-400 font-bold text-sm tracking-tighter">CERTIFIED</span>
                                        <span className="text-2xl">🎓</span>
                                    </div>
                                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Agentic AI Fundamentals</h3>
                                    <p className="text-xs text-gray-500 mt-2">Level 1 Achievement</p>
                                </Link>
                            )}

                            {/* Professional Certificate */}
                            {progress.finalExamScore && progress.finalExamScore >= 70 && (
                                <Link
                                    href={`/certificate?course=Professional Certification&id=PROF-${userInitials}`}
                                    className="p-6 rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-indigo-500/30 hover:border-indigo-500 transition-all group shadow-lg shadow-indigo-500/10"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-indigo-400 font-bold text-sm tracking-tighter">PROFESSIONAL</span>
                                        <span className="text-2xl">🏆</span>
                                    </div>
                                    <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">Agentic AI Professional</h3>
                                    <p className="text-xs text-gray-400 mt-2">Score: {progress.finalExamScore}%</p>
                                </Link>
                            )}

                            {!(avgScore >= 80 && completedCount > 0) && !progress.finalExamScore && (
                                <div className="col-span-full p-8 border border-dashed border-white/10 rounded-xl text-center">
                                    <p className="text-gray-500 italic text-sm">No certificates earned yet. Complete your journey to unlock them.</p>
                                    <Link href="/dashboard" className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-4 inline-block hover:underline">Return to Dashboard →</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="my-10 border-white/10" />

                    {/* Recent Activity */}
                    <div className="">
                        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                        {progress.completedModules.length > 0 ? (
                            <div className="space-y-4">
                                {progress.completedModules.slice().reverse().slice(0, 3).map(id => (
                                    <div key={id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm">✓</div>
                                            <div>
                                                <div className="font-medium">Module {id} Completed</div>
                                                <div className="text-xs text-gray-500">Score: {getModuleScore(id)}%</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-sm">No activity yet. Your journey begins here!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
