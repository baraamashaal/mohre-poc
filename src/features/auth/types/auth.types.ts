import { UserRole } from '../../../shared/constants/roles'

export interface User {
  id: string
  name: string
  email: string
  emiratesId: string
  roles: UserRole[]
  avatar?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  tokenType?: string
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}

export interface UAEPassConfig {
  clientId: string
  redirectUri: string
  scope: string
  state: string
}
