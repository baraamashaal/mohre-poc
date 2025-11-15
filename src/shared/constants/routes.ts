export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',

  // Auth routes
  LOGIN: '/login',
  CALLBACK: '/auth/callback',

  // Company routes
  COMPANIES: '/companies',
  COMPANY_DETAILS: '/companies/:id',
  COMPANY_ADD_WORK_PERMIT: '/companies/:id/work-permit/add',

  // Employee routes
  EMPLOYEES: '/employees',
  EMPLOYEE_DETAILS: '/employees/:id',
  EMPLOYEE_MODIFY_PERMIT: '/employees/:id/actions/modify-permit',
  EMPLOYEE_CANCEL_PERMIT: '/employees/:id/actions/cancel-permit',
  EMPLOYEE_RENEW_PERMIT: '/employees/:id/actions/renew-permit',
  EMPLOYEE_SUBMIT_COMPLAINT: '/employees/:id/actions/complaint',
  EMPLOYEE_SUBMIT_CANCEL_COMPLAINT: '/employees/:id/actions/cancel-complaint',
  EMPLOYEE_PAY_FINE: '/employees/:id/actions/pay-fine',

  // Employee Enquiries
  EMPLOYEE_WORK_PERMIT_CONTRACT: '/employees/:id/enquiries/contract',
  EMPLOYEE_WPP: '/employees/:id/enquiries/wpp',
  EMPLOYEE_ILOE: '/employees/:id/enquiries/iloe',
  EMPLOYEE_WHI: '/employees/:id/enquiries/whi',

  // Sponsor routes
  SPONSORS: '/sponsors',
  SPONSOR_DETAILS: '/sponsors/:id',
} as const

// Helper function to build routes with parameters
export const buildRoute = (route: string, params: Record<string, string>) => {
  let builtRoute = route
  Object.entries(params).forEach(([key, value]) => {
    builtRoute = builtRoute.replace(`:${key}`, value)
  })
  return builtRoute
}
