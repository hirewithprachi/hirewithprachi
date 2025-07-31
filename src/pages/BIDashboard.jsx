import React from 'react';
import { Helmet } from 'react-helmet-async';

const kpis = [
  { label: 'Active Projects', value: 5 },
  { label: 'Avg. Time to Hire (days)', value: 18 },
  { label: 'Employee Engagement (%)', value: 82 },
  { label: 'Retention Rate (%)', value: 91 },
];

export default function BIDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-16 mb-12">
          <Helmet>
            <title>Business Intelligence Dashboard | Prachi HR</title>
            <meta name="description" content="Real-time HR metrics, charts, and KPIs for clients." />
          </Helmet>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Business Intelligence Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow p-6 text-center">
                <div className="text-2xl font-bold text-indigo-700 mb-2">{kpi.value}</div>
                <div className="text-gray-600 text-sm">{kpi.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow p-6">
              <h2 className="font-semibold mb-4">Project Status (Bar Chart)</h2>
              <img src="/assets/images/demo-bar-chart.png" alt="Bar Chart" className="w-full h-48 object-contain" loading="lazy" />
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow p-6">
              <h2 className="font-semibold mb-4">Engagement Breakdown (Pie Chart)</h2>
              <img src="/assets/images/demo-pie-chart.png" alt="Pie Chart" className="w-full h-48 object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 