import { useAuth } from './useAuth'
import { authStorage } from '../utils/storage'
import { getAuthHeader } from '../utils/helpers'

/**
 * Hook for token management
 */
export function useToken() {
  const { tokens, updateTokens } = useAuth()

  const getAccessToken = () => {
    return tokens?.accessToken ?? authStorage.getAccessToken()
  }

  const getRefreshToken = () => {
    return tokens?.refreshToken ?? authStorage.getRefreshToken()
  }

  const getAuthHeaders = () => {
    const token = getAccessToken()
    return token ? getAuthHeader(token) : {}
  }

  const isExpired = () => {
    return authStorage.isTokenExpired()
  }

  return {
    accessToken: tokens?.accessToken,
    refreshToken: tokens?.refreshToken,
    getAccessToken,
    getRefreshToken,
    getAuthHeaders,
    isExpired,
    updateTokens,
  }
}
