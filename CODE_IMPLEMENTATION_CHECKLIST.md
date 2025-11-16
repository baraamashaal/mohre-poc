# Code Implementation Checklist

This checklist must be followed before implementing any code in the MOHRE POC project.

## 1. Planning & Understanding
- [ ] Read and understand the user's requirement
- [ ] Check if similar functionality already exists in the codebase
- [ ] Review relevant files in the affected area
- [ ] Identify which entity this relates to (Company, Employee, File/Sponsor, or Shared)
- [ ] Check CLAUDE.md for project-specific guidelines
- [ ] Verify role-based access requirements

## 2. Architecture & Organization
- [ ] **File Location**: Place code in correct directory structure
  - Features: `src/features/{entity}/` (components, pages, hooks, types)
  - Shared Components: `src/shared/components/ui/` or `/layouts/`
  - Types: `src/shared/types/` or `src/features/{entity}/types/`
  - Constants: `src/shared/constants/`
- [ ] **Naming Convention**: Use PascalCase for components, camelCase for files/functions
- [ ] **Index Files**: Create/update index.ts for proper exports
- [ ] **Group Related Code**: Keep related components in same folder (e.g., Footer/FooterAccordion)

## 3. UAE Design System Compliance
- [ ] **HTML Structure**: Match exact UAE Design System HTML structure if provided
- [ ] **CSS Classes**: Use exact UAE Design System classes (aegov-*, aeblack-*, aegreen-*, etc.)
- [ ] **Spacing**: Preserve exact spacing, padding, margins from design system
- [ ] **Typography**: Use design system font sizes and weights
- [ ] **Icons**: Use Phosphor icons or UAE Design System SVGs
- [ ] **Responsive**: Ensure mobile/tablet/desktop breakpoints match (sm:, md:, lg:, xl:)
- [ ] **Accessibility**: Include proper ARIA labels, sr-only text, semantic HTML

## 4. TypeScript & Type Safety
- [ ] **Strict Types**: Enable all strict TypeScript checks
- [ ] **Interfaces/Types**: Define clear interfaces for all props and data structures
- [ ] **Zod Validation**: Add Zod schemas for component props validation
- [ ] **Generic Types**: Use proper generic types where applicable
- [ ] **No `any`**: Avoid `any` type unless absolutely necessary
- [ ] **Type Exports**: Export types from index.ts for external use
- [ ] **Template Literals**: Use `String()` wrapper for numbers in template literals

## 5. React Patterns (React 19)
- [ ] **forwardRef**: Use proper `(props, ref) =>` signature for refs
- [ ] **Hooks Order**: Follow hooks rules (no conditional hooks)
- [ ] **useState**: Derive state from props/URL when possible (avoid sync issues)
- [ ] **useEffect**: Avoid cascading renders, prefer direct state derivation
- [ ] **Memoization**: Use `React.memo()` for expensive components
- [ ] **Key Props**: Always provide unique keys in lists (avoid index as key)
- [ ] **Event Handlers**: Use proper event types (e.g., `React.FormEvent<HTMLFormElement>`)

## 6. Internationalization (i18n)
- [ ] **useTranslation**: Import and use `const { t } = useTranslation('namespace')`
- [ ] **Translation Keys**: Add keys to both `en/common.json` and `ar/common.json`
- [ ] **Type Safety**: Ensure i18next.d.ts is updated for new namespaces
- [ ] **RTL Support**: Use logical properties (ps-/pe- instead of pl-/pr-)
- [ ] **useDirection**: Apply `useDirection()` hook where RTL/LTR matters
- [ ] **Dynamic Content**: Use `{t('key')}` for all user-facing text

## 7. Component Development
- [ ] **Read Existing**: Always read existing component files before editing
- [ ] **Prefer Edit**: Edit existing components instead of creating new ones
- [ ] **Prop Validation**: Add Zod schema for all props
- [ ] **Default Props**: Define sensible defaults
- [ ] **className Support**: Accept and merge className prop (use `twMerge` or `cn()`)
- [ ] **Spread Props**: Support `{...rest}` for HTML attributes
- [ ] **Display Name**: Set `Component.displayName = 'ComponentName'`
- [ ] **JSDoc**: Add component documentation with `/**  */` comments
- [ ] **No Emojis**: Don't use emojis unless explicitly requested

## 8. Styling
- [ ] **Tailwind First**: Use Tailwind utility classes
- [ ] **CVA for Variants**: Use Class Variance Authority for component variants
- [ ] **Design System Classes**: Preserve UAE Design System classes exactly
- [ ] **Responsive**: Add mobile-first responsive classes
- [ ] **Dark Mode**: Consider dark mode if applicable (though not required yet)
- [ ] **Spacing**: Use design system spacing scale (sm:py-6 md:py-12, etc.)

