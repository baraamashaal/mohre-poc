import { useTranslation } from 'react-i18next'
import { Card } from '../../../shared/components/ui'

interface EmployeeEnquiriesProps {
  employeeId: string
}

export function EmployeeEnquiries({ employeeId }: EmployeeEnquiriesProps) {
  const { t } = useTranslation('employee')

  const enquiries = [
    { key: 'workPermitContract', icon: '📄', color: 'text-blue-600' },
    { key: 'wpp', icon: '🛡️', color: 'text-green-600' },
    { key: 'iloe', icon: '💼', color: 'text-purple-600' },
    { key: 'whi', icon: '🏥', color: 'text-red-600' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{t('employee.enquiries.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enquiries.map((enquiry) => (
          <Card
            key={enquiry.key}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              console.log(`Enquiry: ${enquiry.key}`, employeeId)
            }}
          >
            <div className="flex items-center gap-4">
              <span className={`text-4xl ${enquiry.color}`}>{enquiry.icon}</span>
              <div>
                <h4 className="font-semibold">
                  {t(`employee.enquiries.${enquiry.key}`)}
                </h4>
                <p className="text-sm text-gray-500">Click to view details</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
