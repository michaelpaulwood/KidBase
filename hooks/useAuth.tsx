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
  getUserDocument,
  updateUserProfile as updateUserProfileDb,
  updateUserPreferences as updateUserPreferencesDb
} from '../lib/db';
import type { User, AuthContextType, UserPreferences, UserProfile } from '../types/user';

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert Firebase user to our User type
  const formatUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
    try {
      const userData = await getUserDocument(firebaseUser.uid);
      if (userData) {
        return userData;
      }
      
      // Fallback if no Firestore document exists
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || 'User',
        photoURL: firebaseUser.photoURL,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error formatting user:', error);
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
      const userData = await getUserDocument(authUser.uid);
      
      if (userData) {
        setUser(userData);
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
      const userData = await getUserDocument(authUser.uid);
      
      if (userData) {
        setUser(userData);
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
      const userData = await getUserDocument(authUser.uid);
      
      if (userData) {
        setUser(userData);
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
      setUser(null);
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

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      setError(null);
      await updateUserProfileDb(user.uid, updates);
      
      // Update local user state
      setUser(prevUser => ({
        ...prevUser!,
        profile: { ...prevUser!.profile, ...updates }
      }));
    } catch (error: any) {
      console.error('Update profile error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Update user preferences
  const updateUserPreferences = async (preferences: UserPreferences): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    try {
      setError(null);
      await updateUserPreferencesDb(user.uid, preferences);
      
      // Update local user state
      setUser(prevUser => ({
        ...prevUser!,
        preferences
      }));
    } catch (error: any) {
      console.error('Update preferences error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const formattedUser = await formatUser(firebaseUser);
          setUser(formattedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle: signInWithGoogleProvider,
    signOut,
    resetPassword,
    updateUserProfile,
    updateUserPreferences,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};