// Design System Components Export
// Centralized export file for all design system components

// Core Components
export { Button, buttonVariants } from './Button'
export { Input, Textarea, Label, HelperText, inputVariants } from './Input'
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  StatsCard,
  FeatureCard,
  TestimonialCard,
  cardVariants 
} from './Card'

export { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter,
  ConfirmationModal,
  AlertModal,
  FormModal
} from './Modal'

// Design Tokens
export { designTokens, getColor, getSpacing, getFontSize, getBorderRadius, getShadow } from '../tokens'

// Component Categories for Storybook/Documentation
export const componentCategories = {
  'Form Controls': [
    'Button',
    'Input', 
    'Textarea',
    'Label',
  ],
  'Data Display': [
    'Card',
    'StatsCard',
    'FeatureCard', 
    'TestimonialCard',
  ],
  'Feedback': [
    'Modal',
    'ConfirmationModal',
    'AlertModal',
  ],
  'Layout': [
    'CardHeader',
    'CardContent',
    'CardFooter',
  ],
}

// Component Usage Guidelines
export const usageGuidelines = {
  Button: {
    description: 'Use for actions that users can perform. Primary for main actions, secondary for supporting actions.',
    examples: ['Form submissions', 'Navigation', 'Actions'],
    accessibility: 'Always include proper aria-labels and ensure keyboard navigation works.',
  },
  Input: {
    description: 'Use for text input with proper validation states and helper text.',
    examples: ['Contact forms', 'Search', 'User data entry'],
    accessibility: 'Include labels, proper input types, and validation feedback.',
  },
  Card: {
    description: 'Use to group related content. Choose variants based on content importance.',
    examples: ['Service listings', 'Statistics', 'Content sections'],
    accessibility: 'Ensure proper heading hierarchy and focus management.',
  },
  Modal: {
    description: 'Use for important actions that require user attention or to display additional content.',
    examples: ['Confirmations', 'Forms', 'Detailed information'],
    accessibility: 'Manage focus properly and provide escape mechanisms.',
  },
}