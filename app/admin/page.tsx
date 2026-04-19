import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Users, LayoutList, Trophy } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground">Manage challenges, users, and platform settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <LayoutList className="w-4 h-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">6 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Trophy className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,293</div>
            <p className="text-xs text-muted-foreground mt-1">78% completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Add New Challenge</CardTitle>
            <CardDescription>Create a new challenge for the Arena.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">Title</label>
                <Input id="title" placeholder="e.g. Prompt Battle: Roleplay" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="category">Category</label>
                <select id="category" className="w-full bg-background/50 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option value="prompt">Prompt Battles</option>
                  <option value="build">Build From Idea</option>
                  <option value="debug">Debug Broken Code</option>
                  <option value="ui">UI Clone Sprint</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="difficulty">Difficulty</label>
                  <select id="difficulty" className="w-full bg-background/50 border border-border/50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="time">Time Est. (mins)</label>
                  <Input id="time" type="number" placeholder="15" className="bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="desc">Full Prompt Objective</label>
                <textarea 
                  id="desc" 
                  rows={4} 
                  className="w-full bg-background/50 border border-border/50 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50" 
                  placeholder="Describe the challenge..."
                />
              </div>
              <Button type="button" className="w-full bg-emerald-500 text-black hover:bg-emerald-600 font-bold">
                <Plus className="w-4 h-4 mr-2" /> Publish Challenge
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest signups to the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['alexa_prompt', 'neo_coder', 'trinity_ai', 'morpheus_builds', 'cipher_dev'].map((user, i) => (
                <div key={user} className="flex justify-between items-center p-3 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-sm">
                      {user[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{user}</div>
                      <div className="text-xs text-muted-foreground">{i * 2 + 1} hr ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
