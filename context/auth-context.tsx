
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loadUserData, UserData, saveUserData } from '@/lib/user-data';
import { useRouter } from 'next/navigation';

type UserType = User | 'guest' | null;

interface AuthContextType {
  user: UserType | undefined; // undefined: loading, null: logged out, 'guest': guest, User: logged in
  loading: boolean;
  displayName: string | null;
  showNicknamePrompt: boolean;
  setShowNicknamePrompt: (show: boolean) => void;
  updateDisplayName: (name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => void;
  reset: () => void;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [showNicknamePrompt, setShowNicknamePrompt] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        sessionStorage.setItem('quantum-cat-auth-state', 'logged-in');
        
        const data = await loadUserData(firebaseUser.uid);
        setUserData(data);

        const localDisplayName = data.nickname || firebaseUser.displayName;
        
        if (localDisplayName) {
            setDisplayName(localDisplayName);
             if (firebaseUser.displayName !== localDisplayName) {
                updateProfile(firebaseUser, { displayName: localDisplayName }).catch(e => console.error("Failed to sync display name", e));
            }
        } else {
          setShowNicknamePrompt(true);
        }
      } else {
        const authState = sessionStorage.getItem('quantum-cat-auth-state');
        if (authState === 'guest') {
            setUser('guest');
            setUserData(null); // Guests have no persisted data
            const guestNickname = sessionStorage.getItem('quantum-cat-guest-nickname');
            if (guestNickname) {
                setDisplayName(guestNickname);
                setShowNicknamePrompt(false);
            } else {
                setDisplayName(null); // Explicitly clear display name for new guest session
                setShowNicknamePrompt(true);
            }
        } else {
            setUser(null);
            setDisplayName(null);
            setUserData(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateDisplayName = async (name: string) => {
    setDisplayName(name);
    setShowNicknamePrompt(false);
    if (user && user !== 'guest' && auth.currentUser) {
        try {
            await updateProfile(auth.currentUser, { displayName: name });
            const newUserData = { ...(userData || {}), nickname: name };
            setUserData(newUserData as UserData);
            await saveUserData(user.uid, newUserData as UserData);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    } else if (user === 'guest') {
        sessionStorage.setItem('quantum-cat-guest-nickname', name);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    await signInWithPopup(auth, provider);
    sessionStorage.setItem('quantum-cat-auth-state', 'logged-in');
  };

  const signInWithEmail = async (email: string, pass: string) => {
      await signInWithEmailAndPassword(auth, email, pass);
      sessionStorage.setItem('quantum-cat-auth-state', 'logged-in');
  }

  const signUpWithEmail = async (email: string, pass: string) => {
      await createUserWithEmailAndPassword(auth, email, pass);
      sessionStorage.setItem('quantum-cat-auth-state', 'logged-in');
  }

  const logout = async () => {
    await signOut(auth);
    // Clear auth state first
    sessionStorage.removeItem('quantum-cat-auth-state');
    sessionStorage.removeItem('quantum-cat-guest-nickname');
    
    // Reset state variables
    setUser(null);
    setDisplayName(null);
    setUserData(null);
    setShowNicknamePrompt(false); // Ensure this is reset
    
    // Redirect to login page
    router.push('/login');
  };
  
  const continueAsGuest = () => {
    setUser('guest');
    setUserData(null); // Guests don't have persisted data
    sessionStorage.setItem('quantum-cat-auth-state', 'guest');
    setShowNicknamePrompt(true);
  };

  const reset = async () => {
    try {
        if (user && user !== 'guest') {
            await saveUserData(user.uid, {}); // Reset Firestore data
        }
        
        // Clear all local and session storage related to the app
        Object.keys(localStorage).filter(key => key.startsWith('quantum-cat-')).forEach(key => localStorage.removeItem(key));
        Object.keys(sessionStorage).filter(key => key.startsWith('quantum-cat-')).forEach(key => sessionStorage.removeItem(key));
        
        // Use logout to ensure a clean state transition
        await logout();
    } catch (e) {
        console.error('Could not reset user data', e);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, displayName, showNicknamePrompt, setShowNicknamePrompt, updateDisplayName, signInWithGoogle, signInWithEmail, signUpWithEmail, logout, continueAsGuest, reset, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
