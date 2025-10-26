
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useBadges } from './badge-context';
import { useAuth } from './auth-context';
import { saveUserData } from '@/lib/user-data';

type DiaryEntry = {
  messages: string[];
  count: number;
};

type DiaryData = {
  [catId: string]: DiaryEntry;
};

interface DiaryContextType {
  data: DiaryData;
  addDiaryEntry: (catId: string, message: string) => void;
  getDiary: (catId: string) => string[];
  getRevealCount: (catId: string) => number;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DiaryData>({});
  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData } = useAuth();

  useEffect(() => {
    if (user === 'guest') {
      setData({});
    } else if (userData) {
      setData(userData.diary || {});
    }
  }, [userData, user]);

  const addDiaryEntry = useCallback((catId: string, message: string) => {
    const newData = { ...data };
    const existingEntry = newData[catId] || { messages: [], count: 0 };
    
    const newMessages = existingEntry.messages.includes(message)
      ? existingEntry.messages
      : [...existingEntry.messages, message];
      
    newData[catId] = {
      messages: newMessages,
      count: existingEntry.count + 1,
    };
    
    setData(newData);

    const totalSavedMessages = Object.values(newData).reduce((sum, entry) => sum + entry.messages.length, 0);

    if (totalSavedMessages >= 10 && !isBadgeUnlocked('10-messages-saved')) {
      unlockBadge('10-messages-saved');
    }

    if (totalSavedMessages >= 50 && !isBadgeUnlocked('50-messages-saved')) {
      unlockBadge('50-messages-saved');
    }

    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, diary: newData };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }
  }, [data, isBadgeUnlocked, unlockBadge, user, setUserData]);

  const getDiary = useCallback((catId: string) => {
    return data[catId]?.messages || [];
  }, [data]);

  const getRevealCount = useCallback((catId: string) => {
    return data[catId]?.count || 0;
  }, [data]);

  return (
    <DiaryContext.Provider value={{ data, addDiaryEntry, getDiary, getRevealCount }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};
