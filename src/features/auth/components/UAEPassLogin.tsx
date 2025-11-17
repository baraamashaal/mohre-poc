import { useTranslation } from 'react-i18next'
import type { LoginResponse } from '../types/auth.types'
import { UserRole } from '../../../shared/constants/roles'
import { UAEPassButton } from './UAEPassButton'

interface UAEPassLoginProps {
  onLoginSuccess: (response: LoginResponse) => void
  className?: string
}

export function UAEPassLogin({ onLoginSuccess, className = '' }: UAEPassLoginProps) {
  const { t } = useTranslation('common')
  const handleUAEPassLogin = () => {
    // TODO: Implement real UAE Pass OAuth flow
    // For now, simulate login with mock user data and tokens
    const mockResponse: LoginResponse = {
      user: {
        id: '1',
        name: 'Ahmed Al Mansouri',
        email: 'ahmed.almansouri@example.ae',
        emiratesId: '784-1990-1234567-1',
        roles: [UserRole.COMPANY_OWNER, UserRole.SPONSOR],
      },
      tokens: {
        accessToken: `mock_uaepass_token_${Date.now().toString()}`,
        refreshToken: `mock_uaepass_refresh_${Date.now().toString()}`,
        expiresIn: 3600,
        tokenType: 'Bearer',
      },
    }
    onLoginSuccess(mockResponse)
  }

  return (
    <div className={`space-y-3 login-content ${className}`}>
      <UAEPassButton onClick={handleUAEPassLogin} />
      <p className="text-sm px-6 text-aeblack-800">
        {t('auth.uaePass.description')}
      </p>
    </div>
  )
}
