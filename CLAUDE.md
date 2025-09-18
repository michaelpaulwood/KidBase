# CLAUDE.md

> **Note**: Technical reference file for AI assistants working on this codebase. For human-friendly documentation, see `KidBasePlan.md`.

## Project Overview

KidBase is a production-ready boilerplate for Family and Kids apps based on CoreBase Boilerplate.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint and fix issues
- `npm install` - Install dependencies

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Firebase Auth (email/password)
- **Database**: Firestore
- **Deployment**: Vercel (ready-to-deploy)

## File Structure

```
KidBase/
├── src/app/
│   ├── (auth)/auth/page.tsx     # Login/signup forms
│   ├── dashboard/page.tsx       # Protected user area
│   ├── globals.css              # Tailwind imports + custom design system
│   ├── layout.tsx              # Root layout with auth provider
│   └── page.tsx                # Landing page with hero/features/FAQ
├── components/
│   ├── ui/                     # Core UI components (Button, Input, Loading, etc.)
│   ├── layout/                 # Footer component
│   └── index.ts                # Component library exports
├── lib/
│   ├── firebase.ts             # Firebase configuration
│   ├── auth.ts                 # Authentication helpers
│   ├── db.ts                   # Firestore helpers
│   └── utils.ts                # Utility functions (cn, formatDate, etc.)
├── hooks/
│   └── useAuth.tsx             # Auth context and state management
├── types/
│   └── user.ts                 # TypeScript user interfaces
└── .env.example                # Firebase config template
```

## Key Implementation Details

### Authentication
- Firebase Auth with email/password
- Global auth state via React Context (`useAuth` hook)
- Protected routes with automatic redirects
- User data stored in Firestore on registration

### Modern 3D Design System
- Kid-friendly color palette: Purple (primary), Green (success), Pink, Orange, Cyan
- "Brutal" shadow system with 3D depth effects (shadow-brutal, shadow-brutal-lg)
- Clean typography: Inter for headers, DM Sans for body text
- Enhanced button interactions with hover/active states and translations
- Professional design system showcase page at /elements
- Component variants system with 3D visual effects

### Core Pages
1. **Landing (/)**: Gaming-style hero with "KidBase vs. months wasted" + 3D feature cards (no navigation)
2. **Auth (/auth)**: Login/signup forms with validation and 3D styling
3. **Dashboard (/dashboard)**: Protected user area with profile/stats
4. **Elements (/elements)**: Professional design system showcase (no navigation)

### Development Philosophy
- Mobile-first responsive design
- TypeScript strict mode
- Component reusability
- Zero Next.js template bloat
- Production-ready error handling

## Current Status: v3.9 Onboarding System Complete ✅

**Complete**: Basic Onboarding Flow with Auth Context Refresh

### Onboarding System Implementation

**Core Concept**: Two-layered authentication system foundation
- **Outer Layer**: Firebase Auth (family-level security) ✅
- **Inner Layer**: PIN system (family member access control) 📋 *Ready for Phase 2*

**Phase 1 Completed**: Basic onboarding flow with completion tracking
1. ✅ Onboarding page creation with 3D design system
2. ✅ Database completion tracking with `completeFamilyOnboarding()`
3. ✅ Routing guards for onboarding status
4. ✅ Auth context refresh system for real-time updates
5. ✅ Complete redirect flow working properly

**Working Routing Logic**:
```
Firebase Auth Success → Check onboardingComplete
├── false → Redirect to /onboarding
└── true → Redirect to /dashboard

/onboarding → Complete Setup Button
└── Update DB → Refresh Auth Context → Redirect to /dashboard
```

**Files Created**:
- ✅ `src/app/onboarding/page.tsx` - Beautiful onboarding completion page
- ✅ `lib/db.ts` - Enhanced with `completeFamilyOnboarding()` function

**Files Enhanced**:
- ✅ `src/app/dashboard/page.tsx` - Added onboarding status guards
- ✅ `hooks/useAuth.tsx` - Added `refreshUser()` function for auth context refresh
- ✅ `types/user.ts` - Added `refreshUser` to AuthContextType interface
- ✅ `src/app/(auth)/auth/page.tsx` - Updated redirect logic for onboarding

**Key Technical Achievement**:
Fixed auth context refresh issue where database updates weren't reflected in React state, eliminating redirect loops.

### Previous Implementation: v3.8 User → Family Architecture Migration ✅

