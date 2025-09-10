-- Enhanced Chatbot Schema Migration
-- This migration adds advanced features for the business assistant chatbot

-- =============================================
-- Business Knowledge Tables (RAG)
-- =============================================

-- Site copy content for dynamic information
CREATE TABLE IF NOT EXISTS site_copies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,        -- e.g., 'about', 'pricing', 'process', 'faq'
    title TEXT,
    content TEXT,                     -- markdown/plain
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service pricing table
CREATE TABLE IF NOT EXISTS service_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES ai_hr_tools(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,          -- e.g., 'One-time', 'Monthly'
    amount_inr INTEGER NOT NULL,      -- 299, 999, etc.
    features TEXT,                    -- bullet list in plain text
    is_popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs by category
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,           -- 'Payments', 'Policies', 'Employers'
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking slots (optional, or integrate Calendly)
CREATE TABLE IF NOT EXISTS booking_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    is_available BOOLEAN DEFAULT true,
    slot_type TEXT DEFAULT 'consultation', -- 'consultation', 'demo', 'support'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Enhanced Lead Management
-- =============================================

-- Enhanced leads table with consent tracking
CREATE TABLE IF NOT EXISTS chatbot_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    phone TEXT,
    source TEXT DEFAULT 'chatbot',    -- 'chatbot', 'website', 'referral'
    notes TEXT,
    consent BOOLEAN DEFAULT false,
    consent_given_at TIMESTAMPTZ,
    conversation_id UUID REFERENCES chat_conversations(id),
    intent_category TEXT,             -- 'Support', 'Sales', 'Policies', 'Employer', 'Pricing', 'Booking'
    service_interest TEXT,
    budget_range TEXT,
    timeline TEXT,
    company_size TEXT,
    industry TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Chat Analytics & Quality Loop
-- =============================================

-- Enhanced chat sessions with intent tracking
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    user_agent TEXT,
    referrer TEXT,
    intent_category TEXT,             -- Detected intent
    lead_created BOOLEAN DEFAULT false,
    order_created BOOLEAN DEFAULT false,
    total_messages INTEGER DEFAULT 0,
    session_duration_seconds INTEGER,
    satisfaction_rating INTEGER,      -- 1-5 rating
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enhanced chat messages with analytics
CREATE TABLE IF NOT EXISTS chat_messages_enhanced (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL,               -- 'user' | 'assistant' | 'tool'
    content TEXT,
    token_in INTEGER DEFAULT 0,
    token_out INTEGER DEFAULT 0,
    tool_calls JSONB,                 -- Function calls made
    tool_results JSONB,               -- Results from function calls
    intent_detected TEXT,             -- Intent detected in this message
    sentiment_score DECIMAL(3,2),     -- -1 to 1 sentiment
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Function Calling Tools Registry
-- =============================================

-- Registry of available tools for the chatbot
CREATE TABLE IF NOT EXISTS chatbot_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,        -- 'get_services', 'create_lead', etc.
    description TEXT NOT NULL,
    parameters JSONB NOT NULL,        -- Tool parameters schema
    is_active BOOLEAN DEFAULT true,
    endpoint_url TEXT,                -- Backend endpoint
    rate_limit_per_minute INTEGER DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- WhatsApp Integration
-- =============================================

-- WhatsApp opt-in tracking
CREATE TABLE IF NOT EXISTS whatsapp_optins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL,
    name TEXT,
    purpose TEXT,
    optin_status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'opted_in', 'failed'
    message_template TEXT,
    conversation_id UUID REFERENCES chat_conversations(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Indexes for Performance
-- =============================================

-- Site copies indexes
CREATE INDEX IF NOT EXISTS idx_site_copies_slug ON site_copies(slug);
CREATE INDEX IF NOT EXISTS idx_site_copies_updated_at ON site_copies(updated_at);

-- Service pricing indexes
CREATE INDEX IF NOT EXISTS idx_service_pricing_tool_id ON service_pricing(tool_id);
CREATE INDEX IF NOT EXISTS idx_service_pricing_is_popular ON service_pricing(is_popular);

-- FAQs indexes
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON faqs(display_order);

-- Booking slots indexes
CREATE INDEX IF NOT EXISTS idx_booking_slots_start_at ON booking_slots(start_at);
CREATE INDEX IF NOT EXISTS idx_booking_slots_is_available ON booking_slots(is_available);
CREATE INDEX IF NOT EXISTS idx_booking_slots_slot_type ON booking_slots(slot_type);

-- Chatbot leads indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_email ON chatbot_leads(email);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_source ON chatbot_leads(source);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_intent_category ON chatbot_leads(intent_category);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_created_at ON chatbot_leads(created_at);

-- Chat sessions indexes
CREATE INDEX IF NOT EXISTS idx_chat_sessions_conversation_id ON chat_sessions(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_intent_category ON chat_sessions(intent_category);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started_at ON chat_sessions(started_at);

-- Chat messages enhanced indexes
CREATE INDEX IF NOT EXISTS idx_chat_messages_enhanced_session_id ON chat_messages_enhanced(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_enhanced_role ON chat_messages_enhanced(role);
CREATE INDEX IF NOT EXISTS idx_chat_messages_enhanced_created_at ON chat_messages_enhanced(created_at);

-- Chatbot tools indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_tools_name ON chatbot_tools(name);
CREATE INDEX IF NOT EXISTS idx_chatbot_tools_is_active ON chatbot_tools(is_active);

-- WhatsApp optins indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_optins_phone ON whatsapp_optins(phone);
CREATE INDEX IF NOT EXISTS idx_whatsapp_optins_status ON whatsapp_optins(optin_status);

-- =============================================
-- Row Level Security
-- =============================================

-- Enable RLS on all tables
ALTER TABLE site_copies ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_optins ENABLE ROW LEVEL SECURITY;

-- Public read policies for business knowledge
CREATE POLICY "Site copies are publicly readable" ON site_copies FOR SELECT USING (true);
CREATE POLICY "Service pricing is publicly readable" ON service_pricing FOR SELECT USING (true);
CREATE POLICY "FAQs are publicly readable" ON faqs FOR SELECT USING (true);
CREATE POLICY "Booking slots are publicly readable" ON booking_slots FOR SELECT USING (true);
CREATE POLICY "Chatbot tools are publicly readable" ON chatbot_tools FOR SELECT USING (true);

-- Admin write policies for business knowledge
CREATE POLICY "Site copies are insertable by service role" ON site_copies FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Site copies are updatable by service role" ON site_copies FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service pricing is insertable by service role" ON service_pricing FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service pricing is updatable by service role" ON service_pricing FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "FAQs are insertable by service role" ON faqs FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "FAQs are updatable by service role" ON faqs FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Booking slots are insertable by service role" ON booking_slots FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Booking slots are updatable by service role" ON booking_slots FOR UPDATE USING (auth.role() = 'service_role');

-- Lead management policies
CREATE POLICY "Chatbot leads are insertable by service role" ON chatbot_leads FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Chatbot leads are viewable by service role" ON chatbot_leads FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Chatbot leads are updatable by service role" ON chatbot_leads FOR UPDATE USING (auth.role() = 'service_role');

-- Chat analytics policies
CREATE POLICY "Chat sessions are insertable by service role" ON chat_sessions FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Chat sessions are viewable by service role" ON chat_sessions FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Chat sessions are updatable by service role" ON chat_sessions FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "Chat messages enhanced are insertable by service role" ON chat_messages_enhanced FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Chat messages enhanced are viewable by service role" ON chat_messages_enhanced FOR SELECT USING (auth.role() = 'service_role');

-- WhatsApp policies
CREATE POLICY "WhatsApp optins are insertable by service role" ON whatsapp_optins FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "WhatsApp optins are viewable by service role" ON whatsapp_optins FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "WhatsApp optins are updatable by service role" ON whatsapp_optins FOR UPDATE USING (auth.role() = 'service_role');

-- =============================================
-- Permissions
-- =============================================

-- Grant permissions to service role
GRANT ALL ON site_copies TO service_role;
GRANT ALL ON service_pricing TO service_role;
GRANT ALL ON faqs TO service_role;
GRANT ALL ON booking_slots TO service_role;
GRANT ALL ON chatbot_leads TO service_role;
GRANT ALL ON chat_sessions TO service_role;
GRANT ALL ON chat_messages_enhanced TO service_role;
GRANT ALL ON chatbot_tools TO service_role;
GRANT ALL ON whatsapp_optins TO service_role;

-- Grant select permissions to authenticated users for analytics
GRANT SELECT ON chat_sessions TO authenticated;
GRANT SELECT ON chat_messages_enhanced TO authenticated;
GRANT SELECT ON chatbot_leads TO authenticated;

-- =============================================
-- Functions and Triggers
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_chatbot_leads_updated_at
    BEFORE UPDATE ON chatbot_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_whatsapp_optins_updated_at
    BEFORE UPDATE ON whatsapp_optins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate session duration
CREATE OR REPLACE FUNCTION calculate_session_duration()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ended_at IS NOT NULL AND NEW.started_at IS NOT NULL THEN
        NEW.session_duration_seconds = EXTRACT(EPOCH FROM (NEW.ended_at - NEW.started_at));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for session duration
CREATE TRIGGER update_session_duration
    BEFORE INSERT OR UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION calculate_session_duration();

-- =============================================
-- Sample Data Population
-- =============================================

-- Insert sample site copies
INSERT INTO site_copies (slug, title, content) VALUES
('about', 'About Hire With Prachi', 'Hire With Prachi is a leading HR consulting firm specializing in comprehensive HR solutions for businesses of all sizes. We provide expert guidance in recruitment, compliance, employee management, and HR technology implementation.'),
('process', 'Our Process', '1. Initial Consultation\n2. Needs Assessment\n3. Custom Solution Design\n4. Implementation\n5. Ongoing Support\n\nWe work closely with you to ensure your HR needs are met efficiently and effectively.'),
('contact', 'Contact Information', 'Email: info@hirewithprachi.com\nPhone: +91-XXXXXXXXXX\nAddress: [Your Business Address]\n\nAvailable for consultations Monday-Friday, 9 AM - 6 PM IST.'),
('privacy', 'Privacy Policy', 'We are committed to protecting your privacy. All information shared with us is kept confidential and used only for providing our services. We never share your data with third parties without explicit consent.'),
('hr-tools', 'HR Tools & Resources', 'Our comprehensive HR tools and resources include:\n\n• Job Description Templates\n• Interview Question Banks\n• Performance Review Templates\n• Employee Handbook Templates\n• HR Compliance Checklists\n• Policy Generators\n\nAll resources are designed to streamline your HR processes and improve efficiency.')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample FAQs
INSERT INTO faqs (category, question, answer, display_order) VALUES
('Payments', 'What payment methods do you accept?', 'We accept all major credit cards, UPI, net banking, and digital wallets through our secure Razorpay integration.', 1),
('Payments', 'Do you offer refunds?', 'Yes, we offer a 7-day money-back guarantee for all our services. If you are not satisfied, contact us for a full refund.', 2),
('Services', 'What is included in HR compliance services?', 'Our HR compliance services include legal requirement analysis, policy development, documentation, and ongoing compliance monitoring.', 3),
('Services', 'How long does it take to get started?', 'We can begin working on your project within 24-48 hours of receiving your requirements and initial consultation.', 4),
('Tools', 'Are the AI HR tools free to use?', 'We offer both free and premium tools. Free tools have basic features, while premium tools offer advanced functionality and unlimited usage.', 5),
('Support', 'What kind of support do you provide?', 'We provide 24/7 email support, business hours phone support, and dedicated account management for premium clients.', 6)
ON CONFLICT DO NOTHING;

-- Insert sample chatbot tools
INSERT INTO chatbot_tools (name, description, parameters, endpoint_url) VALUES
('get_services', 'Fetch AI HR tools/templates listing.', '{"type": "object", "properties": {"category": {"type": "string"}}}', '/api/chatbot/tools/get-services'),
('get_pricing', 'Fetch pricing for a tool.', '{"type": "object", "properties": {"tool_id": {"type": "string"}}, "required": ["tool_id"]}', '/api/chatbot/tools/get-pricing'),
('get_page_copy', 'Get site copy by slug.', '{"type": "object", "properties": {"slug": {"type": "string"}}, "required": ["slug"]}', '/api/chatbot/tools/get-page-copy'),
('get_faqs', 'Get FAQs optionally filtered by category.', '{"type": "object", "properties": {"category": {"type": "string"}}}', '/api/chatbot/tools/get-faqs'),
('get_slots', 'Get bookable slots.', '{"type": "object", "properties": {"from": {"type": "string"}, "to": {"type": "string"}}}', '/api/chatbot/tools/get-slots'),
('create_lead', 'Create a lead with consent.', '{"type": "object", "properties": {"name": {"type": "string"}, "email": {"type": "string"}, "phone": {"type": "string"}, "notes": {"type": "string"}, "source": {"type": "string"}}, "required": ["name"]}', '/api/chatbot/tools/create-lead'),
('schedule_call', 'Book a call slot or return booking link.', '{"type": "object", "properties": {"name": {"type": "string"}, "email": {"type": "string"}, "phone": {"type": "string"}, "slot_id": {"type": "string"}}, "required": ["name"]}', '/api/chatbot/tools/schedule-call'),
('create_order', 'Create Razorpay order for a paid tool.', '{"type": "object", "properties": {"tool_id": {"type": "string"}, "plan_id": {"type": "string"}, "amount_inr": {"type": "number"}}, "required": ["tool_id", "amount_inr"]}', '/api/chatbot/tools/create-order'),
('send_whatsapp_optin', 'Send WhatsApp template message for opt-in/OTP.', '{"type": "object", "properties": {"phone": {"type": "string"}, "name": {"type": "string"}, "purpose": {"type": "string"}}, "required": ["phone"]}', '/api/chatbot/tools/send-whatsapp-optin')
ON CONFLICT (name) DO NOTHING;
