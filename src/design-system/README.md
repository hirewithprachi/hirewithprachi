# Hire With Prachi Design System

A comprehensive design system built for the Hire With Prachi website, ensuring consistent UI/UX across all components and pages.

## 🎨 Design Principles

1. **Consistency** - Unified visual language across all touchpoints
2. **Accessibility** - WCAG AA compliant components
3. **Performance** - Optimized for speed and efficiency
4. **Scalability** - Easy to extend and maintain
5. **User-Centric** - Designed with user experience in mind

## 📦 Components

### Core Components

#### Button
- **Variants**: primary, secondary, accent, success, destructive, ghost, link, outline
- **Sizes**: sm, md, lg, xl, icon
- **Features**: Loading states, icons, animations, full-width option

```jsx
import { Button } from '../design-system/components'

<Button variant="primary" size="lg" loading={isLoading}>
  Submit Form
</Button>
```

#### Input & Textarea
- **Variants**: default, error, success, warning
- **Features**: Labels, helper text, icons, password toggle, validation states

```jsx
import { Input } from '../design-system/components'

<Input
  label="Email Address"
  type="email"
  required
  error={emailError}
  helperText="We'll never share your email"
/>
```

#### Card
- **Variants**: default, elevated, outlined, ghost, gradient
- **Specialized**: StatsCard, FeatureCard, TestimonialCard
- **Features**: Interactive states, animations, flexible layout

```jsx
import { FeatureCard } from '../design-system/components'

<FeatureCard
  title="HR Consulting"
  description="Expert guidance for your HR needs"
  icon={<ConsultingIcon />}
  action={<Button>Learn More</Button>}
/>
```

#### Modal
- **Types**: Modal, ConfirmationModal, AlertModal, FormModal
- **Features**: Keyboard navigation, overlay click handling, animations

```jsx
import { ConfirmationModal } from '../design-system/components'

<ConfirmationModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  variant="destructive"
/>
```

## 🎯 Design Tokens

Centralized design tokens ensure consistency across the entire system.

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Accent**: Green gradient (#84cc16 to #4d7c0f)
- **Semantic**: Success, Error, Warning
- **Neutral**: Gray scale

### Typography
- **Font Family**: Inter (system fallbacks)
- **Sizes**: xs (12px) to 7xl (72px)
- **Weights**: thin (100) to black (900)

### Spacing
- **Scale**: 0 to 96 (0px to 384px)
- **Based on**: 4px grid system

### Shadows & Borders
- **Shadows**: sm to 2xl
- **Border Radius**: none to full
- **Focus States**: 2px ring with offset

## 🔧 Usage

### Import Components
```jsx
// Individual imports (recommended)
import { Button, Input, Card } from '../design-system/components'

// Or specific component
import { Button } from '../design-system/components/Button'
```

### Use Design Tokens
```jsx
import { designTokens, getColor } from '../design-system/tokens'

const primaryColor = getColor('primary.500')
const spacing = designTokens.spacing[4]
```

### Styling with CVA
Components use `class-variance-authority` for consistent variant management:

```jsx
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', lg: '...' }
  }
})
```

## ♿ Accessibility

All components follow WCAG AA guidelines:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Minimum 4.5:1 ratio
- **Semantic HTML**: Proper heading hierarchy

## 📱 Responsive Design

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Mobile-First**: All components designed mobile-first
- **Touch Targets**: Minimum 44px touch targets
- **Flexible Grid**: Based on CSS Grid and Flexbox

## 🧪 Testing

Components are tested with:
- **Unit Tests**: Vitest + Testing Library
- **Accessibility Tests**: axe-core integration
- **Visual Tests**: Chromatic (future)
- **E2E Tests**: Cypress

## 📈 Performance

- **Bundle Size**: Tree-shakeable exports
- **Animations**: Optimized with Framer Motion
- **Images**: Lazy loading and optimization
- **CSS**: Tailwind purging for minimal CSS

## 🔄 Updates & Versioning

Design system follows semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

## 📚 Documentation

- **Storybook**: Interactive component documentation (future)
- **Design Specs**: Figma integration (future)
- **Usage Examples**: Code snippets and best practices

## 🤝 Contributing

1. Follow existing patterns and conventions
2. Add proper TypeScript types
3. Include accessibility considerations
4. Write tests for new components
5. Update documentation

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Build design system
npm run build

# Lint code
npm run lint
```

---

For questions or contributions, please refer to the main project documentation.