// Industry-Specific Template Service
// Provides templates optimized for different industries and roles

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export class IndustryTemplateService {
  
  // =============================================
  // Industry Template Definitions
  // =============================================
  
  static INDUSTRY_TEMPLATES = {
    technology: {
      name: 'Technology & Software',
      templates: [
        {
          key: 'tech_modern',
          name: 'Tech Professional',
          description: 'Modern template for software engineers and tech professionals',
          features: ['Technical skills emphasis', 'Project portfolio', 'GitHub integration'],
          sections: ['profile', 'summary', 'skills', 'experience', 'projects', 'education'],
          skillCategories: ['Programming Languages', 'Frameworks', 'Tools & Technologies', 'Soft Skills'],
          isPremium: false
        },
        {
          key: 'tech_senior',
          name: 'Senior Tech Lead',
          description: 'Executive template for senior engineers and tech leads',
          features: ['Leadership focus', 'Team management', 'Architecture decisions'],
          sections: ['profile', 'summary', 'experience', 'leadership', 'skills', 'education'],
          skillCategories: ['Technical Leadership', 'Architecture', 'Team Management', 'Technologies'],
          isPremium: true
        },
        {
          key: 'tech_startup',
          name: 'Startup Engineer',
          description: 'Dynamic template for startup environments',
          features: ['Versatility emphasis', 'Impact metrics', 'Growth orientation'],
          sections: ['profile', 'summary', 'experience', 'projects', 'skills', 'achievements'],
          skillCategories: ['Full Stack', 'DevOps', 'Product', 'Soft Skills'],
          isPremium: true
        }
      ]
    },
    
    healthcare: {
      name: 'Healthcare & Medical',
      templates: [
        {
          key: 'healthcare_clinical',
          name: 'Clinical Professional',
          description: 'Template for doctors, nurses, and clinical staff',
          features: ['Certifications focus', 'Patient care experience', 'Clinical skills'],
          sections: ['profile', 'summary', 'experience', 'education', 'certifications', 'skills'],
          skillCategories: ['Clinical Skills', 'Patient Care', 'Medical Technologies', 'Soft Skills'],
          isPremium: false
        },
        {
          key: 'healthcare_research',
          name: 'Medical Research',
          description: 'Template for medical researchers and academics',
          features: ['Publications emphasis', 'Research experience', 'Academic credentials'],
          sections: ['profile', 'summary', 'education', 'research', 'publications', 'experience'],
          skillCategories: ['Research Methods', 'Laboratory Skills', 'Data Analysis', 'Communication'],
          isPremium: true
        }
      ]
    },
    
    finance: {
      name: 'Finance & Banking',
      templates: [
        {
          key: 'finance_analyst',
          name: 'Financial Analyst',
          description: 'Template for financial analysts and advisors',
          features: ['Quantitative skills', 'Financial modeling', 'Compliance knowledge'],
          sections: ['profile', 'summary', 'experience', 'skills', 'certifications', 'education'],
          skillCategories: ['Financial Analysis', 'Modeling Tools', 'Regulations', 'Soft Skills'],
          isPremium: false
        },
        {
          key: 'finance_executive',
          name: 'Finance Executive',
          description: 'Executive template for CFOs and finance leaders',
          features: ['Strategic leadership', 'P&L responsibility', 'Board experience'],
          sections: ['profile', 'summary', 'experience', 'leadership', 'education', 'board'],
          skillCategories: ['Strategic Planning', 'Financial Leadership', 'Risk Management', 'Governance'],
          isPremium: true
        }
      ]
    },
    
    marketing: {
      name: 'Marketing & Sales',
      templates: [
        {
          key: 'marketing_digital',
          name: 'Digital Marketing',
          description: 'Template for digital marketers and growth professionals',
          features: ['Campaign metrics', 'Digital channels', 'Growth achievements'],
          sections: ['profile', 'summary', 'experience', 'campaigns', 'skills', 'education'],
          skillCategories: ['Digital Marketing', 'Analytics Tools', 'Creative Skills', 'Strategy'],
          isPremium: false
        },
        {
          key: 'marketing_creative',
          name: 'Creative Marketing',
          description: 'Template for creative professionals and brand managers',
          features: ['Portfolio showcase', 'Brand experience', 'Creative achievements'],
          sections: ['profile', 'summary', 'experience', 'portfolio', 'skills', 'awards'],
          skillCategories: ['Creative Tools', 'Brand Strategy', 'Design Skills', 'Communication'],
          isPremium: true
        }
      ]
    },
    
    education: {
      name: 'Education & Training',
      templates: [
        {
          key: 'education_teacher',
          name: 'Educator',
          description: 'Template for teachers and educational professionals',
          features: ['Teaching experience', 'Student outcomes', 'Curriculum development'],
          sections: ['profile', 'summary', 'experience', 'education', 'certifications', 'achievements'],
          skillCategories: ['Teaching Methods', 'Curriculum Design', 'Technology Integration', 'Leadership'],
          isPremium: false
        },
        {
          key: 'education_admin',
          name: 'Education Administrator',
          description: 'Template for principals and education leaders',
          features: ['Leadership experience', 'Institutional outcomes', 'Policy development'],
          sections: ['profile', 'summary', 'experience', 'leadership', 'education', 'achievements'],
          skillCategories: ['Educational Leadership', 'Policy Development', 'Budget Management', 'Community Relations'],
          isPremium: true
        }
      ]
    },
    
    consulting: {
      name: 'Consulting & Strategy',
      templates: [
        {
          key: 'consulting_analyst',
          name: 'Management Consultant',
          description: 'Template for consultants and analysts',
          features: ['Client impact', 'Problem solving', 'Industry expertise'],
          sections: ['profile', 'summary', 'experience', 'projects', 'skills', 'education'],
          skillCategories: ['Analytical Skills', 'Industry Knowledge', 'Client Management', 'Communication'],
          isPremium: false
        },
        {
          key: 'consulting_partner',
          name: 'Consulting Partner',
          description: 'Executive template for senior consultants and partners',
          features: ['Client relationships', 'Business development', 'Thought leadership'],
          sections: ['profile', 'summary', 'experience', 'leadership', 'business_dev', 'education'],
          skillCategories: ['Strategic Consulting', 'Business Development', 'Thought Leadership', 'Client Relations'],
          isPremium: true
        }
      ]
    }
  };

  // =============================================
  // Template Selection and Customization
  // =============================================
  
  static async getIndustryTemplates(industry = null) {
    try {
      if (industry && this.INDUSTRY_TEMPLATES[industry]) {
        return {
          success: true,
          industry: this.INDUSTRY_TEMPLATES[industry],
          templates: this.INDUSTRY_TEMPLATES[industry].templates
        };
      }
      
      // Return all industries
      return {
        success: true,
        industries: Object.keys(this.INDUSTRY_TEMPLATES).map(key => ({
          key,
          ...this.INDUSTRY_TEMPLATES[key],
          templateCount: this.INDUSTRY_TEMPLATES[key].templates.length,
          freeTemplateCount: this.INDUSTRY_TEMPLATES[key].templates.filter(t => !t.isPremium).length
        }))
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getTemplateById(templateKey) {
    try {
      for (const industry of Object.values(this.INDUSTRY_TEMPLATES)) {
        const template = industry.templates.find(t => t.key === templateKey);
        if (template) {
          return {
            success: true,
            template: {
              ...template,
              industry: industry.name,
              customizations: this.getTemplateCustomizations(templateKey)
            }
          };
        }
      }
      
      return {
        success: false,
        error: 'Template not found'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static getTemplateCustomizations(templateKey) {
    const customizations = {
      tech_modern: {
        colorScheme: { primary: '#0066CC', secondary: '#004499', accent: '#00AA44' },
        fonts: { heading: 'Inter', body: 'Inter' },
        layout: 'two-column',
        emphasis: ['skills', 'projects'],
        skillFormat: 'badges',
        projectFormat: 'detailed'
      },
      
      tech_senior: {
        colorScheme: { primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460' },
        fonts: { heading: 'Merriweather', body: 'Open Sans' },
        layout: 'single-column',
        emphasis: ['experience', 'leadership'],
        skillFormat: 'categories',
        experienceFormat: 'achievement-focused'
      },
      
      healthcare_clinical: {
        colorScheme: { primary: '#2e7d32', secondary: '#1b5e20', accent: '#43a047' },
        fonts: { heading: 'Roboto', body: 'Roboto' },
        layout: 'traditional',
        emphasis: ['certifications', 'experience'],
        certificationFormat: 'prominent',
        experienceFormat: 'patient-outcomes'
      },
      
      finance_analyst: {
        colorScheme: { primary: '#1565c0', secondary: '#0d47a1', accent: '#1976d2' },
        fonts: { heading: 'Roboto Slab', body: 'Source Sans Pro' },
        layout: 'professional',
        emphasis: ['experience', 'skills'],
        skillFormat: 'technical-focus',
        experienceFormat: 'quantified-results'
      },
      
      marketing_creative: {
        colorScheme: { primary: '#7b1fa2', secondary: '#4a148c', accent: '#9c27b0' },
        fonts: { heading: 'Montserrat', body: 'Lato' },
        layout: 'creative',
        emphasis: ['portfolio', 'experience'],
        portfolioFormat: 'visual',
        experienceFormat: 'creative-impact'
      }
    };

    return customizations[templateKey] || customizations.tech_modern;
  }

  // =============================================
  // Smart Template Recommendation
  // =============================================
  
  static async recommendTemplate(resumeData, userProfile = {}) {
    try {
      const recommendations = [];
      
      // Analyze resume content for industry indicators
      const industrySignals = this.analyzeIndustrySignals(resumeData);
      
      // Analyze experience level
      const experienceLevel = this.analyzeExperienceLevel(resumeData);
      
      // Get role-specific recommendations
      const roleRecommendations = this.getRoleRecommendations(resumeData, industrySignals);
      
      // Score and rank templates
      for (const [industryKey, industry] of Object.entries(this.INDUSTRY_TEMPLATES)) {
        for (const template of industry.templates) {
          const score = this.calculateTemplateScore(
            template, 
            industrySignals, 
            experienceLevel, 
            resumeData
          );
          
          if (score > 0.3) { // Minimum relevance threshold
            recommendations.push({
              template,
              industry: industry.name,
              industryKey,
              score,
              reasoning: this.generateRecommendationReasoning(template, industrySignals, experienceLevel)
            });
          }
        }
      }
      
      // Sort by score and return top recommendations
      recommendations.sort((a, b) => b.score - a.score);
      
      return {
        success: true,
        recommendations: recommendations.slice(0, 6),
        industrySignals,
        experienceLevel
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static analyzeIndustrySignals(resumeData) {
    const signals = {
      technology: 0,
      healthcare: 0,
      finance: 0,
      marketing: 0,
      education: 0,
      consulting: 0
    };

    const text = JSON.stringify(resumeData).toLowerCase();
    
    // Technology indicators
    const techKeywords = ['software', 'developer', 'engineer', 'programming', 'coding', 'javascript', 'python', 'react', 'node', 'api', 'database', 'cloud', 'devops', 'agile', 'scrum'];
    signals.technology = this.countKeywords(text, techKeywords) / techKeywords.length;
    
    // Healthcare indicators
    const healthKeywords = ['medical', 'patient', 'clinical', 'hospital', 'healthcare', 'nurse', 'doctor', 'physician', 'treatment', 'diagnosis', 'surgery', 'therapy'];
    signals.healthcare = this.countKeywords(text, healthKeywords) / healthKeywords.length;
    
    // Finance indicators
    const financeKeywords = ['financial', 'banking', 'investment', 'portfolio', 'accounting', 'audit', 'risk', 'compliance', 'trading', 'analyst', 'budget', 'revenue'];
    signals.finance = this.countKeywords(text, financeKeywords) / financeKeywords.length;
    
    // Marketing indicators
    const marketingKeywords = ['marketing', 'campaign', 'brand', 'advertising', 'digital', 'social media', 'seo', 'content', 'analytics', 'growth', 'acquisition', 'conversion'];
    signals.marketing = this.countKeywords(text, marketingKeywords) / marketingKeywords.length;
    
    // Education indicators
    const educationKeywords = ['teacher', 'education', 'student', 'curriculum', 'classroom', 'instruction', 'learning', 'academic', 'school', 'university', 'training'];
    signals.education = this.countKeywords(text, educationKeywords) / educationKeywords.length;
    
    // Consulting indicators
    const consultingKeywords = ['consulting', 'strategy', 'client', 'advisory', 'analysis', 'recommendation', 'implementation', 'optimization', 'transformation', 'process improvement'];
    signals.consulting = this.countKeywords(text, consultingKeywords) / consultingKeywords.length;

    return signals;
  }

  static analyzeExperienceLevel(resumeData) {
    const experience = resumeData.experience || [];
    
    let totalYears = 0;
    let seniorIndicators = 0;
    let leadershipIndicators = 0;
    
    experience.forEach(exp => {
      // Calculate years of experience
      if (exp.start && exp.end) {
        const years = this.calculateYearsBetween(exp.start, exp.end);
        totalYears += years;
      }
      
      // Check for senior/leadership roles
      const roleText = (exp.role || '').toLowerCase();
      if (roleText.includes('senior') || roleText.includes('lead') || roleText.includes('principal')) {
        seniorIndicators++;
      }
      
      if (roleText.includes('manager') || roleText.includes('director') || roleText.includes('head') || roleText.includes('vp')) {
        leadershipIndicators++;
      }
    });

    return {
      totalYears,
      level: totalYears < 3 ? 'junior' : totalYears < 7 ? 'mid' : 'senior',
      hasLeadership: leadershipIndicators > 0,
      hasSeniorRoles: seniorIndicators > 0,
      experienceCount: experience.length
    };
  }

  static calculateTemplateScore(template, industrySignals, experienceLevel, resumeData) {
    let score = 0;
    
    // Industry match
    const templateIndustry = this.getTemplateIndustry(template.key);
    if (templateIndustry && industrySignals[templateIndustry]) {
      score += industrySignals[templateIndustry] * 0.4;
    }
    
    // Experience level match
    const isExecutiveTemplate = template.key.includes('senior') || template.key.includes('executive') || template.key.includes('partner');
    const isJuniorTemplate = template.key.includes('analyst') || !isExecutiveTemplate;
    
    if (experienceLevel.level === 'senior' && isExecutiveTemplate) {
      score += 0.3;
    } else if (experienceLevel.level === 'junior' && isJuniorTemplate) {
      score += 0.2;
    } else if (experienceLevel.level === 'mid') {
      score += 0.15;
    }
    
    // Leadership match
    if (experienceLevel.hasLeadership && isExecutiveTemplate) {
      score += 0.2;
    }
    
    // Section alignment
    const resumeSections = Object.keys(resumeData).filter(key => 
      resumeData[key] && (Array.isArray(resumeData[key]) ? resumeData[key].length > 0 : true)
    );
    
    const sectionMatch = template.sections.filter(section => resumeSections.includes(section)).length / template.sections.length;
    score += sectionMatch * 0.1;
    
    return Math.min(score, 1); // Cap at 1.0
  }

  static getTemplateIndustry(templateKey) {
    for (const [industryKey, industry] of Object.entries(this.INDUSTRY_TEMPLATES)) {
      if (industry.templates.some(t => t.key === templateKey)) {
        return industryKey;
      }
    }
    return null;
  }

  static generateRecommendationReasoning(template, industrySignals, experienceLevel) {
    const reasons = [];
    
    const templateIndustry = this.getTemplateIndustry(template.key);
    if (templateIndustry && industrySignals[templateIndustry] > 0.3) {
      reasons.push(`Strong match for ${templateIndustry} industry`);
    }
    
    if (experienceLevel.level === 'senior' && template.key.includes('senior')) {
      reasons.push('Suitable for senior-level professionals');
    }
    
    if (experienceLevel.hasLeadership && template.features.some(f => f.toLowerCase().includes('leadership'))) {
      reasons.push('Emphasizes leadership experience');
    }
    
    if (template.features.length > 0) {
      reasons.push(`Features: ${template.features.slice(0, 2).join(', ')}`);
    }
    
    return reasons.length > 0 ? reasons.join(' • ') : 'Good general template for your profile';
  }

  // =============================================
  // Helper Functions
  // =============================================
  
  static countKeywords(text, keywords) {
    return keywords.reduce((count, keyword) => {
      return count + (text.includes(keyword) ? 1 : 0);
    }, 0);
  }

  static calculateYearsBetween(start, end) {
    try {
      const startYear = parseInt(start.split(' ')[1] || start);
      const endYear = end === 'Present' ? new Date().getFullYear() : parseInt(end.split(' ')[1] || end);
      return Math.max(0, endYear - startYear);
    } catch {
      return 1; // Default to 1 year if parsing fails
    }
  }

  // =============================================
  // Template Content Generation
  // =============================================
  
  static async generateIndustrySpecificContent(templateKey, resumeData) {
    try {
      const template = await this.getTemplateById(templateKey);
      if (!template.success) {
        throw new Error('Template not found');
      }

      const industryContent = {
        skillCategories: this.generateSkillCategories(templateKey, resumeData),
        sectionPriority: template.template.sections,
        contentSuggestions: this.generateContentSuggestions(templateKey, resumeData),
        industryKeywords: this.getIndustryKeywords(templateKey)
      };

      return {
        success: true,
        content: industryContent
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static generateSkillCategories(templateKey, resumeData) {
    const template = Object.values(this.INDUSTRY_TEMPLATES)
      .flatMap(industry => industry.templates)
      .find(t => t.key === templateKey);

    if (!template) return ['Technical Skills', 'Soft Skills'];

    return template.skillCategories || ['Core Skills', 'Technical Skills', 'Soft Skills'];
  }

  static generateContentSuggestions(templateKey, resumeData) {
    const suggestions = [];
    
    if (templateKey.startsWith('tech_')) {
      suggestions.push('Include specific technologies and programming languages');
      suggestions.push('Quantify your impact with metrics (performance improvements, user growth)');
      suggestions.push('Mention relevant projects and contributions to open source');
    } else if (templateKey.startsWith('healthcare_')) {
      suggestions.push('Highlight patient outcomes and quality improvements');
      suggestions.push('Include relevant certifications and continuing education');
      suggestions.push('Mention compliance and safety record');
    } else if (templateKey.startsWith('finance_')) {
      suggestions.push('Quantify financial impact and cost savings');
      suggestions.push('Include relevant financial certifications (CPA, CFA, etc.)');
      suggestions.push('Highlight risk management and compliance experience');
    }
    
    return suggestions;
  }

  static getIndustryKeywords(templateKey) {
    const keywordMap = {
      tech_: ['agile', 'scrum', 'ci/cd', 'microservices', 'cloud', 'api', 'scalability', 'performance'],
      healthcare_: ['patient care', 'clinical excellence', 'evidence-based', 'quality improvement', 'compliance'],
      finance_: ['risk management', 'financial modeling', 'compliance', 'due diligence', 'portfolio management'],
      marketing_: ['roi', 'conversion rate', 'brand awareness', 'customer acquisition', 'analytics'],
      education_: ['student outcomes', 'curriculum development', 'differentiated instruction', 'assessment'],
      consulting_: ['client satisfaction', 'process improvement', 'strategic planning', 'change management']
    };

    for (const [prefix, keywords] of Object.entries(keywordMap)) {
      if (templateKey.startsWith(prefix)) {
        return keywords;
      }
    }

    return [];
  }

  // =============================================
  // Analytics and Tracking
  // =============================================
  
  static async trackTemplateUsage(templateKey, userId, metadata = {}) {
    try {
      await supabase.from('tool_events').insert({
        user_id: userId,
        event: 'industry_template_used',
        meta: {
          template_key: templateKey,
          industry: this.getTemplateIndustry(templateKey),
          ...metadata
        }
      });
    } catch (error) {
      console.error('Error tracking template usage:', error);
    }
  }

  static async getTemplateAnalytics(templateKey = null) {
    try {
      let query = supabase
        .from('tool_events')
        .select('meta, created_at')
        .eq('event', 'industry_template_used');

      if (templateKey) {
        query = query.eq('meta->template_key', templateKey);
      }

      const { data, error } = await query
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        analytics: this.processTemplateAnalytics(data)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static processTemplateAnalytics(data) {
    const analytics = {
      totalUsage: data.length,
      byTemplate: {},
      byIndustry: {},
      trending: []
    };

    data.forEach(event => {
      const templateKey = event.meta?.template_key;
      const industry = event.meta?.industry;

      if (templateKey) {
        analytics.byTemplate[templateKey] = (analytics.byTemplate[templateKey] || 0) + 1;
      }

      if (industry) {
        analytics.byIndustry[industry] = (analytics.byIndustry[industry] || 0) + 1;
      }
    });

    // Calculate trending templates (simplified)
    analytics.trending = Object.entries(analytics.byTemplate)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([template, count]) => ({ template, count }));

    return analytics;
  }
}

export default IndustryTemplateService;
