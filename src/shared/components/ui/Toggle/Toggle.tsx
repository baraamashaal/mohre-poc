import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'

// ============================================================================
// Schema
// ============================================================================

const ToggleSchema = z.object({
  checked: z.boolean().optional(),
  onCheckedChange: z.function().optional(),
  disabled: z.boolean().optional(),
  variant: z.enum(['default', 'success', 'mode', 'secondary']).optional(),
  label: z.string().optional(),
  className: z.string().optional(),
  checkedIcon: z.custom<React.ReactNode>().optional(),
  uncheckedIcon: z.custom<React.ReactNode>().optional(),
})

// ============================================================================
// Types
// ============================================================================

export type ToggleVariant = 'default' | 'success' | 'mode' | 'secondary'

export interface ToggleProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'asChild'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  variant?: ToggleVariant
  label?: string
  className?: string
  checkedIcon?: React.ReactNode
  uncheckedIcon?: React.ReactNode
}

// ============================================================================
// Toggle Component
// ============================================================================

export const Toggle = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, ToggleProps>(
  (props, ref) => {
    const {
      checked,
      onCheckedChange,
      disabled,
      variant = 'default',
      label,
      className,
      checkedIcon,
      uncheckedIcon,
      ...rest
    } = ToggleSchema.parse(props)

    const variants = {
      default: {
        root: 'bg-aeblack-100 data-[state=checked]:bg-primary-300',
        thumb: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:border-primary-600',
      },
      success: {
        root: 'bg-aeblack-100 data-[state=checked]:bg-aegreen-300',
        thumb: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:border-aegreen-600',
      },
      secondary: {
        root: 'bg-aeblack-100 data-[state=checked]:bg-secondary-800',
        thumb: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:border-secondary-600',
      },
      mode: {
        root: 'bg-whitely-50 border border-aeblack-100 data-[state=checked]:bg-aeblack-950',
        thumb: 'bg-transparent border-transparent flex items-center justify-center',
      },
    } as const

    return (
      <label className={twMerge('relative inline-flex cursor-pointer items-center', className)}>
        <SwitchPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={twMerge(
            'relative flex items-center h-4 w-10 cursor-pointer rounded-full outline-none transition-colors',
            'focus-visible:outline focus-visible:outline-offset-[3px] focus-visible:outline-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-30',
            variant === 'mode' && 'h-6 w-12',
            variants[variant].root
          )}
          {...rest}
        >
          <SwitchPrimitive.Thumb
            className={twMerge(
              'absolute block h-5 w-5 rounded-full shadow transition-transform duration-300',
              'translate-x-0 data-[state=checked]:translate-x-6 rtl:data-[state=checked]:-translate-x-6',
              'top-1/2 -translate-y-1/2',
              variant === 'mode' &&
                'h-4 w-4 translate-x-1 rtl:-translate-x-1 data-[state=checked]:translate-x-7 rtl:data-[state=checked]:-translate-x-7',
              variants[variant].thumb
            )}
          >
            {checkedIcon ?? uncheckedIcon ? (
              checked ? (
                checkedIcon
              ) : (
                uncheckedIcon
              )
            ) : variant === 'mode' ? (
              <>{checked ? <MoonIcon weight="fill" className="h-4 w-4 text-whitely-50" /> : <SunIcon weight="fill" className="h-4 w-4 text-aeblack-950" />}</>
            ) : null}
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
        {label && <span className="ms-3 text-sm">{label}</span>}
      </label>
    )
  }
)

Toggle.displayName = 'Toggle'
