import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import {
  HomePage,
  About,
  Services,
  Resources,
  Contact,
  PrivacyPolicy,
  TermsOfService,
  GDPRDataDeletion,
  HirableHomepage,
} from './pages';
import CookieConsent from './components/CookieConsent';
import ScrollProgressBar from './components/ScrollProgressBar';
// import ExitIntentPopup from './components/ExitIntentPopup';
import { AuthProvider } from './lib/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';


import AIChatbotWidget from './components/AIChatbotWidget';
import ServiceDetailPage from './pages/ServiceDetailPage';
import HRComplianceService from './pages/HRComplianceService';
import RecruitmentService from './pages/RecruitmentService';
import EmployeeEngagementService from './pages/EmployeeEngagementService';
import AdminRoute from './components/AdminRoute';
import AdminRedirect from './components/AdminRedirect';

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
const BIDashboard = React.lazy(() => import('./pages/BIDashboard.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard.jsx'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin.jsx'));
const AdminRegister = React.lazy(() => import('./pages/AdminRegister.jsx'));
const AdminVideoManager = React.lazy(() => import('./pages/AdminVideoManager.jsx'));
const AdminResetPassword = React.lazy(() => import('./pages/AdminResetPassword.jsx'));
const AdminResetPasswordConfirm = React.lazy(() => import('./pages/AdminResetPasswordConfirm.jsx'));

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
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 w-8 h-8 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        }>
          <Routes location={location}>
            <Route path="/" element={<HirableHomepage />} />
            <Route path="/old-home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/services/hr-compliance" element={<HRComplianceService />} />
            <Route path="/services/recruitment-hiring" element={<RecruitmentService />} />
            <Route path="/services/employee-engagement" element={<EmployeeEngagementService />} />
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
            <Route path="/bi-dashboard" element={<BIDashboard />} />
            <Route path="/resource-downloads" element={<ResourceDownloads />} />
            <Route path="/resource-downloads/:templateId" element={<ResourceDownloads />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
            <Route path="/admin/reset-password-confirm" element={<AdminResetPasswordConfirm />} />

            <Route path="/admin/videos" element={<AdminRoute><AdminVideoManager /></AdminRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/gdpr-data-deletion" element={<GDPRDataDeletion />} />
            <Route path="/hirable-homepage" element={<HirableHomepage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <div className="App">
              <CookieConsent />
              <ScrollProgressBar />
              {/* <ExitIntentPopup /> */}
              <AIChatbotWidget />
      
              <AnimatedRoutes />
            </div>
          </ErrorBoundary>
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