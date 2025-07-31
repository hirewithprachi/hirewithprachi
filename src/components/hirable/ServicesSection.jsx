import React from 'react';
import { Users, Shield, Clock, Award, Star, Check, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Recruitment & Hiring",
    description: "End-to-end recruitment solutions from job posting to onboarding",
    features: ["Job Posting", "Resume Screening", "Interview Coordination", "Background Verification"]
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Payroll & Compliance",
    description: "Accurate payroll processing and regulatory compliance management",
    features: ["Payroll Processing", "Tax Compliance", "Statutory Filings", "Salary Structure"]
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Employee Management",
    description: "Comprehensive employee lifecycle management solutions",
    features: ["HRMS Setup", "Attendance Tracking", "Leave Management", "Performance Reviews"]
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "HR Policy & Documentation",
    description: "Create comprehensive HR policies and employee handbooks",
    features: ["Policy Creation", "Employee Handbook", "Contract Templates", "Compliance Documents"]
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Training & Development",
    description: "Skill development programs and learning management",
    features: ["Training Programs", "Skill Assessment", "Leadership Development", "E-learning Platforms"]
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Employee Engagement",
    description: "Boost workplace culture and employee satisfaction",
    features: ["Engagement Surveys", "Team Building", "Recognition Programs", "Wellness Initiatives"]
  }
];

const ServicesSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Comprehensive HR
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Services</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From recruitment to compliance, we provide end-to-end HR solutions
          tailored to your business needs and growth stage.
        </p>
      </div>
      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <div className="text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-300 flex items-center">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      {/* Custom Package CTA */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom HR Package?</h3>
          <p className="text-gray-600 mb-6">Get a tailored solution that fits your specific business requirements</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            Request Custom Quote
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection; 