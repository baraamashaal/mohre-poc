# Setup Guide

## Quick Start

This guide will help you get the UAE MOHRE application up and running.

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open http://localhost:5173 in your browser
   - Default login page will appear

### Development Workflow

#### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

#### Testing the Architecture

The application is now structured with:

1. **Feature-based organization** - Each feature (company, employee, sponsor, auth) is self-contained
2. **Internationalization** - Switch between English and Arabic using the language toggle
3. **Role-based access** - Different features available based on user roles
4. **UAE Design System** - All components use the official UAE government design system

### Mock Login

Since UAE Pass integration is not yet connected to a real backend, you can test the application by:

1. Navigate to the Login page (`/login`)
2. Click "Login with UAE Pass" button
3. **For development**, you can temporarily modify the login to auto-authenticate:

```js
// In src/features/auth/pages/Login.tsx
const handleUAEPassLogin = () => {
  // TODO: Replace with real UAE Pass OAuth flow
  const mockUser = {
    id: '1',
    name: 'Ahmed Al Mansouri',
    email: 'ahmed@example.ae',
    emiratesId: '784-1990-1234567-1',
    roles: [UserRole.COMPANY_OWNER, UserRole.SPONSOR],
  }
  login(mockUser)
  window.location.href = ROUTES.DASHBOARD
}
```

### Project Structure Overview

```
src/
├── features/          # Feature modules (company, employee, sponsor, auth, dashboard)
├── shared/            # Shared components, hooks, utilities
│   ├── components/    # Reusable UI components
│   ├── constants/     # App-wide constants
│   ├── types/         # TypeScript types
│   └── utils/         # Helper functions
├── layouts/           # Page layouts
├── routes/            # Routing configuration
├── locales/           # Translations (en, ar)
└── lib/               # Third-party library configs
```

### Available Features

#### ✅ Implemented

- **Authentication Structure** - Login page with UAE Pass integration skeleton
- **Dashboard** - Role-based dashboard showing relevant entities
- **Company Management** - List and view companies (for Company Owners/Authorizers)
- **Employee Features** - Employee cards with actions and enquiries structure
- **Internationalization** - Full English/Arabic support with RTL
- **UI Components** - Button, Card, Alert, Badge, Input components
- **Routing** - Protected routes with role-based access control
- **State Management** - Zustand for auth state

#### 🚧 To Be Implemented

- **UAE Pass OAuth Integration** - Connect to real UAE Pass authentication
- **API Integration** - Connect to backend services
- **Company Details Page** - Full company profile with employee list
- **Employee Actions** - Work permit modification, complaints, payments
- **Employee Enquiries** - Contract, insurance details
- **Sponsor Features** - Domestic worker management
- **Form Submissions** - Actual form processing and validation
- **File Uploads** - Document upload functionality
- **Notifications** - Toast notifications for actions
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - Global error boundary and error pages
- **Testing** - Unit and integration tests

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.mohre.gov.ae

# UAE Pass Configuration
VITE_UAE_PASS_CLIENT_ID=your_client_id
VITE_UAE_PASS_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_UAE_PASS_SCOPE=openid profile email
```

### Language Support

The application supports:
- **English (en)** - Default language, LTR
- **Arabic (ar)** - RTL support enabled

Toggle languages using the button in the header.

### Adding New Features

Follow the feature-based architecture pattern:

1. Create feature folder: `src/features/your-feature/`
2. Add required subfolders: `components/`, `pages/`, `hooks/`, `services/`, `types/`
3. Create `index.ts` to export public API
4. Add routes to `src/routes/index.tsx`
5. Add translations to `src/locales/en/` and `src/locales/ar/`
6. Update role permissions if needed in `src/shared/constants/roles.ts`

### Troubleshooting

#### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

#### TypeScript errors
```bash
# Rebuild TypeScript
npm run build
```

#### i18n not working
Make sure the i18n library is initialized in `src/lib/i18n.ts` and imported in `src/App.tsx`

### Next Steps

1. **Connect UAE Pass** - Implement OAuth flow in `src/features/auth/services/auth.service.ts`
2. **Add API Layer** - Create axios instance in `src/shared/lib/axios.ts`
3. **Implement Services** - Add API calls in each feature's `services/` folder
4. **Add State Management** - Use Zustand or Context for complex state
5. **Write Tests** - Add test files alongside components
6. **Deploy** - Configure deployment to UAE government hosting

### Resources

- [Architecture Documentation](./ARCHITECTURE.md)
- [Requirements](./app_requirements.md)
- [UAE Design System Docs](https://designsystem.gov.ae/docs)
- [React Router Docs](https://reactrouter.com/)
- [i18next Docs](https://www.i18next.com/)

---

**Happy Coding!** 🚀
