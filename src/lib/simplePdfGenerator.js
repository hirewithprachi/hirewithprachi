// Enhanced Simple PDF Generator - Bypass Complex Issues
import { jsPDF } from 'jspdf';

// Enhanced brand colors and styling
const BRAND_COLORS = {
  primary: '#1e40af',      // Deep Blue
  secondary: '#7c3aed',    // Purple
  accent: '#059669',       // Emerald
  success: '#10b981',      // Green
  warning: '#f59e0b',      // Amber
  danger: '#ef4444',       // Red
  dark: '#1f2937',         // Gray-800
  light: '#f8fafc',        // Gray-50
  white: '#ffffff',
  text: '#374151',         // Gray-700
  gold: '#fbbf24',         // Gold accent
  highlight: '#fef3c7'     // Light yellow highlight
};

// Enhanced font sizes and typography
const FONTS = {
  title: 28,
  subtitle: 20,
  heading: 16,
  subheading: 14,
  body: 12,
  small: 10,
  tiny: 8,
  caption: 9
};

// Enhanced spacing system
const SPACING = {
  xs: 3,
  sm: 6,
  md: 10,
  lg: 15,
  xl: 20,
  xxl: 30
};

// Enhanced logo function
const addEnhancedLogo = (doc, x, y, width = 60) => {
  try {
    // Enhanced logo background with gradient effect
    doc.setFillColor(BRAND_COLORS.primary);
    doc.roundedRect(x, y, width, 25, 5, 5, 'F');
    
    // Add subtle gradient overlay
    doc.setFillColor(BRAND_COLORS.secondary);
    doc.roundedRect(x + 2, y + 2, width - 4, 21, 3, 3, 'F');
    
    // Logo text with enhanced typography
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.subheading);
    doc.setFont('helvetica', 'bold');
    doc.text('Hire With', x + width/2, y + 10, { align: 'center' });
    doc.text('Prachi', x + width/2, y + 20, { align: 'center' });
    
    // Add professional accent elements
    doc.setFillColor(BRAND_COLORS.gold);
    doc.circle(x + width - 10, y + 12, 3, 'F');
    doc.circle(x + 10, y + 12, 2, 'F');
    
    // Add subtle border
    doc.setDrawColor(BRAND_COLORS.white);
    doc.setLineWidth(0.5);
    doc.roundedRect(x, y, width, 25, 5, 5, 'S');
  } catch (error) {
    console.log('Logo loading failed, using text fallback');
  }
};

// Enhanced section divider
const addEnhancedSectionDivider = (doc, y, width = 190) => {
  // Main line
  doc.setDrawColor(BRAND_COLORS.primary);
  doc.setLineWidth(1);
  doc.line(10, y, 10 + width, y);
  
  // Accent dots
  doc.setFillColor(BRAND_COLORS.gold);
  doc.circle(105, y, 2, 'F');
  doc.circle(50, y, 1, 'F');
  doc.circle(160, y, 1, 'F');
};

// Enhanced currency formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Enhanced simple PDF generation without complex validation
export const generateSimplePDF = (calculatorType, result, userData = {}) => {
  try {
    console.log('Generating enhanced simple PDF for:', calculatorType);
    
    // Create enhanced PDF
    const doc = new jsPDF();
    let y = 25;
    
    // Enhanced header with logo
    addEnhancedLogo(doc, 10, y);
    
    // Enhanced company name and tagline
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.title);
    doc.setFont('helvetica', 'bold');
    doc.text('Hire With Prachi', 80, y + 15);
    
    doc.setFontSize(FONTS.subheading);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND_COLORS.text);
    doc.text('HR Solutions & Consulting', 80, y + 25);
    
    y += 35;
    
    // Enhanced calculator title with background
    doc.setFillColor(BRAND_COLORS.primary);
    doc.roundedRect(10, y, 190, 25, 5, 5, 'F');
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text(`${getCalculatorTitle(calculatorType)}`, 105, y + 15, { align: 'center' });
    
    y += 35;
    
    // Enhanced date section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, 20, y);
    
    y += 20;
    
    // Enhanced results section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Results:', 20, y);
    y += 15;
    
    // Enhanced result data with better formatting
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    if (result && typeof result === 'object') {
      Object.entries(result).forEach(([key, value], index) => {
        if (value !== null && value !== undefined) {
          // Alternate row colors for better readability
          if (index % 2 === 0) {
            doc.setFillColor(BRAND_COLORS.light);
            doc.rect(10, y - 3, 190, 8, 'F');
          }
          
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          const displayValue = typeof value === 'number' ? formatCurrency(value) : value;
          
          doc.setTextColor(BRAND_COLORS.dark);
          doc.setFont('helvetica', 'bold');
          doc.text(`${label}:`, 20, y);
          doc.setTextColor(BRAND_COLORS.text);
          doc.setFont('helvetica', 'normal');
          doc.text(displayValue, 80, y);
          
          y += 8;
          
          if (y > 250) {
            doc.addPage();
            y = 20;
          }
        }
      });
    }
    
    // Enhanced footer
    y = 280;
    addEnhancedSectionDivider(doc, y - 10);
    
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFontSize(FONTS.small);
    doc.setFont('helvetica', 'bold');
    doc.text('Generated by Hire With Prachi - Professional HR Solutions', 105, y, { align: 'center' });
    
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONTS.tiny);
    doc.text('📧 info@hirewithprachi.com | 📱 +91-8740889927', 105, y, { align: 'center' });
    
    return doc;
  } catch (error) {
    console.error('Enhanced simple PDF generation failed:', error);
    throw error;
  }
};

// Enhanced simple download function
export const downloadSimplePDF = (calculatorType, result, userData = {}) => {
  try {
    console.log('Downloading enhanced simple PDF for:', calculatorType);
    
    const doc = generateSimplePDF(calculatorType, result, userData);
    const filename = `${calculatorType}-report-${Date.now()}.pdf`;
    
    doc.save(filename);
    console.log('Enhanced simple PDF downloaded:', filename);
    return filename;
  } catch (error) {
    console.error('Enhanced simple PDF download failed:', error);
    throw error;
  }
};

// Enhanced calculator title function
const getCalculatorTitle = (calculatorType) => {
  const titles = {
    'salary': 'Professional Salary Calculator Report',
    'employee': 'Employee Salary Analysis Report',
    'cost-savings': 'HR Cost Savings Analysis Report',
    'roi': 'ROI Calculator Analysis Report',
    'needs-assessment': 'HR Needs Assessment Analysis',
    'engagement': 'Employee Engagement Analysis Report',
    'benchmarking': 'Salary Benchmarking Analysis Report',
    'benefits': 'Benefits Calculator Analysis Report',
    'turnover': 'Employee Turnover Analysis Report',
    'performance': 'Performance Assessment Analysis Report',
    'resume-parser': 'Resume Parser Analysis Report',
    'document-analyzer': 'Document Analyzer Report',
    'compliance-risk-checker': 'Compliance Risk Assessment Report'
  };
  return titles[calculatorType] || 'Professional Calculator Report';
};

// Enhanced test function
export const testSimplePDF = () => {
  try {
    const testData = {
      testValue: 1000,
      testPercentage: 85,
      testRating: 'Excellent',
      calculatedSalary: 750000,
      position: 'HR Manager',
      experience: '5-8 years'
    };
    
    const filename = downloadSimplePDF('test', testData);
    return { success: true, filename };
  } catch (error) {
    return { success: false, error: error.message };
  }
}; 