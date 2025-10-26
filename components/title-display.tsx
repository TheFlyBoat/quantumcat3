
'use client';

import { cn } from '@/lib/utils';

function getCatTitleParts(name: string | null) {
    if (!name) return { part1: 'The', part2: 'Quantum', part3: 'Cat' };

    if (name === 'Breu') {
        return { part1: 'The', part2: 'Breu', part3: 'Cat' };
    }

    if (name.endsWith(' Cat')) {
        const baseName = name.replace(' Cat', '');
        const parts = baseName.split(' ');
        if (parts.length > 1) {
            return { part1: 'The', part2: parts.join(' '), part3: 'Cat' };
        }
        return { part1: 'The', part2: baseName, part3: 'Cat' };
    }

    return { part1: 'The', part2: name, part3: 'Cat' };
}

export function TitleDisplay({ name, onTitleClick, reduceMotion }: { name: string | null; onTitleClick: () => void; reduceMotion: boolean; }) {
    const titleParts = getCatTitleParts(name);

    return (
        <div
            onClick={onTitleClick}
            className={cn(
                "relative h-12 w-full select-none cursor-pointer flex items-center justify-center font-headline text-4xl font-bold tracking-tight"
            )}
        >
            {name === null ? (
                <div className="flex items-center justify-center space-x-2">
                    <span>{titleParts.part1}</span>
                    <span>{titleParts.part2}</span>
                    <span>{titleParts.part3}</span>
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-2">
                    <span className={cn("inline-block", !reduceMotion && "animate-cartoon-bounce")}>{titleParts.part1}</span>
                    <span className={cn("inline-block", !reduceMotion && "animate-spin-reveal")}>{titleParts.part2}</span>
                    <span className={cn("inline-block", !reduceMotion && "animate-cartoon-bounce [animation-delay:0.1s]")}>{titleParts.part3}</span>
                </div>
            )}
        </div>
    );
}
