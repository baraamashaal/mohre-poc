import { useTranslation } from 'react-i18next'
import { Button } from '../../../shared/components/ui'

interface EmployeeActionsProps {
  employeeId: string
}

export function EmployeeActions({ employeeId }: EmployeeActionsProps) {
  const { t } = useTranslation('employee')

  const actions = [
    { key: 'modifyWorkPermit', icon: '✏️' },
    { key: 'cancelWorkPermit', icon: '❌' },
    { key: 'renewWorkPermit', icon: '🔄' },
    { key: 'submitComplaint', icon: '📝' },
    { key: 'submitCancelComplaint', icon: '📋' },
    { key: 'payFine', icon: '💰' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{t('employee.actions.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.key}
            variant="outline"
            color="primary"
            className="justify-start"
            onClick={() => {
              console.log(`Action: ${action.key}`, employeeId)
            }}
          >
            <span className="mr-2">{action.icon}</span>
            {t(`employee.actions.${action.key}`)}
          </Button>
        ))}
      </div>
    </div>
  )
}
