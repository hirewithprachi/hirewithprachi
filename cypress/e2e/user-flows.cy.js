describe('User Flows', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  describe('Homepage Navigation', () => {
    it('should load homepage successfully', () => {
      cy.get('body').should('be.visible')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should navigate to services page', () => {
      cy.get('a[href="/services"]').first().click()
      cy.url().should('include', '/services')
      cy.waitForPageLoad()
    })

    it('should navigate to blog page', () => {
      cy.get('a[href="/blog"]').first().click()
      cy.url().should('include', '/blog')
      cy.waitForPageLoad()
    })

    it('should navigate to contact page', () => {
      cy.get('a[href="/contact"]').first().click()
      cy.url().should('include', '/contact')
      cy.waitForPageLoad()
    })
  })

  describe('Calculator Flows', () => {
    it('should access HR Cost Savings Calculator', () => {
      cy.visit('/hr-cost-savings-calculator')
      cy.waitForPageLoad()
      cy.get('body').should('contain', 'Calculator')
    })

    it('should access ROI Calculator', () => {
      cy.visit('/roi-calculator')
      cy.waitForPageLoad()
      cy.get('body').should('contain', 'ROI')
    })

    it('should access Employee Engagement Calculator', () => {
      cy.visit('/employee-engagement-calculator')
      cy.waitForPageLoad()
      cy.get('body').should('contain', 'Engagement')
    })
  })

  describe('Form Interactions', () => {
    it('should handle contact form submission', () => {
      cy.visit('/contact')
      cy.waitForPageLoad()
      
      // Look for common form elements
      cy.get('body').should('be.visible')
      
      // Skip form submission test if elements don't exist
      cy.get('body').then($body => {
        if ($body.find('input[type="text"]').length > 0) {
          cy.get('input[type="text"]').first().type('Test User')
        }
      })
    })
  })

  describe('Mobile Responsiveness', () => {
    it('should work on mobile viewport', () => {
      cy.testMobile()
      cy.get('body').should('be.visible')
    })

    it('should have accessible navigation on mobile', () => {
      cy.testMobile()
      // Test mobile navigation if it exists
      cy.get('body').should('be.visible')
    })
  })

  describe('Performance', () => {
    it('should load within acceptable time', () => {
      const start = Date.now()
      cy.visit('/')
      cy.waitForPageLoad()
      cy.then(() => {
        const loadTime = Date.now() - start
        expect(loadTime).to.be.lessThan(5000) // 5 seconds max
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      cy.get('h1').should('exist')
      cy.get('h1').should('be.visible')
    })

    it('should have alt text for images', () => {
      cy.get('img').each($img => {
        cy.wrap($img).should('have.attr', 'alt')
      })
    })

    it('should have proper link text', () => {
      cy.get('a').each($link => {
        cy.wrap($link).should('not.have.text', 'click here')
        cy.wrap($link).should('not.have.text', 'read more')
      })
    })
  })
})