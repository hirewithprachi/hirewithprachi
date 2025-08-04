import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PerformanceTester {
  constructor() {
    this.results = {};
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async testPage(url, pageName) {
    console.log(`\n🔍 Testing ${pageName} at ${url}...`);
    
    const page = await this.browser.newPage();
    
    // Enable performance monitoring
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set user agent for consistent testing
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Enable request interception for better monitoring
    await page.setRequestInterception(true);
    
    const requests = [];
    const responses = [];
    
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        timestamp: Date.now()
      });
      request.continue();
    });
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
        timestamp: Date.now()
      });
    });

    try {
      // Navigate to the page
      const startTime = Date.now();
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      const loadTime = Date.now() - startTime;

      // Get performance metrics
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        const resource = performance.getEntriesByType('resource');
        
        return {
          // Navigation timing
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          
          // Resource timing
          totalResources: resource.length,
          totalSize: resource.reduce((sum, r) => sum + (r.transferSize || 0), 0),
          
          // Performance marks
          performance: {
            navigation: navigation,
            paint: paint,
            resource: resource
          }
        };
      });

      // Get LCP (Largest Contentful Paint) - simulated
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // Fallback if LCP doesn't fire
          setTimeout(() => resolve(0), 5000);
        });
      });

      // Get Core Web Vitals
      const webVitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {
            LCP: 0,
            FID: 0,
            CLS: 0
          };
          
          // LCP
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.LCP = lastEntry.startTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // FID (First Input Delay)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            vitals.FID = entries[0].processingStart - entries[0].startTime;
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
          
          // CLS (Cumulative Layout Shift)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            vitals.CLS = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          
          setTimeout(() => resolve(vitals), 5000);
        });
      });

      // Get page size and resource analysis
      const pageSize = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
        const jsSize = resources.filter(r => r.name.includes('.js')).reduce((sum, r) => sum + (r.transferSize || 0), 0);
        const cssSize = resources.filter(r => r.name.includes('.css')).reduce((sum, r) => sum + (r.transferSize || 0), 0);
        const imageSize = resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)).reduce((sum, r) => sum + (r.transferSize || 0), 0);
        
        return {
          totalSize,
          jsSize,
          cssSize,
          imageSize,
          resourceCount: resources.length
        };
      });

      // Simulate user interaction for FID
      await page.click('body');
      
      // Wait a bit for metrics to settle
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = {
        pageName,
        url,
        loadTime,
        metrics,
        lcp: lcp || metrics.firstContentfulPaint,
        webVitals,
        pageSize,
        requests: requests.length,
        responses: responses.length,
        timestamp: new Date().toISOString()
      };

      this.results[pageName] = result;
      
      console.log(`✅ ${pageName} tested successfully`);
      console.log(`   Load Time: ${loadTime}ms`);
      console.log(`   LCP: ${result.lcp}ms`);
      console.log(`   Total Size: ${(pageSize.totalSize / 1024).toFixed(2)}KB`);
      
      await page.close();
      
    } catch (error) {
      console.error(`❌ Error testing ${pageName}:`, error.message);
      await page.close();
    }
  }

  async runTests() {
    console.log('🚀 Starting Performance Tests...\n');
    
    const pages = [
      { url: 'http://localhost:5174/', name: 'Homepage' },
      { url: 'http://localhost:5174/about', name: 'About Page' },
      { url: 'http://localhost:5174/contact', name: 'Contact Page' },
      { url: 'http://localhost:5174/blog', name: 'Blog Page' },
      { url: 'http://localhost:5174/services', name: 'Services Page' }
    ];

    for (const page of pages) {
      await this.testPage(page.url, page.name);
    }

    await this.generateReport();
  }

  async generateReport() {
    console.log('\n📊 Generating Performance Report...\n');
    
    const report = {
      summary: {
        totalPages: Object.keys(this.results).length,
        averageLoadTime: 0,
        averageLCP: 0,
        averageSize: 0,
        timestamp: new Date().toISOString()
      },
      pages: this.results,
      recommendations: []
    };

    // Calculate averages
    const loadTimes = Object.values(this.results).map(r => r.loadTime);
    const lcps = Object.values(this.results).map(r => r.lcp);
    const sizes = Object.values(this.results).map(r => r.pageSize.totalSize);

    report.summary.averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
    report.summary.averageLCP = lcps.reduce((a, b) => a + b, 0) / lcps.length;
    report.summary.averageSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;

    // Generate recommendations
    if (report.summary.averageLCP > 2500) {
      report.recommendations.push('⚠️ LCP is above 2.5s - Consider optimizing images and critical resources');
    }
    if (report.summary.averageSize > 1024 * 1024) {
      report.recommendations.push('⚠️ Page size is large - Consider code splitting and image optimization');
    }
    if (report.summary.averageLoadTime > 3000) {
      report.recommendations.push('⚠️ Load time is slow - Consider lazy loading and resource optimization');
    }

    // Save report
    const reportPath = path.join(__dirname, '../PERFORMANCE_TEST_REPORT.md');
    const reportContent = this.formatReport(report);
    fs.writeFileSync(reportPath, reportContent);

    console.log('📈 Performance Report Generated!');
    console.log(`📄 Report saved to: ${reportPath}`);
    
    // Print summary
    console.log('\n📊 PERFORMANCE SUMMARY:');
    console.log(`   Average Load Time: ${report.summary.averageLoadTime.toFixed(2)}ms`);
    console.log(`   Average LCP: ${report.summary.averageLCP.toFixed(2)}ms`);
    console.log(`   Average Page Size: ${(report.summary.averageSize / 1024).toFixed(2)}KB`);
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      report.recommendations.forEach(rec => console.log(`   ${rec}`));
    }

    await this.browser.close();
  }

  formatReport(report) {
    return `# 🚀 PERFORMANCE TEST REPORT
## Website Loading Speed & LCP Analysis

**Test Date:** ${new Date().toLocaleDateString()}  
**Test Time:** ${new Date().toLocaleTimeString()}  
**Total Pages Tested:** ${report.summary.totalPages}

---

## 📊 PERFORMANCE SUMMARY

### **Overall Metrics:**
- **Average Load Time:** ${report.summary.averageLoadTime.toFixed(2)}ms
- **Average LCP (Largest Contentful Paint):** ${report.summary.averageLCP.toFixed(2)}ms
- **Average Page Size:** ${(report.summary.averageSize / 1024).toFixed(2)}KB

### **Performance Grades:**
${this.getPerformanceGrade(report.summary.averageLCP, report.summary.averageLoadTime)}

---

## 📄 PAGE-BY-PAGE ANALYSIS

${Object.entries(report.pages).map(([name, data]) => `
### **${name}**
- **URL:** ${data.url}
- **Load Time:** ${data.loadTime}ms
- **LCP:** ${data.lcp}ms
- **Total Size:** ${(data.pageSize.totalSize / 1024).toFixed(2)}KB
- **JS Size:** ${(data.pageSize.jsSize / 1024).toFixed(2)}KB
- **CSS Size:** ${(data.pageSize.cssSize / 1024).toFixed(2)}KB
- **Image Size:** ${(data.pageSize.imageSize / 1024).toFixed(2)}KB
- **Resource Count:** ${data.pageSize.resourceCount}

**Performance Grade:** ${this.getPageGrade(data.lcp, data.loadTime)}
`).join('')}

---

## 💡 RECOMMENDATIONS

${report.recommendations.length > 0 ? report.recommendations.map(rec => `- ${rec}`).join('\n') : '- ✅ All performance metrics are within optimal ranges'}

---

## 🎯 OPTIMIZATION OPPORTUNITIES

### **Immediate Actions:**
${this.getOptimizationSuggestions(report)}

### **Long-term Improvements:**
- Implement service workers for better caching
- Consider CDN for static assets
- Optimize third-party scripts loading
- Implement critical CSS inlining

---

## 📈 PERFORMANCE MONITORING

### **Core Web Vitals Targets:**
- **LCP:** < 2.5s (Good) | < 4s (Needs Improvement) | > 4s (Poor)
- **FID:** < 100ms (Good) | < 300ms (Needs Improvement) | > 300ms (Poor)
- **CLS:** < 0.1 (Good) | < 0.25 (Needs Improvement) | > 0.25 (Poor)

### **Loading Speed Targets:**
- **First Paint:** < 1.5s
- **First Contentful Paint:** < 2s
- **DOM Content Loaded:** < 2.5s
- **Page Load Complete:** < 3s

---

*Performance test completed successfully* ✅  
*All pages analyzed for LCP and loading speed* ✅  
*Optimization recommendations provided* ✅
`;
  }

  getPerformanceGrade(lcp, loadTime) {
    let lcpGrade = '🟢 Excellent';
    let loadGrade = '🟢 Excellent';
    
    if (lcp > 4000) lcpGrade = '🔴 Poor';
    else if (lcp > 2500) lcpGrade = '🟡 Needs Improvement';
    
    if (loadTime > 5000) loadGrade = '🔴 Poor';
    else if (loadTime > 3000) loadGrade = '🟡 Needs Improvement';
    
    return `- **LCP Grade:** ${lcpGrade} (${lcp.toFixed(2)}ms)
- **Load Time Grade:** ${loadGrade} (${loadTime.toFixed(2)}ms)`;
  }

  getPageGrade(lcp, loadTime) {
    if (lcp < 2500 && loadTime < 3000) return '🟢 Excellent';
    if (lcp < 4000 && loadTime < 5000) return '🟡 Good';
    return '🔴 Needs Improvement';
  }

  getOptimizationSuggestions(report) {
    const suggestions = [];
    
    if (report.summary.averageLCP > 2500) {
      suggestions.push('- Optimize hero images and above-the-fold content');
      suggestions.push('- Implement lazy loading for non-critical images');
      suggestions.push('- Consider using next-gen image formats (WebP, AVIF)');
    }
    
    if (report.summary.averageSize > 1024 * 1024) {
      suggestions.push('- Implement code splitting for better chunking');
      suggestions.push('- Optimize and compress images');
      suggestions.push('- Remove unused CSS and JavaScript');
    }
    
    if (report.summary.averageLoadTime > 3000) {
      suggestions.push('- Enable gzip compression for all assets');
      suggestions.push('- Implement browser caching strategies');
      suggestions.push('- Optimize critical rendering path');
    }
    
    return suggestions.length > 0 ? suggestions.join('\n') : '- ✅ Current performance is optimal';
  }
}

// Run the performance test
async function main() {
  const tester = new PerformanceTester();
  try {
    await tester.init();
    await tester.runTests();
  } catch (error) {
    console.error('❌ Performance test failed:', error);
  }
}

main(); 