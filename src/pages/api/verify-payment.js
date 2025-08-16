import Razorpay from 'razorpay';
import crypto from 'crypto';
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
    const {
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      razorpay_signature: signature,
      transaction_id: transactionId
    } = req.body;

    if (!paymentId || !orderId || !signature || !transactionId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isSignatureValid = generatedSignature === signature;

    if (!isSignatureValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update the transaction in your database
    const { data: transaction, error: updateError } = await supabase
      .from('hr_ai_transactions')
      .update({
        payment_id: paymentId,
        payment_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', transactionId)
      .select('*')
      .single();

    if (updateError) {
      console.error('Error updating transaction:', updateError);
      throw new Error('Failed to update transaction status');
    }

    // Log the successful payment
    await supabase
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
      ]);

    return res.status(200).json({
      success: true,
      message: 'Payment verified and processed successfully',
      transactionId: transaction.id,
      paymentId
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to verify payment',
      details: process.env.NODE_ENV === 'development' ? error : undefined
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
