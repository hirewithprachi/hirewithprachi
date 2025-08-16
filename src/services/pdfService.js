import jsPDF from 'jspdf';

class PDFService {
  constructor() {
    this.companyName = 'Hire with Prachi';
    this.companySubtitle = 'Professional HR Solutions & AI Tools';
    this.website = 'www.hirewithprachi.com';
    this.primaryColor = [59, 130, 246]; // Blue
    this.secondaryColor = [139, 92, 246]; // Purple
  }

  createProfessionalPDF(data) {
    const {
      toolTitle,
      content,
      userDetails,
      metadata = {}
    } = data;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - 2 * margin;

    // Add professional header
    this.addHeader(doc, pageWidth);

    // Add tool title and metadata
    let yPosition = 60;
    yPosition = this.addToolTitle(doc, toolTitle, yPosition, margin);

    // Add user information
    yPosition = this.addUserInfo(doc, userDetails, yPosition, margin);

    // Add content
    yPosition = this.addContent(doc, content, yPosition, margin, maxLineWidth, pageHeight);

    // Add footer to all pages
    this.addFooter(doc);

    return doc;
  }

  addHeader(doc, pageWidth) {
    // Header background
    doc.setFillColor(...this.primaryColor);
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Company logo area (placeholder)
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 10, 25, 25, 'F');
    doc.setTextColor(...this.primaryColor);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('HP', 22, 27);

    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text(this.companyName, 50, 25);

    // Subtitle
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(this.companySubtitle, 50, 35);

    // Professional badge
    doc.setFillColor(...this.secondaryColor);
    doc.rect(pageWidth - 80, 15, 60, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('PROFESSIONAL', pageWidth - 77, 25);
  }

  addToolTitle(doc, toolTitle, yPosition, margin) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(toolTitle, margin, yPosition);

    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} at ${new Date().toLocaleTimeString()}`, margin, yPosition);

    return yPosition + 20;
  }

  addUserInfo(doc, userDetails, yPosition, margin) {
    // User info section background
    doc.setFillColor(248, 249, 250);
    doc.rect(margin - 5, yPosition - 5, 170, 35, 'F');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Client Information', margin, yPosition);

    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    const userInfo = [
      `Name: ${userDetails.name}`,
      `Email: ${userDetails.email}`,
      userDetails.company ? `Company: ${userDetails.company}` : null,
      userDetails.phone ? `Phone: ${userDetails.phone}` : null
    ].filter(Boolean);

    userInfo.forEach(info => {
      doc.text(info, margin, yPosition);
      yPosition += 5;
    });

    return yPosition + 15;
  }

  addContent(doc, content, yPosition, margin, maxLineWidth, pageHeight) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('AI Generated Report', margin, yPosition);

    yPosition += 15;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');

    // Process content with better formatting
    const lines = this.processContent(doc, content, maxLineWidth);
    
    lines.forEach((line) => {
      if (yPosition > pageHeight - 40) { // Check if we need a new page
        doc.addPage();
        this.addPageHeader(doc, margin);
        yPosition = 30;
      }

      // Check for formatting
      if (line.startsWith('##')) {
        // Section header
        doc.setFont(undefined, 'bold');
        doc.setFontSize(13);
        doc.setTextColor(...this.primaryColor);
        doc.text(line.replace('##', '').trim(), margin, yPosition);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(11);
        yPosition += 8;
      } else if (line.startsWith('•') || line.startsWith('-')) {
        // Bullet point
        doc.text('•', margin + 5, yPosition);
        doc.text(line.replace(/^[•-]\s*/, ''), margin + 12, yPosition);
        yPosition += 6;
      } else if (line.trim() === '') {
        // Empty line
        yPosition += 4;
      } else {
        // Regular text
        doc.text(line, margin, yPosition);
        yPosition += 6;
      }
    });

    return yPosition;
  }

  processContent(doc, content, maxLineWidth) {
    const paragraphs = content.split('\n');
    const lines = [];

    paragraphs.forEach(paragraph => {
      if (paragraph.trim() === '') {
        lines.push('');
        return;
      }

      const wrappedLines = doc.splitTextToSize(paragraph, maxLineWidth);
      lines.push(...wrappedLines);
    });

    return lines;
  }

  addPageHeader(doc, margin) {
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text(this.companyName, margin, 20);
  }

  addFooter(doc) {
    const totalPages = doc.internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Footer background
      doc.setFillColor(...this.primaryColor);
      doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');

      // Footer content
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      
      // Left side - Company info
      doc.text('Generated by ' + this.companyName, 15, pageHeight - 15);
      doc.text(this.website, 15, pageHeight - 8);

      // Center - Professional badge
      doc.setFont(undefined, 'bold');
      doc.text('PROFESSIONAL HR SOLUTIONS', pageWidth/2 - 35, pageHeight - 12);

      // Right side - Page number
      doc.setFont(undefined, 'normal');
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 35, pageHeight - 12);
      
      // Contact info
      doc.setFontSize(7);
      doc.text('Contact us for custom solutions', pageWidth - 55, pageHeight - 5);
    }
  }

  downloadPDF(doc, filename) {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    doc.save(`${sanitizedFilename}.pdf`);
  }

  generateFilename(toolTitle, userName) {
    const date = new Date().toISOString().split('T')[0];
    const cleanToolTitle = toolTitle.replace(/[^a-zA-Z0-9]/g, '_');
    const cleanUserName = userName.replace(/[^a-zA-Z0-9]/g, '_');
    return `${this.companyName.replace(/\s/g, '_')}_${cleanToolTitle}_${cleanUserName}_${date}`;
  }
}

export const pdfService = new PDFService();
export default pdfService;
