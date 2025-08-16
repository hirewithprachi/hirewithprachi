import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface SalaryCalculationInput {
  base_salary: number
  experience_years: number
  location: string
  benefits: Array<{
    name: string
    value: number
    type: 'percentage' | 'fixed'
  }>
  industry: string
  role_level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive'
  skills: string[]
  company_size: 'startup' | 'small' | 'medium' | 'large'
}

interface SalaryCalculationResult {
  base_salary: number
  calculated_salary: number
  experience_bonus: number
  location_multiplier: number
  benefits_total: number
  industry_adjustment: number
  role_level_adjustment: number
  skills_bonus: number
  company_size_adjustment: number
  breakdown: {
    base: number
    experience_bonus: number
    location_adjustment: number
    benefits: number
    industry_adjustment: number
    role_level_adjustment: number
    skills_bonus: number
    company_size_adjustment: number
  }
  recommendations: string[]
  market_comparison: {
    percentile_25: number
    percentile_50: number
    percentile_75: number
    percentile_90: number
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

    const input: SalaryCalculationInput = await req.json()

    // Validate input
    if (!input.base_salary || input.base_salary <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid base salary' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate salary
    const result = await calculateSalary(input)

    // Save calculation session if user is authenticated
    if (userId) {
      await supabase
        .from('calculator_sessions')
        .insert([{
          user_id: userId,
          calculator_type: 'salary',
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
    console.error('Salary calculator error:', error)
    return new Response(
      JSON.stringify({ error: 'Calculation failed', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function calculateSalary(input: SalaryCalculationInput): Promise<SalaryCalculationResult> {
  let calculatedSalary = input.base_salary

  // Experience bonus (5% per year, max 25%)
  const experienceBonus = Math.min(input.experience_years * 0.05, 0.25)
  const experienceBonusAmount = input.base_salary * experienceBonus

  // Location adjustment
  const locationMultipliers: Record<string, number> = {
    'mumbai': 1.3,
    'delhi': 1.25,
    'bangalore': 1.2,
    'hyderabad': 1.15,
    'chennai': 1.1,
    'pune': 1.1,
    'kolkata': 1.05,
    'ahmedabad': 1.0,
    'jaipur': 0.95,
    'lucknow': 0.9,
    'patna': 0.85,
    'bhubaneswar': 0.9,
    'nagpur': 0.95,
    'indore': 0.95,
    'vadodara': 0.95,
    'surat': 1.0,
    'nashik': 0.9,
    'rajkot': 0.9,
    'bhopal': 0.9,
    'coimbatore': 0.95
  }
  
  const locationMultiplier = locationMultipliers[input.location.toLowerCase()] || 1.0
  const locationAdjustment = input.base_salary * (locationMultiplier - 1)

  // Benefits calculation
  let benefitsTotal = 0
  for (const benefit of input.benefits) {
    if (benefit.type === 'percentage') {
      benefitsTotal += input.base_salary * (benefit.value / 100)
    } else {
      benefitsTotal += benefit.value
    }
  }

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
  const industryAdjustment = input.base_salary * (industryMultiplier - 1)

  // Role level adjustment
  const roleLevelMultipliers: Record<string, number> = {
    'entry': 0.8,
    'mid': 1.0,
    'senior': 1.3,
    'lead': 1.6,
    'executive': 2.2
  }
  
  const roleLevelMultiplier = roleLevelMultipliers[input.role_level] || 1.0
  const roleLevelAdjustment = input.base_salary * (roleLevelMultiplier - 1)

  // Skills bonus
  const skillBonuses: Record<string, number> = {
    'python': 0.1,
    'javascript': 0.08,
    'java': 0.09,
    'react': 0.12,
    'node.js': 0.11,
    'aws': 0.15,
    'azure': 0.13,
    'docker': 0.1,
    'kubernetes': 0.12,
    'machine_learning': 0.18,
    'data_science': 0.16,
    'devops': 0.14,
    'agile': 0.05,
    'scrum': 0.05,
    'project_management': 0.08,
    'leadership': 0.12,
    'communication': 0.06,
    'analytics': 0.1,
    'sales': 0.08,
    'marketing': 0.07
  }
  
  let skillsBonus = 0
  for (const skill of input.skills) {
    if (skillBonuses[skill.toLowerCase()]) {
      skillsBonus += skillBonuses[skill.toLowerCase()]
    }
  }
  // Cap skills bonus at 30%
  skillsBonus = Math.min(skillsBonus, 0.3)
  const skillsBonusAmount = input.base_salary * skillsBonus

  // Company size adjustment
  const companySizeMultipliers: Record<string, number> = {
    'startup': 0.9,
    'small': 0.95,
    'medium': 1.0,
    'large': 1.1
  }
  
  const companySizeMultiplier = companySizeMultipliers[input.company_size] || 1.0
  const companySizeAdjustment = input.base_salary * (companySizeMultiplier - 1)

  // Calculate final salary
  calculatedSalary = input.base_salary + 
    experienceBonusAmount + 
    locationAdjustment + 
    benefitsTotal + 
    industryAdjustment + 
    roleLevelAdjustment + 
    skillsBonusAmount + 
    companySizeAdjustment

  // Market comparison data (simplified)
  const marketComparison = {
    percentile_25: Math.round(calculatedSalary * 0.75),
    percentile_50: Math.round(calculatedSalary),
    percentile_75: Math.round(calculatedSalary * 1.25),
    percentile_90: Math.round(calculatedSalary * 1.5)
  }

  // Generate recommendations
  const recommendations: string[] = []
  
  if (calculatedSalary < marketComparison.percentile_25) {
    recommendations.push("Your salary is below the 25th percentile. Consider negotiating for a higher base salary.")
  }
  
  if (input.experience_years < 2) {
    recommendations.push("With more experience, you can expect significant salary growth.")
  }
  
  if (input.skills.length < 3) {
    recommendations.push("Consider developing additional skills to increase your market value.")
  }
  
  if (locationMultiplier < 1.0) {
    recommendations.push("Consider relocating to a higher-paying city for better compensation.")
  }

  return {
    base_salary: input.base_salary,
    calculated_salary: Math.round(calculatedSalary),
    experience_bonus: experienceBonus * 100,
    location_multiplier: locationMultiplier,
    benefits_total: Math.round(benefitsTotal),
    industry_adjustment: Math.round(industryAdjustment),
    role_level_adjustment: Math.round(roleLevelAdjustment),
    skills_bonus: skillsBonus * 100,
    company_size_adjustment: Math.round(companySizeAdjustment),
    breakdown: {
      base: input.base_salary,
      experience_bonus: Math.round(experienceBonusAmount),
      location_adjustment: Math.round(locationAdjustment),
      benefits: Math.round(benefitsTotal),
      industry_adjustment: Math.round(industryAdjustment),
      role_level_adjustment: Math.round(roleLevelAdjustment),
      skills_bonus: Math.round(skillsBonusAmount),
      company_size_adjustment: Math.round(companySizeAdjustment)
    },
    recommendations,
    market_comparison: marketComparison
  }
}
