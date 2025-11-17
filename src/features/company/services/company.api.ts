import { get, post, put, del } from '../../../shared/lib/axios'
import type { ApiResponse, PaginatedResponse, QueryParams } from '../../../shared/types/api.types'
import type { Company } from '../types/company.types'

// ============================================================================
// API Endpoints
// ============================================================================

const COMPANY_ENDPOINTS = {
  LIST: '/companies',
  DETAILS: (id: string) => `/companies/${id}`,
  CREATE: '/companies',
  UPDATE: (id: string) => `/companies/${id}`,
  DELETE: (id: string) => `/companies/${id}`,
  EMPLOYEES: (id: string) => `/companies/${id}/employees`,
  STATISTICS: (id: string) => `/companies/${id}/statistics`,
} as const

// ============================================================================
// Request/Response Types
// ============================================================================

export interface CreateCompanyRequest {
  name: string
  tradeNumber: string
  emirate: string
  industry: string
  licenseNumber?: string
  email?: string
  phone?: string
  address?: string
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  status?: 'active' | 'inactive' | 'suspended'
}

export interface CompanyStatistics {
  totalEmployees: number
  activeEmployees: number
  pendingWorkPermits: number
  expiringWorkPermits: number
  totalComplaints: number
  openComplaints: number
}

// ============================================================================
// Company API Functions
// ============================================================================

/**
 * Get list of companies for current user
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of companies
 */
export async function getCompanies(
  params?: QueryParams
): Promise<PaginatedResponse<Company>> {
  return await get<PaginatedResponse<Company>>(COMPANY_ENDPOINTS.LIST, params)
}

/**
 * Get company details by ID
 * @param id - Company ID
 * @returns Company details
 */
export async function getCompanyById(id: string): Promise<Company> {
  const response = await get<ApiResponse<Company>>(COMPANY_ENDPOINTS.DETAILS(id))
  return response.data
}

/**
 * Create a new company
 * @param data - Company creation data
 * @returns Created company
 */
export async function createCompany(
  data: CreateCompanyRequest
): Promise<Company> {
  const response = await post<ApiResponse<Company>, CreateCompanyRequest>(
    COMPANY_ENDPOINTS.CREATE,
    data
  )
  return response.data
}

/**
 * Update company details
 * @param id - Company ID
 * @param data - Company update data
 * @returns Updated company
 */
export async function updateCompany(
  id: string,
  data: UpdateCompanyRequest
): Promise<Company> {
  const response = await put<ApiResponse<Company>, UpdateCompanyRequest>(
    COMPANY_ENDPOINTS.UPDATE(id),
    data
  )
  return response.data
}

/**
 * Delete a company
 * @param id - Company ID
 */
export async function deleteCompany(id: string): Promise<void> {
  await del<ApiResponse<null>>(COMPANY_ENDPOINTS.DELETE(id))
}

/**
 * Get company statistics
 * @param id - Company ID
 * @returns Company statistics
 */
export async function getCompanyStatistics(
  id: string
): Promise<CompanyStatistics> {
  const response = await get<ApiResponse<CompanyStatistics>>(
    COMPANY_ENDPOINTS.STATISTICS(id)
  )
  return response.data
}
