import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface HRCostsCalculationInput {
  employee_count: number
  average_salary: number
  industry: string
  location: string
  company_size: 'startup' | 'small' | 'medium' | 'large'
  include_recruitment: boolean
  include_training: boolean
  include_benefits: boolean
  include_compliance: boolean
  include_technology: boolean
  include_consulting: boolean
  custom_costs?: Array<{
    name: string
    value: number
    type: 'percentage' | 'fixed' | 'per_employee'
  }>
}

interface HRCostsCalculationResult {
  employee_count: number
  average_salary: number
  total_hr_costs: number
  hr_costs_per_employee: number
  hr_costs_percentage: number
  breakdown: {
    recruitment: number
    training: number
    benefits: number
    compliance: number
    technology: number
    consulting: number
    custom_costs: number
  }
  detailed_breakdown: {
    recruitment: {
      job_posting: number
      agency_fees: number
      background_checks: number
      onboarding: number
    }
    training: {
      initial_training: number
      ongoing_development: number
      certifications: number
      leadership_programs: number
    }
    benefits: {
      health_insurance: number
      retirement: number
      paid_time_off: number
      other_benefits: number
    }
    compliance: {
      legal_consultation: number
      audits: number
      documentation: number
      regulatory_fees: number
    }
    technology: {
      hr_software: number
      payroll_system: number
      time_tracking: number
      communication_tools: number
    }
    consulting: {
      hr_consulting: number
      organizational_development: number
      change_management: number
      strategic_planning: number
    }
  }
  cost_savings_opportunities: string[]
  market_comparison: {
    industry_average: number
    percentile_25: number
    percentile_50: number
    percentile_75: number
  }
  roi_analysis: {
    cost_per_hire: number
    time_to_fill: number
    employee_retention_rate: number
    training_effectiveness: number
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { method } = req

    if (method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user token for authentication (optional)
    const authHeader = req.headers.get('Authorization')
    let userId: string | null = null
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)
        if (!authError && user) {
          userId = user.id
        }
      } catch (error) {
        console.log('Auth error (non-critical):', error.message)
      }
    }

    const input: HRCostsCalculationInput = await req.json()

    // Validate input
    if (!input.employee_count || input.employee_count <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid employee count' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!input.average_salary || input.average_salary <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid average salary' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate HR costs
    const result = await calculateHRCosts(input)

    // Save calculation session if user is authenticated
    if (userId) {
      await supabase
        .from('calculator_sessions')
        .insert([{
          user_id: userId,
          calculator_type: 'hr_costs',
          input_data: input,
          result_data: result,
          created_at: new Date().toISOString()
        }])
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        result,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('HR costs calculator error:', error)
    return new Response(
      JSON.stringify({ error: 'Calculation failed', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function calculateHRCosts(input: HRCostsCalculationInput): Promise<HRCostsCalculationResult> {
  let totalHRCosts = 0
  const breakdown = {
    recruitment: 0,
    training: 0,
    benefits: 0,
    compliance: 0,
    technology: 0,
    consulting: 0,
    custom_costs: 0
  }

  const detailedBreakdown = {
    recruitment: {
      job_posting: 0,
      agency_fees: 0,
      background_checks: 0,
      onboarding: 0
    },
    training: {
      initial_training: 0,
      ongoing_development: 0,
      certifications: 0,
      leadership_programs: 0
    },
    benefits: {
      health_insurance: 0,
      retirement: 0,
      paid_time_off: 0,
      other_benefits: 0
    },
    compliance: {
      legal_consultation: 0,
      audits: 0,
      documentation: 0,
      regulatory_fees: 0
    },
    technology: {
      hr_software: 0,
      payroll_system: 0,
      time_tracking: 0,
      communication_tools: 0
    },
    consulting: {
      hr_consulting: 0,
      organizational_development: 0,
      change_management: 0,
      strategic_planning: 0
    }
  }

  // Company size multipliers
  const sizeMultipliers = {
    startup: 0.8,
    small: 0.9,
    medium: 1.0,
    large: 1.2
  }

  const sizeMultiplier = sizeMultipliers[input.company_size]

  // Recruitment Costs
  if (input.include_recruitment) {
    const recruitmentRates = {
      job_posting: 0.02, // 2% of average salary per hire
      agency_fees: 0.15, // 15% of average salary per hire
      background_checks: 0.005, // 0.5% of average salary per hire
      onboarding: 0.03 // 3% of average salary per hire
    }

    const annualHires = Math.ceil(input.employee_count * 0.15) // Assume 15% turnover
    const costPerHire = input.average_salary * (recruitmentRates.job_posting + recruitmentRates.agency_fees + recruitmentRates.background_checks + recruitmentRates.onboarding)
    
    breakdown.recruitment = costPerHire * annualHires
    detailedBreakdown.recruitment = {
      job_posting: input.average_salary * recruitmentRates.job_posting * annualHires,
      agency_fees: input.average_salary * recruitmentRates.agency_fees * annualHires,
      background_checks: input.average_salary * recruitmentRates.background_checks * annualHires,
      onboarding: input.average_salary * recruitmentRates.onboarding * annualHires
    }
    totalHRCosts += breakdown.recruitment
  }

  // Training Costs
  if (input.include_training) {
    const trainingRates = {
      initial_training: 0.05, // 5% of average salary
      ongoing_development: 0.03, // 3% of average salary
      certifications: 0.02, // 2% of average salary
      leadership_programs: 0.04 // 4% of average salary
    }

    breakdown.training = input.average_salary * input.employee_count * (trainingRates.initial_training + trainingRates.ongoing_development + trainingRates.certifications + trainingRates.leadership_programs)
    detailedBreakdown.training = {
      initial_training: input.average_salary * input.employee_count * trainingRates.initial_training,
      ongoing_development: input.average_salary * input.employee_count * trainingRates.ongoing_development,
      certifications: input.average_salary * input.employee_count * trainingRates.certifications,
      leadership_programs: input.average_salary * input.employee_count * trainingRates.leadership_programs
    }
    totalHRCosts += breakdown.training
  }

  // Benefits Costs
  if (input.include_benefits) {
    const benefitsRates = {
      health_insurance: 0.12, // 12% of average salary
      retirement: 0.06, // 6% of average salary
      paid_time_off: 0.08, // 8% of average salary
      other_benefits: 0.04 // 4% of average salary
    }

    breakdown.benefits = input.average_salary * input.employee_count * (benefitsRates.health_insurance + benefitsRates.retirement + benefitsRates.paid_time_off + benefitsRates.other_benefits)
    detailedBreakdown.benefits = {
      health_insurance: input.average_salary * input.employee_count * benefitsRates.health_insurance,
      retirement: input.average_salary * input.employee_count * benefitsRates.retirement,
      paid_time_off: input.average_salary * input.employee_count * benefitsRates.paid_time_off,
      other_benefits: input.average_salary * input.employee_count * benefitsRates.other_benefits
    }
    totalHRCosts += breakdown.benefits
  }

  // Compliance Costs
  if (input.include_compliance) {
    const complianceRates = {
      legal_consultation: 0.02, // 2% of average salary per employee
      audits: 0.01, // 1% of average salary per employee
      documentation: 0.005, // 0.5% of average salary per employee
      regulatory_fees: 0.005 // 0.5% of average salary per employee
    }

    breakdown.compliance = input.average_salary * input.employee_count * (complianceRates.legal_consultation + complianceRates.audits + complianceRates.documentation + complianceRates.regulatory_fees)
    detailedBreakdown.compliance = {
      legal_consultation: input.average_salary * input.employee_count * complianceRates.legal_consultation,
      audits: input.average_salary * input.employee_count * complianceRates.audits,
      documentation: input.average_salary * input.employee_count * complianceRates.documentation,
      regulatory_fees: input.average_salary * input.employee_count * complianceRates.regulatory_fees
    }
    totalHRCosts += breakdown.compliance
  }

  // Technology Costs
  if (input.include_technology) {
    const technologyRates = {
      hr_software: 0.015, // 1.5% of average salary per employee
      payroll_system: 0.01, // 1% of average salary per employee
      time_tracking: 0.005, // 0.5% of average salary per employee
      communication_tools: 0.005 // 0.5% of average salary per employee
    }

    breakdown.technology = input.average_salary * input.employee_count * (technologyRates.hr_software + technologyRates.payroll_system + technologyRates.time_tracking + technologyRates.communication_tools)
    detailedBreakdown.technology = {
      hr_software: input.average_salary * input.employee_count * technologyRates.hr_software,
      payroll_system: input.average_salary * input.employee_count * technologyRates.payroll_system,
      time_tracking: input.average_salary * input.employee_count * technologyRates.time_tracking,
      communication_tools: input.average_salary * input.employee_count * technologyRates.communication_tools
    }
    totalHRCosts += breakdown.technology
  }

  // Consulting Costs
  if (input.include_consulting) {
    const consultingRates = {
      hr_consulting: 0.02, // 2% of average salary per employee
      organizational_development: 0.015, // 1.5% of average salary per employee
      change_management: 0.01, // 1% of average salary per employee
      strategic_planning: 0.015 // 1.5% of average salary per employee
    }

    breakdown.consulting = input.average_salary * input.employee_count * (consultingRates.hr_consulting + consultingRates.organizational_development + consultingRates.change_management + consultingRates.strategic_planning)
    detailedBreakdown.consulting = {
      hr_consulting: input.average_salary * input.employee_count * consultingRates.hr_consulting,
      organizational_development: input.average_salary * input.employee_count * consultingRates.organizational_development,
      change_management: input.average_salary * input.employee_count * consultingRates.change_management,
      strategic_planning: input.average_salary * input.employee_count * consultingRates.strategic_planning
    }
    totalHRCosts += breakdown.consulting
  }

  // Custom Costs
  if (input.custom_costs) {
    for (const cost of input.custom_costs) {
      let costValue = 0
      if (cost.type === 'percentage') {
        costValue = input.average_salary * input.employee_count * (cost.value / 100)
      } else if (cost.type === 'fixed') {
        costValue = cost.value
      } else if (cost.type === 'per_employee') {
        costValue = cost.value * input.employee_count
      }
      breakdown.custom_costs += costValue
      totalHRCosts += costValue
    }
  }

  // Location adjustment
  const locationMultipliers: Record<string, number> = {
    'mumbai': 1.25,
    'delhi': 1.2,
    'bangalore': 1.15,
    'hyderabad': 1.1,
    'chennai': 1.05,
    'pune': 1.05,
    'kolkata': 1.0,
    'ahmedabad': 0.95,
    'jaipur': 0.9,
    'lucknow': 0.85,
    'patna': 0.8,
    'bhubaneswar': 0.85,
    'nagpur': 0.9,
    'indore': 0.9,
    'vadodara': 0.9,
    'surat': 0.95,
    'nashik': 0.85,
    'rajkot': 0.85,
    'bhopal': 0.85,
    'coimbatore': 0.9
  }
  
  const locationMultiplier = locationMultipliers[input.location.toLowerCase()] || 1.0
  totalHRCosts *= locationMultiplier

  // Industry adjustment
  const industryMultipliers: Record<string, number> = {
    'technology': 1.2,
    'finance': 1.15,
    'healthcare': 1.1,
    'manufacturing': 0.95,
    'retail': 0.9,
    'education': 0.85,
    'government': 0.9,
    'consulting': 1.1,
    'real_estate': 1.0,
    'media': 0.95,
    'hospitality': 0.85,
    'logistics': 0.9,
    'automotive': 0.95,
    'pharmaceuticals': 1.1,
    'energy': 1.05
  }
  
  const industryMultiplier = industryMultipliers[input.industry.toLowerCase()] || 1.0
  totalHRCosts *= industryMultiplier

  // Apply size multiplier
  totalHRCosts *= sizeMultiplier

  const hrCostsPerEmployee = totalHRCosts / input.employee_count
  const hrCostsPercentage = (totalHRCosts / (input.average_salary * input.employee_count)) * 100

  // Market comparison
  const marketComparison = {
    industry_average: Math.round(totalHRCosts * 1.0),
    percentile_25: Math.round(totalHRCosts * 0.75),
    percentile_50: Math.round(totalHRCosts),
    percentile_75: Math.round(totalHRCosts * 1.25)
  }

  // ROI Analysis
  const roiAnalysis = {
    cost_per_hire: Math.round(breakdown.recruitment / Math.ceil(input.employee_count * 0.15)),
    time_to_fill: 45, // Average days
    employee_retention_rate: 85, // Percentage
    training_effectiveness: 78 // Percentage
  }

  // Cost savings opportunities
  const costSavingsOpportunities: string[] = []
  
  if (hrCostsPercentage > 25) {
    costSavingsOpportunities.push("Consider outsourcing HR functions to reduce costs.")
  }
  
  if (breakdown.recruitment > totalHRCosts * 0.3) {
    costSavingsOpportunities.push("Optimize recruitment processes to reduce hiring costs.")
  }
  
  if (breakdown.training > totalHRCosts * 0.2) {
    costSavingsOpportunities.push("Implement e-learning platforms to reduce training costs.")
  }
  
  if (breakdown.technology < totalHRCosts * 0.05) {
    costSavingsOpportunities.push("Invest in HR technology to improve efficiency and reduce manual costs.")
  }

  return {
    employee_count: input.employee_count,
    average_salary: input.average_salary,
    total_hr_costs: Math.round(totalHRCosts),
    hr_costs_per_employee: Math.round(hrCostsPerEmployee),
    hr_costs_percentage: Math.round(hrCostsPercentage * 100) / 100,
    breakdown: {
      recruitment: Math.round(breakdown.recruitment),
      training: Math.round(breakdown.training),
      benefits: Math.round(breakdown.benefits),
      compliance: Math.round(breakdown.compliance),
      technology: Math.round(breakdown.technology),
      consulting: Math.round(breakdown.consulting),
      custom_costs: Math.round(breakdown.custom_costs)
    },
    detailed_breakdown: {
      recruitment: {
        job_posting: Math.round(detailedBreakdown.recruitment.job_posting),
        agency_fees: Math.round(detailedBreakdown.recruitment.agency_fees),
        background_checks: Math.round(detailedBreakdown.recruitment.background_checks),
        onboarding: Math.round(detailedBreakdown.recruitment.onboarding)
      },
      training: {
        initial_training: Math.round(detailedBreakdown.training.initial_training),
        ongoing_development: Math.round(detailedBreakdown.training.ongoing_development),
        certifications: Math.round(detailedBreakdown.training.certifications),
        leadership_programs: Math.round(detailedBreakdown.training.leadership_programs)
      },
      benefits: {
        health_insurance: Math.round(detailedBreakdown.benefits.health_insurance),
        retirement: Math.round(detailedBreakdown.benefits.retirement),
        paid_time_off: Math.round(detailedBreakdown.benefits.paid_time_off),
        other_benefits: Math.round(detailedBreakdown.benefits.other_benefits)
      },
      compliance: {
        legal_consultation: Math.round(detailedBreakdown.compliance.legal_consultation),
        audits: Math.round(detailedBreakdown.compliance.audits),
        documentation: Math.round(detailedBreakdown.compliance.documentation),
        regulatory_fees: Math.round(detailedBreakdown.compliance.regulatory_fees)
      },
      technology: {
        hr_software: Math.round(detailedBreakdown.technology.hr_software),
        payroll_system: Math.round(detailedBreakdown.technology.payroll_system),
        time_tracking: Math.round(detailedBreakdown.technology.time_tracking),
        communication_tools: Math.round(detailedBreakdown.technology.communication_tools)
      },
      consulting: {
        hr_consulting: Math.round(detailedBreakdown.consulting.hr_consulting),
        organizational_development: Math.round(detailedBreakdown.consulting.organizational_development),
        change_management: Math.round(detailedBreakdown.consulting.change_management),
        strategic_planning: Math.round(detailedBreakdown.consulting.strategic_planning)
      }
    },
    cost_savings_opportunities: costSavingsOpportunities,
    market_comparison: marketComparison,
    roi_analysis: roiAnalysis
  }
}
