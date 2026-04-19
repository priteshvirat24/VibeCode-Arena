import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ChallengeClient from './ChallengeClient';

export default async function ChallengeArenaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const challenge = await prisma.challenge.findUnique({
    where: { id }
  });

  if (!challenge) {
    notFound();
  }

  return <ChallengeClient challenge={challenge} />;
}
