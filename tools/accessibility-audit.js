import { chromium } from 'playwright'
import { injectAxe, checkA11y, getViolations } from '@axe-core/playwright'
import fs from 'fs'
import path from 'path'

// Pages to audit for accessibility
const pagesToAudit = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Services', url: '/services' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact', url: '/contact' },
  { name: 'HR Cost Calculator', url: '/hr-cost-savings-calculator' },
  { name: 'ROI Calculator', url: '/roi-calculator' },
  { name: 'Employee Engagement Calculator', url: '/employee-engagement-calculator' },
  { name: 'Resources', url: '/resources' },
  { name: 'Admin Login', url: '/admin/login' },
]

// Mobile viewports to test
const mobileViewports = [
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Samsung Galaxy S20', width: 360, height: 800 },
  { name: 'iPad', width: 768, height: 1024 },
]

async function runAccessibilityAudit() {
  console.log('🔍 Starting Accessibility and Mobile Audit...\n')
  
  const browser = await chromium.launch({ headless: true })
  const results = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: pagesToAudit.length,
      totalViolations: 0,
      criticalViolations: 0,
      seriousViolations: 0,
      moderateViolations: 0,
      minorViolations: 0,
    },
    pages: [],
    mobileResults: [],
    recommendations: []
  }

  try {
    // Test each page for accessibility
    for (const pageInfo of pagesToAudit) {
      console.log(`📄 Auditing: ${pageInfo.name} (${pageInfo.url})`)
      
      const context = await browser.newContext()
      const page = await context.newPage()
      
      try {
        // Navigate to page with timeout
        await page.goto(`http://localhost:5173${pageInfo.url}`, { 
          waitUntil: 'networkidle', 
          timeout: 30000 
        })
        
        // Wait for page to be fully loaded
        await page.waitForTimeout(2000)
        
        // Inject axe-core
        await injectAxe(page)
        
        // Run accessibility checks
        const violations = await getViolations(page)
        
        // Categorize violations
        const pageResult = {
          name: pageInfo.name,
          url: pageInfo.url,
          violations: violations.length,
          critical: violations.filter(v => v.impact === 'critical').length,
          serious: violations.filter(v => v.impact === 'serious').length,
          moderate: violations.filter(v => v.impact === 'moderate').length,
          minor: violations.filter(v => v.impact === 'minor').length,
          details: violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.length
          }))
        }
        
        results.pages.push(pageResult)
        results.summary.totalViolations += violations.length
        results.summary.criticalViolations += pageResult.critical
        results.summary.seriousViolations += pageResult.serious
        results.summary.moderateViolations += pageResult.moderate
        results.summary.minorViolations += pageResult.minor
        
        console.log(`   ✓ Found ${violations.length} violations`)
        
      } catch (error) {
        console.log(`   ❌ Error auditing ${pageInfo.name}: ${error.message}`)
        results.pages.push({
          name: pageInfo.name,
          url: pageInfo.url,
          error: error.message,
          violations: 0
        })
      }
      
      await context.close()
    }
    
    // Test mobile responsiveness
    console.log('\n📱 Testing Mobile Responsiveness...')
    
    for (const viewport of mobileViewports) {
      console.log(`📱 Testing: ${viewport.name} (${viewport.width}x${viewport.height})`)
      
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
      })
      const page = await context.newPage()
      
      try {
        // Test main pages on mobile
        const testPages = ['/']
        
        for (const testUrl of testPages) {
          await page.goto(`http://localhost:5173${testUrl}`, { 
            waitUntil: 'networkidle',
            timeout: 30000
          })
          
          // Wait for content to load
          await page.waitForTimeout(2000)
          
          // Check for mobile-specific issues
          const mobileIssues = await page.evaluate(() => {
            const issues = []
            
            // Check if text is readable (not too small)
            const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6')
            let smallTextCount = 0
            textElements.forEach(el => {
              const style = window.getComputedStyle(el)
              const fontSize = parseFloat(style.fontSize)
              if (fontSize < 14) smallTextCount++
            })
            
            if (smallTextCount > 0) {
              issues.push(`${smallTextCount} elements with text smaller than 14px`)
            }
            
            // Check for horizontal scrolling
            if (document.body.scrollWidth > window.innerWidth) {
              issues.push('Horizontal scrolling detected')
            }
            
            // Check touch target sizes
            const buttons = document.querySelectorAll('button, a, input[type="submit"], input[type="button"]')
            let smallTargetCount = 0
            buttons.forEach(btn => {
              const rect = btn.getBoundingClientRect()
              if (rect.width < 44 || rect.height < 44) smallTargetCount++
            })
            
            if (smallTargetCount > 0) {
              issues.push(`${smallTargetCount} touch targets smaller than 44px`)
            }
            
            return issues
          })
          
          results.mobileResults.push({
            viewport: viewport.name,
            url: testUrl,
            issues: mobileIssues,
            hasIssues: mobileIssues.length > 0
          })
        }
        
      } catch (error) {
        console.log(`   ❌ Error testing ${viewport.name}: ${error.message}`)
      }
      
      await context.close()
    }
    
  } catch (error) {
    console.error('Audit failed:', error)
  } finally {
    await browser.close()
  }
  
  // Generate recommendations
  generateRecommendations(results)
  
  // Save results
  const reportPath = path.join(process.cwd(), 'accessibility-audit-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  
  // Print summary
  printSummary(results)
  
  console.log(`\n📊 Full report saved to: ${reportPath}`)
  
  return results
}

