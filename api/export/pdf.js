// PDF Export API
// Generates ATS-optimized PDF resumes using puppeteer

import { createClient } from '@supabase/supabase-js';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';

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

  let browser;

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

    const { resumeId, versionId, template = 'modern' } = req.body;

    if (!resumeId || !versionId) {
      return res.status(400).json({ error: 'Resume ID and version ID are required' });
    }

    // Check quota
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: canUse } = await supabase.rpc('check_quota_limit', {
      user_uuid: user.id,
      quota_type: 'exports',
      current_month: currentMonth
    });

    if (!canUse) {
      return res.status(429).json({ 
        error: 'Export quota exceeded',
        code: 'QUOTA_EXCEEDED'
      });
    }

    // Get resume data
    const { data: resumeVersion, error: resumeError } = await supabase
      .from('resume_versions')
      .select(`
        *,
        resume:resumes!inner(user_id, title, template_key)
      `)
      .eq('id', versionId)
      .eq('resume_id', resumeId)
      .single();

    if (resumeError || !resumeVersion) {
      return res.status(404).json({ error: 'Resume version not found' });
    }

    // Verify ownership
    if (resumeVersion.resume.user_id !== user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get template
    const { data: templateData, error: templateError } = await supabase
      .from('resume_templates')
      .select('*')
      .eq('key', template)
      .single();

    if (templateError || !templateData) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check if template is premium and user has access
    if (templateData.is_premium) {
      const userPlan = await getUserPlan(user.id);
      if (userPlan === 'free') {
        return res.status(403).json({ 
          error: 'Premium template requires Pro plan',
          code: 'PREMIUM_REQUIRED'
        });
      }
    }

    // Generate HTML
    const html = generateResumeHTML(resumeVersion.data, templateData);

    // Generate PDF using Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF with ATS-optimized settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true,
      preferCSSPageSize: true
    });

    await browser.close();
    browser = null;

    // Upload to Supabase Storage
    const exportId = uuidv4();
    const fileName = `${user.id}/${resumeId}/${exportId}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('exports')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600'
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Create export record
    const { data: exportRecord, error: exportError } = await supabase
      .from('exports')
      .insert({
        id: exportId,
        resume_id: resumeId,
        version_id: versionId,
        format: 'pdf',
        template_key: template,
        storage_path: fileName,
        file_size: pdfBuffer.length,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      })
      .select()
      .single();

    if (exportError) {
      throw new Error(`Export record creation failed: ${exportError.message}`);
    }

    // Generate signed URL
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('exports')
      .createSignedUrl(fileName, 24 * 60 * 60); // 24 hours

    if (urlError) {
      throw new Error(`Signed URL generation failed: ${urlError.message}`);
    }

    // Increment quota
    await supabase.rpc('increment_quota_usage', {
      user_uuid: user.id,
      quota_type: 'exports',
      current_month: currentMonth
    });

    // Track usage
    await supabase.from('tool_events').insert({
      user_id: user.id,
      event: 'resume_exported',
      meta: {
        resume_id: resumeId,
        version_id: versionId,
        format: 'pdf',
        template,
        file_size: pdfBuffer.length,
        api_endpoint: 'export/pdf'
      }
    });

    return res.status(200).json({
      success: true,
      exportId,
      url: signedUrlData.signedUrl,
      fileName: `${resumeVersion.resume.title || 'Resume'}.pdf`,
      fileSize: pdfBuffer.length,
      expiresAt: exportRecord.expires_at
    });

  } catch (error) {
    console.error('PDF export error:', error);

    // Clean up browser if it's still running
    if (browser) {
      try {
        await browser.close();
      } catch (browserError) {
        console.error('Browser cleanup error:', browserError);
      }
    }

    // Log error
    try {
      await supabase.from('tool_events').insert({
        user_id: user?.id || null,
        event: 'pdf_export_error',
        meta: {
          error: error.message,
          api_endpoint: 'export/pdf'
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return res.status(500).json({ 
      error: 'PDF export failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Get user plan helper function
async function getUserPlan(userId) {
  try {
    const { data } = await supabase.rpc('get_user_plan', { user_uuid: userId });
    return data || 'free';
  } catch (error) {
    return 'free';
  }
}

// Generate ATS-optimized HTML for resume
function generateResumeHTML(resumeData, template) {
  const colorScheme = template.color_scheme || { primary: '#3B82F6', secondary: '#1F2937' };
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  <style>
    ${getTemplateCSS(template.key, colorScheme)}
  </style>
</head>
<body>
  <div class="resume-container">
    ${generateResumeContent(resumeData, template.key)}
  </div>
</body>
</html>`;
}

