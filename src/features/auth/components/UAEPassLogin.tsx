import { useTranslation } from 'react-i18next'
import type {User} from '../types/auth.types';
import { UAEPassButton } from './UAEPassButton'

interface UAEPassLoginProps {
  onLoginSuccess: (user: User) => void
  className?: string
}

export function UAEPassLogin({ onLoginSuccess, className = '' }: UAEPassLoginProps) {
  const { t } = useTranslation('common')
  const handleUAEPassLogin = () => {
    // TODO: Implement real UAE Pass OAuth flow
    // For now, simulate login with mock user data
    const mockUser: User = {
      id: '1',
      name: 'Ahmed Al Mansouri',
      email: 'ahmed.almansouri@example.ae',
      emiratesId: '784-1990-1234567-1',
      roles: ['COMPANY_OWNER', 'SPONSOR'],
    }
    onLoginSuccess(mockUser)
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
