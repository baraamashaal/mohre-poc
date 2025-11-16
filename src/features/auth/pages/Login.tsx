import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../../../shared/constants'
import { UAEPassLogin } from '../components/UAEPassLogin'
import { LegacyLogin } from '../components/LegacyLogin'
import { Card, Alert, Hyperlink, LanguageSwitcher } from '../../../shared/components/ui'
import type {User} from '../types/auth.types';

export function Login() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const { login } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  // Derive state directly from URL parameter (single source of truth)
  const showLegacyLogin = searchParams.get('isLegacy') === 'true'
  const showUaePassLogin = !showLegacyLogin
  const handleLoginSuccess = (user: User) => {
    setError(null)
    login(user)
    void navigate(ROUTES.DASHBOARD)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoginError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-aegov-bg px-4 py-8">
      <div className="w-full sm:w-[26rem] mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Login Container */}
        <Card
          bordered
          className="text-center space-y-10 min-h-[32rem] xl:min-h-[35rem] flex flex-wrap justify-between flex-col content-between [&>*]:w-full border-primary-400"
          id="accordion-collapse"
          data-accordion="collapse"
        >
          {/* Logo */}
          <div>
            <img src="/img/block_assets/logo-ministry.png" alt="Ministry of Human Resources & Emiratisation" className="mx-auto max-w-full" />
          </div>

        {/* Error Alert */}
        {error && (
          <Alert
            variant="error"
            size="sm"
            onDismiss={() => { setError(null); }}
          >
            {error}
          </Alert>
        )}

        {/* UAE Pass Login Section */}
        {
          showUaePassLogin &&
          <>
              <UAEPassLogin onLoginSuccess={handleLoginSuccess} />
              <div>
                  <p className="text-aeblack-800 mb-4">
                    {t('auth.uaePass.needAccount')}{' '}
                    <Hyperlink
                      href="https://uaepass.ae/signup"
                      external
                      className="pointer-events-auto"
                    >
                      {t('auth.uaePass.createAccount')}
                    </Hyperlink>
                  </p>
                  <p className="text-aeblack-800">
                      <Hyperlink
                        href="#"
                        className="pointer-events-auto"
                        onClick={(e) => {
                          e.preventDefault()
                          setSearchParams({ isLegacy: 'true' })
                        }}
                      >
                        {t('auth.uaePass.useOtherOption')}
                      </Hyperlink>
                  </p>
              </div>
          </>
        }
        
  
        {/* Legacy Login Section */}
        {
          showLegacyLogin &&
          <>
              <LegacyLogin onLoginSuccess={handleLoginSuccess} />
              <div>
                  {t('auth.legacy.switchToUaePass')}{' '}
                  <Hyperlink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setSearchParams({})
                    }}
                  >
                    {t('auth.legacy.loginWithUaePass')}
                  </Hyperlink>
              </div>
          </>
        }

        </Card>
      </div>
    </div>
  )
}
