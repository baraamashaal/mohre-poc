export const UserRole = {
  COMPANY_OWNER: 'COMPANY_OWNER',
  COMPANY_AUTHORIZER: 'COMPANY_AUTHORIZER',
  SPONSOR: 'SPONSOR',
  ADMIN: 'ADMIN',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const ROLE_LABELS = {
  [UserRole.COMPANY_OWNER]: 'Company Owner',
  [UserRole.COMPANY_AUTHORIZER]: 'Company Authorizer',
  [UserRole.SPONSOR]: 'Sponsor',
  [UserRole.ADMIN]: 'Administrator',
} as const

export const ROLE_PERMISSIONS = {
  [UserRole.COMPANY_OWNER]: ['view_company', 'manage_employees', 'add_work_permit'],
  [UserRole.COMPANY_AUTHORIZER]: ['view_company', 'manage_employees', 'add_work_permit'],
  [UserRole.SPONSOR]: ['view_sponsor', 'manage_domestic_workers'],
  [UserRole.ADMIN]: ['*'],
} as const
