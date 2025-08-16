-- Real-time Collaboration System Database Schema (FIXED VERSION)
-- Run AFTER 027_enhanced_resume_builder_schema_fixed.sql

-- =============================================
-- PREREQUISITE CHECK: Ensure resumes table exists
-- =============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'resumes') THEN
        RAISE EXCEPTION 'ERROR: resumes table does not exist. Please run 027_enhanced_resume_builder_schema_fixed.sql first.';
    END IF;
END $$;

-- =============================================
-- Collaboration Changes (Real-time editing)
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_changes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    change_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    change_type TEXT NOT NULL, -- insert, update, delete
    field_path TEXT NOT NULL, -- e.g., 'experience[0].bullets[1]'
    old_value JSONB,
    new_value JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    applied BOOLEAN DEFAULT false,
    conflict_resolved BOOLEAN DEFAULT false
);

-- =============================================
-- Collaboration Comments & Feedback
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_comments (
    id TEXT PRIMARY KEY,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    user_profile JSONB NOT NULL DEFAULT '{}', -- User name, avatar, etc.
    content TEXT NOT NULL,
    field_path TEXT, -- Which field the comment is on
    position JSONB, -- Cursor position or selection range
    type TEXT CHECK (type IN ('comment', 'suggestion', 'question', 'approval')) DEFAULT 'comment',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved BOOLEAN DEFAULT false,
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMPTZ,
    parent_comment_id TEXT REFERENCES collaboration_comments(id) ON DELETE CASCADE -- For replies
);

-- =============================================
-- Collaboration Permissions
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    permission TEXT CHECK (permission IN ('view', 'comment', 'edit')) NOT NULL,
    granted_by UUID REFERENCES auth.users(id) NOT NULL,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    
    UNIQUE(resume_id, user_id)
);

-- =============================================
-- Collaboration Invitations
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_invitations (
    id TEXT PRIMARY KEY,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    target_email TEXT NOT NULL,
    permission TEXT CHECK (permission IN ('view', 'comment', 'edit')) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined', 'expired')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_by UUID REFERENCES auth.users(id),
    accepted_at TIMESTAMPTZ,
    message TEXT -- Optional invitation message
);

-- =============================================
-- Collaboration Sessions (Real-time presence)
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id TEXT NOT NULL,
    user_profile JSONB NOT NULL DEFAULT '{}',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    status TEXT CHECK (status IN ('active', 'idle', 'disconnected')) DEFAULT 'active',
    cursor_position JSONB, -- Current cursor/selection position
    current_field TEXT -- Currently editing field
);

-- =============================================
-- Collaboration Activity Log
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL, -- join, leave, edit, comment, share, etc.
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Version Snapshots (For conflict resolution)
-- =============================================

CREATE TABLE IF NOT EXISTS collaboration_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    version_number INTEGER NOT NULL,
    data JSONB NOT NULL,
    created_by UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    change_summary TEXT,
    auto_generated BOOLEAN DEFAULT false -- Auto vs manual snapshots
);

-- =============================================
-- Indexes for Performance
-- =============================================

