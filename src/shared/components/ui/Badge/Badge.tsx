import type { ReactNode } from 'react'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  const baseClass = 'aegov-badge'
  const variantClass = `badge-${variant}`

  const classes = [baseClass, variantClass, className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
