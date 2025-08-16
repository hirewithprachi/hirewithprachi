import React, { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'

// Modal overlay component
const ModalOverlay = forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      className
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    {...props}
  />
))
ModalOverlay.displayName = 'ModalOverlay'

// Modal content component
const ModalContent = forwardRef(({ 
  className, 
  size = 'md',
  children,
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-screen-xl mx-4',
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2',
        'bg-white rounded-lg border shadow-lg',
        'max-h-[90vh] overflow-hidden',
        sizeClasses[size],
        className
      )}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
})
ModalContent.displayName = 'ModalContent'

// Modal header component
const ModalHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between p-6 border-b', className)}
    {...props}
  >
    {children}
  </div>
))
ModalHeader.displayName = 'ModalHeader'

// Modal title component
const ModalTitle = forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-gray-900', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

// Modal body component
const ModalBody = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 overflow-y-auto max-h-[60vh]', className)}
    {...props}
  />
))
ModalBody.displayName = 'ModalBody'

// Modal footer component
const ModalFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end space-x-2 p-6 border-t bg-gray-50', className)}
    {...props}
  />
))
ModalFooter.displayName = 'ModalFooter'

// Main Modal component
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  ...props 
}) => {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, closeOnEscape])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalOverlay 
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          <ModalContent size={size} className={className} {...props}>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
            {children}
          </ModalContent>
        </>
      )}
    </AnimatePresence>
  )
}

// Confirmation Modal - specialized modal for confirmations
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  loading = false,
  ...props 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" {...props}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p className="text-gray-600">{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button 
          variant={variant} 
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

// Alert Modal - specialized modal for alerts
const AlertModal = ({ 
  isOpen, 
  onClose,
  title = 'Alert',
  message,
  type = 'info',
  buttonText = 'OK',
  ...props 
}) => {
  const typeConfig = {
    info: {
      variant: 'primary',
      icon: '💡',
    },
    success: {
      variant: 'success',
      icon: '✅',
    },
    warning: {
      variant: 'warning',
      icon: '⚠️',
    },
    error: {
      variant: 'destructive',
      icon: '❌',
    },
  }

  const config = typeConfig[type]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" {...props}>
      <ModalHeader>
        <ModalTitle className="flex items-center gap-2">
          <span>{config.icon}</span>
          {title}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p className="text-gray-600">{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button variant={config.variant} onClick={onClose}>
          {buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

// Form Modal - specialized modal for forms
const FormModal = ({ 
  isOpen, 
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  submitVariant = 'primary',
  loading = false,
  ...props 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant={submitVariant} type="submit" loading={loading}>
            {submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

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
}