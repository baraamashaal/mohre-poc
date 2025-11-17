import type { BaseEntity } from '../../../shared/types'

export interface Employee extends BaseEntity {
  personCode: string
  emiratesId: string
  labourCard: string
  name: string
  nationality: string
  position?: string
  companyId: string
  workPermitNumber?: string
  workPermitExpiry?: Date
  status: 'active' | 'inactive' | 'pending'
}

export type EmployeeActionType =
  | 'MODIFY_WORK_PERMIT'
  | 'CANCEL_WORK_PERMIT'
  | 'RENEW_WORK_PERMIT'
  | 'SUBMIT_COMPLAINT'
  | 'SUBMIT_CANCEL_COMPLAINT'
  | 'PAY_FINE'

export interface EmployeeAction {
  id: string
  type: EmployeeActionType
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: Date
}

export type EnquiryType = 'CONTRACT' | 'WPP' | 'ILOE' | 'WHI'

export interface EmployeeEnquiry {
  type: EnquiryType
  data: unknown
}
