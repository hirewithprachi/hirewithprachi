-- Chatbot anon-friendly RLS policies (public website visitors)
-- NOTE: This grants anon (public) access to manage chat data.
-- For stricter security later, we can scope by session_id or move to edge functions.

-- Ensure RLS is enabled
ALTER TABLE IF EXISTS public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing anon policies if they exist to avoid duplicates
DROP POLICY IF EXISTS "anon can select chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "anon can insert chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "anon can update chat_conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "anon can delete chat_conversations" ON public.chat_conversations;

DROP POLICY IF EXISTS "anon can select chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "anon can insert chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "anon can update chat_messages" ON public.chat_messages;
DROP POLICY IF EXISTS "anon can delete chat_messages" ON public.chat_messages;

-- Basic anon policies (open). Replace with scoped policies later if needed
CREATE POLICY "anon can select chat_conversations" ON public.chat_conversations
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon can insert chat_conversations" ON public.chat_conversations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon can update chat_conversations" ON public.chat_conversations
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "anon can delete chat_conversations" ON public.chat_conversations
  FOR DELETE TO anon USING (true);

CREATE POLICY "anon can select chat_messages" ON public.chat_messages
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon can insert chat_messages" ON public.chat_messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon can update chat_messages" ON public.chat_messages
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "anon can delete chat_messages" ON public.chat_messages
  FOR DELETE TO anon USING (true);

-- Grant anon usage if necessary (read/write via RLS). Typically not required beyond anon key
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO anon;


