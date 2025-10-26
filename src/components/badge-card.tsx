
'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock } from 'lucide-react';

interface BadgeCardProps {
    badge: {
        id: string;
        name: string;
        description: string;
        icon: string;
    };
    unlocked: boolean;
<<<<<<< HEAD
    badgeImage?: string;
}

export function BadgeCard({ badge, unlocked, badgeImage }: BadgeCardProps) {
    return (
        <TooltipProvider delayDuration={150}>
=======
    BadgeComponent: React.ComponentType<{ className?: string }> | undefined;
}

export function BadgeCard({ badge, unlocked, BadgeComponent }: BadgeCardProps) {
    return (
        <TooltipProvider>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="overflow-hidden aspect-square flex flex-col">
                        <CardContent className="p-2 flex-grow h-full flex items-center justify-center bg-muted/50 relative">
<<<<<<< HEAD
                            {unlocked && badgeImage ? (
                                <img src={badgeImage} alt={`${badge.name} badge icon`} className="w-16 h-16" />
=======
                            {unlocked && BadgeComponent ? (
                                <BadgeComponent className="w-16 h-16" />
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                            ) : (
                                <Lock className="w-6 h-6 text-muted-foreground" />
                            )}
                        </CardContent>
                        <CardFooter className="p-2 justify-center bg-background/50">
                            <p className="text-xs font-medium">{unlocked ? badge.name : '???'}</p>
                        </CardFooter>
                    </Card>
                </TooltipTrigger>
<<<<<<< HEAD
                <TooltipContent className="max-w-xs space-y-1">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {!unlocked && (
                        <p className="text-[11px] font-medium text-primary/80">Not yet unlocked</p>
                    )}
=======
                <TooltipContent>
                    <p>{unlocked ? badge.description : "Keep playing to unlock!"}</p>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
