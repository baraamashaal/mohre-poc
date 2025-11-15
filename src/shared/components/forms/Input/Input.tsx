import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { EyeIcon, EyeSlashIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const inputSchema = z.object({
  type: z.string().optional(),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  prefix: z.custom<React.ReactNode>().optional(),
  suffix: z.custom<React.ReactNode>().optional(),
  size: z.enum(['sm', 'base', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary']).optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  id: z.string().optional(),
})

// ============================================================================
// Types
// ============================================================================

export type InputSize = 'sm' | 'base' | 'lg'
export type InputVariant = 'primary' | 'secondary'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string
  error?: string
  helperText?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: InputSize
  variant?: InputVariant
  disabled?: boolean
  required?: boolean
  id?: string
}

// ============================================================================
// Input Component
// ============================================================================

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      error,
      helperText,
      prefix,
      suffix,
      className,
      size = 'base',
      variant = 'primary',
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    // Validate props with Zod
    try {
      inputSchema.parse({
        type,
        label,
        error,
        helperText,
        prefix,
        suffix,
        size,
        variant,
        disabled,
        required,
        id,
      })
    } catch (validationError) {
      console.error('Input component validation error:', validationError)
    }

    const [showPassword, setShowPassword] = React.useState(false)
    const [localType, setLocalType] = React.useState(type)

    React.useEffect(() => {
      if (type === 'password') {
        setLocalType(showPassword ? 'text' : 'password')
      }
    }, [showPassword, type])

    const sizeClasses = {
      sm: 'h-10 text-sm',
      base: 'h-12 text-base',
      lg: 'h-14 text-lg',
    } as const

    const labelSizeClasses = {
      sm: 'text-sm',
      base: 'text-sm',
      lg: 'text-base',
    } as const

    const variantClasses = {
      primary: 'focus-within:ring-primary-support-400 ring-primary-400',
      secondary: 'focus-within:ring-secondary-600 ring-secondary-400',
      error: 'focus-within:ring-red-600 ring-red-400 bg-red-50',
    } as const

    const inputContainerClasses = cn(
      'relative flex rounded-lg shadow-sm ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset bg-whitely-50',
      variantClasses[error ? 'error' : variant],
      disabled && 'opacity-40',
      className
    )

    const inputClasses = cn(
      'w-full flex-1 border-0 bg-transparent ps-4 text-gray-900 placeholder:text-gray-400',
      'focus:ring-0 outline-none disabled:cursor-not-allowed',
      sizeClasses[size],
      prefix && 'pl-1.5',
      suffix && 'pr-1.5'
    )

    const renderPasswordToggle = () => (
      <button
        type="button"
        onClick={() => {
          setShowPassword(!showPassword)
        }}
        className="pr-4 rtl:pl-4 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
      </button>
    )

    const renderSearchIcon = () => <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />

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

        <div className={inputContainerClasses}>
          {prefix && <div className="flex select-none items-center ps-4 text-gray-500">{prefix}</div>}

          {type === 'search' && !prefix && (
            <div className="flex select-none items-center ps-4 text-gray-500">{renderSearchIcon()}</div>
          )}

          <input
            ref={ref}
            type={localType}
            id={id}
            disabled={disabled}
            required={required}
            className={inputClasses}
            {...props}
          />

          {suffix && <div className="flex select-none items-center pr-4 text-gray-500">{suffix}</div>}

          {type === 'password' && !suffix && renderPasswordToggle()}
        </div>

        {(error ?? helperText) && (
          <p className={cn('mt-1 text-sm text-aeblack-500', error ? 'text-red-600' : 'text-gray-500')}>
            {error ?? helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
