import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva } from 'class-variance-authority'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const tabsSchema = z.object({
  variant: z.enum(['default', 'pills', 'compact']).default('default'),
  items: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      content: z.custom<React.ReactNode>(),
      icon: z.custom<React.ComponentType<{ className?: string }>>().optional(),
    })
  ),
  defaultValue: z.string().optional(),
})

// ============================================================================
// Variants
// ============================================================================

const tabsVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'border-b-2 border-gray-200',
      pills: '',
      compact: 'border-b-2 border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const tabListVariants = cva('flex gap-4 md:gap-6 lg:gap-7 xl:gap-8 -mb-px', {
  variants: {
    variant: {
      default: '',
      pills: '',
      compact: '',
    },
  },
})

const tabTriggerVariants = cva(
  'items-center gap-3 font-medium rounded-t-lg border-b-[3px] border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0',
  {
    variants: {
      variant: {
        default:
          'py-6 px-1 text-base hover:text-gray-950 hover:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:border-primary-500',
        pills:
          'py-3 px-4 lg:px-6 text-base rounded-lg hover:bg-aeblack-50 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900',
        compact:
          'py-4 px-1 text-sm hover:text-gray-950 hover:border-primary-500 data-[state=active]:text-primary-600 data-[state=active]:border-primary-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const tabContentVariants = cva(
  'p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0',
  {
    variants: {
      variant: {
        default: 'border-t border-aeblack-100 border-t-2',
        pills: '',
        compact: 'border-t border-aeblack-100 border-t-2',
      },
    },
  }
)

// ============================================================================
// Types
// ============================================================================

export type TabsVariant = 'default' | 'pills' | 'compact'

export interface TabItem {
  value: string
  label: string
  content: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}

export interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'defaultValue'> {
  variant?: TabsVariant
  items: TabItem[]
  defaultValue?: string
  className?: string
}

// ============================================================================
// Tabs Component
// ============================================================================

export const Tabs: React.FC<TabsProps> = ({ variant = 'default', items, defaultValue, className, ...props }) => {
  // Validate props
  try {
    tabsSchema.parse({ variant, items, defaultValue })
  } catch (error) {
    console.error('Tabs validation error:', error)
    return null
  }

  return (
    <TabsPrimitive.Root defaultValue={defaultValue ?? items[0]?.value} className={tabsVariants({ variant, className })} {...props}>
      <TabsPrimitive.List className={tabListVariants({ variant })}>
        {items.map(({ value, label, icon: Icon }) => (
          <TabsPrimitive.Trigger key={value} value={value} className={tabTriggerVariants({ variant })}>
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5" />}
              <span className="whitespace-nowrap">{label}</span>
            </div>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map(({ value, content }) => (
        <TabsPrimitive.Content key={value} value={value} className={tabContentVariants({ variant })}>
          {content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

Tabs.displayName = 'Tabs'
