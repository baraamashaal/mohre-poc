import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, Button, Badge } from '../../../shared/components/ui'
import type { Employee } from '../types/employee.types'

// Mock data - replace with actual API call
const mockEmployee: Employee = {
  id: '1',
  personCode: 'PC-2024-001',
  emiratesId: '784-1234-5678901-1',
  labourCard: 'LC-123456',
  name: 'Mohammed Ahmed Al Mansouri',
  nationality: 'Egypt',
  position: 'Software Engineer',
  companyId: '1',
  workPermitNumber: 'WP-12345',
  workPermitExpiry: new Date('2025-12-31'),
  status: 'active',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
}

export function EmployeeDetails() {
  const { id: employeeId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation(['employee', 'common'])

  const employee = mockEmployee // TODO: Fetch from API using employeeId
  console.log('Employee ID:', employeeId) // For future API integration

  const handleActionClick = (action: string) => {
    console.log(`Action clicked: ${action}`)
    // TODO: Navigate to action page or open modal
  }

  const handleEnquiryClick = (enquiry: string) => {
    console.log(`Enquiry clicked: ${enquiry}`)
    // TODO: Open file viewer or details modal
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => {
          void navigate(-1)
        }}
        className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
      >
        ← {t('common.back')}
      </button>

      {/* Employee Info Card */}
      <Card>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
              <p className="text-gray-600 mt-1">{employee.position}</p>
            </div>
            <Badge variant={employee.status === 'active' ? 'success' : 'default'}>
              {t(`employee.status.${employee.status}`)}
            </Badge>
          </div>

          {/* Employee Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {t('employee.personalInfo')}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">{t('employee.fields.personCode')}:</span>
                  <span className="ml-2 text-sm font-medium">{employee.personCode}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('employee.fields.emiratesId')}:</span>
                  <span className="ml-2 text-sm font-medium">{employee.emiratesId}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('employee.fields.labourCard')}:</span>
                  <span className="ml-2 text-sm font-medium">{employee.labourCard}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('employee.fields.nationality')}:</span>
                  <span className="ml-2 text-sm font-medium">{employee.nationality}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {t('employee.workPermitInfo')}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">{t('employee.fields.workPermitNumber')}:</span>
                  <span className="ml-2 text-sm font-medium">{employee.workPermitNumber}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('employee.fields.workPermitExpiry')}:</span>
                  <span className="ml-2 text-sm font-medium">
                    {employee.workPermitExpiry?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions Card */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t('employee.actions.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => {
              handleActionClick('MODIFY_WORK_PERMIT')
            }}
          >
            {t('employee.actions.modifyWorkPermit')}
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => {
              handleActionClick('CANCEL_WORK_PERMIT')
            }}
          >
            {t('employee.actions.cancelWorkPermit')}
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => {
              handleActionClick('RENEW_WORK_PERMIT')
            }}
          >
            {t('employee.actions.renewWorkPermit')}
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => {
              handleActionClick('SUBMIT_COMPLAINT')
            }}
          >
            {t('employee.actions.submitComplaint')}
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => {
              handleActionClick('SUBMIT_CANCEL_COMPLAINT')
            }}
          >
            {t('employee.actions.submitCancelComplaint')}
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => {
              handleActionClick('PAY_FINE')
            }}
          >
            {t('employee.actions.payFine')}
          </Button>
        </div>
      </Card>

      {/* Enquiries Card */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t('employee.enquiries.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="soft"
            className="justify-start"
            onClick={() => {
              handleEnquiryClick('CONTRACT')
            }}
          >
            {t('employee.enquiries.contract')}
          </Button>
          <Button
            variant="soft"
            className="justify-start"
            onClick={() => {
              handleEnquiryClick('WPP')
            }}
          >
            {t('employee.enquiries.wpp')}
          </Button>
          <Button
            variant="soft"
            className="justify-start"
            onClick={() => {
              handleEnquiryClick('ILOE')
            }}
          >
            {t('employee.enquiries.iloe')}
          </Button>
          <Button
            variant="soft"
            className="justify-start"
            onClick={() => {
              handleEnquiryClick('WHI')
            }}
          >
            {t('employee.enquiries.whi')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

EmployeeDetails.displayName = 'EmployeeDetails'