-- Collaboration changes
CREATE INDEX IF NOT EXISTS idx_collaboration_changes_resume_id ON collaboration_changes(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_changes_timestamp ON collaboration_changes(timestamp);
CREATE INDEX IF NOT EXISTS idx_collaboration_changes_user_id ON collaboration_changes(user_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_changes_change_id ON collaboration_changes(change_id);

-- Comments
CREATE INDEX IF NOT EXISTS idx_collaboration_comments_resume_id ON collaboration_comments(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_comments_field_path ON collaboration_comments(field_path);
CREATE INDEX IF NOT EXISTS idx_collaboration_comments_user_id ON collaboration_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_comments_created_at ON collaboration_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_collaboration_comments_resolved ON collaboration_comments(resolved);

-- Permissions
CREATE INDEX IF NOT EXISTS idx_collaboration_permissions_resume_id ON collaboration_permissions(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_permissions_user_id ON collaboration_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_permissions_active ON collaboration_permissions(is_active);

-- Invitations
CREATE INDEX IF NOT EXISTS idx_collaboration_invitations_target_email ON collaboration_invitations(target_email);
CREATE INDEX IF NOT EXISTS idx_collaboration_invitations_status ON collaboration_invitations(status);
CREATE INDEX IF NOT EXISTS idx_collaboration_invitations_expires_at ON collaboration_invitations(expires_at);

-- Sessions
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_resume_id ON collaboration_sessions(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_user_id ON collaboration_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_status ON collaboration_sessions(status);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_last_seen ON collaboration_sessions(last_seen);

-- Activity
CREATE INDEX IF NOT EXISTS idx_collaboration_activity_resume_id ON collaboration_activity(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_activity_created_at ON collaboration_activity(created_at);

-- Snapshots
CREATE INDEX IF NOT EXISTS idx_collaboration_snapshots_resume_id ON collaboration_snapshots(resume_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_snapshots_version ON collaboration_snapshots(version_number);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE collaboration_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_snapshots ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view changes for accessible resumes" ON collaboration_changes;
DROP POLICY IF EXISTS "Users can create changes for editable resumes" ON collaboration_changes;
DROP POLICY IF EXISTS "Users can view comments for accessible resumes" ON collaboration_comments;
DROP POLICY IF EXISTS "Users can create comments for accessible resumes" ON collaboration_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON collaboration_comments;

-- Collaboration changes policies
CREATE POLICY "Users can view changes for accessible resumes" ON collaboration_changes FOR SELECT
USING (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_changes.resume_id AND is_active = true
    )
);

CREATE POLICY "Users can create changes for editable resumes" ON collaboration_changes FOR INSERT
WITH CHECK (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_changes.resume_id 
        AND permission IN ('edit') AND is_active = true
    )
);

-- Comments policies
CREATE POLICY "Users can view comments for accessible resumes" ON collaboration_comments FOR SELECT
USING (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_comments.resume_id AND is_active = true
    )
);

CREATE POLICY "Users can create comments for accessible resumes" ON collaboration_comments FOR INSERT
WITH CHECK (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_comments.resume_id 
        AND permission IN ('comment', 'edit') AND is_active = true
    )
);

CREATE POLICY "Users can update their own comments" ON collaboration_comments FOR UPDATE
USING (auth.uid() = user_id);

-- Permissions policies
CREATE POLICY "Resume owners can manage permissions" ON collaboration_permissions FOR ALL
USING (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
    )
);

CREATE POLICY "Users can view their own permissions" ON collaboration_permissions FOR SELECT
USING (auth.uid() = user_id);

-- Invitations policies
CREATE POLICY "Users can view sent invitations" ON collaboration_invitations FOR SELECT
USING (auth.uid() = shared_by);

CREATE POLICY "Users can view invitations sent to them" ON collaboration_invitations FOR SELECT
USING (
    auth.email() = target_email OR 
    auth.uid() = shared_by
);

CREATE POLICY "Users can create invitations for their resumes" ON collaboration_invitations FOR INSERT
WITH CHECK (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_invitations.resume_id 
        AND permission = 'edit' AND is_active = true
    )
);

CREATE POLICY "Users can update invitations they received" ON collaboration_invitations FOR UPDATE
USING (auth.email() = target_email OR auth.uid() = shared_by);

-- Sessions policies
CREATE POLICY "Users can manage their own sessions" ON collaboration_sessions FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can view sessions for accessible resumes" ON collaboration_sessions FOR SELECT
USING (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_sessions.resume_id AND is_active = true
    )
);

-- Activity policies
CREATE POLICY "Users can view activity for accessible resumes" ON collaboration_activity FOR SELECT
USING (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_activity.resume_id AND is_active = true
    )
);

CREATE POLICY "Users can create activity for accessible resumes" ON collaboration_activity FOR INSERT
WITH CHECK (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_activity.resume_id AND is_active = true
    )
);

-- Snapshots policies
CREATE POLICY "Users can view snapshots for accessible resumes" ON collaboration_snapshots FOR SELECT
USING (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_snapshots.resume_id AND is_active = true
    )
);

CREATE POLICY "Users can create snapshots for editable resumes" ON collaboration_snapshots FOR INSERT
WITH CHECK (
    auth.uid() IN (
        SELECT user_id FROM resumes WHERE id = resume_id
        UNION
        SELECT user_id FROM collaboration_permissions 
        WHERE resume_id = collaboration_snapshots.resume_id 
        AND permission = 'edit' AND is_active = true
    )
);

-- =============================================
-- Functions and Triggers
-- =============================================

-- Function to cleanup expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    UPDATE collaboration_sessions 
    SET status = 'disconnected'
    WHERE last_seen < NOW() - INTERVAL '15 minutes'
    AND status != 'disconnected';
    
    -- Delete very old disconnected sessions
    DELETE FROM collaboration_sessions
    WHERE status = 'disconnected'
    AND last_seen < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Function to cleanup expired invitations
CREATE OR REPLACE FUNCTION cleanup_expired_invitations()
RETURNS void AS $$
BEGIN
    UPDATE collaboration_invitations 
    SET status = 'expired'
    WHERE expires_at < NOW()
    AND status = 'pending';
END;
$$ LANGUAGE plpgsql;

-- Function to get collaboration summary
CREATE OR REPLACE FUNCTION get_collaboration_summary(target_resume_id UUID)
RETURNS TABLE(
    active_collaborators INT,
    total_changes INT,
    total_comments INT,
    unresolved_comments INT,
    last_activity TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(DISTINCT user_id)::INT 
         FROM collaboration_sessions 
         WHERE resume_id = target_resume_id 
         AND status = 'active' 
         AND last_seen > NOW() - INTERVAL '15 minutes'),
        
        (SELECT COUNT(*)::INT 
         FROM collaboration_changes 
         WHERE resume_id = target_resume_id),
        
        (SELECT COUNT(*)::INT 
         FROM collaboration_comments 
         WHERE resume_id = target_resume_id),
        
        (SELECT COUNT(*)::INT 
         FROM collaboration_comments 
         WHERE resume_id = target_resume_id 
         AND resolved = false),
        
        (SELECT MAX(greatest_timestamp)
         FROM (
             SELECT MAX(timestamp) as greatest_timestamp 
             FROM collaboration_changes 
             WHERE resume_id = target_resume_id
             UNION ALL
             SELECT MAX(created_at) 
             FROM collaboration_comments 
             WHERE resume_id = target_resume_id
         ) t);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check collaboration permissions
