// Enhanced Resume Builder Service
// Production-ready service with AI integration, quota management, and ATS optimization

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// =============================================
// Zod Validation Schemas
// =============================================

const PersonalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  headline: z.string().min(10, 'Headline must be at least 10 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  location: z.string().min(2, 'Location required'),
  links: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  })).optional()
});

const ExperienceItemSchema = z.object({
  company: z.string().min(2, 'Company name required'),
  role: z.string().min(2, 'Role title required'),
  location: z.string().optional(),
  start: z.string().regex(/^[A-Z]{3} \d{4}$/, 'Format: MMM YYYY'),
  end: z.union([
    z.literal('Present'),
    z.string().regex(/^[A-Z]{3} \d{4}$/, 'Format: MMM YYYY')
  ]),
  bullets: z.array(z.string().min(12).max(200)).min(2, 'At least 2 achievements required'),
  technologies: z.array(z.string()).optional()
});

const ProjectItemSchema = z.object({
  name: z.string().min(2, 'Project name required'),
  role: z.string().optional(),
  link: z.string().url().optional(),
  bullets: z.array(z.string().min(12).max(200)).min(1),
  technologies: z.array(z.string()).optional()
});

const EducationItemSchema = z.object({
  school: z.string().min(2, 'School name required'),
  degree: z.string().min(2, 'Degree required'),
  start: z.string().regex(/^[A-Z]{3} \d{4}$/, 'Format: MMM YYYY'),
  end: z.string().regex(/^[A-Z]{3} \d{4}$/, 'Format: MMM YYYY'),
  details: z.string().optional()
});

const SkillsSchema = z.object({
  core: z.array(z.string()).min(3, 'At least 3 core skills required'),
  tools: z.array(z.string()).optional(),
  soft: z.array(z.string()).optional()
});

const ExtrasSchema = z.object({
  certifications: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional()
});

const ResumeDataSchema = z.object({
  profile: PersonalInfoSchema,
  summary: z.string().min(50, 'Summary must be at least 50 characters').max(300),
  experience: z.array(ExperienceItemSchema).min(1, 'At least one work experience required'),
  projects: z.array(ProjectItemSchema).optional(),
  education: z.array(EducationItemSchema).min(1, 'At least one education entry required'),
  skills: SkillsSchema,
  extras: ExtrasSchema.optional()
});

// =============================================
// Enhanced Resume Service Class
// =============================================

export class EnhancedResumeService {
  
