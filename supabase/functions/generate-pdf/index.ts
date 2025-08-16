import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, data, user, markdown, storagePath } = await req.json()

    // Validate required fields
    if (!type || !data || !user || !user.email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: type, data, user.email' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Optional: if markdown + storagePath provided, save PDF to Storage and return a signed URL
    if (markdown && storagePath) {
      // naive markdown->html conversion (clients should provide html for high fidelity)
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Resource</title></head><body><pre>${markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</pre></body></html>`

      // Use Deno's print to PDF via chrome-aws-lambda-like approach is not available here; instead we store the markdown for now
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      const encoder = new TextEncoder()
      const bytes = encoder.encode(markdown as string)
      const uploadRes = await supabase.storage.from('resource-downloads').upload(storagePath as string, bytes, {
        contentType: 'text/markdown',
        upsert: true
      })
      if (uploadRes.error) throw uploadRes.error
      const { data: signed } = await supabase.storage.from('resource-downloads').createSignedUrl(storagePath as string, 300)
      return new Response(JSON.stringify({ success: true, signedUrl: signed?.signedUrl }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Create professional email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
          <div style="font-size: 28px; font-weight: 700; margin-bottom: 8px;">Hire With Prachi</div>
          <div style="font-size: 16px; opacity: 0.9; margin-bottom: 15px;">Professional HR Solutions & Consulting</div>
          <div style="font-size: 14px; opacity: 0.8;">Report Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        
        <div style="background: #1e40af; color: white; padding: 25px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: 600; margin: 0;">${type.charAt(0).toUpperCase() + type.slice(1)} Calculator Report</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
          <h2 style="color: #1e40af; margin-bottom: 20px;">Hello ${user.name || 'there'}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Your HR calculator report is ready! Here are your detailed results:
          </p>
          
          <div style="background: #10b981; color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; text-align: center;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Analysis Complete</div>
            <div style="font-size: 32px; font-weight: 700; margin-bottom: 15px;">Results Ready</div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">Detailed Results:</h3>
            <pre style="background: #f8fafc; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 14px; line-height: 1.4;">${JSON.stringify(data, null, 2)}</pre>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
            <h4 style="color: #1f2937; margin-bottom: 10px; font-size: 16px;">Next Steps</h4>
            <p style="color: #374151; font-size: 14px;">Review your results and consider how these insights can improve your HR strategy. Our team is ready to help you implement these recommendations.</p>
          </div>
        </div>
        
        <div style="background: #059669; color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
          <div style="font-size: 20px; font-weight: 600; margin-bottom: 15px;">Ready to Transform Your HR Strategy?</div>
          <div style="font-size: 16px; margin-bottom: 20px; opacity: 0.9;">Book a FREE consultation with our HR experts</div>
          <div style="font-size: 14px; line-height: 1.8;">
            📧 info@hirewithprachi.com<br>
            📱 +91-8740889927<br>
            🌐 prachi-hr.com
          </div>
        </div>
        
        <div style="background: #1f2937; color: white; padding: 25px; border-radius: 12px; text-align: center; font-size: 12px;">
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 10px;">Generated by Hire with Prachi</div>
          <p style="margin-bottom: 5px;">Professional HR Solutions for Startups & SMEs</p>
          <p style="margin-bottom: 5px;">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    `

    // Send email using fetch to Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prachi Shrivastava <info@hirewithprachi.com>',
        to: user.email,
        subject: `Your ${type.charAt(0).toUpperCase() + type.slice(1)} Calculator Report is Ready!`,
        html: emailContent
      })
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      throw new Error(`Resend API error: ${resendResponse.status} - ${errorText}`)
    }

    const emailResult = await resendResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Report generated and email sent successfully',
        emailId: emailResult.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in generate-pdf function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate report and send email',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}) 