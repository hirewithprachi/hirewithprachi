import React, { forwardRef, useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

// Input variants
const inputVariants = cva(
  `
    flex w-full rounded-lg border bg-white px-3 py-2 text-sm 
    transition-all duration-200 file:border-0 file:bg-transparent 
    file:text-sm file:font-medium placeholder:text-gray-400 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          border-gray-300 
          focus-visible:border-primary-500 focus-visible:ring-primary-500
        `,
        error: `
          border-error-300 text-error-900 
          focus-visible:border-error-500 focus-visible:ring-error-500
        `,
        success: `
          border-success-300 text-success-900 
          focus-visible:border-success-500 focus-visible:ring-success-500
        `,
        warning: `
          border-warning-300 text-warning-900 
          focus-visible:border-warning-500 focus-visible:ring-warning-500
        `,
      },
      size: {
        sm: 'h-9 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

// Label component
const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

// Helper text component
const HelperText = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'text-gray-600',
    error: 'text-error-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
  }

  const icons = {
    error: AlertCircle,
    success: CheckCircle,
    warning: AlertCircle,
  }

  const Icon = icons[variant]

  return (
    <div className={cn('flex items-center gap-1 text-xs mt-1', variants[variant])}>
      {Icon && <Icon className="h-3 w-3" />}
      <span>{children}</span>
    </div>
  )
}

// Main Input component
const Input = forwardRef(({
  className,
  type,
  variant = 'default',
  size = 'md',
  label,
  helperText,
  error,
  success,
  required,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  // Determine variant based on state
  const currentVariant = error ? 'error' : success ? 'success' : variant
  const helperVariant = error ? 'error' : success ? 'success' : 'default'
  const helperTextContent = error || success || helperText

  // Handle password visibility toggle
  const inputType = type === 'password' && showPassword ? 'text' : type
  const shouldShowToggle = type === 'password' && showPasswordToggle

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </Label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        {/* Input field */}
        <input
          type={inputType}
          className={cn(
            inputVariants({ variant: currentVariant, size }),
            leftIcon && 'pl-10',
            (rightIcon || shouldShowToggle) && 'pr-10',
            className
          )}
          ref={ref}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {/* Right icon or password toggle */}
        {(rightIcon || shouldShowToggle) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {shouldShowToggle ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="text-gray-400">{rightIcon}</div>
            )}
          </div>
        )}

        {/* Focus ring indicator */}
        {focused && (
          <div
            className={cn(
              'absolute inset-0 rounded-lg ring-2 ring-offset-2 pointer-events-none',
              currentVariant === 'error' && 'ring-error-500',
              currentVariant === 'success' && 'ring-success-500',
              currentVariant === 'warning' && 'ring-warning-500',
              currentVariant === 'default' && 'ring-primary-500'
            )}
          />
        )}
      </div>

      {/* Helper text */}
      {helperTextContent && (
        <HelperText variant={helperVariant}>
          {helperTextContent}
        </HelperText>
      )}
    </div>
  )
})

Input.displayName = 'Input'

// Textarea component
const Textarea = forwardRef(({
  className,
  variant = 'default',
  label,
  helperText,
  error,
  success,
  required,
  ...props
}, ref) => {
  const currentVariant = error ? 'error' : success ? 'success' : variant
  const helperVariant = error ? 'error' : success ? 'success' : 'default'
  const helperTextContent = error || success || helperText

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </Label>
      )}

      {/* Textarea */}
      <textarea
        className={cn(
          inputVariants({ variant: currentVariant }),
          'min-h-[80px] resize-y',
          className
        )}
        ref={ref}
        {...props}
      />

      {/* Helper text */}
      {helperTextContent && (
        <HelperText variant={helperVariant}>
          {helperTextContent}
        </HelperText>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export { Input, Textarea, Label, HelperText, inputVariants }