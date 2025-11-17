import { useTranslation } from 'react-i18next'
import { ListItem, Pagination } from '../../../shared/components/ui'
import { ROUTES, buildRoute } from '../../../shared/constants'
import type { Employee } from '../types/employee.types'
import { FileText, Question, Note, Wallet } from '@phosphor-icons/react'

interface EmployeeListProps {
  employees: Employee[]
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function EmployeeList({
  employees,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}: EmployeeListProps) {
  const { t } = useTranslation(['employee', 'common'])

  const handleActionClick = (employeeId: string, action: string) => {
    console.log(`Action ${action} clicked for employee ${employeeId}`)
    // TODO: Implement action pages
  }

  const handleEnquiryClick = (employeeId: string, enquiry: string) => {
    console.log(`Enquiry ${enquiry} clicked for employee ${employeeId}`)
    // TODO: Implement enquiry pages
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('employee:employee.noSponsoredWorkers')}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        {employees.map((employee) => (
          <ListItem
            key={employee.id}
            title={employee.name}
            href={buildRoute(ROUTES.EMPLOYEE_DETAILS, { id: employee.id })}
            description={`${employee.position} • ${employee.nationality}`}
            tags={[
              {
                label: t('employee.personCode'),
                value: employee.personCode,
              },
              {
                label: t('employee.emiratesId'),
                value: employee.emiratesId,
              },
              {
                label: t('employee.labourCard'),
                value: employee.labourCard,
              },
            ]}
            badges={[
              {
                label: employee.status,
                variant: employee.status === 'active' ? 'success' : employee.status === 'inactive' ? 'error' : 'warning',
              },
            ]}
            actions={[
              {
                label: t('employee.actions.modifyWorkPermit'),
                value: 'modify-work-permit',
                icon: FileText,
                onClick: () => {
                  handleActionClick(employee.id, 'MODIFY_WORK_PERMIT')
                },
              },
              {
                label: t('employee.actions.cancelWorkPermit'),
                value: 'cancel-work-permit',
                icon: FileText,
                onClick: () => {
                  handleActionClick(employee.id, 'CANCEL_WORK_PERMIT')
                },
              },
              {
                label: t('employee.actions.renewWorkPermit'),
                value: 'renew-work-permit',
                icon: FileText,
                onClick: () => {
                  handleActionClick(employee.id, 'RENEW_WORK_PERMIT')
                },
              },
              {
                label: t('employee.actions.submitComplaint'),
                value: 'submit-complaint',
                icon: Note,
                onClick: () => {
                  handleActionClick(employee.id, 'SUBMIT_COMPLAINT')
                },
              },
              {
                label: t('employee.actions.payFine'),
                value: 'pay-fine',
                icon: Wallet,
                onClick: () => {
                  handleActionClick(employee.id, 'PAY_FINE')
                },
              },
            ]}
            enquiries={[
              {
                label: t('employee.enquiries.workPermitContract'),
                value: 'work-permit-contract',
                icon: Question,
                onClick: () => {
                  handleEnquiryClick(employee.id, 'CONTRACT')
                },
              },
              {
                label: t('employee.enquiries.wpp'),
                value: 'wpp',
                icon: Question,
                onClick: () => {
                  handleEnquiryClick(employee.id, 'WPP')
                },
              },
              {
                label: t('employee.enquiries.iloe'),
                value: 'iloe',
                icon: Question,
                onClick: () => {
                  handleEnquiryClick(employee.id, 'ILOE')
                },
              },
              {
                label: t('employee.enquiries.whi'),
                value: 'whi',
                icon: Question,
                onClick: () => {
                  handleEnquiryClick(employee.id, 'WHI')
                },
              },
            ]}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}

EmployeeList.displayName = 'EmployeeList'
