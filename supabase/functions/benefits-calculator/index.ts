import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface BenefitsCalculationInput {
  base_salary: number
  employee_count: number
  industry: string
  location: string
  benefits_package: 'basic' | 'standard' | 'premium' | 'enterprise'
  include_health_insurance: boolean
  include_retirement: boolean
  include_bonuses: boolean
  include_equity: boolean
  include_other_perks: boolean
  custom_benefits?: Array<{
    name: string
    value: number
    type: 'percentage' | 'fixed' | 'per_employee'
  }>
}

interface BenefitsCalculationResult {
  base_salary: number
  total_benefits_value: number
  benefits_percentage: number
  annual_cost_per_employee: number
  total_annual_cost: number
  breakdown: {
    health_insurance: number
    retirement_contributions: number
    bonuses: number
    equity: number
    other_perks: number
    custom_benefits: number
  }
  detailed_breakdown: {
    health_insurance: {
      employer_contribution: number
      coverage_details: string
    }
    retirement: {
      employer_match: number
      vesting_schedule: string
    }
    bonuses: {
      annual_bonus: number
      performance_bonus: number
      signing_bonus: number
    }
    equity: {
      stock_options: number
      rsu_value: number
      vesting_period: string
    }
    other_perks: {
      transportation: number
      meals: number
      wellness: number
      education: number
      childcare: number
    }
  }
  recommendations: string[]
  market_comparison: {
    industry_average: number
    percentile_25: number
    percentile_50: number
    percentile_75: number
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

    const input: BenefitsCalculationInput = await req.json()

    // Validate input
    if (!input.base_salary || input.base_salary <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid base salary' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!input.employee_count || input.employee_count <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid employee count' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate benefits
    const result = await calculateBenefits(input)

    // Save calculation session if user is authenticated
    if (userId) {
      await supabase
        .from('calculator_sessions')
        .insert([{
          user_id: userId,
          calculator_type: 'benefits',
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
    console.error('Benefits calculator error:', error)
    return new Response(
      JSON.stringify({ error: 'Calculation failed', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function calculateBenefits(input: BenefitsCalculationInput): Promise<BenefitsCalculationResult> {
  let totalBenefitsValue = 0
  const breakdown = {
    health_insurance: 0,
    retirement_contributions: 0,
    bonuses: 0,
    equity: 0,
    other_perks: 0,
    custom_benefits: 0
  }

  const detailedBreakdown = {
    health_insurance: {
      employer_contribution: 0,
      coverage_details: ''
    },
    retirement: {
      employer_match: 0,
      vesting_schedule: ''
    },
    bonuses: {
      annual_bonus: 0,
      performance_bonus: 0,
      signing_bonus: 0
    },
    equity: {
      stock_options: 0,
      rsu_value: 0,
      vesting_period: ''
    },
    other_perks: {
      transportation: 0,
      meals: 0,
      wellness: 0,
      education: 0,
      childcare: 0
    }
  }

  // Package multipliers
  const packageMultipliers = {
    basic: 0.15,
    standard: 0.25,
    premium: 0.35,
    enterprise: 0.45
  }

  const packageMultiplier = packageMultipliers[input.benefits_package]

  // Health Insurance
  if (input.include_health_insurance) {
    const healthInsuranceRates = {
      basic: 0.08,
      standard: 0.12,
      premium: 0.18,
      enterprise: 0.25
    }
    
    const healthRate = healthInsuranceRates[input.benefits_package]
    breakdown.health_insurance = input.base_salary * healthRate
    detailedBreakdown.health_insurance.employer_contribution = breakdown.health_insurance
    detailedBreakdown.health_insurance.coverage_details = `${input.benefits_package} health insurance coverage`
    totalBenefitsValue += breakdown.health_insurance
  }

  // Retirement Contributions
  if (input.include_retirement) {
    const retirementRates = {
      basic: 0.03,
      standard: 0.06,
      premium: 0.09,
      enterprise: 0.12
    }
    
    const retirementRate = retirementRates[input.benefits_package]
    breakdown.retirement_contributions = input.base_salary * retirementRate
    detailedBreakdown.retirement.employer_match = breakdown.retirement_contributions
    detailedBreakdown.retirement.vesting_schedule = '4-year vesting with 1-year cliff'
    totalBenefitsValue += breakdown.retirement_contributions
  }

  // Bonuses
  if (input.include_bonuses) {
    const bonusRates = {
      basic: { annual: 0.05, performance: 0.03, signing: 0 },
      standard: { annual: 0.10, performance: 0.05, signing: 0.05 },
      premium: { annual: 0.15, performance: 0.08, signing: 0.10 },
      enterprise: { annual: 0.20, performance: 0.12, signing: 0.15 }
    }
    
    const bonusRatesForPackage = bonusRates[input.benefits_package]
    const annualBonus = input.base_salary * bonusRatesForPackage.annual
    const performanceBonus = input.base_salary * bonusRatesForPackage.performance
    const signingBonus = input.base_salary * bonusRatesForPackage.signing
    
    breakdown.bonuses = annualBonus + performanceBonus + signingBonus
    detailedBreakdown.bonuses = {
      annual_bonus: annualBonus,
      performance_bonus: performanceBonus,
      signing_bonus: signingBonus
    }
    totalBenefitsValue += breakdown.bonuses
  }

  // Equity
  if (input.include_equity) {
    const equityRates = {
      basic: { options: 0, rsu: 0 },
      standard: { options: 0.02, rsu: 0.01 },
      premium: { options: 0.05, rsu: 0.03 },
      enterprise: { options: 0.08, rsu: 0.05 }
    }
    
    const equityRatesForPackage = equityRates[input.benefits_package]
    const stockOptions = input.base_salary * equityRatesForPackage.options
    const rsuValue = input.base_salary * equityRatesForPackage.rsu
    
    breakdown.equity = stockOptions + rsuValue
    detailedBreakdown.equity = {
      stock_options: stockOptions,
      rsu_value: rsuValue,
      vesting_period: '4-year vesting with 1-year cliff'
    }
    totalBenefitsValue += breakdown.equity
  }

  // Other Perks
  if (input.include_other_perks) {
    const perkRates = {
      basic: { transportation: 0.02, meals: 0.01, wellness: 0.01, education: 0.01, childcare: 0 },
      standard: { transportation: 0.03, meals: 0.02, wellness: 0.02, education: 0.02, childcare: 0.01 },
      premium: { transportation: 0.04, meals: 0.03, wellness: 0.03, education: 0.03, childcare: 0.02 },
      enterprise: { transportation: 0.05, meals: 0.04, wellness: 0.04, education: 0.04, childcare: 0.03 }
    }
    
    const perkRatesForPackage = perkRates[input.benefits_package]
    const transportation = input.base_salary * perkRatesForPackage.transportation
    const meals = input.base_salary * perkRatesForPackage.meals
    const wellness = input.base_salary * perkRatesForPackage.wellness
    const education = input.base_salary * perkRatesForPackage.education
    const childcare = input.base_salary * perkRatesForPackage.childcare
    
    breakdown.other_perks = transportation + meals + wellness + education + childcare
    detailedBreakdown.other_perks = {
      transportation,
      meals,
      wellness,
      education,
      childcare
    }
    totalBenefitsValue += breakdown.other_perks
  }

  // Custom Benefits
  if (input.custom_benefits) {
    for (const benefit of input.custom_benefits) {
      let benefitValue = 0
      if (benefit.type === 'percentage') {
        benefitValue = input.base_salary * (benefit.value / 100)
      } else if (benefit.type === 'fixed') {
        benefitValue = benefit.value
      } else if (benefit.type === 'per_employee') {
        benefitValue = benefit.value * input.employee_count
      }
      breakdown.custom_benefits += benefitValue
      totalBenefitsValue += benefitValue
    }
  }

  // Location adjustment
  const locationMultipliers: Record<string, number> = {
    'mumbai': 1.2,
    'delhi': 1.15,
    'bangalore': 1.1,
    'hyderabad': 1.05,
    'chennai': 1.0,
    'pune': 1.0,
    'kolkata': 0.95,
    'ahmedabad': 0.9,
    'jaipur': 0.85,
    'lucknow': 0.8,
    'patna': 0.75,
    'bhubaneswar': 0.8,
    'nagpur': 0.85,
    'indore': 0.85,
    'vadodara': 0.85,
    'surat': 0.9,
    'nashik': 0.8,
    'rajkot': 0.8,
    'bhopal': 0.8,
    'coimbatore': 0.85
  }
  
  const locationMultiplier = locationMultipliers[input.location.toLowerCase()] || 1.0
  totalBenefitsValue *= locationMultiplier

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
  totalBenefitsValue *= industryMultiplier

  const benefitsPercentage = (totalBenefitsValue / input.base_salary) * 100
  const annualCostPerEmployee = totalBenefitsValue
  const totalAnnualCost = annualCostPerEmployee * input.employee_count

  // Market comparison
  const marketComparison = {
    industry_average: Math.round(totalBenefitsValue * 1.0),
    percentile_25: Math.round(totalBenefitsValue * 0.75),
    percentile_50: Math.round(totalBenefitsValue),
    percentile_75: Math.round(totalBenefitsValue * 1.25)
  }

  // Generate recommendations
  const recommendations: string[] = []
  
  if (benefitsPercentage < 15) {
    recommendations.push("Consider increasing benefits to remain competitive in the market.")
  }
  
  if (!input.include_health_insurance) {
    recommendations.push("Health insurance is a highly valued benefit that can improve employee retention.")
  }
  
  if (!input.include_retirement) {
    recommendations.push("Retirement benefits help with long-term employee retention and satisfaction.")
  }
  
  if (input.employee_count > 50 && !input.include_equity) {
    recommendations.push("For larger companies, equity compensation can be a powerful retention tool.")
  }

  return {
    base_salary: input.base_salary,
    total_benefits_value: Math.round(totalBenefitsValue),
    benefits_percentage: Math.round(benefitsPercentage * 100) / 100,
    annual_cost_per_employee: Math.round(annualCostPerEmployee),
    total_annual_cost: Math.round(totalAnnualCost),
    breakdown: {
      health_insurance: Math.round(breakdown.health_insurance),
      retirement_contributions: Math.round(breakdown.retirement_contributions),
      bonuses: Math.round(breakdown.bonuses),
      equity: Math.round(breakdown.equity),
      other_perks: Math.round(breakdown.other_perks),
      custom_benefits: Math.round(breakdown.custom_benefits)
    },
    detailed_breakdown: {
      health_insurance: {
        employer_contribution: Math.round(detailedBreakdown.health_insurance.employer_contribution),
        coverage_details: detailedBreakdown.health_insurance.coverage_details
      },
      retirement: {
        employer_match: Math.round(detailedBreakdown.retirement.employer_match),
        vesting_schedule: detailedBreakdown.retirement.vesting_schedule
      },
      bonuses: {
        annual_bonus: Math.round(detailedBreakdown.bonuses.annual_bonus),
        performance_bonus: Math.round(detailedBreakdown.bonuses.performance_bonus),
        signing_bonus: Math.round(detailedBreakdown.bonuses.signing_bonus)
      },
      equity: {
        stock_options: Math.round(detailedBreakdown.equity.stock_options),
        rsu_value: Math.round(detailedBreakdown.equity.rsu_value),
        vesting_period: detailedBreakdown.equity.vesting_period
      },
      other_perks: {
        transportation: Math.round(detailedBreakdown.other_perks.transportation),
        meals: Math.round(detailedBreakdown.other_perks.meals),
        wellness: Math.round(detailedBreakdown.other_perks.wellness),
        education: Math.round(detailedBreakdown.other_perks.education),
        childcare: Math.round(detailedBreakdown.other_perks.childcare)
      }
    },
    recommendations,
    market_comparison: marketComparison
  }
}
