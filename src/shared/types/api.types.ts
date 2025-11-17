// ============================================================================
// API Common Types
// ============================================================================

/**
 * Standard API error response structure
 */
export interface ApiError {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
  timestamp?: string
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

/**
 * Standard API success response
 */
export interface ApiResponse<T> {
  data: T
  message?: string
  timestamp?: string
}

/**
 * Pagination request parameters
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * Filter parameters for list endpoints
 */
export interface FilterParams {
  search?: string
  status?: string
  startDate?: string
  endDate?: string
  [key: string]: string | number | boolean | undefined
}

/**
 * Combined query parameters for list endpoints
 */
export interface QueryParams extends PaginationParams, FilterParams {}
