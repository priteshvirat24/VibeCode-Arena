/**
 * Minimal seed script to populate demo data for VibeCode Arena
 * Run: pnpm ts-node prisma/seed.ts  (or `npm run seed` with script)
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  const c1 = await prisma.challenge.upsert({
    where: { title: 'Prompt Battle: Summarize & Optimize' },
    update: {},
    create: { title: 'Prompt Battle: Summarize & Optimize', description: 'Improve prompt clarity and conciseness.', category: 'Prompt Battles', difficulty: 'Medium', estimateMin: 15 }
  });

  await prisma.submission.create({
    data: {
      userId: u1.id,
      challengeId: c1.id,
      promptText: 'Summarize the article in 3 bullet points',
      code: '// generated output placeholder',
      notes: 'Tuned with few-shot examples.'
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
