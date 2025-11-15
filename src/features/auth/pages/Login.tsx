import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UAEPassButton } from '../components/UAEPassButton'
import { useAuth } from '../hooks/useAuth'
import { ROUTES, UserRole } from '../../../shared/constants'

interface AlternativeLoginForm {
  username: string
  password: string
}

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showAlternativeLogin, setShowAlternativeLogin] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<AlternativeLoginForm>()

  const handleUAEPassLogin = () => {
    // TODO: Implement real UAE Pass OAuth flow
    // For now, simulate login with mock user data
    const mockUser = {
      id: '1',
      name: 'Ahmed Al Mansouri',
      email: 'ahmed.almansouri@example.ae',
      emiratesId: '784-1990-1234567-1',
      roles: [UserRole.COMPANY_OWNER, UserRole.SPONSOR],
    }

    login(mockUser)
    void navigate(ROUTES.DASHBOARD)
  }

  const onAlternativeLoginSubmit = (data: AlternativeLoginForm) => {
    // TODO: Implement alternative login API call
    console.log('Alternative login:', data)

    // Mock login for development
    const mockUser = {
      id: '2',
      name: data.username,
      email: `${data.username}@example.ae`,
      emiratesId: '784-1990-1234567-2',
      roles: [UserRole.COMPANY_OWNER],
    }

    login(mockUser)
    void navigate(ROUTES.DASHBOARD)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-aegov-bg px-4 py-8">
      <div className="w-full sm:w-[26rem] mx-auto p-6 text-center space-y-10 border border-primary-400 rounded md:rounded-lg xl:rounded-xl min-h-[32rem] xl:min-h-[35rem] bg-white">

        {/* Logo Section */}
        <div className="flex justify-center pt-4">
          <div className="text-3xl sm:text-4xl font-bold text-techblue-600">
            MOHRE
          </div>
        </div>

        {/* UAE Pass Login Section */}
        <div
          id="aegov-accordion-body-1"
          className={showAlternativeLogin ? 'hidden' : 'block'}
          aria-labelledby="aegov-accordion-heading-1"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-aegov-black">
              Sign in
            </h2>

            <p className="text-sm text-aeblack-800">
              Use your UAE Pass digital identity to securely access government services.
            </p>

            {/* UAE Pass Button */}
            <UAEPassButton onClick={handleUAEPassLogin} size="lg" />

            {/* Help Text */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Don't have a UAE Pass account?
              </p>
              <a
                href="https://www.uaepass.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-techblue-600 hover:text-techblue-700 font-medium inline-block"
              >
                Create UAE Pass Account →
              </a>
            </div>

            {/* Toggle to Alternative Login */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAlternativeLogin(true)
                }}
                className="text-sm text-techblue-600 hover:text-techblue-700 underline"
              >
                Use alternative login method
              </button>
            </div>
          </div>
        </div>

        {/* Alternative Login Section */}
        <div
          id="aegov-accordion-body-2"
          className={showAlternativeLogin ? 'block' : 'hidden'}
          aria-labelledby="aegov-accordion-heading-2"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-aegov-black">
              Alternative Login
            </h2>

            {/* Warning Alert */}
            <div className="aegov-alert alert-warning text-left" role="alert">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm">
                  <strong className="font-semibold">Notice:</strong> This login method will be discontinued soon. Please use UAE Pass for secure access.
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={(e) => {
              void handleSubmit(onAlternativeLoginSubmit)(e)
            }} className="space-y-4">
              {/* Username Field */}
              <div className="aegov-form-control text-left">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`form-control-input w-full px-3 py-2 border rounded-md ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('username', {
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Username must be at least 3 characters' }
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="aegov-form-control text-left">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`form-control-input w-full px-3 py-2 border rounded-md ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-techblue-600 hover:text-techblue-700"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Forgot password functionality coming soon')
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Toggle back to UAE Pass */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAlternativeLogin(false)
                }}
                className="text-sm text-techblue-600 hover:text-techblue-700 underline"
              >
                ← Back to UAE Pass login
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 pt-6">
          <p>A single trusted digital identity for all citizens, residents and visitors.</p>
        </div>
      </div>
    </div>
  )
}
