-- Create payment_orders table
CREATE TABLE IF NOT EXISTS public.payment_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  status VARCHAR(20) NOT NULL DEFAULT 'created',
  payment_id TEXT,
  signature TEXT,
  razorpay_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON public.payment_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON public.payment_orders(status);

-- Add RLS policies
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own orders
CREATE POLICY "Users can view their own orders" 
ON public.payment_orders
FOR SELECT
USING (auth.uid() = user_id);

-- Allow system to insert/update orders
CREATE POLICY "System can manage payment orders"
ON public.payment_orders
FOR ALL
TO service_role
USING (true) WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_payment_orders_modtime
BEFORE UPDATE ON public.payment_orders
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
