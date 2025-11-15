import { create } from 'zustand'
import type { AuthState, User } from '../types/auth.types'

interface AuthStore extends AuthState {
  login: (user: User) => void
  logout: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (user: User) => {
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    })
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },

  setError: (error: string | null) => {
    set({ error, isLoading: false })
  },
}))
