# API Integration Guide

This document provides a comprehensive guide to the API integration layer implemented in the MOHRE POC application.

## Overview

The application uses **axios** as the HTTP client library with a robust service layer that provides:

- ✅ Automatic authentication token injection
- ✅ Request/response interceptors
- ✅ Comprehensive error handling
- ✅ Automatic retry logic for failed requests
- ✅ Type-safe API calls with TypeScript
- ✅ Mock API mode for development
- ✅ Pagination support
- ✅ File upload capabilities

## Directory Structure

```
src/
├── shared/
│   ├── lib/
│   │   └── axios.ts              # Base axios configuration
│   └── types/
│       └── api.types.ts          # Common API types
├── features/
│   ├── auth/
│   │   └── services/
│   │       ├── auth.api.ts       # Real API calls
│   │       └── authService.ts    # Service layer (mock + real)
│   ├── company/
│   │   └── services/
│   │       └── company.api.ts    # Company API calls
│   ├── employee/
│   │   └── services/
│   │       └── employee.api.ts   # Employee API calls
│   └── sponsor/
│       └── services/
│           └── sponsor.api.ts    # Sponsor API calls
```

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# UAE Pass OAuth Configuration
VITE_UAE_PASS_CLIENT_ID=your_client_id_here
VITE_UAE_PASS_REDIRECT_URI=http://localhost:5173/#/auth/callback
VITE_UAE_PASS_AUTHORIZE_URL=https://stg-id.uaepass.ae/idshub/authorize
VITE_UAE_PASS_TOKEN_URL=https://stg-id.uaepass.ae/idshub/token

# Feature Flags
VITE_ENABLE_MOCK_API=true    # Set to 'false' to use real API
VITE_ENABLE_DEBUG=true
```

### Switching Between Mock and Real API

The application supports both mock and real API modes:

- **Mock Mode** (`VITE_ENABLE_MOCK_API=true`): Uses local mock data
- **Real API Mode** (`VITE_ENABLE_MOCK_API=false`): Makes actual HTTP requests

## Base Axios Configuration

The base axios instance is configured in `src/shared/lib/axios.ts`:

### Features

1. **Automatic Token Injection**
   - Reads access token from localStorage
   - Adds `Authorization: Bearer <token>` header to all requests

2. **Request Interceptors**
   - Adds authentication headers
   - Adds request timestamp for debugging

3. **Response Interceptors**
   - Handles 401 (Unauthorized) - Attempts token refresh
   - Handles 403 (Forbidden) - Access denied errors
   - Handles 404 (Not Found) - Resource not found
   - Handles 422 (Validation Error) - Form validation errors
   - Handles 429 (Rate Limit) - Too many requests
   - Handles 500+ (Server Error) - Automatic retry with exponential backoff

4. **Retry Logic**
   - Max retries: 3 attempts
   - Retry delay: 1 second (increases with each retry)
   - Only retries on 500+ server errors

### Helper Functions

```typescript
// Type-safe GET request
await get<ResponseType>(url, params)

// Type-safe POST request
await post<ResponseType, RequestData>(url, data)

// Type-safe PUT request
await put<ResponseType, RequestData>(url, data)

// Type-safe PATCH request
await patch<ResponseType, RequestData>(url, data)

// Type-safe DELETE request
await del<ResponseType>(url)

// Upload file with progress tracking
await uploadFile<ResponseType>(url, file, onProgress)
```

## API Services

### 1. Authentication API (`auth.api.ts`)

```typescript
import { loginWithCredentials, handleUAEPassCallback, refreshAccessToken, logout, getUserProfile } from '@/features/auth/services/auth.api'

// Login with email/password
const response = await loginWithCredentials({ email, password })

// Handle UAE Pass callback
const response = await handleUAEPassCallback(code, state)

// Refresh access token
const tokens = await refreshAccessToken(refreshToken)

// Logout
await logout()

// Get user profile
const user = await getUserProfile()
```

### 2. Company API (`company.api.ts`)

```typescript
import { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany, getCompanyStatistics } from '@/features/company/services/company.api'

// Get paginated list of companies
const result = await getCompanies({ page: 1, pageSize: 20, status: 'active' })

// Get company by ID
const company = await getCompanyById('company-123')

// Create new company
const company = await createCompany({ name, tradeNumber, emirate, industry })

// Update company
const company = await updateCompany('company-123', { status: 'inactive' })

// Delete company
await deleteCompany('company-123')

// Get company statistics
const stats = await getCompanyStatistics('company-123')
```

### 3. Employee API (`employee.api.ts`)

```typescript
import {
  getEmployees,
  getEmployeesByCompany,
  getEmployeeById,
  modifyWorkPermit,
  renewWorkPermit,
  cancelWorkPermit,
  submitComplaint,
  payFine,
  getWorkPermitContract,
  getWPPStatus,
  getILOEStatus,
  getHealthInsuranceStatus
} from '@/features/employee/services/employee.api'

