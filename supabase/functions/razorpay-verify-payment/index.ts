import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { createHmac } from 'https://deno.land/std@0.114.0/node/crypto.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || ''

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      razorpay_signature: signature,
      transaction_id: transactionId
    } = await req.json()

    if (!paymentId || !orderId || !signature || !transactionId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders } }
      )
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        global: { 
          headers: { 
            Authorization: req.headers.get('Authorization') ?? '',
            'x-client-info': 'razorpay-verify-payment/1.0.0'
          } 
        } 
      }
    )

    // Verify the payment signature
    const generatedSignature = createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const isSignatureValid = generatedSignature === signature

    if (!isSignatureValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid payment signature' }),
        { status: 400, headers: { ...corsHeaders } }
      )
    }

    // Update the transaction in your database
    const { data: transaction, error: updateError } = await supabaseClient
      .from('hr_ai_transactions')
      .update({
        payment_id: paymentId,
        payment_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', transactionId)
      .select('*')
      .single()

    if (updateError) {
      console.error('Error updating transaction:', updateError)
      throw new Error('Failed to update transaction status')
    }

    // Log the successful payment
    await supabaseClient
      .from('payment_logs')
      .insert([
        {
          order_id: orderId,
          payment_id: paymentId,
          transaction_id: transactionId,
          amount: transaction.amount,
          currency: transaction.currency,
          status: 'completed',
          metadata: {
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature
          }
        }
      ])

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified and processed successfully',
        transactionId: transaction.id,
        paymentId
      }),
      { headers: { ...corsHeaders } }
    )

  } catch (error) {
    console.error('Error verifying payment:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to verify payment',
        details: Deno.env.get('DENO_REGION') ? undefined : error
      }),
      { status: 500, headers: { ...corsHeaders } }
    )
  }
})
