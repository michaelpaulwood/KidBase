# KidBase Component Library

A collection of reusable React components built with TypeScript and Tailwind CSS.

## Usage

Import components from the main index file:

```typescript
import { Button, Input, Loading, useToast } from '@/components';
// or
import { Button, Input, Loading, useToast } from './components';
```

## UI Components

### Button
Flexible button component with multiple variants and states.

```tsx
<Button variant="primary" size="lg" isLoading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `disabled`: boolean
- Standard button props

### Input
Form input component with labels, validation, and error states.

```tsx
<Input
  label="Email"
  name="email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We'll never share your email"
  required
/>
```

**Props:**
- `label`: string
- `name`: string
- `error`: string (displays error message)
- `helperText`: string
- Standard input props

### Loading
Versatile loading component with multiple styles and variants.

```tsx
// Basic spinner
<Loading size="md" text="Loading..." />

// Overlay loading
<LoadingOverlay isLoading={true}>
  <YourContent />
</LoadingOverlay>

// Skeleton loading
<LoadingSkeleton rows={3} className="w-full" />

// Loading button
<LoadingButton isLoading={submitting}>
  Submit
</LoadingButton>
```

**Loading Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `text`: string
- `overlay`: boolean
- `color`: 'blue' | 'white' | 'gray'

### Toast Notifications
Context-based toast notification system.

```tsx
const { success, error, warning, info } = useToast();

// Show notifications
success('Profile updated successfully!');
error('Failed to save changes');
warning('Please verify your email');
info('New features available');
```

### Error Boundary
React error boundary for graceful error handling.

```tsx
<ErrorBoundary fallback={<CustomErrorComponent />}>
  <YourApp />
</ErrorBoundary>
```

## Layout Components

### Navigation
Responsive navigation component with user state handling.

```tsx
<Navigation
  user={currentUser}
  onLogout={handleLogout}
/>
```

### Footer
Footer component with attribution and tech stack display.

```tsx
<Footer />
```

## Customization

All components use Tailwind CSS classes and can be customized by:

1. **Modifying the component files** directly
2. **Extending Tailwind config** for design system changes
3. **Creating variant props** for different styles
4. **Overriding classes** with className prop where supported

## Adding New Components

1. Create component file in appropriate subfolder
2. Export from subfolder's index file (if exists)
3. Add export to main `components/index.ts`
4. Update this README with usage examples

## Development

All components are:
- **TypeScript** - Fully typed with proper interfaces
- **Responsive** - Mobile-first design approach
- **Accessible** - Following ARIA guidelines where applicable
- **Reusable** - Designed for composition and reuse
- **Tested** - Ready for unit test additions

## Dependencies

- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Next.js 14+ (for some hooks)

---

Built with ❤️ for rapid development