-- Add chatbot tables for GPT-4o Mini integration
-- This migration creates tables for storing chat conversations and messages

-- Create chat conversations table
CREATE TABLE IF NOT EXISTS public.chat_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    session_id TEXT NOT NULL,
    lead_data JSONB DEFAULT '{}',
    conversation_history JSONB DEFAULT '[]',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    total_messages INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON public.chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON public.chat_conversations(status);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON public.chat_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON public.chat_messages(role);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);

-- Enable Row Level Security
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chat_conversations
CREATE POLICY "Chat conversations are viewable by authenticated users" ON public.chat_conversations
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Chat conversations are insertable by authenticated users" ON public.chat_conversations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Chat conversations are updatable by authenticated users" ON public.chat_conversations
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Chat conversations are deletable by authenticated users" ON public.chat_conversations
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for chat_messages
CREATE POLICY "Chat messages are viewable by authenticated users" ON public.chat_messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Chat messages are insertable by authenticated users" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Chat messages are updatable by authenticated users" ON public.chat_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Chat messages are deletable by authenticated users" ON public.chat_messages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.chat_conversations TO authenticated;
GRANT ALL ON public.chat_conversations TO service_role;
GRANT ALL ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;

-- Create function to update updated_at timestamp for chat_conversations
CREATE OR REPLACE FUNCTION update_chat_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_chat_conversations_updated_at
    BEFORE UPDATE ON public.chat_conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_conversations_updated_at();

-- Create function to count messages in a conversation
CREATE OR REPLACE FUNCTION update_conversation_message_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.chat_conversations 
        SET total_messages = total_messages + 1,
            updated_at = NOW()
        WHERE id = NEW.conversation_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.chat_conversations 
        SET total_messages = total_messages - 1,
            updated_at = NOW()
        WHERE id = OLD.conversation_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for message count
CREATE TRIGGER update_conversation_message_count
    AFTER INSERT OR DELETE ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_message_count();
