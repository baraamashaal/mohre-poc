import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { Tooltip } from '../Tooltip'
import { useWindowSize } from './hooks'
import {
  dropdownSchema,
  navItemSchema,
  mainMenuSchema,
  secondaryMenuSchema,
  type DropdownData,
} from './schemas'

// ============================================================================
// Types
// ============================================================================

export interface NavItemProps extends Omit<React.ComponentPropsWithoutRef<typeof NavigationMenu.Item>, 'asChild'> {
  children: React.ReactNode
  icon?: React.ComponentType<{ weight?: string; className?: string }>
  href?: string
  isActive?: boolean
  dropdown?: DropdownData | React.ReactElement
  asChild?: boolean
  type?: 'primary' | 'secondary'
  tooltipText?: string
}

export interface MainMenuProps extends React.ComponentPropsWithoutRef<typeof NavigationMenu.Root> {
  children: React.ReactNode
  className?: string
}

export interface SecondaryMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export interface MobileNavigationProps {
  children: React.ReactNode
  logo?: React.ReactNode
}

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  isMobile?: boolean
  logo?: React.ReactNode
}

// ============================================================================
// NavItem Component
// ============================================================================

export const NavItem = React.forwardRef<
  React.ComponentRef<typeof NavigationMenu.Item>,
  NavItemProps
