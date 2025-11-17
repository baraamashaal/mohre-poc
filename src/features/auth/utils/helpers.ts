import type { User, AuthTokens } from '../types/auth.types'

/**
 * Create authorization header for API requests
 */
export function getAuthHeader(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  }
}

/**
 * Check if token is expired (with 5 minute buffer)
 */
export function isTokenExpiring(expiresIn?: number): boolean {
  if (!expiresIn) return false

  const bufferSeconds = 5 * 60 // 5 minutes
  return expiresIn <= bufferSeconds
}

/**
 * Validate user object has required fields
 */
export function isValidUser(user: unknown): user is User {
  if (!user || typeof user !== 'object') return false

  const u = user as Record<string, unknown>
  return !!(
    u.id &&
    typeof u.id === 'string' &&
    u.name &&
    typeof u.name === 'string' &&
    u.email &&
    typeof u.email === 'string' &&
    u.emiratesId &&
    typeof u.emiratesId === 'string' &&
    Array.isArray(u.roles)
  )
}

/**
 * Validate tokens object has required fields
 */
export function isValidTokens(tokens: unknown): tokens is AuthTokens {
  if (!tokens || typeof tokens !== 'object') return false

  const t = tokens as Record<string, unknown>
  return !!(t.accessToken && typeof t.accessToken === 'string')
}

/**
 * Get user initials for avatar fallback
 */
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Format user role for display
 */
export function formatRole(role: string): string {
  return role
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
