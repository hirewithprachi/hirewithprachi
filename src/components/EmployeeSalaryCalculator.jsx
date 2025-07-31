import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Users, Mail, Phone, TrendingUp, DollarSign, PieChart, Download, Share2, Star, CheckCircle, ArrowRight, Building, Award, Shield, Calendar, Clock, FileText } from 'lucide-react';

const EmployeeSalaryCalculator = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    employeeId: '',
    designation: '',
    department: '',
    joiningDate: '',
    basicSalary: '',
    hra: '',
    da: '',
    ta: '',
    medical: '',
    bonus: '',
    overtime: '',
    other: '',
    pf: '12',
    esi: '0.75',
    tax: '0',
    workingDays: '',
    totalDays: '30',
    leaveDays: '0',
    showAdvanced: false
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [calculationCount, setCalculationCount] = useState(0);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: ''
  });

  // Calculate salary components
  const grossSalary = parseFloat(employeeData.basicSalary || 0) + 
                     parseFloat(employeeData.hra || 0) + 
                     parseFloat(employeeData.da || 0) + 
                     parseFloat(employeeData.ta || 0) + 
                     parseFloat(employeeData.medical || 0) + 
                     parseFloat(employeeData.bonus || 0) + 
                     parseFloat(employeeData.overtime || 0) + 
                     parseFloat(employeeData.other || 0);
  
  const pfAmount = (parseFloat(employeeData.basicSalary || 0) * parseFloat(employeeData.pf)) / 100;
  const esiAmount = (grossSalary * parseFloat(employeeData.esi)) / 100;
  const taxAmount = (grossSalary * parseFloat(employeeData.tax)) / 100;
  const totalDeductions = pfAmount + esiAmount + taxAmount;
  const netSalary = grossSalary - totalDeductions;

  // Calculate pro-rated salary based on working days
  const workingDays = parseFloat(employeeData.workingDays || 0);
  const totalDays = parseFloat(employeeData.totalDays || 30);
  const leaveDays = parseFloat(employeeData.leaveDays || 0);
  const actualWorkingDays = workingDays - leaveDays;
  
  const proRatedGrossSalary = (grossSalary / totalDays) * actualWorkingDays;
  const proRatedDeductions = (totalDeductions / totalDays) * actualWorkingDays;
  const proRatedNetSalary = proRatedGrossSalary - proRatedDeductions;

  const handleInputChange = (field, value) => {
    setEmployeeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setCalculationCount(prev => prev + 1);
    
    setTimeout(() => {
      setResult({
        employeeData,
        grossSalary,
        netSalary,
        proRatedGrossSalary,
        proRatedNetSalary,
        deductions: {
          pf: pfAmount,
          esi: esiAmount,
          tax: taxAmount,
          total: totalDeductions
        },
        workingDays: {
          total: workingDays,
          actual: actualWorkingDays,
          leave: leaveDays,
          attendance: ((actualWorkingDays / workingDays) * 100).toFixed(1)
        }
      });
      setIsCalculating(false);
      
      if (calculationCount >= 2 && !showLeadForm) {
        setShowLeadForm(true);
      }
    }, 1500);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    console.log('Lead data:', leadData);
    setShowLeadForm(false);
    setCalculationCount(0);
    alert('Thank you! Your calculation limit has been extended. We\'ll contact you soon!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const downloadReport = () => {
    if (!result) return;
    
    const report = `
Employee Salary Report
=====================

Employee Details:
- Name: ${result.employeeData.name}
- Employee ID: ${result.employeeData.employeeId}
- Designation: ${result.employeeData.designation}
- Department: ${result.employeeData.department}

Salary Components:
- Basic Salary: ${formatCurrency(parseFloat(result.employeeData.basicSalary || 0))}
- HRA: ${formatCurrency(parseFloat(result.employeeData.hra || 0))}
- DA: ${formatCurrency(parseFloat(result.employeeData.da || 0))}
- TA: ${formatCurrency(parseFloat(result.employeeData.ta || 0))}
- Medical: ${formatCurrency(parseFloat(result.employeeData.medical || 0))}
- Bonus: ${formatCurrency(parseFloat(result.employeeData.bonus || 0))}
- Overtime: ${formatCurrency(parseFloat(result.employeeData.overtime || 0))}
- Other: ${formatCurrency(parseFloat(result.employeeData.other || 0))}

Working Days:
- Total Days: ${result.workingDays.total}
- Actual Working Days: ${result.workingDays.actual}
- Leave Days: ${result.workingDays.leave}
- Attendance: ${result.workingDays.attendance}%

Salary Calculation:
- Gross Salary (Full Month): ${formatCurrency(result.grossSalary)}
- Total Deductions: ${formatCurrency(result.deductions.total)}
- Net Salary (Full Month): ${formatCurrency(result.netSalary)}

Pro-rated Salary (Based on Working Days):
- Pro-rated Gross Salary: ${formatCurrency(result.proRatedGrossSalary)}
- Pro-rated Deductions: ${formatCurrency(result.proRatedDeductions)}
- Pro-rated Net Salary: ${formatCurrency(result.proRatedNetSalary)}

Deduction Breakdown:
- PF (${result.employeeData.pf}%): ${formatCurrency(result.deductions.pf)}
- ESI (${result.employeeData.esi}%): ${formatCurrency(result.deductions.esi)}
- Tax (${result.employeeData.tax}%): ${formatCurrency(result.deductions.tax)}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salary-report-${result.employeeData.name || 'employee'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    document.title = "Employee Salary Calculator 2025 | HR Payroll Calculator - Prachi";
    
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Free Employee Salary Calculator 2025. Calculate monthly salary based on working days, HRA, DA, TA, PF, ESI deductions. Best payroll calculator for HR and Accounts departments.');
    updateMetaTag('keywords', 'employee salary calculator, hr salary calculator, payroll calculator, working days calculator, monthly salary calculator, hra calculator, pf calculator, esi calculator, attendance calculator, salary slip generator');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prachi HR Solutions</h1>
                <p className="text-sm text-gray-600">Employee Salary Calculator</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span className="text-sm">50,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Employee Salary Calculator 2025
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Calculate employee monthly salary based on working days. Complete payroll calculation with HRA, DA, TA, PF, ESI, and attendance tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Award className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">HR & Accounts Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calculator className="h-6 w-6" />
                  <span>Employee Salary Calculator</span>
                </h2>
                <p className="text-blue-100 mt-1">Enter employee details and salary components</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Employee Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Employee Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Employee Name *
                      </label>
                      <input
                        type="text"
                        value={employeeData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter employee name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        value={employeeData.employeeId}
                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter employee ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={employeeData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter designation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        value={employeeData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter department"
                      />
                    </div>
                  </div>
                </div>

                {/* Working Days */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Working Days & Attendance
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total Working Days *
                      </label>
                      <input
                        type="number"
                        value={employeeData.workingDays}
                        onChange={(e) => handleInputChange('workingDays', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Days in Month
                      </label>
                      <input
                        type="number"
                        value={employeeData.totalDays}
                        onChange={(e) => handleInputChange('totalDays', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Leave Days
                      </label>
                      <input
                        type="number"
                        value={employeeData.leaveDays}
                        onChange={(e) => handleInputChange('leaveDays', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., 2"
                      />
                    </div>
                  </div>
                </div>

                {/* Basic Salary Components */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Salary Components
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Basic Salary (₹) *
                      </label>
                      <input
                        type="number"
                        value={employeeData.basicSalary}
                        onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter basic salary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        HRA - House Rent Allowance (₹)
                      </label>
                      <input
                        type="number"
                        value={employeeData.hra}
                        onChange={(e) => handleInputChange('hra', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter HRA amount"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Components Toggle */}
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Additional Allowances</h3>
                    <p className="text-sm text-gray-600">Include DA, TA, Medical, Bonus and other allowances</p>
                  </div>
                  <button
                    onClick={() => handleInputChange('showAdvanced', !employeeData.showAdvanced)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                  >
                    {employeeData.showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
                  </button>
                </div>

                {/* Advanced Components */}
                {employeeData.showAdvanced && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          DA - Dearness Allowance (₹)
                        </label>
                        <input
                          type="number"
                          value={employeeData.da}
                          onChange={(e) => handleInputChange('da', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter DA amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          TA - Travel Allowance (₹)
                        </label>
                        <input
                          type="number"
                          value={employeeData.ta}
                          onChange={(e) => handleInputChange('ta', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter TA amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Medical Allowance (₹)
                        </label>
                        <input
                          type="number"
                          value={employeeData.medical}
                          onChange={(e) => handleInputChange('medical', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter medical allowance"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bonus & Incentives (₹)
                        </label>
                        <input
                          type="number"
                          value={employeeData.bonus}
                          onChange={(e) => handleInputChange('bonus', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter bonus amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Overtime Pay (₹)
                        </label>
                        <input
                          type="number"
                          value={employeeData.overtime}
                          onChange={(e) => handleInputChange('overtime', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter overtime pay"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Other Allowances (₹)
                        </label>
                        <input
                          type="number"
                          value={employeeData.other}
                          onChange={(e) => handleInputChange('other', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter other allowances"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Deductions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Deductions
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PF Rate (%)
                      </label>
                      <input
                        type="number"
                        value={employeeData.pf}
                        onChange={(e) => handleInputChange('pf', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ESI Rate (%)
                      </label>
                      <input
                        type="number"
                        value={employeeData.esi}
                        onChange={(e) => handleInputChange('esi', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0.75"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={employeeData.tax}
                        onChange={(e) => handleInputChange('tax', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!employeeData.basicSalary || !employeeData.workingDays || isCalculating}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Calculating Salary...
                    </div>
                  ) : (
                    'Calculate Employee Salary'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Results Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Salary Breakdown</span>
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {result ? (
                  <>
                    {/* Employee Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Employee Information</h4>
                      <div className="text-sm space-y-1">
                        <div><span className="font-medium">Name:</span> {result.employeeData.name}</div>
                        <div><span className="font-medium">ID:</span> {result.employeeData.employeeId}</div>
                        <div><span className="font-medium">Designation:</span> {result.employeeData.designation}</div>
                        <div><span className="font-medium">Department:</span> {result.employeeData.department}</div>
                      </div>
                    </div>

                    {/* Working Days Summary */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Working Days Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Total Days</div>
                          <div className="font-semibold">{result.workingDays.total}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Actual Working</div>
                          <div className="font-semibold">{result.workingDays.actual}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Leave Days</div>
                          <div className="font-semibold">{result.workingDays.leave}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Attendance</div>
                          <div className="font-semibold">{result.workingDays.attendance}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Salary Results */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Full Month Gross</span>
                        <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.grossSalary)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Pro-rated Gross</span>
                        <span className="font-bold text-orange-600 text-lg">{formatCurrency(result.proRatedGrossSalary)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Total Deductions</span>
                        <span className="font-bold text-red-600 text-lg">-{formatCurrency(result.deductions.total)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                        <span className="font-bold text-gray-800 text-lg">Net Salary</span>
                        <span className="font-bold text-green-600 text-2xl">{formatCurrency(result.proRatedNetSalary)}</span>
                      </div>
                    </div>

                    {/* Deduction Details */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Deduction Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">PF ({result.employeeData.pf}%)</span>
                          <span className="font-medium">₹{result.deductions.pf.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ESI ({result.employeeData.esi}%)</span>
                          <span className="font-medium">₹{result.deductions.esi.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax ({result.employeeData.tax}%)</span>
                          <span className="font-medium">₹{result.deductions.tax.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-2">
                      <button
                        onClick={downloadReport}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Report</span>
                      </button>
                      <button
                        onClick={() => navigator.share && navigator.share({
                          title: 'Employee Salary Report',
                          text: `Salary for ${result.employeeData.name}: ${formatCurrency(result.proRatedNetSalary)}`,
                          url: window.location.href
                        })}
                        className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-all font-medium flex items-center justify-center space-x-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share Results</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Enter employee details and click calculate to see results</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-xl text-white p-6">
              <div className="text-center">
                <Building className="h-12 w-12 mx-auto mb-4 text-purple-200" />
                <h3 className="text-xl font-bold mb-2">Need HR Solutions?</h3>
                <p className="text-purple-100 mb-4 text-sm">
                  Get personalized payroll management solutions for your business
                </p>
                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="w-full bg-white text-purple-600 py-3 px-4 rounded-lg hover:bg-gray-100 transition-all font-bold flex items-center justify-center space-x-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Get Free Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 py-12 bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Employee Salary Calculator?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trusted by thousands of HR professionals and businesses for accurate salary calculations
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Days Calculation</h3>
                <p className="text-gray-600">Calculate salary based on actual working days and attendance</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Breakdown</h3>
                <p className="text-gray-600">Complete salary breakdown with all allowances and deductions</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Reports</h3>
                <p className="text-gray-600">Generate and download detailed salary reports for records</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lead Generation Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white">Unlock More Features!</h3>
              <p className="text-blue-100 text-sm">Get extended access + free HR consultation</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={leadData.name}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={leadData.phone}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={leadData.company}
                  onChange={(e) => setLeadData({...leadData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Employees *</label>
                <select
                  required
                  value={leadData.employees}
                  onChange={(e) => setLeadData({...leadData, employees: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select range</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-500">101-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-bold"
                >
                  Get Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Prachi</span>
              </div>
              <p className="text-gray-400 text-sm">
                Leading HR solutions provider offering free salary calculators and payroll management tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payroll Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HR Consulting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Employee Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HRA Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PF Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ESI Calculator</a></li>
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
                  <span>+91 98765 43210</span>
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
    </div>
  );
};

export default EmployeeSalaryCalculator; 