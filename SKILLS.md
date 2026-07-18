# Skills — agentic-ai-course (PromptCraft Pro / prompt-engineering-courses)

## Tech Stack
- Runtime/Framework: Next.js 15 (App Router)
- Language: TypeScript
- Key libraries: `framer-motion`, `@react-spring/web`, `react-intersection-observer` (cinematic scroll/animation UI per README's "Glassmorphism / Deep Space aesthetics")
- Database/ORM: Prisma (`@prisma/client` + `prisma`), schema in `prisma/schema.prisma`. Schema's `datasource` is declared `provider = "postgresql"` (reading `POSTGRES_PRISMA_URL` / `POSTGRES_URL_NON_POOLING`), but a local `dev.db` SQLite file also sits in the repo root — confirm which is actually active in the current `.env`/`.env.local` before assuming Postgres is live; the SQLite file may be stale leftover from earlier local dev.
- Auth: **Clerk** (`@clerk/nextjs`) — despite the README claiming "Auth: NextAuth.js (Client-side integration)". Verified by grepping `src/`: every auth touchpoint (`middleware.ts` uses `clerkMiddleware`, `layout.tsx` uses `ClerkProvider`, pages use `useUser`/`auth`/`currentUser` from `@clerk/nextjs`) is Clerk, not NextAuth. **The README is out of date — trust the code, not the README, for auth.**
- Deployment target: Vercel (`vercel.json` present)

An educational platform teaching prompt engineering and agentic workflows, with a gamified profile system (XP/rank), a "Buildfolio" certificate generator, and an AI-sandbox for scoring prompts.

## Common Workflows
- Install: `npm install` (triggers `postinstall` → `prisma generate` automatically)
- Dev server: `npm run dev`
- Build: `npm run build` → runs `prisma db push && next build` (schema is pushed to the DB on every build — be careful which DB URL is active when building locally vs. in CI/Vercel)
- Lint: `npm run lint`
- Deploy: Vercel

## Relevant Claude Code Skills (already available)
- `prisma-drizzle-db` — this workspace's DB skill explicitly covers agentic-ai-course for Prisma schema/push work
- `vercel-app-deploy` — deploys via Vercel
- `security-review` — Clerk auth + an `admin/users` page (`src/app/admin/users/page.tsx`) implies role-gated admin functionality — review access control before shipping changes there
- `code-review` — worth a pass specifically to reconcile/update the README's stale "NextAuth.js" claim once auth code is touched again

## Skills We'd Need to Create
- A "README vs. code drift" check: this project is a concrete example where the README (auth = NextAuth.js) contradicts the actual implementation (Clerk everywhere). A lightweight skill that greps key claims in README/ARCHITECTURE docs against actual imports/dependencies before trusting them would have caught this immediately, and would help across the wider portfolio (several other projects here have similarly generic/stale `create-next-app` boilerplate READMEs).
- A "which DB is live" check: same Postgres-vs-SQLite ambiguity pattern seen in other projects in this workspace (`Moksha-circle`, `Prosper-node`) — a skill to inspect the actual resolved `DATABASE_URL`/`POSTGRES_PRISMA_URL` env var at runtime and confirm it matches `prisma/schema.prisma`'s declared provider would prevent confusion.
- A certificate-generation regression check: the "Buildfolio" dynamic certificate feature (mentioned in README) is the kind of visually-verified feature (`run`/`verify` alone won't catch rendering regressions) — a dedicated visual snapshot skill would help if this feature grows.

## Notes
- Do not trust this project's `README.md` for auth details — it says NextAuth.js; the actual codebase uses Clerk exclusively. This is flagged prominently here so a future session doesn't propagate the stale claim.
- Root `dev.db` (SQLite, 64KB) and `Blog.pdf` (458KB, unclear purpose — possibly course content source material) are present at the repo root; left untouched.
