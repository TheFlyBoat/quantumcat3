
'use client';

import { Heart, Share2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';

export function MainActions({ onSave, onShare, onReset, isSaved, reduceMotion }: {
    onSave: () => void;
    onShare: () => void;
    onReset: () => void;
    isSaved: boolean;
    reduceMotion: boolean;
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
                <Share2 />
                Share
            </Button>
            <Button onClick={onReset} size="sm" variant="outline" className={cn(
                'hover:bg-primary/20 hover:text-primary'
            )}>
                <RotateCcw />
                Try Again
            </Button>
        </div>
    );
}
