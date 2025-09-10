import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ variant = 'light' }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbMap = {
    'about': 'About Us',
    'services': 'Services',
    'resources': 'Resources',
    'contact': 'Contact',
    'blog': 'Blog',
    'hr-compliance': 'HR Compliance',
    'recruitment-hiring': 'Recruitment & Hiring',
    'employee-engagement': 'Employee Engagement',
    'virtual-hr-management': 'Virtual HR Management',
    'hr-policy-development': 'HR Policy Development',
    'recruitment-process-outsourcing': 'Recruitment Process Outsourcing',
    'posh-compliance': 'POSH Compliance',
    'salary-calculator': 'Salary Calculator',
    'hr-cost-savings-calculator': 'HR Cost Savings Calculator',
    'hr-needs-assessment-calculator': 'HR Needs Assessment Calculator',
    'compliance-risk-checker': 'Compliance Risk Checker',
    'document-analyzer': 'Document Analyzer',
    'resume-parser': 'Resume Parser',
    'turnover-calculator': 'Turnover Calculator',
    'performance-calculator': 'Performance Calculator',
    'benefits-calculator': 'Benefits Calculator',
    'roi-calculator': 'ROI Calculator',
    'salary-benchmarking-tool': 'Salary Benchmarking Tool',
    'employee-salary-calculator': 'Employee Salary Calculator',
    'employee-engagement-calculator': 'Employee Engagement Calculator',
    'resource-downloads': 'Resource Downloads',
    'hr-quiz': 'HR Quiz',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
    'gdpr-data-deletion': 'GDPR Data Deletion'
  };

  // Styling based on variant
  const styles = {
    light: {
      container: "flex items-center space-x-2 text-sm text-gray-600 mb-6",
      link: "flex items-center hover:text-primary-600 transition-colors",
      chevron: "w-4 h-4 text-gray-400",
      current: "text-gray-900 font-medium capitalize",
      linkText: "hover:text-primary-600 transition-colors capitalize"
    },
    dark: {
      container: "flex items-center space-x-2 text-sm text-white/80 mb-6",
      link: "flex items-center hover:text-white transition-colors",
      chevron: "w-4 h-4 text-white/60",
      current: "text-white font-medium capitalize",
      linkText: "hover:text-white transition-colors capitalize"
    }
  };

  const currentStyles = styles[variant];

  return (
    <nav className={currentStyles.container}>
      <Link to="/" className={currentStyles.link}>
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbMap[name] || name.replace(/-/g, ' ');

        return (
          <React.Fragment key={name}>
            <ChevronRight className={currentStyles.chevron} />
            {isLast ? (
              <span className={currentStyles.current}>
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className={currentStyles.linkText}
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}