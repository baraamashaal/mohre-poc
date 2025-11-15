import { useTranslation } from 'react-i18next'
import { Card, Button, Badge } from '../../../shared/components/ui'
import type { Employee } from '../types/employee.types'

interface EmployeeCardProps {
  employee: Employee
  onViewDetails?: (id: string) => void
}

export function EmployeeCard({ employee, onViewDetails }: EmployeeCardProps) {
  const { t } = useTranslation('employee')

  const statusColors = {
    active: 'success' as const,
    inactive: 'secondary' as const,
    pending: 'warning' as const,
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="card-title">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.position}</p>
        </div>
        <Badge variant={statusColors[employee.status]}>
          {employee.status}
        </Badge>
      </div>

      <div className="card-description space-y-2">
        <p>
          <span className="font-medium">{t('employee.nationality')}:</span>{' '}
          {employee.nationality}
        </p>
        <p>
          <span className="font-medium">Work Permit:</span>{' '}
          {employee.workPermitNumber}
        </p>
        <p className="text-sm text-gray-500">
          Expires: {new Date(employee.workPermitExpiry).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        <Button
          variant="link"
          color="primary"
          onClick={() => onViewDetails?.(employee.id)}
        >
          {t('common:common.viewDetails')} →
        </Button>
      </div>
    </Card>
  )
}
