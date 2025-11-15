import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../../features/auth'
import { Button } from '../../ui'
import { ROUTES } from '../../../constants'

export function Header() {
  const { t, i18n } = useTranslation('common')
  const { user, logout } = useAuth()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    void i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href={ROUTES.DASHBOARD} className="text-xl font-bold text-techblue-600">
              MOHRE
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href={ROUTES.DASHBOARD} className="text-gray-700 hover:text-techblue-600">
              {t('nav.dashboard')}
            </a>
            <a href={ROUTES.COMPANIES} className="text-gray-700 hover:text-techblue-600">
              {t('nav.companies')}
            </a>
            <a href={ROUTES.EMPLOYEES} className="text-gray-700 hover:text-techblue-600">
              {t('nav.employees')}
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Button variant="soft" color="secondary" size="sm" onClick={toggleLanguage}>
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </Button>

            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{user.name}</span>
                <Button variant="outline" color="secondary" size="sm" onClick={logout}>
                  {t('nav.logout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
