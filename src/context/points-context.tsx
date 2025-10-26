
'use client';

<<<<<<< HEAD
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useAuth } from './auth-context';
import { defaultUserData, saveUserData } from '@/lib/user-data';
=======
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useBadges } from './badge-context';
import { useAuth } from './auth-context';
import { saveUserData, UserData } from '@/lib/user-data';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

interface PointsContextType {
  points: number;
  addPoints: (amount: number, options?: { celebrateImmediately?: boolean }) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider = ({ children }: { children: ReactNode }) => {
<<<<<<< HEAD
  const { user, userData, setUserData, storageMode } = useAuth();
  const points = userData?.points ?? 0;

  const addPoints = useCallback((amount: number, _options?: { celebrateImmediately?: boolean }) => {
    const newPoints = points + amount;
    setUserData(prevData => {
      const base = prevData ?? defaultUserData;
      return { ...base, points: newPoints };
    });

    if (storageMode === 'cloud' && user && user !== 'guest') {
      void saveUserData(user.uid, { points: newPoints });
    }
  }, [points, setUserData, storageMode, user]);
=======
  const [points, setPoints] = useState(0);
  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData } = useAuth();

  useEffect(() => {
    if (user === 'guest') {
      setPoints(0);
    } else if (userData) {
      setPoints(userData.points || 0);
    }
  }, [userData, user]);

  const addPoints = useCallback((amount: number, options?: { celebrateImmediately?: boolean }) => {
    const celebrateOptions = { celebrateImmediately: options?.celebrateImmediately ?? true };
    const newPoints = points + amount;
    setPoints(newPoints);
      
    if (!isBadgeUnlocked('100-fish-points') && newPoints >= 100) {
      unlockBadge('100-fish-points', celebrateOptions);
    }

    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, points: newPoints };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }
  }, [points, isBadgeUnlocked, unlockBadge, user, setUserData]);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

  return (
    <PointsContext.Provider value={{ points, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
