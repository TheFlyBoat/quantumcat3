
'use client';

import { Heart, Share2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
<<<<<<< HEAD
import { cn } from '@/lib/utils';

export function MainActions({ onSave, onShare, onReset, isSaved, reduceMotion, isShareDisabled = false, isResetDisabled = false }: {
=======
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';

export function MainActions({ onSave, onShare, onReset, isSaved, reduceMotion }: {
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
    onSave: () => void;
    onShare: () => void;
    onReset: () => void;
    isSaved: boolean;
    reduceMotion: boolean;
<<<<<<< HEAD
    isShareDisabled?: boolean;
    isResetDisabled?: boolean;
}) {
    return (
        <div className={cn("flex gap-2 mt-4", !reduceMotion && "animate-bounce-in")}>
            <Button
                size="icon"
                variant="outline"
                aria-pressed={isSaved}
                aria-label={isSaved ? 'Remove from diary' : 'Save to diary'}
                className={cn(
                    'transition-colors',
                    isSaved
                        ? 'border-red-500 text-red-500 bg-red-500/10 hover:bg-red-500/20'
                        : 'text-muted-foreground hover:text-primary'
                )}
                onClick={onSave}
            >
                <Heart className={cn(
                    'transition-colors',
                    isSaved ? 'fill-current text-red-500' : 'text-muted-foreground'
                )} />
            </Button>

            <Button onClick={onShare} size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isShareDisabled}>
=======
}) {
    return (
        <div className={cn("flex gap-2 mt-4", !reduceMotion && "animate-bounce-in")}>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="icon" variant="outline" className={cn(isSaved ? 'border-primary text-primary' : '')} disabled={isSaved}>
                        <Heart className={cn(isSaved ? "fill-current" : "")} />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Save this message to the diary?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will add the message to this cat's personal diary in your gallery.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => playSound('click-2')}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onSave}>
                            Save
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Button onClick={onShare} size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                <Share2 />
                Share
            </Button>
            <Button onClick={onReset} size="sm" variant="outline" className={cn(
<<<<<<< HEAD
                'hover:bg-primary/20 hover:text-primary',
                isResetDisabled && 'pointer-events-none opacity-60'
            )} disabled={isResetDisabled}>
=======
                'hover:bg-primary/20 hover:text-primary'
            )}>
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
                <RotateCcw />
                Try Again
            </Button>
        </div>
    );
}
