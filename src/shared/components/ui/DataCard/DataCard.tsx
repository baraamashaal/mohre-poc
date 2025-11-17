import { forwardRef, type ReactNode } from 'react'
import { Card } from '../Card'
import { Hyperlink } from '../Hyperlink'
import { cn } from '../../../lib/utils'

// ============================================================================
// Types
// ============================================================================

export interface DataCardProps {
  icon?: ReactNode
  title: string
  href?: string
  metadata?: {
    label: string
    value: string
  }[]
  className?: string
  onClick?: () => void
}

// ============================================================================
// DataCard Component (UAE Design System - Open Data Pattern)
// ============================================================================

export const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  ({ icon, title, href, metadata = [], className, onClick }, ref) => {
    return (
      <Card
        ref={ref}
        bordered
        glow
        size="base"
        className={cn(
          'bg-gray-50 hover:bg-gray-100 cursor-pointer',
          className
        )}
        onClick={onClick}
      >
        {/* Icon */}
        {icon && (
          <div className="mb-4 text-gray-400">
            {icon}
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          {href ? (
            <Hyperlink
              href={href}
              variant="default"
              className="font-semibold text-base text-gray-900 hover:text-primary-600 line-clamp-3"
            >
              {title}
            </Hyperlink>
          ) : (
            <h3 className="font-semibold text-base text-gray-900 line-clamp-3 m-0">
              {title}
            </h3>
          )}
        </div>

        {/* Metadata */}
        {metadata.length > 0 && (
          <div className="space-y-1">
            {metadata.map((item, index) => (
              <p key={index} className="text-sm text-gray-600 !m-0">
                <span className="font-medium">{item.label}:</span>{' '}
                <span>{item.value}</span>
              </p>
            ))}
          </div>
        )}
      </Card>
    )
  }
)

DataCard.displayName = 'DataCard'
