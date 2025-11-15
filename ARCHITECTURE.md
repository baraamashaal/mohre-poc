# Architecture Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture Pattern Comparison](#architecture-pattern-comparison)
- [Recommended Architecture](#recommended-architecture)
- [Folder Structure](#folder-structure)
- [Design Decisions](#design-decisions)
- [Future Considerations](#future-considerations)

---

## Overview

This document outlines the architectural decisions for the UAE MOHRE application. The application follows an entity-based architecture where users with different roles (Company Owner/Authorizer, Sponsor) can perform actions and view enquiries related to various entities (Company,Employee, File/Sponsor).

### Core Requirements
- Entity-based structure (Company, Employee, Sponsor)
- Role-based access control
- UAE Pass authentication integration
- Scalable and maintainable codebase
- Support for future features (editable entities, user templates)

---

## Architecture Pattern Comparison

### 1. Feature-Based Architecture ⭐ (Recommended)

**Structure:**
```
src/
├── features/
│   ├── company/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   ├── employee/
│   ├── sponsor/
│   └── auth/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── App.tsx
```

**Pros:**
- ✅ Perfect for entity-based systems (Company, Employee, Sponsor)
- ✅ Easy to find all code related to a feature
- ✅ Teams can work on different features independently
- ✅ Easy to add/remove features
- ✅ Aligns with your domain model

**Cons:**
- ❌ Can have some code duplication between features
- ❌ Need clear rules about what goes in shared vs feature

**Best For:** Entity-based applications with clear feature boundaries

---

### 2. Domain-Driven Design (DDD) Architecture

**Structure:**
```
src/
├── domain/
│   ├── company/
│   │   ├── entities/
│   │   ├── services/
│   │   └── repositories/
│   ├── employee/
│   └── sponsor/
├── application/
│   ├── use-cases/
│   └── services/
├── infrastructure/
│   ├── api/
│   └── persistence/
├── presentation/
│   ├── components/
│   ├── pages/
│   └── layouts/
└── App.tsx
```

**Pros:**
- ✅ Excellent for complex business logic
- ✅ Clear separation of concerns
- ✅ Easy to test business logic
- ✅ Matches government entity structure well

**Cons:**
- ❌ More complex setup
- ❌ Steeper learning curve
- ❌ Can be overkill for smaller features

**Best For:** Complex enterprise applications with heavy business logic

---

### 3. Atomic Design Pattern

**Structure:**
```
src/
├── components/
│   ├── atoms/       (buttons, inputs)
│   ├── molecules/   (form fields, cards)
│   ├── organisms/   (forms, headers)
│   ├── templates/   (page layouts)
│   └── pages/       (actual pages)
├── features/
├── services/
└── App.tsx
```

**Pros:**
- ✅ Great component reusability
- ✅ Clear component hierarchy
- ✅ Works well with design systems (UAE Design System)

**Cons:**
- ❌ Can be confusing where to place components
- ❌ Doesn't organize by business logic
- ❌ Not ideal for entity-based systems

**Best For:** Design-system-heavy applications with focus on UI components

---

### 4. Layered/Clean Architecture

**Structure:**
```
src/
├── core/           (business logic)
├── data/           (API, repositories)
├── presentation/   (UI components)
├── shared/         (utilities, types)
└── App.tsx
```

**Pros:**
- ✅ Very organized by technical concerns
- ✅ Clear separation of layers
- ✅ Easy to understand for new developers

**Cons:**
- ❌ Feature code spread across folders
- ❌ Hard to navigate for specific features
- ❌ Doesn't scale well for large apps

**Best For:** Smaller applications with straightforward requirements

---

## Recommended Architecture

### Hybrid Feature-Based + Domain-Driven Architecture

We recommend a **hybrid approach** combining the best of Feature-Based and Domain-Driven patterns for optimal scalability and maintainability.

#### Why This Approach?

1. **Entity-Aligned**: Each feature folder matches domain entities (Company, Employee, Sponsor)
2. **Scalable**: Easy to add new actions/enquiries to entities
3. **Role-Based**: Features can check user roles and show relevant content
4. **Reusable**: Shared UAE Design System components in one place
5. **Maintainable**: Clear separation between features
6. **Future-Proof**: Easy to add templates feature later
7. **Team-Friendly**: Multiple teams can work independently on different entities

---

## Folder Structure

### Complete Directory Structure

```
src/
├── features/
│   ├── company/
│   │   ├── components/
│   │   │   ├── CompanyCard.tsx
│   │   │   ├── CompanyList.tsx
│   │   │   └── CompanySelector.tsx
│   │   ├── pages/
│   │   │   ├── CompanyDashboard.tsx
│   │   │   ├── CompanyDetails.tsx
│   │   │   └── CompanyList.tsx
│   │   ├── hooks/
│   │   │   ├── useCompany.ts
│   │   │   ├── useCompanyActions.ts
│   │   │   └── useCompanyList.ts
│   │   ├── services/
│   │   │   └── company.service.ts
│   │   ├── actions/
│   │   │   └── work-permit/
│   │   │       ├── AddWorkPermit.tsx
│   │   │       └── useAddWorkPermit.ts
│   │   ├── types/
│   │   │   └── company.types.ts
│   │   └── index.ts
│   │
│   ├── employee/
│   │   ├── components/
│   │   │   ├── EmployeeCard.tsx
│   │   │   ├── EmployeeList.tsx
│   │   │   └── EmployeeDetails.tsx
│   │   ├── pages/
│   │   │   ├── EmployeeDashboard.tsx
│   │   │   └── EmployeeProfile.tsx
│   │   ├── hooks/
│   │   │   ├── useEmployee.ts
│   │   │   └── useEmployeeActions.ts
│   │   ├── services/
│   │   │   └── employee.service.ts
│   │   ├── actions/
│   │   │   ├── work-permit/
│   │   │   │   ├── ModifyWorkPermit.tsx
│   │   │   │   ├── CancelWorkPermit.tsx
│   │   │   │   └── RenewWorkPermit.tsx
│   │   │   ├── complaint/
│   │   │   │   ├── SubmitComplaint.tsx
│   │   │   │   └── SubmitCancelComplaint.tsx
│   │   │   └── payment/
│   │   │       └── PayFine.tsx
│   │   ├── enquiries/
│   │   │   ├── WorkPermitContract.tsx
│   │   │   ├── WorkerProtectionProgram.tsx
│   │   │   ├── UnemploymentInsurance.tsx
│   │   │   └── HealthInsurance.tsx
│   │   ├── types/
│   │   │   └── employee.types.ts
│   │   └── index.ts
│   │
│   ├── sponsor/
│   │   ├── components/
│   │   │   ├── SponsorCard.tsx
│   │   │   └── DomesticWorkerList.tsx
│   │   ├── pages/
│   │   │   └── SponsorDashboard.tsx
│   │   ├── hooks/
│   │   │   └── useSponsor.ts
│   │   ├── services/
│   │   │   └── sponsor.service.ts
│   │   ├── types/
│   │   │   └── sponsor.types.ts
│   │   └── index.ts
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginButton.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Callback.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useUAEPass.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── components/
│       │   ├── RoleBasedDashboard.tsx
│       │   ├── EntityGrid.tsx
│       │   └── QuickActions.tsx
│       ├── pages/
│       │   └── Dashboard.tsx
│       ├── hooks/
│       │   └── useDashboard.ts
│       └── index.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── Alert/
│   │   │   ├── Badge/
│   │   │   └── index.ts
│   │   ├── forms/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Textarea/
│   │   │   ├── DatePicker/
│   │   │   └── index.ts
│   │   └── layouts/
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Sidebar/
│   │       └── index.ts
│   ├── hooks/
│   │   ├── usePermissions.ts
│   │   ├── useRole.ts
│   │   ├── useApi.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── api.service.ts
│   │   ├── storage.service.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── common.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── config.ts
│   │   ├── roles.ts
│   │   └── index.ts
│   └── lib/
│       └── axios.ts
│
├── layouts/
│   ├── AuthLayout.tsx
│   ├── MainLayout.tsx
│   ├── DashboardLayout.tsx
│   └── index.ts
│
├── routes/
│   ├── index.tsx
│   ├── ProtectedRoute.tsx
│   └── routes.config.ts
│
├── store/                   (State Management - Optional)
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── companySlice.ts
│   │   └── employeeSlice.ts
│   ├── hooks.ts
│   └── index.ts
│
├── styles/
│   ├── globals.css
│   └── themes.ts
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## Design Decisions

### 1. State Management

**Options Considered:**
- **Context API**: Built-in, simple, good for small-medium apps
- **Redux Toolkit**: Industry standard, great DevTools, best for large apps
- **Zustand**: Lightweight, modern, easy to use

**Recommendation:** Start with **Context API** for auth state, then add **Zustand** if needed for complex state.

**Rationale:**
- Context API is sufficient for role-based access control
- Zustand can be added per-feature if needed
- Avoids over-engineering early on

---

### 2. API Layer

**Strategy:** Feature-based API services with shared HTTP client

**Structure:**
```js
// shared/lib/axios.ts - Centralized config
export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// features/company/services/company.service.ts
export const companyService = {
  getAll: () => apiClient.get('/companies'),
  getById: (id) => apiClient.get(`/companies/${id}`),
  create: (data) => apiClient.post('/companies', data)
}
```

**Benefits:**
- Centralized error handling and interceptors
- Feature-specific API logic
- Easy to mock for testing

---

### 3. Routing Strategy

**Approach:** Feature-based nested routes with React Router

**Example:**
```js
// routes/routes.config.ts
export const routes = {
  dashboard: '/',
  company: {
    list: '/companies',
    details: '/companies/:id',
    addWorkPermit: '/companies/:id/work-permit/add'
  },
  employee: {
    list: '/employees',
    details: '/employees/:id',
    actions: {
      modifyPermit: '/employees/:id/actions/modify-permit',
      submitComplaint: '/employees/:id/actions/complaint'
    }
  }
}
```

---

### 4. Component Patterns

**Naming Conventions:**
- **Pages**: `CompanyDashboard.tsx`, `EmployeeDetails.tsx`
- **Components**: `CompanyCard.tsx`, `EmployeeList.tsx`
- **Hooks**: `useCompany.ts`, `useEmployeeActions.ts`
- **Services**: `company.service.ts`
- **Types**: `company.types.ts`

**Component Structure:**
```js
// Feature Component Example
import { useCompany } from '../hooks/useCompany'
import { CompanyCard } from '../components/CompanyCard'
import type { Company } from '../types/company.types'

export function CompanyList() {
  const { companies, loading } = useCompany()

  if (loading) return <Spinner />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map(company => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  )
}
```

---

### 5. Testing Strategy

**Testing Levels:**
1. **Unit Tests**: Individual components and hooks (React Testing Library)
2. **Integration Tests**: Feature workflows (React Testing Library)
3. **E2E Tests**: Critical user paths (Playwright/Cypress)

**Test Location:** Co-located with code
```
features/
└── company/
    ├── components/
    │   ├── CompanyCard.tsx
    │   └── CompanyCard.test.tsx
```

---

### 6. TypeScript Conventions

**Type Organization:**
- Shared types in `shared/types/`
- Feature-specific types in feature's `types/` folder
- Export all types through `index.ts`

**Example:**
```js
// features/company/types/company.types.ts
export interface Company {
  id: string
  name: string
  tradeNumber: string
  employees: Employee[]
}

export interface CompanyAction {
  id: string
  type: 'ADD_WORK_PERMIT' | 'MODIFY_WORK_PERMIT'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}
```

---

## Future Considerations

### 1. Micro-Frontends
The feature-based structure makes it easy to extract features into separate micro-frontends later if needed.

### 2. Server-Side Rendering (SSR)
If SSR is needed, the structure supports migration to Next.js or Remix with minimal changes.

### 3. Mobile Application
The service layer and types can be shared with a React Native application.

### 4. Admin Panel
A separate `features/admin/` module can be added for entity configuration and template management.

### 5. Internationalization (i18n)
✅ **IMPLEMENTED** - The application now includes full bilingual support:

**Structure:**
```
src/locales/
├── en/
│   ├── common.json
│   ├── company.json
│   └── employee.json
└── ar/
    ├── common.json
    ├── company.json
    └── employee.json
```

**Usage:**
```js
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation('common')

  // Toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  return <h1>{t('app.title')}</h1>
}
```

**Features:**
- Namespace-based organization (common, company, employee)
- RTL support for Arabic
- Language switcher in header
- Persistent language preference (can be added via localStorage)

### 6. Performance Optimization
- Code splitting per feature using lazy loading
- Component-level memoization
- Virtual scrolling for large lists

---

## Getting Started

### Creating a New Feature

1. Create feature folder: `src/features/new-feature/`
2. Add required subfolders: `components/`, `pages/`, `hooks/`, `services/`, `types/`
3. Create `index.ts` to export public API
4. Add routes to `routes/routes.config.ts`
5. Update role permissions if needed

### Creating a New Component

1. Create component folder in appropriate location
2. Add component file, test file, and index
3. Use TypeScript for props
4. Follow UAE Design System guidelines
5. Write tests before implementing complex logic

---

## References

- [React Architecture Patterns](https://www.developerway.com/posts/react-project-structure)
- [Feature-Based Architecture](https://profy.dev/article/react-folder-structure)
- [Domain-Driven Design](https://dev.to/nilanth/react-architecture-for-enterprise-application-3pnh)
- [UAE Design System Documentation](https://designsystem.gov.ae/docs)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-01-14 | 1.0 | Initial architecture documentation |

---

**Maintained by:** Development Team
**Last Updated:** 2025-01-14