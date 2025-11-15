import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { CaretDownIcon } from '@phosphor-icons/react'

// ============================================================================
// Styles
// ============================================================================

const accordionStyles = `
  @keyframes slideDown {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
  }
  @keyframes slideUp {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
  }
  .accordion-content[data-state='open'] {
  animation: slideDown 300ms ease-out;
  }

  .accordion-content[data-state='closed'] {
  animation: slideUp 300ms ease-out;
  }
`

// ============================================================================
// Schema
// ============================================================================

const AccordionItemSchema = z.object({
  value: z.string(),
  title: z.string(),
  children: z.custom<React.ReactNode>(),
  icon: z.custom<React.ComponentType<{ weight?: string; className?: string; style?: React.CSSProperties }>>().optional(),
  iconRotateDeg: z.number().optional().default(180),
})

const AccordionSchema = z.object({
  items: z.array(AccordionItemSchema),
  multiple: z.boolean().optional(),
  defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
  className: z.string().optional(),
  collapsible: z.boolean().optional(),
  onValueChange: z.function().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface AccordionItemConfig {
  value: string
  title: string
  children: React.ReactNode
  icon?: React.ComponentType<{ weight?: string; className?: string; style?: React.CSSProperties }>
  iconRotateDeg?: number
}

export interface AccordionProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>, 'type'> {
  items: AccordionItemConfig[]
  multiple?: boolean
  defaultValue?: string | string[]
  className?: string
  collapsible?: boolean
  onValueChange?: (value: string | string[]) => void
}

// ============================================================================
// AccordionItem Component
// ============================================================================

const AccordionItem = React.memo(
  React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Item>,
    AccordionItemConfig
  >(({ value, title, children, icon: Icon = CaretDownIcon, iconRotateDeg = 180 }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      value={value}
      className="border-b border-gray-200 [.accordion-wrapper_&:last-child]:border-0"
    >
      <AccordionPrimitive.Header className="w-full">
        <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between pe-3 ps-3 pb-5 pt-5 text-left text-base font-semibold text-gray-900 aria-expanded:text-aegold-600 hover:text-aegold-600 focus:text-aegold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 hover:transition-colors duration-150">
          {title}
          <Icon
            weight="bold"
            className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-hover:text-primary-600 group-data-[state=open]:[transform:rotate(var(--rotation-deg))]"
            style={
              {
                '--rotation-deg': `${String(iconRotateDeg)}deg`,
                transition: 'transform 0.2s ease-out',
              } as React.CSSProperties
            }
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="accordion-content overflow-hidden">
        <div className="pb-5 pt-5 ps-3 pe-3 text-gray-700 [&_.accordion-wrapper]:px-4">{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  ))
)

AccordionItem.displayName = 'AccordionItem'

// ============================================================================
// Accordion Component
// ============================================================================

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { items, multiple = false, defaultValue, className, collapsible = true, onValueChange, ...rest } =
    AccordionSchema.parse(props)

  if (multiple) {
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="multiple"
        defaultValue={defaultValue as string[]}
        className={twMerge('accordion-wrapper w-full', className)}
        onValueChange={onValueChange as (value: string[]) => void}
        {...rest}
      >
        <style>{accordionStyles}</style>
        {items.map((item) => (
          <AccordionItem key={item.value} {...item} />
        ))}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      ref={ref}
      type="single"
      defaultValue={defaultValue as string}
      collapsible={collapsible}
      className={twMerge('accordion-wrapper w-full', className)}
      onValueChange={onValueChange as (value: string) => void}
      {...rest}
    >
      <style>{accordionStyles}</style>
      {items.map((item) => (
        <AccordionItem key={item.value} {...item} />
      ))}
    </AccordionPrimitive.Root>
  )
})

Accordion.displayName = 'Accordion'
