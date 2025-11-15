import { Root, Image, Fallback } from '@radix-ui/react-avatar'
import { UserIcon } from '@phosphor-icons/react'
import type {ComponentPropsWithoutRef, FC} from 'react';
import { z } from 'zod'
import { cn } from '../../../lib/utils'

// ============================================================================
// Schema
// ============================================================================

const avatarSchema = z.object({
  src: z.string().optional(),
  alt: z.string().optional(),
  size: z.enum(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl']).optional(),
  variant: z.enum(['square', 'rounded']).optional(),
  status: z.enum(['online', 'offline', 'none']).optional(),
  className: z.string().optional(),
})

// ============================================================================
// Types
// ============================================================================

export type AvatarSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
export type AvatarVariant = 'square' | 'rounded'
export type AvatarStatus = 'online' | 'offline' | 'none'

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<typeof Root>, 'asChild'> {
  src?: string
  alt?: string
  size?: AvatarSize
  variant?: AvatarVariant
  status?: AvatarStatus
  className?: string
}

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  base: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-14 w-14',
  '2xl': 'h-16 w-16',
  '3xl': 'h-20 w-20',
} as const

const statusStyles = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  none: 'hidden',
} as const

const borderRadiusStyles = {
  xs: 'rounded-[4px]',
  sm: 'rounded-[4px]',
  base: 'rounded-[6px]',
  lg: 'rounded-[6px]',
  xl: 'rounded-[8px]',
  '2xl': 'rounded-[8px]',
  '3xl': 'rounded-[8px]',
} as const

// ============================================================================
// Avatar Component
// ============================================================================

export const Avatar: FC<AvatarProps> = ({ src, alt, size = 'base', variant = 'square', status = 'none', className, ...props }) => {
  try {
    avatarSchema.parse({ src, alt, size, variant, status, className })
  } catch (error) {
    console.error('Avatar validation error:', error)
    return null
  }

  return (
    <div className="relative inline-block">
      <Root
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden',
          sizeStyles[size],
          variant === 'rounded' ? 'rounded-full' : borderRadiusStyles[size],
          className
        )}
        {...props}
      >
        <Image src={src} alt={alt} className="h-full w-full object-cover" />
        <Fallback className="flex h-full w-full items-center justify-center bg-gray-100" delayMs={600}>
          <UserIcon className="h-1/2 w-1/2 text-gray-400" weight="light" />
        </Fallback>
      </Root>
      {status !== 'none' && (
        <span
          className={cn(
            'absolute -right-0.5 -top-0.5 block rounded-full ring-2 ring-white',
            statusStyles[status],
            size === 'xs' ? 'h-1.5 w-1.5' : '',
            size === 'sm' ? 'h-2 w-2' : '',
            size === 'base' ? 'h-2.5 w-2.5' : '',
            size === 'lg' ? 'h-3 w-3' : '',
            size === 'xl' ? 'h-3.5 w-3.5' : '',
            size === '2xl' ? 'h-4 w-4' : '',
            size === '3xl' ? 'h-5 w-5' : ''
          )}
        />
      )}
    </div>
  )
}

Avatar.displayName = 'Avatar'
