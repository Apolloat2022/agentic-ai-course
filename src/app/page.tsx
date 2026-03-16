import { InteractiveBackground } from './components/landing/InteractiveBackground';
import { HeroBento } from './components/landing/HeroBento';
import { GlassCard } from './components/landing/GlassCard';

export default function HomePage() {
  const courses = [
    {
      level: "Level 1",
      title: "AI Communication Fundamentals",
      description: "Master the core principles of effective prompting, from zero-shot to chain-of-thought strategies.",
      icon: "🚀",
      color: "from-cyan-500 to-blue-600",
      link: "/courses/level-1"
    },
    {
      level: "Level 2",
      title: "Agentic Workflows",
      description: "Build autonomous agents and RAG pipelines. Learn to orchestrate complex AI behaviors.",
      icon: "🤖",
      color: "from-purple-500 to-pink-600",
      link: "/courses/level-2"
    },
    {
      level: "Tool",
      title: "AI Prompt Sandbox",
      description: "Test and score your prompts against our heuristic engine. Get real-time feedback.",
      icon: "🧪",
      color: "from-pink-500 to-rose-600",
      link: "/sandbox"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* 1. Dynamic Background Layer */}
      <InteractiveBackground />

      {/* 2. Hero Section (Bento Layout) */}
      <HeroBento />

      {/* 3. Course Cards Section */}
      <section id="courses" className="relative z-10 py-24 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block">
              Curriculum
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mt-2 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="p-8 h-full flex flex-col">
                  {/* Gradient Overlay */}
                  <div className={`absolute top-0 right-0 p-32 opacity-10 bg-gradient-to-br ${course.color} blur-[60px] rounded-full pointer-events-none`} />

                  <div className="mb-6 flex items-center justify-between relative z-10">
                    <span className="text-4xl">{course.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 tracking-wider text-gray-300`}>
                      {course.level.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                    {course.description}
                  </p>

                  <a
                    href={course.link}
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Start Module</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="relative z-10 py-32 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Ready to Upgrade Your <br />
            <span className="text-cyan-400">Cognitive Toolkit?</span>
          </h2>
          <a
            href="/dashboard"
            className="inline-block px-12 py-5 text-lg font-bold rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Get Started
          </a>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required for Level 1 access.
          </p>
        </div>
      </section>

    </div>
  );
}