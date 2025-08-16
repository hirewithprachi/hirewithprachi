// A/B Testing and Conversion Optimization Service
// Advanced experimentation framework for Resume Builder

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// =============================================
// A/B Testing Configuration
// =============================================

const AB_TESTS = {
  // Resume Builder Flow Optimization
  'resume_builder_flow': {
    name: 'Resume Builder Step Flow',
    description: 'Test different step sequences and UI layouts',
    status: 'active',
    variants: {
      'control': {
        name: 'Original 7-Step Flow',
        weight: 50,
        config: {
          stepCount: 7,
          aiButtonPosition: 'inline',
          progressStyle: 'linear',
          saveFrequency: 5000
        }
      },
      'simplified': {
        name: 'Simplified 5-Step Flow',
        weight: 50,
        config: {
          stepCount: 5,
          aiButtonPosition: 'floating',
          progressStyle: 'circular',
          saveFrequency: 3000
        }
      }
    },
    targetMetrics: ['completion_rate', 'time_to_complete', 'user_satisfaction']
  },

  // AI Feature Positioning
  'ai_feature_prominence': {
    name: 'AI Feature Visibility',
    description: 'Test different ways to present AI enhancement features',
    status: 'active',
    variants: {
      'control': {
        name: 'Subtle AI Buttons',
        weight: 40,
        config: {
          aiButtonStyle: 'subtle',
          aiTooltips: false,
          aiCallouts: false,
          aiDemoModal: false
        }
      },
      'prominent': {
        name: 'Prominent AI Features',
        weight: 40,
        config: {
          aiButtonStyle: 'prominent',
          aiTooltips: true,
          aiCallouts: true,
          aiDemoModal: false
        }
      },
      'demo_first': {
        name: 'AI Demo on Entry',
        weight: 20,
        config: {
          aiButtonStyle: 'prominent',
          aiTooltips: true,
          aiCallouts: true,
          aiDemoModal: true
        }
      }
    },
    targetMetrics: ['ai_feature_usage', 'upgrade_rate', 'user_engagement']
  },

  // Pricing Strategy
  'pricing_presentation': {
    name: 'Pricing Strategy Test',
    description: 'Test different pricing presentations and upgrade prompts',
    status: 'active',
    variants: {
      'control': {
        name: 'Standard Pricing',
        weight: 50,
        config: {
          showPricingUpfront: false,
          quotaWarningTiming: 'at_limit',
          upgradeModalStyle: 'minimal',
          freeTrialOffer: false
        }
      },
      'value_focused': {
        name: 'Value-Focused Pricing',
        weight: 50,
        config: {
          showPricingUpfront: true,
          quotaWarningTiming: 'early',
          upgradeModalStyle: 'detailed',
          freeTrialOffer: true
        }
      }
    },
    targetMetrics: ['conversion_rate', 'upgrade_rate', 'trial_signup_rate']
  },

  // Template Selection
  'template_showcase': {
    name: 'Template Selection Experience',
    description: 'Test different ways to present resume templates',
    status: 'active',
    variants: {
      'control': {
        name: 'Grid View',
        weight: 50,
        config: {
          templateLayout: 'grid',
          previewSize: 'medium',
          filterOptions: ['category'],
          premiumBadges: 'corner'
        }
      },
      'carousel': {
        name: 'Interactive Carousel',
        weight: 50,
        config: {
          templateLayout: 'carousel',
          previewSize: 'large',
          filterOptions: ['category', 'industry', 'experience'],
          premiumBadges: 'overlay'
        }
      }
    },
    targetMetrics: ['template_selection_rate', 'premium_template_interest', 'user_engagement']
  }
};

// =============================================
// A/B Testing Service Class
// =============================================

export class ABTestingService {
  
  // =============================================
  // Core A/B Testing Functions
  // =============================================
  
  static async getUserVariant(testName, userId = null) {
    try {
      // Get or generate user ID for anonymous users
      const effectiveUserId = userId || this.getAnonymousUserId();
      
      // Check if test exists
      const test = AB_TESTS[testName];
      if (!test || test.status !== 'active') {
        return this.getDefaultVariant(testName);
      }

      // Check for existing assignment
      const existingAssignment = await this.getExistingAssignment(testName, effectiveUserId);
      if (existingAssignment) {
        return existingAssignment;
      }

      // Assign new variant based on weights
      const variant = this.assignVariant(test, effectiveUserId);
      
      // Save assignment
      await this.saveAssignment(testName, effectiveUserId, variant, userId !== null);
      
      // Track assignment event
      await this.trackEvent('variant_assigned', {
        test_name: testName,
        variant_name: variant.name,
        user_id: effectiveUserId,
        is_authenticated: userId !== null
      });

      return variant;
    } catch (error) {
      console.error('Error getting user variant:', error);
      return this.getDefaultVariant(testName);
    }
  }

