import {type FC, type ReactNode, type ReactElement, isValidElement } from 'react'
import { z } from 'zod'
import { XIcon, CaretRightIcon } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'

// ============================================================================
// Schema
// ============================================================================

const bannerSchema = z.object({
  children: z.custom<ReactNode>(),
  position: z.enum(['top', 'bottom']).optional(),
  variant: z.enum(['default', 'camel', 'red', 'dark', 'primaryNotice', 'secondaryNotice']).optional(),
  className: z.string().optional(),
  onDismiss: z.function().optional(),
  action: z
    .union([
      z.custom<ReactElement>(),
      z.object({
        href: z.string().optional(),
        text: z.string(),
        onClick: z.function().optional(),
      }),
    ])
    .optional(),
  title: z.string().optional(),
  isDismissible: z.boolean().optional(),
  centered: z.boolean().optional(),
})

// ============================================================================
// Types
// ============================================================================

export type BannerPosition = 'top' | 'bottom'
export type BannerVariant = 'default' | 'camel' | 'red' | 'dark' | 'primaryNotice' | 'secondaryNotice'

export interface BannerActionProps {
  href?: string
  text: string
  onClick?: () => void
  [key: string]: unknown
}

export interface BannerProps {
  children: ReactNode
  position?: BannerPosition
  variant?: BannerVariant
  className?: string
  onDismiss?: () => void
  action?: ReactElement | BannerActionProps
  title?: string
  isDismissible?: boolean
  centered?: boolean
}

// ============================================================================
// Styles
// ============================================================================

const variantStyles = {
  default: 'bg-slate-50 border-slate-500 text-slate-600',
  camel: 'bg-camel-600 border-camel-500 text-camel-50',
  red: 'bg-aered-50 border-aered-500 text-aered-600',
  primaryNotice: 'bg-primary-50 border-primary-700',
  secondaryNotice: 'bg-slate-50 border-slate-700',
  dark: 'bg-slate-700 text-slate-50 rounded-xl m-4',
} as const

const actionStyles = {
  default: 'text-slate-600 hover:text-slate-700 focus-visible:ring-slate-400',
  camel: 'text-camel-50 hover:text-camel-100 focus-visible:ring-camel-400',
  red: 'text-aered-600 hover:text-aered-700 focus-visible:ring-aered-400',
  primaryNotice: 'text-primary-700 hover:text-primary-800 focus-visible:ring-primary-400',
  secondaryNotice: 'text-secondary-700 hover:text-secondary-800 focus-visible:ring-secondary-400',
  dark: 'text-slate-50 hover:text-slate-100 focus-visible:ring-slate-400',
} as const

const positionStyles = {
  top: 'border-b-2 fixed top-0 left-0 right-0 z-50',
  bottom: 'border-t-2 fixed bottom-0 left-0 right-0 z-50',
} as const

// ============================================================================
// Helper Functions
// ============================================================================

const getBaseClasses = (variant: BannerVariant, position: BannerPosition, className?: string): string =>
  twMerge(
    'relative px-4 py-3 flex',
    variantStyles[variant],
    positionStyles[position],
    variant === 'primaryNotice' || variant === 'secondaryNotice' ? 'flex flex-col md:flex-row justify-between gap-4' : '',
    className
  )

const getActionClasses = (variant: BannerVariant): string =>
  twMerge(
    'inline-flex items-center gap-2 font-medium underline underline-offset-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm whitespace-nowrap',
    actionStyles[variant]
  )

// ============================================================================
// Banner Component
// ============================================================================

export const Banner: FC<BannerProps> = ({
  children,
  position = 'top',
  variant = 'default',
  className,
  onDismiss,
  action,
  title,
  isDismissible = false,
  centered = true,
}) => {
  try {
    bannerSchema.parse({ children, position, variant, className, onDismiss, action, title, isDismissible, centered })
  } catch (error) {
    console.error('Banner validation error:', error)
    return null
  }

  const baseClasses = getBaseClasses(variant, position, className)
  const actionClasses = getActionClasses(variant)

  const renderAction = (): ReactNode => {
    if (!action) return null
    if (isValidElement(action)) return action
    if (typeof action === 'object' && 'text' in action && !action.text) return null
    if (typeof action === 'object' && 'text' in action) {
      const { href = '#', text, onClick, ...actionProps } = action
      return (
        <a href={href} className={actionClasses} onClick={onClick} {...actionProps}>
          {text}
          <CaretRightIcon weight="bold" className="w-5 h-5 rtl:-scale-x-100" />
        </a>
      )
    }
    return null
  }

  const renderDismissButton = (): ReactNode => {
    if (!isDismissible || !onDismiss) return null
    return (
      <button
        onClick={onDismiss}
        className="p-0.5 hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 rounded"
        aria-label="Dismiss"
        type="button"
      >
        <XIcon weight="bold" className="w-5 h-5" />
      </button>
    )
  }

  const renderContent = (): ReactNode => (
    <>
      <div className={`flex flex-col md:flex-row gap-3 ${centered ? 'justify-center' : 'justify-start'} flex-grow`}>
        <div className={centered ? 'text-center' : 'text-left'}>{children}</div>
        <div className={`flex items-center ${centered ? 'justify-center' : 'justify-start'} gap-3`}>
          {renderAction()}
        </div>
      </div>
      {renderDismissButton() && <div className="flex items-center">{renderDismissButton()}</div>}
    </>
  )

  const isNotice = variant === 'primaryNotice' || variant === 'secondaryNotice'

  return (
    <div className={baseClasses} role="alert" tabIndex={isNotice ? -1 : undefined}>
      {isNotice ? (
        <div className="py-4 max-w-screen-lg">
          {title && <h2 className="mb-4 text-xl font-bold text-slate-800">{title}</h2>}
          <p className="font-normal text-slate-800 mb-0">{children}</p>
        </div>
      ) : (
        renderContent()
      )}
      {isNotice && (
        <div className="flex items-center gap-4">
          {renderAction()}
          {renderDismissButton()}
        </div>
      )}
    </div>
  )
}

Banner.displayName = 'Banner'
