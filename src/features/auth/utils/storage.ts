import type { User, AuthTokens } from '../types/auth.types'

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user',
  EXPIRES_AT: 'auth_expires_at',
} as const

/**
 * Storage utilities for authentication data
 */
export const authStorage = {
  // Token management
  setTokens: (tokens: AuthTokens) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken)

    if (tokens.refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken)
    }

    if (tokens.expiresIn) {
      const expiresAt = Date.now() + tokens.expiresIn * 1000
      localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString())
    }
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  },

  getTokens: (): AuthTokens | null => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    if (!accessToken) return null

    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    const expiresAt = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT)

    return {
      accessToken,
      refreshToken: refreshToken ?? undefined,
      expiresIn: expiresAt ? Math.floor((parseInt(expiresAt) - Date.now()) / 1000) : undefined,
    }
  },

  isTokenExpired: (): boolean => {
    const expiresAt = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT)
    if (!expiresAt) return false

    return Date.now() >= parseInt(expiresAt)
  },

  clearTokens: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT)
  },

  // User management
  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  getUser: (): User | null => {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER)
    if (!userJson) return null

    try {
      return JSON.parse(userJson) as User
    } catch {
      return null
    }
  },

  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  // Clear all auth data
  clearAll: () => {
    authStorage.clearTokens()
    authStorage.clearUser()
  },

  // Check if user is logged in
  hasValidSession: (): boolean => {
    const token = authStorage.getAccessToken()
    const user = authStorage.getUser()
    const isExpired = authStorage.isTokenExpired()

    return !!(token && user && !isExpired)
  },
}