// Get template-specific CSS
function getTemplateCSS(templateKey, colorScheme) {
  const baseCSS = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #333;
      background: white;
    }
    
    .resume-container {
      max-width: 8.5in;
      margin: 0 auto;
      padding: 0.5in;
      background: white;
    }
    
    h1 {
      font-size: 24pt;
      font-weight: 700;
      color: ${colorScheme.primary};
      margin-bottom: 8pt;
    }
    
    h2 {
      font-size: 14pt;
      font-weight: 600;
      color: ${colorScheme.primary};
      margin: 16pt 0 8pt 0;
      border-bottom: 1pt solid ${colorScheme.primary};
      padding-bottom: 4pt;
    }
    
    h3 {
      font-size: 12pt;
      font-weight: 600;
      color: ${colorScheme.secondary};
      margin: 8pt 0 4pt 0;
    }
    
    .header {
      text-align: center;
      margin-bottom: 20pt;
    }
    
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 16pt;
      margin-top: 8pt;
      font-size: 10pt;
    }
    
    .section {
      margin-bottom: 16pt;
    }
    
    .experience-item, .project-item, .education-item {
      margin-bottom: 12pt;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4pt;
    }
    
    .item-title {
      font-weight: 600;
      color: ${colorScheme.secondary};
    }
    
    .item-company {
      font-weight: 500;
    }
    
    .item-dates {
      font-size: 10pt;
      color: #666;
    }
    
    .bullets {
      margin-left: 16pt;
    }
    
    .bullets li {
      margin-bottom: 4pt;
      list-style-type: disc;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200pt, 1fr));
      gap: 12pt;
    }
    
    .skill-category h4 {
      font-size: 11pt;
      font-weight: 600;
      color: ${colorScheme.primary};
      margin-bottom: 4pt;
    }
    
    .skill-list {
      font-size: 10pt;
      line-height: 1.3;
    }
    
    @media print {
      body { print-color-adjust: exact; }
      .resume-container { 
        max-width: none;
        padding: 0;
      }
    }
  `;

  // Template-specific styles
  const templateStyles = {
    modern: `
      h1 { letter-spacing: -0.5pt; }
      h2 { text-transform: uppercase; letter-spacing: 0.5pt; }
      .header { 
        background: linear-gradient(135deg, ${colorScheme.primary}15, transparent);
        padding: 16pt;
        margin: -0.5in -0.5in 20pt -0.5in;
      }
    `,
    minimal: `
      h1 { font-weight: 300; }
      h2 { border-bottom: none; font-weight: 400; }
      .contact-info { margin-top: 4pt; }
    `,
    corporate: `
      h1 { font-size: 28pt; }
      h2 { background: ${colorScheme.primary}; color: white; padding: 4pt 8pt; margin-left: -8pt; }
      .item-title { text-transform: uppercase; letter-spacing: 0.3pt; }
    `,
    creative: `
      h1 { background: ${colorScheme.primary}; color: white; padding: 12pt; margin: -0.5in -0.5in 20pt -0.5in; }
      h2 { color: ${colorScheme.primary}; border-left: 4pt solid ${colorScheme.primary}; padding-left: 8pt; border-bottom: none; }
      .section:nth-child(even) { background: #f8f9fa; padding: 8pt; margin: 0 -8pt; }
    `
  };

  return baseCSS + (templateStyles[templateKey] || '');
}

// Generate resume content HTML
function generateResumeContent(data, templateKey) {
  let html = '';

  // Header section
  html += `
    <div class="header">
      <h1>${escapeHtml(data.profile?.name || 'Name')}</h1>
      ${data.profile?.headline ? `<div class="headline">${escapeHtml(data.profile.headline)}</div>` : ''}
      <div class="contact-info">
        ${data.profile?.email ? `<span>${escapeHtml(data.profile.email)}</span>` : ''}
        ${data.profile?.phone ? `<span>${escapeHtml(data.profile.phone)}</span>` : ''}
        ${data.profile?.location ? `<span>${escapeHtml(data.profile.location)}</span>` : ''}
        ${data.profile?.links?.map(link => `<span>${escapeHtml(link.label)}</span>`).join('') || ''}
      </div>
    </div>
  `;

  // Summary section
  if (data.summary) {
    html += `
      <div class="section">
        <h2>Professional Summary</h2>
        <p>${escapeHtml(data.summary)}</p>
      </div>
    `;
  }

  // Experience section
  if (data.experience && data.experience.length > 0) {
    html += `
      <div class="section">
        <h2>Professional Experience</h2>
        ${data.experience.map(exp => `
          <div class="experience-item">
            <div class="item-header">
              <div>
                <div class="item-title">${escapeHtml(exp.role || '')}</div>
                <div class="item-company">${escapeHtml(exp.company || '')}${exp.location ? ` • ${escapeHtml(exp.location)}` : ''}</div>
              </div>
              <div class="item-dates">${escapeHtml(exp.start || '')} - ${escapeHtml(exp.end || '')}</div>
            </div>
            ${exp.bullets && exp.bullets.length > 0 ? `
              <ul class="bullets">
                ${exp.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join('')}
              </ul>
            ` : ''}
            ${exp.technologies && exp.technologies.length > 0 ? `
              <div class="technologies"><strong>Technologies:</strong> ${exp.technologies.map(tech => escapeHtml(tech)).join(', ')}</div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Projects section
  if (data.projects && data.projects.length > 0) {
    html += `
      <div class="section">
        <h2>Key Projects</h2>
        ${data.projects.map(project => `
          <div class="project-item">
            <div class="item-header">
              <div>
                <div class="item-title">${escapeHtml(project.name || '')}</div>
                ${project.role ? `<div class="item-company">${escapeHtml(project.role)}</div>` : ''}
              </div>
              ${project.link ? `<div class="item-dates">${escapeHtml(project.link)}</div>` : ''}
            </div>
            ${project.bullets && project.bullets.length > 0 ? `
              <ul class="bullets">
                ${project.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join('')}
              </ul>
            ` : ''}
            ${project.technologies && project.technologies.length > 0 ? `
              <div class="technologies"><strong>Technologies:</strong> ${project.technologies.map(tech => escapeHtml(tech)).join(', ')}</div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Education section
  if (data.education && data.education.length > 0) {
    html += `
      <div class="section">
        <h2>Education</h2>
        ${data.education.map(edu => `
          <div class="education-item">
            <div class="item-header">
              <div>
                <div class="item-title">${escapeHtml(edu.degree || '')}</div>
                <div class="item-company">${escapeHtml(edu.school || '')}</div>
              </div>
              <div class="item-dates">${escapeHtml(edu.start || '')} - ${escapeHtml(edu.end || '')}</div>
            </div>
            ${edu.details ? `<div>${escapeHtml(edu.details)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Skills section
  if (data.skills) {
    html += `
      <div class="section">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          ${data.skills.core && data.skills.core.length > 0 ? `
            <div class="skill-category">
              <h4>Core Technologies</h4>
              <div class="skill-list">${data.skills.core.map(skill => escapeHtml(skill)).join(' • ')}</div>
            </div>
          ` : ''}
          ${data.skills.tools && data.skills.tools.length > 0 ? `
            <div class="skill-category">
              <h4>Tools & Frameworks</h4>
              <div class="skill-list">${data.skills.tools.map(skill => escapeHtml(skill)).join(' • ')}</div>
            </div>
          ` : ''}
          ${data.skills.soft && data.skills.soft.length > 0 ? `
            <div class="skill-category">
              <h4>Professional Skills</h4>
              <div class="skill-list">${data.skills.soft.map(skill => escapeHtml(skill)).join(' • ')}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Extras section
  if (data.extras) {
    const hasExtras = (data.extras.certifications && data.extras.certifications.length > 0) ||
                     (data.extras.awards && data.extras.awards.length > 0) ||
                     (data.extras.languages && data.extras.languages.length > 0);

    if (hasExtras) {
      html += `
        <div class="section">
          <h2>Additional Information</h2>
          <div class="skills-grid">
            ${data.extras.certifications && data.extras.certifications.length > 0 ? `
              <div class="skill-category">
                <h4>Certifications</h4>
                <div class="skill-list">${data.extras.certifications.map(cert => escapeHtml(cert)).join(' • ')}</div>
              </div>
            ` : ''}
            ${data.extras.awards && data.extras.awards.length > 0 ? `
              <div class="skill-category">
                <h4>Awards & Recognition</h4>
                <div class="skill-list">${data.extras.awards.map(award => escapeHtml(award)).join(' • ')}</div>
              </div>
            ` : ''}
            ${data.extras.languages && data.extras.languages.length > 0 ? `
              <div class="skill-category">
                <h4>Languages</h4>
                <div class="skill-list">${data.extras.languages.map(lang => escapeHtml(lang)).join(' • ')}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
  }

  return html;
}

// HTML escape helper function
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
