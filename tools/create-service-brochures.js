import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import services data
const servicesDataPath = path.join(__dirname, '../src/data/servicesData.js');
const servicesDataContent = fs.readFileSync(servicesDataPath, 'utf8');

// Extract service IDs from the servicesData
const serviceIdMatches = servicesDataContent.match(/id:\s*'([^']+)'/g);
const serviceIds = serviceIdMatches ? serviceIdMatches.map(match => match.match(/id:\s*'([^']+)'/)[1]) : [];

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, '../public/downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Create PDF files for all services
serviceIds.forEach(serviceId => {
  const pdfPath = path.join(downloadsDir, `${serviceId}-brochure.pdf`);
  
  // Create a simple PDF content (this is a placeholder - in real implementation, you'd generate actual PDFs)
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 12 Tf
72 720 Td
(${serviceId} Service Brochure) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
364
%%EOF`;

  fs.writeFileSync(pdfPath, pdfContent);
  console.log(`Created: ${serviceId}-brochure.pdf`);
});

console.log(`All service brochures created successfully! Total: ${serviceIds.length} services`); 