import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

/**
 * Component to initialize auth state from localStorage on app mount
 * Should be used at the root level of the app
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return <>{children}</>
}

AuthInitializer.displayName = 'AuthInitializer'
