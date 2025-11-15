import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Type helper for polymorphic components
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & { as?: C }> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props>

/**
 * Type helper for components with asChild prop (Radix pattern)
 */
export type AsChildProps<T = object> = T & {
  asChild?: boolean
}

/**
 * Common size types used across components
 */
export type ComponentSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

/**
 * Common variant types
 */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'

/**
 * Common style types
 */
export type ComponentStyle = 'solid' | 'soft' | 'outline' | 'link'
