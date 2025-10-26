
'use client';

import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TutorialOverlay({ reduceMotion }: { reduceMotion: boolean }) {
    return (
        <div className={cn("absolute top-0 flex flex-col items-center", !reduceMotion && "animate-bounce")}>
            <span className="text-sm font-semibold text-accent">Tap the box to begin!</span>
            <ArrowDown className="h-6 w-6 text-accent" />
        </div>
    );
}
