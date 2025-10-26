
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';
import { saveUserData } from '@/lib/user-data';

type BoxSkin = 'default' | 'shiny' | 'cardboard';

interface BoxSkinContextType {
  selectedSkin: BoxSkin;
  selectSkin: (skin: BoxSkin) => void;
  unlockedSkins: BoxSkin[];
  unlockSkin: (skin: BoxSkin) => void;
}

const BoxSkinContext = createContext<BoxSkinContextType | undefined>(undefined);

const defaultSkins: BoxSkin[] = ['default', 'shiny'];

export const BoxSkinProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSkin, setSelectedSkin] = useState<BoxSkin>('default');
  const [unlockedSkins, setUnlockedSkins] = useState<BoxSkin[]>(defaultSkins);
  const { user, userData, setUserData } = useAuth();

  useEffect(() => {
    if (user === 'guest') {
      setSelectedSkin('default');
      setUnlockedSkins(defaultSkins);
    } else if (userData) {
      setSelectedSkin(userData.selectedSkin || 'default');
      setUnlockedSkins(userData.unlockedSkins || defaultSkins);
    }
  }, [userData, user]);

  const selectSkin = useCallback((skin: BoxSkin) => {
    setSelectedSkin(skin);
    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, selectedSkin: skin };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }
  }, [user, setUserData]);

  const unlockSkin = useCallback((skin: BoxSkin) => {
    if (unlockedSkins.includes(skin)) return;

    const newSkins = [...unlockedSkins, skin];
    setUnlockedSkins(newSkins);

    if (user && user !== 'guest' && setUserData) {
      setUserData(prevData => {
        const updatedData = { ...prevData, unlockedSkins: newSkins };
        saveUserData(user.uid, updatedData as UserData);
        return updatedData as UserData;
      });
    }
  }, [unlockedSkins, user, setUserData]);

  return (
    <BoxSkinContext.Provider value={{ selectedSkin, selectSkin, unlockedSkins, unlockSkin }}>
      {children}
    </BoxSkinContext.Provider>
  );
};

export const useBoxSkin = () => {
  const context = useContext(BoxSkinContext);
  if (context === undefined) {
    throw new Error('useBoxSkin must be used within a BoxSkinProvider');
  }
  return context;
};
