import axios, { type AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '../types/api.types'
import { authStorage } from '../../features/auth/utils/storage'

// ============================================================================
// Configuration
// ============================================================================

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3000/api'
const REQUEST_TIMEOUT = 30000 // 30 seconds
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

// ============================================================================
// Axios Instance Creation
// ============================================================================

/**
 * Create axios instance with default configuration
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// ============================================================================
// Request Interceptor
// ============================================================================

/**
 * Add authentication token to requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get access token from storage
    const accessToken = authStorage.getAccessToken()

    // Add token to Authorization header if available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // Add request timestamp for debugging
    config.headers['X-Request-Time'] = new Date().toISOString()

    return config
  },
  async (error: AxiosError) => {
    return await Promise.reject(error)
  }
)

// ============================================================================
// Response Interceptor
// ============================================================================

/**
 * Handle responses and errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return successful response data
    return response
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean; _retryCount?: number }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message)
      throw new Error('Network error. Please check your internet connection.')
    }

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshToken = authStorage.getTokens()?.refreshToken

        if (refreshToken) {
          // TODO: Implement token refresh logic
          // const response = await refreshAccessToken(refreshToken)
          // authStorage.setTokens(response.tokens)

          // Retry the original request
          // return await apiClient(originalRequest)
        }

        // If no refresh token or refresh failed, clear auth and redirect to login
        authStorage.clearAll()
        window.location.href = '/#/login'
      } catch (refreshError) {
        authStorage.clearAll()
        window.location.href = '/#/login'
        throw refreshError
      }
    }

    // Handle 403 Forbidden - Insufficient permissions
    if (error.response.status === 403) {
      console.error('Access denied:', error.response.data)
      throw new Error('You do not have permission to access this resource.')
    }

    // Handle 404 Not Found
    if (error.response.status === 404) {
      throw new Error('The requested resource was not found.')
    }

    // Handle 422 Validation Error
    if (error.response.status === 422) {
      throw new Error('Validation failed. Please check your input.')
    }

    // Handle 429 Too Many Requests - Rate limiting
    if (error.response.status === 429) {
      throw new Error('Too many requests. Please try again later.')
    }

    // Handle 500+ Server Errors with retry logic
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (error.response.status >= 500 && originalRequest) {
      const retryCount = originalRequest._retryCount ?? 0

      if (retryCount < MAX_RETRIES) {
        originalRequest._retryCount = retryCount + 1

        // Wait before retrying
        await new Promise(resolve => { setTimeout(resolve, RETRY_DELAY * (retryCount + 1)) })

        console.log(`Retrying request (${String(retryCount + 1)}/${String(MAX_RETRIES)})...`)
        return await apiClient(originalRequest)
      }

      throw new Error('Server error. Please try again later.')
    }

    // Handle other errors
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const errorMessage = error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string'
      ? error.response.data.message
      : 'An unexpected error occurred.'
    throw new Error(errorMessage)
  }
)

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create query string from params object
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Handle different value types appropriately
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        searchParams.append(key, String(value))
      } else if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value))
      }
    }
  })

  return searchParams.toString()
}

/**
 * Type-safe GET request
 */
export async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const queryString = params ? `?${buildQueryString(params)}` : ''
  const response = await apiClient.get<T>(`${url}${queryString}`)
  return response.data
}

/**
 * Type-safe POST request
 */
export async function post<T>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.post<T>(url, data)
  return response.data
}

/**
 * Type-safe PUT request
 */
export async function put<T>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.put<T>(url, data)
  return response.data
}

/**
 * Type-safe PATCH request
 */
export async function patch<T>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.patch<T>(url, data)
  return response.data
}

/**
 * Type-safe DELETE request
 */
export async function del<T>(url: string): Promise<T> {
  const response = await apiClient.delete<T>(url)
  return response.data
}

/**
 * Upload file with progress tracking
 */
export async function uploadFile<T>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<T> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(progress)
      }
    },
  })

  return response.data
}
