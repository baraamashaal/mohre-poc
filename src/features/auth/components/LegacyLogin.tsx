import { useForm } from 'react-hook-form'
import type {User} from '../types/auth.types';

interface LegacyLoginForm {
  username: string
  password: string
}

interface LegacyLoginProps {
  onLoginSuccess: (user: User) => void
  className?: string
}

export function LegacyLogin({ onLoginSuccess, className = '' }: LegacyLoginProps) {
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
      <div role="alert" id="alert-4" className="aegov-alert alert-warning mb-6">
        <div className="alert-content">
          <p className="text-sm">
            This login method will be discontinued soon. You must switch to the use of UAE PASS.
          </p>
        </div>
        <div className="alert-dismiss">
          <button data-dismiss-target="#alert-4" aria-label="Close">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>

      <form
        action=""
        className="text-start"
        onSubmit={(e) => {
          e.preventDefault()
          void handleSubmit(onSubmit)(e)
        }}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="aegov-form-control">
            <label htmlFor="user_name">Username</label>
            <div className="form-control-input">
              <input
                type="text"
                id="user_name"
                placeholder="enter your username / email address"
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' }
                })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="aegov-form-control">
            <label htmlFor="password_name">Password</label>
            <div className="form-control-input">
              <input
                type="password"
                id="password_name"
                placeholder="enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault() }}
              className="no-underline"
            >
              Forgot Password?
            </a>
          </div>

          <div>
            <button type="submit" className="aegov-btn btn-block btn-sm lg:btn-base mt-6">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
