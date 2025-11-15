import { CheckIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'

export type StepStatus = 'complete' | 'current' | 'pending'

export interface StepItem {
  label: string
  description?: string
  status: StepStatus
}

export interface StepsProps {
  steps: StepItem[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Steps({
  steps,
  orientation = 'horizontal',
  className,
}: StepsProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        return (
          <div
            key={index}
            className={cn(
              'flex',
              orientation === 'horizontal'
                ? 'flex-1 items-center'
                : 'flex-row items-start'
            )}
          >
            <div
              className={cn(
                'flex items-center',
                orientation === 'horizontal' ? 'flex-col' : 'flex-col mr-4'
              )}
            >
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                    step.status === 'complete' &&
                      'border-primary-600 bg-primary-600 text-white',
                    step.status === 'current' &&
                      'border-primary-600 bg-white text-primary-600',
                    step.status === 'pending' &&
                      'border-gray-300 bg-white text-gray-400'
                  )}
                >
                  {step.status === 'complete' ? (
                    <CheckIcon className="h-6 w-6" weight="bold" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={cn(
                    orientation === 'horizontal'
                      ? 'h-0.5 w-full flex-1'
                      : 'h-full w-0.5 ml-5 my-2',
                    step.status === 'complete'
                      ? 'bg-primary-600'
                      : 'bg-gray-300'
                  )}
                />
              )}
            </div>

            {/* Step Content */}
            <div
              className={cn(
                'flex flex-col',
                orientation === 'horizontal' ? 'mt-2 text-center' : 'ml-0 mb-8'
              )}
            >
              <span
                className={cn(
                  'text-sm font-medium',
                  step.status === 'current' && 'text-primary-600',
                  step.status === 'complete' && 'text-gray-900',
                  step.status === 'pending' && 'text-gray-500'
                )}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="mt-1 text-xs text-gray-500">
                  {step.description}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </nav>
  )
}
