// Dynamic HR Tools Data - This can be easily updated to add new tools
// When you add new tools here, they will automatically appear in:
// - Homepage tools section
// - Services page tools section
// - Resources page tools section
// - Any other page that imports this data

export const toolsData = [
  {
    id: 'hr-calculator',
    title: 'HR Cost Calculator',
    description: 'Calculate your HR operational costs and discover potential savings with our virtual HR solutions.',
    icon: '💰',
    color: 'from-blue-500 to-purple-600',
    bgColor: 'from-blue-50 to-purple-50',
    borderColor: 'border-blue-200',
    link: '/hr-cost-savings-calculator',
    category: 'calculator',
    badge: 'Popular',
    timeEstimate: '3-5 min',
    features: ['Cost Analysis', 'Savings Calculator', 'ROI Projection', 'Custom Reports']
  },
  {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Calculate competitive salary ranges based on position, experience, location, and other factors for optimal hiring decisions.',
    icon: '💼',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200',
    link: '/salary-calculator',
    category: 'calculator',
    badge: 'New',
    timeEstimate: '2-3 min',
    features: ['Market Data', 'Role Comparison', 'Location Analysis', 'Benefits Calculator']
  },
  {
    id: 'employee-salary-calculator',
    title: 'Employee Salary Calculator',
    description: 'Calculate employee monthly salary based on working days, attendance, and all salary components for HR and Accounts departments.',
    icon: '👥',
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'from-indigo-50 to-purple-50',
    borderColor: 'border-indigo-200',
    link: '/employee-salary-calculator',
    category: 'calculator',
    badge: 'New',
    timeEstimate: '3-5 min',
    features: ['Working Days Calculation', 'Attendance Tracking', 'Salary Breakdown', 'Download Reports']
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Measure the return on investment for your HR initiatives and virtual HR services.',
    icon: '📈',
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    borderColor: 'border-orange-200',
    link: '/roi-calculator',
    category: 'calculator',
    timeEstimate: '5-8 min',
    features: ['Investment Tracking', 'Benefit Analysis', 'Scenario Planning', 'Visual Reports']
  },
  {
    id: 'compliance-checker',
    title: 'Compliance Risk Checker',
    description: 'Assess your HR compliance status and identify potential risks with our automated checker.',
    icon: '🛡️',
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50',
    borderColor: 'border-red-200',
    link: '/compliance-checker',
    category: 'tool',
    badge: 'Essential',
    timeEstimate: '8-12 min',
    features: ['Risk Assessment', 'Compliance Tracking', 'Legal Updates', 'Action Plans']
  },
  {
    id: 'document-analyzer',
    title: 'Document Analyzer',
    description: 'AI-powered analysis of HR documents for compliance, accuracy, and optimization.',
    icon: '📄',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    link: '/document-analyzer',
    category: 'tool',
    timeEstimate: '5-10 min',
    features: ['AI Analysis', 'Compliance Check', 'Optimization Tips', 'Document Templates']
  },
  {
    id: 'resume-parser',
    title: 'Resume Parser',
    description: 'Extract and analyze candidate information from resumes for efficient hiring.',
    icon: '📝',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    link: '/resume-parser',
    category: 'tool',
    timeEstimate: '2-4 min',
    features: ['Data Extraction', 'Skill Analysis', 'Candidate Scoring', 'Export Options']
  },
  {
    id: 'employee-engagement',
    title: 'Engagement Calculator',
    description: 'Measure and improve employee engagement with our comprehensive assessment tool.',
    icon: '❤️',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-200',
    link: '/employee-engagement-calculator',
    category: 'tool',
    timeEstimate: '10-15 min',
    features: ['Engagement Survey', 'Real-time Results', 'Actionable Insights', 'Benchmarking']
  },
  {
    id: 'hr-quiz',
    title: 'HR Knowledge Quiz',
    description: 'Test your HR knowledge and stay updated with the latest industry practices.',
    icon: '🧠',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50',
    borderColor: 'border-cyan-200',
    link: '/hr-quiz',
    category: 'tool',
    timeEstimate: '15-20 min',
    features: ['Knowledge Test', 'Industry Updates', 'Learning Resources', 'Certification']
  },
  {
    id: 'needs-assessment',
    title: 'HR Needs Assessment',
    description: 'Evaluate your organization\'s HR requirements and get personalized recommendations.',
    icon: '🔍',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    link: '/hr-needs-assessment-calculator',
    category: 'assessment',
    timeEstimate: '12-18 min',
    features: ['Organization Analysis', 'Gap Identification', 'Recommendations', 'Action Plans']
  },
  {
    id: 'performance-calculator',
    title: 'Performance Calculator',
    description: 'Calculate and track employee performance metrics for better management decisions.',
    icon: '📊',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    link: '/performance-calculator',
    category: 'calculator',
    timeEstimate: '5-10 min',
    features: ['KPI Tracking', 'Performance Reviews', 'Goal Setting', 'Progress Reports']
  },
  {
    id: 'turnover-calculator',
    title: 'Turnover Calculator',
    description: 'Analyze employee turnover rates and identify retention improvement opportunities.',
    icon: '🔄',
    color: 'from-gray-500 to-slate-600',
    bgColor: 'from-gray-50 to-slate-50',
    borderColor: 'border-gray-200',
    link: '/turnover-calculator',
    category: 'calculator',
    timeEstimate: '3-5 min',
    features: ['Turnover Analysis', 'Cost Calculation', 'Retention Strategies', 'Benchmarking']
  },
  {
    id: 'benefits-calculator',
    title: 'Benefits Calculator',
    description: 'Calculate and compare employee benefits packages for competitive compensation.',
    icon: '🎁',
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-200',
    link: '/benefits-calculator',
    category: 'calculator',
    timeEstimate: '4-6 min',
    features: ['Benefits Analysis', 'Cost Comparison', 'Package Design', 'Market Data']
  }
];

// Helper functions to get tools
export const getFeaturedTools = (limit = 6) => {
  return toolsData.filter(tool => tool.badge).slice(0, limit);
};

export const getToolsByCategory = (category, limit = 6) => {
  return toolsData
    .filter(tool => tool.category === category)
    .slice(0, limit);
};

export const getLatestTools = (limit = 6) => {
  return toolsData.slice(0, limit);
};

export const getToolById = (id) => {
  return toolsData.find(tool => tool.id === id);
};

// Categories for filtering
export const toolCategories = [
  { name: 'All', count: toolsData.length },
  { name: 'calculator', count: toolsData.filter(t => t.category === 'calculator').length },
  { name: 'tool', count: toolsData.filter(t => t.category === 'tool').length },
  { name: 'assessment', count: toolsData.filter(t => t.category === 'assessment').length }
];

// Popular tools (with badges)
export const popularTools = toolsData.filter(tool => tool.badge);

// New tools (recently added)
export const newTools = toolsData.filter(tool => tool.badge === 'New'); 