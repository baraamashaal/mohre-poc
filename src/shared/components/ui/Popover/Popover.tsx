import { forwardRef, type ReactNode, type ComponentPropsWithoutRef, useState } from 'react'
import { Root, Trigger, Portal, Content, Arrow, Close } from '@radix-ui/react-popover'
import { XIcon } from '@phosphor-icons/react'
import { z } from 'zod'

// ============================================================================
// Schemas
// ============================================================================

const popoverRootSchema = z.object({
  children: z.custom<ReactNode>(),
  trigger: z.enum(['click', 'hover']).optional(),
  open: z.boolean().optional(),
  onOpenChange: z.function().optional(),
})

const popoverContentSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
  sideOffset: z.number().optional(),
  align: z.enum(['start', 'center', 'end']).optional(),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional(),
  onMouseEnter: z.function().optional(),
  onMouseLeave: z.function().optional(),
})

const popoverTriggerSchema = z.object({
  children: z.custom<ReactNode>(),
  asChild: z.boolean().optional(),
  onMouseEnter: z.function().optional(),
  onMouseLeave: z.function().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface PopoverRootProps {
  children: ReactNode
  trigger?: 'click' | 'hover'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface PopoverContentProps extends Omit<ComponentPropsWithoutRef<typeof Content>, 'asChild'> {
  children: ReactNode
  className?: string
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export interface PopoverTriggerProps extends ComponentPropsWithoutRef<typeof Trigger> {
  children: ReactNode
  asChild?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

// ============================================================================
// PopoverRoot Component
// ============================================================================

export function PopoverRoot(props: PopoverRootProps) {
  const [isOpen, setIsOpen] = useState(false)

  try {
    popoverRootSchema.parse(props)
  } catch (error) {
    console.error('PopoverRoot validation error:', error)
    return null
  }

  const { children, open, onOpenChange } = props

  const handleOpenChange = (newOpen: boolean): void => {
    if (onOpenChange) {
      onOpenChange(newOpen)
    } else {
      setIsOpen(newOpen)
    }
  }

  const controlledOpen = open ?? isOpen

  return (
    <Root open={controlledOpen} onOpenChange={handleOpenChange}>
      {children}
    </Root>
  )
}

// ============================================================================
// PopoverTrigger Component
// ============================================================================

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  try {
    popoverTriggerSchema.parse(props)
  } catch (error) {
    console.error('PopoverTrigger validation error:', error)
    return null
  }

  const { children, asChild = false, onMouseEnter, onMouseLeave, ...rest } = props

  return (
    <Trigger
      ref={ref}
      asChild={asChild}
      className={!asChild ? 'inline-flex items-center justify-center' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </Trigger>
  )
})

PopoverTrigger.displayName = 'PopoverTrigger'

// ============================================================================
// PopoverContent Component
// ============================================================================

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  try {
    popoverContentSchema.parse(props)
  } catch (error) {
    console.error('PopoverContent validation error:', error)
    return null
  }

  const { children, className = '', sideOffset = 5, align = 'center', side = 'bottom', onMouseEnter, onMouseLeave, ...rest } = props

  return (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        side={side}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`z-50 w-72 rounded-lg bg-white p-4 shadow-lg animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 ${className}`}
        {...rest}
      >
        {children}
        <Close className="absolute right-3 rtl:left-3 rtl:right-auto top-3 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100">
          <XIcon className="h-4 w-4 text-gray-500" weight="bold" />
        </Close>
        <Arrow className="fill-white" />
      </Content>
    </Portal>
  )
})

PopoverContent.displayName = 'PopoverContent'
