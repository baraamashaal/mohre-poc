import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { DataCard, Button } from '../../../shared/components/ui'
import { ROUTES, buildRoute } from '../../../shared/constants'
import type { Company } from '../../company'
import { Buildings } from '@phosphor-icons/react'

interface CompaniesSectionProps {
  companies: Company[]
  isLoading?: boolean
}

export function CompaniesSection({ companies, isLoading = false }: CompaniesSectionProps) {
  const { t } = useTranslation(['company', 'common'])
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-aegov-black">
            {t('company:company.myCompanies')}
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          {t('common:common.loading')}...
        </div>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-aegov-black">
            {t('company:company.myCompanies')}
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            {t('company:company.noCompanies')}
          </p>
          <Button
            variant="solid"
            color="primary"
            onClick={() => {
              void navigate(ROUTES.COMPANIES)
            }}
          >
            {t('common:common.viewAll')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-aegov-black">
          {t('company:company.myCompanies')}
        </h2>
        <Button
          variant="outline"
          color="primary"
          onClick={() => {
            void navigate(ROUTES.COMPANIES)
          }}
        >
          {t('common:common.viewAll')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.slice(0, 8).map((company) => (
          <DataCard
            key={company.id}
            icon={<Buildings size={32} weight="light" />}
            title={company.name}
            href={buildRoute(ROUTES.COMPANY_DETAILS, { id: company.id })}
            metadata={[
              {
                label: t('company:company.emirate'),
                value: company.emirate,
              },
              {
                label: t('company:company.employees'),
                value: company.employeeCount.toString(),
              },
            ]}
          />
        ))}
      </div>
    </div>
  )
}
