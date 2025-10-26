
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useBadges } from './badge-context';
import { useAuth } from './auth-context';
import { saveUserData, UserData } from '@/lib/user-data';

interface PointsContextType {
  points: number;
  addPoints: (amount: number, options?: { celebrateImmediately?: boolean }) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider = ({ children }: { children: ReactNode }) => {
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
