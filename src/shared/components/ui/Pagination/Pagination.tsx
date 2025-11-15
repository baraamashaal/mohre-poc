import * as React from 'react'
import { z } from 'zod'
import { CaretLeftIcon, CaretRightIcon, CaretDoubleLeftIcon, CaretDoubleRightIcon } from '@phosphor-icons/react'
import { cn } from '../../../lib/utils'

// ============================================================================
// Schema
// ============================================================================

const paginationSchema = z.object({
  currentPage: z.number().min(1),
  totalPages: z.number().min(1),
  onPageChange: z.function(),
  className: z.string().optional(),
  showFirstLast: z.boolean().optional(),
})

// ============================================================================
// Types
// ============================================================================

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showFirstLast?: boolean
}

// ============================================================================
// Pagination Component
// ============================================================================

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = false,
}) => {
  try {
    paginationSchema.parse({ currentPage, totalPages, onPageChange, className, showFirstLast })
  } catch (error) {
    console.error('Pagination validation error:', error)
    return null
  }

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (showEllipsis) {
      if (currentPage <= 3) {
        // Show first 5 pages + ellipsis + last page
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 5 pages
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    } else {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    }

    return pages
  }

  const iconClasses = 'h-5 w-5 rtl:-scale-x-100'

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {/* Mobile Pagination */}
      <div className="flex w-full items-center justify-between sm:hidden">
        <button
          onClick={() => {
            onPageChange(currentPage - 1)
          }}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-2 py-1 text-gray-700 disabled:opacity-50"
          type="button"
        >
          <CaretLeftIcon className={iconClasses} />
          <span>Previous</span>
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 px-2 py-1 text-gray-700 disabled:opacity-50"
          type="button"
        >
          <span>Next</span>
          <CaretRightIcon className={iconClasses} />
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:items-center sm:gap-1">
        {showFirstLast && (
          <button
            onClick={() => {
              onPageChange(1)
            }}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50"
            type="button"
          >
            <CaretDoubleLeftIcon className={iconClasses} />
            <span className="hidden lg:inline">First</span>
          </button>
        )}

        <button
          onClick={() => {
            onPageChange(currentPage - 1)
          }}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50"
          type="button"
        >
          <CaretLeftIcon className={iconClasses} />
          <span className="hidden lg:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${String(index)}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => {
                  onPageChange(page as number)
                }}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm',
                  currentPage === page
                    ? 'bg-primary-550 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                )}
                type="button"
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50"
          type="button"
        >
          <span className="hidden lg:inline">Next</span>
          <CaretRightIcon className={iconClasses} />
        </button>

        {showFirstLast && (
          <button
            onClick={() => {
              onPageChange(totalPages)
            }}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-2 px-2 py-1 text-gray-700 hover:text-primary-600 disabled:opacity-50"
            type="button"
          >
            <span className="hidden lg:inline">Last</span>
            <CaretDoubleRightIcon className={iconClasses} />
          </button>
        )}
      </div>
    </div>
  )
}

Pagination.displayName = 'Pagination'
