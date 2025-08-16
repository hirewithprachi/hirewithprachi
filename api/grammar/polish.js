// AI Polish API - OpenAI GPT-4o-mini Integration
// Vercel Edge Function for AI-powered content improvement

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a resume writing assistant. Improve grammar, clarity, and professional tone. Keep content concise, ATS-friendly, first-person implied, no fluff, convert responsibilities into quantified achievements when possible. Preserve factual accuracy. Output ONLY the improved text.`;

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

    const { text, tone = 'professional', style = 'concise' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > 900) {
      return res.status(400).json({ error: 'Text too long (max 900 characters)' });
    }

    // Check quota before proceeding
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: canUse } = await supabase.rpc('check_quota_limit', {
      user_uuid: user.id,
      quota_type: 'ai_polish',
      current_month: currentMonth
    });

    if (!canUse) {
      return res.status(429).json({ 
        error: 'AI polish quota exceeded',
        code: 'QUOTA_EXCEEDED'
      });
    }

    // Enhanced system prompt based on tone and style
    let enhancedPrompt = SYSTEM_PROMPT;
    
    if (tone === 'creative') {
      enhancedPrompt += ' Use dynamic action verbs and industry-specific terminology.';
    } else if (tone === 'executive') {
      enhancedPrompt += ' Focus on leadership impact and strategic outcomes.';
    }

    if (style === 'detailed') {
      enhancedPrompt += ' Provide comprehensive details while maintaining clarity.';
    } else if (style === 'concise') {
      enhancedPrompt += ' Be extremely concise and impactful.';
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: enhancedPrompt },
        { role: 'user', content: `Improve this resume text: "${text}"` }
      ],
      max_tokens: Math.min(300, Math.ceil(text.length * 1.5)),
      temperature: 0.3,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const improvedText = completion.choices[0]?.message?.content?.trim();
    
    if (!improvedText) {
      throw new Error('No improvement generated');
    }

    // Calculate costs (approximate)
    const inputTokens = Math.ceil(text.length / 4); // Rough estimate
    const outputTokens = Math.ceil(improvedText.length / 4);
    const totalTokens = inputTokens + outputTokens;
    
    // GPT-4o-mini pricing: $0.00015/1K input tokens, $0.0006/1K output tokens
    const costCents = Math.ceil(
      (inputTokens * 0.00015 / 1000) * 100 + 
      (outputTokens * 0.0006 / 1000) * 100
    );

    // Increment quota usage
    await supabase.rpc('increment_quota_usage', {
      user_uuid: user.id,
      quota_type: 'ai_polish',
      current_month: currentMonth
    });

    // Track usage analytics
    await supabase.from('tool_events').insert({
      user_id: user.id,
      event: 'ai_polish_used',
      meta: {
        original_length: text.length,
        improved_length: improvedText.length,
        tone,
        style,
        tokens_used: totalTokens,
        cost_cents: costCents,
        api_endpoint: 'grammar/polish'
      }
    });

    // Quality checks
    const qualityScore = calculateQualityScore(text, improvedText);
    
    return res.status(200).json({
      success: true,
      improved: improvedText,
      original: text,
      stats: {
        originalLength: text.length,
        improvedLength: improvedText.length,
        tokensUsed: totalTokens,
        costCents,
        qualityScore,
        tone,
        style
      },
      suggestions: generateSuggestions(text, improvedText)
    });

  } catch (error) {
    console.error('AI polish error:', error);
    
    // Log error for monitoring
    try {
      await supabase.from('tool_events').insert({
        user_id: user?.id || null,
        event: 'ai_polish_error',
        meta: {
          error: error.message,
          api_endpoint: 'grammar/polish'
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable',
        code: 'SERVICE_UNAVAILABLE'
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: 'AI service rate limit exceeded',
        code: 'RATE_LIMITED'
      });
    }

    return res.status(500).json({ 
      error: 'AI polish failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Helper function to calculate improvement quality score
function calculateQualityScore(original, improved) {
  let score = 0;
  
  // Check for action verbs improvement
  const actionVerbs = ['led', 'managed', 'developed', 'implemented', 'achieved', 'increased', 'reduced', 'optimized'];
  const improvedActionVerbs = actionVerbs.filter(verb => 
    improved.toLowerCase().includes(verb) && !original.toLowerCase().includes(verb)
  );
  score += improvedActionVerbs.length * 10;
  
  // Check for quantified achievements
  const numberPattern = /\d+%|\d+\+|\$\d+|\d+ [a-zA-Z]+/g;
  const originalNumbers = (original.match(numberPattern) || []).length;
  const improvedNumbers = (improved.match(numberPattern) || []).length;
  score += Math.max(0, improvedNumbers - originalNumbers) * 15;
  
  // Check for professional tone improvements
  const weakWords = ['responsible for', 'helped', 'assisted', 'worked on'];
  const weakWordsRemoved = weakWords.filter(word => 
    original.toLowerCase().includes(word) && !improved.toLowerCase().includes(word)
  );
  score += weakWordsRemoved.length * 5;
  
  // Length optimization (prefer conciseness)
  if (improved.length < original.length && improved.length > original.length * 0.8) {
    score += 10;
  }
  
  return Math.min(100, Math.max(0, score));
}

// Helper function to generate improvement suggestions
function generateSuggestions(original, improved) {
  const suggestions = [];
  
  // Analyze what was improved
  if (improved.length < original.length) {
    suggestions.push('Text was made more concise');
  }
  
  if (/\d+%/.test(improved) && !/\d+%/.test(original)) {
    suggestions.push('Added quantified achievements');
  }
  
  const actionVerbsAdded = ['led', 'managed', 'developed', 'implemented'].some(verb => 
    improved.toLowerCase().includes(verb) && !original.toLowerCase().includes(verb)
  );
  
  if (actionVerbsAdded) {
    suggestions.push('Used stronger action verbs');
  }
  
  if (!/responsible for|helped with/.test(improved) && /responsible for|helped with/.test(original)) {
    suggestions.push('Removed weak phrases');
  }
  
  return suggestions;
}
