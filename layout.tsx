
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
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐈</text></svg>" />
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
