
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import { AchievementsProvider } from '@/context/achievements-context';
import { CatCollectionProvider } from '@/context/cat-collection-context';
import { DiaryProvider } from '@/context/diary-context';
import { PointsProvider } from '@/context/points-context';
import { BadgeProvider } from '@/context/badge-context';
import { BoxSkinProvider } from '@/context/box-skin-context';
import { SoundProvider } from '@/context/sound-context';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'The Quantum Cat',
  description: 'Open the box, if you dare.',
<<<<<<< HEAD
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<<<<<<< HEAD
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&family=Patrick+Hand&family=Quicksand:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
=======
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐈</text></svg>" />
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
      </head>
      <body className={cn('bg-background font-body antialiased')}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
        >
          <AuthProvider>
            <BadgeProvider>
              <AchievementsProvider>
                <CatCollectionProvider>
                  <DiaryProvider>
                    <PointsProvider>
                      <SoundProvider>
                        <BoxSkinProvider>
                          {children}
                        </BoxSkinProvider>
                      </SoundProvider>
                    </PointsProvider>
                  </DiaryProvider>
                </CatCollectionProvider>
              </AchievementsProvider>
            </BadgeProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
