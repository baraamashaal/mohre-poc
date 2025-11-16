import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../features/auth'
import { Login } from '../features/auth'
import { Dashboard } from '../features/dashboard'
import { CompanyList } from '../features/company'
import { MainLayout } from '../layouts'
import { ROUTES, UserRole } from '../shared/constants'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />

        {/* Protected Routes with MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* All nested routes automatically get Header + Footer */}
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          <Route
            path={ROUTES.COMPANIES}
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.COMPANY_OWNER, UserRole.COMPANY_AUTHORIZER]}
              >
                <CompanyList />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-aegov-black mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 mb-8">
                  The page you're looking for doesn't exist.
                </p>
                <a href={ROUTES.DASHBOARD} className="aegov-btn aegov-btn-solid btn-primary">
                  Go to Dashboard
                </a>
              </div>
            }
          />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
