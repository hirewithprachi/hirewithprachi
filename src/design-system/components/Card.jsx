import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Card variants
const cardVariants = cva(
  'rounded-lg border bg-white text-gray-950 shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        elevated: 'border-gray-200 shadow-md hover:shadow-lg',
        outlined: 'border-2 border-gray-300',
        ghost: 'border-transparent shadow-none',
        gradient: 'border-transparent bg-gradient-to-br from-white to-gray-50',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
)

// Card component
const Card = forwardRef(({ 
  className, 
  variant, 
  padding, 
  interactive,
  animate = true,
  children,
  onClick,
  ...props 
}, ref) => {
  const Component = animate ? motion.div : 'div'
  
  const animationProps = animate && interactive ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <Component
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive, className }))}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
})
Card.displayName = 'Card'

// Card Header component
const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

// Card Title component
const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = 'CardTitle'

// Card Description component
const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

// Card Content component
const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('p-6 pt-0', className)} 
    {...props} 
  />
))
CardContent.displayName = 'CardContent'

// Card Footer component
const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Statistics Card - specialized card for metrics
const StatsCard = forwardRef(({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  className,
  ...props 
}, ref) => {
  const changeColors = {
    positive: 'text-success-600 bg-success-100',
    negative: 'text-error-600 bg-error-100',
    neutral: 'text-gray-600 bg-gray-100',
  }

  return (
    <Card ref={ref} variant="elevated" className={cn('', className)} {...props}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                changeColors[changeType]
              )}>
                {change}
              </div>
            )}
          </div>
          {icon && (
            <div className="h-8 w-8 text-gray-400">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})
StatsCard.displayName = 'StatsCard'

// Feature Card - specialized card for features/services
const FeatureCard = forwardRef(({ 
  title, 
  description, 
  icon,
  action,
  image,
  className,
  ...props 
}, ref) => {
  return (
    <Card 
      ref={ref} 
      variant="elevated" 
      interactive={!!action}
      className={cn('overflow-hidden', className)} 
      {...props}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="space-y-4">
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              {icon}
            </div>
          )}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
          {action && (
            <div className="pt-2">
              {action}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})
FeatureCard.displayName = 'FeatureCard'

// Testimonial Card - specialized card for testimonials
const TestimonialCard = forwardRef(({ 
  quote, 
  author, 
  role,
  company,
  avatar,
  rating,
  className,
  ...props 
}, ref) => {
  return (
    <Card ref={ref} variant="elevated" className={cn('', className)} {...props}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {rating && (
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          <blockquote className="text-gray-700 leading-relaxed">
            "{quote}"
          </blockquote>
          <div className="flex items-center space-x-3">
            {avatar && (
              <img 
                src={avatar} 
                alt={author}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{author}</p>
              <p className="text-sm text-gray-600">{role}{company && `, ${company}`}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
TestimonialCard.displayName = 'TestimonialCard'

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
}