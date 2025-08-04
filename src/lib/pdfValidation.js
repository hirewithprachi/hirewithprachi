// PDF Validation and Compatibility Utilities

// Browser compatibility check
export const isPDFSupported = () => {
  if (typeof window === 'undefined') {
    return false; // Server-side rendering
  }
  
  const hasURL = !!window.URL;
  const hasCreateObjectURL = !!window.URL?.createObjectURL;
  const hasBlob = !!window.Blob;
  const userAgent = navigator.userAgent;
  
  // Check for problematic browsers - allow Safari but with warnings
  const isOldIE = userAgent.includes('MSIE') || userAgent.includes('Trident');
  
  return hasURL && hasCreateObjectURL && hasBlob && !isOldIE;
};

// PDF object validation
export const validatePDFObject = (pdf) => {
  if (!pdf) {
    throw new Error('PDF object is null or undefined');
  }
  
  if (typeof pdf.save !== 'function') {
    throw new Error('PDF object does not have save method');
  }
  
  if (typeof pdf.text !== 'function') {
    throw new Error('PDF object does not have text method');
  }
  
  return true;
};

// CSP compatibility check
export const checkCSPCompatibility = () => {
  if (typeof window === 'undefined') {
    return { compatible: true, reason: 'Server-side rendering' };
  }
  
  try {
    // Test blob URL creation
    const testBlob = new Blob(['test'], { type: 'text/plain' });
    const testUrl = URL.createObjectURL(testBlob);
    URL.revokeObjectURL(testUrl);
    
    return { compatible: true, reason: 'Blob URLs supported' };
  } catch (error) {
    return { 
      compatible: false, 
      reason: 'Blob URLs blocked by CSP or browser restrictions',
      error: error.message 
    };
  }
};

// Check if jsPDF is available
export const checkJsPDFAvailability = async () => {
  try {
    // Try to import jsPDF dynamically
    const jsPDFModule = await import('jspdf');
    // Check if jsPDF is available as named export or default export
    const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
    if (!jsPDF) {
      throw new Error('jsPDF not found in module');
    }
    return { available: true, error: null };
  } catch (error) {
    return { available: false, error: error.message };
  }
};

// PDF generation environment check
export const validatePDFEnvironment = async () => {
  const jsPDFCheck = await checkJsPDFAvailability();
  
  const checks = {
    browser: isPDFSupported(),
    csp: checkCSPCompatibility(),
    jsPDF: jsPDFCheck.available,
    blobSupport: typeof window !== 'undefined' && window.Blob,
    urlSupport: typeof window !== 'undefined' && window.URL
  };
  
  const allChecksPass = checks.browser && checks.csp.compatible && checks.jsPDF && checks.blobSupport && checks.urlSupport;
  
  return {
    supported: allChecksPass,
    checks,
    recommendations: allChecksPass ? [] : [
      !checks.browser && 'Use Chrome, Firefox, or Edge browser',
      !checks.csp.compatible && 'Check Content Security Policy settings',
      !checks.jsPDF && `jsPDF library not loaded properly: ${jsPDFCheck.error}`,
      !checks.blobSupport && 'Browser does not support Blob API',
      !checks.urlSupport && 'Browser does not support URL API'
    ]
  };
};

// Enhanced error reporting
export const getPDFErrorDetails = async (error, context = {}) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    browser: navigator.userAgent,
    timestamp: new Date().toISOString(),
    context,
    environment: await validatePDFEnvironment()
  };
  
  console.error('PDF Generation Error Details:', errorInfo);
  return errorInfo;
};

// PDF generation wrapper with comprehensive validation
export const safePDFGeneration = async (generatorFunction, ...args) => {
  try {
    // Pre-flight checks
    const environment = await validatePDFEnvironment();
    if (!environment.supported) {
      throw new Error(`PDF generation not supported: ${environment.recommendations.join(', ')}`);
    }
    
    // Generate PDF
    const pdf = await generatorFunction(...args);
    
    // Validate PDF object
    validatePDFObject(pdf);
    
    return pdf;
  } catch (error) {
    const errorDetails = await getPDFErrorDetails(error, { args });
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

// Browser-specific PDF handling
export const getBrowserSpecificPDFHandler = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome')) {
    return {
      name: 'Chrome',
      supportsBlob: true,
      supportsPDF: true,
      recommendations: ['Use standard PDF generation']
    };
  } else if (userAgent.includes('Firefox')) {
    return {
      name: 'Firefox',
      supportsBlob: true,
      supportsPDF: true,
      recommendations: ['Use standard PDF generation']
    };
  } else if (userAgent.includes('Safari')) {
    return {
      name: 'Safari',
      supportsBlob: true,
      supportsPDF: false,
      recommendations: ['Safari has limited PDF support, try Chrome or Firefox']
    };
  } else if (userAgent.includes('Edge')) {
    return {
      name: 'Edge',
      supportsBlob: true,
      supportsPDF: true,
      recommendations: ['Use standard PDF generation']
    };
  } else {
    return {
      name: 'Unknown Browser',
      supportsBlob: true,
      supportsPDF: false,
      recommendations: ['Try Chrome, Firefox, or Edge for best PDF support']
    };
  }
}; 