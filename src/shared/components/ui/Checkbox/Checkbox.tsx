import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const CheckboxSchema = z.object({
  checked: z.boolean().optional(),
  defaultChecked: z.boolean().optional(),
  onCheckedChange: z.function().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  name: z.string().optional(),
  value: z.string().optional(),
  id: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  className: z.string().optional(),
  asChild: z.boolean().optional(),
})

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
  sm: {
    checkbox: 'h-4 w-4',
    label: 'text-sm',
    description: 'text-xs',
    icon: 'h-3 w-3',
  },
  base: {
    checkbox: 'h-5 w-5',
    label: 'text-base',
    description: 'text-sm',
    icon: 'h-4 w-4',
  },
  lg: {
    checkbox: 'h-6 w-6',
    label: 'text-lg',
    description: 'text-base',
    icon: 'h-5 w-5',
  },
} as const

const variantStyles = {
  primary: {
    checkbox:
      'border-aegold-450 data-[state=checked]:bg-aegold-450 data-[state=checked]:border-aegold-450 before:bg-primary-50 focus:ring-primary-400',
    hover:
      'hover:border-primary-500 before:absolute before:start-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100 rtl:before:translate-x-2/4',
    focus: 'focus-visible:ring-primary-500',
  },
  secondary: {
    checkbox:
      'border-secondary-400 data-[state=checked]:bg-secondary-800 data-[state=checked]:border-secondary-800 before:bg-secondary-50',
    hover:
      'hover:border-secondary-500 before:absolute before:start-2/4 before:top-2/4 before:mix-blend-multiply before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:rounded-full before:transition-all hover:before:scale-100 rtl:before:translate-x-2/4',
    focus: 'focus-visible:ring-secondary-500',
  },
} as const

// ============================================================================
// Types
// ============================================================================

export type CheckboxSize = 'sm' | 'base' | 'lg'
export type CheckboxVariant = 'primary' | 'secondary'

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'asChild'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
  label?: string
  description?: string
  size?: CheckboxSize
  variant?: CheckboxVariant
  className?: string
  asChild?: boolean
}

// ============================================================================
// Checkbox Component
// ============================================================================

export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (props, ref) => {
    const {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      required,
      name,
      value,
      id: providedId,
      label,
      description,
      size = 'base',
      variant = 'primary',
      className,
      asChild,
      ...rest
    } = CheckboxSchema.parse(props)

    // Generate a unique ID if none is provided
    const [randomId] = React.useState(() => Math.random().toString(36).slice(2))
    const id = providedId ?? `checkbox-${randomId}`

    return (
      <div className={twMerge('flex items-start gap-4', className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          asChild={asChild}
          className={twMerge(
            'flex shrink-0 items-center justify-center rounded border bg-whitely-50 transition-colors relative',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:before:!hidden disabled:pointer-events-none',
            sizeStyles[size].checkbox,
            variantStyles[variant].checkbox,
            variantStyles[variant].hover,
            variantStyles[variant].focus
          )}
          {...rest}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-whitely-50">
            <CheckIcon weight="bold" className={sizeStyles[size].icon} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {(label ?? description) && (
          <div className="flex flex-col gap-2">
            {label && (
              <label
                htmlFor={id}
                className={twMerge(
                  'text-aeblack-800 font-medium leading-none -mt-0.5 cursor-pointer',
                  disabled && 'text-aeblack-300 cursor-not-allowed',
                  sizeStyles[size].label
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={twMerge(
                  'text-aeblack-400 leading-snug',
                  disabled && 'text-aeblack-200',
                  sizeStyles[size].description
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
