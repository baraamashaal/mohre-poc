import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../../../lib/utils'

export interface RangeSliderProps {
  label?: string
  min?: number
  max?: number
  step?: number
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  showValue?: boolean
  disabled?: boolean
  className?: string
}

export const RangeSlider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>((props, ref) => {
  const { label, min = 0, max = 100, step = 1, value, defaultValue = [min], onValueChange, showValue = true, disabled, className } = props

    const sliderId = React.useId()
    const [internalValue, setInternalValue] = React.useState(defaultValue)

    const currentValue = value ?? internalValue

    const handleValueChange = (newValue: number[]) => {
      if (!value) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <div className={cn('flex w-full flex-col gap-2', className)}>
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={sliderId} className="text-sm font-medium text-gray-900">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-medium text-gray-600">
              {currentValue.join(' - ')}
            </span>
          )}
        </div>

        <SliderPrimitive.Root
          ref={ref}
          id={sliderId}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onValueChange={handleValueChange}
          disabled={disabled}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
            <SliderPrimitive.Range className="absolute h-full bg-primary-600" />
          </SliderPrimitive.Track>

          {currentValue.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className="block h-5 w-5 rounded-full border-2 border-primary-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Root>

        <div className="flex justify-between text-xs text-gray-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    )
  })

RangeSlider.displayName = 'RangeSlider'
