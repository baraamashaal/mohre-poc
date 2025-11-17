import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Button, Pagination, Hyperlink } from '../../../shared/components/ui'
import type { Employee } from '../types/employee.types'

interface EmployeeTableProps {
  employees: Employee[]
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function EmployeeTable({
  employees,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}: EmployeeTableProps) {
  const { t } = useTranslation(['employee', 'common'])
  const navigate = useNavigate()

  const handleActionClick = (employeeId: string, action: string) => {
    // Navigate to action pages (to be implemented)
    console.log(`Action ${action} clicked for employee ${employeeId}`)
    // TODO: Implement action pages
    // Example: navigate(`/employees/${employeeId}/actions/modify-permit`)
  }

  const handleEnquiryClick = (employeeId: string, enquiry: string) => {
    // Navigate to enquiry pages (to be implemented)
    console.log(`Enquiry ${enquiry} clicked for employee ${employeeId}`)
    // TODO: Implement enquiry pages
  }

  const handleViewEmployee = (employeeId: string) => {
    void navigate(`/employees/${employeeId}`)
  }

  const getActionItems = (employeeId: string) => [
    {
      label: t('common.viewDetails'),
      onClick: () => {
        handleViewEmployee(employeeId)
      },
    },
    { divider: true },
    {
      label: t('employee.actions.modifyWorkPermit'),
      onClick: () => {
        handleActionClick(employeeId, 'MODIFY_WORK_PERMIT')
      },
    },
    {
      label: t('employee.actions.cancelWorkPermit'),
      onClick: () => {
        handleActionClick(employeeId, 'CANCEL_WORK_PERMIT')
      },
    },
    {
      label: t('employee.actions.renewWorkPermit'),
      onClick: () => {
        handleActionClick(employeeId, 'RENEW_WORK_PERMIT')
      },
    },
    {
      label: t('employee.actions.submitComplaint'),
      onClick: () => {
        handleActionClick(employeeId, 'SUBMIT_COMPLAINT')
      },
    },
    {
      label: t('employee.actions.submitCancelComplaint'),
      onClick: () => {
        handleActionClick(employeeId, 'SUBMIT_CANCEL_COMPLAINT')
      },
    },
    {
      label: t('employee.actions.payFine'),
      onClick: () => {
        handleActionClick(employeeId, 'PAY_FINE')
      },
    },
    { divider: true },
    {
      label: t('employee.enquiries.contract'),
      onClick: () => {
        handleEnquiryClick(employeeId, 'CONTRACT')
      },
    },
    {
      label: t('employee.enquiries.wpp'),
      onClick: () => {
        handleEnquiryClick(employeeId, 'WPP')
      },
    },
    {
      label: t('employee.enquiries.iloe'),
      onClick: () => {
        handleEnquiryClick(employeeId, 'ILOE')
      },
    },
    {
      label: t('employee.enquiries.whi'),
      onClick: () => {
        handleEnquiryClick(employeeId, 'WHI')
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-start text-sm font-semibold text-gray-700">
                {t('employee.fields.personCode')}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-gray-700">
                {t('employee.fields.emiratesId')}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-gray-700">
                {t('employee.fields.labourCard')}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-gray-700">
                {t('employee.fields.name')}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-gray-700">
                {t('employee.fields.nationality')}
              </th>
              <th className="px-4 py-3 text-end text-sm font-semibold text-gray-700">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  {t('employee.noEmployees')}
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {employee.personCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {employee.emiratesId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {employee.labourCard}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    <Hyperlink
                      href={`/employees/${employee.id}`}
                      variant="default"
                      className="font-medium"
                    >
                      {employee.name}
                    </Hyperlink>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {employee.nationality}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <Dropdown
                      trigger={
                        <Button variant="outline" size="sm">
                          {t('common.actions')} ▾
                        </Button>
                      }
                      items={getActionItems(employee.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

EmployeeTable.displayName = 'EmployeeTable'
