import { jsPDF } from 'jspdf';
import { 
  isPDFSupported, 
  validatePDFObject, 
  checkCSPCompatibility, 
  validatePDFEnvironment,
  getPDFErrorDetails,
  getBrowserSpecificPDFHandler 
} from './pdfValidation.js';

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
  gradient1: '#3b82f6',    // Blue gradient start
  gradient2: '#8b5cf6',    // Purple gradient end
  highlight: '#fef3c7'     // Light yellow highlight
};

// Enhanced font sizes and typography
const FONTS = {
  title: 32,
  subtitle: 24,
  heading: 18,
  subheading: 16,
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

// Helper function to add enhanced logo with better design
const addLogo = (doc, x, y, width = 60) => {
  try {
    // Enhanced logo background with gradient effect
    doc.setFillColor(BRAND_COLORS.primary);
    // Use regular rect instead of roundedRect for better compatibility
    doc.rect(x, y, width, 25, 'F');
    
    // Add subtle gradient overlay
    doc.setFillColor(BRAND_COLORS.secondary);
    doc.rect(x + 2, y + 2, width - 4, 21, 'F');
    
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
    doc.rect(x, y, width, 25, 'S');
  } catch (error) {
    console.log('Logo loading failed, using text fallback');
    // Simple text fallback
    doc.setTextColor(BRAND_COLORS.primary);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Hire With Prachi', x, y + 15);
  }
};

// Enhanced gradient background with better visual appeal
const addGradientBackground = (doc, x, y, width, height) => {
  try {
    // Create more sophisticated gradient effect
    const steps = 15;
    const stepHeight = height / steps;
    
    for (let i = 0; i < steps; i++) {
      const color = BRAND_COLORS.primary;
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      doc.setFillColor(r, g, b);
      doc.rect(x, y + (i * stepHeight), width, stepHeight, 'F');
    }
    
    // Add subtle pattern overlay (simplified for compatibility)
    doc.setFillColor(BRAND_COLORS.white);
    // Remove setGlobalAlpha as it might not be supported in all jsPDF versions
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        doc.circle(x + i, y + j, 0.5, 'F');
      }
    }
  } catch (error) {
    console.log('Gradient background failed, using simple background');
    // Fallback to simple background
    doc.setFillColor(BRAND_COLORS.primary);
    doc.rect(x, y, width, height, 'F');
  }
};

