'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { level1Curriculum } from '../../../../../data/curriculum';
import { useProgress } from '../../../../../hooks/useProgress';

export default function ModulePlayer({ params }: { params: Promise<{ moduleId: string }> }) {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
    const resolvedParams = React.use(params);
    const activeModuleId = resolvedParams.moduleId || "1.1";
    const { saveProgress, isModuleCompleted, getModuleScore } = useProgress();

    // Derived State
    const activeModule = level1Curriculum.weeks
        .flatMap(w => w.modules)
        .find(m => m.id === activeModuleId) || level1Curriculum.weeks[0].modules[0];

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
        if (!isAuthenticated) {
            alert("Please login to take the assessment.");
            return;
        }
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
    const allModules = level1Curriculum.weeks.flatMap(w => w.modules);
    const currentIndex = allModules.findIndex(m => m.id === activeModuleId);
    const nextModule = allModules[currentIndex + 1];

    const handleRetake = () => {
        startQuiz();
    };

    const handleContinue = () => {
        if (!isAuthenticated) return;
        if (!isPassed) {
            alert("You need 80% to proceed!");
            return;
        }

        if (nextModule) {
            router.push(`/courses/level-1/modules/${nextModule.id}`);
        } else {
            // Redirect to certificate page with Specific Module Title
            const uniqueId = "AP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
            router.push(`/certificate?course=${encodeURIComponent(activeModule.title)}&id=${uniqueId}`);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-[#0a0e27] text-white flex items-center justify-center">Loading Course Environment...</div>;
    }

    return (
        <div className="flex h-screen bg-[#0a0e27] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-80 bg-[#0f1535] border-r border-white/5 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/5">
                    <Link href="/courses/level-1" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-4">
                        ← Back to Overview
                    </Link>
                    <h2 className="font-bold text-lg text-cyan-400">{level1Curriculum.title}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {level1Curriculum.weeks.map(week => (
                        <div key={week.id}>
                            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-2">{week.title}</h3>
                            <div className="space-y-1">
                                {week.modules.map(module => {
                                    const isModComplete = isModuleCompleted(module.id);
                                    return (
                                        <Link
                                            key={module.id}
                                            href={`/courses/level-1/modules/${module.id}`}
                                            onClick={() => { setShowQuiz(false); setQuizFinished(false); }}
                                            className={`flex items-center justify-between p-3 rounded-lg text-sm transition-all ${activeModuleId === module.id
                                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
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
                {/* Top Bar */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0e27]/95 backdrop-blur z-20">
                    <h1 className="text-xl font-bold truncate">{activeModule.title}</h1>
                    <div className="flex items-center gap-4">
                        {/* Guest Call Action */}
                        {!isAuthenticated && (
                            <button onClick={() => router.push('/sign-in')} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all">
                                Login to Track Progress
                            </button>
                        )}

                        {/* Authenticated Actions */}
                        {isAuthenticated && activeModule.quiz && !passed && !showQuiz && !isPassed && (
                            <button onClick={startQuiz} className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-sm font-medium hover:bg-orange-500/20 transition-colors">
                                Take Quiz
                            </button>
                        )}
                        {isAuthenticated && isPassed && (
                            <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                                <span>✓ Passed ({percentage}%)</span>
                            </div>
                        )}
                        {isAuthenticated && (
                            <button
                                onClick={() => isPassed ? handleContinue() : alert("Please pass the quiz with 80% to complete.")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg ${isPassed
                                    ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20'
                                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {nextModule ? "Next Lesson" : "Get Certificate"}
                            </button>
                        )}
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">

                        {/* Video Player Section */}
                        {!showQuiz && !quizFinished && (
                            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-8 relative group">
                                {/* Access Control Overlay */}
                                {!isAuthenticated ? (
                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 text-2xl">🔒</div>
                                        <h3 className="text-xl font-bold text-white mb-2">Member Content Locked</h3>
                                        <p className="text-gray-400 mb-6 max-w-sm">
                                            Join Apollo Technologies US to watch this lesson, take the quiz, and earn your verified certificate.
                                        </p>
                                        <button onClick={() => router.push('/sign-in')} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all transform hover:scale-105">
                                            Unlock Full Access
                                        </button>
                                    </div>
                                ) : (
                                    /* Authenticated Video Player */
                                    activeModule.videoUrl ? (
                                        <iframe
                                            src={activeModule.videoUrl}
                                            className="w-full h-full"
                                            title={activeModule.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                            <p>Video loading...</p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Quiz Interface */}
                        {showQuiz && !quizFinished && activeModule.quiz && (
                            <div className="max-w-2xl mx-auto my-12 p-8 bg-gradient-to-br from-[#131b4d] to-[#0a0e27] border border-white/10 rounded-2xl shadow-2xl">
                                <div className="flex justify-between items-center mb-8 text-sm text-gray-400">
                                    <span>Question {currentQuestionIndex + 1} of {activeModule.quiz.length}</span>
                                    <span>Target: 80%</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
                                    {activeModule.quiz[currentQuestionIndex].text}
                                </h3>

                                <div className="space-y-3">
                                    {activeModule.quiz[currentQuestionIndex].options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-cyan-500/20 text-sm font-bold text-gray-400 group-hover:text-cyan-400">
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="text-gray-300 group-hover:text-white">{opt}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quiz Results */}
                        {quizFinished && (
                            <div className="max-w-md mx-auto my-12 text-center p-8 bg-[#131b4d] rounded-2xl border border-white/10 animate-in zoom-in-95">
                                <div className="text-6xl mb-4">{isPassed ? '🎉' : '❌'}</div>
                                <h2 className="text-2xl font-bold text-white mb-2">{isPassed ? 'Assessment Passed!' : 'Assessment Failed'}</h2>
                                <p className="text-4xl font-black text-cyan-400 mb-6">{percentage}%</p>
                                <p className="text-gray-400 mb-8">
                                    {isPassed ? "You have demonstrated mastery of this module." : "You need 80% to proceed. Please review the material and try again."}
                                </p>

                                <div className="flex gap-4 justify-center">
                                    {!isPassed && (
                                        <button onClick={handleRetake} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
                                            Retake Quiz
                                        </button>
                                    )}
                                    {isPassed && (
                                        <button onClick={handleContinue} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all">
                                            {nextModule ? "Next Lesson" : "Get Certificate"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Lesson Text - Visible to All, Enhanced with Data */}
                        {!showQuiz && !quizFinished && (
                            <div className="prose prose-invert max-w-none mt-12 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-4">Lesson Overview</h2>
                                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                                    {activeModule.description || "In this module, we explore the core concepts required for effective interaction with Large Language Models."}
                                </p>

                                {activeModule.useCases && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                                            🚀 Professional Use Cases
                                        </h3>
                                        <ul className="space-y-3">
                                            {activeModule.useCases.map((useCase, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5"></div>
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
