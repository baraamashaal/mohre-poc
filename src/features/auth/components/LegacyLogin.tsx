import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Hyperlink, Alert, Button } from '../../../shared/components/ui'
import { Input } from '../../../shared/components/forms'
import { loginWithCredentials } from '../services/authService'
import type { LoginResponse } from '../types/auth.types'

interface LegacyLoginForm {
  username: string
  password: string
}

interface LegacyLoginProps {
  onLoginSuccess: (response: LoginResponse) => void
  onLoginError?: (error: string) => void
  className?: string
}

export function LegacyLogin({ onLoginSuccess, onLoginError, className = '' }: LegacyLoginProps) {
  const { t } = useTranslation('common')
  const { register, handleSubmit, formState: { errors } } = useForm<LegacyLoginForm>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: LegacyLoginForm) => {
    setIsLoading(true)
    setError(null)

    try {
      // Call auth service
      const response = await loginWithCredentials({
        email: data.username,
        password: data.password,
      })

      onLoginSuccess(response)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      onLoginError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`login-content ${className}`}>
      <Alert variant="warning" size="sm" className="mb-6" dismissable>
        {t('auth.legacy.deprecationWarning')}
      </Alert>

      {error && (
        <Alert variant="error" size="sm" className="mb-4" dismissable onDismiss={() => { setError(null) }}>
          {error}
        </Alert>
      )}

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
              disabled={isLoading}
              className="lg:h-12 lg:px-6 lg:rounded-lg mt-6"
            >
              {isLoading ? t('auth.legacy.loggingIn') : t('auth.legacy.loginButton')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
