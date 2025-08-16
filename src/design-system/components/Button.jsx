import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Button variants using CVA for consistent styling
const buttonVariants = cva(
  // Base styles
  `
    inline-flex items-center justify-center gap-2 
    rounded-lg border font-medium transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    active:scale-[0.98]
  `,
  {
    variants: {
      variant: {
        // Primary button - main CTA
        primary: `
          bg-gradient-to-r from-primary-600 to-primary-700 
          text-white border-transparent shadow-md
          hover:from-primary-700 hover:to-primary-800 hover:shadow-lg
          focus-visible:ring-primary-500
        `,
        // Secondary button - supporting actions
        secondary: `
          bg-white text-primary-700 border-primary-200 shadow-sm
          hover:bg-primary-50 hover:border-primary-300 hover:shadow-md
          focus-visible:ring-primary-500
        `,
        // Accent button - special highlights
        accent: `
          bg-gradient-to-r from-accent-500 to-accent-600 
          text-gray-900 border-transparent shadow-md
          hover:from-accent-600 hover:to-accent-700 hover:shadow-lg
          focus-visible:ring-accent-500
        `,
        // Success button - positive actions
        success: `
          bg-gradient-to-r from-success-600 to-success-700 
          text-white border-transparent shadow-md
          hover:from-success-700 hover:to-success-800 hover:shadow-lg
          focus-visible:ring-success-500
        `,
        // Destructive button - dangerous actions
        destructive: `
          bg-gradient-to-r from-error-600 to-error-700 
          text-white border-transparent shadow-md
          hover:from-error-700 hover:to-error-800 hover:shadow-lg
          focus-visible:ring-error-500
        `,
        // Ghost button - minimal style
        ghost: `
          text-gray-700 border-transparent
          hover:bg-gray-100 hover:text-gray-900
          focus-visible:ring-gray-500
        `,
        // Link button - text-like appearance
        link: `
          text-primary-600 border-transparent underline-offset-4
          hover:underline hover:text-primary-700
          focus-visible:ring-primary-500
        `,
        // Outline button - bordered style
        outline: `
          bg-transparent text-gray-700 border-gray-300
          hover:bg-gray-50 hover:border-gray-400
          focus-visible:ring-gray-500
        `,
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

const Button = forwardRef(({ 
  className, 
  variant, 
  size, 
  fullWidth,
  asChild = false, 
  children, 
  disabled,
  loading = false,
  loadingText = 'Loading...',
  leftIcon,
  rightIcon,
  animate = true,
  ...props 
}, ref) => {
  const Component = asChild ? motion.div : motion.button

  const buttonProps = {
    ...props,
    ref,
    className: cn(buttonVariants({ variant, size, fullWidth, className })),
    disabled: disabled || loading,
  }

  // Animation variants
  const animationProps = animate ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {}

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </>
      )
    }

    return (
      <>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span className="flex-1">{children}</span>
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    )
  }

  return (
    <Component {...buttonProps} {...animationProps}>
      {renderContent()}
    </Component>
  )
})

Button.displayName = 'Button'

export { Button, buttonVariants }