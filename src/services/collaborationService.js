// Real-time Collaboration Service
// Enable multiple users to work on resumes together

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export class CollaborationService {
  
  static activeConnections = new Map();
  static changeListeners = new Map();
  
  // =============================================
  // Real-time Connection Management
  // =============================================
  
  static async joinResumeSession(resumeId, userId, userProfile) {
    try {
      // Create or join collaboration session
      const sessionId = `resume_${resumeId}`;
      
      // Subscribe to real-time changes
      const channel = supabase
        .channel(sessionId)
        .on('presence', { event: 'sync' }, (payload) => {
          this.handlePresenceSync(resumeId, payload);
        })
        .on('presence', { event: 'join' }, (payload) => {
          this.handleUserJoin(resumeId, payload);
        })
        .on('presence', { event: 'leave' }, (payload) => {
          this.handleUserLeave(resumeId, payload);
        })
        .on('broadcast', { event: 'resume_change' }, (payload) => {
          this.handleResumeChange(resumeId, payload);
        })
        .on('broadcast', { event: 'cursor_position' }, (payload) => {
          this.handleCursorPosition(resumeId, payload);
        })
        .on('broadcast', { event: 'comment_added' }, (payload) => {
          this.handleCommentAdded(resumeId, payload);
        })
        .subscribe();

      // Track presence
      await channel.track({
        user_id: userId,
        user_profile: userProfile,
        joined_at: new Date().toISOString(),
        status: 'active'
      });

      // Store connection
      this.activeConnections.set(resumeId, {
        channel,
        userId,
        sessionId,
        joinedAt: new Date()
      });

      // Log collaboration start
      await this.logCollaborationEvent(resumeId, userId, 'session_joined', {
        user_profile: userProfile
      });

      return {
        success: true,
        sessionId,
        channel
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async leaveResumeSession(resumeId) {
    try {
      const connection = this.activeConnections.get(resumeId);
      if (connection) {
        await connection.channel.unsubscribe();
        this.activeConnections.delete(resumeId);
        
        // Log collaboration end
        await this.logCollaborationEvent(resumeId, connection.userId, 'session_left', {
          session_duration: Date.now() - connection.joinedAt.getTime()
        });
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // =============================================
  // Real-time Change Broadcasting
  // =============================================
  
  static async broadcastResumeChange(resumeId, change, userId) {
    try {
      const connection = this.activeConnections.get(resumeId);
      if (!connection) {
        throw new Error('Not connected to collaboration session');
      }

      // Add metadata to change
      const enrichedChange = {
        ...change,
        user_id: userId,
        timestamp: new Date().toISOString(),
        change_id: this.generateChangeId()
      };

      // Broadcast to other users
      await connection.channel.send({
        type: 'broadcast',
        event: 'resume_change',
        payload: enrichedChange
      });

      // Store change in database for conflict resolution
      await this.storeChange(resumeId, enrichedChange);

      return { success: true, changeId: enrichedChange.change_id };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async broadcastCursorPosition(resumeId, position, userId) {
    try {
      const connection = this.activeConnections.get(resumeId);
      if (!connection) return;

      await connection.channel.send({
        type: 'broadcast',
        event: 'cursor_position',
        payload: {
          user_id: userId,
          position,
          timestamp: new Date().toISOString()
        }
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // =============================================
  // Change Management & Conflict Resolution
  // =============================================
  
  static async storeChange(resumeId, change) {
    try {
      await supabase.from('collaboration_changes').insert({
        resume_id: resumeId,
        change_id: change.change_id,
        user_id: change.user_id,
        change_type: change.type,
        field_path: change.field_path,
        old_value: change.old_value,
        new_value: change.new_value,
        timestamp: change.timestamp
      });
    } catch (error) {
      console.error('Error storing change:', error);
    }
  }

  static async resolveConflicts(resumeId, changes) {
    try {
      // Simple last-write-wins strategy
      // TODO: Implement more sophisticated conflict resolution
      
      const conflictResolution = changes.reduce((resolved, change) => {
        const key = change.field_path;
        if (!resolved[key] || new Date(change.timestamp) > new Date(resolved[key].timestamp)) {
          resolved[key] = change;
        }
        return resolved;
      }, {});

      return {
        success: true,
        resolvedChanges: Object.values(conflictResolution)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getChangeHistory(resumeId, since = null) {
    try {
      let query = supabase
        .from('collaboration_changes')
        .select('*')
        .eq('resume_id', resumeId)
        .order('timestamp', { ascending: true });

      if (since) {
        query = query.gte('timestamp', since);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;

      return {
        success: true,
        changes: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // =============================================
  // Comments and Feedback System
  // =============================================
  
  static async addComment(resumeId, comment, userId, userProfile) {
    try {
      const commentData = {
        id: this.generateCommentId(),
        resume_id: resumeId,
        user_id: userId,
        user_profile: userProfile,
        content: comment.content,
        field_path: comment.field_path,
        position: comment.position,
        type: comment.type || 'comment', // comment, suggestion, question
        created_at: new Date().toISOString(),
        resolved: false
      };

      // Store in database
      await supabase.from('collaboration_comments').insert(commentData);

      // Broadcast to collaborators
      const connection = this.activeConnections.get(resumeId);
      if (connection) {
        await connection.channel.send({
          type: 'broadcast',
          event: 'comment_added',
          payload: commentData
        });
      }

      return {
        success: true,
        comment: commentData
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getComments(resumeId, fieldPath = null) {
    try {
      let query = supabase
        .from('collaboration_comments')
        .select('*')
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true });

      if (fieldPath) {
        query = query.eq('field_path', fieldPath);
      }

      const { data, error } = await query;
      if (error) throw error;

      return {
        success: true,
        comments: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async resolveComment(commentId, userId) {
    try {
      await supabase
        .from('collaboration_comments')
        .update({ 
          resolved: true, 
          resolved_by: userId, 
          resolved_at: new Date().toISOString() 
        })
        .eq('id', commentId);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // =============================================
  // Permission Management
  // =============================================
  
  static async shareResume(resumeId, targetEmail, permission, userId) {
    try {
      // Check if user has permission to share
      const canShare = await this.checkSharePermission(resumeId, userId);
      if (!canShare) {
        throw new Error('Insufficient permissions to share resume');
      }

      // Create share invitation
      const invitation = {
        id: this.generateInvitationId(),
        resume_id: resumeId,
        shared_by: userId,
        target_email: targetEmail,
        permission: permission, // view, comment, edit
        status: 'pending',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      };

      await supabase.from('collaboration_invitations').insert(invitation);

      // Send invitation email (if email service is configured)
      await this.sendInvitationEmail(invitation);

      return {
        success: true,
        invitation
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async acceptInvitation(invitationId, userId) {
    try {
      // Get invitation details
      const { data: invitation, error } = await supabase
        .from('collaboration_invitations')
        .select('*')
        .eq('id', invitationId)
        .eq('status', 'pending')
        .single();

      if (error || !invitation) {
        throw new Error('Invalid or expired invitation');
      }

      // Check if invitation is still valid
      if (new Date() > new Date(invitation.expires_at)) {
        throw new Error('Invitation has expired');
      }

      // Create collaboration permission
      await supabase.from('collaboration_permissions').insert({
        resume_id: invitation.resume_id,
        user_id: userId,
        permission: invitation.permission,
        granted_by: invitation.shared_by,
        granted_at: new Date().toISOString()
      });

      // Update invitation status
      await supabase
        .from('collaboration_invitations')
        .update({ 
          status: 'accepted', 
          accepted_by: userId, 
          accepted_at: new Date().toISOString() 
        })
        .eq('id', invitationId);

      return {
        success: true,
        resumeId: invitation.resume_id,
        permission: invitation.permission
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async checkPermission(resumeId, userId) {
    try {
      // Check if user owns the resume
      const { data: resume } = await supabase
        .from('resumes')
        .select('user_id')
        .eq('id', resumeId)
        .single();

      if (resume?.user_id === userId) {
        return { success: true, permission: 'owner' };
      }

      // Check collaboration permissions
      const { data: permission } = await supabase
        .from('collaboration_permissions')
        .select('permission')
        .eq('resume_id', resumeId)
        .eq('user_id', userId)
        .single();

      return {
        success: true,
        permission: permission?.permission || 'none'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // =============================================
  // Event Handlers
  // =============================================
  
  static handlePresenceSync(resumeId, payload) {
    const presenceState = payload.state;
    const activeUsers = Object.values(presenceState).map(userState => 
      userState[0] // Get the latest presence state
    );

    // Notify listeners about active users
    const listeners = this.changeListeners.get(resumeId) || [];
    listeners.forEach(listener => {
      if (listener.type === 'presence') {
        listener.callback(activeUsers);
      }
    });
  }

  static handleUserJoin(resumeId, payload) {
    const newUser = payload.newPresences[0];
    
    // Notify listeners
    const listeners = this.changeListeners.get(resumeId) || [];
    listeners.forEach(listener => {
      if (listener.type === 'userJoin') {
        listener.callback(newUser);
      }
    });
  }

  static handleUserLeave(resumeId, payload) {
    const leftUser = payload.leftPresences[0];
    
    // Notify listeners
    const listeners = this.changeListeners.get(resumeId) || [];
    listeners.forEach(listener => {
      if (listener.type === 'userLeave') {
        listener.callback(leftUser);
      }
    });
  }

  static handleResumeChange(resumeId, payload) {
    // Notify listeners about changes
    const listeners = this.changeListeners.get(resumeId) || [];
    listeners.forEach(listener => {
      if (listener.type === 'change') {
        listener.callback(payload.payload);
      }
    });
  }

  static handleCursorPosition(resumeId, payload) {
    // Notify listeners about cursor movements
    const listeners = this.changeListeners.get(resumeId) || [];
    listeners.forEach(listener => {
      if (listener.type === 'cursor') {
        listener.callback(payload.payload);
      }
    });
  }

  static handleCommentAdded(resumeId, payload) {
    // Notify listeners about new comments
    const listeners = this.changeListeners.get(resumeId) || [];
    listeners.forEach(listener => {
      if (listener.type === 'comment') {
        listener.callback(payload.payload);
      }
    });
  }

  // =============================================
  // Event Listeners
  // =============================================
  
  static addChangeListener(resumeId, type, callback) {
    if (!this.changeListeners.has(resumeId)) {
      this.changeListeners.set(resumeId, []);
    }
    
    const listener = { type, callback, id: Date.now() };
    this.changeListeners.get(resumeId).push(listener);
    
    return listener.id;
  }

  static removeChangeListener(resumeId, listenerId) {
    const listeners = this.changeListeners.get(resumeId) || [];
    const updatedListeners = listeners.filter(l => l.id !== listenerId);
    this.changeListeners.set(resumeId, updatedListeners);
  }

  // =============================================
  // Utility Functions
  // =============================================
  
  static generateChangeId() {
    return `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static generateCommentId() {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static generateInvitationId() {
    return `invite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async checkSharePermission(resumeId, userId) {
    try {
      const permission = await this.checkPermission(resumeId, userId);
      return permission.success && ['owner', 'edit'].includes(permission.permission);
    } catch {
      return false;
    }
  }

  static async sendInvitationEmail(invitation) {
    // Placeholder for email service integration
    // This would integrate with your email service (Resend, SendGrid, etc.)
    console.log('Sending invitation email:', invitation);
  }

  static async logCollaborationEvent(resumeId, userId, event, metadata = {}) {
    try {
      await supabase.from('tool_events').insert({
        user_id: userId,
        resume_id: resumeId,
        event: `collaboration_${event}`,
        meta: metadata
      });
    } catch (error) {
      console.error('Error logging collaboration event:', error);
    }
  }

  // =============================================
  // Analytics
  // =============================================
  
  static async getCollaborationAnalytics(resumeId) {
    try {
      const [changesResult, commentsResult, sessionsResult] = await Promise.all([
        supabase.from('collaboration_changes').select('*').eq('resume_id', resumeId),
        supabase.from('collaboration_comments').select('*').eq('resume_id', resumeId),
        supabase.from('tool_events')
          .select('*')
          .eq('resume_id', resumeId)
          .like('event', 'collaboration_%')
      ]);

      const analytics = {
        totalChanges: changesResult.data?.length || 0,
        totalComments: commentsResult.data?.length || 0,
        totalSessions: sessionsResult.data?.filter(e => e.event === 'collaboration_session_joined').length || 0,
        uniqueCollaborators: new Set(changesResult.data?.map(c => c.user_id) || []).size,
        lastActivity: this.getLastActivity(changesResult.data, commentsResult.data),
        activityTimeline: this.buildActivityTimeline(changesResult.data, commentsResult.data)
      };

      return {
        success: true,
        analytics
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static getLastActivity(changes, comments) {
    const allEvents = [
      ...(changes || []).map(c => ({ type: 'change', timestamp: c.timestamp })),
      ...(comments || []).map(c => ({ type: 'comment', timestamp: c.created_at }))
    ];

    allEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return allEvents[0] || null;
  }

  static buildActivityTimeline(changes, comments) {
    const timeline = [];
    
    (changes || []).forEach(change => {
      timeline.push({
        type: 'change',
        timestamp: change.timestamp,
        user_id: change.user_id,
        description: `Modified ${change.field_path}`
      });
    });

    (comments || []).forEach(comment => {
      timeline.push({
        type: 'comment',
        timestamp: comment.created_at,
        user_id: comment.user_id,
        description: `Added comment on ${comment.field_path}`
      });
    });

    timeline.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return timeline.slice(0, 20); // Last 20 activities
  }
}

export default CollaborationService;
