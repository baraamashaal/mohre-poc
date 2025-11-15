import type { BaseEntity } from '../../../shared/types'

export interface Company extends BaseEntity {
  name: string
  tradeNumber: string
  emirate: string
  industry: string
  employeeCount: number
  status: 'active' | 'inactive' | 'suspended'
}

export interface CompanyAction {
  id: string
  type: 'ADD_WORK_PERMIT'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: Date
}
