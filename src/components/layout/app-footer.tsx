
'use client';

<<<<<<< HEAD
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Atom, Cat, Award, BoxIcon, Settings, Info, RotateCcw, LogOut, Mail } from 'lucide-react';
=======
import * as React from 'react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Atom, Cat, Award, BoxIcon, Settings, Info, RotateCcw, LogOut } from 'lucide-react';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { useAuth } from '@/context/auth-context';
import { playSound } from '@/lib/audio';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
<<<<<<< HEAD
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfiniteBoxGame, InfiniteBoxGameResult } from '@/components/infinite-box-game';
import { useToast } from '@/hooks/use-toast';
import { usePoints } from '@/context/points-context';


export function AppFooter({ onSettingsClick, onInfoClick }: { onSettingsClick: () => void; onInfoClick: () => void; }) {
    const { logout, reset, user } = useAuth();
    const { addPoints } = usePoints();
    const { toast } = useToast();
    const [versionClicks, setVersionClicks] = useState(0);
    const [gameActive, setGameActive] = useState(false);

    const accountLabel = useMemo(() => {
        if (user === undefined) return 'Loading...';
        if (user && user !== 'guest') {
            return user.email ?? 'Logged In';
        }
        return 'Guest Mode';
    }, [user]);
=======
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { easterEggIcons } from '@/lib/easter-eggs';


export function AppFooter({ onSettingsClick, onInfoClick }: { onSettingsClick: () => void; onInfoClick: () => void; }) {
    const { logout, reset } = useAuth();
    const [versionClicks, setVersionClicks] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [easterEggIcon, setEasterEggIcon] = useState<React.ReactNode | null>(null);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    const handleLogout = async () => {
        playSound('click-1');
        await logout();
    };

    const handleReset = () => {
        playSound('haptic-3');
        reset();
    };

    const handleVersionClick = () => {
<<<<<<< HEAD
        if (gameActive) return;
=======
        if (easterEggActive) return;
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        const newClicks = versionClicks + 1;
        setVersionClicks(newClicks);

        if (newClicks === 3) {
<<<<<<< HEAD
            playSound('haptic-2');
            setGameActive(true);
            setVersionClicks(0);
        }
    };

    const resetSecretState = () => {
        setVersionClicks(0);
        setGameActive(false);
    };

    const handleAccountInfoClick = () => {
        playSound('click-1');
        const valueToShare = user && user !== 'guest' ? (user.email ?? 'No email available') : 'Guest Mode';
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            void navigator.clipboard.writeText(valueToShare).catch(() => {});
        } else if (typeof window !== 'undefined') {
            window.alert(valueToShare);
        }
    };

=======
            setEasterEggActive(true);
        }
    };

    const handleEasterEggClick = () => {
        if (!easterEggActive) return;
        playSound('click-1');

        const randomIndex = Math.floor(Math.random() * easterEggIcons.length);
        const selected = easterEggIcons[randomIndex];
        const IconComponent = selected.icon;
        setEasterEggIcon(<IconComponent className="w-5 h-5" />);

        if (selected.name === 'apple') {
            // Implement point addition logic here
            setTimeout(() => {
                resetEasterEgg();
            }, 1000);
        }
    };

    const resetEasterEgg = () => {
        setVersionClicks(0);
        setEasterEggActive(false);
        setEasterEggIcon(null);
    };

>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    const versionColorClass = useMemo(() => {
        if (versionClicks === 1) return 'text-red-500';
        if (versionClicks === 2) return 'text-purple-500';
        return 'text-muted-foreground/50';
    }, [versionClicks]);

<<<<<<< HEAD
    const handleGameDismiss = () => {
        resetSecretState();
    };

    const handleGameComplete = (result: InfiniteBoxGameResult) => {
        addPoints(result.pointsAwarded);
        toast({
            title: result.pointsAwarded > 0 ? 'Quantum haul secured!' : 'No bonus this loop',
            description: `Clicks ${result.totalClicks} • Apples ${result.applesCollected} • Atoms ${result.atomsActivated} • Points ${result.pointsAwarded}`,
        });
        resetSecretState();
    };

=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    return (
        <TooltipProvider>
            <div className="w-full flex justify-between items-center">
                <DropdownMenu>
<<<<<<< HEAD
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                    <Atom className="w-7 h-7 text-primary animate-hue-rotate" />
                                </div>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{accountLabel}</p>
                        </TooltipContent>
                    </Tooltip>
=======
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Atom className="w-7 h-7 text-primary animate-hue-rotate" />
                        </div>
                    </DropdownMenuTrigger>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                    <DropdownMenuContent side="top" align="start" className="flex items-center gap-1">
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem asChild><Link href="/gallery"><Cat /></Link></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Gallery</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem asChild><Link href="/awards"><Award /></Link></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Awards</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem asChild><Link href="/customize"><BoxIcon /></Link></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Customize</p></TooltipContent></Tooltip>
<<<<<<< HEAD
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={handleAccountInfoClick}><Mail /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>{accountLabel}</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={onSettingsClick}><Settings /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Settings</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={onInfoClick}><Info /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Info</p></TooltipContent></Tooltip>
                        <div role="separator" className="mx-1 h-6 w-px bg-border" />
=======
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={onSettingsClick}><Settings /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Settings</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={onInfoClick}><Info /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Info</p></TooltipContent></Tooltip>
                        <DropdownMenuSeparator orientation="vertical" className="h-6" />
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                        <AlertDialog>
                            <Tooltip><TooltipTrigger asChild><AlertDialogTrigger asChild><DropdownMenuItem onSelect={(e) => e.preventDefault()}><RotateCcw /></DropdownMenuItem></AlertDialogTrigger></TooltipTrigger><TooltipContent><p>Reset</p></TooltipContent></Tooltip>
                            <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will reset all progress.</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter><AlertDialogCancel onClick={() => playSound('click-2')}>Cancel</AlertDialogCancel><AlertDialogAction asChild><Button variant="destructive" onClick={handleReset}>Reset</Button></AlertDialogAction></AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={handleLogout}><LogOut /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Logout</p></TooltipContent></Tooltip>
                    </DropdownMenuContent>
                </DropdownMenu>

<<<<<<< HEAD
                {!gameActive && (
                    <div
                        onClick={handleVersionClick}
                        className={`absolute bottom-4 right-4 text-xs cursor-pointer transition-colors ${versionColorClass}`}>
                        v3.1
                    </div>
                )}
            </div>
            {gameActive && (
                <InfiniteBoxGame
                    onDismiss={handleGameDismiss}
                    onComplete={handleGameComplete}
                />
            )}
=======
                {easterEggActive ? (
                    <div
                        onClick={handleEasterEggClick}
                        className="absolute bottom-4 right-4 h-8 w-8 bg-primary/20 border-2 border-primary rounded-md shadow-lg animate-pulse flex items-center justify-center cursor-pointer"
                    >
                        {easterEggIcon}
                    </div>
                ) : (
                    <div
                        onClick={handleVersionClick}
                        className={`absolute bottom-4 right-4 text-xs cursor-pointer transition-colors ${versionColorClass}`}>
                        v2.0.4
                    </div>
                )}
            </div>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        </TooltipProvider>
    );
}
