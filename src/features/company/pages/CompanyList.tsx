import { useTranslation } from 'react-i18next'
import { CompanyCard } from '../components/CompanyCard'
import type { Company } from '../types/company.types'

// Mock data - replace with actual API call
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Emirates Tech Solutions LLC',
    tradeNumber: 'CN-1234567',
    emirate: 'Dubai',
    industry: 'Information Technology',
    employeeCount: 150,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Gulf Construction Co.',
    tradeNumber: 'CN-7654321',
    emirate: 'Abu Dhabi',
    industry: 'Construction',
    employeeCount: 320,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function CompanyList() {
  const { t } = useTranslation('company')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-aegov-black">{t('company.list')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  )
}
