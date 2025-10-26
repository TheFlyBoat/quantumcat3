
'use client';

import * as React from 'react';
<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useBadges } from '@/context/badge-context';
=======
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useBadges } from '@/context/badge-context';
import { usePoints } from '@/context/points-context';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';
import { CelebrationCard } from '@/components/celebration-card';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { ControlPanel } from '@/components/layout/control-panel';
<<<<<<< HEAD
import { badgeImageMap, defaultBadgeImage } from '@/lib/badge-images';
import badgeData from '@/lib/badge-data.json';
import { CelebrationState, DialogTab } from '@/lib/types';
import { LoginPrompt } from '@/components/auth/login-prompt';
import { LoginModal } from '@/components/auth/login-modal';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { celebrationBadgeId } = useBadges();
    const { loginSuccess, acknowledgeLoginSuccess, storageMode } = useAuth();
    const { toast } = useToast();

    const router = useRouter();
    const pathname = usePathname();
=======
import { NicknameDialog } from '@/components/auth/nickname-dialog';
import { badgeComponentMap } from '@/lib/badge-components';
import badgeData from '@/lib/badge-data.json';
import { CelebrationState, DialogTab } from '@/lib/types';
import { Rocket } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { showNicknamePrompt, setShowNicknamePrompt } = useAuth();
    const { lastUnlockedBadgeId } = useBadges();
    const { addPoints } = usePoints();
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    const [controlPanelOpen, setControlPanelOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<DialogTab>('settings');
    const [celebrationState, setCelebrationState] = useState<CelebrationState>('idle');
    const [celebrationContent, setCelebrationContent] = useState<{ title: string; description: string; icon?: React.ReactNode } | null>(null);
    const [revealedCatId, setRevealedCatId] = useState<string | null>(null);

<<<<<<< HEAD
    const closeCelebration = useCallback(() => {
        setCelebrationState('finished');
        setCelebrationContent(null);
    }, []);

    useEffect(() => {
        if (!celebrationBadgeId) return;

        const badge = badgeData.badges.find(b => b.id === celebrationBadgeId);
        if (!badge) return;

        const badgeImage = badgeImageMap[badge.id] ?? defaultBadgeImage;

        const applyCelebration = () => {
            setCelebrationContent({
                title: `Badge Unlocked: ${badge.name}!`,
                description: badge.description,
                icon: badgeImage ? (
                    <img src={badgeImage} alt={`${badge.name} badge icon`} className="w-16 h-16" />
                ) : undefined
            });
            setCelebrationState('celebrating');
        };

        if (typeof queueMicrotask === 'function') {
            queueMicrotask(applyCelebration);
        } else {
            setTimeout(applyCelebration, 0);
        }

        const timeoutId = setTimeout(closeCelebration, 4000);
        return () => clearTimeout(timeoutId);
    }, [celebrationBadgeId, closeCelebration]);
=======
    useEffect(() => {
        if (lastUnlockedBadgeId) {
            const badge = badgeData.badges.find(b => b.id === lastUnlockedBadgeId);
            if (badge) {
                const BadgeComponent = badgeComponentMap[badge.icon] || badgeComponentMap.default;
                setCelebrationContent({
                    title: `Badge Unlocked: ${badge.name}!`,
                    description: badge.description,
                    icon: <BadgeComponent className="w-16 h-16" />
                });
                setCelebrationState('celebrating');
                setTimeout(() => setCelebrationState('finished'), 4000);
            }
        }
    }, [lastUnlockedBadgeId]);

    const handleNicknameSet = (nickname: string) => {
        setShowNicknamePrompt(false);
        setCelebrationContent({
            title: `Welcome, ${nickname}!`,
            description: "Your quantum journey begins now.",
            icon: <Rocket className="h-16 w-16 text-primary" />
        });
        setCelebrationState('celebrating');
        playSound('celebration-magic');

        setTimeout(() => {
            setCelebrationState('spotlight');
            const homePageElement = document.getElementById('home-page-container');
            if (homePageElement) {
                const boxElement = homePageElement.querySelector('[aria-label="Open the quantum cat box"]');
                if (boxElement) {
                    boxElement.classList.add('animate-shake');
                    playSound('box-shake');
                    setTimeout(() => boxElement.classList.remove('animate-shake'), 400);
                }
            }
            setTimeout(() => setCelebrationState('finished'), 1000);
        }, 3000);
    };
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    const openControlPanel = (tab: DialogTab) => {
        setActiveTab(tab);
        setControlPanelOpen(true);
        playSound('click-2');
    };

<<<<<<< HEAD
    useEffect(() => {
        if (loginSuccess && storageMode === 'cloud') {
            toast({
                title: 'Your cats are safe!',
                description: 'You can now continue your collection on any device. Keep in this universe alternative.',
            });
            acknowledgeLoginSuccess();
        }
    }, [loginSuccess, storageMode, toast, acknowledgeLoginSuccess]);

    const celebrationInProgress = celebrationState === 'celebrating' || celebrationState === 'spotlight';

    const isMenuPage = pathname === '/gallery' || pathname === '/awards' || pathname === '/customize';

    const handleBackdropClick = useCallback(() => {
        if (isMenuPage) {
            router.push('/home');
        }
    }, [isMenuPage, router]);

=======
    const celebrationInProgress = celebrationState === 'celebrating' || celebrationState === 'spotlight';

>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    return (
        <div className={cn(
            "relative flex min-h-svh flex-col items-center justify-center p-4 transition-colors duration-500 bg-background",
            celebrationInProgress && "bg-black",
            celebrationState === 'spotlight' && "spotlight-container"
<<<<<<< HEAD
        )} onClick={handleBackdropClick}>
=======
        )}>
            <NicknameDialog 
                isOpen={showNicknamePrompt} 
                onOpenChange={setShowNicknamePrompt} 
                onNicknameSet={handleNicknameSet} 
            />

>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
            {celebrationState === 'celebrating' && celebrationContent && (
                <CelebrationCard
                    title={celebrationContent.title}
                    description={celebrationContent.description}
                    icon={celebrationContent.icon}
<<<<<<< HEAD
                    onClose={closeCelebration}
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                />
            )}

            <Card className={cn(
                "relative w-full max-w-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-500",
                "dark:border-primary/50 dark:shadow-primary/20",
                "bg-card",
                celebrationInProgress && 'border-transparent bg-transparent shadow-none'
<<<<<<< HEAD
            )} onClick={(event) => event.stopPropagation()}>
=======
            )}>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                <CardHeader className={cn("p-4 transition-opacity duration-300", celebrationInProgress && "opacity-0")}>
                    <AppHeader />
                </CardHeader>
                <CardContent id="home-page-container" className="flex flex-col items-center justify-center text-center p-6 pt-0">
                    {React.cloneElement(children as React.ReactElement, { setRevealedCatId })}
                </CardContent>
                <div className={cn("p-4 flex justify-between items-center transition-opacity duration-300", celebrationInProgress && "opacity-0")}>
                    <AppFooter 
                        onSettingsClick={() => openControlPanel('settings')} 
                        onInfoClick={() => openControlPanel('info')} 
                    />
                </div>
            </Card>

            <ControlPanel 
                isOpen={controlPanelOpen} 
                onOpenChange={setControlPanelOpen} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
            />
<<<<<<< HEAD
            <LoginPrompt />
            <LoginModal />
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        </div>
    );
}
