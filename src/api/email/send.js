// Email sending API endpoint
// This would typically be a backend API, but for demo purposes, we'll simulate it

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, from, subject, html, text } = req.body;

    // Validate required fields
    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, subject, and content (html or text)' 
      });
    }

    // Simulate email sending (replace with actual email service integration)
    console.log('📧 Simulating email send:');
    console.log('To:', to);
    console.log('From:', from?.email || 'noreply@hirewithprachi.com');
    console.log('Subject:', subject);
    console.log('Content:', html || text);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, we'll always return success
    // In a real implementation, you would integrate with:
    // - SendGrid: https://docs.sendgrid.com/api-reference/mail-send/mail-send
    // - Mailgun: https://documentation.mailgun.com/en/latest/api-sending.html
    // - AWS SES: https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html
    // - Nodemailer: https://nodemailer.com/about/

    const messageId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return res.status(200).json({
      success: true,
      messageId: messageId,
      message: 'Email sent successfully (simulated)'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
}

// Example integration with SendGrid:
/*
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, from, subject, html, text } = req.body;

    const msg = {
      to: to,
      from: from?.email || process.env.FROM_EMAIL,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await sgMail.send(msg);
    
    return res.status(200).json({
      success: true,
      messageId: result[0].headers['x-message-id'],
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
}
*/

// Example integration with Nodemailer:
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, from, subject, html, text } = req.body;

    const mailOptions = {
      from: from?.email || process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    
    return res.status(200).json({
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
}
*/