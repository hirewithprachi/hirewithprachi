// Comprehensive HR & Human Rights Services Data
// Organized by categories with SEO-friendly descriptions and benefits

export const servicesData = {
  categories: [
    {
      id: 'core-hr',
      name: 'Core HR & Virtual HR Services',
      description: 'Essential HR functions and virtual HR support for businesses of all sizes',
      icon: '👥',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'corporate-startup',
      name: 'Corporate & Startup HR Solutions',
      description: 'Specialized HR solutions for corporate environments and startup ecosystems',
      icon: '🏢',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'posh',
      name: 'POSH (Prevention of Sexual Harassment at Workplace)',
      description: 'Comprehensive POSH compliance and workplace safety services',
      icon: '🛡️',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'educational',
      name: 'Educational Institutions – HR + Rights',
      description: 'HR solutions and rights protection for educational institutions',
      icon: '🎓',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'women-child',
      name: 'Women & Child Rights Services',
      description: 'Specialized services for women and child rights protection and advocacy',
      icon: '🤱',
      color: 'from-pink-500 to-rose-500'
    }
  ],
  
  services: [
    // A. Core HR & Virtual HR Services (9 services)
    {
      id: 'virtual-hr-management',
      category: 'core-hr',
      title: 'Virtual HR Management',
      description: 'Complete virtual HR department services with dedicated HR professionals managing all aspects of human resources remotely.',
      benefits: [
        '24/7 HR support and consultation',
        'Cost-effective alternative to in-house HR',
        'Scalable solutions for growing businesses'
      ],
      icon: '💼',
      imageUrl: '/images/services/virtual-hr.svg',
      features: ['Remote HR operations', 'Employee lifecycle management', 'HR policy implementation']
    },
    {
      id: 'hr-policy-development',
      category: 'core-hr',
      title: 'HR Policy Development',
      description: 'Comprehensive HR policy creation and documentation aligned with legal requirements and industry best practices.',
      benefits: [
        'Legally compliant policy frameworks',
        'Customized to your business needs',
        'Regular updates and maintenance'
      ],
      icon: '📋',
      imageUrl: '/images/services/hr-policy.svg',
      features: ['Policy drafting and review', 'Legal compliance check', 'Employee handbook creation']
    },
    {
      id: 'recruitment-process-outsourcing',
      category: 'core-hr',
      title: 'Recruitment Process Outsourcing',
      description: 'End-to-end recruitment services from job posting to onboarding, ensuring quality hires and reduced time-to-fill.',
      benefits: [
        'Faster hiring cycles',
        'Access to wider talent pools',
        'Reduced recruitment costs'
      ],
      icon: '🎯',
      imageUrl: '/images/services/recruitment.svg',
      features: ['Job analysis and posting', 'Candidate screening', 'Interview coordination']
    },
    {
      id: 'employee-onboarding',
      category: 'core-hr',
      title: 'Employee Onboarding',
      description: 'Structured onboarding programs that ensure new hires integrate smoothly and become productive team members quickly.',
      benefits: [
        'Improved employee retention',
        'Faster productivity ramp-up',
        'Enhanced employee experience'
      ],
      icon: '🚀',
      imageUrl: '/images/services/onboarding.svg',
      features: ['Orientation programs', 'Training coordination', 'Integration support']
    },
    {
      id: 'performance-management',
      category: 'core-hr',
      title: 'Performance Management',
      description: 'Comprehensive performance management systems including goal setting, regular reviews, and development planning.',
      benefits: [
        'Clear performance expectations',
        'Regular feedback mechanisms',
        'Career development support'
      ],
      icon: '📊',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Goal setting frameworks', 'Performance reviews', 'Development planning']
    },
    {
      id: 'compensation-benefits',
      category: 'core-hr',
      title: 'Compensation & Benefits',
      description: 'Strategic compensation and benefits design that attracts and retains top talent while maintaining cost efficiency.',
      benefits: [
        'Competitive compensation packages',
        'Cost-effective benefits design',
        'Market-aligned salary structures'
      ],
      icon: '💰',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Salary benchmarking', 'Benefits package design', 'Compensation strategy']
    },
    {
      id: 'employee-relations',
      category: 'core-hr',
      title: 'Employee Relations',
      description: 'Proactive employee relations management to maintain positive workplace culture and resolve conflicts effectively.',
      benefits: [
        'Improved workplace harmony',
        'Reduced employee conflicts',
        'Enhanced organizational culture'
      ],
      icon: '🤝',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Conflict resolution', 'Employee counseling', 'Workplace investigations']
    },
    {
      id: 'hr-technology-implementation',
      category: 'core-hr',
      title: 'HR Technology Implementation',
      description: 'Strategic HR technology selection and implementation to streamline HR processes and improve efficiency.',
      benefits: [
        'Automated HR processes',
        'Improved data management',
        'Enhanced employee self-service'
      ],
      icon: '🤖',
      imageUrl: '/images/services/generic-service.svg',
      features: ['HRIS selection', 'System implementation', 'Training and support']
    },
    {
      id: 'hr-audit-compliance',
      category: 'core-hr',
      title: 'HR Audit & Compliance',
      description: 'Comprehensive HR audits to ensure compliance with labor laws and identify areas for improvement.',
      benefits: [
        'Legal compliance assurance',
        'Risk identification and mitigation',
        'Process optimization opportunities'
      ],
      icon: '🔍',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Compliance audits', 'Risk assessments', 'Remediation planning']
    },

    // B. Corporate & Startup HR Solutions (9 services)
    {
      id: 'startup-hr-foundation',
      category: 'corporate-startup',
      title: 'Startup HR Foundation',
      description: 'Complete HR infrastructure setup for startups, from basic policies to scalable systems for growth.',
      benefits: [
        'Foundation for sustainable growth',
        'Investor-ready HR practices',
        'Scalable HR framework'
      ],
      icon: '🚀',
      imageUrl: '/images/services/generic-service.svg',
      features: ['HR infrastructure setup', 'Policy framework creation', 'Growth planning']
    },
    {
      id: 'corporate-hr-transformation',
      category: 'corporate-startup',
      title: 'Corporate HR Transformation',
      description: 'Strategic HR transformation initiatives to modernize corporate HR functions and improve organizational effectiveness.',
      benefits: [
        'Modernized HR operations',
        'Improved organizational efficiency',
        'Enhanced employee experience'
      ],
      icon: '🔄',
      imageUrl: '/images/services/generic-service.svg',
      features: ['HR process redesign', 'Technology modernization', 'Change management']
    },
    {
      id: 'merger-acquisition-hr',
      category: 'corporate-startup',
      title: 'Merger & Acquisition HR',
      description: 'Specialized HR support for mergers and acquisitions, ensuring smooth integration and cultural alignment.',
      benefits: [
        'Smooth organizational integration',
        'Cultural alignment support',
        'Reduced integration risks'
      ],
      icon: '🤝',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Due diligence support', 'Integration planning', 'Cultural assessment']
    },
    {
      id: 'executive-search',
      category: 'corporate-startup',
      title: 'Executive Search',
      description: 'High-level executive recruitment services for senior leadership positions across industries.',
      benefits: [
        'Access to top executive talent',
        'Thorough candidate assessment',
        'Long-term leadership success'
      ],
      icon: '👑',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Executive profiling', 'Talent mapping', 'Succession planning']
    },
    {
      id: 'organizational-development',
      category: 'corporate-startup',
      title: 'Organizational Development',
      description: 'Strategic organizational development initiatives to improve company culture, structure, and effectiveness.',
      benefits: [
        'Enhanced organizational effectiveness',
        'Improved company culture',
        'Better change management'
      ],
      icon: '🏗️',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Culture assessment', 'Structure optimization', 'Change initiatives']
    },
    {
      id: 'talent-management',
      category: 'corporate-startup',
      title: 'Talent Management',
      description: 'Comprehensive talent management strategies to attract, develop, and retain high-performing employees.',
      benefits: [
        'Improved talent retention',
        'Enhanced employee development',
        'Better succession planning'
      ],
      icon: '⭐',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Talent identification', 'Development programs', 'Retention strategies']
    },
    {
      id: 'leadership-development',
      category: 'corporate-startup',
      title: 'Leadership Development',
      description: 'Comprehensive leadership development programs to build strong leaders at all organizational levels.',
      benefits: [
        'Stronger leadership pipeline',
        'Improved decision-making',
        'Enhanced team performance'
      ],
      icon: '🎯',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Leadership assessment', 'Development programs', 'Coaching support']
    },
    {
      id: 'change-management',
      category: 'corporate-startup',
      title: 'Change Management',
      description: 'Strategic change management support to ensure successful organizational transitions and transformations.',
      benefits: [
        'Successful change implementation',
        'Reduced resistance to change',
        'Improved adoption rates'
      ],
      icon: '🔄',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Change strategy', 'Communication planning', 'Stakeholder engagement']
    },
    {
      id: 'hr-analytics',
      category: 'corporate-startup',
      title: 'HR Analytics',
      description: 'Data-driven HR analytics to provide insights for strategic decision-making and performance improvement.',
      benefits: [
        'Data-driven HR decisions',
        'Improved performance insights',
        'Strategic workforce planning'
      ],
      icon: '📈',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Data analysis', 'Performance metrics', 'Strategic insights']
    },

    // C. POSH (Prevention of Sexual Harassment at Workplace) (6 services)
    {
      id: 'posh-policy-development',
      category: 'posh',
      title: 'POSH Policy Development',
      description: 'Comprehensive POSH policy creation and implementation aligned with legal requirements and best practices.',
      benefits: [
        'Legal compliance assurance',
        'Clear policy framework',
        'Employee protection measures'
      ],
      icon: '📜',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Policy drafting', 'Legal review', 'Implementation guidance']
    },
    {
      id: 'posh-training',
      category: 'posh',
      title: 'POSH Training & Awareness',
      description: 'Comprehensive POSH training programs for employees, managers, and internal committee members.',
      benefits: [
        'Enhanced awareness and prevention',
        'Compliance with training requirements',
        'Safer workplace environment'
      ],
      icon: '🎓',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Employee training', 'Manager training', 'Committee training']
    },
    {
      id: 'internal-committee-setup',
      category: 'posh',
      title: 'Internal Committee Setup',
      description: 'Establishment and training of Internal Complaints Committees as required under POSH Act.',
      benefits: [
        'Legal compliance',
        'Proper grievance handling',
        'Impartial investigation process'
      ],
      icon: '⚖️',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Committee formation', 'Member training', 'Process establishment']
    },
    {
      id: 'posh-investigation',
      category: 'posh',
      title: 'POSH Investigation',
      description: 'Professional investigation services for sexual harassment complaints with impartial and thorough processes.',
      benefits: [
        'Impartial investigation',
        'Legal compliance',
        'Fair resolution process'
      ],
      icon: '🔍',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Complaint investigation', 'Evidence collection', 'Report preparation']
    },
    {
      id: 'posh-compliance-audit',
      category: 'posh',
      title: 'POSH Compliance Audit',
      description: 'Comprehensive POSH compliance audits to ensure adherence to legal requirements and identify gaps.',
      benefits: [
        'Compliance verification',
        'Risk identification',
        'Remediation guidance'
      ],
      icon: '📋',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Compliance assessment', 'Gap analysis', 'Remediation planning']
    },
    {
      id: 'posh-reporting',
      category: 'posh',
      title: 'POSH Reporting & Documentation',
      description: 'Annual POSH reporting and documentation services to meet legal requirements and maintain records.',
      benefits: [
        'Legal compliance',
        'Proper documentation',
        'Annual reporting support'
      ],
      icon: '📊',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Annual reporting', 'Documentation maintenance', 'Compliance tracking']
    },

    // D. Educational Institutions – HR + Rights (6 services)
    {
      id: 'educational-hr-management',
      category: 'educational',
      title: 'Educational HR Management',
      description: 'Specialized HR services for educational institutions including staff management and academic HR support.',
      benefits: [
        'Academic-focused HR solutions',
        'Staff development support',
        'Educational compliance'
      ],
      icon: '🎓',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Academic staff management', 'Educational policies', 'Staff development']
    },
    {
      id: 'student-rights-protection',
      category: 'educational',
      title: 'Student Rights Protection',
      description: 'Comprehensive student rights protection services including grievance handling and advocacy support.',
      benefits: [
        'Student welfare protection',
        'Fair grievance handling',
        'Educational rights advocacy'
      ],
      icon: '📚',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Rights awareness', 'Grievance support', 'Advocacy services']
    },
    {
      id: 'academic-staff-development',
      category: 'educational',
      title: 'Academic Staff Development',
      description: 'Professional development programs for academic staff including training and career advancement support.',
      benefits: [
        'Enhanced teaching quality',
        'Staff retention',
        'Professional growth'
      ],
      icon: '👨‍🏫',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Training programs', 'Career development', 'Performance support']
    },
    {
      id: 'educational-compliance',
      category: 'educational',
      title: 'Educational Compliance',
      description: 'Comprehensive compliance services for educational institutions including regulatory requirements and audits.',
      benefits: [
        'Regulatory compliance',
        'Risk mitigation',
        'Quality assurance'
      ],
      icon: '✅',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Regulatory compliance', 'Audit support', 'Quality standards']
    },
    {
      id: 'campus-safety',
      category: 'educational',
      title: 'Campus Safety & Security',
      description: 'Campus safety and security programs including safety policies and emergency response planning.',
      benefits: [
        'Enhanced campus safety',
        'Emergency preparedness',
        'Student protection'
      ],
      icon: '🛡️',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Safety policies', 'Emergency planning', 'Security protocols']
    },
    {
      id: 'educational-consulting',
      category: 'educational',
      title: 'Educational Consulting',
      description: 'Strategic consulting services for educational institutions including policy development and operational improvement.',
      benefits: [
        'Strategic guidance',
        'Operational improvement',
        'Best practice implementation'
      ],
      icon: '💡',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Strategic planning', 'Policy development', 'Operational support']
    },

    // E. Women & Child Rights Services (6 services)
    {
      id: 'women-empowerment',
      category: 'women-child',
      title: 'Women Empowerment Programs',
      description: 'Comprehensive women empowerment initiatives including skill development and leadership training.',
      benefits: [
        'Enhanced women leadership',
        'Skill development',
        'Career advancement'
      ],
      icon: '💪',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Leadership training', 'Skill development', 'Career guidance']
    },
    {
      id: 'child-protection',
      category: 'women-child',
      title: 'Child Protection Services',
      description: 'Specialized child protection services including rights advocacy and safety programs.',
      benefits: [
        'Child safety protection',
        'Rights advocacy',
        'Safety awareness'
      ],
      icon: '👶',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Rights advocacy', 'Safety programs', 'Protection measures']
    },
    {
      id: 'gender-equality',
      category: 'women-child',
      title: 'Gender Equality Initiatives',
      description: 'Comprehensive gender equality programs including workplace equality and diversity training.',
      benefits: [
        'Workplace equality',
        'Diversity promotion',
        'Inclusive culture'
      ],
      icon: '⚖️',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Equality training', 'Diversity programs', 'Inclusion initiatives']
    },
    {
      id: 'domestic-violence-support',
      category: 'women-child',
      title: 'Domestic Violence Support',
      description: 'Support services for domestic violence survivors including counseling and legal assistance.',
      benefits: [
        'Survivor support',
        'Legal assistance',
        'Counseling services'
      ],
      icon: '🆘',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Counseling support', 'Legal assistance', 'Safety planning']
    },
    {
      id: 'maternal-rights',
      category: 'women-child',
      title: 'Maternal Rights Advocacy',
      description: 'Maternal rights advocacy including workplace maternity support and legal rights awareness.',
      benefits: [
        'Maternal rights protection',
        'Workplace support',
        'Legal awareness'
      ],
      icon: '🤱',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Rights advocacy', 'Workplace support', 'Legal guidance']
    },
    {
      id: 'child-education-rights',
      category: 'women-child',
      title: 'Child Education Rights',
      description: 'Child education rights advocacy including access to quality education and educational support.',
      benefits: [
        'Educational access',
        'Quality education',
        'Rights protection'
      ],
      icon: '📖',
      imageUrl: '/images/services/generic-service.svg',
      features: ['Education advocacy', 'Access support', 'Quality assurance']
    }
  ]
};

// Helper functions for data manipulation
export const getServicesByCategory = (categoryId) => {
  return servicesData.services.filter(service => service.category === categoryId);
};

export const getAllServices = () => {
  return servicesData.services;
};

export const getCategories = () => {
  return servicesData.categories;
};

export const getServiceById = (serviceId) => {
  return servicesData.services.find(service => service.id === serviceId);
};

export default servicesData;