import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import ResourceManager from '../../components/admin/ResourceManager'

// Mock downloadService methods used by ResourceManager
vi.mock('../../services/downloadService', () => {
  return {
    downloadService: {
      generateResource: vi.fn(async () => ({ success: true, data: { id: 'r1' } })),
      getResources: vi.fn(async () => ({ success: true, data: [] })),
      getCategories: vi.fn(async () => ({ success: true, data: [{ id: 'c1', name: 'HR Templates' }] })),
      getDownloadStats: vi.fn(async () => ({ success: true, stats: { totalDownloads: 0, completedDownloads: 0, uniqueUsers: 0, conversionRate: '0.0%' }, resourceStats: [], downloads: [] })),
      createCategory: vi.fn(async () => ({ success: true, data: { id: 'c2' } })),
      updateCategory: vi.fn(async () => ({ success: true, data: { id: 'c1' } })),
      deleteCategory: vi.fn(async () => ({ success: true }))
    }
  }
})

describe('Resource Generation Admin Flow', () => {
  const addNotification = vi.fn()

  const renderManager = () => render(<ResourceManager onClose={() => {}} addNotification={addNotification} />)

  beforeEach(() => {
    addNotification.mockClear()
  })

  it('renders and can generate a resource via AI', async () => {
    renderManager()

    // Wait for initial data load
    await waitFor(() => expect(screen.getByText('Resource Manager')).toBeInTheDocument())

    // Switch to Generate tab
    const tabBtn = screen.getAllByRole('button', { name: 'Generate Resource' })[0]
    fireEvent.click(tabBtn)
    const panel = screen.getByRole('heading', { name: 'AI-Powered Resource Generation' }).closest('div')

    // Fill form
    fireEvent.change(within(panel).getByLabelText('Title *'), { target: { value: 'Test Resource' } })
    fireEvent.change(within(panel).getByLabelText('Category *'), { target: { value: 'c1' } })
    fireEvent.change(within(panel).getByLabelText('Prompt / Description *'), { target: { value: 'Create a test hr guide' } })

    // Submit within the panel
    const submitBtn = within(panel).getByRole('button', { name: 'Generate Resource' })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(addNotification).toHaveBeenCalled()
    })
  })
})


