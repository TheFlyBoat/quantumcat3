'use client';

<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/splash-screen';

export default function RootPage() {
  const router = useRouter();
  const [shouldShowSplash, setShouldShowSplash] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const alreadySeen = sessionStorage.getItem('quantum-cat-splash') === 'seen';
    if (alreadySeen) {
      router.replace('/home');
      return;
    }
    setShouldShowSplash(true);
  }, [router]);

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem('quantum-cat-splash', 'seen');
    } catch (error) {
      console.warn('Unable to persist splash state during intro', error);
    }
    router.replace('/home');
  };

  if (!shouldShowSplash) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg text-muted-foreground">Calibrating quantum chamber…</p>
      </div>
    );
  }

  return <SplashScreen onComplete={handleSplashComplete} />;
}
=======
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  );
}
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
