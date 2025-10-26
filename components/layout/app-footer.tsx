
'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Atom, Cat, Award, BoxIcon, Settings, Info, RotateCcw, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { playSound } from '@/lib/audio';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { easterEggIcons } from '@/lib/easter-eggs';


export function AppFooter({ onSettingsClick, onInfoClick }: { onSettingsClick: () => void; onInfoClick: () => void; }) {
    const { logout, reset } = useAuth();
    const [versionClicks, setVersionClicks] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [easterEggIcon, setEasterEggIcon] = useState<React.ReactNode | null>(null);

    const handleLogout = async () => {
        playSound('click-1');
        await logout();
    };

    const handleReset = () => {
        playSound('haptic-3');
        reset();
    };

    const handleVersionClick = () => {
        if (easterEggActive) return;
        const newClicks = versionClicks + 1;
        setVersionClicks(newClicks);

        if (newClicks === 3) {
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

    const versionColorClass = useMemo(() => {
        if (versionClicks === 1) return 'text-red-500';
        if (versionClicks === 2) return 'text-purple-500';
        return 'text-muted-foreground/50';
    }, [versionClicks]);

    return (
        <TooltipProvider>
            <div className="w-full flex justify-between items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Atom className="w-7 h-7 text-primary animate-hue-rotate" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" align="start" className="flex items-center gap-1">
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem asChild><Link href="/gallery"><Cat /></Link></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Gallery</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem asChild><Link href="/awards"><Award /></Link></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Awards</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem asChild><Link href="/customize"><BoxIcon /></Link></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Customize</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={onSettingsClick}><Settings /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Settings</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild><DropdownMenuItem onClick={onInfoClick}><Info /></DropdownMenuItem></TooltipTrigger><TooltipContent><p>Info</p></TooltipContent></Tooltip>
                        <DropdownMenuSeparator orientation="vertical" className="h-6" />
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
        </TooltipProvider>
    );
}
