
'use client';

<<<<<<< HEAD
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
=======
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { differenceInCalendarDays, startOfToday } from 'date-fns';
import { useBadges } from './badge-context';
import { CatOutcome } from '@/lib/types';
import { useAuth } from './auth-context';
<<<<<<< HEAD
import { defaultUserData, saveUserData } from '@/lib/user-data';
=======
import { saveUserData, UserData } from '@/lib/user-data';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

interface Observation {
    id: string;
    type: CatOutcome;
}

interface AchievementsContextType {
  streak: number;
  totalObservations: number;
  recordObservation: (catId: string, catType: CatOutcome) => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
<<<<<<< HEAD
  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData, storageMode } = useAuth();

  const streak = userData?.streak ?? 0;
  const totalObservations = userData?.totalObservations ?? 0;

  const recordObservation = useCallback((catId: string, catType: CatOutcome) => {
    const today = startOfToday();

    const base = userData ?? defaultUserData;
    const newTotal = (base.totalObservations ?? 0) + 1;
    const lastDate = base.lastObservationDate ? new Date(base.lastObservationDate) : null;
    let newStreak = base.streak ?? 0;
    const existingHistory = base.revealHistory ?? [];

    if (!lastDate || differenceInCalendarDays(today, lastDate) > 0) {
        if (lastDate && differenceInCalendarDays(today, lastDate) === 1) {
            newStreak = (base.streak ?? 0) + 1;
=======
  const [streak, setStreak] = useState(0);
  const [totalObservations, setTotalObservations] = useState(0);
  const [revealHistory, setRevealHistory] = useState<Observation[]>([]);

  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData } = useAuth();


  useEffect(() => {
    if (user === 'guest') {
      // Reset for guests
      setStreak(0);
      setTotalObservations(0);
      setRevealHistory([]);
    } else if (userData) {
      const today = startOfToday();
      const lastDate = userData.lastObservationDate ? new Date(userData.lastObservationDate) : null;
      let currentStreak = userData.streak || 0;

      if (lastDate && differenceInCalendarDays(today, lastDate) > 1) {
        currentStreak = 0;
      }
      
      setStreak(currentStreak);
      setTotalObservations(userData.totalObservations || 0);
      setRevealHistory(userData.revealHistory || []);
    }
  }, [userData, user]);

  const recordObservation = (catId: string, catType: CatOutcome) => {
    const now = new Date();
    const today = startOfToday();

    const newTotal = totalObservations + 1;
    const lastDate = (user !== 'guest' && userData?.lastObservationDate) ? new Date(userData.lastObservationDate) : null;
    let newStreak = streak;

    if (!lastDate || differenceInCalendarDays(today, lastDate) > 0) {
        if (lastDate && differenceInCalendarDays(today, lastDate) === 1) {
            newStreak = streak + 1;
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        } else {
            newStreak = 1;
        }
    }
<<<<<<< HEAD
=======
    
    setTotalObservations(newTotal);
    setStreak(newStreak);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    const celebrateOptions = { celebrateImmediately: false };

    // Badge Checks for Total Observations
    if (newTotal === 1 && !isBadgeUnlocked('first-peek')) unlockBadge('first-peek', celebrateOptions);
<<<<<<< HEAD

    // Badge Checks for Streaks
    if (newStreak === 3 && !isBadgeUnlocked('curious-kitten')) unlockBadge('curious-kitten', celebrateOptions);
    
    // Surprise Badge Checks
    const newHistory: Observation[] = [{ id: catId, type: catType }, ...existingHistory].slice(0, 3);

    if (newHistory.length === 3 && newHistory.every(obs => obs.id === newHistory[0].id)) {
        if (!isBadgeUnlocked('quantum-echo')) unlockBadge('quantum-echo', celebrateOptions);
    }

    // Persist data for logged-in users
    const updates = {
        totalObservations: newTotal,
        streak: newStreak,
        lastObservationDate: today.toISOString(),
        revealHistory: newHistory,
    } as const;

    setUserData(prevData => {
        const base = prevData ?? defaultUserData;
        return { ...base, ...updates };
    });

    if (storageMode === 'cloud' && user && user !== 'guest') {
        void saveUserData(user.uid, updates);
    }
  }, [isBadgeUnlocked, unlockBadge, setUserData, storageMode, user, userData]);
=======
    if (newTotal === 100 && !isBadgeUnlocked('100-opens')) unlockBadge('100-opens', celebrateOptions);
    if (newTotal === 365 && !isBadgeUnlocked('365-opens')) unlockBadge('365-opens', celebrateOptions);

    // Badge Checks for Streaks
    if (newStreak === 7 && !isBadgeUnlocked('7-day-streak')) unlockBadge('7-day-streak', celebrateOptions);
    if (newStreak === 30 && !isBadgeUnlocked('30-day-streak')) unlockBadge('30-day-streak', celebrateOptions);
    
    // Surprise Badge Checks
    const newHistory: Observation[] = [{ id: catId, type: catType }, ...revealHistory].slice(0, 3);
    setRevealHistory(newHistory);

    if (newHistory.length >= 2 && newHistory[0].id === newHistory[1].id) {
        if (!isBadgeUnlocked('double-collapse')) unlockBadge('double-collapse', celebrateOptions);
        if (newHistory.length >= 3 && newHistory[0].id === newHistory[2].id) {
             if (!isBadgeUnlocked('quantum-echo')) unlockBadge('quantum-echo', celebrateOptions);
        }
    }

    if (newHistory.length >= 3 && newHistory.every(obs => obs.type === 'paradox')) {
        if (!isBadgeUnlocked('improbable-streak')) unlockBadge('improbable-streak', celebrateOptions);
    }
    
    if (now.getHours() === 0 && now.getMinutes() === 0 && !isBadgeUnlocked('cosmic-alignment')) {
         unlockBadge('cosmic-alignment', celebrateOptions);
    }

    if (now.getMonth() === 9 && now.getDate() === 31 && catType === 'dead' && !isBadgeUnlocked('undead-luck')) {
        unlockBadge('undead-luck', celebrateOptions);
    }

    // Persist data for logged-in users
    if (user && user !== 'guest' && setUserData) {
        setUserData(prevData => {
            const updatedData = {
                ...prevData,
                totalObservations: newTotal,
                streak: newStreak,
                lastObservationDate: today.toISOString(),
                revealHistory: newHistory,
            };
            saveUserData(user.uid, updatedData as UserData);
            return updatedData as UserData;
        });
    }
  };
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

  return (
    <AchievementsContext.Provider value={{ streak, totalObservations, recordObservation }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }
  return context;
};
