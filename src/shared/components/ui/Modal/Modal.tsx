import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const modalSchema = z.object({
  children: z.custom<React.ReactNode>(),
  title: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  variant: z.enum(['default', 'danger']).optional(),
  className: z.string().optional(),
  trigger: z.custom<React.ReactNode>().optional(),
})

// ============================================================================
// Types
// ============================================================================

export type ModalSize = 'sm' | 'md' | 'lg'
export type ModalVariant = 'default' | 'danger'

export interface ModalProps {
  children: React.ReactNode
  title?: string
  size?: ModalSize
  variant?: ModalVariant
  className?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// ============================================================================
// Modal Component
// ============================================================================

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  size = 'md',
  variant = 'default',
  className,
  trigger,
  open: controlledOpen,
  onOpenChange,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false)

  // Validate props
  try {
    modalSchema.parse({ children, title, size, variant, className, trigger })
  } catch (error) {
    console.error('Modal validation error:', error)
    return null
  }

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? onOpenChange : setInternalOpen

  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-xl',
    xl: 'sm:max-w-3xl',
  } as const

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>
          <button
            onClick={() => {
              if (!isControlled) setInternalOpen(true)
            }}
            type="button"
          >
            {trigger}
          </button>
        </DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
            'w-full p-5',
            'bg-white rounded-lg shadow-lg',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {title && (
            <div className="flex items-center justify-between mb-6">
              <DialogPrimitive.Title className="text-2xl font-semibold text-gray-900">{title}</DialogPrimitive.Title>
              <DialogPrimitive.Close
                className="rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                onClick={() => {
                  if (!isControlled) setInternalOpen(false)
                }}
              >
                <XIcon className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

Modal.displayName = 'Modal'

export const ModalClose = DialogPrimitive.Close
