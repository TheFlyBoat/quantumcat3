
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
    BadgeComponent: React.ComponentType<{ className?: string }> | undefined;
}

export function BadgeCard({ badge, unlocked, BadgeComponent }: BadgeCardProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="overflow-hidden aspect-square flex flex-col">
                        <CardContent className="p-2 flex-grow h-full flex items-center justify-center bg-muted/50 relative">
                            {unlocked && BadgeComponent ? (
                                <BadgeComponent className="w-16 h-16" />
                            ) : (
                                <Lock className="w-6 h-6 text-muted-foreground" />
                            )}
                        </CardContent>
                        <CardFooter className="p-2 justify-center bg-background/50">
                            <p className="text-xs font-medium">{unlocked ? badge.name : '???'}</p>
                        </CardFooter>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{unlocked ? badge.description : "Keep playing to unlock!"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
