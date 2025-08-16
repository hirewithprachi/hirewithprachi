-- Create payment_logs table
CREATE TABLE IF NOT EXISTS public.payment_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL,
  payment_id TEXT,
  transaction_id UUID REFERENCES hr_ai_transactions(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  status VARCHAR(20) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_logs_order_id ON public.payment_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_payment_id ON public.payment_logs(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_transaction_id ON public.payment_logs(transaction_id);

-- Add RLS policies
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- Allow admins to view all payment logs
CREATE POLICY "Admins can view all payment logs" 
ON public.payment_logs
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated' AND 
       EXISTS (
         SELECT 1 FROM auth.users 
         WHERE id = auth.uid() AND 
         raw_user_meta_data->>'is_admin' = 'true'
       ));

-- Allow system to insert payment logs
CREATE POLICY "System can insert payment logs"
ON public.payment_logs
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_payment_logs_modtime
BEFORE UPDATE ON public.payment_logs
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Add comments
COMMENT ON TABLE public.payment_logs IS 'Stores payment logs for all transactions';
COMMENT ON COLUMN public.payment_logs.order_id IS 'Razorpay order ID';
COMMENT ON COLUMN public.payment_logs.payment_id IS 'Razorpay payment ID';
COMMENT ON COLUMN public.payment_logs.transaction_id IS 'Reference to hr_ai_transactions table';
COMMENT ON COLUMN public.payment_logs.amount IS 'Amount in the smallest currency unit (paise for INR)';
COMMENT ON COLUMN public.payment_logs.status IS 'Payment status (created, authorized, captured, refunded, failed)';
COMMENT ON COLUMN public.payment_logs.metadata IS 'Additional payment details and metadata';
