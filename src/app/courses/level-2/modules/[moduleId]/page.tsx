'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { level2Curriculum } from '../../../../../data/curriculum';
import { useProgress } from '../../../../../hooks/useProgress';

export default function ModulePlayerL2({ params }: { params: Promise<{ moduleId: string }> }) {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
    const resolvedParams = React.use(params);
    const activeModuleId = resolvedParams.moduleId;
    const { saveProgress, isModuleCompleted, getModuleScore } = useProgress();

    // Derived State
    const activeModule = level2Curriculum.weeks
        .flatMap(w => w.modules)
        .find(m => m.id === activeModuleId) || level2Curriculum.weeks[0].modules[0];

    // Quiz State
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [passed, setPassed] = useState(false);

    // Authentication Derived State
    const isAuthenticated = isLoaded && isSignedIn;
    const isLoading = !isLoaded;

    // Progress
    const isCompleted = isModuleCompleted(activeModuleId) || passed;
    const bestScore = getModuleScore(activeModuleId);

    // Handlers
    const startQuiz = () => {
        if (!isAuthenticated) return;
        setShowQuiz(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
        setPassed(false);
    };

    const handleAnswer = (optionIndex: number) => {
        let currentScore = score;
        if (activeModule.quiz && optionIndex === activeModule.quiz[currentQuestionIndex].correct) {
            currentScore = score + 1;
            setScore(currentScore);
        }

        if (activeModule.quiz && currentQuestionIndex < activeModule.quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            finishQuiz(currentScore);
        }
    };

    const finishQuiz = (finalScore: number) => {
        const total = activeModule.quiz?.length || 1;
        const percent = Math.round((finalScore / total) * 100);

        setQuizFinished(true);
        if (percent >= 80) {
            setPassed(true);
            saveProgress(activeModuleId, percent);
        }
    };

    const percentage = quizFinished ? Math.round((score / (activeModule.quiz?.length || 1)) * 100) : bestScore;
    const isPassed = percentage >= 80 || isCompleted;

    // Navigation Logic
    const allModules = level2Curriculum.weeks.flatMap(w => w.modules);
    const currentIndex = allModules.findIndex(m => m.id === activeModuleId);
    const nextModule = allModules[currentIndex + 1];

    const handleContinue = () => {
        if (nextModule) {
            // Go to next module
            router.push(`/courses/level-2/modules/${nextModule.id}`);
        } else {
            // Course Finished - Go to Certificate
            const uniqueId = "AG-" + Math.random().toString(36).substr(2, 9).toUpperCase();
            router.push(`/certificate?course=${encodeURIComponent(activeModule.title)}&id=${uniqueId}`);
        }
    };

    if (isLoading) return <div className="min-h-screen bg-[#0a0e27] text-white flex items-center justify-center">Loading Agent Environment...</div>;

    return (
        <div className="flex h-screen bg-[#0a0e27] text-white overflow-hidden font-sans">
            {/* Sidebar (Purple Theme) */}
            <aside className="w-80 bg-[#0f1025] border-r border-white/5 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/5">
                    <Link href="/courses/level-2" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-4">
                        ← Back to Level 2
                    </Link>
                    <h2 className="font-bold text-lg text-purple-400">{level2Curriculum.title}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {level2Curriculum.weeks.map(week => (
                        <div key={week.id}>
                            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-2">{week.title}</h3>
                            <div className="space-y-1">
                                {week.modules.map(module => {
                                    const isModComplete = isModuleCompleted(module.id);
                                    return (
                                        <Link
                                            key={module.id}
                                            href={`/courses/level-2/modules/${module.id}`}
                                            onClick={() => { setShowQuiz(false); setQuizFinished(false); }}
                                            className={`flex items-center justify-between p-3 rounded-lg text-sm transition-all ${activeModuleId === module.id
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {isModComplete && <span className="text-green-400 font-bold">✓</span>}
                                                <span className={isModComplete ? "text-gray-300" : ""}>{module.title}</span>
                                            </div>
                                            <span className="text-xs opacity-50">{module.duration}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0e27]/95 backdrop-blur z-20">
                    <h1 className="text-xl font-bold truncate">{activeModule.title} <span className="text-purple-500 ml-2 text-sm uppercase tracking-wider border border-purple-500/30 px-2 py-0.5 rounded">Agentic</span></h1>
                    <div className="flex items-center gap-4">
                        {!isAuthenticated && (
                            <button onClick={() => router.push('/sign-in')} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-sm font-bold shadow-lg shadow-purple-500/20">Login to Track</button>
                        )}
                        {isAuthenticated && activeModule.quiz && !passed && !showQuiz && !isPassed && (
                            <button onClick={startQuiz} className="px-4 py-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 text-sm font-medium hover:bg-pink-500/20 transition-colors">
                                Start Simulation
                            </button>
                        )}
                        {isAuthenticated && isPassed && (
                            <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                                <span>✓ Passed ({percentage}%)</span>
                            </div>
                        )}
                        {isAuthenticated && (
                            <button
                                onClick={() => isPassed ? handleContinue() : alert("Simulation failed. Retry to proceed.")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg ${isPassed
                                    ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {nextModule ? "Next Mission" : "View Credentials"}
                            </button>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        {!showQuiz && !quizFinished && (
                            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-purple-500/20 mb-8 relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
                                <iframe
                                    src={activeModule.videoUrl}
                                    className="w-full h-full relative z-0"
                                    title={activeModule.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {showQuiz && !quizFinished && activeModule.quiz && (
                            <div className="max-w-2xl mx-auto my-12 p-8 bg-gradient-to-br from-[#1a1033] to-[#0a0e27] border border-purple-500/20 rounded-2xl shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6">{activeModule.quiz[currentQuestionIndex].text}</h3>
                                <div className="space-y-3">
                                    {activeModule.quiz[currentQuestionIndex].options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 border border-transparent transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-purple-500/20 text-sm font-bold text-gray-400 group-hover:text-purple-400">{String.fromCharCode(65 + idx)}</span>
                                                <span className="text-gray-300 group-hover:text-white">{opt}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {quizFinished && (
                            <div className="max-w-md mx-auto my-12 text-center p-8 bg-[#1a1033] rounded-2xl border border-purple-500/20 animate-in zoom-in-95">
                                <div className="text-6xl mb-4">{isPassed ? '🤖' : '⚠️'}</div>
                                <h2 className="text-2xl font-bold text-white mb-2">{isPassed ? 'Simulation Passed' : 'Loop Failed'}</h2>
                                <p className="text-4xl font-black text-purple-400 mb-6">{percentage}%</p>
                                <div className="flex gap-4 justify-center">
                                    {!isPassed ? (
                                        <button onClick={startQuiz} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold">Restart Loop</button>
                                    ) : (
                                        <button onClick={handleContinue} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold shadow-lg shadow-purple-500/20">
                                            {nextModule ? "Next Mission" : "View Credentials"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {!showQuiz && !quizFinished && (
                            <div className="prose prose-invert max-w-none mt-12 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-4">Module Briefing</h2>
                                <p className="text-gray-300 leading-relaxed text-lg mb-8">{activeModule.description}</p>
                                {activeModule.useCases && (
                                    <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-purple-400 mb-4">Autonomous Capabilities</h3>
                                        <ul className="space-y-3">
                                            {activeModule.useCases.map((useCase, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="text-purple-500 mt-1">⚡</span>
                                                    <span className="text-gray-300">{useCase}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
