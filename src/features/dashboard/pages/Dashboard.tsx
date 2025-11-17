import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth'
import { UserRole } from '../../../shared/constants'
import { Card, Button } from '../../../shared/components/ui'
import { ROUTES } from '../../../shared/constants'

export function Dashboard() {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const navigate = useNavigate()

  const hasRole = (role: UserRole) => user?.roles.includes(role) ?? false

  const companyActions = [
    {
      title: 'Companies',
      description: 'View and manage your companies',
      icon: '🏢',
      href: ROUTES.COMPANIES,
      show: hasRole(UserRole.COMPANY_OWNER) || hasRole(UserRole.COMPANY_AUTHORIZER),
    },
    {
      title: 'Employees',
      description: 'Manage employee records and work permits',
      icon: '👥',
      href: ROUTES.EMPLOYEES,
      show: hasRole(UserRole.COMPANY_OWNER) || hasRole(UserRole.COMPANY_AUTHORIZER),
    },
    {
      title: 'Sponsored Workers',
      description: 'View domestic workers you sponsor',
      icon: '🏠',
      href: ROUTES.SPONSORS,
      show: hasRole(UserRole.SPONSOR),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-techblue-600 to-techblue-800 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-2">{t('auth.welcomeBack')}</h1>
        <p className="text-xl text-techblue-100">{user?.name}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {user?.roles.map((role) => (
            <span
              key={role}
              className="bg-white/20 px-3 py-1 rounded-full text-sm"
            >
              {role.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-aegov-black mb-6">
          {t('common.actions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyActions
            .filter((action) => action.show)
            .map((action) => (
              <Card key={action.title}>
                <div className="text-5xl mb-4">{action.icon}</div>
                <h3 className="card-title">{action.title}</h3>
                <p className="card-description mb-6">{action.description}</p>
                <Button
                  variant="link"
                  color="primary"
                  onClick={() => {
                    void navigate(action.href)
                  }}
                >
                  {t('common.viewDetails')} →
                </Button>
              </Card>
            ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-aegov-black mb-6">
          Recent Activity
        </h2>
        <Card>
          <p className="text-gray-500 text-center py-8">
            No recent activity to display
          </p>
        </Card>
      </div>
    </div>
  )
}
