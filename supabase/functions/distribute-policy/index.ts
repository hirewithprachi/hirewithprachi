import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DistributionRequest {
  policy_id: string
  employee_emails: string[]
  employee_names?: string[]
  distribution_type: 'email' | 'link'
  email_subject?: string
  email_body?: string
  reminder_days?: number
}

interface DistributionResponse {
  success: boolean
  distribution_id?: string
  sent_count?: number
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

    const requestData: DistributionRequest = await req.json()
    
    // Validate required fields
    if (!requestData.policy_id || !requestData.employee_emails || requestData.employee_emails.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify policy ownership
    const { data: policy, error: policyError } = await supabaseClient
      .from('hr_policies')
      .select('*')
      .eq('id', requestData.policy_id)
      .eq('user_id', user.id)
      .single()

    if (policyError || !policy) {
      return new Response(
        JSON.stringify({ success: false, error: 'Policy not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create acknowledgments for each employee
    const acknowledgments = requestData.employee_emails.map((email, index) => ({
      policy_id: requestData.policy_id,
      employee_email: email,
      employee_name: requestData.employee_names?.[index] || null,
      status: 'pending'
    }))

    const { data: acknowledgmentData, error: acknowledgmentError } = await supabaseClient
      .from('policy_acknowledgments')
      .insert(acknowledgments)
      .select()

    if (acknowledgmentError) {
      console.error('Acknowledgment creation error:', acknowledgmentError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create acknowledgments' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create distribution log
    const { data: distributionLog, error: distributionError } = await supabaseClient
      .from('policy_distribution_logs')
      .insert({
        policy_id: requestData.policy_id,
        distribution_type: requestData.distribution_type,
        recipient_count: requestData.employee_emails.length,
        sent_count: requestData.employee_emails.length,
        email_subject: requestData.email_subject,
        email_body: requestData.email_body
      })
      .select()
      .single()

    if (distributionError) {
      console.error('Distribution log error:', distributionError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create distribution log' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send emails if distribution type is email
    if (requestData.distribution_type === 'email') {
      await sendPolicyEmails(
        supabaseClient,
        policy,
        acknowledgmentData,
        requestData.email_subject,
        requestData.email_body
      )
    }

    const response: DistributionResponse = {
      success: true,
      distribution_id: distributionLog.id,
      sent_count: requestData.employee_emails.length
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

async function sendPolicyEmails(
  supabaseClient: any,
  policy: any,
  acknowledgments: any[],
  emailSubject?: string,
  emailBody?: string
) {
  const defaultSubject = `New HR Policy: ${policy.title} - Action Required`
  const defaultBody = `
Dear Team Member,

A new HR policy has been published and requires your acknowledgment.

Policy: ${policy.title}
Category: ${policy.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
Word Count: ${policy.word_count}
Estimated Read Time: ${policy.estimated_read_time} minutes

Please review the policy and acknowledge your understanding by clicking the link below.

Best regards,
HR Team
  `

  const subject = emailSubject || defaultSubject
  const body = emailBody || defaultBody

  // Use the existing email service to send emails
  for (const acknowledgment of acknowledgments) {
    try {
      const { error: emailError } = await supabaseClient.functions.invoke('send-email', {
        body: {
          to: acknowledgment.employee_email,
          subject: subject,
          html: body,
          text: body.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
        }
      })

      if (emailError) {
        console.error(`Failed to send email to ${acknowledgment.employee_email}:`, emailError)
      }
    } catch (error) {
      console.error(`Error sending email to ${acknowledgment.employee_email}:`, error)
    }
  }
}
