import { useTranslation } from 'react-i18next'
import { useAuth } from '../../auth'
import { UserRole } from '../../../shared/constants'
import { Newsletter } from '../../../shared/components/ui'
import { CompaniesSection, SponsorSection } from '../components'
import { mockCompanies, mockSponsoredEmployees } from '../data/mockData'

export function Dashboard() {
  const { t } = useTranslation('common')
  const { user } = useAuth()

  const hasRole = (role: UserRole) => user?.roles.includes(role) ?? false

  // Check which roles the user has
  const isCompanyUser = hasRole(UserRole.COMPANY_OWNER) || hasRole(UserRole.COMPANY_AUTHORIZER)
  const isSponsor = hasRole(UserRole.SPONSOR)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-2 text-primary-100">{t('auth.welcomeBack')}</h1>
        <p className="text-xl text-primary-100">{user?.name}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {user?.roles.map((role) => (
            <span
              key={role}
              className="bg-white/20 px-3 py-1 rounded-full text-sm"
            >
              {role.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Companies Section - Only show for company users */}
      {isCompanyUser && (
        <CompaniesSection companies={mockCompanies} />
      )}

      {/* Sponsor Section - Only show for sponsors */}
      {isSponsor && (
        <div className="rounded-lg p-8">
          <SponsorSection employees={mockSponsoredEmployees} />
        </div>
      )}

      {/* Newsletter Section */}
      <Newsletter variant="full" />
    </div>
  )
}
