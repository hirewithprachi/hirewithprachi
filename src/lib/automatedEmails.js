// Email Automation Service - Integrated with Supabase
import { supabase } from '../lib/supabase';

// Email service configuration
const EMAIL_CONFIG = {
  provider: process.env.REACT_APP_EMAIL_PROVIDER || 'sendgrid',
  apiKey: process.env.REACT_APP_SENDGRID_API_KEY,
  fromEmail: process.env.REACT_APP_FROM_EMAIL || 'noreply@hirewithprachi.com',
  fromName: process.env.REACT_APP_FROM_NAME || 'Hire with Prachi'
};

// Template variable replacement function
function replaceTemplateVariables(template, variables) {
  let processedTemplate = template;
  
  // Replace all {{variable}} patterns
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processedTemplate = processedTemplate.replace(regex, variables[key] || '');
  });
  
  return processedTemplate;
}

// Log email activity
async function logEmailActivity(automationId, userId, email, status, errorMessage = null) {
  try {
    const logData = {
      automation_id: automationId,
      user_id: userId,
      email_address: email,
      status: status,
      error_message: errorMessage,
      sent_at: status === 'sent' ? new Date().toISOString() : null
    };

    const { error } = await supabase
      .from('email_automation_logs')
      .insert([logData]);

    if (error) {
      console.error('Error logging email activity:', error);
    }
  } catch (err) {
    console.error('Error in logEmailActivity:', err);
  }
}

