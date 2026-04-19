# VibeCode Arena

VibeCode Arena is a production-ready starter for an AI-focused learning platform: challenges, streaks, leaderboard, and a gamified dashboard.

Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma (SQLite for local dev)
- Supabase (Auth + DB + Storage) - integration placeholders
- Stripe (payments) - integration placeholders

Quickstart (local)

1. Install dependencies

```bash
npm install
# or pnpm install
```

2. Copy env

```bash
cp .env.example .env.local
# edit .env.local and configure DATABASE_URL, SUPABASE, STRIPE keys
```

3. Generate Prisma client and migrate

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

4. Run dev

```bash
npm run dev
```

What I added
- Basic app scaffold with a dark theme
- Landing page, header, footer, button and leaderboard preview
- Prisma schema + seed script
- Tailwind and global styles

Next steps (recommended)
- Install and configure Supabase client and auth flows
- Add Stripe integration for the Pro plan
- Implement challenge arena pages, challenge editor and admin panel
- Implement AI judge server actions and scoring

This repo is a starting point. I'll continue adding pages, server actions, and Supabase wiring next if you'd like.
