import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Code2, Zap, BrainCircuit, LayoutTemplate, ChevronRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function ChallengesPage() {
  const challenges = await prisma.challenge.findMany();

  // Group by category dynamically
  const categoriesMap = challenges.reduce((acc: any, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {});

  const renderCategoryIcon = (category: string) => {
    if (category.includes('Prompt')) return <Zap className="w-5 h-5 text-indigo-400" />;
    if (category.includes('Build')) return <BrainCircuit className="w-5 h-5 text-purple-400" />;
    if (category.includes('Debug')) return <Code2 className="w-5 h-5 text-blue-400" />;
    return <LayoutTemplate className="w-5 h-5 text-indigo-300" />;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-12 pt-4">
      <div className="space-y-4 border-b border-white/5 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white/90">The Arena</h1>
        <p className="text-white/50 text-lg max-w-2xl font-light">
          Choose your battle. Challenges range from fast prompt-tuning exercises to full architectural builds. Points vary by difficulty and speed.
        </p>
      </div>

      <div className="space-y-16">
        {Object.keys(categoriesMap).map((categoryName) => (
          <section key={categoryName} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                {renderCategoryIcon(categoryName)}
              </div>
              <div>
                <h2 className="text-xl font-medium tracking-tight text-white/90">{categoryName}</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoriesMap[categoryName].map((c: any) => (
                <Card key={c.id} className="bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group flex flex-col shadow-none relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary" className={
                        c.difficulty === 'Easy' ? 'bg-white/5 border-white/10 text-white/70 font-medium hover:bg-white/10' :
                        c.difficulty === 'Medium' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300 font-medium hover:bg-indigo-500/20' :
                        'bg-purple-500/10 border-purple-500/20 text-purple-300 font-medium hover:bg-purple-500/20'
                      }>
                        {c.difficulty}
                      </Badge>
                      <span className="text-[11px] font-medium text-white/40 flex items-center gap-1 uppercase tracking-wider">
                        <Zap className="w-3 h-3 text-indigo-400" /> {c.estimateMin * 10} XP
                      </span>
                    </div>
                    <CardTitle className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{c.title}</CardTitle>
                    <CardDescription className="text-white/40 text-[13px]">{c.estimateMin}m estimated</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-6 border-t border-white/[0.02] relative z-10">
                    <Link href={`/challenges/${c.id}`} className="w-full">
                      <Button className="w-full h-9 rounded-full bg-white/5 text-white/90 group-hover:bg-white group-hover:text-black transition-all border border-white/10 group-hover:border-transparent font-medium shadow-none group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Start Challenge <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
