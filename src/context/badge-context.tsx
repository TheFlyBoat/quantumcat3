
'use client';

<<<<<<< HEAD
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { playSound } from '@/lib/audio';
import { useAuth } from './auth-context';
import { defaultUserData, saveUserData } from '@/lib/user-data';
import badgeData from '@/lib/badge-data.json';
=======
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { playSound } from '@/lib/audio';
import { useAuth } from './auth-context';
import { saveUserData, UserData } from '@/lib/user-data';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

type UnlockOptions = {
    celebrateImmediately?: boolean;
}

interface BadgeContextType {
  unlockedBadges: string[];
  unlockBadge: (badgeId: string, options?: UnlockOptions) => void;
  isBadgeUnlocked: (badgeId: string) => boolean;
  lastUnlockedBadgeId: string | null;
<<<<<<< HEAD
  celebrationBadgeId: string | null;
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  triggerCelebration: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

<<<<<<< HEAD
const validBadgeIds = new Set((badgeData.badges ?? []).map(badge => badge.id));

const badgeMigrationMap: Record<string, string | null> = {
  '7-day-streak': 'curious-kitten',
  '30-day-streak': 'curious-kitten',
  '100-opens': null,
  '365-opens': null,
  '10-messages-saved': 'message-keeper',
  '50-messages-saved': 'message-keeper',
  'first-share': 'storyteller',
  '10-shares': 'viral-cat',
  'skin-changer': null,
  'double-collapse': null,
  'improbable-streak': null,
  'cosmic-alignment': null,
  'undead-luck': null,
  '100-fish-points': null,
  'the-collector': null,
};

const migrateBadgeIds = (badges: string[] = []): string[] => {
  const migrated = badges.map(id => {
    if (Object.prototype.hasOwnProperty.call(badgeMigrationMap, id)) {
      return badgeMigrationMap[id] ?? null;
    }
    return id;
  }).filter((id): id is string => !!id && validBadgeIds.has(id));

  return Array.from(new Set(migrated));
};

const haveSameMembers = (original: string[], migrated: string[]) => {
  if (original.length !== migrated.length) return false;
  const sortedOriginal = [...original].sort();
  const sortedMigrated = [...migrated].sort();
  return sortedOriginal.every((value, index) => value === sortedMigrated[index]);
};

export const BadgeProvider = ({ children }: { children: ReactNode }) => {
  const [lastUnlockedBadgeId, setLastUnlockedBadgeId] = useState<string | null>(null);
  const [celebrationBadgeId, setCelebrationBadgeId] = useState<string | null>(null);
  
  const { user, userData, setUserData, storageMode } = useAuth();

  const storedBadges = useMemo(() => userData?.unlockedBadges || [], [userData?.unlockedBadges]);
  const unlockedBadges = useMemo(() => migrateBadgeIds(storedBadges), [storedBadges]);
  const needsMigration = useMemo(() => !haveSameMembers(storedBadges, unlockedBadges), [storedBadges, unlockedBadges]);

  useEffect(() => {
    if (!needsMigration) return;

    const migrate = () => {
      setUserData(prevData => {
        const base = prevData ?? defaultUserData;
        return { ...base, unlockedBadges };
      });
      if (storageMode === 'cloud' && user && user !== 'guest') {
        void saveUserData(user.uid, { unlockedBadges });
      }
    };

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(migrate);
    } else {
      setTimeout(migrate, 0);
    }
  }, [needsMigration, unlockedBadges, setUserData, storageMode, user]);

  const triggerCelebration = useCallback(() => {
    if (!lastUnlockedBadgeId) return;

    setCelebrationBadgeId(lastUnlockedBadgeId);
    playSound('badge-unlocked');

    // Allow the UI to animate before clearing the active badge.
    setTimeout(() => {
      setCelebrationBadgeId(null);
      setLastUnlockedBadgeId(null);
    }, 4000);
  }, [lastUnlockedBadgeId]);

  const unlockBadge = useCallback((badgeId: string, options: UnlockOptions = { celebrateImmediately: true }) => {
    const resolvedBadgeId = Object.prototype.hasOwnProperty.call(badgeMigrationMap, badgeId)
      ? badgeMigrationMap[badgeId]
      : badgeId;

    if (!resolvedBadgeId || !validBadgeIds.has(resolvedBadgeId)) return;
    if (unlockedBadges.includes(resolvedBadgeId)) return;

    const newBadges = [...unlockedBadges, resolvedBadgeId];
    setLastUnlockedBadgeId(resolvedBadgeId); // Set the pending badge ID
=======
export const BadgeProvider = ({ children }: { children: ReactNode }) => {
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [lastUnlockedBadgeId, setLastUnlockedBadgeId] = useState<string | null>(null);
  
  const { user, userData, setUserData } = useAuth();

  useEffect(() => {
    if (user === 'guest') {
      setUnlockedBadges([]);
    } else if (userData) {
      setUnlockedBadges(userData.unlockedBadges || []);
    }
  }, [userData, user]);

  const triggerCelebration = useCallback(() => {
    if (lastUnlockedBadgeId) {
      playSound('badge-unlocked');
      // The CelebrationCard in layout will see the ID and show itself.
      // We reset it here so it can be re-triggered for the next badge.
      setTimeout(() => setLastUnlockedBadgeId(null), 4000); 
    }
  }, [lastUnlockedBadgeId]);

  const unlockBadge = useCallback((badgeId: string, options: UnlockOptions = { celebrateImmediately: true }) => {
    if (unlockedBadges.includes(badgeId)) return;

    const newBadges = [...unlockedBadges, badgeId];
    setUnlockedBadges(newBadges);
    setLastUnlockedBadgeId(badgeId); // Set the pending badge ID
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    if (options.celebrateImmediately) {
        // We use a micro-task timeout to ensure the state update has propagated
        // before we trigger the sound and visual effect.
        setTimeout(triggerCelebration, 0);
    }
    
    // Persist for logged-in users
<<<<<<< HEAD
    setUserData(prevData => {
      const base = prevData ?? defaultUserData;
      return { ...base, unlockedBadges: newBadges };
    });

    if (storageMode === 'cloud' && user && user !== 'guest') {
      void saveUserData(user.uid, { unlockedBadges: newBadges });
    }
  }, [unlockedBadges, user, setUserData, triggerCelebration, storageMode]);
=======
    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, unlockedBadges: newBadges };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }
  }, [unlockedBadges, user, setUserData, triggerCelebration]);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68


  const isBadgeUnlocked = useCallback((badgeId: string) => {
    return unlockedBadges.includes(badgeId);
  }, [unlockedBadges]);

  return (
<<<<<<< HEAD
    <BadgeContext.Provider value={{ unlockedBadges, unlockBadge, isBadgeUnlocked, lastUnlockedBadgeId, celebrationBadgeId, triggerCelebration }}>
=======
    <BadgeContext.Provider value={{ unlockedBadges, unlockBadge, isBadgeUnlocked, lastUnlockedBadgeId, triggerCelebration }}>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadges = () => {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useBadges must be used within a BadgeProvider');
  }
  return context;
};