  static async getExistingAssignment(testName, userId) {
    try {
      const { data } = await supabase
        .from('ab_test_assignments')
        .select('variant_name, variant_config')
        .eq('test_name', testName)
        .eq('user_id', userId)
        .single();

      if (data) {
        return {
          name: data.variant_name,
          config: data.variant_config
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static assignVariant(test, userId) {
    // Use deterministic assignment based on user ID hash
    const hash = this.hashUserId(userId);
    const variants = Object.entries(test.variants);
    
    // Calculate cumulative weights
    let totalWeight = 0;
    const cumulativeWeights = variants.map(([key, variant]) => {
      totalWeight += variant.weight;
      return { key, variant, cumulativeWeight: totalWeight };
    });

    // Normalize hash to weight range
    const normalizedHash = (hash % 100);
    const targetWeight = (normalizedHash / 100) * totalWeight;

    // Find matching variant
    for (const { key, variant, cumulativeWeight } of cumulativeWeights) {
      if (targetWeight <= cumulativeWeight) {
        return {
          key,
          name: variant.name,
          config: variant.config
        };
      }
    }

    // Fallback to first variant
    const [firstKey, firstVariant] = variants[0];
    return {
      key: firstKey,
      name: firstVariant.name,
      config: firstVariant.config
    };
  }

  static async saveAssignment(testName, userId, variant, isAuthenticated) {
    try {
      await supabase
        .from('ab_test_assignments')
        .insert({
          test_name: testName,
          user_id: userId,
          variant_name: variant.name,
          variant_config: variant.config,
          is_authenticated: isAuthenticated,
          assigned_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error saving assignment:', error);
    }
  }

  static getDefaultVariant(testName) {
    const test = AB_TESTS[testName];
    if (!test) {
      return { name: 'default', config: {} };
    }

    // Return control variant or first variant
    const controlVariant = test.variants.control || Object.values(test.variants)[0];
    return {
      name: controlVariant.name,
      config: controlVariant.config
    };
  }

  // =============================================
  // Event Tracking
  // =============================================

  static async trackConversion(testName, conversionType, userId = null, metadata = {}) {
    try {
      const effectiveUserId = userId || this.getAnonymousUserId();
      
      // Get user's variant for this test
      const assignment = await this.getExistingAssignment(testName, effectiveUserId);
      if (!assignment) {
        return; // User not in test
      }

      // Track conversion event
      await this.trackEvent('conversion', {
        test_name: testName,
        variant_name: assignment.name,
        conversion_type: conversionType,
        user_id: effectiveUserId,
        is_authenticated: userId !== null,
        ...metadata
      });

      // Update conversion in assignments table
      await supabase
        .from('ab_test_assignments')
        .update({
          converted: true,
          conversion_type: conversionType,
          converted_at: new Date().toISOString(),
          conversion_metadata: metadata
        })
        .eq('test_name', testName)
        .eq('user_id', effectiveUserId);

    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  }

  static async trackMetric(testName, metricName, value, userId = null, metadata = {}) {
    try {
      const effectiveUserId = userId || this.getAnonymousUserId();
      
      // Get user's variant
      const assignment = await this.getExistingAssignment(testName, effectiveUserId);
      if (!assignment) {
        return;
      }

      // Track metric event
      await this.trackEvent('metric_tracked', {
        test_name: testName,
        variant_name: assignment.name,
        metric_name: metricName,
        metric_value: value,
        user_id: effectiveUserId,
        is_authenticated: userId !== null,
        ...metadata
      });

    } catch (error) {
      console.error('Error tracking metric:', error);
    }
  }

  static async trackEvent(eventType, data) {
    try {
      await supabase
        .from('ab_test_events')
        .insert({
          event_type: eventType,
          data: data,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  // =============================================
  // Analytics and Reporting
  // =============================================

  static async getTestResults(testName, startDate = null, endDate = null) {
    try {
      let query = supabase
        .from('ab_test_assignments')
        .select(`
          variant_name,
          converted,
          conversion_type,
          is_authenticated,
          assigned_at,
          converted_at
        `)
        .eq('test_name', testName);

      if (startDate) {
        query = query.gte('assigned_at', startDate);
      }
      if (endDate) {
        query = query.lte('assigned_at', endDate);
      }

      const { data: assignments } = await query;

      // Calculate results by variant
      const results = {};
      
      assignments.forEach(assignment => {
        const variant = assignment.variant_name;
        if (!results[variant]) {
          results[variant] = {
            name: variant,
            totalUsers: 0,
            conversions: 0,
            conversionRate: 0,
            avgTimeToConvert: 0,
            totalTimeToConvert: 0,
            authenticatedUsers: 0,
            anonymousUsers: 0
          };
        }

        results[variant].totalUsers++;
        
        if (assignment.is_authenticated) {
          results[variant].authenticatedUsers++;
        } else {
          results[variant].anonymousUsers++;
        }

        if (assignment.converted) {
          results[variant].conversions++;
          
          if (assignment.converted_at && assignment.assigned_at) {
            const timeToConvert = new Date(assignment.converted_at) - new Date(assignment.assigned_at);
            results[variant].totalTimeToConvert += timeToConvert;
          }
        }
      });

      // Calculate final metrics
      Object.values(results).forEach(variant => {
        variant.conversionRate = variant.totalUsers > 0 
          ? (variant.conversions / variant.totalUsers) * 100 
          : 0;
        
        variant.avgTimeToConvert = variant.conversions > 0
          ? variant.totalTimeToConvert / variant.conversions
          : 0;
        
        delete variant.totalTimeToConvert; // Clean up intermediate value
      });

      return {
        testName,
        period: { startDate, endDate },
        results: Object.values(results),
        summary: this.calculateTestSummary(Object.values(results))
      };

    } catch (error) {
      console.error('Error getting test results:', error);
      return null;
    }
  }

  static calculateTestSummary(variants) {
    const totalUsers = variants.reduce((sum, v) => sum + v.totalUsers, 0);
    const totalConversions = variants.reduce((sum, v) => sum + v.conversions, 0);
    const overallConversionRate = totalUsers > 0 ? (totalConversions / totalUsers) * 100 : 0;

    // Find best performing variant
    const bestVariant = variants.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    , variants[0]);

    // Calculate statistical significance (simplified)
    const significance = this.calculateSignificance(variants);

    return {
      totalUsers,
      totalConversions,
      overallConversionRate: Math.round(overallConversionRate * 100) / 100,
      bestPerformingVariant: bestVariant?.name,
      bestConversionRate: Math.round(bestVariant?.conversionRate * 100) / 100,
      statisticalSignificance: significance,
      recommendation: this.generateRecommendation(variants, significance)
    };
  }

  static calculateSignificance(variants) {
    // Simplified significance calculation
    // In production, use proper statistical tests like Chi-square or t-test
    if (variants.length < 2) return 'insufficient_data';
    
    const [variant1, variant2] = variants.sort((a, b) => b.conversionRate - a.conversionRate);
    
    const minSampleSize = 100;
    if (variant1.totalUsers < minSampleSize || variant2.totalUsers < minSampleSize) {
      return 'insufficient_sample_size';
    }

    const rateDifference = Math.abs(variant1.conversionRate - variant2.conversionRate);
    
    if (rateDifference > 5) return 'high';
    if (rateDifference > 2) return 'medium';
    if (rateDifference > 0.5) return 'low';
    return 'not_significant';
  }

  static generateRecommendation(variants, significance) {
    if (significance === 'insufficient_data' || significance === 'insufficient_sample_size') {
      return 'Continue test to gather more data';
    }

    if (significance === 'not_significant') {
      return 'No significant difference found. Consider ending test.';
    }

    const bestVariant = variants.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    );

    return `Implement ${bestVariant.name} - shows ${Math.round(bestVariant.conversionRate * 100) / 100}% conversion rate with ${significance} significance.`;
  }

  // =============================================
  // Utility Functions
  // =============================================

  static getAnonymousUserId() {
    let userId = localStorage.getItem('ab_test_user_id');
    if (!userId) {
      userId = 'anon_' + this.generateRandomId();
      localStorage.setItem('ab_test_user_id', userId);
    }
    return userId;
  }

  static generateRandomId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  static hashUserId(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // =============================================
  // Integration Helpers
  // =============================================

  static async initializeForUser(userId = null) {
    try {
      const results = {};
      
      // Get variants for all active tests
      for (const testName of Object.keys(AB_TESTS)) {
        results[testName] = await this.getUserVariant(testName, userId);
      }

      return results;
    } catch (error) {
      console.error('Error initializing A/B tests:', error);
      return {};
    }
  }

  // Resume Builder specific helpers
  static async getResumeBuilderConfig(userId = null) {
    const flowVariant = await this.getUserVariant('resume_builder_flow', userId);
    const aiVariant = await this.getUserVariant('ai_feature_prominence', userId);
    const pricingVariant = await this.getUserVariant('pricing_presentation', userId);
    const templateVariant = await this.getUserVariant('template_showcase', userId);

    return {
      flow: flowVariant.config,
      ai: aiVariant.config,
      pricing: pricingVariant.config,
      templates: templateVariant.config,
      variants: {
        flow: flowVariant.name,
        ai: aiVariant.name,
        pricing: pricingVariant.name,
        templates: templateVariant.name
      }
    };
  }

  // Track common resume builder events
  static async trackResumeEvent(eventType, userId = null, metadata = {}) {
    const events = {
      'step_completed': ['resume_builder_flow'],
      'ai_feature_used': ['ai_feature_prominence'],
      'upgrade_modal_shown': ['pricing_presentation'],
      'template_selected': ['template_showcase'],
      'resume_completed': ['resume_builder_flow', 'ai_feature_prominence'],
      'user_upgraded': ['pricing_presentation', 'ai_feature_prominence']
    };

    const relevantTests = events[eventType] || [];
    
    for (const testName of relevantTests) {
      if (eventType === 'user_upgraded') {
        await this.trackConversion(testName, 'upgrade', userId, metadata);
      } else if (eventType === 'resume_completed') {
        await this.trackConversion(testName, 'completion', userId, metadata);
      } else {
        await this.trackMetric(testName, eventType, 1, userId, metadata);
      }
    }
  }
}

export default ABTestingService;
