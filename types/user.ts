export interface Family {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  createdAt: string;
  lastLoginAt: string;
  onboardingComplete: boolean;
  onboardingStep?: number;
  preferences?: FamilyPreferences;
  profile?: FamilyProfile;
  parent?: ParentData;
}

export interface ParentData {
  name: string;
  pinHash: string;
  createdAt: string;
}

export interface FamilyPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  newsletter?: boolean;
  language?: string;
  timezone?: string;
}

export interface FamilyProfile {
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}


export interface AuthState {
  user: Family | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType {
  user: Family | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

// Common utility types
export type AsyncOperation<T = void> = Promise<T>;
export type ErrorHandler = (error: Error) => void;

// Form validation types
export interface ValidationErrors {
  [key: string]: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationErrors;
  isLoading: boolean;
  isDirty: boolean;
  isValid: boolean;
}

// Loading states for different operations
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface OperationState {
  status: LoadingState;
  error?: string;
}