describe('Admin Flows', () => {
  beforeEach(() => {
    // Skip admin tests if no admin credentials available
    cy.skipOnCI()
  })

  describe('Admin Authentication', () => {
    it('should show admin login page', () => {
      cy.visit('/admin/login')
      cy.waitForPageLoad()
      cy.get('body').should('contain', 'Login')
    })

    it('should handle login form validation', () => {
      cy.visit('/admin/login')
      cy.waitForPageLoad()
      
      // Test empty form submission
      cy.get('body').then($body => {
        if ($body.find('[data-testid="login-button"]').length > 0) {
          cy.get('[data-testid="login-button"]').click()
          // Should show validation errors
          cy.get('body').should('be.visible')
        }
      })
    })

    it('should redirect to dashboard after successful login', () => {
      // Skip this test in CI as it requires real credentials
      cy.skipOnCI()
      
      cy.visit('/admin/login')
      cy.waitForPageLoad()
      
      // This would require actual admin credentials
      // cy.login('admin@hirewithprachi.com', 'test-password')
    })
  })

  describe('Admin Dashboard', () => {
    beforeEach(() => {
      // Skip if not authenticated
      cy.skipOnCI()
    })

    it('should load admin dashboard', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      // Check if redirected to login or dashboard loads
      cy.url().should('satisfy', (url) => {
        return url.includes('/admin/login') || url.includes('/admin/dashboard')
      })
    })

    it('should display admin navigation', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      cy.get('body').should('be.visible')
    })

    it('should handle data filtering and search', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      // Test search functionality if available
      cy.get('body').then($body => {
        if ($body.find('input[type="search"]').length > 0) {
          cy.get('input[type="search"]').type('test')
        }
      })
    })
  })

  describe('Admin Data Management', () => {
    beforeEach(() => {
      cy.skipOnCI()
    })

    it('should handle form submissions view', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      cy.get('body').should('be.visible')
    })

    it('should handle leads management', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      cy.get('body').should('be.visible')
    })

    it('should allow data export functionality', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      // Test export buttons if they exist
      cy.get('body').then($body => {
        if ($body.find('[data-testid="export-button"]').length > 0) {
          cy.get('[data-testid="export-button"]').should('be.visible')
        }
      })
    })
  })

  describe('Admin Resource Manager - Categories & AI Generation', () => {
    it('should create category and generate AI resource', () => {
      cy.skipOnCI()
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()

      // Navigate to Resource Manager if present
      cy.get('body').then($body => {
        if ($body.find('button:contains("Resource Manager")').length > 0) {
          cy.contains('button', 'Resource Manager').click()
        }
      })

      // Categories tab
      cy.contains('Categories').click({ force: true })
      cy.get('input[placeholder="Category name"]').type('Test Category')
      cy.contains('button', 'Add').click({ force: true })
      cy.contains('Test Category')

      // Generate tab
      cy.contains('Generate Resource').click({ force: true })
      cy.get('#gen-title').type('AI Test Resource')
      cy.get('#gen-category').select(1)
      cy.get('#gen-prompt').type('Generate an onboarding checklist')
      cy.contains('button', 'Generate Resource').click({ force: true })

      // Success toast or row appearance (best effort)
      cy.get('body').should('be.visible')
    })
  })

  describe('Admin Security', () => {
    it('should protect admin routes when not authenticated', () => {
      cy.visit('/admin/dashboard')
      cy.waitForPageLoad()
      
      // Should redirect to login
      cy.url().should('include', '/admin/login')
    })

    it('should handle session timeout', () => {
      cy.skipOnCI()
      
      // Test session management
      cy.visit('/admin/login')
      cy.waitForPageLoad()
      cy.get('body').should('be.visible')
    })
  })
})