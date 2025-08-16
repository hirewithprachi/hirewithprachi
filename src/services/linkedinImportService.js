// LinkedIn Import Service
// Import profile data from LinkedIn to prefill resume fields

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export class LinkedInImportService {
  
  // =============================================
  // LinkedIn PDF Parser
  // =============================================
  
  static async parseLinkedInPDF(file) {
    try {
      if (!file || file.type !== 'application/pdf') {
        throw new Error('Please select a valid PDF file');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB');
      }

      // Convert PDF to text using PDF.js
      const pdfText = await this.extractTextFromPDF(file);
      
      // Parse the extracted text
      const profileData = this.parseLinkedInText(pdfText);
      
      // Validate and clean the data
      const cleanedData = this.validateAndCleanData(profileData);
      
      return {
        success: true,
        data: cleanedData,
        source: 'linkedin_pdf'
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.onload = async function() {
        try {
          // Check if PDF.js is available in browser environment
          if (typeof window === 'undefined') {
            throw new Error('PDF parsing not available in server environment');
          }

          // Try to use PDF.js from CDN first
          let pdfjsLib;
          try {
            // Load PDF.js from CDN if not already loaded
            if (!window.pdfjsLib) {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
              document.head.appendChild(script);
              
              await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
              });
            }
            pdfjsLib = window.pdfjsLib;
          } catch (cdnError) {
            // Fallback to dynamic import
            pdfjsLib = await import('pdfjs-dist');
          }
          
          // Set worker source
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          
          const loadingTask = pdfjsLib.getDocument(new Uint8Array(this.result));
          const pdf = await loadingTask.promise;
          
          let fullText = '';
          
          // Extract text from all pages
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }
          
          resolve(fullText);
        } catch (error) {
          // Fallback: return error message for now
          reject(new Error('PDF text extraction failed. Please copy and paste your LinkedIn profile text instead.'));
        }
      };
      
      fileReader.onerror = () => reject(new Error('Failed to read PDF file'));
      fileReader.readAsArrayBuffer(file);
    });
  }

  // =============================================
  // LinkedIn Text Parser
  // =============================================
  
  static parseLinkedInText(text) {
    const profileData = {
      profile: {},
      summary: '',
      experience: [],
      education: [],
      skills: { core: [], tools: [], soft: [] },
      extras: { certifications: [], awards: [], languages: [] }
    };

    // Clean and normalize text
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const lines = cleanText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Extract personal information
    this.extractPersonalInfo(lines, profileData);
    
    // Extract summary/about section
    this.extractSummary(lines, profileData);
    
    // Extract experience
    this.extractExperience(lines, profileData);
    
    // Extract education
    this.extractEducation(lines, profileData);
    
    // Extract skills
    this.extractSkills(lines, profileData);
    
    // Extract certifications and awards
    this.extractCertificationsAndAwards(lines, profileData);

    return profileData;
  }

  static extractPersonalInfo(lines, profileData) {
    const text = lines.join(' ').toLowerCase();
    
    // Extract name (usually at the beginning)
    const nameMatch = lines[0]?.match(/^([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
    if (nameMatch) {
      profileData.profile.name = nameMatch[1];
    }

    // Extract email
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      profileData.profile.email = emailMatch[1];
    }

    // Extract phone
    const phoneMatch = text.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/);
    if (phoneMatch) {
      profileData.profile.phone = phoneMatch[1];
    }

    // Extract location
    const locationPatterns = [
      /(?:located?\s+in|based\s+in|from)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z]{2,})/i,
      /([A-Z][a-z]+,\s*[A-Z]{2,3}(?:\s+[0-9]{5})?)/,
      /([A-Z][a-z]+\s*,\s*[A-Z][a-z]+\s*,\s*[A-Z]{2,})/
    ];
    
    for (const pattern of locationPatterns) {
      const locationMatch = text.match(pattern);
      if (locationMatch) {
        profileData.profile.location = locationMatch[1];
        break;
      }
    }

    // Extract LinkedIn URL
    const linkedinMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9-]+)/);
    if (linkedinMatch) {
      profileData.profile.links = [
        { label: 'LinkedIn', url: `https://${linkedinMatch[1]}` }
      ];
    }
  }

  static extractSummary(lines, profileData) {
    const summaryKeywords = ['about', 'summary', 'profile', 'overview', 'professional summary'];
    let summaryStartIndex = -1;
    let summaryEndIndex = -1;

    // Find summary section
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (summaryKeywords.some(keyword => line.includes(keyword)) && line.length < 50) {
        summaryStartIndex = i + 1;
        break;
      }
    }

    if (summaryStartIndex !== -1) {
      // Find end of summary (next section)
      const sectionKeywords = ['experience', 'education', 'skills', 'certifications', 'projects'];
      for (let i = summaryStartIndex; i < lines.length; i++) {
        const line = lines[i].toLowerCase();
        if (sectionKeywords.some(keyword => line.includes(keyword)) && line.length < 50) {
          summaryEndIndex = i;
          break;
        }
      }

      const summaryLines = lines.slice(summaryStartIndex, summaryEndIndex === -1 ? summaryStartIndex + 5 : summaryEndIndex);
      profileData.summary = summaryLines.join(' ').replace(/\s+/g, ' ').trim();
    }
  }

  static extractExperience(lines, profileData) {
    const experienceKeywords = ['experience', 'work history', 'employment', 'professional experience'];
    let experienceStartIndex = -1;

    // Find experience section
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (experienceKeywords.some(keyword => line.includes(keyword)) && line.length < 50) {
        experienceStartIndex = i + 1;
        break;
      }
    }

    if (experienceStartIndex === -1) return;

    // Parse experience entries
    for (let i = experienceStartIndex; i < lines.length; i++) {
      const line = lines[i];
      
      // Stop at next major section
      if (this.isNewSection(line)) break;

      // Look for job title patterns
      const jobPattern = /^([A-Z][^,\n]+?)(?:\s+at\s+|\s+@\s+|\s+-\s+)([A-Z][^,\n]+?)(?:\s*·\s*(.+))?$/i;
      const match = line.match(jobPattern);
      
      if (match) {
        const experience = {
          role: match[1].trim(),
          company: match[2].trim(),
          location: '',
          start: '',
          end: '',
          bullets: []
        };

        // Look for dates in the next few lines
        for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
          const dateLine = lines[j];
          const dateMatch = dateLine.match(/(\w+\s+\d{4})\s*[-–]\s*(\w+\s+\d{4}|Present)/i);
          if (dateMatch) {
            experience.start = this.normalizeDate(dateMatch[1]);
            experience.end = dateMatch[2] === 'Present' ? 'Present' : this.normalizeDate(dateMatch[2]);
            break;
          }
        }

        // Look for description/bullets in the next few lines
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          if (this.isNewSection(lines[j]) || this.looksLikeJobTitle(lines[j])) break;
          
          if (lines[j].length > 20 && !lines[j].match(/^\w+\s+\d{4}/)) {
            experience.bullets.push(lines[j]);
          }
        }

        if (experience.role && experience.company) {
          profileData.experience.push(experience);
        }
      }
    }
  }

  static extractEducation(lines, profileData) {
    const educationKeywords = ['education', 'academic', 'university', 'college', 'school'];
    let educationStartIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (educationKeywords.some(keyword => line.includes(keyword)) && line.length < 50) {
        educationStartIndex = i + 1;
        break;
      }
    }

    if (educationStartIndex === -1) return;

    for (let i = educationStartIndex; i < lines.length; i++) {
      const line = lines[i];
      
      if (this.isNewSection(line)) break;

      // Look for degree patterns
      const degreePattern = /^(Bachelor|Master|PhD|BS|MS|BA|MA|MBA|Doctor).*?(?:\s+at\s+|\s+from\s+|\s+-\s+)(.+?)(?:\s*·\s*(.+))?$/i;
      const schoolPattern = /^([A-Z][^,\n]+(?:University|College|Institute|School)[^,\n]*)(?:\s*·\s*(.+))?$/i;
      
      let match = line.match(degreePattern) || line.match(schoolPattern);
      
      if (match) {
        const education = {
          degree: match[1]?.trim() || 'Degree',
          school: match[2]?.trim() || match[1]?.trim() || 'School',
          start: '',
          end: '',
          details: ''
        };

        // Look for dates
        for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
          const dateLine = lines[j];
          const dateMatch = dateLine.match(/(\d{4})\s*[-–]\s*(\d{4})/);
          if (dateMatch) {
            education.start = `JAN ${dateMatch[1]}`;
            education.end = `DEC ${dateMatch[2]}`;
            break;
          }
        }

        profileData.education.push(education);
      }
    }
  }

  static extractSkills(lines, profileData) {
    const skillsKeywords = ['skills', 'technologies', 'expertise', 'competencies'];
    let skillsStartIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (skillsKeywords.some(keyword => line.includes(keyword)) && line.length < 50) {
        skillsStartIndex = i + 1;
        break;
      }
    }

    if (skillsStartIndex === -1) return;

    const skillsText = lines.slice(skillsStartIndex, Math.min(skillsStartIndex + 10, lines.length))
      .join(' ').toLowerCase();

    // Common skill categories
    const technicalSkills = this.extractSkillsByCategory(skillsText, [
      'javascript', 'python', 'java', 'react', 'node.js', 'aws', 'docker', 'sql',
      'typescript', 'html', 'css', 'mongodb', 'postgresql', 'git', 'linux'
    ]);

    const softSkills = this.extractSkillsByCategory(skillsText, [
      'leadership', 'communication', 'teamwork', 'problem solving', 'management',
      'project management', 'analytical', 'creative', 'strategic planning'
    ]);

    profileData.skills.core = technicalSkills.slice(0, 8);
    profileData.skills.soft = softSkills.slice(0, 5);
  }

  static extractCertificationsAndAwards(lines, profileData) {
    const certKeywords = ['certifications', 'certificates', 'awards', 'honors', 'achievements'];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      if (certKeywords.some(keyword => line.includes(keyword)) && line.length < 50) {
        // Extract items from next few lines
        for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
          if (this.isNewSection(lines[j])) break;
          
          if (lines[j].length > 10 && lines[j].length < 100) {
            if (line.includes('cert')) {
              profileData.extras.certifications.push(lines[j]);
            } else {
              profileData.extras.awards.push(lines[j]);
            }
          }
        }
      }
    }
  }

  // =============================================
  // Helper Functions
  // =============================================

  static isNewSection(line) {
    const sectionKeywords = [
      'experience', 'education', 'skills', 'certifications', 'projects',
      'awards', 'publications', 'languages', 'volunteer'
    ];
    const lowerLine = line.toLowerCase();
    return sectionKeywords.some(keyword => lowerLine.includes(keyword)) && line.length < 50;
  }

  static looksLikeJobTitle(line) {
    return /^[A-Z][^,\n]+(?:\s+at\s+|\s+@\s+|\s+-\s+)[A-Z]/.test(line);
  }

  static extractSkillsByCategory(text, skills) {
    return skills.filter(skill => 
      text.includes(skill.toLowerCase()) || 
      text.includes(skill.replace(/\./g, '').toLowerCase())
    );
  }

  static normalizeDate(dateStr) {
    const months = {
      'january': 'JAN', 'february': 'FEB', 'march': 'MAR', 'april': 'APR',
      'may': 'MAY', 'june': 'JUN', 'july': 'JUL', 'august': 'AUG',
      'september': 'SEP', 'october': 'OCT', 'november': 'NOV', 'december': 'DEC',
      'jan': 'JAN', 'feb': 'FEB', 'mar': 'MAR', 'apr': 'APR',
      'jun': 'JUN', 'jul': 'JUL', 'aug': 'AUG', 'sep': 'SEP',
      'oct': 'OCT', 'nov': 'NOV', 'dec': 'DEC'
    };

    const match = dateStr.match(/(\w+)\s+(\d{4})/i);
    if (match) {
      const month = months[match[1].toLowerCase()] || match[1].toUpperCase().slice(0, 3);
      return `${month} ${match[2]}`;
    }
    return dateStr;
  }

  static validateAndCleanData(profileData) {
    // Clean and validate profile data
    if (profileData.profile.name) {
      profileData.profile.name = profileData.profile.name.replace(/[^\w\s]/g, '').trim();
    }

    if (profileData.profile.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileData.profile.email)) {
        delete profileData.profile.email;
      }
    }

    // Clean experience bullets
    profileData.experience.forEach(exp => {
      exp.bullets = exp.bullets
        .map(bullet => bullet.replace(/[^\w\s.,;:()\-]/g, '').trim())
        .filter(bullet => bullet.length > 10 && bullet.length < 300)
        .slice(0, 4); // Limit to 4 bullets per experience
    });

    // Remove duplicates from skills
    profileData.skills.core = [...new Set(profileData.skills.core)];
    profileData.skills.soft = [...new Set(profileData.skills.soft)];

    // Limit arrays to reasonable sizes
    profileData.experience = profileData.experience.slice(0, 5);
    profileData.education = profileData.education.slice(0, 3);
    profileData.extras.certifications = profileData.extras.certifications.slice(0, 5);
    profileData.extras.awards = profileData.extras.awards.slice(0, 3);

    return profileData;
  }

  // =============================================
  // Integration with Resume Builder
  // =============================================

  static async importToResumeBuilder(profileData, userId) {
    try {
      // Track import event
      await supabase.from('tool_events').insert({
        user_id: userId,
        event: 'linkedin_import_used',
        meta: {
          source: 'linkedin_pdf',
          data_quality: this.assessDataQuality(profileData)
        }
      });

      return {
        success: true,
        data: profileData,
        message: 'LinkedIn data imported successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static assessDataQuality(profileData) {
    let score = 0;
    let maxScore = 0;

    // Check profile completeness
    const profileFields = ['name', 'email', 'location'];
    profileFields.forEach(field => {
      maxScore += 10;
      if (profileData.profile[field]) score += 10;
    });

    // Check summary
    maxScore += 15;
    if (profileData.summary && profileData.summary.length > 50) score += 15;

    // Check experience
    maxScore += 25;
    if (profileData.experience.length > 0) {
      score += 10;
      if (profileData.experience.length >= 2) score += 10;
      if (profileData.experience.some(exp => exp.bullets.length > 0)) score += 5;
    }

    // Check education
    maxScore += 15;
    if (profileData.education.length > 0) score += 15;

    // Check skills
    maxScore += 20;
    if (profileData.skills.core.length > 0) score += 10;
    if (profileData.skills.core.length >= 3) score += 10;

    // Check extras
    maxScore += 15;
    if (profileData.extras.certifications.length > 0) score += 10;
    if (profileData.extras.awards.length > 0) score += 5;

    return {
      score: Math.round((score / maxScore) * 100),
      completeness: {
        profile: profileFields.filter(field => profileData.profile[field]).length,
        experience: profileData.experience.length,
        education: profileData.education.length,
        skills: profileData.skills.core.length
      }
    };
  }
}

export default LinkedInImportService;
