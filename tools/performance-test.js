import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

// Pages to test for performance
const pagesToTest = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Services', url: '/services' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact', url: '/contact' },
  { name: 'HR Cost Calculator', url: '/hr-cost-savings-calculator' },
]

async function runPerformanceTests() {
  console.log('⚡ Starting Performance Audit...\n')
  
  const browser = await chromium.launch({ headless: true })
  const results = {
    timestamp: new Date().toISOString(),
    summary: { totalPages: pagesToTest.length, recommendations: [] },
    pages: []
  }
  
  try {
    for (const pageInfo of pagesToTest) {
      console.log(`📊 Testing: ${pageInfo.name} (${pageInfo.url})`)
      
      const context = await browser.newContext()
      const page = await context.newPage()
      
      try {
        const startTime = Date.now()
        
        await page.goto(`http://localhost:5173${pageInfo.url}`, { 
          waitUntil: 'networkidle',
          timeout: 30000
        })
        
        const loadTime = Date.now() - startTime
        
        // Get performance metrics
        const metrics = await page.evaluate(() => {
          const perf = performance.getEntriesByType('navigation')[0]
          return {
            loadTime: perf.loadEventEnd - perf.navigationStart,
            domContentLoaded: perf.domContentLoadedEventEnd - perf.navigationStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            largestContentfulPaint: 0 // Would need web-vitals library
          }
        })
        
        // Count resources
        const resourceCounts = await page.evaluate(() => {
          const resources = performance.getEntriesByType('resource')
          return {
            total: resources.length,
            images: resources.filter(r => r.initiatorType === 'img').length,
            scripts: resources.filter(r => r.initiatorType === 'script').length,
            css: resources.filter(r => r.initiatorType === 'css').length
          }
        })
        
        const pageResult = {
          name: pageInfo.name,
          url: pageInfo.url,
          loadTime,
          metrics,
          resourceCounts,
          score: loadTime < 3000 ? 'Good' : loadTime < 5000 ? 'Fair' : 'Poor'
        }
        
        results.pages.push(pageResult)
        console.log(`   ✓ Load Time: ${loadTime}ms | Resources: ${resourceCounts.total}`)
        
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`)
        results.pages.push({
          name: pageInfo.name,
          url: pageInfo.url,
          error: error.message
        })
      }
      
      await context.close()
    }
    
  } catch (error) {
    console.error('Performance test failed:', error)
  } finally {
    await browser.close()
  }
  
  // Save results
  const reportPath = path.join(process.cwd(), 'performance-audit-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  
  console.log(`\n📊 Performance report saved to: ${reportPath}`)
  return results
}

export default runPerformanceTests