import { get, post } from '../../../shared/lib/axios'
import type { ApiResponse, PaginatedResponse, QueryParams } from '../../../shared/types/api.types'
import type { Employee } from '../../employee/types/employee.types'

// ============================================================================
// API Endpoints
// ============================================================================

const SPONSOR_ENDPOINTS = {
  PROFILE: '/sponsors/profile',
  EMPLOYEES: '/sponsors/employees',
  STATISTICS: '/sponsors/statistics',
  REQUESTS: '/sponsors/requests',
  SUBMIT_REQUEST: '/sponsors/requests',
} as const

// ============================================================================
// Request/Response Types
// ============================================================================

export interface SponsorProfile {
  id: string
  name: string
  emiratesId: string
  email?: string
  phone?: string
  address?: string
  totalDomesticWorkers: number
  activeDomesticWorkers: number
  status: 'active' | 'inactive'
}

export interface SponsorStatistics {
  totalEmployees: number
  activeEmployees: number
  pendingRequests: number
  expiringWorkPermits: number
}

export interface SponsorRequest {
  id: string
  type: string
  employeeId?: string
  employeeName?: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  submittedDate: string
  processedDate?: string
  remarks?: string
}

export interface SubmitSponsorRequestData {
  type: string
  employeeId?: string
  description: string
  documents?: File[]
}

// ============================================================================
// Sponsor API Functions
// ============================================================================

/**
 * Get sponsor profile
 * @returns Sponsor profile data
 */
export async function getSponsorProfile(): Promise<SponsorProfile> {
  const response = await get<ApiResponse<SponsorProfile>>(SPONSOR_ENDPOINTS.PROFILE)
  return response.data
}

/**
 * Get domestic workers sponsored by current user
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of employees
 */
export async function getSponsoredEmployees(
  params?: QueryParams
): Promise<PaginatedResponse<Employee>> {
  return await get<PaginatedResponse<Employee>>(SPONSOR_ENDPOINTS.EMPLOYEES, params)
}

/**
 * Get sponsor statistics
 * @returns Sponsor statistics
 */
export async function getSponsorStatistics(): Promise<SponsorStatistics> {
  const response = await get<ApiResponse<SponsorStatistics>>(
    SPONSOR_ENDPOINTS.STATISTICS
  )
  return response.data
}

/**
 * Get sponsor requests
 * @param params - Query parameters
 * @returns Paginated list of requests
 */
export async function getSponsorRequests(
  params?: QueryParams
): Promise<PaginatedResponse<SponsorRequest>> {
  return await get<PaginatedResponse<SponsorRequest>>(
    SPONSOR_ENDPOINTS.REQUESTS,
    params
  )
}

/**
 * Submit a new sponsor request
 * @param data - Request data
 * @returns Created request
 */
export async function submitSponsorRequest(
  data: SubmitSponsorRequestData
): Promise<SponsorRequest> {
  const response = await post<ApiResponse<SponsorRequest>, SubmitSponsorRequestData>(
    SPONSOR_ENDPOINTS.SUBMIT_REQUEST,
    data
  )
  return response.data
}
