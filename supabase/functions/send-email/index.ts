import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string | string[]
  subject: string
  html: string
  text?: string
  template?: string
  variables?: Record<string, any>
  replyTo?: string
  priority?: string
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

    const { to, subject, html, text, template, variables, replyTo, priority } = await req.json() as EmailRequest

    // Validate input
    if (!to || !subject || (!html && !template)) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, and html/template' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY')

    if (!resendApiKey && !sendGridApiKey) {
      return new Response(
        JSON.stringify({ error: 'No email service configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    let emailContent = html
    let emailSubject = subject

    // Process template if provided
    if (template && variables) {
      const templates = getEmailTemplates()
      const templateData = templates[template]
      
      if (templateData) {
        emailContent = processTemplate(templateData.html, variables)
        emailSubject = processTemplate(templateData.subject, variables)
      }
    }

    let result

    // Try Resend first
    if (resendApiKey) {
      try {
        result = await sendWithResend({
          to,
          subject: emailSubject,
          html: emailContent,
          text,
          replyTo,
          priority
        }, resendApiKey)
      } catch (error) {
        console.error('Resend failed:', error)
        
        // Fallback to SendGrid if available
        if (sendGridApiKey) {
          result = await sendWithSendGrid({
            to,
            subject: emailSubject,
            html: emailContent,
            text,
            replyTo,
            priority
          }, sendGridApiKey)
        } else {
          throw error
        }
      }
    } else {
      // Use SendGrid directly
      result = await sendWithSendGrid({
        to,
        subject: emailSubject,
        html: emailContent,
        text,
        replyTo,
        priority
      }, sendGridApiKey)
    }

    // Log email send to database
    await supabase
      .from('email_logs')
      .insert([{
        to: Array.isArray(to) ? to : [to],
        subject: emailSubject,
        status: 'sent',
        provider: result.provider,
        message_id: result.messageId,
        sent_at: new Date().toISOString()
      }])

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Email send error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function sendWithResend(emailData: any, apiKey: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Hire With Prachi <noreply@hirewithprachi.com>',
      to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || stripHtml(emailData.html),
      reply_to: emailData.replyTo || 'contact@hirewithprachi.com'
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || `Resend API error: ${response.status}`)
  }

  return {
    success: true,
    messageId: result.id,
    provider: 'resend'
  }
}

async function sendWithSendGrid(emailData: any, apiKey: string) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: Array.isArray(emailData.to) 
          ? emailData.to.map((email: string) => ({ email }))
          : [{ email: emailData.to }],
        subject: emailData.subject
      }],
      from: {
        email: 'noreply@hirewithprachi.com',
        name: 'Hire With Prachi'
      },
      content: [
        {
          type: 'text/html',
          value: emailData.html
        },
        {
          type: 'text/plain',
          value: emailData.text || stripHtml(emailData.html)
        }
      ],
      reply_to: {
        email: emailData.replyTo || 'contact@hirewithprachi.com',
        name: 'Hire With Prachi'
      }
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`SendGrid API error: ${response.status} - ${error}`)
  }

  return {
    success: true,
    messageId: response.headers.get('X-Message-Id'),
    provider: 'sendgrid'
  }
}

function getEmailTemplates() {
  return {
    welcome: {
      subject: 'Welcome to Hire With Prachi!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Hire With Prachi!</h1>
          <p>Hi {{name}},</p>
          <p>Thank you for joining our HR services platform. We're excited to help you with your HR needs.</p>
          <p>Get started by exploring our services:</p>
          <ul>
            <li>Virtual HR Management</li>
            <li>HR Compliance</li>
            <li>Payroll Management</li>
            <li>Recruitment Services</li>
          </ul>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Best regards,<br>The Hire With Prachi Team</p>
        </div>
      `
    },
    leadFollowUp: {
      subject: 'Thank you for your interest in our HR services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank you for your interest!</h1>
          <p>Hi {{name}},</p>
          <p>Thank you for expressing interest in our {{service}} service.</p>
          <p>Our team will contact you within 24 hours to discuss your requirements.</p>
          <p>Best regards,<br>Prachi Shrivastava</p>
        </div>
      `
    }
  }
}

function processTemplate(template: string, variables: Record<string, any>): string {
  let processed = template
  
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    processed = processed.replace(regex, variables[key] || '')
  })

  return processed
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