CREATE OR REPLACE FUNCTION check_collaboration_permission(
    target_resume_id UUID,
    target_user_id UUID
)
RETURNS TEXT AS $$
DECLARE
    permission_level TEXT;
    is_owner BOOLEAN;
BEGIN
    -- Check if user owns the resume
    SELECT (user_id = target_user_id) INTO is_owner
    FROM resumes 
    WHERE id = target_resume_id;
    
    IF is_owner THEN
        RETURN 'owner';
    END IF;
    
    -- Check collaboration permissions
    SELECT permission INTO permission_level
    FROM collaboration_permissions
    WHERE resume_id = target_resume_id 
    AND user_id = target_user_id 
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > NOW());
    
    RETURN COALESCE(permission_level, 'none');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update last_seen on session activity
CREATE OR REPLACE FUNCTION update_session_last_seen()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_seen = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_collaboration_sessions_last_seen ON collaboration_sessions;
CREATE TRIGGER update_collaboration_sessions_last_seen
    BEFORE UPDATE ON collaboration_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_session_last_seen();

-- Trigger to log collaboration activity
CREATE OR REPLACE FUNCTION log_collaboration_activity()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'collaboration_comments' THEN
        INSERT INTO collaboration_activity (resume_id, user_id, activity_type, description, metadata)
        VALUES (NEW.resume_id, NEW.user_id, 'comment_added', 
                'Added comment on ' || COALESCE(NEW.field_path, 'resume'), 
                jsonb_build_object('comment_id', NEW.id, 'comment_type', NEW.type));
    END IF;
    
    IF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'collaboration_changes' THEN
        INSERT INTO collaboration_activity (resume_id, user_id, activity_type, description, metadata)
        VALUES (NEW.resume_id, NEW.user_id, 'content_edited', 
                'Modified ' || NEW.field_path, 
                jsonb_build_object('change_id', NEW.change_id, 'change_type', NEW.change_type));
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS log_collaboration_comments_activity ON collaboration_comments;
CREATE TRIGGER log_collaboration_comments_activity
    AFTER INSERT ON collaboration_comments
    FOR EACH ROW
    EXECUTE FUNCTION log_collaboration_activity();

DROP TRIGGER IF EXISTS log_collaboration_changes_activity ON collaboration_changes;
CREATE TRIGGER log_collaboration_changes_activity
    AFTER INSERT ON collaboration_changes
    FOR EACH ROW
    EXECUTE FUNCTION log_collaboration_activity();

-- =============================================
-- Views for Easy Querying
-- =============================================

-- Active collaborators view
CREATE OR REPLACE VIEW active_collaborators AS
SELECT 
    s.resume_id,
    s.user_id,
    s.user_profile,
    s.joined_at,
    s.last_seen,
    s.current_field,
    p.permission,
    r.title as resume_title
FROM collaboration_sessions s
LEFT JOIN collaboration_permissions p ON s.resume_id = p.resume_id AND s.user_id = p.user_id
LEFT JOIN resumes r ON s.resume_id = r.id
WHERE s.status = 'active' 
AND s.last_seen > NOW() - INTERVAL '15 minutes';

-- Resume collaboration overview
CREATE OR REPLACE VIEW resume_collaboration_overview AS
SELECT 
    r.id as resume_id,
    r.title,
    r.user_id as owner_id,
    COUNT(DISTINCT cp.user_id) as shared_with_count,
    COUNT(DISTINCT cs.user_id) as active_collaborators,
    COUNT(DISTINCT cc.id) as total_comments,
    COUNT(DISTINCT cc.id) FILTER (WHERE cc.resolved = false) as unresolved_comments,
    COUNT(DISTINCT ch.id) as total_changes,
    MAX(GREATEST(cc.created_at, ch.timestamp)) as last_activity
FROM resumes r
LEFT JOIN collaboration_permissions cp ON r.id = cp.resume_id AND cp.is_active = true
LEFT JOIN collaboration_sessions cs ON r.id = cs.resume_id AND cs.status = 'active'
LEFT JOIN collaboration_comments cc ON r.id = cc.resume_id
LEFT JOIN collaboration_changes ch ON r.id = ch.resume_id
GROUP BY r.id, r.title, r.user_id;

-- =============================================
-- Final Verification
-- =============================================

DO $$
DECLARE
    table_count INTEGER;
    function_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name LIKE 'collaboration_%';
    
    SELECT COUNT(*) INTO function_count
    FROM information_schema.routines 
    WHERE routine_schema = 'public' 
    AND routine_name LIKE '%collaboration%';
    
    RAISE NOTICE 'Collaboration System Deployed Successfully - % tables, % functions', table_count, function_count;
END $$;