// Get paginated list of employees
const result = await getEmployees({ page: 1, pageSize: 20 })

// Get employees by company
const result = await getEmployeesByCompany('company-123', { page: 1 })

// Get employee details
const employee = await getEmployeeById('employee-456')

// Work Permit Actions
await modifyWorkPermit('employee-456', { position: 'Manager', salary: 15000 })
await renewWorkPermit('employee-456', { duration: 24 })
await cancelWorkPermit('employee-456', { reason: 'Contract ended', effectiveDate: '2025-01-01' })

// Submit complaint
const result = await submitComplaint('employee-456', { type: 'salary', subject: '...', description: '...' })

// Pay fine
const result = await payFine('employee-456', 'fine-789', { paymentMethod: 'card' })

// Enquiries
const contract = await getWorkPermitContract('employee-456')
const wppStatus = await getWPPStatus('employee-456')
const iloeStatus = await getILOEStatus('employee-456')
const healthInsurance = await getHealthInsuranceStatus('employee-456')
```

### 4. Sponsor API (`sponsor.api.ts`)

```typescript
import { getSponsorProfile, getSponsoredEmployees, getSponsorStatistics, getSponsorRequests, submitSponsorRequest } from '@/features/sponsor/services/sponsor.api'

// Get sponsor profile
const profile = await getSponsorProfile()

// Get sponsored employees
const result = await getSponsoredEmployees({ page: 1, pageSize: 20 })

// Get sponsor statistics
const stats = await getSponsorStatistics()

// Get sponsor requests
const requests = await getSponsorRequests({ status: 'pending' })

// Submit new request
const request = await submitSponsorRequest({ type: 'new_worker', description: '...' })
```

## Common Types

### API Response Types

```typescript
// Standard success response
interface ApiResponse<T> {
  data: T
  message?: string
  timestamp?: string
}

// Paginated response
interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

interface PaginationMeta {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// Error response
interface ApiError {
  message: string
  code?: string
  status?: number
  errors?: Record<string, string[]>
  timestamp?: string
}
```

### Query Parameters

```typescript
interface QueryParams {
  // Pagination
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'

  // Filtering
  search?: string
  status?: string
  startDate?: string
  endDate?: string
  [key: string]: string | number | boolean | undefined
}
```

## Error Handling

All API calls return typed errors that can be caught and handled:

```typescript
try {
  const companies = await getCompanies({ page: 1 })
} catch (error) {
  const apiError = error as ApiError

  switch (apiError.status) {
    case 401:
      // Unauthorized - token expired
      // Interceptor already handles this
      break
    case 403:
      // Forbidden - insufficient permissions
      console.error(apiError.message)
      break
    case 404:
      // Not found
      console.error(apiError.message)
      break
    case 422:
      // Validation error
      console.error(apiError.errors)
      break
    default:
      console.error(apiError.message)
  }
}
```

## File Upload

Upload files with progress tracking:

```typescript
import { uploadFile } from '@/shared/lib/axios'

const file = event.target.files[0]

const result = await uploadFile(
  '/upload/documents',
  file,
  (progress) => {
    console.log(`Upload progress: ${progress}%`)
  }
)
```

## Token Refresh Flow

The axios interceptor automatically handles token refresh:

1. Request fails with 401 Unauthorized
2. Interceptor catches the error
3. Attempts to refresh the token using refresh token from localStorage
4. If successful, retries the original request with new token
5. If refresh fails, clears auth data and redirects to login

## Best Practices

### 1. Always Use Type-Safe Helpers

```typescript
// ✅ Good - Type-safe
const companies = await get<PaginatedResponse<Company>>('/companies')

// ❌ Bad - No type safety
const companies = await apiClient.get('/companies')
```

### 2. Handle Errors Properly

```typescript
// ✅ Good
try {
  const result = await createCompany(data)
  // Handle success
} catch (error) {
  const apiError = error as ApiError
  // Handle specific error cases
}

// ❌ Bad
const result = await createCompany(data) // Unhandled promise
```

### 3. Use Query Parameters Correctly

```typescript
// ✅ Good
await getEmployees({
  page: 1,
  pageSize: 20,
  status: 'active',
  search: 'john'
})

// ❌ Bad
await getEmployees({
  page: '1',  // Should be number
  pageSize: null  // Should be number or undefined
})
```

### 4. Mock API During Development

Keep `VITE_ENABLE_MOCK_API=true` during development to work without a backend. Switch to `false` when the real API is ready.

## Next Steps

1. **Implement real backend API** matching the endpoint structure
2. **Add request/response logging** for debugging
3. **Implement API rate limiting** on client side
4. **Add request caching** for frequently accessed data
5. **Implement optimistic updates** for better UX
6. **Add WebSocket support** for real-time notifications

## Support

For issues or questions about the API integration:
- Check the axios documentation: https://axios-http.com/
- Review the TypeScript types in `src/shared/types/api.types.ts`
- Check environment variables in `.env`
- Verify mock API flag: `VITE_ENABLE_MOCK_API`
