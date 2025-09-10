import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentSuccessRequest {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
  transaction_id: string
  user_details: {
    name: string
    email: string
    phone: string
    company?: string
  }
  tool_details: {
    title: string
    category: string
    tool_type: string
    price: number
  }
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
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      transaction_id,
      user_details,
      tool_details 
    } = await req.json() as PaymentSuccessRequest

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !transaction_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required payment information' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Processing payment success:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      transaction_id
    })

    // 1. Update transaction status
    const { error: transactionError } = await supabase
      .from('ai_tool_transactions')
      .update({
        payment_status: 'completed',
        razorpay_payment_id,
        razorpay_order_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', transaction_id)

    if (transactionError) {
      console.error('Error updating transaction:', transactionError)
      return new Response(
        JSON.stringify({ error: 'Failed to update transaction status' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 2. Update payment attempt status
    const { error: paymentAttemptError } = await supabase
      .from('payment_attempts')
      .update({
        status: 'completed',
        razorpay_order_id,
        updated_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id)

    if (paymentAttemptError) {
      console.error('Error updating payment attempt:', paymentAttemptError)
      // Don't fail the request for this error
    }

    // 3. Trigger email automation for purchase confirmation
    try {
      const automationResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/trigger-email-automation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trigger_event: 'tool_purchased',
          user_email: user_details.email,
          template_variables: {
            user_name: user_details.name,
            user_email: user_details.email,
            tool_name: tool_details.title,
            amount: tool_details.price,
            transaction_id: transaction_id,
            purchase_date: new Date().toLocaleDateString(),
            tool_access_url: tool_details.tool_type === 'Template' ? 
              `${Deno.env.get('SITE_URL')}/download/${transaction_id}` : 
              `${Deno.env.get('SITE_URL')}/resources`,
            receipt_url: `${Deno.env.get('SITE_URL')}/receipt/${transaction_id}`
          }
        })
      })

      if (!automationResponse.ok) {
        console.error('Email automation trigger error:', await automationResponse.text())
      } else {
        console.log('✅ Purchase confirmation email automation triggered successfully')
      }
    } catch (automationError) {
      console.error('Error triggering email automation:', automationError)
      // Don't fail the request for this error
    }

    // 4. Create lead in leads table
    const { error: leadError } = await supabase
      .from('leads')
      .insert({
        name: user_details.name,
        email: user_details.email,
        phone: user_details.phone,
        company: user_details.company || '',
        source: 'ai_hr_tools_purchase',
        status: 'new',
        message: `Purchased ${tool_details.title} (${tool_details.category}) for ₹${tool_details.price}`,
        metadata: {
          tool_title: tool_details.title,
          tool_category: tool_details.category,
          tool_type: tool_details.tool_type,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          transaction_id,
          purchase_amount: tool_details.price
        }
      })

    if (leadError) {
      console.error('Error creating lead:', leadError)
      // Don't fail the request for this error
    }

    // 5. Send email notification to user
    try {
      const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: user_details.email,
          subject: `Payment Successful - ${tool_details.title}`,
          template: 'payment_success',
          variables: {
            customer_name: user_details.name,
            tool_title: tool_details.title,
            tool_category: tool_details.category,
            payment_amount: tool_details.price,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            download_url: tool_details.tool_type === 'Template' ? 
              `${Deno.env.get('SITE_URL')}/download/${transaction_id}` : 
              `${Deno.env.get('SITE_URL')}/resources`,
            support_email: 'support@hirewithprachi.com'
          }
        })
      })

      if (!emailResponse.ok) {
        console.error('Email service error:', await emailResponse.text())
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request for this error
    }

    // 6. Send notification to admin
    try {
      const adminEmailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'prachishri005@gmail.com',
          subject: `New AI HR Tool Purchase - ${tool_details.title}`,
          template: 'admin_purchase_notification',
          variables: {
            customer_name: user_details.name,
            customer_email: user_details.email,
            customer_phone: user_details.phone,
            customer_company: user_details.company || 'Not specified',
            tool_title: tool_details.title,
            tool_category: tool_details.category,
            payment_amount: tool_details.price,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            admin_dashboard_url: `${Deno.env.get('SITE_URL')}/admin`
          }
        })
      })

      if (!adminEmailResponse.ok) {
        console.error('Admin email service error:', await adminEmailResponse.text())
      }
    } catch (adminEmailError) {
      console.error('Error sending admin email:', adminEmailError)
      // Don't fail the request for this error
    }

    // 7. Record analytics event
    try {
      await supabase
        .from('ai_tool_analytics')
        .insert({
          tool_id: transaction_id, // This should be the actual tool_id, not transaction_id
          event_type: 'purchase',
          user_email: user_details.email,
          metadata: {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            amount: tool_details.price,
            category: tool_details.category
          }
        })
    } catch (analyticsError) {
      console.error('Error recording analytics:', analyticsError)
      // Don't fail the request for this error
    }

    console.log('Payment success processing completed successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment processed successfully',
        transaction_id,
        payment_id: razorpay_payment_id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Payment success processing error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
