
'use client';

<<<<<<< HEAD
import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { useBadges } from './badge-context';
import { useAuth } from './auth-context';
import { defaultUserData, saveUserData } from '@/lib/user-data';
=======
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useBadges } from './badge-context';
import { useAuth } from './auth-context';
import { saveUserData } from '@/lib/user-data';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

type DiaryEntry = {
  messages: string[];
  count: number;
};

type DiaryData = {
  [catId: string]: DiaryEntry;
};

interface DiaryContextType {
  data: DiaryData;
<<<<<<< HEAD
  toggleDiaryEntry: (catId: string, message: string) => boolean;
  isMessageSaved: (catId: string, message: string) => boolean;
=======
  addDiaryEntry: (catId: string, message: string) => void;
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  getDiary: (catId: string) => string[];
  getRevealCount: (catId: string) => number;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
<<<<<<< HEAD
  const { unlockBadge, isBadgeUnlocked } = useBadges();
  const { user, userData, setUserData, storageMode } = useAuth();
  const data = useMemo(() => userData?.diary || {}, [userData]);

  const toggleDiaryEntry = useCallback((catId: string, message: string) => {
    let result: { saved: boolean; diary: DiaryData; unlockBadge: boolean } | null = null;

    setUserData(prevData => {
      const base = prevData ?? defaultUserData;
      const baseDiary: DiaryData = base.diary ?? {};
      const existingEntry = baseDiary[catId] ?? { messages: [], count: 0 };
      const hasMessage = existingEntry.messages.includes(message);

      const updatedMessages = hasMessage
        ? existingEntry.messages.filter(entry => entry !== message)
        : [...existingEntry.messages, message];
      const updatedCount = Math.max(existingEntry.count + (hasMessage ? -1 : 1), 0);

      const newDiary: DiaryData = { ...baseDiary };

      if (updatedMessages.length === 0 && updatedCount === 0) {
        delete newDiary[catId];
      } else {
        newDiary[catId] = {
          messages: updatedMessages,
          count: updatedCount,
        };
      }

      let shouldUnlockBadge = false;
      if (!hasMessage) {
        const totalSavedMessages = Object.values(newDiary).reduce(
          (sum, entry) => sum + entry.messages.length,
          0,
        );

        if (totalSavedMessages >= 5 && !isBadgeUnlocked('message-keeper')) {
          shouldUnlockBadge = true;
        }
      }

      result = { saved: !hasMessage, diary: newDiary, unlockBadge: shouldUnlockBadge };

      return { ...base, diary: newDiary };
    });

    if (result?.unlockBadge) {
      unlockBadge('message-keeper');
    }

    if (storageMode === 'cloud' && user && user !== 'guest' && result) {
      void saveUserData(user.uid, { diary: result.diary });
    }

    return result?.saved ?? false;
  }, [isBadgeUnlocked, unlockBadge, setUserData, storageMode, user]);

  const isMessageSaved = useCallback((catId: string, message: string) => {
    return data[catId]?.messages.includes(message) ?? false;
  }, [data]);
=======
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
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

  const getDiary = useCallback((catId: string) => {
    return data[catId]?.messages || [];
  }, [data]);

  const getRevealCount = useCallback((catId: string) => {
    return data[catId]?.count || 0;
  }, [data]);

  return (
<<<<<<< HEAD
    <DiaryContext.Provider value={{ data, toggleDiaryEntry, isMessageSaved, getDiary, getRevealCount }}>
=======
    <DiaryContext.Provider value={{ data, addDiaryEntry, getDiary, getRevealCount }}>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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
