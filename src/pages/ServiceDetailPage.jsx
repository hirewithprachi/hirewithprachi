import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft, CheckCircle, Users, FileText, Briefcase, DollarSign, Settings, Award, Zap, MessageSquare, BarChart2, KeyRound as UsersRound, UserPlus, FileSpreadsheet, HeartHandshake as Handshake, Brain, Presentation, Smile, Search } from 'lucide-react';
    import { Helmet } from 'react-helmet';

    const servicesData = {
      'hr-compliance': {
        icon: <FileText className="h-12 w-12 text-primary" />,
        title: 'HR Compliance & Legal Services',
        description: 'Comprehensive compliance management to keep your business legally protected',
        longDescription: 'Our HR compliance services ensure your business meets all statutory and regulatory requirements in India. We provide labor law audits, policy drafting, legal risk assessment, compliance training, and ongoing support to help you avoid penalties and foster a safe, ethical workplace.',
        items: [
          'Labour law compliance audits',
          'Employment contract drafting',
          'Policy development & updates',
          'Legal risk assessment',
          'Compliance training programs',
          'Audit support & documentation'
        ]
      },
      'recruitment-hiring': { icon: <Search className="h-12 w-12 text-primary" />, title: 'Recruitment & Hiring Services', description: 'Comprehensive solutions to attract, assess, and hire the best talent for your organization. We streamline your entire recruitment lifecycle.', longDescription: "Our recruitment and hiring services are designed to take the burden off your shoulders. We handle everything from crafting compelling job descriptions and advertising on major portals (Naukri, LinkedIn, Indeed, etc.) to meticulous resume screening based on your criteria. We coordinate and schedule interviews (telephonic, virtual, or in-person), conduct online assessments and psychometric tests for deeper insights, and even manage third-party background verification processes. Let us find your next great hire while you focus on your business.", items: ['Job Posting & Advertisement', 'Resume Screening & Shortlisting', 'Interview Coordination & Management', 'Candidate Assessment & Psychometric Testing', 'Background Verification Coordination', 'Offer Letter Rollout Assistance'] },
      'onboarding-induction': { icon: <UserPlus className="h-12 w-12 text-primary" />, title: 'Onboarding & Induction Programs', description: 'Ensure new hires feel welcomed, informed, and ready to contribute from day one with our structured onboarding processes.', longDescription: "A positive onboarding experience is crucial for employee retention and productivity. We create seamless digital onboarding processes, preparing and sharing comprehensive welcome kits, essential documents, and company policies. Our team conducts engaging virtual induction sessions to familiarize new employees with your company culture, vision, and values. We also ensure all necessary employee documentation is collected, verified, and maintained securely.", items: ['Customized Digital Onboarding Kits', 'Virtual Induction & Orientation Sessions', 'Secure Employee Document Collection & Management', 'First Week Integration Plans', 'Policy Walkthroughs'] },
      'employee-management': { icon: <UsersRound className="h-12 w-12 text-primary" />, title: 'Employee Management Systems', description: 'Efficiently manage your workforce data, attendance, and HRMS tools for optimal organization.', longDescription: "Effective employee management is key to a smooth-running organization. We provide robust employee database management, ensuring all records are up-to-date, accurate, and easily accessible. Our services include implementing and managing attendance and leave tracking systems. Furthermore, we can assist with the setup and ongoing management of various HRMS tools (like Zoho People, Keka, etc.), customizing them to fit your specific operational needs.", items: ['Centralized Employee Database Management', 'Attendance & Leave Tracking System Implementation', 'HRMS (e.g., Zoho People, Keka) Setup & Management', 'Employee Data Reporting & Analytics', 'Policy Adherence Monitoring'] },
      'payroll-compliance': { icon: <FileSpreadsheet className="h-12 w-12 text-primary" />, title: 'Payroll & Compliance Management', description: 'Accurate and timely payroll processing coupled with meticulous statutory compliance handling.', longDescription: "Navigating payroll and compliance can be complex. We offer end-to-end payroll processing services, including accurate calculation and disbursement of salaries, bonuses, and deductions. Our team ensures strict adherence to compliance requirements, managing PF, ESI, TDS, Gratuity, and other statutory obligations. We also generate and provide monthly salary slips and detailed CTC breakdowns for all employees.", items: ['End-to-End Payroll Processing', 'Statutory Compliance Management (PF, ESI, TDS, Gratuity)', 'Salary Slip Generation & Distribution', 'Full & Final Settlement Processing', 'Compliance Audit Support'] },
      'hr-policy-documentation': { icon: <FileText className="h-12 w-12 text-primary" />, title: 'HR Policy & Documentation', description: 'Develop clear, compliant, and effective HR policies and documentation tailored to your business.', longDescription: "Well-defined HR policies and documents are foundational to a fair and consistent workplace. We specialize in drafting customized HR policies covering areas such as leave, work-from-home (WFH), code of conduct, and more. Our expertise extends to creating legally sound employment contracts, including offer letters, appointment letters, and non-disclosure agreements (NDAs). We can also design comprehensive, company-specific employee handbooks.", items: ['Custom HR Policy Drafting (Leave, WFH, Grievance, etc.)', 'Employment Contract Creation (Offer Letters, NDAs)', 'Employee Handbook Design & Development', 'Policy Review & Updates', 'Documentation Standardization'] },
      'performance-management': { icon: <BarChart2 className="h-12 w-12 text-primary" />, title: 'Performance Management Systems', description: 'Implement effective systems to track, evaluate, and enhance employee performance and organizational growth.', longDescription: "Drive your team's success with a structured performance management system. We help companies define clear Key Performance Indicators (KPIs) and Objectives and Key Results (OKRs) for individuals and teams. Our services cover the entire appraisal cycle management, from setting up review processes to facilitating constructive feedback sessions. We also design and conduct employee feedback surveys to gauge engagement, satisfaction, and areas for improvement.", items: ['KPI & OKR Definition & Setup', 'Performance Appraisal Cycle Management', '360-Degree Feedback Implementation', 'Employee Engagement & Satisfaction Surveys', 'Performance Improvement Plan (PIP) Guidance'] },
      'training-development': { icon: <Brain className="h-12 w-12 text-primary" />, title: 'Training & Development Programs', description: 'Invest in your team’s growth with tailored training programs and e-learning solutions.', longDescription: "Continuous learning is vital for employee and organizational development. We organize and coordinate virtual training and upskilling sessions covering a wide range of topics. This includes facilitating expert-led soft skills and leadership training workshops. We can also assist in setting up and managing online learning platforms (LMS) to provide accessible e-learning solutions for your workforce.", items: ['Custom L&D Program Design & Coordination', 'Virtual Soft Skills & Leadership Training Workshops', 'E-learning Platform (LMS) Setup & Management', 'Training Needs Analysis (TNA)', 'Career Development Pathing'] },
      'employee-engagement': { icon: <Smile className="h-12 w-12 text-primary" />, title: 'Employee Engagement Initiatives', description: 'Foster a positive, motivated, and connected workforce through creative engagement activities.', longDescription: "A highly engaged workforce is more productive and loyal. We specialize in planning and executing engaging virtual team-building activities, online games, and contests to boost morale and collaboration. Our services include organizing virtual celebrations for birthdays, anniversaries, and employee recognition awards. We also facilitate access to mental health and wellness programs, including counselors or wellness webinars, to support employee well-being.", items: ['Virtual Team Building Activities & Games', 'Employee Recognition & Rewards Programs', 'Virtual Celebrations (Birthdays, Anniversaries)', 'Mental Health & Wellness Program Coordination', 'Internal Communication Strategies for Engagement'] },
      'hr-consulting-advisory': { icon: <Handshake className="h-12 w-12 text-primary" />, title: 'HR Consulting & Advisory', description: 'Strategic HR guidance and expert advice to optimize your HR functions and align them with business objectives.', longDescription: "Gain strategic HR insights to navigate challenges and capitalize on opportunities. We conduct thorough HR audits to evaluate your current practices and provide actionable improvement reports. Our team assists with organization structuring, helping design clear hierarchies, roles, and responsibilities. For new businesses, we offer end-to-end startup HR setup, creating a robust HR department from the ground up to support your growth journey.", items: ['Comprehensive HR Audits & Gap Analysis', 'Organization Design & Structuring', 'End-to-End Startup HR Department Setup', 'Change Management Support', 'HR Best Practices Implementation'] },
    };


    const serviceFaqs = {
      'hr-compliance': [
        { q: 'What is HR compliance?', a: 'HR compliance means adhering to all labor laws, regulations, and best practices to protect your business and employees.' },
        { q: 'Why is HR compliance important?', a: 'It helps avoid legal penalties, ensures a safe workplace, and builds trust with employees and stakeholders.' },
      ],
      'recruitment-hiring': [
        { q: 'How do you source candidates?', a: 'We use a mix of job portals, LinkedIn, and our proprietary database to source top talent.' },
        { q: 'What industries do you specialize in?', a: 'We recruit for IT, startups, manufacturing, finance, and more.' },
      ],
      'onboarding-induction': [
        { q: 'Is onboarding remote-friendly?', a: 'Yes, our onboarding process is fully digital and remote-ready.' },
        { q: 'How long does induction take?', a: 'Typically 1-2 days, customized per client.' },
      ],
      'employee-management': [
        { q: 'What HRMS tools do you recommend?', a: 'We recommend Zoho People for its ease of use, scalability, and robust feature set.' },
        { q: 'How do you ensure data accuracy?', a: 'We implement strict data validation and double-entry systems to ensure accuracy.' },
      ],
      'payroll-compliance': [
        { q: 'How do you handle TDS?', a: 'We use a dedicated TDS module and ensure timely filing and payment.' },
        { q: 'What is your approach to PF reconciliation?', a: 'We conduct regular PF reconciliation and generate detailed reports.' },
      ],
      'hr-policy-documentation': [
        { q: 'How do you ensure policy adherence?', a: 'We conduct regular audits and provide training to managers and employees.' },
        { q: 'What is your process for policy updates?', a: 'We have a robust review and approval process for policy updates.' },
      ],
      'performance-management': [
        { q: 'How do you measure employee engagement?', a: 'We use employee feedback surveys, 360-degree feedback, and performance review metrics.' },
        { q: 'What is your approach to performance improvement?', a: 'We work closely with managers to identify areas for improvement and develop actionable plans.' },
      ],
      'training-development': [
        { q: 'How do you conduct training needs analysis?', a: 'We use a combination of data analysis, stakeholder interviews, and gap assessments.' },
        { q: 'What is your e-learning platform?', a: 'We use platforms like Coursera, LinkedIn Learning, and our own LMS for accessible learning.' },
      ],
      'employee-engagement': [
        { q: 'How do you measure employee engagement?', a: 'We use employee feedback surveys, 360-degree feedback, and performance review metrics.' },
        { q: 'What is your approach to performance improvement?', a: 'We work closely with managers to identify areas for improvement and develop actionable plans.' },
      ],
      'hr-consulting-advisory': [
        { q: 'What is a comprehensive HR audit?', a: 'It involves a detailed review of HR policies, procedures, and practices to identify gaps and opportunities.' },
        { q: 'How do you structure an organization?', a: 'We help design clear hierarchies, roles, and responsibilities based on business needs and strategic alignment.' },
      ],
    };

    const relatedServices = {
      'hr-compliance': ['payroll-compliance', 'hr-policy-documentation'],
      'recruitment-hiring': ['onboarding-induction', 'employee-management'],
      'onboarding-induction': ['recruitment-hiring', 'employee-management'],
      'employee-management': ['recruitment-hiring', 'onboarding-induction', 'payroll-compliance', 'hr-policy-documentation'],
      'payroll-compliance': ['employee-management', 'hr-policy-documentation', 'hr-consulting-advisory'],
      'hr-policy-documentation': ['employee-management', 'payroll-compliance', 'hr-consulting-advisory'],
      'performance-management': ['training-development', 'employee-engagement'],
      'training-development': ['performance-management', 'employee-engagement'],
      'employee-engagement': ['performance-management', 'training-development'],
      'hr-consulting-advisory': ['payroll-compliance', 'hr-policy-documentation'],
    };

    const serviceProcess = {
      'hr-compliance': [
        'Initial compliance audit',
        'Gap analysis & risk assessment',
        'Policy drafting & updates',
        'Compliance training for staff',
        'Ongoing statutory support',
        'Regular compliance reviews'
      ],
      'recruitment-hiring': [
        'Consultation & Requirement Gathering',
        'Job Description Optimization',
        'Sourcing & Screening',
        'Interview Coordination',
        'Assessment & Selection',
        'Offer & Onboarding'
      ],
      'onboarding-induction': [
        'Initial Assessment',
        'Customized Onboarding Plan',
        'Welcome Kit Preparation',
        'Virtual Induction Session',
        'Integration Support',
        'Follow-up Review'
      ],
      'employee-management': [
        'Database Management & Maintenance',
        'Attendance Tracking & Reporting',
        'Leave Management & Approvals',
        'HRMS (e.g., Zoho People, Keka) Setup & Configuration',
        'Data Analysis & Reporting',
        'Policy Enforcement & Monitoring'
      ],
      'payroll-compliance': [
        'Payroll Data Input & Validation',
        'Salary Calculation & Processing',
        'Statutory Compliance Checks',
        'TDS & TCS Processing',
        'Monthly Salary Slip Generation',
        'Compliance Audit Preparation'
      ],
      'hr-policy-documentation': [
        'Policy Identification & Review',
        'Drafting & Review by Legal Counsel',
        'Employee Communication & Training',
        'Policy Updates & Maintenance',
        'Documentation Management'
      ],
      'performance-management': [
        'KPI & OKR Definition',
        'Review Process Setup',
        'Feedback Mechanism Implementation',
        'Performance Appraisal Cycle Management',
        'Continuous Improvement Planning'
      ],
      'training-development': [
        'Training Needs Assessment',
        'Program Design & Coordination',
        'Expert-Led Sessions',
        'E-learning Platform Setup',
        'Training Evaluation & Feedback'
      ],
      'employee-engagement': [
        'Engagement Strategy Development',
        'Virtual Team Building Activities',
        'Employee Recognition Programs',
        'Wellness & Mental Health Programs',
        'Internal Communication Enhancement'
      ],
      'hr-consulting-advisory': [
        'HR Audit & Gap Analysis',
        'Organization Design & Structure',
        'Change Management Support',
        'HR Policy Review & Updates',
        'Strategic HR Planning'
      ],
    };

    const serviceBenefits = {
      'hr-compliance': [
        'Avoid costly legal penalties',
        'Build a safe, ethical workplace',
        'Stay up-to-date with Indian labor laws',
        'Boost employer reputation',
        'Peace of mind for business owners'
      ],
      'recruitment-hiring': [
        'Faster hiring turnaround',
        'Access to a wider talent pool',
        'Reduced hiring costs',
        'Improved candidate quality',
        'End-to-end support'
      ],
      'onboarding-induction': [
        'Smooth transition for new hires',
        'Faster productivity',
        'Higher retention rate',
        'Stronger company culture',
        'Reduced onboarding time'
      ],
      'employee-management': [
        'Efficient workforce data management',
        'Accurate attendance tracking',
        'Reduced administrative burden',
        'Better employee relations',
        'Improved organizational efficiency'
      ],
      'payroll-compliance': [
        'Accurate and timely payroll processing',
        'Compliance with all statutory requirements',
        'Reduced risk of penalties',
        'Transparent salary slips',
        'Efficient tax filing'
      ],
      'hr-policy-documentation': [
        'Clear and compliant HR policies',
        'Legal protection for the company',
        'Consistent employee treatment',
        'Reduced HR-related disputes',
        'Easy access to policies'
      ],
      'performance-management': [
        'Improved employee performance',
        'Better organizational alignment',
        'Enhanced employee satisfaction',
        'Increased productivity',
        'Better strategic alignment'
      ],
      'training-development': [
        'Skilled and knowledgeable workforce',
        'Continuous learning culture',
        'Cost-effective training solutions',
        'Better employee retention',
        'Increased organizational agility'
      ],
      'employee-engagement': [
        'Higher employee satisfaction',
        'Increased productivity',
        'Stronger team cohesion',
        'Reduced turnover rate',
        'Better employee well-being'
      ],
      'hr-consulting-advisory': [
        'Strategic HR guidance',
        'Optimized HR functions',
        'Cost-effective HR solutions',
        'Risk mitigation',
        'Alignment with business goals'
      ],
    };

    const serviceChallenges = {
      'hr-compliance': [
        'Complex and changing regulations',
        'Risk of non-compliance penalties',
        'Difficulty in policy management',
        'Lack of in-house legal expertise',
        'Time-consuming statutory tasks'
      ],
      'recruitment-hiring': [
        'High cost per hire',
        'Lengthy recruitment cycles',
        'Poor candidate fit',
        'Lack of employer branding',
        'Manual screening inefficiencies'
      ],
      'onboarding-induction': [
        'Time-consuming process',
        'Lack of personal touch',
        'Difficulty in cultural adaptation',
        'Information overload',
        'Integration challenges'
      ],
      'employee-management': [
        'Data accuracy issues',
        'Complex leave management',
        'HRMS implementation challenges',
        'Policy enforcement difficulties',
        'Scalability concerns'
      ],
      'payroll-compliance': [
        'Manual calculation errors',
        'Complex TDS filing',
        'Incomplete documentation',
        'Time-consuming reconciliation',
        'Risk of penalties'
      ],
      'hr-policy-documentation': [
        'Policy update delays',
        'Lack of employee awareness',
        'Complex drafting process',
        'Incomplete coverage',
        'Maintenance challenges'
      ],
      'performance-management': [
        'Unclear KPIs',
        'Feedback resistance',
        'Misalignment with business goals',
        'Time-consuming process',
        'Lack of actionable insights'
      ],
      'training-development': [
        'Cost of training programs',
        'Lack of relevant content',
        'Difficulty in tracking engagement',
        'Scalability issues',
        'Lack of expert-led sessions'
      ],
      'employee-engagement': [
        'High attrition rate',
        'Lack of meaningful engagement',
        'Difficulty in measuring success',
        'Lack of creative engagement ideas',
        'Scalability challenges'
      ],
      'hr-consulting-advisory': [
        'Cost of HR consulting',
        'Difficulty in implementing changes',
        'Lack of immediate ROI',
        'Scalability concerns',
        'Risk of over-reliance'
      ],
    };

    const serviceWhoNeeds = {
      'hr-compliance': 'Startups, SMEs, and enterprises in India that want to ensure full legal compliance, avoid penalties, and build a safe, ethical workplace.',
      'recruitment-hiring': 'Startups, SMEs, and enterprises looking to scale teams quickly and efficiently, or struggling with high attrition and poor candidate fit.',
      'onboarding-induction': 'Newly established companies or those looking to streamline their onboarding process.',
      'employee-management': 'Organizations of all sizes looking to improve employee data accuracy, streamline HR processes, and reduce administrative burden.',
      'payroll-compliance': 'Companies of all industries looking to ensure accurate and timely payroll processing, compliance, and tax filing.',
      'hr-policy-documentation': 'Growing businesses and organizations requiring clear, compliant, and effective HR policies and documentation.',
      'performance-management': 'Companies aiming to improve employee performance, organizational alignment, and overall productivity.',
      'training-development': 'Organizations seeking to invest in their workforce, enhance skills, and foster a culture of continuous learning.',
      'employee-engagement': 'Companies wanting to foster a positive, motivated, and connected workforce, reduce turnover, and improve productivity.',
      'hr-consulting-advisory': 'Established businesses and startups looking for strategic HR guidance, optimization, and risk mitigation.',
    };

    const serviceBreadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
    ];

    const ServiceDetailPage = () => {
      const { serviceId } = useParams();
      const service = servicesData[serviceId];

      if (!service) {
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you are looking for does not exist or has been moved.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Home
              </Link>
            </Button>
          </div>
        );
      }

      const faqs = serviceFaqs[serviceId] || [];
      const related = relatedServices[serviceId] || [];
      const process = serviceProcess[serviceId] || [];
      const benefits = serviceBenefits[serviceId] || [];
      const challenges = serviceChallenges[serviceId] || [];
      const whoNeeds = serviceWhoNeeds[serviceId] || '';
      const breadcrumbs = [...serviceBreadcrumbs, { label: service.title, href: `/services/${serviceId}`, current: true }];

      // SEO meta and JSON-LD
      const pageTitle = `${service.title} | Virtual HR Services & Consulting`;
      const pageDesc = service.description + ' ' + (service.longDescription || '');
      const canonicalUrl = `https://hirewithprachi.com/services/${serviceId}`;
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': service.title,
        'description': pageDesc,
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Hire With Prachi',
          'founder': {
            '@type': 'Person',
            'name': 'Prachi Shrivastava',
            'jobTitle': 'Virtual HR Consultant'
          }
        },
        'serviceType': service.title,
        'areaServed': ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'],
        'offers': {
          '@type': 'Offer',
          'price': 'Contact for quote',
          'priceCurrency': 'INR'
        }
      };
      const faqJsonLd = faqs.length ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
        }))
      } : null;

      return (
        <>
          <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDesc} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDesc} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Hire With Prachi" />
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
          </Helmet>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, idx) => (
                <li key={crumb.href} className="flex items-center">
                  {idx > 0 && <span className="mx-2">/</span>}
                  {crumb.current ? (
                    <span className="font-semibold text-primary">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.href}>{crumb.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {/* On-page SEO Title & Intro Paragraph for all services */}
          <section className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">{service.title} in India</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0">
              {(() => {
                switch (serviceId) {
                  case 'hr-compliance':
                    return 'Ensure your business stays fully compliant with Indian labor laws, statutory regulations, and HR best practices. Our expert HR compliance services cover audits, policy drafting, legal risk assessment, and ongoing statutory support—helping you avoid costly penalties and build a safe, ethical workplace. Trusted by startups and SMEs across India, we deliver peace of mind and operational excellence for your HR compliance needs. Keywords: HR compliance, Indian labor law, statutory compliance, HR audits, legal risk, policy drafting, compliance training, India.';
                  case 'recruitment-hiring':
                    return 'Accelerate your talent acquisition with our strategic recruitment and hiring services. We specialize in sourcing, screening, and onboarding top talent for startups and SMEs, using advanced assessment tools and industry networks. Optimize your hiring process, reduce time-to-hire, and build a high-performing team. Keywords: recruitment, hiring, talent acquisition, candidate sourcing, job posting, resume screening, onboarding, India.';
                  case 'onboarding-induction':
                    return 'Deliver a seamless onboarding and induction experience for new hires. Our digital onboarding solutions ensure employees are engaged, informed, and productive from day one. We handle documentation, orientation, and cultural integration for a smooth transition. Keywords: onboarding, induction, new hire orientation, digital onboarding, employee integration, HR process, India.';
                  case 'employee-management':
                    return 'Streamline your HR operations with robust employee management systems. We implement and manage HRMS tools, attendance tracking, and employee data solutions to boost efficiency and compliance. Keywords: employee management, HRMS, attendance tracking, workforce data, HR automation, India.';
                  case 'payroll-compliance':
                    return 'Ensure accurate payroll processing and statutory compliance with our end-to-end payroll management services. We handle salary calculations, PF, ESI, TDS, and all legal filings, so you stay compliant and your employees are paid on time. Keywords: payroll, statutory compliance, salary processing, PF, ESI, TDS, payroll outsourcing, India.';
                  case 'hr-policy-documentation':
                    return 'Protect your business with clear, compliant HR policies and documentation. We draft, review, and update policies, contracts, and handbooks tailored to your organization, ensuring legal compliance and consistency. Keywords: HR policy, documentation, employee handbook, contract drafting, policy updates, compliance, India.';
                  case 'performance-management':
                    return 'Drive organizational growth with data-driven performance management systems. We design KPIs, OKRs, and appraisal cycles to boost productivity, engagement, and alignment with business goals. Keywords: performance management, KPIs, OKRs, appraisals, employee feedback, productivity, India.';
                  case 'training-development':
                    return 'Empower your workforce with custom training and development programs. We offer virtual workshops, e-learning, and leadership training to upskill employees and foster a culture of continuous learning. Keywords: training, development, e-learning, upskilling, leadership training, HR learning, India.';
                  case 'employee-engagement':
                    return 'Boost morale and retention with creative employee engagement initiatives. We organize team-building, recognition programs, and wellness activities to create a motivated, connected workforce. Keywords: employee engagement, team building, recognition, wellness, HR programs, India.';
                  case 'hr-consulting-advisory':
                    return 'Get expert HR consulting and advisory services to optimize your HR strategy, structure, and compliance. We provide audits, change management, and best practices for startups and established businesses. Keywords: HR consulting, advisory, HR audit, change management, HR strategy, India.';
                  default:
                    return service.description;
                }
              })()}
            </p>
          </section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12 md:py-20"
            as="main"
          >
            <div className="max-w-4xl mx-auto">
              <header className="mb-10 md:mb-12 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                  <div className="p-4 bg-primary/10 rounded-full">{service.icon}</div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary">{service.title}</h1>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </header>
              <article className="prose prose-lg max-w-none dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 border-b pb-2 border-border">What We Offer</h2>
                <p className="text-muted-foreground">{service.longDescription}</p>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">Key Deliverables:</h3>
                <ul className="space-y-3">
                  {service.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                {whoNeeds && (
                  <>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">Who Needs This Service?</h3>
                    <p>{whoNeeds}</p>
                  </>
                )}
                {process.length > 0 && (
                  <>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">How Our {service.title} Works</h3>
                    <ol className="list-decimal ml-6">
                      {process.map((step, idx) => <li key={idx}>{step}</li>)}
                    </ol>
                  </>
                )}
                {benefits.length > 0 && (
                  <>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">Benefits of {service.title}</h3>
                    <ul className="list-disc ml-6">
                      {benefits.map((b, idx) => <li key={idx}>{b}</li>)}
                    </ul>
                  </>
                )}
                {challenges.length > 0 && (
                  <>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">Common Challenges Solved</h3>
                    <ul className="list-disc ml-6">
                      {challenges.map((c, idx) => <li key={idx}>{c}</li>)}
                    </ul>
                  </>
                )}
              </article>
              {faqs.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <details key={idx} className="border rounded-lg p-4">
                        <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                        <p className="mt-2 text-muted-foreground">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
              {related.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Related Services</h2>
                  <ul className="flex flex-wrap gap-4">
                    {related.map((relId) => (
                      <li key={relId}>
                        <Link to={`/services/${relId}`} className="text-primary underline">
                          {servicesData[relId]?.title || relId}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <div className="mt-12 p-8 bg-muted rounded-xl shadow-lg border border-border">
                <h2 className="text-2xl font-semibold text-center text-foreground mb-6">Interested in {service.title}?</h2>
                <p className="text-center text-muted-foreground mb-8">
                  Fill out the inquiry form below and our team will contact you for a personalized consultation.
                </p>
                <form
                  onSubmit={async e => {
                    e.preventDefault();
                    // Replace YOUR_FORM_ID with your real Formspree form ID
                    const formData = new FormData(e.target);
                    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                      method: 'POST',
                      body: formData,
                      headers: { 'Accept': 'application/json' },
                    });
                    e.target.reset();
                    alert('Thank you! We will contact you soon.');
                  }}
                  className="max-w-xl mx-auto flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input name="name" type="text" placeholder="Your Name" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input name="email" type="email" placeholder="Your Email" required className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <input name="phone" type="tel" placeholder="Phone (optional)" className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
                  <textarea name="message" placeholder="Tell us about your HR needs..." rows={4} required className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
                  <button type="submit" className="mt-2 px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary/90 transition">Send Inquiry</button>
                </form>
              </div>
              <div className="mt-16 text-center">
                <img
                  className="max-w-md md:max-w-lg mx-auto rounded-lg shadow-xl"
                  alt={`Infographic related to ${service.title}, showing process flow or benefits.`}
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </>
      );
    };

    export default ServiceDetailPage;