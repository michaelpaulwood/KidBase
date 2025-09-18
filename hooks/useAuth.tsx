'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  signInWithGoogle,
  logout,
  sendPasswordReset
} from '../lib/auth';
import {
  getFamilyDocument
} from '../lib/db';
import type { Family, AuthContextType, FamilyPreferences, FamilyProfile } from '../types/user';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert Firebase user to our Family type
  const formatFamily = async (firebaseUser: FirebaseUser): Promise<Family | null> => {
    try {
      const familyData = await getFamilyDocument(firebaseUser.uid);
      if (familyData) {
        // Return family data directly - no conversion needed
        return familyData;
      }

      // Fallback if no Firestore document exists
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || 'Family',
        photoURL: firebaseUser.photoURL,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        onboardingComplete: false
      };
    } catch (error) {
      console.error('Error formatting family:', error);
      return null;
    }
  };

  // Clear error state
  const clearError = () => {
    setError(null);
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const authUser = await signUpWithEmailAndPassword({ email, password, name });
      const familyData = await getFamilyDocument(authUser.uid);

      if (familyData) {
        // Convert family data to user format for component compatibility
        setFamily({
          uid: familyData.uid,
          email: familyData.email,
          displayName: familyData.displayName,
          photoURL: familyData.photoURL,
          createdAt: familyData.createdAt,
          lastLoginAt: familyData.lastLoginAt,
          onboardingComplete: familyData.onboardingComplete,
          preferences: familyData.preferences,
          profile: familyData.profile
        });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const authUser = await loginWithEmailAndPassword({ email, password });
      const familyData = await getFamilyDocument(authUser.uid);

      if (familyData) {
        // Convert family data to user format for component compatibility
        setFamily({
          uid: familyData.uid,
          email: familyData.email,
          displayName: familyData.displayName,
          photoURL: familyData.photoURL,
          createdAt: familyData.createdAt,
          lastLoginAt: familyData.lastLoginAt,
          onboardingComplete: familyData.onboardingComplete,
          preferences: familyData.preferences,
          profile: familyData.profile
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google function
  const signInWithGoogleProvider = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const authUser = await signInWithGoogle();
      const familyData = await getFamilyDocument(authUser.uid);

      if (familyData) {
        // Convert family data to user format for component compatibility
        setFamily({
          uid: familyData.uid,
          email: familyData.email,
          displayName: familyData.displayName,
          photoURL: familyData.photoURL,
          createdAt: familyData.createdAt,
          lastLoginAt: familyData.lastLoginAt,
          onboardingComplete: familyData.onboardingComplete,
          preferences: familyData.preferences,
          profile: familyData.profile
        });
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await logout();
      setFamily(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await sendPasswordReset(email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Refresh user data from Firestore
  const refreshUser = async (): Promise<void> => {
    try {
      if (auth.currentUser) {
        const formattedFamily = await formatFamily(auth.currentUser);
        setFamily(formattedFamily);
      }
    } catch (error: any) {
      console.error('Refresh user error:', error);
      setError(error.message);
    }
  };


  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const formattedFamily = await formatFamily(firebaseUser);
          setFamily(formattedFamily);
        } else {
          setFamily(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setFamily(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user: family,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle: signInWithGoogleProvider,
    signOut,
    resetPassword,
    refreshUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};