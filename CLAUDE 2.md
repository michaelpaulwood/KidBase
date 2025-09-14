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

### Design System
- Custom Tailwind config with color palettes (primary, secondary, warm)
- Responsive typography using clamp() functions
- Gradient backgrounds with natural transitions
- Component variants system (button sizes, input states, etc.)

### Core Pages
1. **Landing (/)**: Hero, benefits, how-it-works, FAQ sections
2. **Auth (/auth)**: Login/signup forms with validation
3. **Dashboard (/dashboard)**: Protected user area with profile/stats

### Development Philosophy
- Mobile-first responsive design
- TypeScript strict mode
- Component reusability
- Zero Next.js template bloat
- Production-ready error handling

## Current Status: v2.0 Production Ready ✅

All major features implemented:
- ✅ Complete design system with modern UI
- ✅ Firebase authentication system
- ✅ Protected routing
- ✅ Responsive components
- ✅ Production deployment ready

## Firebase Setup Required

1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Configure environment variables in `.env.local`
5. Apply Firestore security rules for user documents

## Author

Michael Paul Wood