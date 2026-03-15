'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import { finalExamQuestions, FinalExamQuestion } from '../../../data/final-exam';
import { useProgress } from '../../../hooks/useProgress';
import { GlassCard } from '../../components/landing/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS_PER_PAGE = 10;

export default function FinalExamPage() {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            redirect('/sign-in');
        }
    }, [isLoaded, isSignedIn]);

    const { saveFinalExamScore } = useProgress();

    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [examResult, setExamResult] = useState<{ score: number; passed: boolean } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalPages = Math.ceil(finalExamQuestions.length / QUESTIONS_PER_PAGE);
    const currentQuestions = finalExamQuestions.slice(
        currentPage * QUESTIONS_PER_PAGE,
        (currentPage + 1) * QUESTIONS_PER_PAGE
    );

    const handleAnswer = (questionId: number, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const calculateScore = () => {
        let correctCount = 0;
        finalExamQuestions.forEach(q => {
            if (answers[q.id] === q.correct) {
                correctCount++;
            }
        });
        return Math.round((correctCount / finalExamQuestions.length) * 100);
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < finalExamQuestions.length) {
            if (!confirm(`You have only answered ${Object.keys(answers).length} out of ${finalExamQuestions.length} questions. Are you sure you want to submit?`)) {
                return;
            }
        }

        setIsSubmitting(true);
        const score = calculateScore();
        const passed = score >= 70;

        await saveFinalExamScore(score);
        setExamResult({ score, passed });
        setIsSubmitting(false);
    };

    if (!isLoaded || !mounted) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    if (!isSignedIn) return null;

    if (examResult) {
        return (
            <div className="min-h-screen pt-32 px-8 flex items-center justify-center bg-[url('/grid.svg')] bg-fixed">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full"
                >
                    <GlassCard className="p-12 text-center">
                        <div className="mb-8">
                            <span className="text-6xl">{examResult.passed ? "🏆" : "📉"}</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">
                            {examResult.passed ? "Congratulations!" : "Keep Practicing!"}
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            You scored <span className={`font-bold ${examResult.passed ? 'text-green-400' : 'text-red-400'}`}>{examResult.score}%</span> on the Professional Certification Exam.
                        </p>

                        {examResult.passed ? (
                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    You have officially earned the **Agentic AI Professional Certification**.
                                    Your digital certificate is now available.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => router.push(`/certificate?course=Professional Certification&id=PROF-${user?.firstName?.toUpperCase()}`)}
                                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                                    >
                                        View Certificate
                                    </button>
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                                    >
                                        My Dashboard
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    A score of 70% is required to pass. Don't worry, you can retake the exam at any time after reviewing the course materials.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => {
                                            setExamResult(null);
                                            setCurrentPage(0);
                                            setAnswers({});
                                        }}
                                        className="px-8 py-4 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all"
                                    >
                                        Retry Exam
                                    </button>
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                                    >
                                        Return Home
                                    </button>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    const progressPercent = Math.round((Object.keys(answers).length / finalExamQuestions.length) * 100);

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-[url('/grid.svg')] bg-fixed">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Professional Certification</h1>
                        <p className="text-gray-400">100 Multiple-Choice Questions • 70% Pass Mark Required</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[200px]">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
                            <span>Exam Progress</span>
                            <span>{progressPercent}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-cyan-500 h-full transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Questions Grid */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {currentQuestions.map((q) => (
                                <GlassCard key={q.id} className="p-8">
                                    <div className="flex gap-4">
                                        <span className="text-cyan-500 font-bold font-mono">#{q.id}</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-medium mb-6">{q.question}</h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                {q.options.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleAnswer(q.id, idx)}
                                                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${answers[q.id] === idx
                                                                ? 'bg-cyan-500/20 border-cyan-500 text-white'
                                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${answers[q.id] === idx ? 'bg-cyan-500 border-cyan-500' : 'border-gray-600'
                                                            }`}>
                                                            {String.fromCharCode(65 + idx)}
                                                        </div>
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination & Controls */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4">
                        <button
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all font-bold"
                        >
                            Previous Page
                        </button>
                        <span className="text-gray-500 font-mono">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all font-bold"
                        >
                            Next Page
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {currentPage === totalPages - 1 && (
                            <button
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className="px-10 py-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all animate-pulse hover:animate-none"
                            >
                                {isSubmitting ? "Processing..." : "Submit Final Exam"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
