import { useTranslation } from 'react-i18next'
import { Card, Button, Badge } from '../../../shared/components/ui'
import type { Company } from '../types/company.types'
import { buildRoute, ROUTES } from '../../../shared/constants'

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const { t } = useTranslation('company')

  const statusColors = {
    active: 'success' as const,
    inactive: 'secondary' as const,
    suspended: 'error' as const,
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="card-title">{company.name}</h3>
          <p className="text-sm text-gray-500">{company.tradeNumber}</p>
        </div>
        <Badge variant={statusColors[company.status]}>
          {company.status}
        </Badge>
      </div>

      <div className="card-description space-y-2">
        <p>
          <span className="font-medium">Emirate:</span> {company.emirate}
        </p>
        <p>
          <span className="font-medium">Industry:</span> {company.industry}
        </p>
        <p>
          <span className="font-medium">{t('company.employees')}:</span>{' '}
          {company.employeeCount}
        </p>
      </div>

      <div className="mt-6">
        <Button
          variant="link"
          color="primary"
          onClick={() => {
            window.location.href = buildRoute(ROUTES.COMPANY_DETAILS, {
              id: company.id,
            })
          }}
        >
          {t('common:common.viewDetails')} →
        </Button>
      </div>
    </Card>
  )
}
