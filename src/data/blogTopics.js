export const blogTopics = [
  {
    id: 'virtual-hr-manager',
    title: 'Virtual HR Manager (Remote HR)',
    slug: 'virtual-hr-manager-remote-hr',
    category: 'HR Services',
    readTime: '8 min read',
    featured: true,
    mappedServices: ['virtual-hr-management', 'hr-policy-development', 'recruitment-process-outsourcing'],
    keywords: ['virtual HR manager', 'remote HR services', 'HR outsourcing', 'HR consulting'],
    metaDescription: 'Discover how Virtual HR Managers can transform your business operations with remote HR expertise, strategic consulting, and comprehensive HR management solutions.',
    publishDate: '2025-01-15'
  },
  {
    id: 'posh-compliance',
    title: 'POSH Compliance: Complete Guide for 2025',
    slug: 'posh-compliance-complete-guide-2025',
    category: 'Compliance',
    readTime: '10 min read',
    featured: true,
    mappedServices: ['posh-training', 'internal-committee-setup', 'posh-policy-development'],
    keywords: ['POSH compliance', 'sexual harassment prevention', 'workplace safety', 'HR compliance'],
    metaDescription: 'Essential guide to POSH compliance in 2025. Learn about mandatory requirements, internal committee setup, and how to create a safe workplace environment.',
    publishDate: '2025-01-20'
  },
  {
    id: 'employee-handbook-design',
    title: 'Employee Handbook Design: Best Practices for Modern Organizations',
    slug: 'employee-handbook-design-best-practices',
    category: 'HR Policies',
    readTime: '12 min read',
    featured: false,
    mappedServices: ['hr-policy-development', 'employee-onboarding', 'hr-audit-compliance'],
    keywords: ['employee handbook', 'HR policies', 'company policies', 'employee onboarding'],
    metaDescription: 'Learn how to create comprehensive employee handbooks that align with modern workplace needs, legal requirements, and company culture.',
    publishDate: '2025-01-25'
  },
  {
    id: 'hiring-recruitment-startups',
    title: 'Hiring & Recruitment for Startups: A Strategic Approach',
    slug: 'hiring-recruitment-startups-strategic-approach',
    category: 'Recruitment',
    readTime: '9 min read',
    featured: true,
    mappedServices: ['recruitment-process-outsourcing', 'executive-search', 'talent-management'],
    keywords: ['startup recruitment', 'hiring strategies', 'talent acquisition', 'startup HR'],
    metaDescription: 'Strategic hiring and recruitment guide for startups. Learn cost-effective methods, best practices, and how to build high-performing teams.',
    publishDate: '2025-01-30'
  },
  {
    id: 'hr-outsourcing-services',
    title: 'HR Outsourcing Services: When and How to Outsource HR Functions',
    slug: 'hr-outsourcing-services-guide',
    category: 'HR Services',
    readTime: '11 min read',
    featured: false,
    mappedServices: ['compensation-benefits', 'hr-technology-implementation', 'hr-analytics'],
    keywords: ['HR outsourcing', 'payroll services', 'HR automation', 'HR efficiency'],
    metaDescription: 'Complete guide to HR outsourcing services. Understand when to outsource, what functions to consider, and how to choose the right partner.',
    publishDate: '2025-02-05'
  },
  {
    id: 'workplace-policy-education',
    title: 'Workplace Policy for Education Institutes: Ensuring Safety and Compliance',
    slug: 'workplace-policy-education-institutes',
    category: 'Education HR',
    readTime: '10 min read',
    featured: false,
    mappedServices: ['educational-hr-management', 'campus-safety', 'educational-compliance'],
    keywords: ['education HR', 'school policies', 'child safety', 'educational institutions'],
    metaDescription: 'Comprehensive workplace policies for educational institutions. Learn about child safety, staff management, and compliance requirements.',
    publishDate: '2025-02-10'
  },
  {
    id: 'contractual-freelance-hr',
    title: 'Contractual & Freelance HR Support: Flexible Solutions for Modern Businesses',
    slug: 'contractual-freelance-hr-support',
    category: 'HR Services',
    readTime: '8 min read',
    featured: false,
    mappedServices: ['virtual-hr-management', 'hr-technology-implementation', 'employee-onboarding'],
    keywords: ['freelance HR', 'contract HR', 'project-based HR', 'flexible HR solutions'],
    metaDescription: 'Explore contractual and freelance HR support options. Learn how flexible HR solutions can benefit your organization and reduce costs.',
    publishDate: '2025-02-15'
  },
  {
    id: 'women-safety-legal-hr',
    title: 'Women Safety & Legal HR Setup: Creating Inclusive Workplaces',
    slug: 'women-safety-legal-hr-setup',
    category: 'Women Rights',
    readTime: '12 min read',
    featured: true,
    mappedServices: ['women-empowerment', 'posh-training', 'gender-equality'],
    keywords: ['women safety', 'gender equality', 'inclusive workplace', 'women rights'],
    metaDescription: 'Comprehensive guide to women safety and legal HR setup. Learn how to create inclusive, safe, and legally compliant workplaces.',
    publishDate: '2025-02-20'
  },
  {
    id: 'employee-experience-culture',
    title: 'Employee Experience & Culture Building: The Key to Retention',
    slug: 'employee-experience-culture-building',
    category: 'Employee Engagement',
    readTime: '11 min read',
    featured: false,
    mappedServices: ['employee-relations', 'performance-management', 'organizational-development'],
    keywords: ['employee experience', 'company culture', 'employee retention', 'engagement'],
    metaDescription: 'Learn how to build strong employee experience and company culture. Discover strategies for improving retention and workplace satisfaction.',
    publishDate: '2025-02-25'
  },
  {
    id: 'labor-law-compliance',
    title: 'Labor Law & Compliance Advisory: Navigating Complex Regulations',
    slug: 'labor-law-compliance-advisory',
    category: 'Compliance',
    readTime: '13 min read',
    featured: false,
    mappedServices: ['hr-audit-compliance', 'posh-compliance-audit', 'educational-compliance'],
    keywords: ['labor law', 'HR compliance', 'legal advisory', 'employment law'],
    metaDescription: 'Essential guide to labor law and compliance advisory. Understand complex regulations and ensure your organization stays compliant.',
    publishDate: '2025-03-01'
  }
];

export const getBlogTopicById = (id) => {
  return blogTopics.find(topic => topic.id === id);
};

export const getBlogTopicsByCategory = (category) => {
  return blogTopics.filter(topic => topic.category === category);
};

export const getFeaturedBlogTopics = () => {
  return blogTopics.filter(topic => topic.featured);
};

export const getRelatedBlogTopics = (currentTopicId, limit = 3) => {
  const currentTopic = getBlogTopicById(currentTopicId);
  if (!currentTopic) return [];
  
  return blogTopics
    .filter(topic => topic.id !== currentTopicId)
    .slice(0, limit);
};

export const getBlogTopicBySlug = (slug) => {
  return blogTopics.find(topic => topic.slug === slug);
}; 