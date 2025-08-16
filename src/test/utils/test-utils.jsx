import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '../../lib/AuthContext'

// Custom render function that includes all necessary providers
export function renderWithProviders(ui, options = {}) {
  const {
    initialEntries = ['/'],
    ...renderOptions
  } = options

  function Wrapper({ children }) {
    return (
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Mock calculator data for testing
export const mockCalculatorData = {
  hrCostSavings: {
    employees: '50',
    currentCost: '100000',
    expectedSavings: '20'
  },
  roi: {
    investment: '50000',
    expectedReturn: '75000',
    timeframe: '12'
  },
  employeeEngagement: {
    scores: [4, 5, 3, 4, 5]
  }
}

// Mock form data
export const mockFormData = {
  contact: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    message: 'Test message'
  },
  lead: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    company: 'Another Company',
    designation: 'HR Manager',
    employees: '100'
  }
}



// Test utilities for async operations
export const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const createMockEvent = (overrides = {}) => ({
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  target: { value: '' },
  ...overrides
})

// Re-export everything from testing-library
export * from '@testing-library/react'
export { renderWithProviders as render }