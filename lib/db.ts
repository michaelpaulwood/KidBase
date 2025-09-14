import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
  QueryConstraint,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { User, UserPreferences, UserProfile } from '../types/user';

// Use the User interface from types/user.ts
export type UserData = User;

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  USER_SESSIONS: 'userSessions'
} as const;

// Create or update user document
export const createUserDocument = async (
  userId: string,
  userData: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error creating/updating user document:', error);
    throw new Error('Failed to save user data. Please try again.');
  }
};

// Get user document
export const getUserDocument = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user document:', error);
    throw new Error('Failed to load user data. Please try again.');
  }
};

// Update user document
export const updateUserDocument = async (
  userId: string,
  updates: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error('Error updating user document:', error);
    throw new Error('Failed to update user data. Please try again.');
  }
};

// Delete user document
export const deleteUserDocument = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting user document:', error);
    throw new Error('Failed to delete user data. Please try again.');
  }
};

// Update user preferences
export const updateUserPreferences = async (
  userId: string,
  preferences: UserPreferences
): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(userRef, { preferences });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw new Error('Failed to update preferences. Please try again.');
  }
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  profile: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(userRef, { profile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update profile. Please try again.');
  }
};

// Generic query function for collections
export const queryCollection = async (
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<DocumentData[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error querying collection:', error);
    throw new Error('Failed to load data. Please try again.');
  }
};

// Get users with pagination
export const getUsers = async (
  limitCount: number = 10,
  orderByField: string = 'createdAt'
): Promise<UserData[]> => {
  try {
    const constraints = [
      orderBy(orderByField, 'desc'),
      limit(limitCount)
    ];
    
    const users = await queryCollection(COLLECTIONS.USERS, constraints);
    return users as UserData[];
  } catch (error) {
    console.error('Error getting users:', error);
    throw new Error('Failed to load users. Please try again.');
  }
};

// Search users by email or display name
export const searchUsers = async (searchTerm: string): Promise<UserData[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple implementation that searches by email prefix
    const constraints = [
      where('email', '>=', searchTerm.toLowerCase()),
      where('email', '<=', searchTerm.toLowerCase() + '\uf8ff'),
      limit(10)
    ];
    
    const users = await queryCollection(COLLECTIONS.USERS, constraints);
    return users as UserData[];
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users. Please try again.');
  }
};

// Utility function to convert Firestore Timestamp to ISO string
export const timestampToString = (timestamp: Timestamp): string => {
  return timestamp.toDate().toISOString();
};

// Utility function to convert ISO string to Firestore Timestamp
export const stringToTimestamp = (dateString: string): Timestamp => {
  return Timestamp.fromDate(new Date(dateString));
};

// Batch operations helper
export const batchWrite = async (operations: Array<() => Promise<void>>): Promise<void> => {
  try {
    await Promise.all(operations.map(op => op()));
  } catch (error) {
    console.error('Error in batch write:', error);
    throw new Error('Failed to complete batch operation. Please try again.');
  }
};