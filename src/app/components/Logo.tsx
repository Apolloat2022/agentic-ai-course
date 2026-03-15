"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginModal } from "./AdminLoginModal";

export const Logo = () => {
    const [clickCount, setClickCount] = useState(0);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Clear existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount === 3) {
            // Trigger secret
            setClickCount(0);
            setShowAdminModal(true);
            console.log("Secret Admin Door Opened!");
        } else {
            // Reset count and navigate if not reached 3
            timerRef.current = setTimeout(() => {
                setClickCount(0);
                // Only navigate if we haven't reached the secret count
                if (newCount < 3) {
                    console.log("Navigating to home...");
                    router.push("/");
                }
            }, 500); // 500ms delay to catch rapid clicks
        }
    };

    return (
        <>
            <a
                href="/"
                className="flex items-center gap-6 group cursor-pointer"
                onClick={handleLogoClick}
            >
                <div className="relative h-28 w-28 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <img
                        src="/logo.png"
                        alt="Apollo Technologies"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm tracking-[0.2em] text-gray-500 font-medium uppercase">
                        Apollo Technologies
                    </span>
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                        Agentic AI
                    </span>
                </div>
            </a>

            <AdminLoginModal
                isOpen={showAdminModal}
                onClose={() => setShowAdminModal(false)}
            />
        </>
    );
};
