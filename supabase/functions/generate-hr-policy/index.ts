import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PolicyGenerationRequest {
  company_name: string
  category: string
  tone: string
  industry?: string
  company_size?: string
  location_country?: string
  location_state?: string
  custom_points?: string[]
  jurisdiction_country?: string
  jurisdiction_state?: string
  language?: string
  user_id: string
}

interface PolicyGenerationResponse {
  success: boolean
  policy?: {
    id: string
    title: string
    content: string
    word_count: number
    estimated_read_time: number
  }
  error?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const requestData: PolicyGenerationRequest = await req.json()
    
    // Validate required fields
    if (!requestData.company_name || !requestData.category || !requestData.tone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate policy using OpenAI
    const policyContent = await generatePolicyWithAI(requestData)
    
    // Calculate metadata
    const wordCount = policyContent.split(/\s+/).length
    const estimatedReadTime = Math.ceil(wordCount / 200) // Average reading speed

    // Create policy title
    const categoryDisplayNames = {
      'leave_policy': 'Leave Policy',
      'remote_work_policy': 'Remote Work Policy',
      'code_of_conduct': 'Code of Conduct',
      'dei_policy': 'Diversity, Equity & Inclusion Policy',
      'privacy_policy': 'Privacy Policy',
      'it_security_policy': 'IT Security Policy',
      'data_protection_policy': 'Data Protection Policy',
      'travel_policy': 'Travel Policy',
      'anti_harassment_policy': 'Anti-Harassment Policy',
      'performance_management_policy': 'Performance Management Policy',
      'compensation_policy': 'Compensation Policy',
      'benefits_policy': 'Benefits Policy',
      'workplace_safety_policy': 'Workplace Safety Policy',
      'social_media_policy': 'Social Media Policy',
      'confidentiality_policy': 'Confidentiality Policy'
    }

    const title = `${categoryDisplayNames[requestData.category as keyof typeof categoryDisplayNames] || 'HR Policy'} for ${requestData.company_name}`

    // Store policy in database
    const { data: policyData, error: dbError } = await supabaseClient
      .from('hr_policies')
      .insert({
        user_id: user.id,
        title: title,
        category: requestData.category,
        tone: requestData.tone,
        company_name: requestData.company_name,
        company_size: requestData.company_size,
        industry: requestData.industry,
        location_country: requestData.location_country,
        location_state: requestData.location_state,
        jurisdiction_country: requestData.jurisdiction_country,
        jurisdiction_state: requestData.jurisdiction_state,
        input_data: requestData,
        generated_policy: policyContent,
        custom_points: requestData.custom_points || [],
        language: requestData.language || 'en',
        word_count: wordCount,
        estimated_read_time: estimatedReadTime
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save policy' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const response: PolicyGenerationResponse = {
      success: true,
      policy: {
        id: policyData.id,
        title: policyData.title,
        content: policyData.generated_policy,
        word_count: policyData.word_count,
        estimated_read_time: policyData.estimated_read_time
      }
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generatePolicyWithAI(requestData: PolicyGenerationRequest): Promise<string> {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured')
  }

  // Build the prompt based on the request data
  const prompt = buildPolicyPrompt(requestData)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert HR consultant specializing in creating comprehensive, legally compliant HR policies. 
          You have deep knowledge of employment law, best practices, and industry standards across different jurisdictions.
          Always create policies that are clear, actionable, and legally sound.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.error('OpenAI API error:', errorData)
    throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  return data.choices[0].message.content.trim()
}

function buildPolicyPrompt(requestData: PolicyGenerationRequest): string {
  const categoryPrompts = {
    'leave_policy': `Create a comprehensive leave policy for ${requestData.company_name}. Include:
    - Annual leave entitlements and accrual
    - Sick leave policies
    - Maternity/paternity leave
    - Bereavement leave
    - Study leave
    - Leave application process
    - Leave approval workflow
    - Carry-over policies
    - Leave without pay options`,
    
    'remote_work_policy': `Create a comprehensive remote work policy for ${requestData.company_name}. Include:
    - Eligibility criteria
    - Work hours and availability requirements
    - Communication expectations
    - Equipment and technology requirements
    - Security protocols
    - Performance monitoring
    - Health and safety considerations
    - Expense reimbursement
    - Termination of remote work arrangements`,
    
    'code_of_conduct': `Create a comprehensive code of conduct for ${requestData.company_name}. Include:
    - Professional behavior standards
    - Anti-discrimination and harassment policies
    - Confidentiality requirements
    - Conflict of interest policies
    - Social media guidelines
    - Dress code (if applicable)
    - Reporting procedures
    - Consequences for violations`,
    
    'dei_policy': `Create a comprehensive Diversity, Equity & Inclusion policy for ${requestData.company_name}. Include:
    - Commitment to diversity and inclusion
    - Equal opportunity employment
    - Anti-discrimination measures
    - Inclusive workplace practices
    - Training and education requirements
    - Reporting mechanisms
    - Accountability measures
    - Regular review and updates`,
    
    'privacy_policy': `Create a comprehensive privacy policy for ${requestData.company_name}. Include:
    - Data collection practices
    - Types of personal information collected
    - How information is used
    - Data sharing policies
    - Data security measures
    - Employee rights regarding their data
    - Data retention policies
    - Contact information for privacy concerns`,
    
    'it_security_policy': `Create a comprehensive IT security policy for ${requestData.company_name}. Include:
    - Password requirements
    - Device security
    - Network security
    - Data protection measures
    - Acceptable use of technology
    - Incident reporting procedures
    - Security training requirements
    - Consequences for security violations`,
    
    'data_protection_policy': `Create a comprehensive data protection policy for ${requestData.company_name}. Include:
    - Data classification
    - Data handling procedures
    - Access controls
    - Data transfer protocols
    - Breach notification procedures
    - Employee responsibilities
    - Training requirements
    - Compliance monitoring`,
    
    'travel_policy': `Create a comprehensive travel policy for ${requestData.company_name}. Include:
    - Travel approval process
    - Booking procedures
    - Expense limits and categories
    - Documentation requirements
    - Safety and security guidelines
    - Insurance coverage
    - Emergency procedures
    - Expense reimbursement process`,
    
    'anti_harassment_policy': `Create a comprehensive anti-harassment policy for ${requestData.company_name}. Include:
    - Definition of harassment
    - Types of prohibited behavior
    - Reporting procedures
    - Investigation process
    - Confidentiality protections
    - Retaliation prevention
    - Training requirements
    - Consequences for violations`,
    
    'performance_management_policy': `Create a comprehensive performance management policy for ${requestData.company_name}. Include:
    - Performance standards and expectations
    - Goal setting process
    - Performance review cycles
    - Feedback mechanisms
    - Performance improvement plans
    - Recognition and rewards
    - Disciplinary procedures
    - Appeals process`,
    
    'compensation_policy': `Create a comprehensive compensation policy for ${requestData.company_name}. Include:
    - Salary structure and bands
    - Pay review cycles
    - Bonus and incentive programs
    - Benefits overview
    - Pay equity principles
    - Confidentiality requirements
    - Dispute resolution
    - Regular review process`,
    
    'benefits_policy': `Create a comprehensive benefits policy for ${requestData.company_name}. Include:
    - Health insurance coverage
    - Retirement plans
    - Paid time off benefits
    - Professional development
    - Wellness programs
    - Employee assistance programs
    - Benefits eligibility
    - Enrollment procedures`,
    
    'workplace_safety_policy': `Create a comprehensive workplace safety policy for ${requestData.company_name}. Include:
    - Safety responsibilities
    - Hazard identification and reporting
    - Emergency procedures
    - Personal protective equipment
    - Training requirements
    - Incident reporting
    - Investigation procedures
    - Safety committee roles`,
    
    'social_media_policy': `Create a comprehensive social media policy for ${requestData.company_name}. Include:
    - Personal social media guidelines
    - Company social media accounts
    - Confidentiality requirements
    - Brand representation
    - Conflict of interest
    - Monitoring and enforcement
    - Training requirements
    - Consequences for violations`,
    
    'confidentiality_policy': `Create a comprehensive confidentiality policy for ${requestData.company_name}. Include:
    - Definition of confidential information
    - Employee obligations
    - Information classification
    - Access controls
    - Disclosure restrictions
    - Return of materials
    - Breach reporting
    - Consequences for violations`
  }

  const basePrompt = categoryPrompts[requestData.category as keyof typeof categoryPrompts] || 
    `Create a comprehensive HR policy for ${requestData.category.replace(/_/g, ' ')} for ${requestData.company_name}.`

  let prompt = `${basePrompt}

Company Information:
- Company Name: ${requestData.company_name}
- Industry: ${requestData.industry || 'Not specified'}
- Company Size: ${requestData.company_size || 'Not specified'}
- Location: ${requestData.location_country || 'Not specified'}${requestData.location_state ? `, ${requestData.location_state}` : ''}
- Jurisdiction: ${requestData.jurisdiction_country || 'Not specified'}${requestData.jurisdiction_state ? `, ${requestData.jurisdiction_state}` : ''}

Tone: ${requestData.tone}

${requestData.custom_points && requestData.custom_points.length > 0 ? 
  `Additional Requirements:\n${requestData.custom_points.map(point => `- ${point}`).join('\n')}\n` : ''}

Please create a professional, comprehensive policy that:
1. Is written in a ${requestData.tone} tone
2. Includes all necessary legal disclaimers and compliance notes
3. Is structured with clear sections and subsections
4. Uses markdown formatting for better readability
5. Includes practical examples where appropriate
6. Addresses the specific jurisdiction requirements if provided
7. Is tailored to the company's industry and size

Format the response as clean markdown with proper headings, bullet points, and numbered lists.`

  return prompt
}
