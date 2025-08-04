import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Briefcase, DollarSign, Settings, Award, Zap, MessageSquare, BarChart2, KeyRound as UsersRound, UserPlus, FileSpreadsheet, HeartHandshake as Handshake, Brain, Presentation, Smile, Search, Info, Shield, TrendingUp, Globe, Clock, Star, Target, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const servicesData = [
  { id: 'recruitment-hiring', icon: <Search className="h-10 w-10 text-primary mb-4" />, title: 'Recruitment & Hiring', description: 'Finding the right talent for your organization.', items: ['Job Posting & Advertisement', 'Resume Screening', 'Interview Coordination', 'Candidate Assessment', 'Background Verification'], color: 'from-blue-500 to-cyan-500' },
  { id: 'onboarding-induction', icon: <UserPlus className="h-10 w-10 text-primary mb-4" />, title: 'Onboarding & Induction', description: 'Seamless integration of new hires.', items: ['Digital Onboarding Process', 'Induction Sessions', 'Documentation Management'], color: 'from-green-500 to-emerald-500' },
  { id: 'employee-management', icon: <UsersRound className="h-10 w-10 text-primary mb-4" />, title: 'Employee Management', description: 'Efficiently manage your workforce.', items: ['Employee Database Management', 'Attendance & Leave Tracking', 'HRMS Setup & Management'], color: 'from-purple-500 to-pink-500' },
  { id: 'payroll-compliance', icon: <FileSpreadsheet className="h-10 w-10 text-primary mb-4" />, title: 'Payroll & Compliance', description: 'Accurate payroll and statutory compliance.', items: ['Payroll Processing', 'Compliance Management (PF, ESI, TDS, etc.)', 'Salary Slip Generation'], color: 'from-orange-500 to-red-500' },
  { id: 'hr-policy-documentation', icon: <FileText className="h-10 w-10 text-primary mb-4" />, title: 'HR Policy & Documentation', description: 'Crafting essential HR documents and policies.', items: ['Policy Drafting (Leave, WFH, Code of Conduct)', 'Employment Contracts', 'HR Handbook Creation'], color: 'from-indigo-500 to-purple-500' },
  { id: 'performance-management', icon: <BarChart2 className="h-10 w-10 text-primary mb-4" />, title: 'Performance Management', description: 'Driving employee performance and growth.', items: ['KPI/OKR Setup', 'Appraisal Cycle Management', 'Employee Feedback Surveys'], color: 'from-teal-500 to-cyan-500' },
  { id: 'training-development', icon: <Brain className="h-10 w-10 text-primary mb-4" />, title: 'Training & Development', description: 'Upskilling your workforce for success.', items: ['L&D Programs Organization', 'Soft Skills & Leadership Training', 'E-learning Solutions Setup'], color: 'from-violet-500 to-purple-500' },
  { id: 'employee-engagement', icon: <Smile className="h-10 w-10 text-primary mb-4" />, title: 'Employee Engagement', description: 'Fostering a positive and engaged work environment.', items: ['Virtual Team Building Activities', 'Celebrations & Recognition Programs', 'Mental Health & Wellness Programs'], color: 'from-pink-500 to-rose-500' },
  { id: 'hr-consulting-advisory', icon: <Handshake className="h-10 w-10 text-primary mb-4" />, title: 'HR Consulting & Advisory', description: 'Strategic HR guidance for business growth.', items: ['HR Audit & Improvement Reports', 'Organization Structuring', 'Startup HR Setup (End-to-End)'], color: 'from-amber-500 to-orange-500' },
  { id: 'remote-work-solutions', icon: <Globe className="h-10 w-10 text-primary mb-4" />, title: 'Remote Work Solutions', description: 'Optimize your distributed workforce.', items: ['Hybrid Work Policies', 'Virtual Team Management', 'Remote Culture Building'], color: 'from-sky-500 to-blue-500' },
  { id: 'ai-hr-analytics', icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />, title: 'AI HR Analytics', description: 'Data-driven insights for better decisions.', items: ['People Analytics Dashboard', 'Predictive Turnover Modeling', 'Workforce Planning AI'], color: 'from-emerald-500 to-green-500' },
  { id: 'compliance-legal', icon: <Shield className="h-10 w-10 text-primary mb-4" />, title: 'Compliance & Legal', description: 'Stay ahead of regulatory requirements.', items: ['GDPR Compliance Auditing', 'Employment Law Updates', 'Risk Assessment Tools'], color: 'from-red-500 to-pink-500' },
  { id: 'hr-technology-integration', icon: <Building2 className="h-10 w-10 text-primary mb-4" />, title: 'HR Technology Integration', description: 'Seamless HR system implementation and optimization.', items: ['HRMS Selection & Setup', 'System Integration Services', 'Digital Transformation Consulting'], color: 'from-slate-500 to-gray-500' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Comprehensive Solutions</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Our Comprehensive HR Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From talent acquisition to employee retention, we offer a full suite of virtual HR services. 
            Each solution is customized to your specific business needs, ensuring efficiency and compliance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="h-full group"
            >
              <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200/50 hover:border-primary/30 transform hover:-translate-y-2 relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardHeader className="items-center text-center relative z-10 pb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 mb-3`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 h-10 flex items-center">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow relative z-10 px-6">
                  <ul className="space-y-2 text-sm text-gray-600">
                    {service.items.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mt-2 mr-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300`}></div>
                        <span className="group-hover/item:text-gray-900 transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                    {service.items.length > 3 && (
                      <li className="flex items-start text-xs text-primary/80 group/item">
                        <Info className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                        And {service.items.length - 3} more features...
                      </li>
                    )}
                  </ul>
                </CardContent>
                
                <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-gray-100 relative z-10 px-6 pb-4">
                  <Button asChild variant="link" size="sm" className="text-primary hover:text-primary/80 mb-2 sm:mb-0 group-hover:underline">
                    <Link to={`/services/${service.id}`}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <a href="#contact">Get Quote</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: servicesData.length * 0.05 + 0.2 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Don't see exactly what you need?</h3>
            </div>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We specialize in creating custom HR solutions tailored to your unique business requirements. 
              Let's build something perfect together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4">
                <a href="#contact">
                  Request a Custom HR Package
                  <MessageSquare className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-8 py-4">
                <a href="/contact">
                  Book Free Consultation
                  <Clock className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;