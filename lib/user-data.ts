
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
}

const defaultUserData: UserData = {
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
};

export async function saveUserData(userId: string, data: UserData): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, data, { merge: true });
  } catch (error) {
    console.error('Error saving user data:', error);
  }
}

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
