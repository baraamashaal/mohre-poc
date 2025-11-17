import { get, post } from '../../../shared/lib/axios'
import type { ApiResponse, PaginatedResponse, QueryParams } from '../../../shared/types/api.types'
import type { Employee } from '../types/employee.types'

// ============================================================================
// API Endpoints
// ============================================================================

const EMPLOYEE_ENDPOINTS = {
  LIST: '/employees',
  DETAILS: (id: string) => `/employees/${id}`,
  BY_COMPANY: (companyId: string) => `/companies/${companyId}/employees`,
  BY_SPONSOR: (sponsorId: string) => `/sponsors/${sponsorId}/employees`,

  // Work Permit Actions
  MODIFY_WORK_PERMIT: (id: string) => `/employees/${id}/work-permit/modify`,
  RENEW_WORK_PERMIT: (id: string) => `/employees/${id}/work-permit/renew`,
  CANCEL_WORK_PERMIT: (id: string) => `/employees/${id}/work-permit/cancel`,

  // Complaints
  SUBMIT_COMPLAINT: (id: string) => `/employees/${id}/complaints`,
  CANCEL_COMPLAINT: (id: string, complaintId: string) => `/employees/${id}/complaints/${complaintId}/cancel`,

  // Fines
  PAY_FINE: (id: string, fineId: string) => `/employees/${id}/fines/${fineId}/pay`,

  // Enquiries
  WORK_PERMIT_CONTRACT: (id: string) => `/employees/${id}/enquiries/contract`,
  WPP_STATUS: (id: string) => `/employees/${id}/enquiries/wpp`,
  ILOE_STATUS: (id: string) => `/employees/${id}/enquiries/iloe`,
  HEALTH_INSURANCE: (id: string) => `/employees/${id}/enquiries/health-insurance`,
} as const

// ============================================================================
// Request/Response Types
// ============================================================================

export interface ModifyWorkPermitRequest {
  position?: string
  salary?: number
  contractDuration?: number
  remarks?: string
  documents?: File[]
}

export interface RenewWorkPermitRequest {
  duration: number
  salary?: number
  documents?: File[]
}

export interface CancelWorkPermitRequest {
  reason: string
  effectiveDate: string
  remarks?: string
  documents?: File[]
}

export interface SubmitComplaintRequest {
  type: string
  subject: string
  description: string
  priority?: 'low' | 'medium' | 'high'
  documents?: File[]
}

export interface PayFineRequest {
  paymentMethod: string
  referenceNumber?: string
}

export interface WorkPermitContract {
  contractNumber: string
  employeeId: string
  employeeName: string
  position: string
  salary: number
  startDate: string
  endDate: string
  companyName: string
  status: string
  documentUrl?: string
}

export interface WPPStatus {
  employeeId: string
  isEnrolled: boolean
  enrollmentDate?: string
  contributionAmount?: number
  lastContributionDate?: string
  status: string
}

export interface ILOEStatus {
  employeeId: string
  isInsured: boolean
  policyNumber?: string
  coverageStartDate?: string
  coverageEndDate?: string
  premiumAmount?: number
  status: string
}

export interface HealthInsuranceStatus {
  employeeId: string
  isInsured: boolean
  insuranceProvider?: string
  policyNumber?: string
  coverageStartDate?: string
  coverageEndDate?: string
  status: string
}

// ============================================================================
// Employee API Functions
// ============================================================================

/**
 * Get list of employees
 * @param params - Query parameters for filtering, sorting, and pagination
 * @returns Paginated list of employees
 */
export async function getEmployees(
  params?: QueryParams
): Promise<PaginatedResponse<Employee>> {
  return await get<PaginatedResponse<Employee>>(EMPLOYEE_ENDPOINTS.LIST, params)
}

/**
 * Get employees by company ID
 * @param companyId - Company ID
 * @param params - Query parameters
 * @returns Paginated list of employees
 */
export async function getEmployeesByCompany(
  companyId: string,
  params?: QueryParams
): Promise<PaginatedResponse<Employee>> {
  return await get<PaginatedResponse<Employee>>(
    EMPLOYEE_ENDPOINTS.BY_COMPANY(companyId),
    params
  )
}

/**
 * Get employees by sponsor ID
 * @param sponsorId - Sponsor ID
 * @param params - Query parameters
 * @returns Paginated list of employees
 */
export async function getEmployeesBySponsor(
  sponsorId: string,
  params?: QueryParams
): Promise<PaginatedResponse<Employee>> {
  return await get<PaginatedResponse<Employee>>(
    EMPLOYEE_ENDPOINTS.BY_SPONSOR(sponsorId),
    params
  )
}

/**
 * Get employee details by ID
 * @param id - Employee ID
 * @returns Employee details
 */
