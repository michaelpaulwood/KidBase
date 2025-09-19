import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  DocumentData,
  QueryConstraint,
  Timestamp,
  deleteField
} from 'firebase/firestore';
import { db } from './firebase';
import type { Family } from '../types/user';

// Use the Family interface from types/user.ts
export type FamilyData = Family;

// Collections
export const COLLECTIONS = {
  FAMILIES: 'families',
  USER_SESSIONS: 'userSessions'
} as const;

// ===== FAMILY FUNCTIONS =====

// Create or update family document
export const createFamilyDocument = async (
  familyId: string,
  familyData: Partial<FamilyData>
): Promise<void> => {
  try {
    const familyRef = doc(db, COLLECTIONS.FAMILIES, familyId);
    await setDoc(familyRef, familyData, { merge: true });
  } catch (error) {
    console.error('Error creating/updating family document:', error);
    throw new Error('Failed to save family data. Please try again.');
  }
};

// Get family document
export const getFamilyDocument = async (familyId: string): Promise<FamilyData | null> => {
  try {
    const familyRef = doc(db, COLLECTIONS.FAMILIES, familyId);
    const familySnap = await getDoc(familyRef);

    if (familySnap.exists()) {
      return familySnap.data() as FamilyData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting family document:', error);
    throw new Error('Failed to load family data. Please try again.');
  }
};

// Update family document
export const updateFamilyDocument = async (
  familyId: string,
  updates: Partial<FamilyData>
): Promise<void> => {
  try {
    const familyRef = doc(db, COLLECTIONS.FAMILIES, familyId);
    await updateDoc(familyRef, updates);
  } catch (error) {
    console.error('Error updating family document:', error);
    throw new Error('Failed to update family data. Please try again.');
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


// Utility function to convert Firestore Timestamp to ISO string
export const timestampToString = (timestamp: Timestamp): string => {
  return timestamp.toDate().toISOString();
};

// Utility function to convert ISO string to Firestore Timestamp
export const stringToTimestamp = (dateString: string): Timestamp => {
  return Timestamp.fromDate(new Date(dateString));
};

// Update family onboarding step
export const updateOnboardingStep = async (familyId: string, step: number): Promise<void> => {
  try {
    const familyRef = doc(db, COLLECTIONS.FAMILIES, familyId);
    await updateDoc(familyRef, {
      onboardingStep: step,
      lastLoginAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating onboarding step:', error);
    throw new Error('Failed to update onboarding step. Please try again.');
  }
};

// Complete family onboarding
export const completeFamilyOnboarding = async (familyId: string): Promise<void> => {
  try {
    const familyRef = doc(db, COLLECTIONS.FAMILIES, familyId);
    await updateDoc(familyRef, {
      onboardingComplete: true,
      onboardingStep: deleteField(), // Clean up step tracking once complete
      lastLoginAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error completing family onboarding:', error);
    throw new Error('Failed to complete onboarding. Please try again.');
  }
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