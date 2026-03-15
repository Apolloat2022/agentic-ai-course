'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { level2Curriculum } from '../../../data/curriculum';
import { useProgress } from '../../../hooks/useProgress';

export default function Level2Overview() {
    const { user } = useUser();
    const { isModuleCompleted } = useProgress();

    return (
        <div className="min-h-screen bg-[#0a0e27] text-white pt-24 px-8 bg-[url('/grid.svg')] bg-fixed bg-center">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 relative">
                    <Link href="/dashboard" className="text-gray-400 hover:text-white mb-4 inline-block transition-colors">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        {level2Curriculum.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Master the architecture of autonomous agents. Learn to build systems that reason, act, and learn.
                    </p>
                    <div className="absolute top-0 right-0 hidden md:block w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]"></div>
                </div>

                {/* Curriculum Grid */}
                <div className="space-y-12">
                    {level2Curriculum.weeks.map((week) => (
                        <div key={week.id} className="relative">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 text-sm">
                                    {week.id}
                                </span>
                                {week.title}
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {week.modules.map(module => {
                                    const isCompleted = isModuleCompleted(module.id);
                                    return (
                                        <Link
                                            key={module.id}
                                            href={`/courses/level-2/modules/${module.id}`}
                                            className="group relative block"
                                        >
                                            <div className={`
                                                h-full p-6 rounded-2xl border transition-all duration-300
                                                ${isCompleted
                                                    ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40'
                                                    : 'bg-white/5 border-white/10 hover:border-pink-500/30 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10'
                                                }
                                             `}>
                                                {/* Status Icon */}
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'}`}>
                                                        {module.type}
                                                    </span>
                                                    {isCompleted && <span className="text-green-400 text-lg">✓</span>}
                                                </div>

                                                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                                                    {module.title}
                                                </h3>

                                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                                    {module.description}
                                                </p>

                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>⏱ {module.duration}</span>
                                                    <span>•</span>
                                                    <span className={isCompleted ? 'text-green-400' : 'text-pink-400'}>
                                                        {isCompleted ? 'Completed' : 'Start Lesson →'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
