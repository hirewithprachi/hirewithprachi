import React from 'react';

const badges = [
  { name: 'HR Pro', color: 'bg-indigo-500' },
  { name: 'Compliance Star', color: 'bg-green-500' },
  { name: 'Engagement Guru', color: 'bg-yellow-400 text-gray-900' },
];
const leaderboard = [
  { name: 'Acme Corp', score: 95 },
  { name: 'Beta Ltd', score: 89 },
  { name: 'Gamma Inc', score: 82 },
];

export default function GamificationDemo() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="font-semibold mb-4">Gamification Demo</h2>
      <div className="flex gap-4 mb-4">
        {badges.map(b => (
          <span key={b.name} className={`px-3 py-1 rounded-full text-xs font-bold ${b.color}`}>{b.name}</span>
        ))}
      </div>
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">Leaderboard</div>
        <ul>
          {leaderboard.map((l, i) => (
            <li key={l.name} className="flex justify-between text-sm py-1">
              <span>{i + 1}. {l.name}</span>
              <span className="font-bold">{l.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 