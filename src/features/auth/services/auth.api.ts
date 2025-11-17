import { post } from '../../../shared/lib/axios'
import type { ApiResponse } from '../../../shared/types/api.types'
import type { LoginCredentials, LoginResponse, AuthTokens, User } from '../types/auth.types'

// ============================================================================
// API Endpoints
// ============================================================================

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
  UAE_PASS_CALLBACK: '/auth/uaepass/callback',
} as const

// ============================================================================
// Request/Response Types
// ============================================================================

interface RefreshTokenRequest {
  refreshToken: string
}

interface RefreshTokenResponse {
  accessToken: string
  refreshToken?: string
  expiresIn: number
  tokenType: string
}

interface UAEPassCallbackRequest {
  code: string
  state: string
}

// ============================================================================
// Authentication API Functions
// ============================================================================

/**
 * Login with email and password (legacy login)
 * @param credentials - User email and password
 * @returns LoginResponse with user data and tokens
 */
export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await post<ApiResponse<LoginResponse>, LoginCredentials>(
    AUTH_ENDPOINTS.LOGIN,
    credentials
  )
  return response.data
}

/**
 * Handle UAE Pass OAuth callback
 * @param code - Authorization code from UAE Pass
 * @param state - State parameter for CSRF protection
 * @returns LoginResponse with user data and tokens
 */
export async function handleUAEPassCallback(
  code: string,
  state: string
): Promise<LoginResponse> {
  const response = await post<ApiResponse<LoginResponse>, UAEPassCallbackRequest>(
    AUTH_ENDPOINTS.UAE_PASS_CALLBACK,
    { code, state }
  )
  return response.data
}

/**
 * Refresh access token using refresh token
 * @param refreshToken - The refresh token
 * @returns New access token and expiry
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<AuthTokens> {
  const response = await post<ApiResponse<RefreshTokenResponse>, RefreshTokenRequest>(
    AUTH_ENDPOINTS.REFRESH,
    { refreshToken }
  )

  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
    expiresIn: response.data.expiresIn,
    tokenType: response.data.tokenType,
  }
}

/**
 * Logout user and invalidate tokens
 */
export async function logout(): Promise<void> {
  await post<ApiResponse<null>>(AUTH_ENDPOINTS.LOGOUT)
}

/**
 * Get current user profile
 * @returns User data
 */
export async function getUserProfile(): Promise<User> {
  const response = await post<ApiResponse<User>>(AUTH_ENDPOINTS.PROFILE)
  return response.data
}