## 9. State Management
- [ ] **URL State**: Use URL params for shareable/bookmarkable state
- [ ] **useSearchParams**: For URL-based state management
- [ ] **Context**: Use React Context for global app state (e.g., auth)
- [ ] **Local State**: Keep state as local as possible
- [ ] **Form State**: Use react-hook-form for complex forms
- [ ] **Derived State**: Calculate from source of truth instead of storing

## 10. Data Fetching & APIs
- [ ] **Error Handling**: Handle loading, error, and success states
- [ ] **Type Safety**: Type API responses
- [ ] **Retry Logic**: Use Radash `retry()` for failed requests
- [ ] **Loading States**: Show loading indicators
- [ ] **Error Messages**: Use Alert component for user-friendly errors

## 11. Utilities & Helpers
- [ ] **Radash**: Use Radash instead of Lodash/Underscore
- [ ] **Tree Shaking**: Import only what you need (`import { debounce } from 'radash'`)
- [ ] **Debounce/Throttle**: Use for search inputs and frequent events
- [ ] **Date Formatting**: Use `toLocaleDateString()` or date-fns
- [ ] **Helper Functions**: Place in `src/shared/utils/` or feature-specific utils

## 12. Testing & Validation
- [ ] **TypeScript Check**: Run `npx tsc --noEmit` before committing
- [ ] **ESLint**: Fix all ESLint errors and warnings
- [ ] **Build**: Ensure `npm run build` succeeds
- [ ] **Manual Testing**: Test on mobile and desktop viewports
- [ ] **RTL Testing**: Switch to Arabic and verify RTL layout
- [ ] **Accessibility**: Test keyboard navigation and screen readers

## 13. Code Quality
- [ ] **No Console Logs**: Remove console.log statements (use proper logging if needed)
- [ ] **No Unused Imports**: Remove unused imports
- [ ] **No Unused Variables**: Remove unused variables
- [ ] **Consistent Formatting**: Follow project's Prettier/ESLint config
- [ ] **Comments**: Add comments for complex logic only (code should be self-documenting)
- [ ] **Magic Numbers**: Replace with named constants

## 14. Security
- [ ] **Input Validation**: Validate all user inputs
- [ ] **XSS Prevention**: Sanitize user-generated content
- [ ] **CSRF**: Ensure CSRF protection for forms
- [ ] **Auth Checks**: Verify role-based access control
- [ ] **Secure Routes**: Protect routes with ProtectedRoute component
- [ ] **No Secrets**: Never commit API keys or secrets

## 15. Performance
- [ ] **Bundle Size**: Check if new dependencies are necessary
- [ ] **Code Splitting**: Use dynamic imports for large components
- [ ] **Image Optimization**: Optimize images, use appropriate formats
- [ ] **Memoization**: Memoize expensive calculations
- [ ] **Lazy Loading**: Lazy load routes and heavy components

## 16. Git & Version Control
- [ ] **Branch**: Work on feature branch, not main
- [ ] **Commits**: Make small, focused commits with clear messages
- [ ] **No Sensitive Data**: Don't commit .env or credentials
- [ ] **Gitignore**: Verify build artifacts are ignored

## 17. Documentation
- [ ] **README**: Update README if adding new features
- [ ] **CLAUDE.md**: Update if architecture changes
- [ ] **Component Docs**: Add JSDoc comments for complex components
- [ ] **Type Exports**: Document exported types

## 18. Before Submitting
- [ ] All TypeScript errors fixed
- [ ] All ESLint warnings fixed
- [ ] All tests passing (when tests are added)
- [ ] Code reviewed for best practices
- [ ] No breaking changes to existing components
- [ ] Imports are clean and organized
- [ ] File structure follows project conventions

---

## Quick Reference

### File Structure
```
src/
├── features/           # Feature-specific code
│   ├── auth/          # Authentication
│   ├── company/       # Company entity
│   ├── employee/      # Employee entity
│   └── dashboard/     # Dashboard
├── shared/            # Shared across app
│   ├── components/    # Reusable components
│   │   ├── ui/       # UI components
│   │   └── layouts/  # Layout components
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Utility functions
│   ├── constants/    # Constants
│   └── types/        # Shared types
└── layouts/          # Page layouts
```

### Import Order
1. React and external libraries
2. Internal shared components/utils
3. Feature-specific imports
4. Types
5. Styles/assets

### Component Template
```tsx
import * as React from 'react'
import { z } from 'zod'

// Schema
const ComponentSchema = z.object({
  // ... props
})

// Types
export interface ComponentProps {
  // ... props
}

// Component
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  (props, ref) => {
    const { /* validated props */ } = ComponentSchema.parse(props)

    return (
      <div ref={ref}>
        {/* JSX */}
      </div>
    )
  }
)

Component.displayName = 'Component'
```
