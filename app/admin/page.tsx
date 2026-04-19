import React from 'react';
import { Button } from '../../components/Button';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button variant="primary">Add Challenge</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold border-b border-slate-700 pb-2">Recent Challenges</h2>
          {/* Skeleton list */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center bg-slate-900 px-4 py-3 rounded">
              <div>
                <div className="font-semibold">Challenge Title {i}</div>
                <div className="text-xs text-slate-400">ID: c_{i}x92j</div>
              </div>
              <Button variant="ghost">Edit</Button>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold border-b border-slate-700 pb-2">Users Overview</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-2">User</th>
                <th className="pb-2">Rank</th>
                <th className="pb-2 text-right">XP</th>
              </tr>
            </thead>
            <tbody>
              {/* Skeleton rows */}
              <tr>
                <td className="py-2 border-t border-slate-700">ava@demo.com</td>
                <td className="py-2 border-t border-slate-700 text-amber-400 font-bold">Gold</td>
                <td className="py-2 border-t border-slate-700 text-right">1280</td>
              </tr>
              <tr>
                <td className="py-2 border-t border-slate-700">kai@demo.com</td>
                <td className="py-2 border-t border-slate-700 text-slate-400 font-bold">Silver</td>
                <td className="py-2 border-t border-slate-700 text-right">1120</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
