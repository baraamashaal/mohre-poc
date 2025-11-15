import { type MouseEvent, type FC, forwardRef, type ReactNode, type ComponentPropsWithoutRef, useState, Fragment } from 'react'
import { Root, Trigger, Portal, Content, Item, ItemIndicator, Separator, Label, Group } from '@radix-ui/react-dropdown-menu'
import { CheckIcon } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const dropdownItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.custom<FC<{ className?: string; weight?: string }>>().optional(),
})

const dropdownGroupSchema = z.object({
  label: z.string().optional(),
  items: z.array(dropdownItemSchema),
})

const dropdownSchema = z.object({
  groups: z.array(dropdownGroupSchema),
  className: z.string().optional(),
  align: z.enum(['start', 'center', 'end']).optional(),
  side: z.enum(['top', 'right', 'bottom', 'left']).optional(),
  onSelect: z.function().optional(),
  header: z.custom<ReactNode>().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface DropdownItemConfig {
  label: string
  value: string
  icon?: FC<{ className?: string; weight?: string }>
}

export interface DropdownGroupConfig {
  label?: string
  items: DropdownItemConfig[]
}

export interface DropdownProps extends Omit<ComponentPropsWithoutRef<typeof Content>, 'children' | 'content' | 'onSelect'> {
  children: ReactNode
  groups: DropdownGroupConfig[]
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  onSelect?: (value: string) => void
  header?: ReactNode
  content?: ReactNode
  trigger?: 'click' | 'hover'
}

// ============================================================================
// DropdownItem Component
// ============================================================================

const DropdownItem = forwardRef<HTMLDivElement, DropdownItemConfig & { onSelect?: () => void }>(
  ({ label, icon: Icon, onSelect }, ref) => (
    <Item
      ref={ref}
      className="relative flex items-center gap-3 px-3 py-3 text-sm text-gray-700 outline-none transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 disabled:pointer-events-none disabled:opacity-50"
      onSelect={onSelect}
    >
      {Icon && <Icon className="h-4 w-4" weight="regular" />}
      {label}
      <ItemIndicator className="absolute right-2 flex h-4 w-4 items-center justify-center">
        <CheckIcon className="h-4 w-4 text-primary-600" weight="bold" />
      </ItemIndicator>
    </Item>
  )
)

DropdownItem.displayName = 'DropdownItem'

// ============================================================================
// Dropdown Component
// ============================================================================

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, groups, className, align = 'start', side = 'bottom', onSelect, header, content, trigger = 'click', ...rest }, ref) => {
    const [open, setOpen] = useState(false)

    try {
      dropdownSchema.parse({ groups, className, align, side, onSelect, header })
    } catch (error) {
      console.error('Dropdown validation error:', error)
      return null
    }

    const isHover = trigger.includes('hover')
    const isClick = trigger.includes('click')

    const triggerProps: Record<string, unknown> = {}
    if (isHover) {
      triggerProps.onMouseEnter = () => {
        setOpen(true)
      }
      triggerProps.onMouseLeave = (e: MouseEvent) => {
        if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false)
        }
      }
    }
    if (isClick) {
      triggerProps.onClick = () => {
        setOpen((prev) => !prev)
      }
    }

    const contentProps: Record<string, unknown> = {}
    if (isHover) {
      contentProps.onMouseEnter = () => {
        setOpen(true)
      }
      contentProps.onMouseLeave = (e: MouseEvent) => {
        if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false)
        }
      }
    }

    return (
      <Root open={isHover ? open : undefined} onOpenChange={isHover ? setOpen : undefined}>
        <Trigger asChild>
          <div {...triggerProps}>{children}</div>
        </Trigger>

        <Portal>
          <Content
            ref={ref}
            align={align}
            side={side}
            className={twMerge(
              'z-50 min-w-[300px] overflow-hidden rounded-lg bg-white border border-gray-200 p-1 shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 max-h-60 overflow-y-auto',
              className
            )}
            {...rest}
            {...contentProps}
          >
            {content ?? (
              <>
                {header && (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">{header}</div>
                  </>
                )}
                {groups.map((group, groupIndex) => (
                  <Group key={groupIndex}>
                    {group.label && <Label className="px-3 py-2 text-xs font-medium text-gray-500 rtl:text-right">{group.label}</Label>}
                    {group.items.map((item) => (
                      <Fragment key={item.value}>
                        <DropdownItem {...item} onSelect={() => onSelect?.(item.value)} />
                      </Fragment>
                    ))}
                    {groupIndex < groups.length - 1 && <Separator className="my-1 h-px bg-gray-100" />}
                  </Group>
                ))}
              </>
            )}
          </Content>
        </Portal>
      </Root>
    )
  }
)

Dropdown.displayName = 'Dropdown'
