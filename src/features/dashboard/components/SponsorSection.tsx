import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card, Button, ListItem } from '../../../shared/components/ui'
import { ROUTES, buildRoute } from '../../../shared/constants'
import type { Employee } from '../../employee/types/employee.types'
import { FileText, Question, Note, Wallet } from '@phosphor-icons/react'

interface SponsorSectionProps {
  employees: Employee[]
  isLoading?: boolean
}

export function SponsorSection({ employees, isLoading = false }: SponsorSectionProps) {
  const { t } = useTranslation(['employee', 'common'])
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-aegov-black mb-6">
          {t('employee:employee.sponsoredWorkers')}
        </h2>
        <Card>
          <div className="text-center py-8 text-gray-500">
            {t('common:common.loading')}...
          </div>
        </Card>
      </div>
    )
  }

  if (employees.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-aegov-black mb-6">
          {t('employee:employee.sponsoredWorkers')}
        </h2>
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              {t('employee:employee.noSponsoredWorkers')}
            </p>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                void navigate(ROUTES.SPONSORS)
              }}
            >
              {t('common:common.viewAll')}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-aegov-black">
          {t('employee:employee.sponsoredWorkers')}
        </h2>
        <Button
          variant="outline"
          color="primary"
          onClick={() => {
            void navigate(ROUTES.SPONSORS)
          }}
        >
          {t('common:common.viewAll')}
        </Button>
      </div>

      <div>
        {employees.slice(0, 5).map((employee) => (
          <ListItem
            key={employee.id}
            title={employee.name}
            href={buildRoute(ROUTES.EMPLOYEE_DETAILS, { id: employee.id })}
            description={`${employee.position} • ${employee.nationality}`}
            tags={[
              {
                label: t('employee:employee.personCode'),
                value: employee.personCode,
              },
              {
                label: t('employee:employee.emiratesId'),
                value: employee.emiratesId,
              },
              {
                label: t('employee:employee.labourCard'),
                value: employee.labourCard,
              },
            ]}
            badges={[
              {
                label: employee.status,
                variant: employee.status === 'active' ? 'success' : employee.status === 'inactive' ? 'error' : 'warning',
              },
            ]}
            actions={[
              {
                label: t('employee:employee.actions.modifyWorkPermit'),
                value: 'modify-work-permit',
                icon: FileText,
                onClick: () => {
                  console.log('Modify work permit for', employee.id)
                },
              },
              {
                label: t('employee:employee.actions.cancelWorkPermit'),
                value: 'cancel-work-permit',
                icon: FileText,
                onClick: () => {
                  console.log('Cancel work permit for', employee.id)
                },
              },
              {
                label: t('employee:employee.actions.renewWorkPermit'),
                value: 'renew-work-permit',
                icon: FileText,
                onClick: () => {
                  console.log('Renew work permit for', employee.id)
                },
              },
              {
                label: t('employee:employee.actions.submitComplaint'),
                value: 'submit-complaint',
                icon: Note,
                onClick: () => {
                  console.log('Submit complaint for', employee.id)
                },
              },
              {
                label: t('employee:employee.actions.payFine'),
                value: 'pay-fine',
                icon: Wallet,
                onClick: () => {
                  console.log('Pay fine for', employee.id)
                },
              },
            ]}
            enquiries={[
              {
                label: t('employee:employee.enquiries.workPermitContract'),
                value: 'work-permit-contract',
                icon: Question,
                onClick: () => {
                  console.log('View work permit contract for', employee.id)
                },
              },
              {
                label: t('employee:employee.enquiries.wpp'),
                value: 'wpp',
                icon: Question,
                onClick: () => {
                  console.log('View WPP for', employee.id)
                },
              },
              {
                label: t('employee:employee.enquiries.iloe'),
                value: 'iloe',
                icon: Question,
                onClick: () => {
                  console.log('View ILOE for', employee.id)
                },
              },
              {
                label: t('employee:employee.enquiries.whi'),
                value: 'whi',
                icon: Question,
                onClick: () => {
                  console.log('View WHI for', employee.id)
                },
              },
            ]}
          />
        ))}
      </div>

      {employees.length > 5 && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            color="primary"
            onClick={() => {
              void navigate(ROUTES.SPONSORS)
            }}
          >
            {t('common:common.viewAll')} ({employees.length} {t('employee:employee.workers')})
          </Button>
        </div>
      )}
    </div>
  )
}
