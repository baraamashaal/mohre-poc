import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as LabelPrimitive from '@radix-ui/react-label'
import { CaretDownIcon, CaretUpIcon, CheckIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const selectSchema = z.object({
  value: z.string().optional(),
  onChange: z.function().optional(),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      disabled: z.boolean().optional(),
    })
  ),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  id: z.string().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export type SelectSize = 'sm' | 'base' | 'lg'
export type SelectVariant = 'primary' | 'secondary'

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  options: SelectOption[]
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: SelectSize
  variant?: SelectVariant
  id?: string
  className?: string
}

// ============================================================================
// Select Component
// ============================================================================

export const Select = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(
  (
    {
      value,
      onChange,
      options = [],
      label,
      error,
      helperText,
      placeholder = 'Select an option',
      disabled,
      required,
      size = 'base',
      variant = 'primary',
      id,
      className,
      ...props
    },
    ref
  ) => {
    // Validate props with Zod
    try {
      selectSchema.parse({
        value,
        onChange,
        options,
        label,
        error,
        helperText,
        placeholder,
        disabled,
        required,
        size,
        variant,
        id,
      })
    } catch (validationError) {
      console.error('Select component validation error:', validationError)
    }

    const sizeClasses = {
      sm: 'h-10 text-sm py-2.5',
      base: 'h-12 text-base py-3',
      lg: 'h-14 text-lg py-4',
    } as const

    const labelSizeClasses = {
      sm: 'text-sm',
      base: 'text-sm',
      lg: 'text-base',
    } as const

    const variantClasses = {
      primary: 'focus-within:ring-primary-400 ring-primary-400',
      secondary: 'focus-within:ring-secondary-600 ring-secondary-400',
      error: 'focus-within:ring-red-600 ring-red-400 bg-red-50',
    } as const

    const triggerClasses = cn(
      'relative flex rtl:flex-row-reverse rtl:text-right w-full items-center justify-between rounded-lg shadow-sm ring-2 ring-inset focus:ring-2 focus:ring-inset bg-whitely-50',
      'px-4 text-left outline-none',
      'data-[placeholder]:text-gray-400',
      variantClasses[error ? 'error' : variant],
      sizeClasses[size],
      disabled && 'opacity-40 cursor-not-allowed',
      className
    )

    const contentClasses = cn(
      'overflow-hidden rounded-lg bg-white shadow-lg',
      'border border-gray-200',
      'z-50',
      'w-[var(--radix-select-trigger-width)]'
    )

    const viewportClasses = cn('max-h-[300px] overflow-auto')

    const itemClasses = cn(
      'relative flex rtl:flex-row-reverse rtl:text-right items-center px-4 py-2 text-gray-900',
      'data-[highlighted]:bg-primary-50 data-[highlighted]:text-primary-900',
      'data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none',
      'outline-none cursor-pointer'
    )

    const scrollButtonClasses = cn('flex items-center justify-center h-6 bg-white text-gray-700', 'cursor-default')

    return (
      <div className="w-full">
        {label && (
          <LabelPrimitive.Root
            htmlFor={id}
            className={cn(
              'mb-1 block font-medium text-gray-900',
              labelSizeClasses[size],
              error && 'text-red-600',
              required && 'after:ml-0.5 after:text-red-500 after:content-["*"]'
            )}
          >
            {label}
          </LabelPrimitive.Root>
        )}

        <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled} {...props}>
          <SelectPrimitive.Trigger ref={ref} className={triggerClasses} aria-label={label ?? placeholder}>
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <CaretDownIcon className="h-5 w-5 text-aegold-700 font-bold" weight="bold" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className={contentClasses} position="popper" sideOffset={5}>
              <SelectPrimitive.ScrollUpButton className={scrollButtonClasses}>
                <CaretUpIcon className="h-4 w-4 font-bold" weight="bold" />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className={viewportClasses}>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(itemClasses, labelSizeClasses[size])}
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="absolute right-2 rtl:left-2 rtl:right-auto flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-primary-600" weight="bold" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className={scrollButtonClasses}>
                <CaretDownIcon className="h-4 w-4" weight="bold" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {(error ?? helperText) && (
          <p className={cn('mt-1 text-sm', error ? 'text-red-600' : 'text-gray-500')}>{error ?? helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
