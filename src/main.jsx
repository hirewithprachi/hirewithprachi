import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

// Lazy load main pages
// const HomePage = lazy(() => import('./pages/HomePage')); // Removed - old home page
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Resources = lazy(() => import('./pages/Resources'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const GDPRDataDeletion = lazy(() => import('./pages/GDPRDataDeletion'));
const HirableHomepage = lazy(() => import('./pages/HirableHomepage'));
// Core components that should load immediately
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const ScrollProgressBar = lazy(() => import('./components/ScrollProgressBar'));
// import ExitIntentPopup from './components/ExitIntentPopup';
import { AuthProvider } from './lib/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
const LoadingFallback = lazy(() => import('./components/ui/LoadingFallback'));


// Non-critical components that can be lazy loaded
const GPT4oMiniChatbot = lazy(() => import('./components/GPT4oMiniChatbot'));
// Import FacebookPixel as lazy component
const FacebookPixel = lazy(() => import('./components/FacebookPixel'));

// Lazy load service pages
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const HRComplianceService = lazy(() => import('./pages/HRComplianceService'));
const RecruitmentService = lazy(() => import('./pages/RecruitmentService'));
const EmployeeEngagementService = lazy(() => import('./pages/EmployeeEngagementService'));
const VirtualHRServices = lazy(() => import('./pages/VirtualHRServices'));
const PayrollManagementService = lazy(() => import('./pages/PayrollManagementService'));

// Lazy load location-specific pages
const HRServicesMumbai = lazy(() => import('./pages/HRServicesMumbai'));
const PerformanceManagementService = lazy(() => import('./pages/PerformanceManagementService'));
const HRServicesDelhi = lazy(() => import('./pages/HRServicesDelhi'));
// const HRAuditService = lazy(() => import('./pages/HRAuditService')); // Removed - HR audit service page
const HRServicesBangalore = lazy(() => import('./pages/HRServicesBangalore'));
const HRServicesChennai = lazy(() => import('./pages/HRServicesChennai'));
const HRServicesHyderabad = lazy(() => import('./pages/HRServicesHyderabad'));
const HRServicesPune = lazy(() => import('./pages/HRServicesPune'));
const HRServicesAhmedabad = lazy(() => import('./pages/HRServicesAhmedabad'));
const HRServicesKolkata = lazy(() => import('./pages/HRServicesKolkata'));
const HRServicesJaipur = lazy(() => import('./pages/HRServicesJaipur'));
const HRServicesLucknow = lazy(() => import('./pages/HRServicesLucknow'));
const HRServicesIndore = lazy(() => import('./pages/HRServicesIndore'));
const HRServicesBhubaneswar = lazy(() => import('./pages/HRServicesBhubaneswar'));
const HRServicesNagpur = lazy(() => import('./pages/HRServicesNagpur'));
const HRServicesCoimbatore = lazy(() => import('./pages/HRServicesCoimbatore'));
const PrachiPortfolio = lazy(() => import('./pages/PrachiPortfolio'));

const Blog = React.lazy(() => import('./pages/Blog.jsx'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage.jsx'));
const HRQuiz = React.lazy(() => import('./pages/HRQuiz.jsx'));
const ResourceDownloads = React.lazy(() => import('./pages/ResourceDownloads.jsx'));
const HRCostSavingsCalculator = React.lazy(() => import('./pages/HRCostSavingsCalculator.jsx'));
const HRNeedsAssessmentCalculator = React.lazy(() => import('./pages/HRNeedsAssessmentCalculator.jsx'));
const ComplianceRiskChecker = React.lazy(() => import('./pages/ComplianceRiskChecker.jsx'));
const DocumentAnalyzer = React.lazy(() => import('./pages/DocumentAnalyzer.jsx'));
const ResumeParser = React.lazy(() => import('./pages/ResumeParser.jsx'));
const TurnoverCalculator = React.lazy(() => import('./pages/TurnoverCalculator.jsx'));
const PerformanceCalculator = React.lazy(() => import('./pages/PerformanceCalculator.jsx'));
const BenefitsCalculator = React.lazy(() => import('./pages/BenefitsCalculator.jsx'));
const ROICalculator = React.lazy(() => import('./pages/ROICalculator.jsx'));
const SalaryBenchmarkingTool = React.lazy(() => import('./pages/SalaryBenchmarkingTool.jsx'));
const SalaryCalculator = React.lazy(() => import('./components/SalaryCalculator.jsx'));

const EmployeeSalaryCalculator = React.lazy(() => import('./components/EmployeeSalaryCalculator.jsx'));
const EmployeeEngagementCalculator = React.lazy(() => import('./pages/EmployeeEngagementCalculator.jsx'));
// const BIDashboard = React.lazy(() => import('./pages/BIDashboard.jsx')); // Removed - BI dashboard page
const WorldClassAdminDashboard = React.lazy(() => import('./pages/WorldClassAdminDashboard.jsx'));
const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute.jsx'));
const HRToolsLibrary = React.lazy(() => import('./pages/HRToolsLibrary.jsx'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard.jsx'));

const HRPolicyGenerator = React.lazy(() => import('./pages/HRPolicyGenerator.jsx'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        style={{ minHeight: '100vh' }}
      >
        <Suspense fallback={<SimpleLoader />}>
          <Routes location={location}>
            <Route path="/" element={<HirableHomepage />} />
            {/* <Route path="/old-home" element={<HomePage />} /> */} {/* Removed - old home page */}
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/services/hr-compliance" element={<HRComplianceService />} />
            <Route path="/services/recruitment-hiring" element={<RecruitmentService />} />
            <Route path="/services/employee-engagement" element={<EmployeeEngagementService />} />
            <Route path="/services/virtual-hr-services" element={<VirtualHRServices />} />
            <Route path="/services/payroll-management" element={<PayrollManagementService />} />
            <Route path="/services/performance-management" element={<PerformanceManagementService />} />
            {/* <Route path="/services/hr-audit" element={<HRAuditService />} /> */} {/* Removed - HR audit service */}
            <Route path="/hr-services-mumbai" element={<HRServicesMumbai />} />
            <Route path="/hr-services-delhi" element={<HRServicesDelhi />} />
            <Route path="/hr-services-bangalore" element={<HRServicesBangalore />} />
            <Route path="/hr-services-chennai" element={<HRServicesChennai />} />
            <Route path="/hr-services-hyderabad" element={<HRServicesHyderabad />} />
            <Route path="/hr-services-pune" element={<HRServicesPune />} />
            <Route path="/hr-services-ahmedabad" element={<HRServicesAhmedabad />} />
            <Route path="/hr-services-kolkata" element={<HRServicesKolkata />} />
            <Route path="/hr-services-jaipur" element={<HRServicesJaipur />} />
            <Route path="/hr-services-lucknow" element={<HRServicesLucknow />} />
            <Route path="/hr-services-indore" element={<HRServicesIndore />} />
            <Route path="/hr-services-bhubaneswar" element={<HRServicesBhubaneswar />} />
            <Route path="/hr-services-nagpur" element={<HRServicesNagpur />} />
            <Route path="/hr-services-coimbatore" element={<HRServicesCoimbatore />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/hr-quiz" element={<HRQuiz />} />
            <Route path="/hr-cost-savings-calculator" element={<HRCostSavingsCalculator />} />
            <Route path="/hr-needs-assessment-calculator" element={<HRNeedsAssessmentCalculator />} />
            <Route path="/compliance-risk-checker" element={<ComplianceRiskChecker />} />
            <Route path="/document-analyzer" element={<DocumentAnalyzer />} />
            <Route path="/resume-parser" element={<ResumeParser />} />
            <Route path="/turnover-calculator" element={<TurnoverCalculator />} />
            <Route path="/performance-calculator" element={<PerformanceCalculator />} />
            <Route path="/benefits-calculator" element={<BenefitsCalculator />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/salary-benchmarking-tool" element={<SalaryBenchmarkingTool />} />
            <Route path="/salary-calculator" element={<SalaryCalculator />} />

            <Route path="/employee-salary-calculator" element={<EmployeeSalaryCalculator />} />
            <Route path="/employee-engagement-calculator" element={<EmployeeEngagementCalculator />} />
            {/* <Route path="/bi-dashboard" element={<BIDashboard />} /> */} {/* Removed - BI dashboard */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <WorldClassAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/resource-downloads" element={<ResourceDownloads />} />
            <Route path="/resource-downloads/:templateId" element={<ResourceDownloads />} />

            <Route path="/gdpr-data-deletion" element={<GDPRDataDeletion />} />
            <Route path="/hirable-homepage" element={<HirableHomepage />} />
            <Route path="/prachi-shrivastava" element={<PrachiPortfolio />} />
            <Route path="/tools" element={<HRToolsLibrary />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/hr-policy-generator" element={<HRPolicyGenerator />} />

          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

// Simple loading fallback for immediate use
const SimpleLoader = () => (
  <div className="flex items-center justify-center p-2">
    <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 w-4 h-4"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Suspense fallback={<SimpleLoader />}>
            <ErrorBoundary>
              <div className="App">
                <Suspense fallback={null}>
                  <FacebookPixel />
                </Suspense>
                <Suspense fallback={null}>
                  <CookieConsent />
                </Suspense>
                <Suspense fallback={null}>
                  <ScrollProgressBar />
                </Suspense>
                {/* <ExitIntentPopup /> */}
                <Suspense fallback={null}>
                  <GPT4oMiniChatbot />
                </Suspense>
        
                <AnimatedRoutes />
              </div>
            </ErrorBoundary>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);