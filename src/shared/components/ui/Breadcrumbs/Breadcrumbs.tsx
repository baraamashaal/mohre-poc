import type { ReactNode } from 'react'
import { CaretRightIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  separatorClassName?: string
  itemClassName?: string
  linkClassName?: string
}

export function Breadcrumbs({
  items,
  className = '',
  separatorClassName = '',
  itemClassName = '',
  linkClassName = '',
}: BreadcrumbsProps): ReactNode {
  if (items.length === 0) {
    return null
  }

  return (
    <nav
      className={cn('flex items-center', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <CaretRightIcon
                  weight="fill"
                  className={cn(
                    'mx-2 h-4 w-4 text-gray-400',
                    separatorClassName,
                  )}
                  aria-hidden="true"
                />
              )}

              <div className={cn('text-sm', itemClassName)}>
                {isLastItem ? (
                  <span
                    className="font-medium text-gray-900"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href ?? '#'}
                    onClick={(e) => {
                      if (!item.href) {
                        e.preventDefault()
                      }
                      if (item.onClick) {
                        item.onClick()
                      }
                    }}
                    className={cn(
                      'text-blue-600 hover:text-blue-800 hover:underline transition-colors',
                      linkClassName,
                    )}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
