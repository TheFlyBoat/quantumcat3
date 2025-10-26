
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
<<<<<<< HEAD
import { ArrowLeft, Award, Bolt, Fish } from 'lucide-react';
=======
import Link from 'next/link';
import { ArrowLeft, User, Award, Bolt, Fish } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { useAchievements } from '@/context/achievements-context';
import { usePoints } from '@/context/points-context';
import { useBadges } from '@/context/badge-context';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
<<<<<<< HEAD
import { useAuth } from '@/context/auth-context';
import { Badge as GuestBadge } from '@/components/ui/badge';
import { KeyRound } from 'lucide-react';
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

export function AppHeader() {
    const router = useRouter();
    const pathname = usePathname();
<<<<<<< HEAD
    const { streak } = useAchievements();
    const { points } = usePoints();
    const { unlockedBadges } = useBadges();
    const { storageMode, user, displayName } = useAuth();

    const isHomePage = pathname === '/home';
    const isCloudSynced = storageMode === 'cloud' && user && user !== 'guest';
=======
    const { displayName } = useAuth();
    const { streak } = useAchievements();
    const { points } = usePoints();
    const { unlockedBadges } = useBadges();

    const isHomePage = pathname === '/home';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    return (
        <TooltipProvider>
            <div className="flex justify-between items-center w-full">
<<<<<<< HEAD
                <div className="flex items-center gap-3 text-base font-semibold">
=======
                <div className="flex items-center gap-2 text-sm font-semibold">
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                    {!isHomePage && (
                        <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => router.push('/home')}>
                            <ArrowLeft />
                        </Button>
                    )}
<<<<<<< HEAD
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1.5 cursor-default">
                                <Award className="w-6 h-6 text-yellow-500" />
                                <span className="text-lg">{unlockedBadges.length}</span>
=======
                    {displayName && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 cursor-default">
                                    <User className="w-4 h-4" />
                                    <span>{displayName}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Your Nickname</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 cursor-default">
                                <Award className="w-5 h-5 text-yellow-500" />
                                <span>{unlockedBadges.length}</span>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Badges Unlocked</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
<<<<<<< HEAD
                            <div className="flex items-center gap-1.5 cursor-default">
                                <Bolt className="w-6 h-6 text-red-500" />
                                <span className="text-lg">{streak}</span>
=======
                            <div className="flex items-center gap-1 cursor-default">
                                <Bolt className="w-5 h-5 text-red-500" />
                                <span>{streak}</span>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Daily Streak</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
<<<<<<< HEAD
                            <div className="flex items-center gap-1.5 cursor-default">
                                <Fish className="w-6 h-6 text-blue-500" />
                                <span className="text-lg">{points}</span>
=======
                            <div className="flex items-center gap-1 cursor-default">
                                <Fish className="w-5 h-5 text-blue-500" />
                                <span>{points}</span>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Fish Points</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
<<<<<<< HEAD
                <Tooltip>
                    <TooltipTrigger asChild>
                        {isCloudSynced ? (
                            <div className="flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                                <KeyRound className="w-4 h-4" />
                                <span>Synced</span>
                            </div>
                        ) : (
                            <GuestBadge variant="outline" className="text-xs">
                                Guest Mode
                            </GuestBadge>
                        )}
                    </TooltipTrigger>
                    <TooltipContent>
                        {isCloudSynced ? (
                            <p>{displayName || 'Logged in'} · Progress synced to the cloud</p>
                        ) : (
                            <p>Progress stored on this device only</p>
                        )}
                    </TooltipContent>
                </Tooltip>
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
            </div>
        </TooltipProvider>
    );
}
