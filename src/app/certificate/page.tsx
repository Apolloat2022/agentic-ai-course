'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Great_Vibes, Dancing_Script, Pinyon_Script } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: ['400'] });

function CertificateContent() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const [date, setDate] = useState('');

    const courseName = searchParams.get('course') || 'Agentic AI Level 1';
    const certificateId = searchParams.get('id') || "AIA-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    useEffect(() => {
        setDate(new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

    const handlePrint = () => window.print();
    const studentName = user?.fullName || "Student";

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 print:p-0 print:bg-white text-black">
            {/* Nav - Hidden on Print */}
            <nav className="w-full max-w-[1000px] mb-6 flex justify-between items-center print:hidden">
                <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors font-medium">← Back to Dashboard</Link>
                <button onClick={handlePrint} className="px-6 py-2 bg-[#1e3a8a] hover:bg-[#152865] text-white font-bold rounded shadow-lg transition-colors flex items-center gap-2">
                    <span>🖨️</span> Download PDF
                </button>
            </nav>

            {/* Certificate Paper */}
            <div className="relative w-full max-w-[1123px] aspect-[1.414/1] bg-white shadow-2xl flex flex-col print:shadow-none print:w-full print:border-none border-[20px] border-white ring-1 ring-gray-200 overflow-hidden">

                {/* Decorative Border Frame */}
                <div className="absolute inset-4 border-2 border-[#1e3a8a] z-20"></div>
                <div className="absolute inset-6 border border-[#ca8a04] z-20"></div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[180px] border-r-[180px] border-t-transparent border-r-[#1e3a8a] z-10"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[130px] border-r-[130px] border-t-transparent border-r-[#ca8a04] z-20"></div>

                <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[180px] border-l-[180px] border-b-transparent border-l-[#1e3a8a] z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[130px] border-l-[130px] border-b-transparent border-l-[#ca8a04] z-20"></div>

                {/* Header - Apollo Logo pushed up */}
                <div className="pt-8 px-20 flex justify-between items-start relative z-30">
                    {/* Logo - 4 times bigger, Apollo Technologies US heading removed */}
                    <div className="w-48 h-48 flex items-center justify-center">
                        <img 
                            src="/logo.png" 
                            alt="Apollo Technologies Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Buildfolio - NOT changed, kept at original position */}
                    <div className="text-right mt-4">
                        <h2 className="text-2xl font-bold tracking-widest text-[#1e3a8a]">APOLLO</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#ca8a04]">Official Certification</p>
                    </div>
                </div>

                {/* Main Content - Pushed up */}
                <div className="flex-1 flex flex-col items-center justify-start text-center px-16 relative z-30 mt-[-35px]">
                    <div className="mb-0">
                        <span className="text-[#ca8a04] text-xs font-bold tracking-[0.4em] uppercase">Certificate of Completion</span>
                    </div>

                    <h1 className="text-[#1e3a8a] text-5xl font-serif font-bold tracking-widest mb-1">CERTIFICATE</h1>

                    <div className="w-24 h-1 bg-[#ca8a04] mb-3"></div>

                    <p className="text-gray-500 text-sm italic font-serif mb-1">This is to certify that</p>

                    <div className={`${pinyon.className} text-6xl text-[#1e3a8a] mb-3 min-h-[1.2em]`}>
                        {studentName}
                    </div>

                    <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-2">
                        Has successfully completed the comprehensive training and assessment for
                    </p>

                    <h2 className="text-xl font-bold text-black border-b-2 border-gray-200 pb-1 mb-3 px-8 min-w-[400px]">
                        {courseName}
                    </h2>

                    <div className="max-w-2xl text-sm text-gray-600 mb-4 leading-relaxed">
                        Demonstrating high proficiency in <span className="font-semibold text-[#1e3a8a]">Autonomous Agent Systems</span>,
                        <span className="font-semibold text-[#1e3a8a]"> ReAct Tool Execution</span>, and
                        <span className="font-semibold text-[#1e3a8a]"> Multi-Agent Orchestration</span>.
                        The recipient has proven their ability to build robust reasoning loops effectively.
                    </div>

                    {/* Skill Badges */}
                    <div className="flex gap-2 flex-wrap justify-center mb-8">
                        {['ReAct Pattern', 'Tool Calling', 'Vector Memory', 'Graph Workflows'].map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer - Original position, seal will be 100% visible now */}
                <div className="px-24 pb-16 flex justify-between items-end relative z-30 w-full mt-[-10px]">
                    {/* Date */}
                    <div className="text-center w-56">
                        <div className="border-b border-gray-400 mb-2 pb-1">
                            <span className="text-lg font-bold text-[#1e3a8a] font-serif">{date}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Date of Issue</p>
                    </div>

                    {/* Seal */}
                    <div className="absolute left-1/2 bottom-14 -translate-x-1/2 opacity-90">
                        <div className="w-24 h-24 rounded-full border-4 border-[#ca8a04] flex items-center justify-center p-1">
                            <div className="w-full h-full border border-[#ca8a04] rounded-full flex items-center justify-center bg-[#fff8e1]">
                                <div className="text-center">
                                    <div className="text-[#ca8a04] text-[8px] tracking-widest font-bold">OFFICIAL</div>
                                    <div className="text-[#1e3a8a] text-xl font-bold font-serif">SEAL</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Signature */}
                    <div className="text-center w-56">
                        <div className="border-b border-gray-400 mb-2 relative h-12 flex items-end justify-center">
                            <div className={`${dancingScript.className} text-3xl text-[#1e3a8a] absolute bottom-2 -rotate-6`}>
                                Robin Pandey
                            </div>
                        </div>
                        <p className="font-serif text-base text-[#1e3a8a] font-bold">Robin Pandey</p>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">CEO, Apollo Tech</p>
                    </div>
                </div>

                {/* Bottom Verification - Moved up slightly to be inside certificate */}
                <div className="absolute bottom-1 left-0 right-0 text-center text-[8px] text-gray-400 z-30 font-mono">
                    ID: {certificateId} &bull; AUTHENTICITY VERIFIED BY APOLLO TECHNOLOGIES &bull; AI STANDARD
                </div>
            </div>
        </div>
    );
}

export default function CertificatePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Certificate...</div>}>
            <CertificateContent />
        </Suspense>
    );
}