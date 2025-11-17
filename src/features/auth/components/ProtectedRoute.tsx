import type { ReactNode } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { UserRole } from '../../../shared/constants/roles'
import { ROUTES } from '../../../shared/constants'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: UserRole[]
}

// DEV MODE: Set to true to bypass authentication for development
const DEV_MODE_BYPASS_AUTH = false

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()

  // DEV MODE: Skip auth check if bypass is enabled
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (DEV_MODE_BYPASS_AUTH) {
    console.log('[DEV MODE] Auth bypass enabled - skipping authentication check')
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = user?.roles.some((role) =>
      requiredRoles.includes(role)
    )

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-aegov-bg">
          <div className="aegov-card card-base max-w-md">
            <h2 className="text-2xl font-bold text-aegov-black mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You do not have permission to access this page.
            </p>
            <Link to={ROUTES.DASHBOARD} className="aegov-btn aegov-btn-solid btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
