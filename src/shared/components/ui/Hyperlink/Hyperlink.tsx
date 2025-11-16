import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { CaretRightIcon } from '@phosphor-icons/react'
import { cva } from 'class-variance-authority'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const hyperlinkSchema = z.object({
  href: z.string().optional(),
  children: z.custom<ReactNode>(),
  variant: z.enum(['default', 'cta', 'soft', 'secondary', 'secondary-soft', 'unstyled']).optional(),
  asChild: z.boolean().optional(),
  external: z.boolean().optional(),
  icon: z.boolean().optional(),
  className: z.string().optional(),
})

// ============================================================================
// Variants
// ============================================================================

const hyperlinkVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'relative inline-flex items-center gap-2 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 underline underline-offset-1 text-primary-600 hover:text-primary-500 hover:decoration-2 active:text-primary-700',
        cta: 'relative inline-flex items-center gap-2 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 px-2.5 py-2 -ml-2.5 font-semibold text-primary-600 hover:text-primary-500 hover:underline rtl:-mr-2.5 rtl:ml-0',
        soft: 'relative inline-flex items-center gap-2 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 px-2.5 py-2 -ml-2.5 font-semibold text-primary-600 hover:text-primary-500 hover:bg-primary-50 rtl:-mr-2.5 rtl:ml-0',
        secondary: 'relative inline-flex items-center gap-2 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 px-2.5 py-2 -ml-2.5 font-semibold text-gray-800 hover:text-gray-700 hover:underline rtl:-mr-2.5 rtl:ml-0',
        'secondary-soft':
          'relative inline-flex items-center gap-2 rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 px-2.5 py-2 -ml-2.5 font-semibold text-gray-800 hover:text-gray-700 hover:bg-gray-50 rtl:-mr-2.5 rtl:ml-0',
        unstyled: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export type HyperlinkVariant = 'default' | 'cta' | 'soft' | 'secondary' | 'secondary-soft' | 'unstyled'

export interface HyperlinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string
  children: ReactNode
  variant?: HyperlinkVariant
  asChild?: boolean
  external?: boolean
  icon?: boolean
  className?: string
}

// ============================================================================
// Hyperlink Component
// ============================================================================

export const Hyperlink = forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ href, children, variant = 'default', asChild = false, external = false, icon = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'

    try {
      hyperlinkSchema.parse({ href, children, variant, asChild, external, icon, className })
    } catch (error) {
      console.error('Hyperlink validation error:', error)
      return null
    }

    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {}

    const content = (
      <>
        {children}
        {icon && <CaretRightIcon className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </>
    )

    return (
      <Comp ref={ref} href={!asChild ? href : undefined} className={hyperlinkVariants({ variant, className })} {...externalProps} {...props}>
        {content}
      </Comp>
    )
  }
)

Hyperlink.displayName = 'Hyperlink'
