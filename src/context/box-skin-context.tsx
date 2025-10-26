
'use client';

<<<<<<< HEAD
import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { useAuth } from './auth-context';
import { defaultUserData, saveUserData } from '@/lib/user-data';
=======
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';
import { saveUserData } from '@/lib/user-data';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

type BoxSkin = 'default' | 'shiny' | 'cardboard';

interface BoxSkinContextType {
  selectedSkin: BoxSkin;
  selectSkin: (skin: BoxSkin) => void;
  unlockedSkins: BoxSkin[];
  unlockSkin: (skin: BoxSkin) => void;
}

const BoxSkinContext = createContext<BoxSkinContextType | undefined>(undefined);

const defaultSkins: BoxSkin[] = ['default', 'shiny'];
<<<<<<< HEAD
const allSkins: BoxSkin[] = ['default', 'shiny', 'cardboard'];

const isBoxSkin = (skin: string | undefined): skin is BoxSkin =>
  typeof skin === 'string' && (allSkins as string[]).includes(skin);

const normalizeSkins = (skins?: string[]): BoxSkin[] => {
  const merged = new Set<BoxSkin>(defaultSkins);
  (skins ?? []).forEach(skin => {
    if (isBoxSkin(skin)) {
      merged.add(skin);
    }
  });
  return Array.from(merged);
};

export const BoxSkinProvider = ({ children }: { children: ReactNode }) => {
  const { user, userData, setUserData, storageMode } = useAuth();

  const unlockedSkins = useMemo(
    () => normalizeSkins(userData?.unlockedSkins),
    [userData],
  );

  const selectedSkin = useMemo(() => {
    const storedSkin = isBoxSkin(userData?.selectedSkin) ? userData?.selectedSkin : 'default';
    return unlockedSkins.includes(storedSkin) ? storedSkin : 'default';
  }, [userData, unlockedSkins]);

  const selectSkin = useCallback((skin: BoxSkin) => {
    setUserData(prevData => {
      const base = prevData ?? defaultUserData;
      return { ...base, selectedSkin: skin };
    });
    if (storageMode === 'cloud' && user && user !== 'guest') {
      void saveUserData(user.uid, { selectedSkin: skin });
    }
  }, [user, setUserData, storageMode]);
=======

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
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

  const unlockSkin = useCallback((skin: BoxSkin) => {
    if (unlockedSkins.includes(skin)) return;

<<<<<<< HEAD
    const newSkins = Array.from(new Set([...unlockedSkins, skin]));

    setUserData(prevData => {
      const base = prevData ?? defaultUserData;
      return { ...base, unlockedSkins: newSkins };
    });

    if (storageMode === 'cloud' && user && user !== 'guest') {
      void saveUserData(user.uid, { unlockedSkins: newSkins });
    }
  }, [unlockedSkins, user, setUserData, storageMode]);
=======
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
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

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
