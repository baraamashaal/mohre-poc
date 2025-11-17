import { useTranslation } from 'react-i18next'
import { Card } from '../../../shared/components/ui'
import { EmployeeList } from '../components/EmployeeList'
import { Input } from '../../../shared/components/forms'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import type { Employee } from '../types/employee.types'

// Mock data - replace with actual API call
const mockSponsoredEmployees: Employee[] = [
  {
    id: 's1',
    personCode: 'PC-2024-101',
    emiratesId: '784-1111-2222333-4',
    labourCard: 'LC-111222',
    name: 'Maria Santos',
    nationality: 'Philippines',
    position: 'Domestic Worker',
    companyId: '', // Sponsor doesn't have company
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 's2',
    personCode: 'PC-2024-102',
    emiratesId: '784-2222-3333444-5',
    labourCard: 'LC-222333',
    name: 'Sri Devi',
    nationality: 'India',
    position: 'Domestic Worker',
    companyId: '',
    status: 'active',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(),
  },
]

export function SponsorEmployees() {
  const { t } = useTranslation(['employee', 'common'])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('employee.sponsoredWorkers')}
        </h1>
        <p className="text-gray-600 mt-1">
          {t('employee.sponsoredWorkersDescription')}
        </p>
      </div>

      {/* Employees Table */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t('employee.domesticWorkers')} ({mockSponsoredEmployees.length})
            </h2>

            {/* Search */}
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder={t('common.search')}
                suffix={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>

          <EmployeeList
            employees={mockSponsoredEmployees}
            currentPage={1}
            totalPages={1}
          />
        </div>
      </Card>
    </div>
  )
}

SponsorEmployees.displayName = 'SponsorEmployees'
