import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
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
// Helper Functions
// ============================================================================

/**
 * Check if URL is external (absolute URL or different origin)
 */
function isExternalUrl(href?: string): boolean {
  if (!href) return false

  // Check for absolute URLs (http://, https://, //, mailto:, tel:, etc.)
  if (/^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href)) {
    return true
  }

  // Check if it starts with # (hash links are internal)
  if (href.startsWith('#')) {
    return false
  }

  // Relative paths are internal
  return false
}

// ============================================================================
// Hyperlink Component
// ============================================================================

export const Hyperlink = forwardRef<HTMLAnchorElement, HyperlinkProps>(
  ({ href, children, variant = 'default', asChild = false, external = false, icon = false, className, ...props }, ref) => {
    try {
      hyperlinkSchema.parse({ href, children, variant, asChild, external, icon, className })
    } catch (error) {
      console.error('Hyperlink validation error:', error)
      return null
    }

    // Auto-detect if link is external
    const isExternal = external || isExternalUrl(href)

    // Choose the appropriate component
    let Comp: React.ElementType = 'a'
    if (asChild) {
      Comp = Slot
    } else if (!isExternal && href && !href.startsWith('#')) {
      // Use React Router Link for internal routes
      Comp = Link
    }

    const externalProps = isExternal
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {}

    const content = (
      <>
        {children}
        {icon && <CaretRightIcon className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />}
        {isExternal && <span className="sr-only"> (opens in new tab)</span>}
      </>
    )

    // Use 'to' prop for Link, 'href' for <a>
    const linkProps = Comp === Link && href
      ? { to: href }
      : { href: !asChild ? href : undefined }

    return (
      <Comp
        ref={ref}
        {...linkProps}
        className={hyperlinkVariants({ variant, className })}
        {...externalProps}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)

Hyperlink.displayName = 'Hyperlink'
