# Component Structure Guide

## Standard Component Organization

This document outlines the recommended structure for organizing components in the `src/components` folder.

## Folder Structure

```
src/components/
├── layouts/              # Layout components (AppLayout, etc.)
│   └── AppLayout/
│       ├── AppLayout.tsx
│       └── index.ts      # Barrel export
│
├── ui/                   # Reusable UI primitives (shadcn-style components)
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── index.ts
│   ├── Dialog/
│   │   ├── Dialog.tsx
│   │   └── index.ts
│   └── ... (other UI primitives)
│
├── features/             # Feature-specific components
│   ├── video/
│   │   ├── VideoCard/
│   │   │   ├── VideoCard.tsx
│   │   │   └── index.ts
│   │   ├── VideoPlayer/
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── index.ts
│   │   ├── VideoList/
│   │   │   ├── VideoList.tsx
│   │   │   └── index.ts
│   │   ├── TrendingVideoCard/
│   │   │   ├── TrendingVideoCard.tsx
│   │   │   └── index.ts
│   │   ├── GamingVideoCard/
│   │   │   ├── GamingVideoCard.tsx
│   │   │   └── index.ts
│   │   └── VideoDetailsContent/
│   │       ├── VideoDetailsContent.tsx
│   │       └── index.ts
│   └── search/
│       └── SearchBar/
│           ├── SearchBar.tsx
│           └── index.ts
│
├── navigation/           # Navigation components
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   └── Sidebar/
│       ├── Sidebar.tsx
│       └── index.ts
│
├── auth/                 # Authentication components
│   ├── Login/
│   │   ├── Login.tsx
│   │   └── index.ts
│   └── LogoutConfirmationDialog/
│       ├── LogoutConfirmationDialog.tsx
│       └── index.ts
│
├── routes/               # Route guards and route-related components
│   └── ProtectedRoute/
│       ├── ProtectedRoute.tsx
│       └── index.ts
│
└── common/               # Shared/common components (if needed)
    └── ... (components used across multiple features)
```

## Structure Guidelines

### 1. **Layouts** (`layouts/`)
- Components that define the overall page structure
- Examples: `AppLayout`, `DashboardLayout`, `AuthLayout`
- Should be reusable across different pages

### 2. **UI** (`ui/`)
- Reusable, generic UI components (design system components)
- Examples: `Button`, `Input`, `Dialog`, `Card`, `Modal`, `Dropdown`
- Should be style-agnostic and highly reusable
- Follow shadcn/ui patterns if using shadcn

### 3. **Features** (`features/`)
- Feature-specific components organized by domain
- Group related components together (e.g., all video-related components under `video/`)
- Each component should have its own folder with:
  - Component file (`ComponentName.tsx`)
  - Index file (`index.ts`) for clean imports
  - Optional: styles, types, hooks, or tests

### 4. **Navigation** (`navigation/`)
- Navigation-related components
- Examples: `Navbar`, `Sidebar`, `Breadcrumbs`, `Pagination`

### 5. **Auth** (`auth/`)
- Authentication and authorization related components
- Examples: `Login`, `LogoutConfirmationDialog`, `Signup`

### 6. **Routes** (`routes/`)
- Route guards and route-related components
- Examples: `ProtectedRoute`, `PublicRoute`, `RouteWrapper`

### 7. **Common** (`common/`)
- Components that don't fit into other categories
- Shared utilities or components used across multiple features
- Use sparingly - prefer feature-specific organization

## Component Folder Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx      # Main component file
├── index.ts              # Barrel export (export { default } from './ComponentName')
├── ComponentName.types.ts # Types/interfaces (if complex)
├── ComponentName.styles.ts # Styles (if using CSS modules or styled-components)
└── ComponentName.test.tsx # Tests (if applicable)
```

### Example: VideoCard Component

```
VideoCard/
├── VideoCard.tsx
├── VideoCard.types.ts    # Optional: if types are complex
└── index.ts
```

**index.ts content:**
```typescript
export { default } from './VideoCard'
export type { VideoCardProps } from './VideoCard.types' // if separate types file
```

## Import Patterns

### Good ✅
```typescript
// Clean imports using barrel exports
import VideoCard from '@/components/features/video/VideoCard'
import Button from '@/components/ui/Button'
import AppLayout from '@/components/layouts/AppLayout'
```

### Avoid ❌
```typescript
// Deep imports
import VideoCard from '@/components/features/video/VideoCard/VideoCard'
```

## Naming Conventions

1. **Component folders**: PascalCase (e.g., `VideoCard/`)
2. **Component files**: PascalCase (e.g., `VideoCard.tsx`)
3. **Index files**: `index.ts` (lowercase)
4. **Type files**: `ComponentName.types.ts`
5. **Style files**: `ComponentName.styles.ts` or `ComponentName.module.css`

## Migration Plan

### Current Structure → New Structure

1. **Layouts** (already correct)
   - `Layouts/AppLayout/` → `layouts/AppLayout/`

2. **UI Components**
   - `common/Button.tsx` → `ui/Button/Button.tsx`
   - `common/Input.tsx` → `ui/Input/Input.tsx`
   - `ui/Dialog.tsx` → `ui/Dialog/Dialog.tsx`

3. **Feature Components**
   - `VideoCard/` → `features/video/VideoCard/`
   - `VideoPlayer/` → `features/video/VideoPlayer/`
   - `VideoList/` → `features/video/VideoList/`
   - `TrendingVideoCard/` → `features/video/TrendingVideoCard/`
   - `GamingVideoCard/` → `features/video/GamingVideoCard/`
   - `VideoDetailsContent/` → `features/video/VideoDetailsContent/`
   - `SearchBar/` → `features/search/SearchBar/`

4. **Navigation**
   - `Navbar/` → `navigation/Navbar/`
   - `Sidebar/` → `navigation/Sidebar/`

5. **Auth**
   - `auth/Login.tsx` → `auth/Login/Login.tsx`
   - `common/LogoutConfirmationDialog.tsx` → `auth/LogoutConfirmationDialog/LogoutConfirmationDialog.tsx`

6. **Routes**
   - `ProtectedRoute/` → `routes/ProtectedRoute/`

## Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering
2. **Discoverability**: Clear where to find and place components
3. **Maintainability**: Related components are grouped together
4. **Reusability**: Clear separation between UI primitives and feature components
5. **Team Collaboration**: Consistent structure helps team members navigate codebase

## Path Aliases (Recommended)

Configure in `tsconfig.json` or `vite.config.ts`:

```typescript
{
  "@components": "./src/components",
  "@ui": "./src/components/ui",
  "@features": "./src/components/features",
  "@layouts": "./src/components/layouts",
  "@navigation": "./src/components/navigation",
  "@auth": "./src/components/auth",
  "@routes": "./src/components/routes"
}
```

Then use:
```typescript
import Button from '@ui/Button'
import VideoCard from '@features/video/VideoCard'
import AppLayout from '@layouts/AppLayout'
```