  // =============================================
  // User Management & Authentication
  // =============================================
  
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!user) return { success: false, error: 'No authenticated user' };
      
      // Get user profile and subscription
      const [profileResult, subscriptionResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).single()
      ]);
      
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          profile: profileResult.data,
          subscription: subscriptionResult.data || { plan: 'free', status: 'active' }
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async getUserPlan(userId) {
    try {
      const { data } = await supabase.rpc('get_user_plan', { user_uuid: userId });
      return data || 'free';
    } catch (error) {
      console.error('Error getting user plan:', error);
      return 'free';
    }
  }
  
  // =============================================
  // Quota Management
  // =============================================
  
  static async checkQuotaLimit(userId, quotaType) {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      const { data } = await supabase.rpc('check_quota_limit', {
        user_uuid: userId,
        quota_type: quotaType,
        current_month: currentMonth
      });
      
      return data;
    } catch (error) {
      console.error('Error checking quota:', error);
      return false;
    }
  }
  
  static async incrementQuotaUsage(userId, quotaType) {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      await supabase.rpc('increment_quota_usage', {
        user_uuid: userId,
        quota_type: quotaType,
        current_month: currentMonth
      });
      return { success: true };
    } catch (error) {
      console.error('Error incrementing quota:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async getUserQuotas(userId) {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data, error } = await supabase
        .from('usage_quotas')
        .select('*')
        .eq('user_id', userId)
        .eq('month_key', currentMonth)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      const userPlan = await this.getUserPlan(userId);
      const limits = this.getQuotaLimits(userPlan);
      
      return {
        success: true,
        quotas: data || {
          ai_polish_count: 0,
          exports_count: 0,
          jd_analysis_count: 0,
          cover_letter_count: 0
        },
        limits
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static getQuotaLimits(plan) {
    if (plan === 'free') {
      return {
        ai_polish: 3,
        exports: 3,
        jd_analysis: 2,
        cover_letter: 0,
        active_resumes: 1
      };
    } else {
      return {
        ai_polish: 50,
        exports: 100,
        jd_analysis: 50,
        cover_letter: 25,
        active_resumes: -1 // unlimited
      };
    }
  }
  
  // =============================================
  // Resume Management
  // =============================================
  
  static async createResume(userId, title = 'My Resume') {
    try {
      // Check if free user has reached resume limit
      const userPlan = await this.getUserPlan(userId);
      if (userPlan === 'free') {
        const { data: activeResumes } = await supabase
          .from('resumes')
          .select('id')
          .eq('user_id', userId)
          .eq('is_active', true);
        
        if (activeResumes && activeResumes.length >= 1) {
          return { 
            success: false, 
            error: 'Free plan allows only 1 active resume',
            code: 'QUOTA_EXCEEDED'
          };
        }
      }
      
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: userId,
          title,
          template_key: 'modern'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Create initial version
      const initialData = {
        profile: { name: '', headline: '', email: '', phone: '', location: '', links: [] },
        summary: '',
        experience: [],
        projects: [],
        education: [],
        skills: { core: [], tools: [], soft: [] },
        extras: { certifications: [], awards: [], languages: [] }
      };
      
      const versionResult = await this.createResumeVersion(data.id, initialData, 'Initial version');
      
      if (versionResult.success) {
        // Update resume with current version
        await supabase
          .from('resumes')
          .update({ current_version_id: versionResult.version.id })
          .eq('id', data.id);
      }
      
      // Track event
      await this.trackEvent(userId, 'resume_created', { resume_id: data.id });
      
      return { success: true, resume: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async getUserResumes(userId) {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select(`
          *,
          current_version:resume_versions!current_version_id(*)
        `)
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      return { success: true, resumes: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async getResume(resumeId, userId) {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select(`
          *,
          current_version:resume_versions!current_version_id(*),
          template:resume_templates!template_key(*)
        `)
        .eq('id', resumeId)
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      
      return { success: true, resume: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async updateResume(resumeId, userId, updates) {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', resumeId)
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, resume: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async deleteResume(resumeId, userId) {
    try {
      const { error } = await supabase
        .from('resumes')
        .update({ is_active: false })
        .eq('id', resumeId)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      await this.trackEvent(userId, 'resume_deleted', { resume_id: resumeId });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // =============================================
  // Resume Versions
  // =============================================
  
  static async createResumeVersion(resumeId, data, notes = '') {
    try {
      // Validate resume data
      const validation = ResumeDataSchema.safeParse(data);
      if (!validation.success) {
        return { 
          success: false, 
          error: 'Invalid resume data', 
          details: validation.error.issues 
        };
      }
      
      // Get next version number
      const { data: versions } = await supabase
        .from('resume_versions')
        .select('version')
        .eq('resume_id', resumeId)
        .order('version', { ascending: false })
        .limit(1);
      
      const nextVersion = versions && versions.length > 0 ? versions[0].version + 1 : 1;
      
      // Calculate word count and page estimate
      const wordCount = this.calculateWordCount(data);
      const pageCount = Math.ceil(wordCount / 250); // Rough estimate
      
      const { data: versionData, error } = await supabase
        .from('resume_versions')
        .insert({
          resume_id: resumeId,
          version: nextVersion,
          data: validation.data,
          notes,
          word_count: wordCount,
          page_count: pageCount
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, version: versionData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async getResumeVersions(resumeId, userId) {
    try {
      const { data, error } = await supabase
        .from('resume_versions')
        .select('*')
        .eq('resume_id', resumeId)
        .order('version', { ascending: false });
      
      if (error) throw error;
      
      // Verify user owns the resume
      const { data: resume } = await supabase
        .from('resumes')
        .select('user_id')
        .eq('id', resumeId)
        .single();
      
      if (!resume || resume.user_id !== userId) {
        return { success: false, error: 'Unauthorized' };
      }
      
      return { success: true, versions: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // =============================================
  // AI Features
  // =============================================
  
  static async checkGrammar(text, userId) {
    try {
      // Check quota
      const canUse = await this.checkQuotaLimit(userId, 'ai_polish');
      if (!canUse) {
        return { 
          success: false, 
          error: 'Grammar check quota exceeded',
          code: 'QUOTA_EXCEEDED'
        };
      }
      
      // Call grammar check API (LanguageTool)
      const response = await fetch('/api/grammar/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ text })
      });
      
      if (!response.ok) {
        throw new Error('Grammar check failed');
      }
      
      const result = await response.json();
      
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async polishText(text, userId, resumeId, fieldPath, options = {}) {
    try {
      // Check quota
      const canUse = await this.checkQuotaLimit(userId, 'ai_polish');
      if (!canUse) {
        return { 
          success: false, 
          error: 'AI polish quota exceeded',
          code: 'QUOTA_EXCEEDED'
        };
      }
      
      // Limit text length (900 chars as per spec)
      if (text.length > 900) {
        return { 
          success: false, 
          error: 'Text too long (max 900 characters)' 
        };
      }
      
      // Call AI polish API
      const response = await fetch('/api/grammar/polish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ 
          text, 
          tone: options.tone || 'professional',
          style: options.style || 'concise'
        })
      });
      
      if (!response.ok) {
        throw new Error('AI polish failed');
      }
      
      const result = await response.json();
      
      // Increment quota
      await this.incrementQuotaUsage(userId, 'ai_polish');
      
      // Save to history
      await supabase.from('ai_polish_history').insert({
        user_id: userId,
        resume_id: resumeId,
        field_path: fieldPath,
        original_text: text,
        polished_text: result.improved,
        polish_type: options.tone || 'professional',
        tokens_used: result.tokens_used || 0,
        cost_cents: result.cost_cents || 0
      });
      
      await this.trackEvent(userId, 'ai_polish_used', { 
        resume_id: resumeId, 
        field_path: fieldPath 
      });
      
      return { success: true, improved: result.improved };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async analyzeJobDescription(resumeData, jdText, userId, resumeId) {
    try {
      // Check quota
      const canUse = await this.checkQuotaLimit(userId, 'jd_analysis');
      if (!canUse) {
        return { 
          success: false, 
          error: 'JD analysis quota exceeded',
          code: 'QUOTA_EXCEEDED'
        };
      }
      
      // Generate JD hash for caching
      const jdHash = await this.generateHash(jdText);
      
      // Check for cached analysis
      const { data: cached } = await supabase
        .from('jd_analyses')
        .select('*')
        .eq('jd_hash', jdHash)
        .eq('user_id', userId)
        .gte('expires_at', new Date().toISOString())
        .single();
      
      if (cached) {
        return { success: true, analysis: cached.analysis_result };
      }
      
      // Call JD analysis API
      const response = await fetch('/api/jd/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ resumeData, jd: jdText })
      });
      
      if (!response.ok) {
        throw new Error('JD analysis failed');
      }
      
      const analysis = await response.json();
      
      // Save analysis
      await supabase.from('jd_analyses').insert({
        user_id: userId,
        resume_id: resumeId,
        jd_text: jdText,
        jd_hash: jdHash,
        analysis_result: analysis
      });
      
      // Update resume with JD match data
      await supabase
        .from('resumes')
        .update({ 
          jd_match: analysis,
          ats_score: analysis.score 
        })
        .eq('id', resumeId);
      
      // Increment quota
      await this.incrementQuotaUsage(userId, 'jd_analysis');
      
      await this.trackEvent(userId, 'jd_analysis_used', { 
        resume_id: resumeId, 
        score: analysis.score 
      });
      
      return { success: true, analysis };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // =============================================
  // Templates & Export
  // =============================================
  
  static async getTemplates() {
    try {
      const { data, error } = await supabase
        .from('resume_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      
      return { success: true, templates: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  static async exportResume(resumeId, versionId, format, templateKey, userId) {
    try {
      // Check quota
      const canUse = await this.checkQuotaLimit(userId, 'exports');
      if (!canUse) {
        return { 
          success: false, 
          error: 'Export quota exceeded',
          code: 'QUOTA_EXCEEDED'
        };
      }
      
      // Call export API
      const response = await fetch(`/api/export/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ 
          resumeId, 
          versionId, 
          template: templateKey 
        })
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const result = await response.json();
      
      // Increment quota
      await this.incrementQuotaUsage(userId, 'exports');
      
      await this.trackEvent(userId, 'resume_exported', { 
        resume_id: resumeId, 
        format, 
        template: templateKey 
      });
      
      return { success: true, exportId: result.exportId, url: result.url };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // =============================================
  // Skill Suggestions
  // =============================================
  
  static async getSkillSuggestions(query = '', category = '') {
    try {
      let queryBuilder = supabase
        .from('skill_suggestions')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
      }
      
      if (category) {
        queryBuilder = queryBuilder.eq('category', category);
      }
      
      const { data, error } = await queryBuilder.limit(20);
      
      if (error) throw error;
      
      return { success: true, skills: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // =============================================
  // Utility Functions
  // =============================================
  
  static calculateWordCount(resumeData) {
    let wordCount = 0;
    
    // Count words in summary
    if (resumeData.summary) {
      wordCount += resumeData.summary.split(/\s+/).length;
    }
    
    // Count words in experience bullets
    if (resumeData.experience) {
      resumeData.experience.forEach(exp => {
        if (exp.bullets) {
          exp.bullets.forEach(bullet => {
            wordCount += bullet.split(/\s+/).length;
          });
        }
      });
    }
    
    // Count words in projects
    if (resumeData.projects) {
      resumeData.projects.forEach(project => {
        if (project.bullets) {
          project.bullets.forEach(bullet => {
            wordCount += bullet.split(/\s+/).length;
          });
        }
      });
    }
    
    return wordCount;
  }
  
  static async generateHash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  static async trackEvent(userId, event, meta = {}) {
    try {
      await supabase.from('tool_events').insert({
        user_id: userId,
        event,
        meta,
        session_id: this.getSessionId()
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
  
  static getSessionId() {
    // Simple session ID generation
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
  
  static normalizeDate(dateString) {
    // Convert date to MMM YYYY format
    const date = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                   'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  
  static sanitizeBulletPoint(bullet) {
    // Remove emojis and special characters that break ATS
    return bullet
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, '')
      .replace(/[^\w\s\-.,;:()\[\]"'%$&@]/g, '')
      .trim();
  }
  
  static validateBulletLength(bullet) {
    const words = bullet.split(/\s+/).length;
    return words >= 12 && words <= 24;
  }
  
  static deduplicateSkills(skills) {
    const seen = new Set();
    return skills.filter(skill => {
      const lower = skill.toLowerCase();
      if (seen.has(lower)) {
        return false;
      }
      seen.add(lower);
      return true;
    });
  }
  
  static getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return time.toLocaleDateString();
  }

  // =============================================
  // AI Polish & Enhancement Methods
  // =============================================

  static async polishContent(text, tone = 'professional') {
    try {
      const response = await fetch('/api/grammar/polish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          tone,
          style: 'concise'
        })
      });

      if (!response.ok) {
        throw new Error('AI polish request failed');
      }

      const result = await response.json();
      return {
        success: true,
        improved: result.improved || text
      };
    } catch (error) {
      console.error('AI Polish error:', error);
      return {
        success: false,
        error: error.message,
        improved: text // Return original text if AI fails
      };
    }
  }

  static async addMetrics(text) {
    try {
      // Enhanced prompt for adding metrics
      const enhancedText = await this.polishContent(
        `${text}\n\nPlease add specific metrics, percentages, and quantifiable achievements to make this more impactful.`,
        'professional'
      );

      return {
        success: true,
        improved: enhancedText.improved
      };
    } catch (error) {
      console.error('Add metrics error:', error);
      return {
        success: false,
        error: error.message,
        improved: text
      };
    }
  }

  static async addIndustryKeywords(text, headline = '') {
    try {
      // Enhanced prompt for industry keywords
      const enhancedText = await this.polishContent(
        `${text}\n\nPlease enhance this with relevant industry keywords and terminology that would improve ATS compatibility for ${headline || 'this role'}.`,
        'professional'
      );

      return {
        success: true,
        improved: enhancedText.improved
      };
    } catch (error) {
      console.error('Add keywords error:', error);
      return {
        success: false,
        error: error.message,
        improved: text
      };
    }
  }

  static async checkQuotaLimit(userId, feature = 'ai_polish') {
    try {
      const { data: quotas, error } = await supabase
        .from('usage_quotas')
        .select('*')
        .eq('user_id', userId)
        .eq('month_key', this.getCurrentMonthKey())
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!quotas) {
        // Create new quota record
        await supabase.from('usage_quotas').insert({
          user_id: userId,
          month_key: this.getCurrentMonthKey(),
          ai_polish_count: 0,
          exports_count: 0
        });
        return true;
      }

      // Check limits based on subscription
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', userId)
        .single();

      const plan = subscription?.plan || 'free';
      const limit = plan === 'pro' ? 50 : 3; // 3 for free, 50 for pro

      return quotas.ai_polish_count < limit;
    } catch (error) {
      console.error('Quota check error:', error);
      return false;
    }
  }

  static async incrementQuotaUsage(userId, feature = 'ai_polish') {
    try {
      await supabase.rpc('increment_quota_usage', {
        p_user_id: userId,
        p_feature: feature,
        p_month_key: this.getCurrentMonthKey()
      });
    } catch (error) {
      console.error('Quota increment error:', error);
    }
  }

  static getCurrentMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }
}

export default EnhancedResumeService;
