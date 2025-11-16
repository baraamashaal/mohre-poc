import * as React from 'react'
import { z } from 'zod'

// ============================================================================
// Schema
// ============================================================================

const FooterAccordionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  children: z.custom<React.ReactNode>(),
  defaultOpen: z.boolean().optional().default(false),
})

const FooterAccordionSchema = z.object({
  items: z.array(FooterAccordionItemSchema),
  className: z.string().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface FooterAccordionItemConfig {
  id: string
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export interface FooterAccordionProps {
  items: FooterAccordionItemConfig[]
  className?: string
}

// ============================================================================
// FooterAccordion Component
// ============================================================================

/**
 * FooterAccordion Component
 *
 * UAE Design System compliant accordion component.
 * Renders the exact HTML structure, classes, and spacing used in the UAE Design System footer.
 *
 * Features:
 * - Mobile: Collapsible accordion with +/- icon
 * - Desktop: Always visible, buttons disabled
 * - Exact UAE Design System classes and structure
 * - React-managed state
 */
export const FooterAccordion: React.FC<FooterAccordionProps> = (props) => {
  const { items, className = '' } = FooterAccordionSchema.parse(props)

  // Track which items are open (for mobile)
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    const initialOpen = new Set<string>()
    items.forEach((item) => {
      if (item.defaultOpen) {
        initialOpen.add(item.id)
      }
    })
    return initialOpen
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <nav
      aria-label="footer navigation"
      className={`aegov-accordion aegov-mobile-accordion [&_.accordion-active_svg]:rotate-45 flex-1 ${className}`}
      id="mobile-accordion-collapse"
      data-accordion="collapse"
    >
      <ul className="grid sm:gap-x-2.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-y-8 md:gap-y-12 w-full">
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id)
          const headingId = `mobile-accordion-collapse-heading-${String(index + 1)}`
          const bodyId = `mobile-accordion-collapse-body-${String(index + 1)}`

          return (
            <li key={item.id} className="accordion-item border-b border-aeblack-100 sm:border-none">
              <div className="accordion-title sm:mb-4" id={headingId}>
                <button
                  className="max-sm:py-4 max-sm:flex justify-between sm:justify-start max-sm:items-center xl:cursor-default sm:pointer-events-none"
                  aria-label="heading"
                  type="button"
                  data-accordion-target={`#${bodyId}`}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  onClick={() => { toggleItem(item.id); }}
                >
                  <span>{item.title}</span>
                  <svg
                    className="sm:hidden"
                    data-accordion-icon
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease-out',
                    }}
                  >
                    <path
                      d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`accordion-content max-sm:py-4 sm:block ${isOpen ? '' : 'hidden'}`}
                id={bodyId}
                aria-labelledby={headingId}
              >
                {item.children}
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

FooterAccordion.displayName = 'FooterAccordion'