All major features implemented:
- ✅ Modern 3D "Rich Shadow" design system with enhanced depth effects
- ✅ Kid-friendly bright color palette (Purple, Green, Pink, Orange, Cyan)
- ✅ Professional design system showcase page (/elements) with compact presentation
- ✅ Clean typography (Inter for headers, DM Sans for body)
- ✅ Enhanced 3D button and card interactions
- ✅ Firebase authentication system
- ✅ Protected routing
- ✅ Responsive components
- ✅ Production deployment ready
- ✅ Unified background color (#fef7ed) across entire site
- ✅ Static feature cards and design elements (no hover animations)
- ✅ Navigation-free clean interface (all top navbars removed)
- ✅ Gaming-style Hero Section with "KidBase vs. months wasted" layout
- ✅ Large colorful logo gradient matching brand identity
- ✅ Direct GitHub repository CTA for better developer workflow
- ✅ Dedicated Design System showcase section on landing page
- ✅ Consistent bordered box styling across all main sections
- ✅ Compact elements page with seamless section flow
- ✅ Back navigation from elements to landing page
- ✅ Multi-line logo header on elements page
- ✅ Fixed color palette display issues
- ✅ Kid-friendly terminology throughout user interface
- ✅ Reusable Logo component with consistent branding across all pages
- ✅ Redesigned auth page layout with improved UX
- ✅ Static form cards with rich shadows (no hover animations)
- ✅ Updated create account form with family-friendly terminology
- ✅ Enhanced Dashboard navbar with unified Logo component
- ✅ Streamlined navbar layout with clean, minimal design
- ✅ Complete User → Family architecture migration
- ✅ Family-first authentication system with Firestore families collection
- ✅ TypeScript interfaces updated for Family data structure

## Firebase Setup Required

1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Configure environment variables in `.env.local`
5. Apply Firestore security rules for family documents

## Recent Updates: v3.8 User → Family Architecture Migration

### Core Architecture Changes
- **Database Migration**: Replaced users collection with families collection in Firestore
- **TypeScript Migration**: Updated all interfaces from User to Family structure
- **Authentication Flow**: Modified signup/login to create family documents instead of user documents
- **State Management**: Updated React Context to manage Family state instead of User state
- **Component Updates**: All UI components now work with Family data structure

### Technical Implementation Details
- **Type Definitions**: Created comprehensive Family interface with onboardingComplete, preferences, and profile fields
- **Database Operations**: Added family-specific CRUD operations in lib/db.ts
- **Auth Context**: Updated useAuth hook to handle Family objects with proper displayName mapping
- **Form Updates**: Changed "Full Name" to "Family Name" for family-focused terminology
- **Error Handling**: Fixed all TypeScript compilation errors and ESLint warnings

### Files Modified
- `/types/user.ts` - Created Family interface, removed old User interface
- `/lib/db.ts` - Added families collection and family document operations
- `/lib/auth.ts` - Updated signup/login to create family documents with onboardingComplete: false
- `/hooks/useAuth.tsx` - Complete migration from User to Family state management
- `/src/app/(auth)/auth/page.tsx` - Updated forms to use family terminology
- `/src/app/dashboard/page.tsx` - Fixed property references for Family interface
- `/src/app/elements/page.tsx` - Fixed invalid padding props
- `/src/app/page.tsx` - Removed invalid Section id props
- `/components/ui/faq.tsx` - Removed debug console.log statements

### Code Quality Improvements
- **ESLint**: ✅ Zero warnings or errors
- **TypeScript**: ✅ Strict type checking with no compilation errors
- **Build**: ✅ Production build successful
- **Architecture**: Ready for parent/kid account implementation under families

## Previous Updates: v3.7 Dashboard Navbar Enhancement

### Dashboard Navbar Optimization
- **Logo Component Integration**: Replaced hardcoded "KidBase" text with unified Logo component
- **Added Extra Small Size**: Created 'xs' size option (1.5rem to 2rem) for navbar context
- **Removed User Badge**: Eliminated family name badge for cleaner, minimal navbar design
- **Consistent Branding**: Dashboard now uses same purple-to-pink-to-orange gradient as other pages
- **Improved UX**: Simplified navbar with just Logo (left) and Logout button (right)

### Technical Implementation Details
- **Logo Component Enhancement**: Added 'xs' size to TypeScript interface and sizeMap
- **Dashboard Integration**: Updated imports and replaced Link wrapper with Logo component's href prop
- **Code Cleanup**: Removed unnecessary Badge component and responsive wrapper
- **Responsive Design**: Logo scales appropriately from 24px (mobile) to 32px (desktop)

### Files Modified
- `components/ui/logo.tsx` - Added 'xs' size option for navbar use
- `src/app/dashboard/page.tsx` - Integrated Logo component and removed user badge
- `CLAUDE.md` - Updated documentation with latest changes
- `KidBasePlan.md` - Updated changelog with v3.7 improvements

## Previous Updates: v3.6 Logo Component & Auth Page Redesign

### Logo Component Implementation
- **File Created**: `components/ui/logo.tsx` - Reusable logo component with consistent branding
- **Features**: 4 responsive sizes (sm, md, lg, xl), optional href prop, hover effects
- **Gradient Fixed**: Updated from `from-secondary-600` to `from-primary-600` for purple-to-pink-to-orange gradient
- **Integration**: Added to design system exports and used across all pages
- **Consistency**: Replaced hardcoded logos on landing, elements, and auth pages

### Auth Page Redesign (/auth)
- **Layout Order**: Welcome back → Logo → Form → Account toggle (as requested)
- **Removed Elements**: Description text, "Back to home" link, logo navigation functionality
- **Spacing Optimization**: Reduced spacing between header/logo and form (mb-12 → mb-6)
- **Form Updates**: Changed "Full Name" to "Family Name" for family-focused terminology
- **Card Styling**: Added rich shadow (`shadow-brutal`) with `hover={false}` for static appearance

### Technical Implementation Details
- **Logo Component**: Uses clamp() for responsive sizing, consistent purple gradient
- **Card Component**: Leveraged existing `hover` prop to disable animations
- **Typography**: Maintains Inter/DM Sans font system throughout
- **Validation**: Updated error messages to match "Family name" terminology
- **Mobile Responsive**: All changes maintain mobile-first design principles

### Files Modified
- `components/ui/logo.tsx` - New reusable logo component
- `components/ui/design-system.tsx` - Added Logo component export
- `src/app/page.tsx` - Updated to use Logo component
- `src/app/elements/page.tsx` - Updated to use Logo component
- `src/app/(auth)/auth/page.tsx` - Complete redesign with Logo component and family terminology

## Git Commit Instructions

NEVER include "Generated with Claude Code" or "Co-Authored-By: Claude" in commit messages.
All commits should be attributed only to the human author (Michael Paul Wood).
Keep commit messages professional and focused on the actual changes made.

## Author

Michael Paul Wood