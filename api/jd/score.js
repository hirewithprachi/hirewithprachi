// Job Description Analysis API
// Analyzes resume vs job description for keyword matching and ATS scoring

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

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

    const { resumeData, jd } = req.body;

    if (!resumeData || !jd) {
      return res.status(400).json({ error: 'Resume data and job description are required' });
    }

    if (jd.length > 10000) {
      return res.status(400).json({ error: 'Job description too long (max 10,000 characters)' });
    }

    // Check quota
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: canUse } = await supabase.rpc('check_quota_limit', {
      user_uuid: user.id,
      quota_type: 'jd_analysis',
      current_month: currentMonth
    });

    if (!canUse) {
      return res.status(429).json({ 
        error: 'JD analysis quota exceeded',
        code: 'QUOTA_EXCEEDED'
      });
    }

    // Generate JD hash for caching
    const jdHash = crypto.createHash('sha256').update(jd).digest('hex');

    // Check for cached analysis
    const { data: cached } = await supabase
      .from('jd_analyses')
      .select('*')
      .eq('jd_hash', jdHash)
      .eq('user_id', user.id)
      .gte('expires_at', new Date().toISOString())
      .single();

    if (cached) {
      return res.status(200).json({
        success: true,
        analysis: cached.analysis_result,
        cached: true
      });
    }

    // Extract keywords from JD
    const jdKeywords = extractKeywords(jd);
    
    // Extract content from resume
    const resumeText = extractResumeText(resumeData);
    const resumeKeywords = extractKeywords(resumeText);

    // Calculate match score
    const analysis = calculateMatchScore(jdKeywords, resumeKeywords, resumeData, jd);

    // Save analysis to cache
    await supabase.from('jd_analyses').insert({
      user_id: user.id,
      jd_text: jd,
      jd_hash: jdHash,
      analysis_result: analysis
    });

    // Increment quota
    await supabase.rpc('increment_quota_usage', {
      user_uuid: user.id,
      quota_type: 'jd_analysis',
      current_month: currentMonth
    });

    // Track usage
    await supabase.from('tool_events').insert({
      user_id: user.id,
      event: 'jd_analysis_used',
      meta: {
        jd_length: jd.length,
        resume_sections: Object.keys(resumeData).length,
        match_score: analysis.score,
        api_endpoint: 'jd/score'
      }
    });

    return res.status(200).json({
      success: true,
      analysis,
      cached: false
    });

  } catch (error) {
    console.error('JD analysis error:', error);
    
    // Log error
    try {
      await supabase.from('tool_events').insert({
        user_id: user?.id || null,
        event: 'jd_analysis_error',
        meta: {
          error: error.message,
          api_endpoint: 'jd/score'
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return res.status(500).json({ 
      error: 'JD analysis failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Extract keywords from text using multiple techniques
function extractKeywords(text) {
  const cleaned = text.toLowerCase()
    .replace(/[^\w\s.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Technical skills patterns
  const techSkills = [
    'javascript', 'python', 'java', 'react', 'node.js', 'aws', 'docker', 'kubernetes',
    'typescript', 'vue.js', 'angular', 'express', 'mongodb', 'postgresql', 'mysql',
    'git', 'ci/cd', 'jenkins', 'terraform', 'linux', 'windows', 'macos',
    'html', 'css', 'sass', 'webpack', 'babel', 'rest api', 'graphql',
    'microservices', 'agile', 'scrum', 'jira', 'confluence', 'slack'
  ];

  // Soft skills patterns
  const softSkills = [
    'leadership', 'communication', 'teamwork', 'problem solving', 'analytical',
    'creative', 'adaptable', 'organized', 'detail oriented', 'time management',
    'collaboration', 'presentation', 'negotiation', 'mentoring', 'training'
  ];

  // Job titles and roles
  const roles = [
    'software engineer', 'developer', 'programmer', 'architect', 'manager',
    'director', 'senior', 'junior', 'lead', 'principal', 'staff', 'team lead',
    'product manager', 'project manager', 'business analyst', 'data scientist'
  ];

  // Education and certifications
  const education = [
    'bachelor', 'master', 'phd', 'degree', 'computer science', 'engineering',
    'aws certified', 'google cloud', 'microsoft azure', 'pmp', 'cissp'
  ];

  const keywords = new Map();

  // Extract all keyword categories
  const allPatterns = [...techSkills, ...softSkills, ...roles, ...education];
  
  allPatterns.forEach(pattern => {
    const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      keywords.set(pattern, {
        count: matches.length,
        category: techSkills.includes(pattern) ? 'technical' :
                 softSkills.includes(pattern) ? 'soft' :
                 roles.includes(pattern) ? 'role' : 'education',
        importance: calculateKeywordImportance(pattern, text)
      });
    }
  });

  // Extract important n-grams (2-3 word phrases)
  const words = cleaned.split(' ').filter(word => word.length > 2);
  
  // Bigrams
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (bigram.length > 5 && !keywords.has(bigram)) {
      keywords.set(bigram, {
        count: 1,
        category: 'phrase',
        importance: 0.5
      });
    }
  }

  // Trigrams (less weight)
  for (let i = 0; i < words.length - 2; i++) {
    const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    if (trigram.length > 8 && !keywords.has(trigram)) {
      keywords.set(trigram, {
        count: 1,
        category: 'phrase',
        importance: 0.3
      });
    }
  }

  return keywords;
}

// Calculate keyword importance based on context
function calculateKeywordImportance(keyword, text) {
  const lowerText = text.toLowerCase();
  let importance = 1;

  // Higher importance if in requirements section
  if (/requirements?|qualifications?|skills?|experience/i.test(lowerText)) {
    const reqSection = extractSection(text, /requirements?|qualifications?|skills?|experience/i);
    if (reqSection.includes(keyword)) {
      importance += 0.5;
    }
  }

  // Higher importance if marked as required
  const requiredPattern = new RegExp(`(required|must have|essential).*${keyword}|${keyword}.*(required|must have|essential)`, 'i');
  if (requiredPattern.test(lowerText)) {
    importance += 0.8;
  }

  // Higher importance if repeated
  const keywordCount = (lowerText.match(new RegExp(keyword, 'gi')) || []).length;
  importance += Math.min(keywordCount * 0.1, 0.5);

  return Math.min(importance, 2); // Cap at 2x importance
}

// Extract specific sections from text
function extractSection(text, sectionPattern) {
  const lines = text.split('\n');
  let inSection = false;
  let section = '';

  for (const line of lines) {
    if (sectionPattern.test(line)) {
      inSection = true;
    } else if (inSection && /^[A-Z][^a-z]*:/.test(line.trim())) {
      // New section started
      break;
    }

    if (inSection) {
      section += line + '\n';
    }
  }

  return section;
}

// Extract text content from resume data
function extractResumeText(resumeData) {
  let text = '';

  // Add summary
  if (resumeData.summary) {
    text += resumeData.summary + ' ';
  }

  // Add experience
  if (resumeData.experience) {
    resumeData.experience.forEach(exp => {
      text += `${exp.role} ${exp.company} `;
      if (exp.bullets) {
        exp.bullets.forEach(bullet => {
          text += bullet + ' ';
        });
      }
      if (exp.technologies) {
        text += exp.technologies.join(' ') + ' ';
      }
    });
  }

  // Add projects
  if (resumeData.projects) {
    resumeData.projects.forEach(project => {
      text += `${project.name} ${project.role || ''} `;
      if (project.bullets) {
        project.bullets.forEach(bullet => {
          text += bullet + ' ';
        });
      }
      if (project.technologies) {
        text += project.technologies.join(' ') + ' ';
      }
    });
  }

  // Add education
  if (resumeData.education) {
    resumeData.education.forEach(edu => {
      text += `${edu.degree} ${edu.school} ${edu.details || ''} `;
    });
  }

  // Add skills
  if (resumeData.skills) {
    if (resumeData.skills.core) text += resumeData.skills.core.join(' ') + ' ';
    if (resumeData.skills.tools) text += resumeData.skills.tools.join(' ') + ' ';
    if (resumeData.skills.soft) text += resumeData.skills.soft.join(' ') + ' ';
  }

  // Add extras
  if (resumeData.extras) {
    if (resumeData.extras.certifications) text += resumeData.extras.certifications.join(' ') + ' ';
    if (resumeData.extras.awards) text += resumeData.extras.awards.join(' ') + ' ';
    if (resumeData.extras.languages) text += resumeData.extras.languages.join(' ') + ' ';
  }

  return text;
}

// Calculate comprehensive match score
function calculateMatchScore(jdKeywords, resumeKeywords, resumeData, jd) {
  let totalScore = 0;
  let maxPossibleScore = 0;
  const matchedKeywords = [];
  const missingKeywords = [];
  const suggestions = [];

  // Convert maps to arrays for easier processing
  const jdKeywordArray = Array.from(jdKeywords.entries());
  const resumeKeywordArray = Array.from(resumeKeywords.entries());

  // Check each JD keyword against resume
  jdKeywordArray.forEach(([keyword, jdData]) => {
    const weight = jdData.importance;
    maxPossibleScore += weight * 10;

    const resumeMatch = resumeKeywords.get(keyword);
    if (resumeMatch) {
      const matchScore = Math.min(resumeMatch.count, jdData.count) * weight * 10;
      totalScore += matchScore;
      matchedKeywords.push({
        keyword,
        category: jdData.category,
        jdCount: jdData.count,
        resumeCount: resumeMatch.count,
        importance: jdData.importance,
        score: matchScore
      });
    } else {
      // Check for partial matches (synonyms, variations)
      const partialMatch = findPartialMatch(keyword, resumeKeywordArray);
      if (partialMatch) {
        const partialScore = partialMatch.score * weight * 5; // Half score for partial match
        totalScore += partialScore;
        matchedKeywords.push({
          keyword,
          matchedAs: partialMatch.keyword,
          category: jdData.category,
          jdCount: jdData.count,
          resumeCount: partialMatch.count,
          importance: jdData.importance,
          score: partialScore,
          partial: true
        });
      } else {
        missingKeywords.push({
          keyword,
          category: jdData.category,
          importance: jdData.importance,
          suggestions: generateKeywordSuggestions(keyword, jdData.category)
        });
      }
    }
  });

  // Calculate final score (0-100)
  const rawScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  
  // Apply bonuses and penalties
  let finalScore = rawScore;

  // Bonus for having relevant experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    finalScore += 5;
  }

  // Bonus for education match
  if (resumeData.education && resumeData.education.length > 0) {
    finalScore += 3;
  }

  // Penalty for missing critical keywords
  const criticalMissing = missingKeywords.filter(k => k.importance > 1.5).length;
  finalScore -= criticalMissing * 5;

  // Generate improvement suggestions
  suggestions.push(...generateImprovementSuggestions(missingKeywords, resumeData));

  // ATS-specific checks
  const atsScore = calculateATSScore(resumeData);

  return {
    score: Math.max(0, Math.min(100, Math.round(finalScore))),
    atsScore,
    keywordMatch: {
      total: jdKeywordArray.length,
      matched: matchedKeywords.length,
      missing: missingKeywords.length,
      percentage: Math.round((matchedKeywords.length / jdKeywordArray.length) * 100)
    },
    matchedKeywords: matchedKeywords.sort((a, b) => b.score - a.score).slice(0, 20),
    missingKeywords: missingKeywords.sort((a, b) => b.importance - a.importance).slice(0, 15),
    suggestions: suggestions.slice(0, 10),
    details: {
      totalPossibleScore: maxPossibleScore,
      earnedScore: totalScore,
      bonusApplied: finalScore - rawScore,
      criticalMissing
    }
  };
}

// Find partial keyword matches (synonyms, variations)
function findPartialMatch(keyword, resumeKeywords) {
  const synonyms = {
    'javascript': ['js', 'ecmascript'],
    'typescript': ['ts'],
    'python': ['py'],
    'docker': ['containerization'],
    'kubernetes': ['k8s'],
    'continuous integration': ['ci/cd', 'ci', 'cd'],
    'machine learning': ['ml', 'artificial intelligence', 'ai'],
    'user experience': ['ux'],
    'user interface': ['ui'],
    'database': ['db', 'sql'],
    'application programming interface': ['api'],
    'software development': ['development', 'programming']
  };

  // Check direct synonyms
  const keywordSynonyms = synonyms[keyword.toLowerCase()] || [];
  for (const [resumeKeyword, resumeData] of resumeKeywords) {
    if (keywordSynonyms.includes(resumeKeyword.toLowerCase())) {
      return {
        keyword: resumeKeyword,
        count: resumeData.count,
        score: 0.8 // 80% match for synonyms
      };
    }
  }

  // Check substring matches for longer phrases
  if (keyword.length > 6) {
    for (const [resumeKeyword, resumeData] of resumeKeywords) {
      if (resumeKeyword.includes(keyword) || keyword.includes(resumeKeyword)) {
        return {
          keyword: resumeKeyword,
          count: resumeData.count,
          score: 0.6 // 60% match for substrings
        };
      }
    }
  }

  return null;
}

// Generate keyword-specific suggestions
function generateKeywordSuggestions(keyword, category) {
  const suggestions = [];

  switch (category) {
    case 'technical':
      suggestions.push(`Add "${keyword}" to your skills section`);
      suggestions.push(`Mention "${keyword}" in relevant project descriptions`);
      break;
    case 'soft':
      suggestions.push(`Demonstrate "${keyword}" through specific examples in your experience`);
      break;
    case 'role':
      suggestions.push(`Include "${keyword}" in your headline or summary if applicable`);
      break;
    case 'education':
      suggestions.push(`Add "${keyword}" to your education or certifications section`);
      break;
    default:
      suggestions.push(`Consider including "${keyword}" where relevant`);
  }

  return suggestions;
}

// Generate comprehensive improvement suggestions
function generateImprovementSuggestions(missingKeywords, resumeData) {
  const suggestions = [];

  // Group missing keywords by category
  const byCategory = missingKeywords.reduce((acc, keyword) => {
    if (!acc[keyword.category]) acc[keyword.category] = [];
    acc[keyword.category].push(keyword);
    return acc;
  }, {});

  // Technical skills suggestions
  if (byCategory.technical) {
    const topTechnical = byCategory.technical.slice(0, 5);
    suggestions.push({
      type: 'skills',
      title: 'Add Missing Technical Skills',
      description: `Consider adding these technical skills: ${topTechnical.map(k => k.keyword).join(', ')}`,
      priority: 'high',
      keywords: topTechnical.map(k => k.keyword)
    });
  }

  // Experience improvements
  if (byCategory.role || byCategory.phrase) {
    suggestions.push({
      type: 'experience',
      title: 'Strengthen Experience Descriptions',
      description: 'Use more specific role-related terminology in your experience bullets',
      priority: 'medium',
      keywords: [...(byCategory.role || []), ...(byCategory.phrase || [])].slice(0, 3).map(k => k.keyword)
    });
  }

  // Soft skills suggestions
  if (byCategory.soft) {
    suggestions.push({
      type: 'soft_skills',
      title: 'Highlight Soft Skills',
      description: `Demonstrate these soft skills through examples: ${byCategory.soft.slice(0, 3).map(k => k.keyword).join(', ')}`,
      priority: 'medium',
      keywords: byCategory.soft.slice(0, 3).map(k => k.keyword)
    });
  }

  // Education/certification suggestions
  if (byCategory.education) {
    suggestions.push({
      type: 'education',
      title: 'Add Relevant Qualifications',
      description: `Consider adding these qualifications: ${byCategory.education.slice(0, 3).map(k => k.keyword).join(', ')}`,
      priority: 'low',
      keywords: byCategory.education.slice(0, 3).map(k => k.keyword)
    });
  }

  return suggestions;
}

// Calculate ATS compatibility score
function calculateATSScore(resumeData) {
  let score = 100;
  const issues = [];

  // Check for ATS-friendly formatting
  if (resumeData.experience) {
    resumeData.experience.forEach((exp, index) => {
      // Check date format
      if (exp.start && !exp.start.match(/^[A-Z]{3} \d{4}$/)) {
        score -= 5;
        issues.push(`Experience #${index + 1}: Use "MMM YYYY" date format`);
      }

      // Check for bullet points
      if (!exp.bullets || exp.bullets.length < 2) {
        score -= 5;
        issues.push(`Experience #${index + 1}: Add at least 2 achievement bullets`);
      }

      // Check bullet length
      if (exp.bullets) {
        exp.bullets.forEach((bullet, bulletIndex) => {
          const wordCount = bullet.split(' ').length;
          if (wordCount < 12 || wordCount > 25) {
            score -= 2;
            issues.push(`Experience #${index + 1}, Bullet #${bulletIndex + 1}: Optimize length (12-25 words)`);
          }
        });
      }
    });
  }

  // Check skills formatting
  if (resumeData.skills) {
    if (!resumeData.skills.core || resumeData.skills.core.length < 5) {
      score -= 10;
      issues.push('Add at least 5 core technical skills');
    }
  }

  // Check contact information
  if (resumeData.profile) {
    if (!resumeData.profile.email || !resumeData.profile.email.includes('@')) {
      score -= 15;
      issues.push('Add valid email address');
    }
    if (!resumeData.profile.location) {
      score -= 5;
      issues.push('Add location information');
    }
  }

  return {
    score: Math.max(0, score),
    issues: issues.slice(0, 10) // Limit to top 10 issues
  };
}
