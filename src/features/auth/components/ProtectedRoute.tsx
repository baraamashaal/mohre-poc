import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { UserRole } from '../../../shared/constants/roles'
import { ROUTES } from '../../../shared/constants'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: UserRole[]
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()

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
            <a href={ROUTES.DASHBOARD} className="aegov-btn aegov-btn-solid btn-primary">
              Go to Dashboard
            </a>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
