import { forwardRef, type ReactNode } from 'react'
import { Hyperlink } from '../Hyperlink'
import { Badge } from '../Badge'
import { Dropdown } from '../Dropdown'
import { Button } from '../Button'
import { cn } from '../../../lib/utils'
import { DotsThree, Question } from '@phosphor-icons/react'

// ============================================================================
// Types
// ============================================================================

export interface ListItemTag {
  label: string
  value: string
}

export interface ListItemBadge {
  label: string
  variant?: 'success' | 'error' | 'warning' | 'secondary'
}

export interface ListItemAction {
  label: string
  value: string
  onClick: () => void
  icon?: ReactNode
}

export interface ListItemProps {
  icon?: ReactNode
  title: string
  href?: string
  description?: string
  tags?: ListItemTag[]
  badges?: ListItemBadge[]
  actions?: ListItemAction[]
  enquiries?: ListItemAction[]
  className?: string
  onClick?: () => void
}

// ============================================================================
// ListItem Component (UAE Design System - Listing Pattern)
// ============================================================================

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  ({ icon, title, href, description, tags = [], badges = [], actions = [], enquiries = [], className, onClick }, ref) => {
    const hasActionsOrEnquiries = actions.length > 0 || enquiries.length > 0

    return (
      <div
        ref={ref}
        className={cn(
          'p-4 bg-white border-b border-slate-200 last:border-b-0',
          onClick && !hasActionsOrEnquiries && 'cursor-pointer',
          className
        )}
        onClick={!hasActionsOrEnquiries ? onClick : undefined}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          {icon && (
            <div className="flex-shrink-0 text-gray-400 mt-1">
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="mb-2">
              {href ? (
                <Hyperlink
                  href={href}
                  variant="default"
                  className="font-semibold text-base text-gray-900"
                >
                  {title}
                </Hyperlink>
              ) : (
                <h3 className="font-semibold text-base text-gray-900 !m-0">
                  {title}
                </h3>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-gray-600 mb-3 !m-0 !mb-3">
                {description}
              </p>
            )}

            {/* Tags and Badges */}
            {(tags.length > 0 || badges.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {/* Gray tags for info */}
                {tags.map((tag, index) => (
                  <Badge
                    key={`tag-${index}`}
                    variant="secondary"
                  >
                    <span className="font-semibold">{tag.label}:</span>{' '}
                    {tag.value}
                  </Badge>
                ))}
                {/* Colored badges for status */}
                {badges.map((badge, index) => (
                  <Badge
                    key={`badge-${index}`}
                    variant={badge.variant ?? 'secondary'}
                  >
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions and Enquiries Dropdowns */}
          {hasActionsOrEnquiries && (
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* Actions Dropdown */}
              {actions.length > 0 && (
                <Dropdown
                  groups={[
                    {
                      items: actions.map((action) => ({
                        label: action.label,
                        value: action.value,
                        icon: action.icon as any,
                      })),
                    },
                  ]}
                  onSelect={(value) => {
                    const action = actions.find((a) => a.value === value)
                    action?.onClick()
                  }}
                  align="end"
                >
                  <Button
                    variant="link"
                    size="sm"
                    aria-label="Actions"
                    onClick={(e) => { e.stopPropagation() }}
                  >
                    <DotsThree size={24} weight="bold" />
                  </Button>
                </Dropdown>
              )}

              {/* Enquiries Dropdown */}
              {enquiries.length > 0 && (
                <Dropdown
                  groups={[
                    {
                      items: enquiries.map((enquiry) => ({
                        label: enquiry.label,
                        value: enquiry.value,
                        icon: enquiry.icon,
                      })),
                    },
                  ]}
                  onSelect={(value) => {
                    const enquiry = enquiries.find((e) => e.value === value)
                    enquiry?.onClick()
                  }}
                  align="end"
                >
                  <Button
                    variant="link"
                    size="sm"
                    aria-label="Enquiries"
                    onClick={(e) => { e.stopPropagation() }}
                  >
                    <Question size={24} weight="bold" />
                  </Button>
                </Dropdown>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ListItem.displayName = 'ListItem'
