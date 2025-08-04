import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, MapPin, Briefcase, GraduationCap, DollarSign, Download, Share2, User, Mail, Phone, Building, ArrowLeft, Star, CheckCircle, Award, Shield, ArrowRight, Heart, Target, Zap, AlertCircle, BarChart3, TrendingDown } from 'lucide-react';
import { formSubmission } from '../lib/supabase';
import SearchableDropdown from './SearchableDropdown';
import { downloadCalculatorPDF, shareCalculatorResult } from '../lib/html2pdfGenerator';
import ShareResultModal from './ShareResultModal';

export default function SalaryCalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: '',
    experience: '1-3',
    location: '',
    industry: '',
    education: 'bachelor',
    companySize: 'small',
    skills: []
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    employees: ''
  });
  const [crmError, setCrmError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Enhanced salary data with industry multipliers and skills bonuses
  const salaryData = {
    positions: {
      // Senior HR Positions
      'HR Director': { base: 1800000, range: 1400000, max: 2500000 },
      'HR Head': { base: 1500000, range: 1200000, max: 2000000 },
      'VP HR': { base: 2500000, range: 2000000, max: 3500000 },
      'CHRO': { base: 3500000, range: 2800000, max: 5000000 },
      
      // Mid-Level HR Positions
      'HR Manager': { base: 900000, range: 700000, max: 1300000 },
      'Senior HR Manager': { base: 1100000, range: 850000, max: 1500000 },
      'HR Business Partner': { base: 850000, range: 650000, max: 1200000 },
      'Talent Acquisition Manager': { base: 800000, range: 600000, max: 1100000 },
      'Compensation & Benefits Manager': { base: 950000, range: 750000, max: 1300000 },
      'Learning & Development Manager': { base: 850000, range: 650000, max: 1200000 },
      'Employee Relations Manager': { base: 800000, range: 600000, max: 1100000 },
      'HR Operations Manager': { base: 750000, range: 550000, max: 1000000 },
      
      // Junior HR Positions
      'HR Generalist': { base: 600000, range: 450000, max: 850000 },
      'Senior HR Generalist': { base: 750000, range: 550000, max: 1000000 },
      'HR Coordinator': { base: 500000, range: 350000, max: 700000 },
      'HR Assistant': { base: 350000, range: 250000, max: 500000 },
      'HR Executive': { base: 450000, range: 300000, max: 650000 },
      
      // Recruitment Positions
      'Recruiter': { base: 550000, range: 400000, max: 800000 },
      'Senior Recruiter': { base: 700000, range: 500000, max: 950000 },
      'Technical Recruiter': { base: 650000, range: 450000, max: 900000 },
      'Recruitment Coordinator': { base: 400000, range: 300000, max: 600000 },
      'Sourcing Specialist': { base: 500000, range: 350000, max: 750000 },
      
      // Specialized HR Positions
      'Compensation Analyst': { base: 750000, range: 550000, max: 1000000 },
      'Senior Compensation Analyst': { base: 900000, range: 700000, max: 1200000 },
      'Benefits Specialist': { base: 650000, range: 450000, max: 900000 },
      'Senior Benefits Specialist': { base: 800000, range: 600000, max: 1100000 },
      'HRIS Specialist': { base: 700000, range: 500000, max: 950000 },
      'Senior HRIS Specialist': { base: 850000, range: 650000, max: 1100000 },
      'Learning Specialist': { base: 600000, range: 400000, max: 850000 },
      'Senior Learning Specialist': { base: 750000, range: 550000, max: 1000000 },
      'Employee Engagement Specialist': { base: 550000, range: 400000, max: 800000 },
      'Diversity & Inclusion Specialist': { base: 650000, range: 450000, max: 900000 },
      'HR Analytics Specialist': { base: 800000, range: 600000, max: 1100000 },
      'Senior HR Analytics Specialist': { base: 950000, range: 750000, max: 1300000 },
      
      // Compliance & Legal
      'HR Compliance Specialist': { base: 700000, range: 500000, max: 950000 },
      'Senior HR Compliance Specialist': { base: 850000, range: 650000, max: 1100000 },
      'Labor Relations Specialist': { base: 750000, range: 550000, max: 1000000 },
      'Senior Labor Relations Specialist': { base: 900000, range: 700000, max: 1200000 },
      
      // International HR
      'International HR Manager': { base: 1200000, range: 900000, max: 1600000 },
      'Global Mobility Specialist': { base: 800000, range: 600000, max: 1100000 },
      'Expatriate Management Specialist': { base: 750000, range: 550000, max: 1000000 }
    },
    experienceMultipliers: {
      '0-1': 0.8,
      '1-3': 1.0,
      '3-5': 1.2,
      '5-8': 1.4,
      '8-10': 1.6,
      '10+': 1.8
    },
    locationMultipliers: {
      // Tier 1 Cities (High Cost of Living)
      'Mumbai': 1.35,
      'Delhi': 1.30,
      'Bangalore': 1.25,
      'Hyderabad': 1.20,
      'Chennai': 1.15,
      'Pune': 1.10,
      'Gurgaon': 1.25,
      'Noida': 1.20,
      'Ahmedabad': 1.05,
      'Kolkata': 1.10,
      
      // Tier 2 Cities (Medium Cost of Living)
      'Chandigarh': 1.00,
      'Jaipur': 0.95,
      'Lucknow': 0.90,
      'Indore': 0.90,
      'Bhopal': 0.85,
      'Nagpur': 0.85,
      'Vadodara': 0.90,
      'Surat': 0.95,
      'Coimbatore': 0.90,
      'Vishakhapatnam': 0.85,
      'Bhubaneswar': 0.85,
      'Guwahati': 0.80,
      'Patna': 0.80,
      'Ranchi': 0.80,
      'Dehradun': 0.85,
      'Shimla': 0.85,
      'Srinagar': 0.80,
      'Jammu': 0.80,
      'Amritsar': 0.85,
      'Ludhiana': 0.85,
      'Kanpur': 0.85,
      'Varanasi': 0.80,
      'Allahabad': 0.80,
      'Bareilly': 0.75,
      'Agra': 0.80,
      'Meerut': 0.85,
      'Ghaziabad': 0.90,
      'Faridabad': 0.90,
      'Greater Noida': 0.85,
      'Sonipat': 0.80,
      'Panipat': 0.80,
      'Karnal': 0.80,
      'Rohtak': 0.80,
      'Hisar': 0.75,
      'Bhiwani': 0.75,
      'Rewari': 0.75,
      'Gurugram': 1.25,
      'New Delhi': 1.30,
      'Old Delhi': 1.25,
      'Dwarka': 1.20,
      'Rohini': 1.20,
      'Pitampura': 1.20,
      'Janakpuri': 1.20,
      'Rajouri Garden': 1.20,
      'Hauz Khas': 1.25,
      'Green Park': 1.25,
      'Saket': 1.25,
      'Vasant Vihar': 1.30,
      'Vasant Kunj': 1.25,
      'Dwarka Sector': 1.20,
      'Noida Sector': 1.20,
      'Greater Noida Sector': 0.85,
      'Gurgaon Sector': 1.25,
      'Faridabad Sector': 0.90,
      'Ghaziabad Sector': 0.90,
      'Other': 0.75
    },
    educationMultipliers: {
      'high_school': 0.85,
      'diploma': 0.90,
      'bachelor': 1.0,
      'bachelor_honors': 1.05,
      'master': 1.15,
      'mba': 1.25,
      'masters_hr': 1.20,
      'masters_business': 1.20,
      'phd': 1.35,
      'certification': 1.10,
      'pg_diploma': 1.15
    },
    companySizeMultipliers: {
      'startup': 0.9,
      'small': 1.0,
      'medium': 1.1,
      'large': 1.2,
      'enterprise': 1.3
    },
    industryMultipliers: {
      // High-Paying Industries
      'technology': 1.30,
      'fintech': 1.35,
      'finance': 1.25,
      'investment_banking': 1.40,
      'consulting': 1.20,
      'management_consulting': 1.25,
      'strategy_consulting': 1.30,
      'healthcare': 1.20,
      'pharmaceuticals': 1.25,
      'biotechnology': 1.30,
      'oil_gas': 1.25,
      'mining': 1.20,
      'real_estate': 1.15,
      'construction': 1.10,
      
      // Medium-Paying Industries
      'manufacturing': 1.05,
      'automotive': 1.10,
      'aerospace': 1.15,
      'defense': 1.20,
      'telecommunications': 1.15,
      'media_entertainment': 1.10,
      'advertising': 1.05,
      'marketing': 1.05,
      'retail': 1.00,
      'ecommerce': 1.10,
      'logistics': 1.05,
      'transportation': 1.00,
      'hospitality': 0.95,
      'tourism': 0.95,
      'food_beverage': 0.95,
      'fashion': 1.00,
      'luxury': 1.15,
      
      // Education & Non-Profit
      'education': 0.90,
      'edtech': 1.10,
      'non_profit': 0.85,
      'ngo': 0.85,
      'government': 0.95,
      'public_sector': 0.95,
      
      // Other Industries
      'agriculture': 0.85,
      'textiles': 0.90,
      'chemicals': 1.05,
      'energy': 1.15,
      'renewable_energy': 1.10,
      'utilities': 1.05,
      'insurance': 1.10,
      'banking': 1.15,
      'accounting': 1.05,
      'legal': 1.20,
      'law': 1.20,
      'research': 1.10,
      'academic': 0.90,
      'startup': 1.05,
      'scaleup': 1.10,
      'unicorn': 1.25,
      'other': 1.00
    },
    skillsBonuses: {
      // HRIS & Technology Skills
      'Workday': 100000,
      'SAP SuccessFactors': 90000,
      'SAP HCM': 85000,
      'Oracle HCM': 80000,
      'BambooHR': 60000,
      'ADP': 70000,
      'Kronos': 65000,
      'UltiPro': 75000,
      'Ceridian': 70000,
      'Paycom': 65000,
      'Paychex': 60000,
      'Gusto': 55000,
      'Zenefits': 50000,
      'Namely': 55000,
      'Justworks': 50000,
      'Rippling': 60000,
      'Deel': 65000,
      'Remote': 60000,
      'Oyster': 55000,
      'Papaya Global': 60000,
      
      // Analytics & Data Skills
      'HR Analytics': 80000,
      'People Analytics': 85000,
      'Data Analysis': 70000,
      'Tableau': 75000,
      'Power BI': 70000,
      'Excel Advanced': 50000,
      'SQL': 65000,
      'Python': 80000,
      'R Programming': 75000,
      'Statistical Analysis': 70000,
      'Predictive Analytics': 90000,
      'Machine Learning': 95000,
      'AI in HR': 90000,
      
      // Recruitment & Talent Acquisition
      'ATS Management': 60000,
      'LinkedIn Recruiter': 55000,
      'Boolean Search': 50000,
      'Technical Recruiting': 70000,
      'Executive Search': 80000,
      'Campus Recruitment': 55000,
      'Diversity Hiring': 65000,
      'Employer Branding': 60000,
      'Candidate Experience': 55000,
      'Recruitment Marketing': 60000,
      'Talent Sourcing': 65000,
      'Interview Techniques': 50000,
      'Assessment Centers': 60000,
      'Psychometric Testing': 65000,
      
      // Compensation & Benefits
      'Compensation Design': 75000,
      'Salary Benchmarking': 65000,
      'Equity Compensation': 80000,
      'Benefits Administration': 60000,
      'Total Rewards': 70000,
      'Performance Management': 65000,
      'Merit Planning': 60000,
      'Variable Pay': 65000,
      'Sales Compensation': 70000,
      'Executive Compensation': 85000,
      'Benefits Strategy': 65000,
      'Wellness Programs': 55000,
      'Retirement Plans': 60000,
      'Health Benefits': 55000,
      
      // Learning & Development
      'Instructional Design': 65000,
      'E-Learning': 60000,
      'Training Needs Analysis': 55000,
      'Leadership Development': 70000,
      'Coaching': 65000,
      'Mentoring Programs': 55000,
      'Succession Planning': 70000,
      'Career Development': 60000,
      'Learning Management Systems': 60000,
      'Articulate Storyline': 55000,
      'Camtasia': 50000,
      'Adobe Captivate': 55000,
      'Virtual Training': 55000,
      'Blended Learning': 55000,
      
      // Compliance & Legal
      'Labor Law': 70000,
      'Employment Law': 70000,
      'Compliance Management': 65000,
      'Audit Management': 60000,
      'Policy Development': 55000,
      'Employee Relations': 60000,
      'Dispute Resolution': 65000,
      'Grievance Handling': 55000,
      'Workplace Investigations': 65000,
      'Diversity & Inclusion': 65000,
      'Harassment Prevention': 60000,
      'Safety Compliance': 55000,
      'OSHA': 55000,
      'ISO Standards': 60000,
      
      // International HR
      'Global Mobility': 75000,
      'Expatriate Management': 70000,
      'International Labor Law': 75000,
      'Cross-cultural Training': 60000,
      'Visa Management': 55000,
      'International Benefits': 65000,
      'Global Compensation': 75000,
      'International Recruitment': 70000,
      'Cultural Intelligence': 55000,
      'International Payroll': 60000,
      
      // Specialized Skills
      'Change Management': 70000,
      'Organizational Development': 75000,
      'Strategic HR': 80000,
      'HR Transformation': 85000,
      'Digital HR': 75000,
      'HR Automation': 70000,
      'Process Improvement': 60000,
      'Project Management': 65000,
      'Agile HR': 60000,
      'Design Thinking': 55000,
      'Employee Experience': 65000,
      'Workplace Culture': 60000,
      'Employee Engagement': 60000,
      'Performance Consulting': 70000,
      'HR Business Partnering': 70000,
      'Stakeholder Management': 60000,
      'Communication Skills': 50000,
      'Negotiation': 55000,
      'Conflict Resolution': 55000,
      'Team Building': 50000
    },
    marketTrends: {
      // Senior HR Positions
      'CHRO': { trend: 'up', percentage: 12.5 },
      'VP HR': { trend: 'up', percentage: 11.8 },
      'HR Director': { trend: 'up', percentage: 10.2 },
      'HR Head': { trend: 'up', percentage: 9.8 },
      
      // Mid-Level HR Positions
      'HR Manager': { trend: 'up', percentage: 8.5 },
      'Senior HR Manager': { trend: 'up', percentage: 9.2 },
      'HR Business Partner': { trend: 'up', percentage: 9.8 },
      'Talent Acquisition Manager': { trend: 'up', percentage: 10.5 },
      'Compensation & Benefits Manager': { trend: 'up', percentage: 8.9 },
      'Learning & Development Manager': { trend: 'up', percentage: 7.8 },
      'Employee Relations Manager': { trend: 'up', percentage: 7.2 },
      'HR Operations Manager': { trend: 'up', percentage: 6.8 },
      
      // Junior HR Positions
      'HR Generalist': { trend: 'up', percentage: 6.2 },
      'Senior HR Generalist': { trend: 'up', percentage: 7.1 },
      'HR Coordinator': { trend: 'stable', percentage: 3.1 },
      'HR Assistant': { trend: 'stable', percentage: 2.8 },
      'HR Executive': { trend: 'up', percentage: 4.2 },
      
      // Recruitment Positions
      'Recruiter': { trend: 'up', percentage: 7.8 },
      'Senior Recruiter': { trend: 'up', percentage: 8.9 },
      'Technical Recruiter': { trend: 'up', percentage: 9.5 },
      'Recruitment Coordinator': { trend: 'up', percentage: 5.2 },
      'Sourcing Specialist': { trend: 'up', percentage: 6.8 },
      
      // Specialized HR Positions
      'Compensation Analyst': { trend: 'up', percentage: 7.5 },
      'Senior Compensation Analyst': { trend: 'up', percentage: 8.8 },
      'Benefits Specialist': { trend: 'up', percentage: 6.8 },
      'Senior Benefits Specialist': { trend: 'up', percentage: 7.9 },
      'HRIS Specialist': { trend: 'up', percentage: 8.2 },
      'Senior HRIS Specialist': { trend: 'up', percentage: 9.1 },
      'Learning Specialist': { trend: 'up', percentage: 6.5 },
      'Senior Learning Specialist': { trend: 'up', percentage: 7.8 },
      'Employee Engagement Specialist': { trend: 'up', percentage: 8.5 },
      'Diversity & Inclusion Specialist': { trend: 'up', percentage: 9.2 },
      'HR Analytics Specialist': { trend: 'up', percentage: 11.5 },
      'Senior HR Analytics Specialist': { trend: 'up', percentage: 12.8 },
      
      // Compliance & Legal
      'HR Compliance Specialist': { trend: 'up', percentage: 7.8 },
      'Senior HR Compliance Specialist': { trend: 'up', percentage: 8.9 },
      'Labor Relations Specialist': { trend: 'up', percentage: 6.5 },
      'Senior Labor Relations Specialist': { trend: 'up', percentage: 7.8 },
      
      // International HR
      'International HR Manager': { trend: 'up', percentage: 9.8 },
      'Global Mobility Specialist': { trend: 'up', percentage: 8.9 },
      'Expatriate Management Specialist': { trend: 'up', percentage: 7.8 }
    }
  };

  const allSkills = [
    // HRIS & Technology
    'Workday', 'SAP SuccessFactors', 'SAP HCM', 'Oracle HCM', 'BambooHR', 'ADP', 'Kronos', 'UltiPro',
    'Ceridian', 'Paycom', 'Paychex', 'Gusto', 'Zenefits', 'Namely', 'Justworks', 'Rippling',
    'Deel', 'Remote', 'Oyster', 'Papaya Global',
    
    // Analytics & Data
    'HR Analytics', 'People Analytics', 'Data Analysis', 'Tableau', 'Power BI', 'Excel Advanced',
    'SQL', 'Python', 'R Programming', 'Statistical Analysis', 'Predictive Analytics',
    'Machine Learning', 'AI in HR',
    
    // Recruitment & Talent
    'ATS Management', 'LinkedIn Recruiter', 'Boolean Search', 'Technical Recruiting',
    'Executive Search', 'Campus Recruitment', 'Diversity Hiring', 'Employer Branding',
    'Candidate Experience', 'Recruitment Marketing', 'Talent Sourcing', 'Interview Techniques',
    'Assessment Centers', 'Psychometric Testing',
    
    // Compensation & Benefits
    'Compensation Design', 'Salary Benchmarking', 'Equity Compensation', 'Benefits Administration',
    'Total Rewards', 'Performance Management', 'Merit Planning', 'Variable Pay',
    'Sales Compensation', 'Executive Compensation', 'Benefits Strategy', 'Wellness Programs',
    'Retirement Plans', 'Health Benefits',
    
    // Learning & Development
    'Instructional Design', 'E-Learning', 'Training Needs Analysis', 'Leadership Development',
    'Coaching', 'Mentoring Programs', 'Succession Planning', 'Career Development',
    'Learning Management Systems', 'Articulate Storyline', 'Camtasia', 'Adobe Captivate',
    'Virtual Training', 'Blended Learning',
    
    // Compliance & Legal
    'Labor Law', 'Employment Law', 'Compliance Management', 'Audit Management',
    'Policy Development', 'Employee Relations', 'Dispute Resolution', 'Grievance Handling',
    'Workplace Investigations', 'Diversity & Inclusion', 'Harassment Prevention',
    'Safety Compliance', 'OSHA', 'ISO Standards',
    
    // International HR
    'Global Mobility', 'Expatriate Management', 'International Labor Law', 'Cross-cultural Training',
    'Visa Management', 'International Benefits', 'Global Compensation', 'International Recruitment',
    'Cultural Intelligence', 'International Payroll',
    
    // Specialized Skills
    'Change Management', 'Organizational Development', 'Strategic HR', 'HR Transformation',
    'Digital HR', 'HR Automation', 'Process Improvement', 'Project Management', 'Agile HR',
    'Design Thinking', 'Employee Experience', 'Workplace Culture', 'Employee Engagement',
    'Performance Consulting', 'HR Business Partnering', 'Stakeholder Management',
    'Communication Skills', 'Negotiation', 'Conflict Resolution', 'Team Building'
  ];

  // Show only first 12 skills initially
  const [showAllSkills, setShowAllSkills] = useState(false);
  const availableSkills = showAllSkills ? allSkills : allSkills.slice(0, 12);

  // Position options for searchable dropdown
  const positionOptions = [
    // Senior HR Positions
    'CHRO (Chief Human Resources Officer)',
    'VP HR (Vice President HR)',
    'HR Director',
    'HR Head',
    
    // Mid-Level HR Positions
    'HR Manager',
    'Senior HR Manager',
    'HR Business Partner',
    'Talent Acquisition Manager',
    'Compensation & Benefits Manager',
    'Learning & Development Manager',
    'Employee Relations Manager',
    'HR Operations Manager',
    
    // Junior HR Positions
    'HR Generalist',
    'Senior HR Generalist',
    'HR Coordinator',
    'HR Assistant',
    'HR Executive',
    
    // Recruitment Positions
    'Recruiter',
    'Senior Recruiter',
    'Technical Recruiter',
    'Recruitment Coordinator',
    'Sourcing Specialist',
    
    // Specialized HR Positions
    'Compensation Analyst',
    'Senior Compensation Analyst',
    'Benefits Specialist',
    'Senior Benefits Specialist',
    'HRIS Specialist',
    'Senior HRIS Specialist',
    'Learning Specialist',
    'Senior Learning Specialist',
    'Employee Engagement Specialist',
    'Diversity & Inclusion Specialist',
    'HR Analytics Specialist',
    'Senior HR Analytics Specialist',
    
    // Compliance & Legal
    'HR Compliance Specialist',
    'Senior HR Compliance Specialist',
    'Labor Relations Specialist',
    'Senior Labor Relations Specialist',
    
    // International HR
    'International HR Manager',
    'Global Mobility Specialist',
    'Expatriate Management Specialist'
  ];

  // Location options for searchable dropdown
  const locationOptions = [
    // Tier 1 Cities
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Gurgaon', 'Noida', 'Ahmedabad', 'Kolkata',
    
    // Tier 2 Cities
    'Chandigarh', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Nagpur', 'Vadodara', 'Surat', 'Coimbatore', 'Vishakhapatnam',
    'Bhubaneswar', 'Guwahati', 'Patna', 'Ranchi', 'Dehradun', 'Shimla', 'Srinagar', 'Jammu', 'Amritsar', 'Ludhiana',
    'Kanpur', 'Varanasi', 'Allahabad', 'Bareilly', 'Agra', 'Meerut', 'Ghaziabad', 'Faridabad', 'Greater Noida',
    'Sonipat', 'Panipat', 'Karnal', 'Rohtak', 'Hisar', 'Bhiwani', 'Rewari', 'Gurugram', 'New Delhi', 'Old Delhi',
    'Dwarka', 'Rohini', 'Pitampura', 'Janakpuri', 'Rajouri Garden', 'Hauz Khas', 'Green Park', 'Saket',
    'Vasant Vihar', 'Vasant Kunj', 'Dwarka Sector', 'Noida Sector', 'Greater Noida Sector', 'Gurgaon Sector',
    'Faridabad Sector', 'Ghaziabad Sector', 'Other'
  ];

  // Industry options for searchable dropdown
  const industryOptions = [
    // High-Paying Industries
    'Technology', 'Fintech', 'Finance', 'Investment Banking', 'Consulting', 'Management Consulting',
    'Strategy Consulting', 'Healthcare', 'Pharmaceuticals', 'Biotechnology', 'Oil & Gas', 'Mining',
    'Real Estate', 'Construction',
    
    // Medium-Paying Industries
    'Manufacturing', 'Automotive', 'Aerospace', 'Defense', 'Telecommunications', 'Media & Entertainment',
    'Advertising', 'Marketing', 'Retail', 'E-commerce', 'Logistics', 'Transportation', 'Hospitality',
    'Tourism', 'Food & Beverage', 'Fashion', 'Luxury',
    
    // Education & Non-Profit
    'Education', 'EdTech', 'Non-Profit', 'NGO', 'Government', 'Public Sector',
    
    // Other Industries
    'Agriculture', 'Textiles', 'Chemicals', 'Energy', 'Renewable Energy', 'Utilities', 'Insurance',
    'Banking', 'Accounting', 'Legal', 'Law', 'Research', 'Academic', 'Startup', 'Scale-up', 'Unicorn', 'Other'
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!formData.position) {
      errors.position = 'Please select a position';
    }
    if (!formData.location) {
      errors.location = 'Please select a location';
    }
    if (!formData.industry) {
      errors.industry = 'Please select an industry';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleLeadInputChange = (field, value) => {
    setLeadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to map display names to position keys
  const getPositionKey = (displayName) => {
    const positionMap = {
      'CHRO (Chief Human Resources Officer)': 'CHRO',
      'VP HR (Vice President HR)': 'VP HR',
      'HR Director': 'HR Director',
      'HR Head': 'HR Head',
      'HR Manager': 'HR Manager',
      'Senior HR Manager': 'Senior HR Manager',
      'HR Business Partner': 'HR Business Partner',
      'Talent Acquisition Manager': 'Talent Acquisition Manager',
      'Compensation & Benefits Manager': 'Compensation & Benefits Manager',
      'Learning & Development Manager': 'Learning & Development Manager',
      'Employee Relations Manager': 'Employee Relations Manager',
      'HR Operations Manager': 'HR Operations Manager',
      'HR Generalist': 'HR Generalist',
      'Senior HR Generalist': 'Senior HR Generalist',
      'HR Coordinator': 'HR Coordinator',
      'HR Assistant': 'HR Assistant',
      'HR Executive': 'HR Executive',
      'Recruiter': 'Recruiter',
      'Senior Recruiter': 'Senior Recruiter',
      'Technical Recruiter': 'Technical Recruiter',
      'Recruitment Coordinator': 'Recruitment Coordinator',
      'Sourcing Specialist': 'Sourcing Specialist',
      'Compensation Analyst': 'Compensation Analyst',
      'Senior Compensation Analyst': 'Senior Compensation Analyst',
      'Benefits Specialist': 'Benefits Specialist',
      'Senior Benefits Specialist': 'Senior Benefits Specialist',
      'HRIS Specialist': 'HRIS Specialist',
      'Senior HRIS Specialist': 'Senior HRIS Specialist',
      'Learning Specialist': 'Learning Specialist',
      'Senior Learning Specialist': 'Senior Learning Specialist',
      'Employee Engagement Specialist': 'Employee Engagement Specialist',
      'Diversity & Inclusion Specialist': 'Diversity & Inclusion Specialist',
      'HR Analytics Specialist': 'HR Analytics Specialist',
      'Senior HR Analytics Specialist': 'Senior HR Analytics Specialist',
      'HR Compliance Specialist': 'HR Compliance Specialist',
      'Senior HR Compliance Specialist': 'Senior HR Compliance Specialist',
      'Labor Relations Specialist': 'Labor Relations Specialist',
      'Senior Labor Relations Specialist': 'Senior Labor Relations Specialist',
      'International HR Manager': 'International HR Manager',
      'Global Mobility Specialist': 'Global Mobility Specialist',
      'Expatriate Management Specialist': 'Expatriate Management Specialist'
    };
    return positionMap[displayName] || displayName;
  };

  const calculateSalary = async () => {
    if (!validateForm()) {
      return;
    }

    setIsCalculating(true);
    
    // Show lead form immediately when calculation starts
    setShowLeadForm(true);
    console.log('🚀 Lead form shown immediately on calculation start');
    
    // Simulate calculation delay
    setTimeout(async () => {
      const positionKey = getPositionKey(formData.position);
      const position = salaryData.positions[positionKey];
      if (!position) {
        setResult({ error: 'Please select a valid position' });
        setIsCalculating(false);
        return;
      }

      const baseSalary = position.base;
      const experienceMultiplier = salaryData.experienceMultipliers[formData.experience] || 1.0;
      const locationMultiplier = salaryData.locationMultipliers[formData.location] || 1.0;
      const educationMultiplier = salaryData.educationMultipliers[formData.education] || 1.0;
      const companySizeMultiplier = salaryData.companySizeMultipliers[formData.companySize] || 1.0;
      const industryMultiplier = salaryData.industryMultipliers[formData.industry] || 1.0;

      // Calculate skills bonus
      const skillsBonus = formData.skills.reduce((total, skill) => {
        return total + (salaryData.skillsBonuses[skill] || 0);
      }, 0);

      const calculatedSalary = Math.round(
        (baseSalary * 
        experienceMultiplier * 
        locationMultiplier * 
        educationMultiplier * 
        companySizeMultiplier * 
        industryMultiplier) + skillsBonus
      );

      const minSalary = Math.round(calculatedSalary * 0.85);
      const maxSalary = Math.round(calculatedSalary * 1.15);

      // Get market trend data
      const marketTrend = salaryData.marketTrends[positionKey];
      
      // Calculate industry average (simplified)
      const industryAverage = Math.round(calculatedSalary * 0.95);

      setResult({
        position: formData.position,
        positionKey: positionKey,
        calculatedSalary,
        minSalary,
        maxSalary,
        skillsBonus,
        marketTrend,
        industryAverage,
        breakdown: {
          base: baseSalary,
          experience: experienceMultiplier,
          location: locationMultiplier,
          education: educationMultiplier,
          companySize: companySizeMultiplier,
          industry: industryMultiplier,
          skills: skillsBonus
        }
      });
      setIsCalculating(false);
      
      console.log('✅ Calculation completed, lead form should be visible');
    }, 1500);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form to Supabase (which also sends to HubSpot)
      const submitResult = await formSubmission.submitCalculatorForm({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        designation: leadData.designation,
        employees: leadData.employees,
        calculator_result: result,
        source: 'Salary Calculator'
      }, 'salary_calculator');
      
      if (submitResult.success) {
        // Trigger download after successful submission
        downloadReport();
        setDownloaded(true);
        setFormSubmitted(true);
        
        // Hide the form after successful submission
        setTimeout(() => {
          setShowLeadForm(false);
          setFormSubmitted(false);
        }, 3000);
        
        alert('✅ Data saved successfully! Your salary report has been downloaded.');
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`Error saving data: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadReport = async () => {
    if (!result) return;
    
    try {
      const filename = await downloadCalculatorPDF('salary', result, leadData);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback to old TXT method
      const report = `Salary Calculator Report
=======================

Position: ${result.position}
Calculated Salary: ₹${result.calculatedSalary.toLocaleString('en-IN')}
Salary Range: ₹${result.minSalary.toLocaleString('en-IN')} - ₹${result.maxSalary.toLocaleString('en-IN')}

Breakdown:
- Base Salary: ₹${result.breakdown.base.toLocaleString('en-IN')}
- Experience Multiplier: ${result.breakdown.experience}x
- Location Multiplier: ${result.breakdown.location}x
- Education Multiplier: ${result.breakdown.education}x
- Company Size Multiplier: ${result.breakdown.companySize}x
- Industry Multiplier: ${result.breakdown.industry}x
- Skills Bonus: ₹${result.skillsBonus.toLocaleString('en-IN')}

User Details:
- Name: ${leadData.name}
- Email: ${leadData.email}
- Phone: ${leadData.phone}
- Company: ${leadData.company}
- Designation: ${leadData.designation}
- Company Size: ${leadData.employees} employees

Generated on: ${new Date().toLocaleDateString('en-IN')}
    `;

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `salary-report-${result.position.toLowerCase().replace(/\s+/g, '-')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Helmet>
        <title>Salary Calculator 2025 | HR Salary Calculator India - Prachi</title>
        <meta name="description" content="Calculate competitive salary ranges for HR positions in India based on experience, location, and other factors. Free HR salary calculator." />
        <meta name="keywords" content="salary calculator, hr salary calculator, india salary calculator, hr compensation calculator, salary benchmarking tool" />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Salary Calculator</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">50,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                to="/resources"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Resources
              </Link>
              <Link 
                to="/services"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Services
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Salary Calculator 2025
          </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Calculate competitive salary ranges for HR positions in India with 95%+ accuracy
          </p>
            </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
              <p className="text-sm text-gray-600">No hidden costs or registration required</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">Your data is never stored or shared</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4 mx-auto">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">India-Specific</h3>
              <p className="text-sm text-gray-600">Based on real Indian market data</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                40+ HR Positions
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                60+ Indian Cities
              </span>
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                30+ Industries
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-500" />
                100+ Skills
              </span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Salary Parameters</span>
                </h2>
                <p className="text-emerald-100 mt-1">Enter your details to calculate competitive salary ranges</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Position */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Position *
                    </label>
                    <SearchableDropdown
                      options={positionOptions}
                      value={formData.position}
                      onChange={(value) => handleInputChange('position', value)}
                      placeholder="Search and select HR position..."
                      required={true}
                    />
                    {validationErrors.position && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.position}</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <TrendingUp className="w-4 h-4 inline mr-2" />
                      Years of Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-8">5-8 years</option>
                      <option value="8-10">8-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Location
                    </label>
                    <SearchableDropdown
                      options={locationOptions}
                      value={formData.location}
                      onChange={(value) => handleInputChange('location', value)}
                      placeholder="Search and select location..."
                      required={true}
                    />
                    {validationErrors.location && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.location}</p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <BarChart3 className="w-4 h-4 inline mr-2" />
                      Industry
                    </label>
                    <SearchableDropdown
                      options={industryOptions}
                      value={formData.industry}
                      onChange={(value) => handleInputChange('industry', value)}
                      placeholder="Search and select industry..."
                      required={true}
                    />
                    {validationErrors.industry && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.industry}</p>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-2" />
                      Education Level
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="high_school">High School</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="bachelor_honors">Bachelor's Degree (Honors)</option>
                      <option value="master">Master's Degree</option>
                      <option value="mba">MBA</option>
                      <option value="masters_hr">Master's in HR</option>
                      <option value="masters_business">Master's in Business</option>
                      <option value="phd">PhD</option>
                      <option value="certification">Professional Certification</option>
                      <option value="pg_diploma">Post Graduate Diploma</option>
                    </select>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Company Size
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="startup">Startup (1-50)</option>
                      <option value="small">Small (51-200)</option>
                      <option value="medium">Medium (201-1000)</option>
                      <option value="large">Large (1001-5000)</option>
                      <option value="enterprise">Enterprise (5000+)</option>
                    </select>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Skills (Check all relevant)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            formData.skills.includes(skill)
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    
                    {/* View More/Less Skills Button */}
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setShowAllSkills(!showAllSkills)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                      >
                        {showAllSkills ? (
                          <>
                            <span>Show Less Skills</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>View More Skills ({allSkills.length - 12} more)</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={calculateSalary}
                    disabled={!formData.position || isCalculating}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate Salary'
                    )}
                  </button>
                  

                </div>
              </div>
            </div>
            
            {/* Lead Form - Now appears after input section */}
            {showLeadForm && !formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <User className="h-6 w-6" />
                    <span>Get Your Detailed Report</span>
                  </h2>
                  <p className="text-purple-100 mt-1">Fill in your details to download a comprehensive salary report</p>
                </div>

                <div className="p-6">
                  <form onSubmit={handleLeadSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={leadData.name}
                          onChange={(e) => handleLeadInputChange('name', e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={leadData.email}
                          onChange={(e) => handleLeadInputChange('email', e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={leadData.phone}
                          onChange={(e) => handleLeadInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={leadData.company}
                          onChange={(e) => handleLeadInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Designation</label>
                        <input
                          type="text"
                          value={leadData.designation}
                          onChange={(e) => handleLeadInputChange('designation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your designation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                        <select
                          value={leadData.employees}
                          onChange={(e) => handleLeadInputChange('employees', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select company size</option>
                          <option value="1-50">1-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1001-5000">1001-5000 employees</option>
                          <option value="5000+">5000+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Download Detailed Report</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
            
            {/* Success Message */}
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6" />
                    <span>Success!</span>
                  </h2>
                  <p className="text-green-100 mt-1">Your data has been saved and report downloaded</p>
                </div>

                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your salary report has been downloaded and your information has been saved successfully.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-700">
                      ✓ Report downloaded to your device<br/>
                      ✓ Data saved to our secure database<br/>
                      ✓ You'll receive additional insights via email
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {result && !result.error ? (
              <motion.div 
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8 z-10" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <DollarSign className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Salary Results</h3>
                  <p className="text-sm text-gray-600">Your competitive salary analysis</p>
                </div>

                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 text-center border border-emerald-200 shadow-sm">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {formatCurrency(result.calculatedSalary)}
                    </div>
                      <div className="text-sm text-emerald-600 font-medium">Your Calculated Salary</div>
                      <div className="text-xs text-emerald-500 mt-1">Per Annum</div>
                  </div>

                    {/* Market Trend Indicator */}
                    {result.marketTrend && (
                      <div className={`rounded-lg p-3 text-center ${
                        result.marketTrend.trend === 'up' ? 'bg-green-50 border border-green-200' :
                        result.marketTrend.trend === 'down' ? 'bg-red-50 border border-red-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          {result.marketTrend.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : result.marketTrend.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          ) : (
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-sm font-semibold">
                            {result.marketTrend.trend === 'up' ? 'Growing' :
                             result.marketTrend.trend === 'down' ? 'Declining' : 'Stable'} Market
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {result.marketTrend.percentage}% annual growth
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="text-center mb-3">
                        <div className="text-sm font-semibold text-blue-700 mb-2">Salary Range</div>
                      </div>
                  <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(result.minSalary)}
                      </div>
                          <div className="text-xs text-blue-500">Minimum</div>
                    </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(result.maxSalary)}
                      </div>
                          <div className="text-xs text-blue-500">Maximum</div>
                        </div>
                      </div>
                    </div>

                    {/* Skills Bonus Display */}
                    {result.skillsBonus > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-200 shadow-sm">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Award className="h-5 w-5 text-blue-600" />
                          <div className="text-lg font-bold text-blue-600">
                            +{formatCurrency(result.skillsBonus)}
                          </div>
                        </div>
                        <div className="text-sm text-blue-600 font-medium">Skills Bonus</div>
                        <div className="text-xs text-blue-500 mt-1">Additional compensation for your expertise</div>
                      </div>
                    )}

                    {/* Industry Comparison */}
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-purple-700">Industry Average</span>
                        <span className="text-sm text-purple-600">
                          {formatCurrency(result.industryAverage)}
                        </span>
                      </div>
                      <div className="text-xs text-purple-600">
                        Your estimate is {result.calculatedSalary > result.industryAverage ? 'above' : 'below'} industry average
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Calculation Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Salary:</span>
                        <span>{formatCurrency(result.breakdown.base)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience Multiplier:</span>
                        <span>{result.breakdown.experience}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location Multiplier:</span>
                        <span>{result.breakdown.location}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Education Multiplier:</span>
                        <span>{result.breakdown.education}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Company Size Multiplier:</span>
                        <span>{result.breakdown.companySize}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Industry Multiplier:</span>
                        <span>{result.breakdown.industry}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skills Bonus:</span>
                        <span>₹{result.skillsBonus.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {crmError && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-800 text-sm">
                        Note: CRM integration failed, but your result is shown above.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={handleShare}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share Results</span>
                    </button>
                    {shared && (
                      <div className="text-blue-600 text-sm text-center font-medium">
                        ✓ Results shared successfully!
                      </div>
                    )}
                    
                    <button
                      onClick={() => navigate('/employee-salary-calculator')}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Calculator className="h-4 w-4" />
                      <span>Employee Salary Calculator</span>
                    </button>
                    
                    <a
                      href="/contact"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center block shadow-lg hover:shadow-xl"
                    >
                      Book Free Consultation
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your Salary</h3>
                  <p className="text-gray-600 text-sm">
                    Enter your details to get competitive salary ranges for HR positions in India.
                  </p>
                </div>
              </div>
            )}



            {result && result.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                {result.error}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Expert Salary Guidance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with HR experts to get personalized salary insights and compensation strategy recommendations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Talk to an Expert</h3>
              <p className="text-gray-600 mb-6">
                Schedule a free consultation to discuss your compensation strategy and get personalized recommendations.
              </p>
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-block"
              >
                Schedule Consultation
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download Report</h3>
              <p className="text-gray-600 mb-6">
                Get a comprehensive salary analysis report with market insights and recommendations.
              </p>
              <button 
                onClick={downloadReport}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                Download Report
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compensation Strategy</h3>
              <p className="text-gray-600 mb-6">
                Develop effective compensation strategies to attract and retain top HR talent.
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all duration-300">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold">Prachi</span>
              </div>
              <p className="text-gray-400 text-sm">
                Leading HR solutions provider helping businesses optimize compensation strategies and drive success.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HR Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HR Consulting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Engagement Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cost Calculator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@hirewithprachi.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 87408 89927</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Prachi HR Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Disclaimer */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This calculator provides estimates based on Indian market data and should be used as a reference only. Actual salaries may vary based on specific company policies, market conditions, and individual qualifications. For accurate salary information, consult with HR professionals or use industry-specific salary surveys.
            </p>
          </div>
        </div>
      </div>

      {/* Share Result Modal */}
      <ShareResultModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        calculatorType="salary"
        result={result}
        userData={leadData}
      />
    </div>
  );
} 