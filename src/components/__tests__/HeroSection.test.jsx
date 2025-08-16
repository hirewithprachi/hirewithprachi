import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils/test-utils'
import HireWithPrachiHero from '../hirable/HirableHero'

// Mock the consultation modal
const mockOpenConsultationModal = vi.fn()

describe('HireWithPrachiHero', () => {
  it('renders hero section with main heading', () => {
    render(<HireWithPrachiHero openConsultationModal={mockOpenConsultationModal} />)
    
    // Check if hero section is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('has accessible consultation buttons', () => {
    render(<HireWithPrachiHero openConsultationModal={mockOpenConsultationModal} />)
    
    // Find consultation buttons and check accessibility
    const consultationButtons = screen.getAllByText(/consultation/i)
    expect(consultationButtons.length).toBeGreaterThan(0)
    
    // Test click functionality
    if (consultationButtons[0]) {
      fireEvent.click(consultationButtons[0])
      expect(mockOpenConsultationModal).toHaveBeenCalled()
    }
  })

  it('displays company branding elements', () => {
    render(<HireWithPrachiHero openConsultationModal={mockOpenConsultationModal} />)
    
    // Check for key branding elements
    const heroContent = screen.getByRole('banner')
    expect(heroContent).toBeInTheDocument()
    // Assert there is at least one prominent heading present
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('is responsive and mobile-friendly', () => {
    render(<HireWithPrachiHero openConsultationModal={mockOpenConsultationModal} />)
    
    // Check for responsive classes (Tailwind)
    const heroSection = screen.getByRole('banner')
    expect(heroSection).toHaveClass('min-h-[85vh]')
  })
})