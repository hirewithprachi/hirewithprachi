// Email service with support for both Resend and SendGrid APIs
export class EmailService {
  constructor() {
    this.resendApiKey = import.meta.env.VITE_RESEND_API_KEY || 're_jdaQP9kQ_JoPJLrmtwr14fLXB2X6EsNj6';
    this.sendGridApiKey = import.meta.env.VITE_SENDGRID_API_KEY || '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';
    this.fromEmail = 'noreply@hirewithprachi.com';
    this.fromName = 'Hire With Prachi';
  }

  // Send email using Resend API (primary)
  async sendWithResend(emailData) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${this.fromName} <${this.fromEmail}>`,
          to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text || this.stripHtml(emailData.html),
          reply_to: emailData.replyTo || 'contact@hirewithprachi.com',
          headers: {
            'X-Priority': emailData.priority || '3',
            'X-MSMail-Priority': emailData.priority === '1' ? 'High' : emailData.priority === '5' ? 'Low' : 'Normal'
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Resend API error: ${response.status}`);
      }

      return {
        success: true,
        messageId: result.id,
        provider: 'resend'
      };

    } catch (error) {
      console.error('Resend email error:', error);
      throw error;
    }
  }

  // Send email using SendGrid API (fallback)
  async sendWithSendGrid(emailData) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.sendGridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: Array.isArray(emailData.to) 
              ? emailData.to.map(email => ({ email }))
              : [{ email: emailData.to }],
            subject: emailData.subject
          }],
          from: {
            email: this.fromEmail,
            name: this.fromName
          },
          content: [
            {
              type: 'text/html',
              value: emailData.html
            },
            {
              type: 'text/plain',
              value: emailData.text || this.stripHtml(emailData.html)
            }
          ],
          reply_to: {
            email: emailData.replyTo || 'contact@hirewithprachi.com',
            name: this.fromName
          }
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`SendGrid API error: ${response.status} - ${error}`);
      }

      return {
        success: true,
        messageId: response.headers.get('X-Message-Id'),
        provider: 'sendgrid'
      };

    } catch (error) {
      console.error('SendGrid email error:', error);
      throw error;
    }
  }

  // Main send function using Supabase Edge Function
  async sendEmail(emailData) {
    try {
      // Validate email data
      this.validateEmailData(emailData);

      // Use Supabase Edge Function to avoid CORS issues
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase configuration missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text || this.stripHtml(emailData.html),
          replyTo: emailData.replyTo || 'contact@hirewithprachi.com',
          priority: emailData.priority || '3'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Email sent successfully via Edge Function:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId,
        provider: result.provider || 'edge-function'
      };

    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Store failed email for retry
      this.storeFailedEmail(emailData, error.message);
      
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Send bulk emails
  async sendBulkEmails(emailsData) {
    const results = [];
    const batchSize = 10; // Process emails in batches

    for (let i = 0; i < emailsData.length; i += batchSize) {
      const batch = emailsData.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (emailData, index) => {
        try {
          const result = await this.sendEmail(emailData);
          return {
            index: i + index,
            success: true,
            ...result
          };
        } catch (error) {
          return {
            index: i + index,
            success: false,
            error: error.message,
            email: emailData.to
          };
        }
      });

      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults.map(result => result.value));

      // Add delay between batches to avoid rate limits
      if (i + batchSize < emailsData.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  // Send email campaign
  async sendCampaign(campaignData) {
    const { recipients, subject, htmlTemplate, textTemplate, variables } = campaignData;

    const emailsData = recipients.map(recipient => ({
      to: recipient.email,
      subject: this.processTemplate(subject, { ...variables, ...recipient }),
      html: this.processTemplate(htmlTemplate, { ...variables, ...recipient }),
      text: textTemplate ? this.processTemplate(textTemplate, { ...variables, ...recipient }) : undefined
    }));

    return await this.sendBulkEmails(emailsData);
  }

  // Email templates
  getEmailTemplates() {
    return {
      welcome: {
        subject: 'Welcome to Hire With Prachi!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to Hire With Prachi!</h1>
            <p>Hi {{name}},</p>
            <p>Thank you for joining our HR services platform. We're excited to help you with your HR needs.</p>
            <p>Get started by exploring our services:</p>
            <ul>
              <li>Virtual HR Management</li>
              <li>HR Compliance</li>
              <li>Payroll Management</li>
              <li>Recruitment Services</li>
            </ul>
            <p>If you have any questions, feel free to reach out to us.</p>
            <p>Best regards,<br>The Hire With Prachi Team</p>
          </div>
        `
      },
      leadFollowUp: {
        subject: 'Thank you for your interest in our HR services',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Thank you for your interest!</h1>
            <p>Hi {{name}},</p>
            <p>Thank you for expressing interest in our {{service}} service.</p>
            <p>Our team will contact you within 24 hours to discuss your requirements.</p>
            <p>In the meantime, you might be interested in:</p>
            <ul>
              <li><a href="https://hirewithprachi.com/blog">Our HR insights blog</a></li>
              <li><a href="https://hirewithprachi.com/tools">Free HR tools and calculators</a></li>
              <li><a href="https://hirewithprachi.com/resources">HR resources and templates</a></li>
            </ul>
            <p>Best regards,<br>Prachi Shrivastava<br>Founder, Hire With Prachi</p>
          </div>
        `
      },
      newsletter: {
        subject: 'HR Insights Newsletter - {{month}} {{year}}',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">HR Insights Newsletter</h1>
            <p>Hi {{name}},</p>
            <p>Here are this month's top HR insights and updates:</p>
            <div style="border-left: 4px solid #2563eb; padding-left: 20px; margin: 20px 0;">
              <h3>Featured Article</h3>
              <p>{{featured_article_title}}</p>
              <a href="{{featured_article_link}}" style="color: #2563eb;">Read more →</a>
            </div>
            <h3>This Month's Highlights</h3>
            <ul>
              <li>{{highlight_1}}</li>
              <li>{{highlight_2}}</li>
              <li>{{highlight_3}}</li>
            </ul>
            <p>Stay updated with the latest HR trends and best practices.</p>
            <p>Best regards,<br>The Hire With Prachi Team</p>
          </div>
        `
      },
      appointmentConfirmation: {
        subject: 'Appointment Confirmed - {{date}} at {{time}}',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Appointment Confirmed</h1>
            <p>Hi {{name}},</p>
            <p>Your appointment has been confirmed for:</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Date:</strong> {{date}}</p>
              <p><strong>Time:</strong> {{time}}</p>
              <p><strong>Service:</strong> {{service}}</p>
              <p><strong>Duration:</strong> {{duration}}</p>
            </div>
            <p>Meeting details will be shared 15 minutes before the appointment.</p>
            <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
            <p>Looking forward to speaking with you!</p>
            <p>Best regards,<br>Prachi Shrivastava</p>
          </div>
        `
      }
    };
  }

  // Process template with variables
  processTemplate(template, variables) {
    let processed = template;
    
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, variables[key] || '');
    });

    return processed;
  }

  // Validate email data
  validateEmailData(emailData) {
    if (!emailData.to) {
      throw new Error('Recipient email is required');
    }

    if (!emailData.subject) {
      throw new Error('Email subject is required');
    }

    if (!emailData.html && !emailData.text) {
      throw new Error('Email content (HTML or text) is required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const recipients = Array.isArray(emailData.to) ? emailData.to : [emailData.to];
    
    recipients.forEach(email => {
      if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
      }
    });
  }

  // Strip HTML tags
  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  // Store failed email for retry
  storeFailedEmail(emailData, error) {
    try {
      const failedEmails = JSON.parse(localStorage.getItem('failed_emails') || '[]');
      failedEmails.push({
        emailData,
        error,
        timestamp: new Date().toISOString(),
        retryCount: 0
      });
      localStorage.setItem('failed_emails', JSON.stringify(failedEmails));
    } catch (error) {
      console.error('Failed to store failed email:', error);
    }
  }

  // Retry failed emails
  async retryFailedEmails() {
    try {
      const failedEmails = JSON.parse(localStorage.getItem('failed_emails') || '[]');
      const results = [];

      for (const failedEmail of failedEmails) {
        if (failedEmail.retryCount < 3) {
          try {
            const result = await this.sendEmail(failedEmail.emailData);
            results.push({
              success: true,
              originalError: failedEmail.error,
              ...result
            });
          } catch (error) {
            failedEmail.retryCount++;
            results.push({
              success: false,
              error: error.message,
              retryCount: failedEmail.retryCount
            });
          }
        }
      }

      // Update failed emails list
      const remainingFailedEmails = failedEmails.filter(email => email.retryCount < 3);
      localStorage.setItem('failed_emails', JSON.stringify(remainingFailedEmails));

      return results;

    } catch (error) {
      console.error('Failed to retry emails:', error);
      return [];
    }
  }

  // Get email stats
  getEmailStats() {
    const failedEmails = JSON.parse(localStorage.getItem('failed_emails') || '[]');
    return {
      pendingRetries: failedEmails.length,
      lastSent: localStorage.getItem('last_email_sent'),
      totalSent: parseInt(localStorage.getItem('total_emails_sent') || '0'),
      totalFailed: failedEmails.filter(email => email.retryCount >= 3).length
    };
  }

  // Update stats
  updateStats(success) {
    if (success) {
      const currentTotal = parseInt(localStorage.getItem('total_emails_sent') || '0');
      localStorage.setItem('total_emails_sent', (currentTotal + 1).toString());
      localStorage.setItem('last_email_sent', new Date().toISOString());
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;
