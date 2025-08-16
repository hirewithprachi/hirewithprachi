import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const resendApiKey = Deno.env.get('RESEND_API_KEY')!
const fromEmail = Deno.env.get('FROM_EMAIL')!

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { method } = req

    // Verify admin access
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has admin role by querying the users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !userProfile || userProfile.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (method === 'POST') {
      const body = await req.json()
      return await sendEmail(supabase, body)
    } else {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function sendEmail(supabase: any, body: any) {
  try {
    const { type, data, recipients } = body

    // Store email in database for tracking
    const { data: emailRecord, error: dbError } = await supabase
      .from('email_logs')
      .insert([{
        type,
        recipients: Array.isArray(recipients) ? recipients.join(',') : recipients,
        data: JSON.stringify(data),
        status: 'pending'
      }])
      .select()
      .single()

    if (dbError) throw dbError

    // Send email using Resend API
    const emailResult = await sendEmailViaResend(type, data, recipients)

    // Update email status
    await supabase
      .from('email_logs')
      .update({ 
        status: emailResult.success ? 'sent' : 'failed',
        sent_at: new Date().toISOString()
      })
      .eq('id', emailRecord.id)

    if (emailResult.success) {
      return new Response(
        JSON.stringify({ 
          message: 'Email sent successfully',
          emailId: emailRecord.id,
          resendId: emailResult.resendId
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailResult.error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send email', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function sendEmailViaResend(type: string, data: any, recipients: string | string[]) {
  try {
    const emailConfig = {
      'lead-notification': {
        subject: 'New Lead Received - HR Services Hub',
        html: generateLeadNotificationEmail(data)
      },
      'welcome-email': {
        subject: 'Welcome to HR Services Hub',
        html: generateWelcomeEmail(data)
      },
      'password-reset': {
        subject: 'Password Reset Request - HR Services Hub',
        html: generatePasswordResetEmail(data)
      },
      'newsletter': {
        subject: 'HR Services Hub Newsletter',
        html: generateNewsletterEmail(data)
      },
      'contact-form': {
        subject: 'New Contact Form Submission - HR Services Hub',
        html: generateContactFormEmail(data)
      }
    }

    const config = emailConfig[type as keyof typeof emailConfig]
    
    if (!config) {
      return { success: false, error: 'Invalid email type' }
    }

    const emailData = {
      from: fromEmail,
      to: Array.isArray(recipients) ? recipients : [recipients],
      subject: config.subject,
      html: config.html
    }

    console.log('Sending email via Resend:', { type, recipients: emailData.to })

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, resendId: result.id }
    } else {
      console.error('Resend API error:', result)
      return { success: false, error: result.message || 'Resend API error' }
    }
  } catch (error) {
    console.error('Resend integration error:', error)
    return { success: false, error: error.message }
  }
}

function generateLeadNotificationEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Lead Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Lead Received</h2>
        <p>A new lead has been submitted through the HR Services Hub website.</p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Lead Details:</h3>
          <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Service Interest:</strong> ${data.service || 'N/A'}</p>
          <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p>Please follow up with this lead as soon as possible.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This email was sent from the HR Services Hub admin system.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateWelcomeEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to HR Services Hub</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Welcome to HR Services Hub!</h2>
        <p>Dear ${data.name || 'Valued Customer'},</p>
        
        <p>Thank you for choosing HR Services Hub. We're excited to have you on board!</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>What's Next?</h3>
          <ul>
            <li>Explore our comprehensive HR services</li>
            <li>Schedule a consultation with our experts</li>
            <li>Access our calculators and tools</li>
            <li>Stay updated with our latest insights</li>
          </ul>
        </div>
        
        <p>If you have any questions, feel free to reach out to us at ${fromEmail}.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            HR Services Hub - Transforming HR for the modern workplace
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generatePasswordResetEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Password Reset Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626;">Password Reset Request</h2>
        <p>Hello ${data.name || 'there'},</p>
        
        <p>We received a request to reset your password for your HR Services Hub account.</p>
        
        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <a href="${data.resetUrl}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>This link will expire in 24 hours for security reasons.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            HR Services Hub - Secure account management
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateNewsletterEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>HR Services Hub Newsletter</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">HR Services Hub Newsletter</h2>
        <p>Stay updated with the latest HR insights and industry trends.</p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Latest Updates:</h3>
          ${data.content || '<p>Check out our latest blog posts and resources!</p>'}
        </div>
        
        <p>Thank you for subscribing to our newsletter!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            HR Services Hub - Your trusted HR partner
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateContactFormEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p>A new contact form has been submitted on the HR Services Hub website.</p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
          <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p>Please respond to this inquiry as soon as possible.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This email was sent from the HR Services Hub contact form.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
