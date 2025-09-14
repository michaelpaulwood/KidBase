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
│   ├── layout/                 # Navigation, Footer, Mobile menu
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
1. **Landing (/)**: Modern hero section with 3D feature cards and kid-friendly design
2. **Auth (/auth)**: Login/signup forms with validation and 3D styling
3. **Dashboard (/dashboard)**: Protected user area with profile/stats
4. **Elements (/elements)**: Professional design system showcase with live examples

### Development Philosophy
- Mobile-first responsive design
- TypeScript strict mode
- Component reusability
- Zero Next.js template bloat
- Production-ready error handling

## Current Status: v3.1 Unified Background & Static Components ✅

All major features implemented:
- ✅ Modern 3D "Brutal" design system with enhanced shadows
- ✅ Kid-friendly bright color palette (Purple, Green, Pink, Orange, Cyan)
- ✅ Professional design system showcase page (/elements)
- ✅ Clean typography (Inter for headers, DM Sans for body)
- ✅ Enhanced 3D button and card interactions
- ✅ Firebase authentication system
- ✅ Protected routing
- ✅ Responsive components
- ✅ Production deployment ready
- ✅ Unified background color (#fef7ed) across entire site
- ✅ Static feature cards and design elements (no hover animations)

## Firebase Setup Required

1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Configure environment variables in `.env.local`
5. Apply Firestore security rules for user documents

## Git Commit Instructions

NEVER include "Generated with Claude Code" or "Co-Authored-By: Claude" in commit messages.
All commits should be attributed only to the human author (Michael Paul Wood).
Keep commit messages professional and focused on the actual changes made.

## Author

Michael Paul Wood