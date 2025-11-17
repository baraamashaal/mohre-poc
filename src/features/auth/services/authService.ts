import type { LoginCredentials, LoginResponse } from '../types/auth.types'
import { UserRole } from '../../../shared/constants/roles'
import * as authApi from './auth.api'

/**
 * Authentication service with support for both mock and real API
 * Controlled by VITE_ENABLE_MOCK_API environment variable
 */

// Check if mock API is enabled
const USE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

// Mock delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock login function (used when VITE_ENABLE_MOCK_API=true)
 */
async function mockLoginWithCredentials(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  await delay(1000) // Simulate network delay

  // Mock validation
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required')
  }

  // Mock user data - in production, this comes from API
  if (credentials.email === 'admin@mohre.gov.ae' && credentials.password === 'password') {
    return {
      user: {
        id: '1',
        name: 'Ahmed Al Mansouri',
        email: credentials.email,
        emiratesId: '784-1234-5678901-1',
        roles: [UserRole.COMPANY_OWNER, UserRole.SPONSOR],
        avatar: undefined,
      },
      tokens: {
        accessToken: `mock_access_token_${Date.now().toString()}`,
        refreshToken: `mock_refresh_token_${Date.now().toString()}`,
        expiresIn: 3600, // 1 hour
        tokenType: 'Bearer',
      },
    }
  }

  // For demo: allow any @mohre.gov.ae email
  if (credentials.email.endsWith('@mohre.gov.ae')) {
    return {
      user: {
        id: '2',
        name: credentials.email.split('@')[0].replace('.', ' '),
        email: credentials.email,
        emiratesId: '784-9999-8888777-6',
        roles: [UserRole.COMPANY_OWNER],
        avatar: undefined,
      },
      tokens: {
        accessToken: `mock_access_token_${Date.now().toString()}`,
        refreshToken: `mock_refresh_token_${Date.now().toString()}`,
        expiresIn: 3600,
        tokenType: 'Bearer',
      },
    }
  }

  throw new Error('Invalid credentials')
}

/**
 * Login with credentials - uses mock or real API based on environment
 */
export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  if (USE_MOCK_API) {
    return await mockLoginWithCredentials(credentials)
  }
  return await authApi.loginWithCredentials(credentials)
}

/**
 * Mock refresh token function
 */
async function mockRefreshAccessToken(refreshToken: string): Promise<{
  accessToken: string
  expiresIn: number
}> {
  await delay(500)

  if (!refreshToken) {
    throw new Error('Refresh token required')
  }

  return {
    accessToken: `mock_new_access_token_${Date.now().toString()}`,
    expiresIn: 3600,
  }
}

/**
 * Refresh access token - uses mock or real API based on environment
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string
  expiresIn: number
}> {
  if (USE_MOCK_API) {
    return await mockRefreshAccessToken(refreshToken)
  }
  const tokens = await authApi.refreshAccessToken(refreshToken)
  return {
    accessToken: tokens.accessToken,
    expiresIn: tokens.expiresIn ?? 3600,
  }
}

/**
 * Mock logout function
 */
async function mockLogout(): Promise<void> {
  await delay(300)
  console.log('[AuthService] Mock logout successful')
}

/**
 * Logout - uses mock or real API based on environment
 */
export async function logout(): Promise<void> {
  if (USE_MOCK_API) {
    await mockLogout()
    return
  }
  await authApi.logout()
}
