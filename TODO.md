# TODO - Future Implementation Tasks

This document tracks planned features and improvements for the MOHRE POC application.

## Phase 1: API Integration

### API Service Layer with Axios
- [ ] Create axios instance with base configuration
  - [ ] Set up request/response interceptors
  - [ ] Add authentication token injection
  - [ ] Implement error handling middleware
  - [ ] Add retry logic for failed requests

- [ ] Create service files
  - [ ] `src/shared/lib/axios.ts` - Base axios configuration
  - [ ] `src/features/auth/services/auth.service.ts` - Authentication APIs
  - [ ] `src/features/company/services/company.service.ts` - Company APIs
  - [ ] `src/features/employee/services/employee.service.ts` - Employee APIs
  - [ ] `src/features/sponsor/services/sponsor.service.ts` - Sponsor APIs

- [ ] Define API types
  - [ ] Request/Response interfaces
  - [ ] Error response types
  - [ ] Pagination types

## Phase 2: Detail Pages

### Company Detail Pages
- [ ] Create `src/features/company/pages/CompanyDetails.tsx`
  - [ ] Display company information
  - [ ] List all employees under the company
  - [ ] Add action buttons (Add New Work Permit, etc.)
  - [ ] Integrate with company API service

### Employee Detail Pages
- [ ] Create `src/features/employee/pages/EmployeeDetails.tsx`
  - [ ] Display employee information
  - [ ] Show work permit details
  - [ ] Display available actions
  - [ ] Show available enquiries
  - [ ] Integrate with employee API service

### Sponsor Dashboard
- [ ] Create `src/features/sponsor/pages/SponsorDashboard.tsx`
  - [ ] List domestic workers
  - [ ] Display sponsor information
  - [ ] Show available actions per worker

## Phase 3: Form Implementations with Validation

### Work Permit Forms
- [ ] Create `src/features/employee/components/forms/ModifyWorkPermitForm.tsx`
  - [ ] Implement form with react-hook-form
  - [ ] Add Zod validation schema
  - [ ] Connect to API service
  - [ ] Add file upload support

- [ ] Create `src/features/employee/components/forms/RenewWorkPermitForm.tsx`
  - [ ] Implement form with react-hook-form
  - [ ] Add Zod validation schema
  - [ ] Connect to API service

- [ ] Create `src/features/employee/components/forms/CancelWorkPermitForm.tsx`
  - [ ] Implement form with react-hook-form
  - [ ] Add Zod validation schema
  - [ ] Connect to API service

### Complaint Forms
- [ ] Create `src/features/employee/components/forms/SubmitComplaintForm.tsx`
  - [ ] Implement form with react-hook-form
  - [ ] Add Zod validation schema
  - [ ] Add file attachment support
  - [ ] Connect to API service

- [ ] Create `src/features/employee/components/forms/CancelComplaintForm.tsx`
  - [ ] Implement form with react-hook-form
  - [ ] Add Zod validation schema
  - [ ] Connect to API service

### Company Forms
- [ ] Create `src/features/company/components/forms/AddWorkPermitForm.tsx`
  - [ ] Implement form with react-hook-form
  - [ ] Add Zod validation schema
  - [ ] Add employee selection
  - [ ] Connect to API service

### Validation Schemas
- [ ] Create `src/features/employee/schemas/workPermit.schema.ts`
- [ ] Create `src/features/employee/schemas/complaint.schema.ts`
- [ ] Create `src/features/company/schemas/company.schema.ts`

## Phase 4: Testing Framework

### Testing Setup
- [ ] Install testing dependencies
  - [ ] Jest
  - [ ] React Testing Library
  - [ ] @testing-library/jest-dom
  - [ ] @testing-library/user-event
  - [ ] MSW (Mock Service Worker) for API mocking

- [ ] Configure Jest
  - [ ] Create `jest.config.js`
  - [ ] Set up test environment
  - [ ] Configure coverage thresholds

- [ ] Create test utilities
  - [ ] `src/test/setup.ts` - Global test setup
  - [ ] `src/test/utils.tsx` - Custom render functions
  - [ ] `src/test/mocks/` - Mock data and handlers

### Unit Tests
- [ ] UI Components
  - [ ] Button component tests
  - [ ] Card component tests
  - [ ] Alert component tests
  - [ ] Form component tests

- [ ] Feature Components
  - [ ] CompanyCard tests
  - [ ] EmployeeCard tests
  - [ ] LoginCard tests

- [ ] Hooks
  - [ ] useAuth tests
  - [ ] Custom form hooks tests

### Integration Tests
- [ ] Authentication flow
- [ ] Company list and details
- [ ] Employee actions workflow
- [ ] Form submission flows

### E2E Tests (Optional)
- [ ] Install Playwright
- [ ] Configure Playwright
- [ ] Create E2E test scenarios
  - [ ] Login flow
  - [ ] Company management flow
  - [ ] Employee action flow

## Additional Improvements

### Security
- [ ] Implement CSRF protection
- [ ] Add XSS prevention measures
- [ ] Secure token storage (httpOnly cookies or secure localStorage)
- [ ] Add content security policy headers

### Performance
- [ ] Implement code splitting per feature
- [ ] Add lazy loading for routes
- [ ] Optimize images
- [ ] Add memoization where needed
- [ ] Implement virtual scrolling for long lists

### UX Enhancements
- [ ] Create loading skeletons
- [ ] Add spinner components
- [ ] Implement error boundaries
- [ ] Add toast notification system
- [ ] Implement breadcrumb navigation
- [ ] Add pagination for lists
- [ ] Implement search/filter functionality

### Configuration
- [ ] Create `.env.example` file
- [ ] Add environment variable validation
- [ ] Document all required env vars
  - [ ] API_BASE_URL
  - [ ] UAE_PASS_CLIENT_ID
  - [ ] UAE_PASS_REDIRECT_URI

### Documentation
- [ ] Add JSDoc comments to components
- [ ] Create API documentation
- [ ] Document form validation schemas
- [ ] Add testing documentation
- [ ] Create deployment guide

## Notes

- Prioritize Phase 1 (API Integration) before implementing detail pages
- Form implementations depend on API service layer being complete
- Testing can be done in parallel with feature development
- Consider creating feature flags for gradual rollout
