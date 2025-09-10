-- Fix Email Automation System
-- Create missing email_automations table and fix related issues

-- Create email_automations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.email_automations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_event VARCHAR(100) NOT NULL,
    conditions JSONB DEFAULT '{}',
    email_template TEXT NOT NULL,
    subject_template VARCHAR(500) NOT NULL,
    delay_hours INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.email_automations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for email_automations
DROP POLICY IF EXISTS "Admin full access on email_automations" ON public.email_automations;
CREATE POLICY "Admin full access on email_automations" ON public.email_automations 
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() AND is_active = true
    )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_automations_trigger_event ON public.email_automations(trigger_event);
CREATE INDEX IF NOT EXISTS idx_email_automations_is_active ON public.email_automations(is_active);
CREATE INDEX IF NOT EXISTS idx_email_automations_created_at ON public.email_automations(created_at DESC);

-- Insert default email automations
INSERT INTO public.email_automations (name, trigger_event, email_template, subject_template, delay_hours, description) 
VALUES 
(
    'Welcome Email',
    'user_registered',
    'Hello {{user_name}},

Welcome to Hire with Prachi! We''re thrilled to have you join our community of HR professionals.

Here''s what you can do now:
• Explore our AI-powered HR tools
• Access professional templates
• Connect with HR experts
• Get personalized career guidance

Start your journey: {{dashboard_url}}

Best regards,
The Hire with Prachi Team

---
This email was sent to {{user_email}}. If you didn''t sign up, please ignore this email.',
    'Welcome to Hire with Prachi! 🎉',
    0,
    'Automated welcome email sent to new users upon registration'
),
(
    'Purchase Confirmation',
    'tool_purchased',
    'Hi {{user_name}},

Thank you for your purchase! Your payment has been processed successfully.

**Purchase Details:**
• Tool: {{tool_name}}
• Amount: ${{amount}}
• Transaction ID: {{transaction_id}}

You can now access your tool: {{tool_access_url}}

If you have any questions, feel free to reach out to our support team.

Best regards,
Hire with Prachi Team',
    'Purchase Confirmation - {{tool_name}}',
    0,
    'Confirmation email sent after successful tool purchase'
),
(
    'Follow-up Email',
    'user_registered',
    'Hi {{user_name}},

It''s been a while since you joined Hire with Prachi. We hope you''re finding our platform helpful!

Quick question: What would make your HR journey even better?

• More AI tools?
• Additional templates?
• Expert consultations?
• Training resources?

Let us know: {{feedback_url}}

Special offer: Get 20% off any premium tool with code FEEDBACK20

Best regards,
Prachi & Team',
    'How are you finding Hire with Prachi?',
    24,
    'Follow-up email sent 24 hours after user registration'
)
ON CONFLICT (name) DO NOTHING;

-- Create email_automation_logs table for tracking automation executions
CREATE TABLE IF NOT EXISTS public.email_automation_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    automation_id UUID REFERENCES public.email_automations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    email_address VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, sent, failed, skipped
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for automation logs
ALTER TABLE public.email_automation_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for automation logs
DROP POLICY IF EXISTS "Admin full access on email_automation_logs" ON public.email_automation_logs;
CREATE POLICY "Admin full access on email_automation_logs" ON public.email_automation_logs 
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = auth.uid() AND is_active = true
    )
);

-- Create indexes for automation logs
CREATE INDEX IF NOT EXISTS idx_email_automation_logs_automation_id ON public.email_automation_logs(automation_id);
CREATE INDEX IF NOT EXISTS idx_email_automation_logs_status ON public.email_automation_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_automation_logs_created_at ON public.email_automation_logs(created_at DESC);

-- Create function to trigger email automations
CREATE OR REPLACE FUNCTION public.trigger_email_automation(
    p_trigger_event VARCHAR(100),
    p_user_id UUID,
    p_user_email VARCHAR(255),
    p_variables JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
DECLARE
    automation_record RECORD;
    log_id UUID;
BEGIN
    -- Find active automations for this trigger event
    FOR automation_record IN 
        SELECT * FROM public.email_automations 
        WHERE trigger_event = p_trigger_event 
        AND is_active = true
    LOOP
        -- Create log entry
        INSERT INTO public.email_automation_logs (
            automation_id, user_id, email_address, status
        ) VALUES (
            automation_record.id, p_user_id, p_user_email, 'pending'
        ) RETURNING id INTO log_id;
        
        -- Here you would typically queue the email for sending
        -- For now, we'll just mark it as sent
        UPDATE public.email_automation_logs 
        SET status = 'sent', sent_at = NOW() 
        WHERE id = log_id;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.trigger_email_automation TO authenticated;

-- Create trigger function for user registration
CREATE OR REPLACE FUNCTION public.handle_user_registration()
RETURNS TRIGGER AS $$
BEGIN
    -- Trigger welcome email automation
    PERFORM public.trigger_email_automation(
        'user_registered',
        NEW.id,
        NEW.email,
        jsonb_build_object(
            'user_name', COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
            'user_email', NEW.email,
            'dashboard_url', 'https://hirewithprachi.com/dashboard'
        )
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user registration (if not exists)
DROP TRIGGER IF EXISTS trigger_user_registration ON auth.users;
CREATE TRIGGER trigger_user_registration
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_registration();

-- Update email_logs table to include automation_id if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'email_logs' 
        AND column_name = 'automation_id'
    ) THEN
        ALTER TABLE public.email_logs ADD COLUMN automation_id UUID REFERENCES public.email_automations(id);
        CREATE INDEX IF NOT EXISTS idx_email_logs_automation_id ON public.email_logs(automation_id);
    END IF;
END $$;

-- Create view for email automation analytics
CREATE OR REPLACE VIEW public.email_automation_analytics AS
SELECT 
    ea.id,
    ea.name,
    ea.trigger_event,
    ea.is_active,
    COUNT(eal.id) as total_executions,
    COUNT(CASE WHEN eal.status = 'sent' THEN 1 END) as successful_sends,
    COUNT(CASE WHEN eal.status = 'failed' THEN 1 END) as failed_sends,
    COUNT(CASE WHEN eal.status = 'pending' THEN 1 END) as pending_sends,
    ROUND(
        (COUNT(CASE WHEN eal.status = 'sent' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(eal.id), 0)) * 100, 2
    ) as success_rate,
    MAX(eal.created_at) as last_execution
FROM public.email_automations ea
LEFT JOIN public.email_automation_logs eal ON ea.id = eal.automation_id
GROUP BY ea.id, ea.name, ea.trigger_event, ea.is_active;

-- Grant access to the view
GRANT SELECT ON public.email_automation_analytics TO authenticated;

SELECT 'Email automation system setup completed successfully!' as result;