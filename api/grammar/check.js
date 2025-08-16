// Grammar Check API - LanguageTool Proxy
// Vercel Edge Function for grammar checking with self-hosted LanguageTool

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ error: 'Text too long (max 5000 characters)' });
    }

    // Call LanguageTool API
    const ltApiUrl = process.env.LT_API_BASE_URL || 'http://localhost:8010';
    
    const response = await fetch(`${ltApiUrl}/v2/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        language: 'en-US',
        enabledOnly: 'false'
      })
    });

    if (!response.ok) {
      throw new Error(`LanguageTool API error: ${response.status}`);
    }

    const result = await response.json();

    // Process and format the results for frontend
    const formattedIssues = result.matches?.map(match => ({
      offset: match.offset,
      length: match.length,
      message: match.message,
      shortMessage: match.shortMessage,
      rule: match.rule?.id,
      category: match.rule?.category?.id,
      replacements: match.replacements?.slice(0, 3).map(r => r.value) || [],
      confidence: match.rule?.confidence || 0
    })) || [];

    // Auto-fix common issues
    let fixedText = text;
    formattedIssues
      .filter(issue => issue.confidence > 0.8 && issue.replacements.length > 0)
      .reverse() // Apply fixes from end to start to maintain offsets
      .forEach(issue => {
        const before = fixedText.substring(0, issue.offset);
        const after = fixedText.substring(issue.offset + issue.length);
        fixedText = before + issue.replacements[0] + after;
      });

    // Track usage for analytics
    await supabase.from('tool_events').insert({
      user_id: user.id,
      event: 'grammar_check_used',
      meta: {
        text_length: text.length,
        issues_found: formattedIssues.length,
        api_endpoint: 'grammar/check'
      }
    });

    return res.status(200).json({
      success: true,
      issues: formattedIssues,
      fixed: fixedText !== text ? fixedText : null,
      stats: {
        issuesFound: formattedIssues.length,
        autoFixed: fixedText !== text ? formattedIssues.filter(i => i.confidence > 0.8).length : 0,
        textLength: text.length
      }
    });

  } catch (error) {
    console.error('Grammar check error:', error);
    
    // Log error for monitoring
    try {
      await supabase.from('tool_events').insert({
        user_id: user?.id || null,
        event: 'grammar_check_error',
        meta: {
          error: error.message,
          api_endpoint: 'grammar/check'
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return res.status(500).json({ 
      error: 'Grammar check failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
