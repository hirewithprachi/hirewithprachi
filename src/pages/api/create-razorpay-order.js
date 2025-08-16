import Razorpay from 'razorpay';
import { supabase } from '../../lib/supabase';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create order in Razorpay
    const order = await razorpay.orders.create({
      amount: Math.round(amount), // Amount in paise
      currency,
      receipt,
      notes,
      payment_capture: 1 // Auto-capture payment
    });

    // Log the order creation in your database
    const { error } = await supabase
      .from('payment_logs')
      .insert([
        {
          order_id: order.id,
          receipt_id: receipt,
          amount: amount / 100, // Convert back to rupees
          currency,
          status: 'created',
          metadata: { notes }
        }
      ]);

    if (error) {
      console.error('Error logging order:', error);
      // Don't fail the request if logging fails
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ 
      message: error.message || 'Failed to create order',
      details: error.error || null
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
