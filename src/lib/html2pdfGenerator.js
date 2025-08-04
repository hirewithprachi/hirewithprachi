import html2pdf from 'html2pdf.js';

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

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
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

// Alternative PDF generation method using jsPDF directly (MORE RELIABLE)
export const downloadCalculatorPDFAlternative = async (calculatorType, result, userData) => {
  try {
    console.log('Using alternative PDF generation method');
    
    // Dynamic import of jsPDF
    const { jsPDF } = await import('jspdf');
    
    // Create PDF document
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(30, 64, 175); // Blue color
    doc.text('Hire With Prachi', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Professional HR Solutions & Consulting', 20, 30);
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(30, 64, 175);
    doc.text(getCalculatorTitle(calculatorType), 20, 55);
    
    // Add content based on calculator type
    let yPosition = 70;
    
    switch (calculatorType) {
      case 'engagement':
        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129); // Green
        doc.text(`Employee Engagement Score: ${result.engagementScore}%`, 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Level: ${result.engagementLevel}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Description: ${result.description}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Recommendations: ${result.recommendations}`, 20, yPosition);
        break;
        
      case 'salary':
        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text(`Calculated Salary: ${formatCurrency(result.calculatedSalary)}`, 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Position: ${result.position}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Experience: ${result.experience} years`, 20, yPosition);
        yPosition += 10;
        doc.text(`Location: ${result.location}`, 20, yPosition);
        break;
        
      case 'cost-savings':
        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text(`Annual Cost Savings: ${formatCurrency(result.annualSavings)}`, 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Current Cost: ${formatCurrency(result.currentCost)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Virtual Cost: ${formatCurrency(result.virtualCost)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Savings Percentage: ${result.savingsPercentage}%`, 20, yPosition);
        break;
        
      case 'roi':
        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text(`ROI Analysis: ${result.roiPercentage}%`, 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Investment Amount: ${formatCurrency(result.investment)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Expected Return: ${formatCurrency(result.expectedReturn)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Payback Period: ${result.paybackPeriod} months`, 20, yPosition);
        break;
        
      case 'benefits':
        doc.setFontSize(14);
        doc.setTextColor(16, 185, 129);
        doc.text(`Total Benefits Package: ${formatCurrency(result.totalBenefits)}`, 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Health Insurance: ${formatCurrency(result.healthInsurance)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Dental Insurance: ${formatCurrency(result.dentalInsurance)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Retirement Match: ${formatCurrency(result.retirementMatch)}`, 20, yPosition);
        break;
        
      default:
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text('Calculator Results:', 20, yPosition);
        yPosition += 10;
        doc.text(JSON.stringify(result, null, 2), 20, yPosition);
    }
    
    // Add user data if available
    if (userData && Object.keys(userData).length > 0) {
      yPosition += 20;
      doc.setFontSize(12);
      doc.setTextColor(30, 64, 175);
      doc.text('User Information:', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      if (userData.name) doc.text(`Name: ${userData.name}`, 20, yPosition), yPosition += 8;
      if (userData.email) doc.text(`Email: ${userData.email}`, 20, yPosition), yPosition += 8;
      if (userData.company) doc.text(`Company: ${userData.company}`, 20, yPosition), yPosition += 8;
    }
    
    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated by Hire with Prachi', 20, pageHeight - 20);
    doc.text('info@hirewithprachi.com | +91-8740889927', 20, pageHeight - 15);
    
    // Save the PDF
    const filename = `${calculatorType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    console.log('Alternative PDF generation successful:', filename);
    return filename;
  } catch (error) {
    console.error('Alternative PDF generation failed:', error);
    throw error;
  }
};

// Main PDF download function
export const downloadCalculatorPDF = async (calculatorType, result, userData) => {
  try {
    console.log('downloadCalculatorPDF called with:', { calculatorType, result, userData });
    
    // Validate inputs
    if (!calculatorType || !result) {
      throw new Error('Missing required parameters for PDF generation');
    }
    
    console.log('Generating PDF for calculator type:', calculatorType);
    console.log('Result data:', result);
    
    // Try alternative method first (more reliable across browsers)
    try {
      console.log('Attempting alternative PDF generation method...');
      return await downloadCalculatorPDFAlternative(calculatorType, result, userData);
    } catch (alternativeError) {
      console.log('Alternative method failed, trying html2pdf...', alternativeError);
    }
    
    // Fallback to html2pdf method (if alternative fails)
    console.log('Using html2pdf fallback method...');
    
    // Create simple HTML content for html2pdf
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let contentHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
        <div style="background: linear-gradient(135deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.secondary}); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px;">Hire With Prachi</h1>
          <p style="margin: 5px 0; font-size: 14px;">Professional HR Solutions & Consulting</p>
          <p style="margin: 10px 0 0 0; font-size: 12px;">Report Generated: ${currentDate}</p>
        </div>
        
        <div style="background: ${BRAND_COLORS.primary}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">${getCalculatorTitle(calculatorType)}</h2>
        </div>
        
        <div style="background: ${BRAND_COLORS.light}; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    `;

    // Add calculator-specific content
    switch (calculatorType) {
      case 'engagement':
        contentHTML += `
          <div style="background: ${BRAND_COLORS.success}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
            <h3 style="margin: 0; font-size: 18px;">Employee Engagement Score</h3>
            <p style="margin: 5px 0; font-size: 24px; font-weight: bold;">${result.engagementScore}%</p>
          </div>
          <div style="margin-bottom: 15px;">
            <h4 style="color: ${BRAND_COLORS.dark}; margin-bottom: 10px;">Engagement Level</h4>
            <div style="background: white; padding: 10px; border-radius: 5px;">
              <p><strong>Level:</strong> ${result.engagementLevel}</p>
              <p><strong>Description:</strong> ${result.description}</p>
              <p><strong>Recommendations:</strong> ${result.recommendations}</p>
            </div>
          </div>
        `;
        break;
        
      case 'salary':
        contentHTML += `
          <div style="background: ${BRAND_COLORS.success}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
            <h3 style="margin: 0; font-size: 18px;">Calculated Salary</h3>
            <p style="margin: 5px 0; font-size: 24px; font-weight: bold;">${formatCurrency(result.calculatedSalary)}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <h4 style="color: ${BRAND_COLORS.dark}; margin-bottom: 10px;">Position Details</h4>
            <div style="background: white; padding: 10px; border-radius: 5px;">
              <p><strong>Position:</strong> ${result.position}</p>
              <p><strong>Experience:</strong> ${result.experience} years</p>
              <p><strong>Location:</strong> ${result.location}</p>
              <p><strong>Industry:</strong> ${result.industry}</p>
            </div>
          </div>
        `;
        break;
        
      default:
        contentHTML += `
          <div style="background: ${BRAND_COLORS.primary}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
            <h3 style="margin: 0; font-size: 18px;">Calculator Results</h3>
          </div>
          <div style="background: white; padding: 10px; border-radius: 5px;">
            <pre style="margin: 0; font-family: Arial, sans-serif;">${JSON.stringify(result, null, 2)}</pre>
          </div>
        `;
    }

    // Add user data if available
    if (userData && Object.keys(userData).length > 0) {
      contentHTML += `
        <div style="margin-bottom: 15px;">
          <h4 style="color: ${BRAND_COLORS.dark}; margin-bottom: 10px;">User Information</h4>
          <div style="background: white; padding: 10px; border-radius: 5px;">
            ${userData.name ? `<p><strong>Name:</strong> ${userData.name}</p>` : ''}
            ${userData.email ? `<p><strong>Email:</strong> ${userData.email}</p>` : ''}
            ${userData.company ? `<p><strong>Company:</strong> ${userData.company}</p>` : ''}
          </div>
        </div>
      `;
    }

    contentHTML += `
        </div>
        
        <div style="background: ${BRAND_COLORS.accent}; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <h3 style="margin: 0 0 10px 0; font-size: 18px;">Ready to Transform Your HR Strategy?</h3>
          <p style="margin: 0 0 15px 0; font-size: 14px;">Book a FREE consultation with our HR experts</p>
          <p>📧 info@hirewithprachi.com</p>
          <p>📱 +91-8740889927 | 🌐 prachi-hr.com</p>
        </div>
        
        <div style="background: ${BRAND_COLORS.dark}; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 12px;">
          <p style="margin: 0; font-weight: bold;">Generated by Hire with Prachi</p>
          <p style="margin: 5px 0;">Professional HR Solutions for Startups & SMEs</p>
          <p style="margin: 5px 0;">Generated on ${currentDate}</p>
        </div>
      </div>
    `;
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = contentHTML;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '12px';
    tempContainer.style.lineHeight = '1.4';
    tempContainer.style.color = '#333';
    
    // Add to DOM and wait for rendering
    document.body.appendChild(tempContainer);
    
    // Wait for the content to render
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate PDF using html2pdf with simplified options
    const filename = `${calculatorType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
    
    const pdfOptions = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { 
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };
    
    console.log('Starting html2pdf generation with options:', pdfOptions);
    
    // Add timeout to prevent infinite processing
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('PDF generation timeout')), 15000); // 15 seconds timeout
    });
    
    const pdfPromise = html2pdf()
      .from(tempContainer)
      .set(pdfOptions)
      .save();
    
    // Race between PDF generation and timeout
    await Promise.race([pdfPromise, timeoutPromise]);
    
    // Clean up immediately after successful generation
    if (document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
    
    console.log('html2pdf PDF downloaded successfully:', filename);
    return filename;
  } catch (error) {
    console.error('Error in downloadCalculatorPDF:', error);
    
    // Clean up on error
    const tempContainer = document.querySelector('div[style*="-9999px"]');
    if (tempContainer && document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
    
    // Fallback to simple text download
    try {
      const textContent = `Calculator Report: ${calculatorType}\n\nResults:\n${JSON.stringify(result, null, 2)}\n\nGenerated on: ${new Date().toLocaleDateString()}`;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${calculatorType}-report-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      console.log('Fallback text file downloaded');
      return `${calculatorType}-report-${new Date().toISOString().split('T')[0]}.txt`;
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw error;
    }
  }
};

// Share PDF function (for compatibility)
export const shareCalculatorResult = async (calculatorType, result, userData) => {
  try {
    console.log('shareCalculatorResult called with:', { calculatorType, result, userData });
    
    // For now, just download the PDF
    // In the future, this could be enhanced to use Web Share API
    const filename = await downloadCalculatorPDF(calculatorType, result, userData);
    
    return { success: true, method: 'download', filename };
  } catch (error) {
    console.error('Error in shareCalculatorResult:', error);
    throw error;
  }
};

// Test function for debugging
export const testPDFGeneration = (calculatorType) => {
  try {
    console.log('Testing PDF generation for:', calculatorType);
    
    // Create test data based on calculator type
    let testResult = {};
    let testUserData = { name: 'Test User', email: 'test@example.com', company: 'Test Company' };
    
    switch (calculatorType) {
      case 'salary':
        testResult = {
          calculatedSalary: 800000,
          position: 'HR Manager',
          experience: '5-8',
          location: 'Mumbai',
          industry: 'Technology',
          minSalary: 700000,
          maxSalary: 900000
        };
        break;
      case 'employee':
        testResult = {
          netSalary: 750000,
          position: 'HR Generalist',
          experience: '3-5'
        };
        break;
      case 'engagement':
        testResult = {
          engagementScore: 75,
          engagementLevel: 'Moderately Engaged',
          totalScore: 15,
          maxScore: 20,
          averageScore: 3.0,
          description: 'Good engagement levels. Consider targeted improvements for even better results.',
          recommendations: 'Focus on communication and recognition programs.',
          keyAreas: ['Employee Recognition', 'Communication Channels', 'Professional Development', 'Team Building']
        };
        break;
      case 'cost-savings':
        testResult = {
          annualSavings: 500000,
          currentCost: 2000000,
          virtualCost: 1500000,
          savingsPercentage: 25
        };
        break;
      case 'roi':
        testResult = {
          roiPercentage: 150,
          investment: 100000,
          returns: 250000,
          paybackPeriod: 8
        };
        break;
      default:
        testResult = { test: 'Test data' };
    }
    
    // Try alternative method first, then fallback to html2pdf
    return downloadCalculatorPDFAlternative(calculatorType, testResult, testUserData);
  } catch (error) {
    console.error('Test PDF generation failed:', error);
    throw error;
  }
}; 