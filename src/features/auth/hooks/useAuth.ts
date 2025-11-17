import { create } from 'zustand'
import type { AuthState, AuthTokens, LoginResponse } from '../types/auth.types'
import { authStorage } from '../utils/storage'

interface AuthStore extends AuthState {
  login: (response: LoginResponse) => void
  logout: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  initializeAuth: () => void
  updateTokens: (tokens: AuthTokens) => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (response: LoginResponse) => {
    const { user, tokens } = response

    // Store in localStorage
    authStorage.setUser(user)
    authStorage.setTokens(tokens)

    // Update state
    set({
      user,
      tokens,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    })

    console.log('[Auth] User logged in:', user.name)
  },

  logout: () => {
    // Clear localStorage
    authStorage.clearAll()

    // Update state
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })

    console.log('[Auth] User logged out')
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },

  setError: (error: string | null) => {
    set({ error, isLoading: false })
  },

  // Initialize auth from localStorage on app start
  initializeAuth: () => {
    console.log('[Auth] Initializing auth from localStorage')

    const user = authStorage.getUser()
    const tokens = authStorage.getTokens()
    const hasValidSession = authStorage.hasValidSession()

    if (hasValidSession && user && tokens) {
      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      console.log('[Auth] Session restored from localStorage:', user.name)
    } else {
      // Clear invalid session
      authStorage.clearAll()
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      console.log('[Auth] No valid session found')
    }
  },

  // Update tokens (for refresh token flow)
  updateTokens: (tokens: AuthTokens) => {
    authStorage.setTokens(tokens)
    set({ tokens })
    console.log('[Auth] Tokens updated')
  },
}))
