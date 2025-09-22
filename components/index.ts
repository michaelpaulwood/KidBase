// KidBase Component Library
// Export all reusable components from a single entry point

// UI Components
export { default as Button } from './ui/button';
export { default as Input } from './ui/input';
export { default as PinInput } from './ui/pin-input';
export { default as PinVerificationModal } from './ui/pin-verification-modal';
export { default as Loading, LoadingOverlay, LoadingSkeleton, LoadingButton } from './ui/loading';
export { useToast, ToastProvider } from './ui/toast';
export { default as ErrorBoundary } from './ui/error-boundary';

// Layout Components
export { default as Footer } from './layout/footer';

// Re-export types for convenience
export type {
  Toast,
} from './ui/toast';

// Component library metadata
export const COMPONENT_LIBRARY_VERSION = '1.0.0';
export const COMPONENT_LIBRARY_NAME = 'KidBase UI';

// Usage example:
// import { Button, Input, Loading, useToast } from '@/components';
// import { Button, Input, Loading, useToast } from './components';