export async function getEmployeeById(id: string): Promise<Employee> {
  const response = await get<ApiResponse<Employee>>(EMPLOYEE_ENDPOINTS.DETAILS(id))
  return response.data
}

// ============================================================================
// Work Permit Actions
// ============================================================================

/**
 * Modify work permit details
 * @param id - Employee ID
 * @param data - Modification request data
 * @returns Updated employee
 */
export async function modifyWorkPermit(
  id: string,
  data: ModifyWorkPermitRequest
): Promise<Employee> {
  const response = await post<ApiResponse<Employee>, ModifyWorkPermitRequest>(
    EMPLOYEE_ENDPOINTS.MODIFY_WORK_PERMIT(id),
    data
  )
  return response.data
}

/**
 * Renew work permit
 * @param id - Employee ID
 * @param data - Renewal request data
 * @returns Updated employee
 */
export async function renewWorkPermit(
  id: string,
  data: RenewWorkPermitRequest
): Promise<Employee> {
  const response = await post<ApiResponse<Employee>, RenewWorkPermitRequest>(
    EMPLOYEE_ENDPOINTS.RENEW_WORK_PERMIT(id),
    data
  )
  return response.data
}

/**
 * Cancel work permit
 * @param id - Employee ID
 * @param data - Cancellation request data
 * @returns Updated employee
 */
export async function cancelWorkPermit(
  id: string,
  data: CancelWorkPermitRequest
): Promise<Employee> {
  const response = await post<ApiResponse<Employee>, CancelWorkPermitRequest>(
    EMPLOYEE_ENDPOINTS.CANCEL_WORK_PERMIT(id),
    data
  )
  return response.data
}

// ============================================================================
// Complaint Actions
// ============================================================================

/**
 * Submit a complaint for an employee
 * @param id - Employee ID
 * @param data - Complaint data
 * @returns Complaint confirmation
 */
export async function submitComplaint(
  id: string,
  data: SubmitComplaintRequest
): Promise<{ complaintId: string; message: string }> {
  const response = await post<
    ApiResponse<{ complaintId: string; message: string }>,
    SubmitComplaintRequest
  >(EMPLOYEE_ENDPOINTS.SUBMIT_COMPLAINT(id), data)
  return response.data
}

/**
 * Cancel a complaint
 * @param id - Employee ID
 * @param complaintId - Complaint ID
 */
export async function cancelComplaint(
  id: string,
  complaintId: string
): Promise<void> {
  await post<ApiResponse<null>>(EMPLOYEE_ENDPOINTS.CANCEL_COMPLAINT(id, complaintId))
}

// ============================================================================
// Fine Payment
// ============================================================================

/**
 * Pay a fine for an employee
 * @param id - Employee ID
 * @param fineId - Fine ID
 * @param data - Payment data
 * @returns Payment confirmation
 */
export async function payFine(
  id: string,
  fineId: string,
  data: PayFineRequest
): Promise<{ transactionId: string; message: string }> {
  const response = await post<
    ApiResponse<{ transactionId: string; message: string }>,
    PayFineRequest
  >(EMPLOYEE_ENDPOINTS.PAY_FINE(id, fineId), data)
  return response.data
}

// ============================================================================
// Enquiries
// ============================================================================

/**
 * Get work permit contract details
 * @param id - Employee ID
 * @returns Contract details
 */
export async function getWorkPermitContract(id: string): Promise<WorkPermitContract> {
  const response = await get<ApiResponse<WorkPermitContract>>(
    EMPLOYEE_ENDPOINTS.WORK_PERMIT_CONTRACT(id)
  )
  return response.data
}

/**
 * Get Worker Protection Program (WPP) status
 * @param id - Employee ID
 * @returns WPP status
 */
export async function getWPPStatus(id: string): Promise<WPPStatus> {
  const response = await get<ApiResponse<WPPStatus>>(EMPLOYEE_ENDPOINTS.WPP_STATUS(id))
  return response.data
}

/**
 * Get Unemployment Insurance (ILOE) status
 * @param id - Employee ID
 * @returns ILOE status
 */
export async function getILOEStatus(id: string): Promise<ILOEStatus> {
  const response = await get<ApiResponse<ILOEStatus>>(EMPLOYEE_ENDPOINTS.ILOE_STATUS(id))
  return response.data
}

/**
 * Get health insurance status
 * @param id - Employee ID
 * @returns Health insurance status
 */
export async function getHealthInsuranceStatus(
  id: string
): Promise<HealthInsuranceStatus> {
  const response = await get<ApiResponse<HealthInsuranceStatus>>(
    EMPLOYEE_ENDPOINTS.HEALTH_INSURANCE(id)
  )
  return response.data
}
