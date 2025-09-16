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

## Current Status: v3.6 Auth Page Redesign & Logo Component ✅

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

## Firebase Setup Required

1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Configure environment variables in `.env.local`
5. Apply Firestore security rules for user documents

## Recent Updates: v3.6 Logo Component & Auth Page Redesign

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