// Send email via simulated API (for development/demo purposes)
async function sendEmailViaAPI(to, subject, htmlContent, textContent) {
  try {
    // Simulate email sending for development
    console.log('📧 Email Automation - Sending Email:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Content Preview:', textContent.substring(0, 100) + '...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll always return success
    // In production, replace this with actual email service integration:
    // - SendGrid API
    // - Mailgun API
    // - AWS SES
    // - Nodemailer with SMTP
    
    const messageId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log to console for development visibility
    console.log('✅ Email sent successfully (simulated)');
    console.log('Message ID:', messageId);
    
    return { success: true, messageId: messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Main function to trigger email automation
export async function triggerEmailAutomation(triggerEvent, userId, userEmail, variables = {}) {
  try {
    // Get active automations for this trigger event
    const { data: automations, error } = await supabase
      .from('email_automations')
      .select('*')
      .eq('trigger_event', triggerEvent)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching automations:', error);
      return { success: false, error: error.message };
    }

    if (!automations || automations.length === 0) {
      console.log(`No active automations found for trigger: ${triggerEvent}`);
      return { success: true, message: 'No automations to trigger' };
    }

    const results = [];

    for (const automation of automations) {
      try {
        // Log automation start
        await logEmailActivity(automation.id, userId, userEmail, 'pending');

        // Process email template
        const emailContent = replaceTemplateVariables(automation.email_template, variables);
        const emailSubject = replaceTemplateVariables(automation.subject_template, variables);

        // Convert plain text to basic HTML
        const htmlContent = emailContent.replace(/\n/g, '<br>');

        // Handle delay if specified
        if (automation.delay_hours > 0) {
          // In a real implementation, you'd queue this for later processing
          console.log(`📅 Email automation "${automation.name}" scheduled for ${automation.delay_hours} hours delay`);
          await logEmailActivity(automation.id, userId, userEmail, 'scheduled');
          results.push({ 
            automationId: automation.id, 
            status: 'scheduled', 
            delayHours: automation.delay_hours 
          });
          continue;
        }

        // Send email immediately
        const sendResult = await sendEmailViaAPI(
          userEmail,
          emailSubject,
          htmlContent,
          emailContent
        );

        if (sendResult.success) {
          await logEmailActivity(automation.id, userId, userEmail, 'sent');
          results.push({ 
            automationId: automation.id, 
            status: 'sent', 
            messageId: sendResult.messageId 
          });
        } else {
          await logEmailActivity(automation.id, userId, userEmail, 'failed', sendResult.error);
          results.push({ 
            automationId: automation.id, 
            status: 'failed', 
            error: sendResult.error 
          });
        }
      } catch (automationError) {
        console.error(`Error processing automation ${automation.id}:`, automationError);
        await logEmailActivity(automation.id, userId, userEmail, 'failed', automationError.message);
        results.push({ 
          automationId: automation.id, 
          status: 'failed', 
          error: automationError.message 
        });
      }
    }

    return { success: true, results };
  } catch (error) {
    console.error('Error in triggerEmailAutomation:', error);
    return { success: false, error: error.message };
  }
}

// Specific automation functions
export async function welcomeEmail(userEmail, userData = {}) {
  const variables = {
    user_name: userData.full_name || userData.name || 'User',
    user_email: userEmail,
    dashboard_url: `${window.location.origin}/dashboard`,
    ...userData
  };

  return await triggerEmailAutomation('user_registered', userData.id, userEmail, variables);
}

export async function purchaseConfirmationEmail(userEmail, purchaseData = {}) {
  const variables = {
    user_name: purchaseData.user_name || 'User',
    user_email: userEmail,
    tool_name: purchaseData.tool_name || 'HR Tool',
    amount: purchaseData.amount || '0',
    transaction_id: purchaseData.transaction_id || 'N/A',
    tool_access_url: `${window.location.origin}/tools/${purchaseData.tool_id || ''}`,
    ...purchaseData
  };

  return await triggerEmailAutomation('tool_purchased', purchaseData.user_id, userEmail, variables);
}

export async function leadNurtureEmail(userEmail, userData = {}) {
  const variables = {
    user_name: userData.full_name || userData.name || 'User',
    user_email: userEmail,
    feedback_url: `${window.location.origin}/feedback`,
    dashboard_url: `${window.location.origin}/dashboard`,
    ...userData
  };

  return await triggerEmailAutomation('lead_nurture', userData.id, userEmail, variables);
}

export async function onboardingEmail(userEmail, userData = {}) {
  const variables = {
    user_name: userData.full_name || userData.name || 'User',
    user_email: userEmail,
    dashboard_url: `${window.location.origin}/dashboard`,
    support_url: `${window.location.origin}/support`,
    ...userData
  };

  return await triggerEmailAutomation('onboarding', userData.id, userEmail, variables);
}

// Test email function
export async function sendTestEmail(automationId, testEmail, testData = {}) {
  try {
    // Get automation details
    const { data: automation, error } = await supabase
      .from('email_automations')
      .select('*')
      .eq('id', automationId)
      .single();

    if (error || !automation) {
      throw new Error('Automation not found');
    }

    // Default test variables
    const defaultTestData = {
      user_name: 'Test User',
      user_email: testEmail,
      tool_name: 'Sample HR Tool',
      amount: '299',
      transaction_id: 'TEST123456',
      dashboard_url: `${window.location.origin}/dashboard`,
      tool_access_url: `${window.location.origin}/tools/sample`,
      feedback_url: `${window.location.origin}/feedback`,
      support_url: `${window.location.origin}/support`
    };

    const variables = { ...defaultTestData, ...testData };

    // Process templates
    const emailContent = replaceTemplateVariables(automation.email_template, variables);
    const emailSubject = replaceTemplateVariables(automation.subject_template, variables);
    const htmlContent = emailContent.replace(/\n/g, '<br>');

    console.log('🧪 Testing Email Automation:');
    console.log('Automation:', automation.name);
    console.log('Trigger:', automation.trigger_event);

    // Send test email
    const result = await sendEmailViaAPI(
      testEmail,
      `[TEST] ${emailSubject}`,
      htmlContent,
      emailContent
    );

    return result;
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, error: error.message };
  }
}

// Get automation analytics
export async function getAutomationAnalytics() {
  try {
    const { data, error } = await supabase
      .from('email_automation_analytics')
      .select('*');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching automation analytics:', error);
    return { success: false, error: error.message };
  }
}

// Manual trigger for specific automation
export async function triggerSpecificAutomation(automationId, userEmail, variables = {}) {
  try {
    const { data: automation, error } = await supabase
      .from('email_automations')
      .select('*')
      .eq('id', automationId)
      .eq('is_active', true)
      .single();

    if (error || !automation) {
      throw new Error('Automation not found or inactive');
    }

    // Process and send email
    const emailContent = replaceTemplateVariables(automation.email_template, variables);
    const emailSubject = replaceTemplateVariables(automation.subject_template, variables);
    const htmlContent = emailContent.replace(/\n/g, '<br>');

    const result = await sendEmailViaAPI(
      userEmail,
      emailSubject,
      htmlContent,
      emailContent
    );

    // Log the activity
    await logEmailActivity(
      automationId, 
      variables.user_id || null, 
      userEmail, 
      result.success ? 'sent' : 'failed',
      result.success ? null : result.error
    );

    return result;
  } catch (error) {
    console.error('Error triggering specific automation:', error);
    return { success: false, error: error.message };
  }
}

// Integration helper for user registration
export async function handleUserRegistration(user) {
  try {
    const userData = {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      email: user.email
    };

    console.log('🎉 New user registered, triggering welcome email automation');
    const result = await welcomeEmail(user.email, userData);
    
    if (result.success) {
      console.log('✅ Welcome email automation triggered successfully');
    } else {
      console.error('❌ Failed to trigger welcome email:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Error in handleUserRegistration:', error);
    return { success: false, error: error.message };
  }
}

// Integration helper for tool purchases
export async function handleToolPurchase(purchaseData) {
  try {
    console.log('💳 Tool purchased, triggering confirmation email automation');
    const result = await purchaseConfirmationEmail(purchaseData.user_email, purchaseData);
    
    if (result.success) {
      console.log('✅ Purchase confirmation email automation triggered successfully');
    } else {
      console.error('❌ Failed to trigger purchase confirmation email:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Error in handleToolPurchase:', error);
    return { success: false, error: error.message };
  }
}

export default {
  triggerEmailAutomation,
  welcomeEmail,
  purchaseConfirmationEmail,
  leadNurtureEmail,
  onboardingEmail,
  sendTestEmail,
  getAutomationAnalytics,
  triggerSpecificAutomation,
  handleUserRegistration,
  handleToolPurchase
};