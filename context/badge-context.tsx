
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { playSound } from '@/lib/audio';
import { useAuth } from './auth-context';
import { saveUserData, UserData } from '@/lib/user-data';

type UnlockOptions = {
    celebrateImmediately?: boolean;
}

interface BadgeContextType {
  unlockedBadges: string[];
  unlockBadge: (badgeId: string, options?: UnlockOptions) => void;
  isBadgeUnlocked: (badgeId: string) => boolean;
  lastUnlockedBadgeId: string | null;
  triggerCelebration: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

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

    if (options.celebrateImmediately) {
        // We use a micro-task timeout to ensure the state update has propagated
        // before we trigger the sound and visual effect.
        setTimeout(triggerCelebration, 0);
    }
    
    // Persist for logged-in users
    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, unlockedBadges: newBadges };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }
  }, [unlockedBadges, user, setUserData, triggerCelebration]);


  const isBadgeUnlocked = useCallback((badgeId: string) => {
    return unlockedBadges.includes(badgeId);
  }, [unlockedBadges]);

  return (
    <BadgeContext.Provider value={{ unlockedBadges, unlockBadge, isBadgeUnlocked, lastUnlockedBadgeId, triggerCelebration }}>
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
