import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../features/auth'
import { ROUTES } from '../../constants'
import {LanguageSwitcher} from '../ui';

/**
 * Header Component
 *
 * Main navigation header with:
 * - Ministry logo
 * - Navigation links
 * - Language switcher
 * - User menu / logout
 */
export function Header() {
  const { t } = useTranslation('common')
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3">
            <img
              src="/img/block_assets/logo-ministry.png"
              alt={t('app.title')}
              className="h-10"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={ROUTES.DASHBOARD}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('nav.dashboard')}
            </Link>

            {user?.roles.includes('COMPANY_OWNER' as any) && (
              <Link
                to={ROUTES.COMPANIES}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t('nav.companies')}
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
