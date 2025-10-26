
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  reduceMotion: boolean;
  setReduceMotion: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [volume, setVolumeState] = useState(1);
  const [reduceMotion, setReduceMotionState] = useState(false);

  useEffect(() => {
    try {
      const storedSound = localStorage.getItem('quantum-cat-sound-enabled');
      if (storedSound !== null) {
        setSoundEnabledState(JSON.parse(storedSound));
      }
      const storedVolume = localStorage.getItem('quantum-cat-volume');
      if (storedVolume !== null) {
        setVolumeState(parseFloat(storedVolume));
      }
       const storedReduceMotion = localStorage.getItem('quantum-cat-reduce-motion');
      if (storedReduceMotion !== null) {
        setReduceMotionState(JSON.parse(storedReduceMotion));
        if (JSON.parse(storedReduceMotion)) {
            document.documentElement.classList.add('reduce-motion');
        }
      }
    } catch (e) {
      console.error('Could not access localStorage for sound settings', e);
    }
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    try {
      setSoundEnabledState(enabled);
      localStorage.setItem('quantum-cat-sound-enabled', JSON.stringify(enabled));
      window.dispatchEvent(new CustomEvent('sound-setting-changed'));
    } catch (e) {
      console.error('Could not update localStorage for sound settings', e);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    try {
        setVolumeState(newVolume);
        localStorage.setItem('quantum-cat-volume', newVolume.toString());
        window.dispatchEvent(new CustomEvent('sound-setting-changed'));
    } catch (e) {
        console.error('Could not update localStorage for volume', e);
    }
  }, []);

  const setReduceMotion = useCallback((enabled: boolean) => {
    try {
        setReduceMotionState(enabled);
        localStorage.setItem('quantum-cat-reduce-motion', JSON.stringify(enabled));
        if (enabled) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }
    } catch (e) {
        console.error('Could not update localStorage for reduce motion', e);
    }
  }, []);


  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled, volume, setVolume, reduceMotion, setReduceMotion }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
