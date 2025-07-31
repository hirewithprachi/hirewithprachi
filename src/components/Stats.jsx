import React from 'react';

const stats = [
  {
    label: 'Happy Clients',
    value: '350+',
    icon: (
      <svg className="w-8 h-8 mx-auto text-pink-500 dark:text-pink-300" fill="url(#pink-gradient)" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="pink-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
      </svg>
    ),
  },
  {
    label: 'Projects Done',
    value: '580+',
    icon: (
      <svg className="w-8 h-8 mx-auto text-pink-500 dark:text-pink-300" fill="url(#pink-gradient)" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="pink-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 3v4M8 3v4M2 11h20" />
      </svg>
    ),
  },
  {
    label: 'Years Experience',
    value: '10+',
    icon: (
      <svg className="w-8 h-8 mx-auto text-pink-500 dark:text-pink-300" fill="url(#pink-gradient)" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="pink-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    label: 'Experts Onboard',
    value: '25+',
    icon: (
      <svg className="w-8 h-8 mx-auto text-pink-500 dark:text-pink-300" fill="url(#pink-gradient)" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="pink-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21h13a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7h-1a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2z" />
      </svg>
    ),
  },
];

const Stats = () => (
  <section className="bg-pink-50 dark:bg-gray-900 py-16 px-6">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
      {stats.map((item, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 flex flex-col items-center">
          <div className="mb-3">{item.icon}</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-pink-400 dark:to-pink-500">{item.value}</div>
          <div className="text-sm mt-2 text-gray-700 dark:text-gray-200 font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats; 