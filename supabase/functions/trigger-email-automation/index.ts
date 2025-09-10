import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailAutomationRequest {
  trigger_event: string
  user_email: string
  template_variables: Record<string, any>
  delay_hours?: number
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { 
      trigger_event, 
      user_email, 
      template_variables,
      delay_hours = 0
    } = await req.json() as EmailAutomationRequest

    // Validate required fields
    if (!trigger_event || !user_email || !template_variables) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: trigger_event, user_email, template_variables' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Triggering email automation:', {
      trigger_event,
      user_email,
      delay_hours
    })

    // 1. Find matching email automation
    const { data: automation, error: automationError } = await supabase
      .from('email_automations')
      .select('*')
      .eq('trigger_event', trigger_event)
      .eq('is_active', true)
      .single()

    if (automationError || !automation) {
      console.error('No active automation found for trigger:', trigger_event)
      return new Response(
        JSON.stringify({ error: `No active automation found for trigger: ${trigger_event}` }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 2. Replace template variables in subject and content
    let subject = automation.subject_template
    let emailContent = automation.email_template

    // Replace all template variables
    Object.entries(template_variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      subject = subject.replace(new RegExp(placeholder, 'g'), String(value))
      emailContent = emailContent.replace(new RegExp(placeholder, 'g'), String(value))
    })

    // 3. Calculate send time
    const sendTime = new Date()
    sendTime.setHours(sendTime.getHours() + (delay_hours || automation.delay_hours || 0))

    // 4. Log the automation trigger
    const { error: logError } = await supabase
      .from('email_automation_logs')
      .insert({
        automation_id: automation.id,
        user_email,
        trigger_event,
        template_variables,
        subject,
        email_content: emailContent,
        scheduled_at: sendTime.toISOString(),
        status: delay_hours > 0 ? 'scheduled' : 'sending'
      })

    if (logError) {
      console.error('Error logging automation:', logError)
      return new Response(
        JSON.stringify({ error: 'Failed to log automation' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 5. Send email immediately if no delay, otherwise schedule it
    if (delay_hours === 0 && automation.delay_hours === 0) {
      try {
        // Send email via the email service
        const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: user_email,
            subject: subject,
            html: emailContent.replace(/\n/g, '<br>'),
            text: emailContent
          })
        })

        if (emailResponse.ok) {
          // Update log status to sent
          await supabase
            .from('email_automation_logs')
            .update({ 
              status: 'sent', 
              sent_at: new Date().toISOString() 
            })
            .eq('user_email', user_email)
            .eq('automation_id', automation.id)
            .eq('status', 'sending')

          console.log('✅ Email automation sent successfully')
        } else {
          console.error('Email service error:', await emailResponse.text())
          
          // Update log status to failed
          await supabase
            .from('email_automation_logs')
            .update({ 
              status: 'failed', 
              error_message: 'Email service error'
            })
            .eq('user_email', user_email)
            .eq('automation_id', automation.id)
            .eq('status', 'sending')
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        
        // Update log status to failed
        await supabase
          .from('email_automation_logs')
          .update({ 
            status: 'failed', 
            error_message: emailError.message
          })
          .eq('user_email', user_email)
          .eq('automation_id', automation.id)
          .eq('status', 'sending')
      }
    } else {
      console.log(`📅 Email automation scheduled for ${sendTime.toISOString()}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: delay_hours > 0 ? 'Email automation scheduled successfully' : 'Email automation triggered successfully',
        automation_id: automation.id,
        scheduled_at: sendTime.toISOString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Email automation trigger error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})