function generateRecommendations(results) {
  const recommendations = []
  
  // Analyze common issues
  const allViolations = results.pages.flatMap(p => p.details || [])
  const violationCounts = {}
  
  allViolations.forEach(v => {
    violationCounts[v.id] = (violationCounts[v.id] || 0) + 1
  })
  
  // Top issues to fix
  const topIssues = Object.entries(violationCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
  
  topIssues.forEach(([issueId, count]) => {
    const violation = allViolations.find(v => v.id === issueId)
    if (violation) {
      recommendations.push({
        priority: violation.impact === 'critical' ? 'HIGH' : violation.impact === 'serious' ? 'MEDIUM' : 'LOW',
        issue: violation.description,
        solution: violation.help,
        affectedPages: count,
        learnMore: violation.helpUrl
      })
    }
  })
  
  // Mobile issues
  const mobileIssues = results.mobileResults.filter(r => r.hasIssues)
  if (mobileIssues.length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      issue: 'Mobile usability issues detected',
      solution: 'Review mobile design patterns and ensure proper responsive design',
      affectedPages: mobileIssues.length,
      details: mobileIssues
    })
  }
  
  results.recommendations = recommendations
}

function printSummary(results) {
  console.log('\n' + '='.repeat(60))
  console.log('🔍 ACCESSIBILITY AUDIT SUMMARY')
  console.log('='.repeat(60))
  
  console.log(`📄 Pages Audited: ${results.summary.totalPages}`)
  console.log(`🚨 Total Violations: ${results.summary.totalViolations}`)
  console.log(`💥 Critical: ${results.summary.criticalViolations}`)
  console.log(`🔴 Serious: ${results.summary.seriousViolations}`)
  console.log(`🟡 Moderate: ${results.summary.moderateViolations}`)
  console.log(`🔵 Minor: ${results.summary.minorViolations}`)
  
  console.log('\n📱 MOBILE AUDIT SUMMARY')
  console.log('-'.repeat(40))
  const mobileIssues = results.mobileResults.filter(r => r.hasIssues)
  console.log(`Mobile Issues Found: ${mobileIssues.length}`)
  
  if (results.recommendations.length > 0) {
    console.log('\n🎯 TOP RECOMMENDATIONS')
    console.log('-'.repeat(40))
    results.recommendations.slice(0, 3).forEach((rec, i) => {
      console.log(`${i + 1}. [${rec.priority}] ${rec.issue}`)
      console.log(`   Solution: ${rec.solution}`)
      console.log(`   Affected: ${rec.affectedPages} pages`)
      console.log('')
    })
  }
  
  // Overall score
  const totalPossibleScore = results.summary.totalPages * 100
  const violationPenalty = (results.summary.criticalViolations * 20) + 
                          (results.summary.seriousViolations * 10) + 
                          (results.summary.moderateViolations * 5) + 
                          (results.summary.minorViolations * 1)
  const score = Math.max(0, totalPossibleScore - violationPenalty)
  const percentage = Math.round((score / totalPossibleScore) * 100)
  
  console.log(`🎯 Overall Accessibility Score: ${percentage}%`)
  
  if (percentage >= 90) {
    console.log('✅ Excellent! Your site has great accessibility.')
  } else if (percentage >= 70) {
    console.log('⚠️  Good, but there\'s room for improvement.')
  } else {
    console.log('❌ Needs significant accessibility improvements.')
  }
  
  console.log('='.repeat(60))
}

// Run the audit if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAccessibilityAudit().catch(console.error)
}

export default runAccessibilityAudit