// Enhanced section divider with better design
const addSectionDivider = (doc, y, width = 190) => {
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

// Enhanced currency formatting with better presentation
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Enhanced CTA section with better visual design
const addCTASection = (doc, y) => {
  try {
    const ctaY = y + 15;
    
    // Enhanced CTA background with sophisticated design
    doc.setFillColor(BRAND_COLORS.primary);
    doc.rect(10, ctaY, 190, 45, 'F');
    
    // Add gradient accent line
    doc.setFillColor(BRAND_COLORS.gold);
    doc.rect(10, ctaY, 190, 4, 'F');
    
    // Add subtle pattern (simplified for compatibility)
    doc.setFillColor(BRAND_COLORS.white);
    // Remove setGlobalAlpha as it might not be supported in all jsPDF versions
    for (let i = 0; i < 190; i += 30) {
      doc.circle(10 + i, ctaY + 8, 1, 'F');
    }
    
    // Enhanced CTA main text
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Ready to Transform Your HR Strategy?', 105, ctaY + 12, { align: 'center' });
    
    // Enhanced CTA subtitle
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    doc.text('Book a FREE consultation with our HR experts', 105, ctaY + 22, { align: 'center' });
    
    // Enhanced contact info with better formatting
    doc.setFontSize(FONTS.small);
    doc.text('📧 info@hirewithprachi.com', 105, ctaY + 32, { align: 'center' });
    doc.text('📱 +91-8740889927 | 🌐 prachi-hr.com', 105, ctaY + 38, { align: 'center' });
    
    return ctaY + 50;
  } catch (error) {
    console.log('CTA section failed, using simple fallback');
    // Simple fallback
    const ctaY = y + 15;
    doc.setFillColor(BRAND_COLORS.primary);
    doc.rect(10, ctaY, 190, 45, 'F');
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Ready to Transform Your HR Strategy?', 105, ctaY + 20, { align: 'center' });
    doc.setFontSize(FONTS.body);
    doc.text('📧 info@hirewithprachi.com | 📱 +91-8740889927', 105, ctaY + 35, { align: 'center' });
    
    return ctaY + 50;
  }
};

// Enhanced PDF validation using imported utilities
const validatePDFGeneration = (pdf) => {
  return validatePDFObject(pdf);
};

// Enhanced main PDF generator function
export const generateCalculatorPDF = async (calculatorType, result, userData = {}) => {
  try {
    console.log('Starting enhanced PDF generation for:', calculatorType, result);
    console.log('User data:', userData);
    
    // Simplified browser and environment compatibility check
    try {
      const environment = await validatePDFEnvironment();
      if (!environment.supported) {
        console.warn('PDF environment not fully supported, attempting generation anyway:', environment.recommendations);
      }
    } catch (validationError) {
      console.warn('PDF validation failed, attempting generation anyway:', validationError.message);
    }
    
    const doc = new jsPDF();
    let yPosition = 25;
    
    // Enhanced professional header with improved logo and branding
    addLogo(doc, 10, yPosition);
    
    // Enhanced company name and tagline with better positioning
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.title);
    doc.setFont('helvetica', 'bold');
    doc.text('Hire With Prachi', 80, yPosition + 15);

    doc.setFontSize(FONTS.subheading);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND_COLORS.text);
    doc.text('Professional HR Solutions & Consulting', 80, yPosition + 25);
    
    // Enhanced date and report info with better styling
    doc.setFontSize(FONTS.caption);
    doc.setTextColor(BRAND_COLORS.text);
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Report Generated: ${currentDate}`, 80, yPosition + 35);
    
    yPosition += 45;
    
    // Enhanced professional gradient background for title section
    addGradientBackground(doc, 10, yPosition, 190, 30);
    
    // Enhanced calculator title with better styling
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.subtitle);
    doc.setFont('helvetica', 'bold');
    doc.text(getCalculatorTitle(calculatorType), 105, yPosition + 18, { align: 'center' });
    
    yPosition += 40;
    
    // Enhanced professional section divider
    addSectionDivider(doc, yPosition);
    yPosition += 20;
    
    // Generate calculator-specific content
    console.log('Generating enhanced content for:', calculatorType);
    yPosition = generateCalculatorContent(doc, calculatorType, result, userData, yPosition);
    
    // Enhanced footer
    yPosition = addFooter(doc, yPosition);
    
    // Enhanced CTA section
    yPosition = addCTASection(doc, yPosition);
    
    // Validate PDF object before returning
    validatePDFGeneration(doc);
    
    console.log('Enhanced PDF generation completed successfully');
    return doc;
  } catch (error) {
    console.error('Enhanced PDF generation error:', error);
    throw error;
  }
};

// Get calculator title with enhanced titles
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

// Enhanced calculator content generation
const generateCalculatorContent = (doc, calculatorType, result, userData, startY) => {
  let y = startY;
  
  try {
    console.log('Generating enhanced content for calculator type:', calculatorType);
    console.log('Result data:', result);
    
    // Validate result data
    if (!result || typeof result !== 'object') {
      console.error('Invalid result data:', result);
      throw new Error('Invalid result data provided to PDF generator');
    }
    
    switch (calculatorType) {
      case 'salary':
        y = generateSalaryContent(doc, result, userData, y);
        break;
      case 'employee':
        y = generateEmployeeContent(doc, result, userData, y);
        break;
      case 'cost-savings':
        y = generateCostSavingsContent(doc, result, userData, y);
        break;
      case 'roi':
        y = generateROIContent(doc, result, userData, y);
        break;
      case 'needs-assessment':
        console.log('Calling generateNeedsAssessmentContent with:', result);
        y = generateNeedsAssessmentContent(doc, result, userData, y);
        break;
      case 'engagement':
        console.log('Calling generateEngagementContent with:', result);
        y = generateEngagementContent(doc, result, userData, y);
        break;
      case 'benefits':
        console.log('Calling generateBenefitsContent with:', result);
        y = generateBenefitsContent(doc, result, userData, y);
        break;
      case 'turnover':
        console.log('Calling generateTurnoverContent with:', result);
        y = generateTurnoverContent(doc, result, userData, y);
        break;
      case 'performance':
        console.log('Calling generatePerformanceContent with:', result);
        y = generatePerformanceContent(doc, result, userData, y);
        break;
      case 'benchmarking':
        console.log('Calling generateBenchmarkingContent with:', result);
        y = generateBenchmarkingContent(doc, result, userData, y);
        break;
      case 'resume-parser':
        console.log('Calling generateResumeParserContent with:', result);
        y = generateResumeParserContent(doc, result, userData, y);
        break;
      case 'document-analyzer':
        console.log('Calling generateDocumentAnalyzerContent with:', result);
        y = generateDocumentAnalyzerContent(doc, result, userData, y);
        break;
      case 'compliance-risk-checker':
        console.log('Calling generateComplianceRiskContent with:', result);
        y = generateComplianceRiskContent(doc, result, userData, y);
        break;
      default:
        console.log('Using enhanced generic content generator for:', calculatorType);
        y = generateGenericContent(doc, result, userData, y);
    }
    
    console.log('Enhanced content generation completed, y position:', y);
    return y;
  } catch (error) {
    console.error('Error in generateCalculatorContent:', error);
    console.error('Calculator type:', calculatorType);
    console.error('Result:', result);
    console.error('User data:', userData);
    throw error;
  }
};

// Enhanced salary calculator content with better design
const generateSalaryContent = (doc, result, userData, startY) => {
  let y = startY;
  
  // Enhanced main result highlight with better design
  doc.setFillColor(BRAND_COLORS.success);
  doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
  
  // Add subtle pattern overlay
  doc.setFillColor(BRAND_COLORS.white);
  doc.setGlobalAlpha(0.1);
  for (let i = 0; i < 190; i += 20) {
    doc.circle(10 + i, y + 15, 2, 'F');
  }
  doc.setGlobalAlpha(1);
  
  doc.setTextColor(BRAND_COLORS.white);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Calculated Salary', 105, y + 12, { align: 'center' });
  
  doc.setFontSize(FONTS.title);
  doc.text(formatCurrency(result.calculatedSalary), 105, y + 22, { align: 'center' });
  
  y += 40;
  
  // Enhanced position and details section
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Position Details', 10, y);
  y += 12;
  
  // Enhanced details with better formatting
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const details = [
    { label: 'Position', value: result.position },
    { label: 'Experience', value: `${result.experience} years` },
    { label: 'Location', value: result.location },
    { label: 'Industry', value: result.industry }
  ];
  
  details.forEach(detail => {
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${detail.label}:`, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, 60, y);
    y += 8;
  });
  
  y += 15;
  
  // Enhanced salary range with better design
  doc.setFillColor(BRAND_COLORS.highlight);
  doc.roundedRect(10, y, 190, 25, 5, 5, 'F');
  
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Salary Range', 105, y + 10, { align: 'center' });
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formatCurrency(result.minSalary)} - ${formatCurrency(result.maxSalary)}`, 105, y + 20, { align: 'center' });
  
  y += 35;
  
  // Enhanced breakdown section with better layout
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculation Breakdown', 10, y);
  y += 12;
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const breakdownItems = [
    { label: 'Base Salary', value: formatCurrency(result.breakdown.base) },
    { label: 'Experience Multiplier', value: `${result.breakdown.experience}x` },
    { label: 'Location Multiplier', value: `${result.breakdown.location}x` },
    { label: 'Education Multiplier', value: `${result.breakdown.education}x` },
    { label: 'Company Size Multiplier', value: `${result.breakdown.companySize}x` },
    { label: 'Industry Multiplier', value: `${result.breakdown.industry}x` }
  ];
  
  breakdownItems.forEach((item, index) => {
    // Alternate row colors for better readability
    if (index % 2 === 0) {
      doc.setFillColor(BRAND_COLORS.light);
      doc.rect(10, y - 3, 190, 8, 'F');
    }
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, 150, y, { align: 'right' });
    y += 8;
  });
  
  if (result.skillsBonus > 0) {
    y += 5;
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y - 3, 190, 10, 3, 3, 'F');
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFont('helvetica', 'bold');
    doc.text('Skills Bonus', 15, y);
    doc.text(`+${formatCurrency(result.skillsBonus)}`, 150, y, { align: 'right' });
    y += 12;
  }
  
  y += 15;
  
  // Enhanced market trend section
  if (result.marketTrend) {
    const trendColor = result.marketTrend.trend === 'up' ? BRAND_COLORS.success :
                      result.marketTrend.trend === 'down' ? BRAND_COLORS.danger :
                      BRAND_COLORS.warning;
    
    doc.setFillColor(trendColor);
    doc.roundedRect(10, y, 190, 20, 5, 5, 'F');
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'bold');
    const trendText = result.marketTrend.trend === 'up' ? 'Growing' : 
                     result.marketTrend.trend === 'down' ? 'Declining' : 'Stable';
    doc.text(`Market Trend: ${trendText} (${result.marketTrend.percentage}% annual growth)`, 105, y + 12, { align: 'center' });
    
    y += 30;
  }
  
  return y;
};

// Enhanced employee salary content with better design
const generateEmployeeContent = (doc, result, userData, startY) => {
  let y = startY;
  
  // Enhanced employee info section
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Employee Information', 10, y);
  y += 12;
  
  // Enhanced employee details with better formatting
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const employeeDetails = [
    { label: 'Name', value: result.employeeData.name },
    { label: 'Employee ID', value: result.employeeData.employeeId },
    { label: 'Designation', value: result.employeeData.designation },
    { label: 'Department', value: result.employeeData.department }
  ];
  
  employeeDetails.forEach((detail, index) => {
    // Alternate row colors for better readability
    if (index % 2 === 0) {
      doc.setFillColor(BRAND_COLORS.light);
      doc.rect(10, y - 3, 190, 8, 'F');
    }
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${detail.label}:`, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, 60, y);
    y += 8;
  });
  
  y += 15;
  
  // Enhanced salary results with better design
  doc.setFillColor(BRAND_COLORS.success);
  doc.roundedRect(10, y, 190, 25, 6, 6, 'F');
  
  // Add subtle pattern overlay
  doc.setFillColor(BRAND_COLORS.white);
  doc.setGlobalAlpha(0.1);
  for (let i = 0; i < 190; i += 20) {
    doc.circle(10 + i, y + 12, 2, 'F');
  }
  doc.setGlobalAlpha(1);
  
  doc.setTextColor(BRAND_COLORS.white);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Salary Summary', 105, y + 10, { align: 'center' });
  
  doc.setFontSize(FONTS.body);
  doc.text(`Net Salary: ${formatCurrency(result.proRatedNetSalary)}`, 105, y + 20, { align: 'center' });
  
  y += 35;
  
  // Enhanced working days section
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Working Days Summary', 10, y);
  y += 12;
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const workingDaysDetails = [
    { label: 'Total Days', value: result.workingDays.total },
    { label: 'Actual Working', value: result.workingDays.actual },
    { label: 'Leave Days', value: result.workingDays.leave },
    { label: 'Attendance', value: `${result.workingDays.attendance}%` }
  ];
  
  workingDaysDetails.forEach((detail, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(BRAND_COLORS.light);
      doc.rect(10, y - 3, 190, 8, 'F');
    }
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${detail.label}:`, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, 60, y);
    y += 8;
  });
  
  y += 15;
  
  // Enhanced salary breakdown section
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Salary Breakdown', 10, y);
  y += 12;
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const salaryItems = [
    { label: 'Gross Salary', value: formatCurrency(result.grossSalary) },
    { label: 'Total Deductions', value: formatCurrency(result.deductions.total) },
    { label: 'Net Salary', value: formatCurrency(result.netSalary) },
    { label: 'Pro-rated Gross', value: formatCurrency(result.proRatedGrossSalary) },
    { label: 'Pro-rated Net', value: formatCurrency(result.proRatedNetSalary) }
  ];
  
  salaryItems.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(BRAND_COLORS.light);
      doc.rect(10, y - 3, 190, 8, 'F');
    }
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, 150, y, { align: 'right' });
    y += 8;
  });
  
  return y + 15;
};

// Enhanced cost savings content with better design
const generateCostSavingsContent = (doc, result, userData, startY) => {
  let y = startY;
  
  // Enhanced savings highlight with better design
  doc.setFillColor(BRAND_COLORS.success);
  doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
  
  // Add subtle pattern overlay
  doc.setFillColor(BRAND_COLORS.white);
  doc.setGlobalAlpha(0.1);
  for (let i = 0; i < 190; i += 20) {
    doc.circle(10 + i, y + 15, 2, 'F');
  }
  doc.setGlobalAlpha(1);
  
  doc.setTextColor(BRAND_COLORS.white);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Annual Cost Savings', 105, y + 12, { align: 'center' });
  
  doc.setFontSize(FONTS.title);
  doc.text(formatCurrency(result.annualSavings), 105, y + 22, { align: 'center' });
  
  y += 40;
  
  // Enhanced current costs section
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Current HR Costs', 10, y);
  y += 12;
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const costDetails = [
    { label: 'Current Annual Cost', value: formatCurrency(result.currentCost) },
    { label: 'Virtual HR Cost', value: formatCurrency(result.virtualHRCost) },
    { label: 'Savings Percentage', value: `${result.savingsPercentage}%` }
  ];
  
  costDetails.forEach((detail, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(BRAND_COLORS.light);
      doc.rect(10, y - 3, 190, 8, 'F');
    }
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${detail.label}:`, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, 60, y);
    y += 8;
  });
  
  return y + 20;
};

