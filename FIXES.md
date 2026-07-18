# Build/Fix Plan — agentic-ai-course ("PromptCraft Pro" / package.json name: "prompt-engineering-courses")

Documented 2026-07-18. Nothing built, installed, or run as part of writing this — read-only investigation, plan only, for a later session to execute.

## 1. README claims NextAuth.js; the app exclusively uses Clerk — confirmed doc-mismatch

`README.md:10` states `**Auth**: NextAuth.js (Client-side integration)`. Grepping the entire `src/` tree for `next-auth`/`NextAuth` returns **zero matches** — the package isn't even a dependency (`package.json` has no `next-auth` entry at all, only `"@clerk/nextjs": "^7.0.4"`). Clerk is used pervasively and exclusively:
- `src/middleware.ts:1,11` — `import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"`, wrapping all protected routes (`/dashboard`, `/courses`, `/admin`, `/certificate`, `/certification`) in `clerkMiddleware(...)`.
- `src/app/api/progress/route.ts:2,6,15` — `auth()` and `currentUser()` from `@clerk/nextjs/server`, used to authorize the progress-sync API and to upsert a `User` row keyed on Clerk's `userId`.
- `src/app/sign-in/[[...sign-in]]/page.tsx` and `src/app/sign-up/[[...sign-up]]/page.tsx` — Clerk's catch-all route convention for its prebuilt `<SignIn>`/`<SignUp>` components.
- `useUser`/`ClerkProvider` referenced across 8 files including `layout.tsx`, `dashboard/page.tsx`, `profile/page.tsx`, `certificate/page.tsx`.
- `.env` / `.env.local` both carry `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — no NextAuth env vars (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`) anywhere.

The `prisma/schema.prisma` `Account`/`Session`/`VerificationToken` models (lines 11-56) are the standard NextAuth.js Prisma adapter shape — leftover from an earlier NextAuth-based design that was later swapped for Clerk. They're currently unused: Clerk manages its own sessions externally and the app's own code only ever touches `User` and `CourseProgress` (see `route.ts` above).

**Fix:**
1. Update `README.md:10` to `**Auth**: Clerk (`@clerk/nextjs`, middleware-based route protection)`.
2. Decide whether to keep the unused NextAuth-shaped `Account`/`Session`/`VerificationToken` models in `schema.prisma` — they cost nothing at rest but are misleading. If nothing references them (confirm via grep for `prisma.account`/`prisma.session`/`prisma.verificationToken` — none found in `src/`), remove them and run `prisma db push` to drop the tables, or leave a comment noting they're vestigial from a pre-Clerk NextAuth design.

## 2. Two stale SQLite `dev.db` files, both git-tracked, while the app genuinely runs on Postgres

`prisma/schema.prisma:1-5`'s `datasource db` block is unambiguous: `provider = "postgresql"`, `url = env("POSTGRES_PRISMA_URL")`, `directUrl = env("POSTGRES_URL_NON_POOLING")`. Both `.env` and `.env.local` set `POSTGRES_PRISMA_URL`/`POSTGRES_URL_NON_POOLING` to a real Neon-hosted Postgres connection string (`...neon.tech/neondb...`). Neither env file defines any SQLite-style `DATABASE_URL`. `package.json`'s `build` script is `prisma db push && next build` — `db push` reads the datasource block, so it targets Postgres too. There is no `prisma/migrations/` folder at all, consistent with a `db push`-only workflow (no migration history to have ever pointed at SQLite).

Despite this, **two** `dev.db` files exist and are **both committed to git** (confirmed via `git ls-files`):
- `dev.db` (repo root) — a real, non-empty SQLite database file (`SQLite format 3` header confirmed by reading its first bytes).
- `prisma/dev.db` — a 0-byte empty stub.

Neither is referenced by the current Prisma config. They're orphaned leftovers from an earlier local-SQLite phase of the project (matching the same era as the vestigial NextAuth Prisma models above) and are not read or written by the app as it stands today.

**Separately, and more urgent:** `.env.local` is **also git-tracked** (confirmed via `git ls-files` — only `.env` is excluded via `.gitignore:3`, `.env.local` is not listed). `.env.local` contains the real Neon Postgres connection string (including password) and a Clerk test-mode secret key (`CLERK_SECRET_KEY=sk_test_...`), both committed to version control history. Test-mode Clerk keys are lower severity than live keys, but the Postgres password is a real working credential to a live Neon database.

**Fix:**
1. Delete both `dev.db` and `prisma/dev.db` from the working tree and from git (`git rm dev.db prisma/dev.db`) — confirm first that nothing under `prisma/migrations` or any script references them (nothing found in this pass).
2. Add `dev.db`, `*.db`, and `.env.local` to `.gitignore` (currently only `.env` is listed, `.gitignore:1-4` = `node_modules`, `.next`, `.env`, `/src/generated/prisma`).
3. Rotate the Neon Postgres password and the Clerk secret key that were committed in `.env.local`, since both are recoverable from git history even after the file is removed from the current tree — a `git rm` alone does not scrub history. If history rewriting (`git filter-repo`/BFG) is warranted, that's a decision for the repo owner, not something to do silently in a later session without sign-off.
4. Re-verify after cleanup that `prisma generate`/`prisma db push` still succeed against the real Neon Postgres instance (the `postinstall` script already runs `prisma generate` automatically on `npm install`).

## Suggested order of work

Item 1 (doc fix) is a one-line README change, do it first. Item 2's cleanup (steps 1-2) is mechanical and should happen next; step 3 (credential rotation) is the most important part of item 2 and should not be skipped just because it's inconvenient — committed real database credentials are a live exposure, not a hygiene nit.