>(({ children, icon: Icon, href, isActive, dropdown, asChild = false, type = 'primary', tooltipText, ...props }, ref) => {
  // Validate props with Zod
  try {
    navItemSchema.parse({
      children,
      icon: Icon,
      href,
      isActive,
      dropdown,
      asChild,
      type,
      tooltipText,
    })
  } catch (error) {
    console.error('NavItem validation error:', error)
    return null
  }

  const hasDropdown = dropdown && (Array.isArray(dropdown) || React.isValidElement(dropdown))

  // Validate dropdown schema if it's an array
  if (hasDropdown && !React.isValidElement(dropdown)) {
    try {
      dropdownSchema.parse(dropdown)
    } catch (error) {
      console.error('Invalid dropdown schema', dropdown, error)
    }
  }

  // AsChild mode - render custom component
  if (asChild) {
    return (
      <NavigationMenu.Item
        className={twMerge('relative', isActive && 'active-page')}
        ref={ref}
        {...props}
      >
        {children}
      </NavigationMenu.Item>
    )
  }

  // Secondary navigation item (icon-only with tooltip)
  if (type === 'secondary') {
    return (
      <Tooltip content={tooltipText ?? (typeof children === 'string' ? children : '')} side="bottom">
        <li ref={ref as React.Ref<HTMLLIElement>} {...props}>
          <a
            href={href ?? '#'}
            className="flex items-center justify-center flex-shrink-0 h-14 px-3 focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-none"
            aria-label={typeof children === 'string' ? children : tooltipText}
            title={tooltipText ?? (typeof children === 'string' ? children : '')}
          >
            {Icon && <Icon weight="regular" className="w-6 h-6 text-primary-600 hover:text-primary-500" />}
            <span className="sr-only">{children}</span>
          </a>
        </li>
      </Tooltip>
    )
  }

  // Dropdown navigation item
  if (hasDropdown) {
    return (
      <NavigationMenu.Item className="group relative z-[1]" ref={ref}>
        <NavigationMenu.Trigger
          className={twMerge(
            'group inline-flex rtl:flex-row-reverse items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors',
            'hover:border-primary-800 hover:text-primary-800',
            '[&[data-state=open]]:border-primary-800',
            'focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-none',
            isActive && 'border-primary-900 text-primary-900'
          )}
        >
          {Icon && <Icon weight="regular" className="h-5 w-5" />}
          {children}
          <CaretDownIcon
            weight="bold"
            className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </NavigationMenu.Trigger>

        <NavigationMenu.Content
          className="mt-2 absolute z-50 min-w-[300px] rtl:right-0 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight"
        >
          <div className="rounded-lg border border-aeblack-100 bg-whitely-50 p-4 shadow-lg">
            {React.isValidElement(dropdown) ? (
              dropdown
            ) : (
              <div className="flex flex-col rtl:text-right">
                {Array.isArray(dropdown) &&
                  dropdown.map((group) => (
                    <div key={group.title} className="mb-6 last:mb-0">
                      <h2 className="mb-2 text-primary-500 font-bold">{group.title}</h2>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={`${group.title}-${item.href}`}>
                            <NavigationMenu.Link
                              href={item.href}
                              className="block px-2 py-1.5 text-aeblack-900 rounded hover:bg-aeblack-50 hover:text-primary-700 transition-colors"
                            >
                              {item.label}
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    )
  }

  // Regular navigation item
  return (
    <NavigationMenu.Item
      className={twMerge('relative', isActive && 'active-page')}
      ref={ref}
      {...props}
    >
      <NavigationMenu.Link
        href={href ?? '#'}
        className={twMerge(
          'inline-flex rtl:flex-row-reverse items-center gap-2 border-b-2 border-transparent px-3 py-4 font-bold transition-colors hover:border-primary-800 hover:text-primary-800',
          'focus-visible:ring-primary-support-400 focus-visible:ring-2 focus-visible:ring-inset outline-none',
          isActive && 'border-primary-900 text-primary-900'
        )}
      >
        {Icon && <Icon weight="regular" className="h-5 w-5" />}
        {children}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  )
})

NavItem.displayName = 'NavItem'

// ============================================================================
// MainMenu Component
// ============================================================================

export const MainMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenu.Root>,
  MainMenuProps
>(({ children, className, ...props }, ref) => {
  try {
    mainMenuSchema.parse({ children, className })
  } catch (error) {
    console.error('MainMenu validation error:', error)
    return null
  }

  return (
    <NavigationMenu.Root className="relative z-[1]" ref={ref} {...props}>
      <NavigationMenu.List className={twMerge('flex items-center gap-1 rtl:flex-row-reverse', className)}>
        {children}
        <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
})

MainMenu.displayName = 'MainMenu'

// ============================================================================
// SecondaryMenu Component
// ============================================================================

export const SecondaryMenu = React.forwardRef<HTMLDivElement, SecondaryMenuProps>(
  ({ children, className, ...props }, ref) => {
    try {
      secondaryMenuSchema.parse({ children, className })
    } catch (error) {
      console.error('SecondaryMenu validation error:', error)
      return null
    }

    return (
      <div className={twMerge('header-navs-right', className)} ref={ref} {...props}>
        <ul className="flex items-center">{children}</ul>
      </div>
    )
  }
)

SecondaryMenu.displayName = 'SecondaryMenu'

// ============================================================================
// MobileNavigation Component
// ============================================================================

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ children, logo }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  let mainMenuItems: React.ReactElement[] = []
  let secondaryMenuItems: React.ReactElement[] = []

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === MainMenu) {
        const childProps = child.props as MainMenuProps
        const childrenArray = React.Children.toArray(childProps.children)
        mainMenuItems = childrenArray.filter((c): c is React.ReactElement => React.isValidElement(c))
      } else if (child.type === SecondaryMenu) {
        const childProps = child.props as SecondaryMenuProps
        const childrenArray = React.Children.toArray(childProps.children)
        secondaryMenuItems = childrenArray.filter((c): c is React.ReactElement => React.isValidElement(c))
      }
    }
  })

  const [submenuOpenStates, setSubmenuOpenStates] = React.useState<boolean[]>(
    Array(mainMenuItems.length).fill(false)
  )

  const toggleSubmenu = (index: number) => {
    const newStates = [...submenuOpenStates]
    newStates[index] = !newStates[index]
    setSubmenuOpenStates(newStates)
  }

  return (
    <div>
      <div className="py-2.5">
        <div className="flex items-center justify-between">
          <div className="logos">
            <div className="logo-item">
              <a href="#" className="logo block">
                <span className="sr-only">Logo</span>
                {logo}
              </a>
            </div>
          </div>
          <div className="header-top-right">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsOpen(true)
                }}
                className="hamburger-icon text-aeblack-700"
                type="button"
              >
                <ListIcon weight="light" className="w-8 h-8" />
                <span className="sr-only">Toggle main menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="flex flex-col h-full">
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <a href="#" className="logo">
                {logo}
              </a>
              <button
                onClick={() => {
                  setIsOpen(false)
                }}
                className="text-black"
                type="button"
              >
                <XIcon weight="light" className="w-8 h-8" />
                <span className="sr-only">Close main menu</span>
              </button>
            </div>

            {/* Main content area with scrolling */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {/* Main menu items */}
                <div className="mb-6">
                  <nav aria-label="Main navigation">
                    <ul className="space-y-4">
                      {mainMenuItems.map((item, index) => {
                        const props = item.props as NavItemProps
                        const hasDropdown = Boolean(props.dropdown)
                        const Icon = props.icon
                        const isSubmenuOpen = submenuOpenStates[index] ?? false
                        const childrenKey = typeof props.children === 'string' ? props.children : String(index)
                        const itemKey = props.href ?? `menu-item-${childrenKey}`

                        return (
                          <li key={itemKey} className="relative">
                            <div className="flex items-center">
                              <a
                                href={hasDropdown ? undefined : props.href ?? '#'}
                                onClick={
                                  hasDropdown
                                    ? () => {
                                        toggleSubmenu(index)
                                      }
                                    : undefined
                                }
                                className={`py-2 w-full text-black font-medium ${hasDropdown ? 'rtl:pr-6' : ''}`}
                              >
                                {Icon && <Icon className="inline-block mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />}
                                {props.children}
                              </a>
                              {hasDropdown && (
                                <button
                                  onClick={() => {
                                    toggleSubmenu(index)
                                  }}
                                  className="absolute right-0 top-3 w-6"
                                  type="button"
                                >
                                  <CaretDownIcon
                                    weight="bold"
                                    className={`transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                                  />
                                  <span className="sr-only">
                                    {isSubmenuOpen ? 'Hide' : 'Show'} submenu for &quot;{props.children}&quot;
                                  </span>
                                </button>
                              )}
                            </div>

                            {hasDropdown && isSubmenuOpen && Array.isArray(props.dropdown) && (
                              <div className="mt-2 pl-2">
                                {props.dropdown.map((group) => (
                                  <div key={`${itemKey}-${group.title}`} className="mb-4">
                                    <h3 className="text-primary-500 font-bold mb-2">{group.title}</h3>
                                    <ul className="space-y-2">
                                      {group.items.map((subItem) => (
                                        <li key={`${itemKey}-${group.title}-${subItem.href}`}>
                                          <a href={subItem.href} className="block py-1 text-black">
                                            {subItem.label}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            {/* Footer with utility links */}
            <div className="border-t border-gray-200 p-4">
              <ul className="space-y-4">
                {secondaryMenuItems.map((item) => {
                  const props = item.props as NavItemProps
                  const Icon = props.icon
                  const secondaryChildrenKey = typeof props.children === 'string' ? props.children : 'item'
                  const secondaryKey = props.href ?? `secondary-${secondaryChildrenKey}`

                  return (
                    <li key={secondaryKey}>
                      <a href={props.href ?? '#'} className="flex items-center text-black">
                        {Icon && <Icon className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />}
                        <span>{props.children}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

MobileNavigation.displayName = 'MobileNavigation'

// ============================================================================
// Main Navigation Component
// ============================================================================

export const Navigation = React.forwardRef<HTMLDivElement, NavigationProps>(
  ({ children, className, isMobile = false, logo, ...props }, ref) => {
    if (isMobile) {
      return <MobileNavigation logo={logo}>{children}</MobileNavigation>
    }

    return (
      <div className={twMerge('hidden lg:block', className)} ref={ref} {...props}>
        <div className="bg-aeblack-50">
          <div className="container">
            <div className="flex items-center justify-between">{children}</div>
          </div>
        </div>
      </div>
    )
  }
)

Navigation.displayName = 'Navigation'

// ============================================================================
// Compound Component Pattern
// ============================================================================

export const NavigationCompound = Object.assign(Navigation, {
  MainMenu,
  SecondaryMenu,
  NavItem,
  useWindowSize,
})
