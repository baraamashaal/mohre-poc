import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { ProtectedRoute } from '../features/auth'
import { Login } from '../features/auth'
import { Dashboard } from '../features/dashboard'
import { CompanyList, CompanyDetails } from '../features/company/pages'
import { EmployeeDetails, SponsorEmployees } from '../features/employee/pages'
import { MainLayout } from '../layouts'
import { ROUTES, UserRole } from '../shared/constants'

export function AppRoutes() {
  return (
    <HashRouter>
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
          {/* Dashboard */}
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          {/* Company Routes */}
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

          <Route
            path={ROUTES.COMPANY_DETAILS}
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.COMPANY_OWNER, UserRole.COMPANY_AUTHORIZER]}
              >
                <CompanyDetails />
              </ProtectedRoute>
            }
          />

          {/* Employee Routes */}
          <Route
            path={ROUTES.EMPLOYEE_DETAILS}
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.COMPANY_OWNER, UserRole.COMPANY_AUTHORIZER, UserRole.SPONSOR]}
              >
                <EmployeeDetails />
              </ProtectedRoute>
            }
          />

          {/* Sponsor Routes */}
          <Route
            path={ROUTES.SPONSORS}
            element={
              <ProtectedRoute
                requiredRoles={[UserRole.SPONSOR]}
              >
                <SponsorEmployees />
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
                <Link to={ROUTES.DASHBOARD} className="aegov-btn aegov-btn-solid btn-primary">
                  Go to Dashboard
                </Link>
              </div>
            }
          />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </HashRouter>
  )
}
