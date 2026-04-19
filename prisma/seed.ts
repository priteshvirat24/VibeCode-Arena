/**
 * Minimal seed script to populate demo data for VibeCode Arena
 * Run: pnpm ts-node prisma/seed.ts  (or `npm run seed` with script)
 */
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding demo data...');

  const u1 = await prisma.user.upsert({
    where: { email: 'ava@demo.com' },
    update: {},
    create: { email: 'ava@demo.com', name: 'Ava', xp: 1280, streak: 12, rank: 'Gold' }
  });

  const u2 = await prisma.user.upsert({
    where: { email: 'kai@demo.com' },
    update: {},
    create: { email: 'kai@demo.com', name: 'Kai', xp: 1120, streak: 4, rank: 'Silver' }
  });

  const c1Text = 'Prompt Battle: Summarize & Optimize';
  let c1 = await prisma.challenge.findFirst({ where: { title: c1Text } });
  if (!c1) {
    c1 = await prisma.challenge.create({ data: { title: c1Text, description: 'Improve prompt clarity and conciseness.', category: 'Prompt Battles', difficulty: 'Medium', estimateMin: 15 } });
  }

  const c2Text = 'Build From Idea: Habit Tracker';
  let c2 = await prisma.challenge.findFirst({ where: { title: c2Text } });
  if (!c2) {
    c2 = await prisma.challenge.create({ data: { title: c2Text, description: 'Design and prototype a habit tracking tool.', category: 'Build From Idea', difficulty: 'Hard', estimateMin: 45 } });
  }

  await prisma.submission.create({
    data: {
      userId: u1.id,
      challengeId: c1.id,
      promptText: 'Summarize the article in 3 bullet points',
      code: '// generated output placeholder',
      notes: 'Tuned with few-shot examples.'
    }
  });

  await prisma.submission.create({
    data: {
      userId: u2.id,
      challengeId: c2.id,
      promptText: 'Create a Next.js app with Tailwind for a habit tracker...',
      code: 'export default function App() { ... }',
      notes: 'Used v0 to scaffold the UI quickly.'
    }
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
