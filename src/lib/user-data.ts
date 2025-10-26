
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
<<<<<<< HEAD
import type { CatOutcome } from '@/lib/types';

export interface RevealHistoryEntry {
  id: string;
  type: CatOutcome;
}
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

export interface UserData {
  nickname?: string;
  lastObservationDate?: string;
  streak?: number;
  totalObservations?: number;
  unlockedBadges?: string[];
  unlockedSkins?: string[];
  selectedSkin?: 'default' | 'shiny' | 'cardboard';
  unlockedCats?: string[];
  diary?: { [catId: string]: { messages: string[]; count: number } };
  points?: number;
<<<<<<< HEAD
  revealHistory?: RevealHistoryEntry[];
  shareCount?: number;
}

export const defaultUserData: UserData = {
=======
}

const defaultUserData: UserData = {
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  nickname: undefined,
  lastObservationDate: undefined,
  streak: 0,
  totalObservations: 0,
  unlockedBadges: [],
  unlockedSkins: ['default', 'shiny'],
  selectedSkin: 'default',
  unlockedCats: [],
  diary: {},
  points: 0,
<<<<<<< HEAD
  revealHistory: [],
  shareCount: 0,
};

export async function saveUserData(userId: string, data: Partial<UserData>): Promise<void> {
=======
};

export async function saveUserData(userId: string, data: UserData): Promise<void> {
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, data, { merge: true });
  } catch (error) {
    console.error('Error saving user data:', error);
  }
}

<<<<<<< HEAD
export async function resetUserData(userId: string): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, defaultUserData);
  } catch (error) {
    console.error('Error resetting user data:', error);
  }
}

=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
export async function loadUserData(userId: string): Promise<UserData> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // Merge fetched data with defaults to ensure all keys are present
      return { ...defaultUserData, ...docSnap.data() };
    } else {
      // No document for this user, create one with default data
      await saveUserData(userId, defaultUserData);
      return defaultUserData;
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return defaultUserData; // Return default data on error
  }
}
