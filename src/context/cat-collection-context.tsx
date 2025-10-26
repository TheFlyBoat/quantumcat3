
'use client';

<<<<<<< HEAD
import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { useBadges } from './badge-context';
import catData from '@/lib/cat-data.json';
import { useAuth } from './auth-context';
import { defaultUserData, saveUserData } from '@/lib/user-data';
=======
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useBadges } from './badge-context';
import catData from '@/lib/cat-data.json';
import { useAuth } from './auth-context';
import { saveUserData, UserData } from '@/lib/user-data';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

interface CatCollectionContextType {
  unlockedCats: string[];
  unlockCat: (catId: string, options?: { celebrateImmediately?: boolean }) => void;
  isUnlocked: (catId: string) => boolean;
}

const allCats = catData.cats as {id: string, name: string, description: string, type: string}[];

const CatCollectionContext = createContext<CatCollectionContextType | undefined>(undefined);

export const CatCollectionProvider = ({ children }: { children: ReactNode }) => {
<<<<<<< HEAD
  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData, storageMode } = useAuth();
  const unlockedCats = useMemo(() => userData?.unlockedCats || [], [userData]);
=======
  const [unlockedCats, setUnlockedCats] = useState<string[]>([]);
  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData } = useAuth();

  useEffect(() => {
    if (user === 'guest') {
      setUnlockedCats([]);
    } else if (userData) {
      setUnlockedCats(userData.unlockedCats || []);
    }
  }, [userData, user]);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

  const unlockCat = useCallback((catId: string, options?: { celebrateImmediately?: boolean }) => {
    const celebrateOptions = { celebrateImmediately: options?.celebrateImmediately ?? true };
    
    if (unlockedCats.includes(catId)) return;

    const newUnlockedCats = [...unlockedCats, catId];
<<<<<<< HEAD
=======
    setUnlockedCats(newUnlockedCats);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    const newlyUnlockedCat = allCats.find(c => c.id === catId);
    if (!newlyUnlockedCat) return;

<<<<<<< HEAD
    const countCatsOfType = (type: string) =>
        newUnlockedCats.filter(id => {
            const cat = allCats.find(c => c.id === id);
            return cat?.type === type;
        }).length;

    if (newlyUnlockedCat.type === 'Alive') {
        const aliveCount = countCatsOfType('Alive');
        if (aliveCount >= 3 && !isBadgeUnlocked('alive-kicking')) {
            unlockBadge('alive-kicking', celebrateOptions);
        }
    }

    if (newlyUnlockedCat.type === 'Dead') {
        const deadCount = countCatsOfType('Dead');
        if (deadCount >= 3 && !isBadgeUnlocked('rest-in-pieces')) {
            unlockBadge('rest-in-pieces', celebrateOptions);
        }
    }

    if (newlyUnlockedCat.type === 'Paradox') {
        const paradoxCount = countCatsOfType('Paradox');
        if (paradoxCount >= 3 && !isBadgeUnlocked('paradox-seeker')) {
            unlockBadge('paradox-seeker', celebrateOptions);
        }
=======
    const previouslyUnlockedTypes = new Set(unlockedCats.map(id => allCats.find(c => c.id === id)?.type));

    if (newlyUnlockedCat.type === 'Alive' && !previouslyUnlockedTypes.has('Alive')) {
        if (!isBadgeUnlocked('alive-kicking')) unlockBadge('alive-kicking', celebrateOptions);
    }
    if (newlyUnlockedCat.type === 'Dead' && !previouslyUnlockedTypes.has('Dead')) {
        if (!isBadgeUnlocked('rest-in-pieces')) unlockBadge('rest-in-pieces', celebrateOptions);
    }
    if (newlyUnlockedCat.type === 'Paradox' && !previouslyUnlockedTypes.has('Paradox')) {
        if (!isBadgeUnlocked('paradox-seeker')) unlockBadge('paradox-seeker', celebrateOptions);
    }

    if (newUnlockedCats.length === 10 && !isBadgeUnlocked('the-collector')) {
        unlockBadge('the-collector', celebrateOptions);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    }

    const checkSetCompletion = (type: string) => {
        const allCatsOfType = allCats.filter(c => c.type === type);
        const unlockedCatsOfType = newUnlockedCats.map(id => allCats.find(c => c.id === id)).filter(c => c && c.type === type);
        return allCatsOfType.length > 0 && allCatsOfType.length === unlockedCatsOfType.length;
    }

    if (!isBadgeUnlocked('the-archivist')) {
        if (checkSetCompletion('Alive') || checkSetCompletion('Dead') || checkSetCompletion('Paradox')) {
            unlockBadge('the-archivist', celebrateOptions);
        }
    }
    
<<<<<<< HEAD
    setUserData(prevData => {
      const base = prevData ?? defaultUserData;
      return { ...base, unlockedCats: newUnlockedCats };
    });

    if (storageMode === 'cloud' && user && user !== 'guest') {
      void saveUserData(user.uid, { unlockedCats: newUnlockedCats });
    }

  }, [unlockedCats, unlockBadge, isBadgeUnlocked, user, setUserData, storageMode]);
=======
    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, unlockedCats: newUnlockedCats };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }

  }, [unlockedCats, unlockBadge, isBadgeUnlocked, user, setUserData]);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

  const isUnlocked = (catId: string) => {
    return unlockedCats.includes(catId);
  };

  return (
    <CatCollectionContext.Provider value={{ unlockedCats, unlockCat, isUnlocked }}>
      {children}
    </CatCollectionContext.Provider>
  );
};

export const useCatCollection = () => {
  const context = useContext(CatCollectionContext);
  if (context === undefined) {
    throw new Error('useCatCollection must be used within a CatCollectionProvider');
  }
  return context;
};
