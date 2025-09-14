import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserDocument, getUserDocument } from './db';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Convert Firebase User to our AuthUser interface
export const formatAuthUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL
});

// Sign up with email and password
export const signUpWithEmailAndPassword = async ({
  email,
  password,
  name
}: SignUpData): Promise<AuthUser> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    const user = userCredential.user;
    
    // Update the user's display name
    await updateProfile(user, {
      displayName: name
    });

    // Create user document in Firestore
    const userData = {
      uid: user.uid,
      email: user.email!,
      displayName: name,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    
    await createUserDocument(user.uid, userData);
    
    return formatAuthUser(user);
  } catch (error: unknown) {
    console.error('Error signing up:', error);
    throw new Error(getAuthErrorMessage((error as { code: string }).code));
  }
};

// Sign in with email and password
export const loginWithEmailAndPassword = async ({
  email,
  password
}: LoginData): Promise<AuthUser> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    const user = userCredential.user;
    
    // Update last login time in Firestore
    const userData = await getUserDocument(user.uid);
    if (userData) {
      await createUserDocument(user.uid, {
        ...userData,
        lastLoginAt: new Date().toISOString()
      });
    }
    
    return formatAuthUser(user);
  } catch (error: unknown) {
    console.error('Error signing in:', error);
    throw new Error(getAuthErrorMessage((error as { code: string }).code));
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthUser> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    const userCredential: UserCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user exists in Firestore, if not create document
    const existingUser = await getUserDocument(user.uid);
    if (!existingUser) {
      const userData = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      
      await createUserDocument(user.uid, userData);
    } else {
      // Update last login time
      await createUserDocument(user.uid, {
        ...existingUser,
        lastLoginAt: new Date().toISOString()
      });
    }
    
    return formatAuthUser(user);
  } catch (error: unknown) {
    console.error('Error signing in with Google:', error);
    throw new Error(getAuthErrorMessage((error as { code: string }).code));
  }
};

// Sign out
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: unknown) {
    console.error('Error sending password reset email:', error);
    throw new Error(getAuthErrorMessage((error as { code: string }).code));
  }
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};