// Enhanced ROI content with better design
const generateROIContent = (doc, result, userData, startY) => {
  let y = startY;
  
  // Enhanced ROI highlight with better design
  doc.setFillColor(BRAND_COLORS.success);
  doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
  
  // Add subtle pattern overlay
  doc.setFillColor(BRAND_COLORS.white);
  doc.setGlobalAlpha(0.1);
  for (let i = 0; i < 190; i += 20) {
    doc.circle(10 + i, y + 15, 2, 'F');
  }
  doc.setGlobalAlpha(1);
  
  doc.setTextColor(BRAND_COLORS.white);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Return on Investment', 105, y + 12, { align: 'center' });
  
  doc.setFontSize(FONTS.title);
  doc.text(`${result.roiPercentage}%`, 105, y + 22, { align: 'center' });
  
  y += 40;
  
  // Enhanced investment details section
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Investment Analysis', 10, y);
  y += 12;
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  const investmentDetails = [
    { label: 'Investment Amount', value: formatCurrency(result.investment) },
    { label: 'Expected Return', value: formatCurrency(result.expectedReturn) },
    { label: 'Payback Period', value: `${result.paybackPeriod} months` }
  ];
  
  investmentDetails.forEach((detail, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(BRAND_COLORS.light);
      doc.rect(10, y - 3, 190, 8, 'F');
    }
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${detail.label}:`, 15, y);
    doc.setTextColor(BRAND_COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, 60, y);
    y += 8;
  });
  
  return y + 20;
};

// Enhanced HR Needs Assessment content with better design
const generateNeedsAssessmentContent = (doc, result, userData, startY) => {
  try {
    console.log('generateNeedsAssessmentContent called with:', result);
    let y = startY;
    
    // Validate required fields
    if (!result.recommendedFTE || !result.industry || !result.employees) {
      console.error('Missing required fields in result:', result);
      throw new Error('Missing required data for HR needs assessment');
    }
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('HR Staffing Recommendation', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.recommendedFTE} Full-Time HR Staff`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced company details section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Company Analysis', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const companyDetails = [
      { label: 'Industry', value: result.industry },
      { label: 'Number of Employees', value: result.employees },
      { label: 'Recommended Service Package', value: result.recommendedPackage }
    ];
    
    companyDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(detail.value, 60, y);
      y += 8;
    });
    
    y += 15;
    
    // Enhanced analysis section with better design
    doc.setFillColor(BRAND_COLORS.highlight);
    doc.roundedRect(10, y, 190, 35, 5, 5, 'F');
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Staffing Analysis', 105, y + 10, { align: 'center' });
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    doc.text(`For a ${result.industry} company with ${result.employees} employees,`, 105, y + 20, { align: 'center' });
    doc.text(`you typically need ${result.recommendedFTE} full-time HR staff.`, 105, y + 28, { align: 'center' });
    
    y += 45;
    
    // Enhanced recommendations section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommendations', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const recommendations = [
      'Consider virtual HR services for cost efficiency',
      'Implement HR technology to streamline processes',
      'Focus on strategic HR initiatives',
      'Regular HR audits and compliance checks'
    ];
    
    recommendations.forEach((rec, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.text(`• ${rec}`, 15, y);
      y += 8;
    });
    
    console.log('generateNeedsAssessmentContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateNeedsAssessmentContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Enhanced Employee Engagement content with better design
const generateEngagementContent = (doc, result, userData, startY) => {
  try {
    console.log('generateEngagementContent called with:', result);
    let y = startY;
    
    // Validate required fields
    if (!result.engagementScore) {
      console.error('Missing engagementScore in result:', result);
      throw new Error('Missing engagement score data');
    }
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Employee Engagement Score', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.engagementScore}%`, 105, y + 22, { align: 'center' });
  
    y += 40;
  
    // Enhanced engagement level section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Engagement Level', 10, y);
    y += 12;
  
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const engagementDetails = [
      { label: 'Level', value: result.engagementLevel || 'Not specified' },
      { label: 'Category', value: result.category || result.engagementLevel || 'Not specified' }
    ];
    
    engagementDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(detail.value, 60, y);
      y += 8;
    });
  
    y += 15;
  
    // Enhanced analysis section with better design
    doc.setFillColor(BRAND_COLORS.highlight);
    doc.roundedRect(10, y, 190, 45, 5, 5, 'F');
  
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Engagement Analysis', 105, y + 10, { align: 'center' });
  
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    doc.text(result.description || 'Engagement analysis not available', 105, y + 20, { align: 'center' });
    doc.text(result.recommendations || 'Recommendations not available', 105, y + 30, { align: 'center' });
  
    y += 55;
  
    // Enhanced key areas section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Focus Areas', 10, y);
    y += 12;
  
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    if (result.keyAreas && Array.isArray(result.keyAreas)) {
      result.keyAreas.forEach((area, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(BRAND_COLORS.light);
          doc.rect(10, y - 3, 190, 8, 'F');
        }
        
        doc.text(`• ${area}`, 15, y);
        y += 8;
      });
    }
  
    console.log('generateEngagementContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateEngagementContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Enhanced generic content with better design
const generateGenericContent = (doc, result, userData, startY) => {
  let y = startY;
  
  doc.setTextColor(BRAND_COLORS.dark);
  doc.setFontSize(FONTS.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculation Results', 10, y);
  y += 12;
  
  doc.setFontSize(FONTS.body);
  doc.setFont('helvetica', 'normal');
  
  // Enhanced result display with better formatting
  Object.entries(result).forEach(([key, value], index) => {
    if (typeof value !== 'object' && key !== 'error') {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const displayValue = typeof value === 'number' ? formatCurrency(value) : value;
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(displayValue, 60, y);
      y += 8;
    }
  });
  
  return y + 15;
};

// Enhanced Benefits Calculator content with better design
const generateBenefitsContent = (doc, result, userData, startY) => {
  try {
    console.log('generateBenefitsContent called with:', result);
    let y = startY;
    
    // Validate required fields
    if (!result.totalBenefits || !result.totalCompensation) {
      console.error('Missing required fields in result:', result);
      throw new Error('Missing required data for benefits calculation');
    }
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Benefits Package', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(formatCurrency(result.totalBenefits), 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced benefits breakdown section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Benefits Breakdown', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const benefitsItems = [
      { label: 'Health Insurance', value: formatCurrency(result.healthInsurance || 0) },
      { label: 'Dental Insurance', value: formatCurrency(result.dentalInsurance || 0) },
      { label: 'Vision Insurance', value: formatCurrency(result.visionInsurance || 0) },
      { label: 'Retirement Match', value: formatCurrency(result.retirementMatch || 0) },
      { label: 'Paid Time Off', value: formatCurrency(result.paidTimeOff || 0) },
      { label: 'Bonuses', value: formatCurrency(result.bonuses || 0) },
      { label: 'Stock Options', value: formatCurrency(result.stockOptions || 0) },
      { label: 'Other Benefits', value: formatCurrency(result.otherBenefits || 0) }
    ];
    
    benefitsItems.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(item.label, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(item.value, 150, y, { align: 'right' });
      y += 8;
    });
    
    y += 15;
    
    // Enhanced total compensation section
    doc.setFillColor(BRAND_COLORS.highlight);
    doc.roundedRect(10, y, 190, 25, 5, 5, 'F');
    
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Compensation', 105, y + 10, { align: 'center' });
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    doc.text(formatCurrency(result.totalCompensation), 105, y + 20, { align: 'center' });
    
    y += 35;
    
    // Enhanced benefits percentage section
    if (result.benefitsPercentage) {
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Benefits Analysis', 10, y);
      y += 12;
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      
      const analysisDetails = [
        { label: 'Benefits Percentage', value: `${result.benefitsPercentage}%` },
        { label: 'Package Rating', value: result.packageRating || 'Not specified' }
      ];
      
      analysisDetails.forEach((detail, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(BRAND_COLORS.light);
          doc.rect(10, y - 3, 190, 8, 'F');
        }
        
        doc.setTextColor(BRAND_COLORS.dark);
        doc.setFont('helvetica', 'bold');
        doc.text(`${detail.label}:`, 15, y);
        doc.setTextColor(BRAND_COLORS.text);
        doc.setFont('helvetica', 'normal');
        doc.text(detail.value, 60, y);
        y += 8;
      });
    }
    
    console.log('generateBenefitsContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateBenefitsContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Enhanced Turnover Calculator content with better design
const generateTurnoverContent = (doc, result, userData, startY) => {
  try {
    console.log('generateTurnoverContent called with:', result);
    let y = startY;
    
    // Validate required fields
    if (!result.turnoverRate || !result.totalCost) {
      console.error('Missing required fields in result:', result);
      throw new Error('Missing required data for turnover calculation');
    }
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.danger);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Employee Turnover Rate', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.turnoverRate}%`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced cost analysis section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Turnover Cost Analysis', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const costItems = [
      { label: 'Total Cost', value: formatCurrency(result.totalCost) },
      { label: 'Annualized Cost', value: formatCurrency(result.annualizedCost) }
    ];
    
    costItems.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(item.label, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(item.value, 150, y, { align: 'right' });
      y += 8;
    });
    
    y += 15;
    
    // Enhanced cost breakdown section
    if (result.breakdown) {
      doc.setFillColor(BRAND_COLORS.highlight);
      doc.roundedRect(10, y, 190, 35, 5, 5, 'F');
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Cost Breakdown', 105, y + 10, { align: 'center' });
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      doc.text(`Recruitment: ${formatCurrency(result.breakdown.recruitment)}`, 15, y + 20);
      doc.text(`Training: ${formatCurrency(result.breakdown.training)}`, 15, y + 26);
      doc.text(`Productivity Loss: ${formatCurrency(result.breakdown.productivity)}`, 15, y + 32);
      
      y += 45;
    }
    
    // Enhanced turnover level section
    if (result.turnoverLevel) {
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Turnover Assessment', 10, y);
      y += 12;
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      
      const assessmentDetails = [
        { label: 'Level', value: result.turnoverLevel.level },
        { label: 'Risk', value: result.turnoverLevel.risk || 'Not specified' }
      ];
      
      assessmentDetails.forEach((detail, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(BRAND_COLORS.light);
          doc.rect(10, y - 3, 190, 8, 'F');
        }
        
        doc.setTextColor(BRAND_COLORS.dark);
        doc.setFont('helvetica', 'bold');
        doc.text(`${detail.label}:`, 15, y);
        doc.setTextColor(BRAND_COLORS.text);
        doc.setFont('helvetica', 'normal');
        doc.text(detail.value, 60, y);
        y += 8;
      });
    }
    
    console.log('generateTurnoverContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateTurnoverContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Enhanced Performance Calculator content with better design
const generatePerformanceContent = (doc, result, userData, startY) => {
  try {
    console.log('generatePerformanceContent called with:', result);
    let y = startY;
    
    // Validate required fields
    if (!result.score || !result.rating) {
      console.error('Missing required fields in result:', result);
      throw new Error('Missing required data for performance calculation');
    }
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Performance Score', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.score}%`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced performance details section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Performance Assessment', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const performanceDetails = [
      { label: 'Rating', value: result.rating },
      { label: 'Average Score', value: `${result.averageScore || 'Not specified'}/10` },
      { label: 'Total Score', value: `${result.totalScore || 'Not specified'}/40` }
    ];
    
    performanceDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(detail.value, 60, y);
      y += 8;
    });
    
    y += 15;
    
    // Enhanced score breakdown section
    if (result.breakdown) {
      doc.setFillColor(BRAND_COLORS.highlight);
      doc.roundedRect(10, y, 190, 40, 5, 5, 'F');
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Score Breakdown', 105, y + 10, { align: 'center' });
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      doc.text(`Goals Achievement: ${result.breakdown.goals || 0}/10`, 15, y + 20);
      doc.text(`Quality of Work: ${result.breakdown.quality || 0}/10`, 15, y + 26);
      doc.text(`Productivity: ${result.breakdown.productivity || 0}/10`, 15, y + 32);
      doc.text(`Teamwork: ${result.breakdown.teamwork || 0}/10`, 15, y + 38);
      
      y += 50;
    }
    
    console.log('generatePerformanceContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generatePerformanceContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Enhanced Salary Benchmarking content with better design
const generateBenchmarkingContent = (doc, result, userData, startY) => {
  try {
    console.log('generateBenchmarkingContent called with:', result);
    let y = startY;
    
    // Validate required fields
    if (!result.min || !result.max || !result.avg) {
      console.error('Missing required fields in result:', result);
      throw new Error('Missing required data for salary benchmarking');
    }
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Salary Range', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${formatCurrency(result.min)} - ${formatCurrency(result.max)}`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced salary details section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Salary Benchmarking', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const salaryItems = [
      { label: 'Minimum Salary', value: formatCurrency(result.min) },
      { label: 'Average Salary', value: formatCurrency(result.avg) },
      { label: 'Maximum Salary', value: formatCurrency(result.max) }
    ];
    
    salaryItems.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(item.label, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(item.value, 150, y, { align: 'right' });
      y += 8;
    });
    
    y += 15;
    
    // Enhanced job details section
    if (result.jobTitle || result.location || result.yearsExperience) {
      doc.setFillColor(BRAND_COLORS.highlight);
      doc.roundedRect(10, y, 190, 30, 5, 5, 'F');
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Position Details', 105, y + 10, { align: 'center' });
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      if (result.jobTitle) doc.text(`Job Title: ${result.jobTitle}`, 15, y + 20);
      if (result.location) doc.text(`Location: ${result.location}`, 15, y + 26);
      if (result.yearsExperience) doc.text(`Experience: ${result.yearsExperience} years`, 15, y + 32);
      
      y += 40;
    }
    
    console.log('generateBenchmarkingContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateBenchmarkingContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Generate Resume Parser content
const generateResumeParserContent = (doc, result, userData, startY) => {
  try {
    console.log('generateResumeParserContent called with:', result);
    let y = startY;
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Resume Analysis Results', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.totalSkills || 0} Skills Found`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced analysis details section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Resume Analysis', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const analysisDetails = [
      { label: 'Total Skills', value: result.totalSkills || 0 },
      { label: 'Technical Skills', value: result.technicalSkills?.length || 0 },
      { label: 'Soft Skills', value: result.softSkills?.length || 0 },
      { label: 'Experience Level', value: result.experienceLevel || 'Not specified' }
    ];
    
    analysisDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(detail.value, 60, y);
      y += 8;
    });
    
    y += 15;
    
    // Enhanced skills breakdown section
    if (result.technicalSkills || result.softSkills) {
      doc.setFillColor(BRAND_COLORS.highlight);
      doc.roundedRect(10, y, 190, 35, 5, 5, 'F');
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Skills Breakdown', 105, y + 10, { align: 'center' });
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      
      if (result.technicalSkills?.length > 0) {
        doc.text('Technical Skills:', 15, y + 20);
        doc.text(result.technicalSkills.slice(0, 3).join(', '), 15, y + 28);
      }
      
      if (result.softSkills?.length > 0) {
        doc.text('Soft Skills:', 15, y + 36);
        doc.text(result.softSkills.slice(0, 3).join(', '), 15, y + 44);
      }
      
      y += 45;
    }
    
    console.log('generateResumeParserContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateResumeParserContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Generate Document Analyzer content
const generateDocumentAnalyzerContent = (doc, result, userData, startY) => {
  try {
    console.log('generateDocumentAnalyzerContent called with:', result);
    let y = startY;
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.success);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Document Analysis Results', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.complianceScore || 0}% Compliance`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced analysis details section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Document Analysis', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const analysisDetails = [
      { label: 'Compliance Score', value: `${result.complianceScore || 0}%` },
      { label: 'Risk Level', value: result.riskLevel || 'Not specified' },
      { label: 'Issues Found', value: result.issuesFound || 0 },
      { label: 'Recommendations', value: result.recommendations?.length || 0 }
    ];
    
    analysisDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(detail.value, 60, y);
      y += 8;
    });
    
    y += 15;
    
    // Enhanced recommendations section
    if (result.recommendations?.length > 0) {
      doc.setFillColor(BRAND_COLORS.highlight);
      doc.roundedRect(10, y, 190, 35, 5, 5, 'F');
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Recommendations', 105, y + 10, { align: 'center' });
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      
      result.recommendations.slice(0, 3).forEach((rec, index) => {
        doc.text(`• ${rec}`, 15, y + 20 + (index * 8));
      });
      
      y += 45;
    }
    
    console.log('generateDocumentAnalyzerContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateDocumentAnalyzerContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Generate Compliance Risk Checker content
const generateComplianceRiskContent = (doc, result, userData, startY) => {
  try {
    console.log('generateComplianceRiskContent called with:', result);
    let y = startY;
    
    // Enhanced main result highlight with better design
    doc.setFillColor(BRAND_COLORS.danger);
    doc.roundedRect(10, y, 190, 30, 6, 6, 'F');
    
    // Add subtle pattern overlay
    doc.setFillColor(BRAND_COLORS.white);
    doc.setGlobalAlpha(0.1);
    for (let i = 0; i < 190; i += 20) {
      doc.circle(10 + i, y + 15, 2, 'F');
    }
    doc.setGlobalAlpha(1);
    
    doc.setTextColor(BRAND_COLORS.white);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Compliance Risk Assessment', 105, y + 12, { align: 'center' });
    
    doc.setFontSize(FONTS.title);
    doc.text(`${result.riskScore || 0}% Risk Level`, 105, y + 22, { align: 'center' });
    
    y += 40;
    
    // Enhanced risk details section
    doc.setTextColor(BRAND_COLORS.dark);
    doc.setFontSize(FONTS.heading);
    doc.setFont('helvetica', 'bold');
    doc.text('Risk Assessment', 10, y);
    y += 12;
    
    doc.setFontSize(FONTS.body);
    doc.setFont('helvetica', 'normal');
    
    const riskDetails = [
      { label: 'Risk Score', value: `${result.riskScore || 0}%` },
      { label: 'Risk Level', value: result.riskLevel || 'Not specified' },
      { label: 'Compliance Areas', value: result.complianceAreas?.length || 0 },
      { label: 'Critical Issues', value: result.criticalIssues || 0 }
    ];
    
    riskDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(BRAND_COLORS.light);
        doc.rect(10, y - 3, 190, 8, 'F');
      }
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.label}:`, 15, y);
      doc.setTextColor(BRAND_COLORS.text);
      doc.setFont('helvetica', 'normal');
      doc.text(detail.value, 60, y);
      y += 8;
    });
    
    y += 15;
    
    // Enhanced compliance areas section
    if (result.complianceAreas?.length > 0) {
      doc.setFillColor(BRAND_COLORS.highlight);
      doc.roundedRect(10, y, 190, 35, 5, 5, 'F');
      
      doc.setTextColor(BRAND_COLORS.dark);
      doc.setFontSize(FONTS.heading);
      doc.setFont('helvetica', 'bold');
      doc.text('Compliance Areas', 105, y + 10, { align: 'center' });
      
      doc.setFontSize(FONTS.body);
      doc.setFont('helvetica', 'normal');
      
      result.complianceAreas.slice(0, 3).forEach((area, index) => {
        doc.text(`• ${area}`, 15, y + 20 + (index * 8));
      });
      
      y += 45;
    }
    
    console.log('generateComplianceRiskContent completed, returning y:', y + 15);
    return y + 15;
  } catch (error) {
    console.error('Error in generateComplianceRiskContent:', error);
    console.error('Result:', result);
    throw error;
  }
};

// Enhanced footer with better design
const addFooter = (doc, startY) => {
  let y = startY;
  
  // Enhanced professional section divider
  addSectionDivider(doc, y);
  y += 20;
  
  // Enhanced professional footer content
  doc.setTextColor(BRAND_COLORS.text);
  doc.setFontSize(FONTS.small);
  doc.setFont('helvetica', 'normal');

  // Enhanced company branding
  doc.setFont('helvetica', 'bold');
  doc.text('Generated by Hire With Prachi', 105, y, { align: 'center' });
  y += 10;
  
  // Enhanced report details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONTS.tiny);
  doc.text(`Report generated on: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 105, y, { align: 'center' });
  y += 8;
  
  // Enhanced tagline
  doc.text('Professional HR Solutions for Startups & SMEs', 105, y, { align: 'center' });
  y += 8;
  
  // Enhanced contact info
  doc.text('📧 info@hirewithprachi.com | 📱 +91-8740889927', 105, y, { align: 'center' });
  
  return y + 20;
};

// Enhanced share function with PDF
export const shareCalculatorResult = async (calculatorType, result, userData) => {
  try {
    // Generate PDF
    const pdf = await generateCalculatorPDF(calculatorType, result, userData);
    const pdfBlob = pdf.output('blob');
    
    // Check if Web Share API supports files
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfBlob] })) {
                        await navigator.share({
                          title: `${getCalculatorTitle(calculatorType)} - Hire With Prachi`,
      text: 'Check out my calculation results from Hire With Prachi!',
                    files: [new File([pdfBlob], `${calculatorType}-report.pdf`, { type: 'application/pdf' })]
                  });
      return { success: true, method: 'native' };
    } else {
      // Fallback: download PDF
      pdf.save(`${calculatorType}-report.pdf`);
      return { success: true, method: 'download' };
    }
  } catch (error) {
    console.error('Share failed:', error);
    // Final fallback: download PDF
    const pdf = await generateCalculatorPDF(calculatorType, result, userData);
    pdf.save(`${calculatorType}-report.pdf`);
    return { success: true, method: 'download-fallback' };
  }
};

// Download PDF function
export const downloadCalculatorPDF = async (calculatorType, result, userData) => {
  try {
    console.log('downloadCalculatorPDF called with:', { calculatorType, result, userData });
    
    // Validate inputs
    if (!calculatorType || !result) {
      throw new Error('Missing required parameters for PDF generation');
    }
    
    // Simplified browser and environment compatibility check
    try {
      const environment = await validatePDFEnvironment();
      if (!environment.supported) {
        console.warn('PDF environment not fully supported, attempting generation anyway:', environment.recommendations);
      }
    } catch (validationError) {
      console.warn('PDF validation failed, attempting generation anyway:', validationError.message);
    }
    
    console.log('Generating PDF for calculator type:', calculatorType);
    console.log('Result data:', result);
    
    const pdf = await generateCalculatorPDF(calculatorType, result, userData);
    console.log('PDF generated successfully, saving...');
    
    // Validate PDF before saving
    try {
      validatePDFGeneration(pdf);
    } catch (validationError) {
      console.warn('PDF validation failed, attempting save anyway:', validationError.message);
    }
    
    const filename = `${calculatorType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
    console.log('PDF downloaded successfully:', filename);
    return filename;
  } catch (error) {
    console.error('Error in downloadCalculatorPDF:', error);
    
    // Try to get error details but don't fail if it doesn't work
    try {
      const errorDetails = await getPDFErrorDetails(error, { 
        calculatorType, 
        result, 
        userData,
        function: 'downloadCalculatorPDF'
      });
      console.error('Error details:', errorDetails);
    } catch (detailsError) {
      console.error('Could not get detailed error info:', detailsError);
    }
    
    throw error;
  }
};

// Test function for debugging
export const testPDFGeneration = (calculatorType) => {
  try {
    console.log('Testing PDF generation for:', calculatorType);
    
    // Create test data based on calculator type
    let testResult = {};
    let testUserData = { name: 'Test User', email: 'test@example.com' };
    
    switch (calculatorType) {
      case 'needs-assessment':
        testResult = {
          recommendedFTE: 2,
          industry: 'Tech',
          employees: 150,
          recommendedPackage: 'Pro'
        };
        break;
      case 'engagement':
        testResult = {
          engagementScore: 75,
          engagementLevel: 'Moderately Engaged',
          category: 'Moderately Engaged',
          description: 'Good engagement levels. Consider targeted improvements.',
          recommendations: 'Focus on communication and recognition programs.',
          keyAreas: ['Employee Recognition', 'Communication Channels', 'Professional Development']
        };
        break;
      case 'salary':
        testResult = {
          calculatedSalary: 800000,
          position: 'HR Manager',
          experience: '5-8',
          location: 'Mumbai',
          industry: 'Technology',
          minSalary: 700000,
          maxSalary: 900000,
          breakdown: {
            base: 600000,
            experience: 1.4,
            location: 1.35,
            education: 1.1,
            companySize: 1.0,
            industry: 1.1
          }
        };
        break;
      case 'benefits':
        testResult = {
          totalBenefits: 150000,
          totalCompensation: 650000,
          healthInsurance: 50000,
          dentalInsurance: 15000,
          visionInsurance: 10000,
          retirementMatch: 40000,
          paidTimeOff: 20000,
          bonuses: 10000,
          stockOptions: 5000,
          otherBenefits: 0,
          benefitsPercentage: 23.1,
          packageRating: 'Good'
        };
        break;
      case 'turnover':
        testResult = {
          turnoverRate: 15.5,
          totalCost: 2500000,
          annualizedCost: 3000000,
          breakdown: {
            recruitment: 1000000,
            training: 800000,
            productivity: 700000
          },
          turnoverLevel: {
            level: 'Moderate',
            risk: 'Medium'
          }
        };
        break;
      case 'performance':
        testResult = {
          score: 85.5,
          rating: 'Excellent',
          averageScore: 8.5,
          totalScore: 34,
          breakdown: {
            goals: 9,
            quality: 8,
            productivity: 9,
            teamwork: 8
          }
        };
        break;
      case 'benchmarking':
        testResult = {
          min: 600000,
          avg: 750000,
          max: 900000,
          jobTitle: 'HR Manager',
          location: 'Mumbai',
          yearsExperience: 5
        };
        break;
      case 'resume-parser':
        testResult = {
          totalSkills: 15,
          technicalSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git', 'Linux', 'CSS', 'HTML', 'TypeScript', 'Express.js', 'MongoDB', 'Redis'],
          softSkills: ['Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Adaptability', 'Time Management', 'Attention to Detail', 'Critical Thinking', 'Creativity', 'Flexibility', 'Patience', 'Empathy', 'Self-Motivation', 'Organizational Skills', 'Analytical Skills']
        };
        break;
      case 'document-analyzer':
        testResult = {
          complianceScore: 98,
          riskLevel: 'Low',
          issuesFound: 0,
          recommendations: ['All documents are compliant with GDPR.', 'No sensitive data exposure found.', 'Encryption policies are up-to-date.']
        };
        break;
      case 'compliance-risk-checker':
        testResult = {
          riskScore: 70,
          riskLevel: 'Moderate',
          complianceAreas: ['Data Protection', 'Privacy Compliance', 'Security Measures', 'Employee Data Handling'],
          criticalIssues: 2,
          recommendations: ['Implement stronger password policies.', 'Enhance encryption for sensitive data.', 'Strengthen access controls for HR data.']
        };
        break;
      default:
        testResult = { test: 'data' };
    }
    
    const pdf = generateCalculatorPDF(calculatorType, testResult, testUserData);
    console.log('Test PDF generation successful for:', calculatorType);
    return { success: true, pdf };
  } catch (error) {
    console.error('Test PDF generation failed for:', calculatorType, error);
    return { success: false, error: error.message };
  }
}; 