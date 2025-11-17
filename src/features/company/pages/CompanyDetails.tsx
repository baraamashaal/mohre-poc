import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Card } from '../../../shared/components/ui'
import { EmployeeTable } from '../../employee/components/EmployeeTable'
import { Input } from '../../../shared/components/forms'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import type { Employee } from '../../employee/types/employee.types'

// Mock data - replace with actual API call
const mockEmployees: Employee[] = [
  {
    id: '1',
    personCode: 'PC-2024-001',
    emiratesId: '784-1234-5678901-1',
    labourCard: 'LC-123456',
    name: 'Mohammed Ahmed Al Mansouri',
    nationality: 'Egypt',
    position: 'Software Engineer',
    companyId: '1',
    workPermitNumber: 'WP-12345',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    personCode: 'PC-2024-002',
    emiratesId: '784-2345-6789012-2',
    labourCard: 'LC-234567',
    name: 'Sarah Ali Hassan',
    nationality: 'Jordan',
    position: 'Project Manager',
    companyId: '1',
    workPermitNumber: 'WP-67890',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    personCode: 'PC-2024-003',
    emiratesId: '784-3456-7890123-3',
    labourCard: 'LC-345678',
    name: 'Ahmed Hassan Khan',
    nationality: 'Pakistan',
    position: 'Accountant',
    companyId: '1',
    workPermitNumber: 'WP-11223',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function CompanyDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation(['company', 'common'])

  // Mock company data - replace with actual API call
  const company = {
    id,
    name: 'Emirates Tech Solutions LLC',
    tradeNumber: 'CN-1234567',
    emirate: 'Dubai',
    industry: 'Information Technology',
    employeeCount: mockEmployees.length,
    status: 'active',
  }

  const handleAddWorkPermit = () => {
    void navigate(`/company/${id ?? ''}/work-permit/add`)
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

      {/* Company Info Card */}
      <Card>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-600 mt-1">
              {t('company.fields.tradeNumber')}: {company.tradeNumber}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{t('company.fields.emirate')}:</span>
              <span className="ml-2 font-medium">{company.emirate}</span>
            </div>
            <div>
              <span className="text-gray-600">{t('company.fields.industry')}:</span>
              <span className="ml-2 font-medium">{company.industry}</span>
            </div>
            <div>
              <span className="text-gray-600">{t('company.fields.employees')}:</span>
              <span className="ml-2 font-medium">{company.employeeCount}</span>
            </div>
          </div>

          {/* Company Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {t('company.actions.title')}
            </h3>
            <Button variant="solid" onClick={handleAddWorkPermit}>
              + {t('company.actions.addWorkPermit')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Employees Section */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t('company.employees')} ({mockEmployees.length})
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

          <EmployeeTable
            employees={mockEmployees}
            currentPage={1}
            totalPages={1}
          />
        </div>
      </Card>
    </div>
  )
}

CompanyDetails.displayName = 'CompanyDetails'
