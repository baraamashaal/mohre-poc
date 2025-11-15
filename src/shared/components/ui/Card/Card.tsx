import { forwardRef, type ReactNode, type ReactElement, type ComponentPropsWithoutRef, Children, isValidElement, cloneElement } from 'react'
import { z } from 'zod'
import { twMerge } from 'tailwind-merge'
import { Slot } from '@radix-ui/react-slot'
import { CaretRightIcon } from '@phosphor-icons/react'

// ============================================================================
// Schemas
// ============================================================================

const cardSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
  variant: z.enum(['default', 'news', 'service', 'creative']).optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  bordered: z.boolean().optional(),
  glow: z.boolean().optional(),
  asChild: z.boolean().optional(),
  noRadius: z.boolean().optional(),
})

const stackSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
  direction: z.enum(['horizontal', 'vertical', 'matrix']).optional(),
  collapsed: z.boolean().optional(),
  gap: z.number().optional(),
  columns: z.number().optional(),
})

// ============================================================================
// Types
// ============================================================================

export type CardVariant = 'default' | 'news' | 'service' | 'creative'
export type CardSize = 'sm' | 'base' | 'lg'
export type StackDirection = 'horizontal' | 'vertical' | 'matrix'

type CardChildProps = {
  className?: string
  bordered?: boolean
}

export interface CardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode
  className?: string
  variant?: CardVariant
  size?: CardSize
  bordered?: boolean
  glow?: boolean
  asChild?: boolean
  noRadius?: boolean
}

export interface StackProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode
  className?: string
  direction?: StackDirection
  collapsed?: boolean
  gap?: number
  columns?: number
}

export interface CardLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string
  children: ReactNode
  className?: string
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  base: 'transition-all duration-300 ease-in-out',
  bordered: 'border border-primary-300 overflow-hidden',
  glow: 'hover:shadow-xl hover:shadow-primary-500/30',
  sizes: {
    sm: {
      padding: 'p-4',
      gap: 'space-y-5',
      icon: 'w-7 h-7',
      title: 'text-h6',
      rounded: 'rounded-lg',
    },
    base: {
      padding: 'p-6',
      gap: 'space-y-6',
      icon: 'w-10 h-10',
      title: 'text-h5',
      rounded: 'rounded-xl',
    },
    lg: {
      padding: 'p-7',
      gap: 'space-y-7',
      icon: 'w-14 h-14',
      title: 'text-h4',
      rounded: 'rounded-2xl',
    },
  },
  variants: {
    default: '',
    news: 'group',
    service: 'hover:bg-primary-50',
    creative:
      'relative after:absolute after:inset-0 after:w-full after:h-full after:bg-gradient-to-t after:from-primary-700 overflow-hidden',
  },
} as const

// ============================================================================
// CardLink Component
// ============================================================================

const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(({ href, children, className, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    className={twMerge('inline-flex items-center text-primary-600 hover:text-primary-800 font-medium', className)}
    {...props}
  >
    {children}
    <CaretRightIcon weight="bold" className="ml-2 w-5 h-5 rtl:-scale-x-100" />
  </a>
))

CardLink.displayName = 'CardLink'

// ============================================================================
// Card Component
// ============================================================================

const CardComponent = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    variant = 'default',
    size = 'base',
    bordered = false,
    glow = false,
    asChild = false,
    noRadius = false,
    ...rest
  } = cardSchema.parse(props)

  const Comp = asChild ? Slot : 'div'

  const cardClasses = twMerge(
    styles.base,
    !noRadius && styles.sizes[size].rounded,
    styles.variants[variant],
    bordered && styles.bordered,
    glow && styles.glow,
    variant !== 'creative' && styles.sizes[size].padding,
    variant !== 'news' && styles.sizes[size].gap,
    className
  )

  return (
    <Comp ref={ref} className={cardClasses} {...rest}>
      {children}
    </Comp>
  )
})

CardComponent.displayName = 'Card'

// ============================================================================
// Stack Component
// ============================================================================

const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { children, className, direction = 'horizontal', collapsed = false, gap = 4, columns = 3, ...rest } =
    stackSchema.parse(props)

  const stackClasses = twMerge(
    'grid',
    direction === 'horizontal' && 'grid-flow-col auto-cols-fr',
    direction === 'vertical' && 'grid-flow-row',
    direction === 'matrix' && `grid-cols-${String(columns)}`,
    !collapsed && `gap-${String(gap)}`,
    className
  )

  return (
    <div ref={ref} className={stackClasses} {...rest}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child

        const typedChild = child as ReactElement<CardChildProps>
        const childCount = Children.count(children)
        const isFirst = index === 0
        const isLast = index === childCount - 1
        const isFirstRow = direction === 'matrix' && index < columns
        const isLastRow = direction === 'matrix' && index >= childCount - columns
        const isFirstCol = direction === 'matrix' && index % columns === 0
        const isLastCol = direction === 'matrix' && (index + 1) % columns === 0

        return cloneElement(typedChild, {
          className: twMerge(
            typedChild.props.className,
            collapsed && '-ml-[1px] -mt-[1px] rtl:-mr-[1px] rtl:-mb-[1px]',
            collapsed && 'rounded-none',
            collapsed &&
              direction === 'horizontal' && [
                isFirst && 'rounded-l-xl ml-0 rtl:rounded-r-xl rtl:rounded-l-none',
                isLast && 'rounded-r-xl rtl:rounded-l-xl rtl:rounded-r-none',
              ],
            collapsed &&
              direction === 'vertical' && [isFirst && 'rounded-t-xl mt-0', isLast && 'rounded-b-xl'],
            collapsed &&
              direction === 'matrix' && [
                isFirstRow && isFirstCol && 'rounded-tl-xl mt-0 ml-0',
                isFirstRow && isLastCol && 'rounded-tr-xl mt-0',
                isLastRow && isFirstCol && 'rounded-bl-xl ml-0',
                isLastRow && isLastCol && 'rounded-br-xl',
              ]
          ),
          bordered: true,
        })
      })}
    </div>
  )
})

Stack.displayName = 'Stack'

// ============================================================================
// Exports
// ============================================================================

export const Card = Object.assign(CardComponent, {
  Link: CardLink,
  Stack: Stack,
})
