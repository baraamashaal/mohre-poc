import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Hyperlink, Alert, Button } from '../../../shared/components/ui'
import { Input } from '../../../shared/components/forms'
import type { User } from '../types/auth.types';

interface LegacyLoginForm {
  username: string
  password: string
}

interface LegacyLoginProps {
  onLoginSuccess: (user: User) => void
  className?: string
}

export function LegacyLogin({ onLoginSuccess, className = '' }: LegacyLoginProps) {
  const { t } = useTranslation('common')
  const { register, handleSubmit, formState: { errors } } = useForm<LegacyLoginForm>()

  const onSubmit = (data: LegacyLoginForm) => {
    // TODO: Implement alternative login API call
    console.log('Legacy login:', data)

    // Mock login for development
    const mockUser: User = {
      id: '2',
      name: data.username,
      email: `${data.username}@example.ae`,
      emiratesId: '784-1990-1234567-2',
      roles: ['COMPANY_OWNER'],
    }

    onLoginSuccess(mockUser)
  }

  return (
    <div className={`login-content ${className}`}>
      <Alert variant="warning" size="sm" className="mb-6" dismissable>
        {t('auth.legacy.deprecationWarning')}
      </Alert>

      <form
        className="text-start"
        onSubmit={(e) => {
          e.preventDefault()
          void handleSubmit(onSubmit)(e)
        }}
      >
        <div className="grid grid-cols-1 gap-4">
          <Input
            id="user_name"
            label={t('auth.legacy.username')}
            type="text"
            placeholder={t('auth.legacy.password')}
            error={errors.username?.message}
            required
            {...register('username', {
              required: t('auth.legacy.usernameRequired'),
              minLength: { value: 3, message: t('auth.legacy.usernameMinLength') }
            })}
          />

          <Input
            id="password_name"
            label={t('auth.legacy.password')}
            type="password"
            placeholder={t('auth.legacy.passwordPlaceholder')}
            error={errors.password?.message}
            required
            {...register('password', {
              required: t('auth.legacy.passwordRequired'),
              minLength: { value: 6, message: t('auth.legacy.passwordMinLength') }
            })}
          />

          <div>
            <Hyperlink
              href="#"
              onClick={(e) => { e.preventDefault() }}
              className="no-underline"
            >
              {t('auth.legacy.forgotPassword')}
            </Hyperlink>
          </div>

          <div>
            <Button
              type="submit"
              style="primary"
              variant="solid"
              size="sm"
              block
              className="lg:h-12 lg:px-6 lg:rounded-lg mt-6"
            >
              {t('auth.legacy.loginButton')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
