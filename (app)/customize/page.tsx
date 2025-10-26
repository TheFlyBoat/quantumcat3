
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useBoxSkin } from '@/context/box-skin-context';
import { BoxIcon, ShinyBoxIcon, CardboardBoxIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useBadges } from '@/context/badge-context';
import { usePoints } from '@/context/points-context';
import { Lock, Fish } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { playSound } from '@/lib/audio';

export default function CustomizePage() {
    const { selectedSkin, selectSkin, unlockedSkins, unlockSkin } = useBoxSkin();
    const { isBadgeUnlocked, unlockBadge } = useBadges();
    const { points, addPoints } = usePoints();
    const { toast } = useToast();

    const cardboardCost = 100;
    const isCardboardUnlocked = unlockedSkins.includes('cardboard');

    const handleSelectSkin = (skin: 'default' | 'shiny' | 'cardboard') => {
        if (skin === 'cardboard' && !isCardboardUnlocked) {
            // This is handled by the AlertDialog now
            return;
        }

        if (skin !== 'default' && !isBadgeUnlocked('skin-changer')) {
            unlockBadge('skin-changer');
        }
        selectSkin(skin);
    };

    const handlePurchaseCardboard = () => {
        if (points >= cardboardCost) {
            addPoints(-cardboardCost);
            unlockSkin('cardboard');
            selectSkin('cardboard');
            playSound('celebration-magic');
            toast({
                title: "Skin Unlocked!",
                description: "You can now use the Cardboard Box skin.",
            });
        } else {
            playSound('haptic-3');
            toast({
                variant: 'destructive',
                title: "Not enough points!",
                description: `You need ${cardboardCost} Fish Points to unlock this skin.`,
            });
        }
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Box Skins</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <Card 
                            onClick={() => handleSelectSkin('default')}
                            className={cn(
                                "overflow-hidden aspect-square flex flex-col cursor-pointer",
                                selectedSkin === 'default' && 'border-primary'
                            )}
                        >
                             <CardContent className="p-2 flex-grow h-full flex items-center justify-center bg-muted/50 relative">
                                <BoxIcon className="w-16 h-16" />
                                <Badge className="absolute top-2 right-2">Default</Badge>
                             </CardContent>
                            <CardFooter className="p-2 justify-center bg-background/50">
                                <p className="text-xs font-medium">Wooden</p>
                            </CardFooter>
                        </Card>
                        <Card 
                            onClick={() => handleSelectSkin('shiny')}
                            className={cn(
                                "overflow-hidden aspect-square flex flex-col cursor-pointer",
                                selectedSkin === 'shiny' && 'border-primary'
                            )}
                        >
                             <CardContent className="p-2 flex-grow h-full flex items-center justify-center bg-muted/50 relative">
                                <ShinyBoxIcon className="w-16 h-16" />
                             </CardContent>
                            <CardFooter className="p-2 justify-center bg-background/50">
                                <p className="text-xs font-medium">Shiny</p>
                            </CardFooter>
                        </Card>
                        
                        <AlertDialog>
                             <AlertDialogTrigger asChild>
                                <Card 
                                    onClick={() => isCardboardUnlocked && handleSelectSkin('cardboard')}
                                    className={cn(
                                        "overflow-hidden aspect-square flex flex-col",
                                        isCardboardUnlocked ? 'cursor-pointer' : 'cursor-default',
                                        selectedSkin === 'cardboard' && 'border-primary'
                                    )}
                                >
                                     <CardContent className="p-2 flex-grow h-full flex items-center justify-center bg-muted/50 relative">
                                        {isCardboardUnlocked ? (
                                            <CardboardBoxIcon className="w-16 h-16" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Lock className="w-8 h-8" />
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <Fish className="w-3 h-3"/>
                                                    {cardboardCost}
                                                </Badge>
                                            </div>
                                        )}
                                     </CardContent>
                                    <CardFooter className="p-2 justify-center bg-background/50">
                                        <p className="text-xs font-medium">Cardboard</p>
                                    </CardFooter>
                                </Card>
                            </AlertDialogTrigger>
                            {!isCardboardUnlocked && (
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Unlock Cardboard Skin?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will cost {cardboardCost} Fish Points. You currently have {points} points.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => playSound('click-2')}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handlePurchaseCardboard} disabled={points < cardboardCost}>
                                            Unlock for {cardboardCost} Points
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            )}
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    