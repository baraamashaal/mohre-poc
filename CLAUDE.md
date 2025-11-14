# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UAE government services application that integrates with UAE Pass for authentication. The application follows an entity-based architecture where users with different roles (Company Owner/Authorizer, Sponsor) can perform actions and view enquiries related to various entities (Company, Employee, File/Sponsor).

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compilation first, then Vite build)
npm run build

# Run ESLint on all files
npm run lint

# Preview production build
npm run preview
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** build tool with React plugin
- **React Compiler** enabled via babel-plugin-react-compiler (impacts dev/build performance)
- **UAE Pass** integration for authentication (to be implemented)

## Domain Model & Architecture

### Core Entities

The application is organized around three main entities, each with associated Actions and Enquiries:

**1. Company Entity**
- Visible to: Company Owner/Authorizer role
- Actions: Add New Work Permit (extensible)
- Enquiries: None yet (to be added)
- Company details page shows all employees under the company

**2. Employee Entity**
- Visible to: Company owners (via company details) and Sponsors
- Actions: Modify/Cancel/Renew Work Permit, Submit Complaint, Submit Cancel Work Permit Complaint, Pay Fine
- Enquiries: Work Permit Contract, Worker Protection Program (WPP), Unemployment Insurance (ILOE), Health Insurance (WHI)

**3. File (Sponsor) Entity**
- Visible to: Sponsor role
- Lists domestic workers sponsored by the user
- Each domestic worker is treated as an Employee Entity
- Actions/enquiries to be defined

### User Roles

- **Company Owner / Authorizer**: Can view/manage companies and their employees
- **Sponsor**: Can view/manage domestic workers they sponsor

Users can have multiple roles simultaneously. The dashboard adapts to show relevant entities based on assigned roles.

### Future Architecture Plans

1. **Editable Entity Configuration**: Admin-configurable actions and enquiries per entity
2. **User Templates**: Custom form templates per role with reusable field configurations (e.g., Salary, Nationality fields for Work Permit forms)

## TypeScript Configuration

- **Project References**: Separate configs for app code (`tsconfig.app.json`) and tooling (`tsconfig.node.json`)
- **Strict Mode**: Enabled with additional checks (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`)
- **Modern Targets**: ES2022 for app, ES2023 for tooling
- **Bundler Mode**: `moduleResolution: "bundler"` with `verbatimModuleSyntax` enabled

## ESLint Configuration

Comprehensive setup with type-aware rules:

- Type-checked rules: `recommendedTypeChecked`, `strictTypeChecked`, `stylisticTypeChecked`
- React plugins: `react-x`, `react-dom`, `react-hooks`, `react-hooks-extra`, `react-naming-convention`
- Parser references both `tsconfig.node.json` and `tsconfig.app.json` for full type information
- Build artifacts in `dist/` are ignored

## Implementation Notes

- The React Compiler is active - expect some performance impact during development
- All code changes are validated against strict TypeScript types via ESLint
- Build process runs TypeScript compilation (`tsc -b`) before Vite build
- Entry point: `src/main.tsx` renders root component in StrictMode
- HTML entry: `index.html` loads the app via `src/main.tsx`

## Domain-Specific Considerations

- Authentication flow must integrate with UAE Pass
- Role-based access control determines which entities are visible
- Entity structure should remain flexible for future expansion
- Forms will need to support dynamic template injection in the future
- All government service terminology should use both English and Arabic where applicable (see app_requirements.md for examples)