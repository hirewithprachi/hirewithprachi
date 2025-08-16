import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import Razorpay from 'https://esm.sh/razorpay@2.8.6'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID') || '',
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') || '',
})

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = await req.json()

    if (!amount || !receipt) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders } }
      )
    }

    // Create order in Razorpay
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
      notes,
      payment_capture: 1 // Auto-capture payment
    })

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
    )

    // Log the order creation in your database
    const { error } = await supabaseClient
      .from('payment_logs')
      .insert([
        {
          order_id: order.id,
          receipt_id: receipt,
          amount: amount,
          currency,
          status: 'created',
          metadata: { notes }
        }
      ])

    if (error) {
      console.error('Error logging order:', error)
      // Don't fail the request if logging fails
    }

    return new Response(
      JSON.stringify(order),
      { headers: { ...corsHeaders } }
    )
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create order',
        details: error.error || null
      }),
      { status: 500, headers: { ...corsHeaders } }
    )
  }
})
