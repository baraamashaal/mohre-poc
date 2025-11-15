import { UserRole } from '../../../shared/constants/roles'

export interface User {
  id: string
  name: string
  email: string
  emiratesId: string
  roles: UserRole[]
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface UAEPassConfig {
  clientId: string
  redirectUri: string
  scope: string
  state: string
}
