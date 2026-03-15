import { prisma } from "../../../lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        
        // Ensure user exists in our DB, since Clerk creates them independently
        const clerkUser = await currentUser();
        const email = clerkUser?.emailAddresses[0]?.emailAddress || null;
        
        const user = await prisma.user.upsert({
            where: { id: userId },
            update: { email: email },
            create: { id: userId, email: email, name: clerkUser?.firstName || "Student" }
        });

        await prisma.courseProgress.upsert({
            where: { userId: user.id },
            update: {
                completedModules: JSON.stringify(body.completedModules),
                quizScores: JSON.stringify(body.quizScores),
                sandboxHistory: JSON.stringify(body.sandboxHistory),
                finalExamScore: body.finalExamScore ? parseInt(body.finalExamScore) : undefined,
            },
            create: {
                userId: user.id,
                completedModules: JSON.stringify(body.completedModules),
                quizScores: JSON.stringify(body.quizScores),
                sandboxHistory: JSON.stringify(body.sandboxHistory),
                finalExamScore: body.finalExamScore ? parseInt(body.finalExamScore) : undefined,
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Progress Sync Error:", error);
        return NextResponse.json({ message: "Sync failed" }, { status: 500 });
    }
}

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { progress: true }
        });

        if (!user || !user.progress) {
            return NextResponse.json({ empty: true });
        }

        return NextResponse.json({
            completedModules: JSON.parse(user.progress.completedModules || "[]"),
            quizScores: JSON.parse(user.progress.quizScores || "{}"),
            sandboxHistory: JSON.parse(user.progress.sandboxHistory || "[]"),
            finalExamScore: user.progress.finalExamScore || undefined,
        });

    } catch (error) {
        console.error("Fetch Progress Error:", error);
        return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
    }
}
