import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const tooltipSchema = z.object({
  children: z.custom<React.ReactNode>(),
  content: z.custom<React.ReactNode>(),
  className: z.string().optional(),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional(),
  align: z.enum(['start', 'center', 'end']).optional(),
})

// ============================================================================
// Types
// ============================================================================

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'center' | 'end'

export interface TooltipProps extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, 'content'> {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  side?: TooltipSide
  align?: TooltipAlign
}

// ============================================================================
// Tooltip Component
// ============================================================================

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  side = 'top',
  align = 'center',
  ...props
}) => {
  // Validate props
  try {
    tooltipSchema.parse({ children, content, className, side, align })
  } catch (error) {
    console.error('Tooltip validation error:', error)
    return null
  }

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={200}>
        <TooltipPrimitive.Trigger asChild>
          <div className="inline-flex items-center gap-1">{children}</div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            className={twMerge(
              'z-50 rounded-md bg-gray-900 px-4 py-2 text-sm text-white shadow-md',
              'animate-in fade-in-0 zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              className
            )}
            {...props}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-gray-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

Tooltip.displayName = 'Tooltip'

export const TooltipProvider = TooltipPrimitive.Provider
