
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { useDiary } from "@/context/diary-context";
import { Eye, HeartCrack, Swords, BookOpen } from "lucide-react";
import { GingerCatIcon, GhostCatIcon, ShadowCatIcon, BonesCatIcon, IdentityCrisisCatIcon, AltCat, BreuCatIcon, ZumbiCatIcon, BlizzardCatIcon, VoodooCatIcon, SleepyCatIcon, HologramCatIcon, GravityCatIcon, GlitchCatIcon } from '@/components/cats';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const catComponentMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'ginger': GingerCatIcon,
    'ghost': GhostCatIcon,
    'paradox': GlitchCatIcon,
    'shadow': ShadowCatIcon,
    'bones': BonesCatIcon,
    'identity-crisis': IdentityCrisisCatIcon,
    'alt': AltCat,
    'breu': BreuCatIcon,
    'zumbi': ZumbiCatIcon,
    'blizzard': BlizzardCatIcon,
    'voodoo': VoodooCatIcon,
    'sleepy': SleepyCatIcon,
    'hologram': HologramCatIcon,
    'gravity': GravityCatIcon,
    'glitch': GlitchCatIcon,
};

interface CatProfileDialogProps {
    cat: {
        id: string;
        name: string;
        description: string;
        type: string;
        tagline: string;
        strength: string;
        weakness: string;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onOpenDiary: () => void;
}

export function CatProfileDialog({ cat, open, onOpenChange, onOpenDiary }: CatProfileDialogProps) {
    const { getRevealCount } = useDiary();
    const revealCount = getRevealCount(cat.id);
    const CatComponent = catComponentMap[cat.id];
    
    const displayName = cat.name.endsWith(" Cat") ? cat.name : `${cat.name} Cat`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl p-0 grid grid-cols-1 md:grid-cols-2">
                <div className={cn(
                    "aspect-square md:aspect-auto w-full flex items-center justify-center p-8",
                    "bg-gradient-to-br from-primary/20 via-background to-background"
                    )}>
                     {CatComponent && <CatComponent className="w-48 h-48" />}
                </div>
                <div className="p-6 flex flex-col space-y-4">
                    <DialogHeader className="text-center md:text-left">
                        <div className="flex justify-between items-start">
                             <Badge variant="outline">{cat.type} Cat</Badge>
                             <Badge variant="secondary" className="flex items-center gap-1.5">
                               <Eye className="w-4 h-4" />
                               <span>{revealCount}</span>
                            </Badge>
                        </div>
                        <DialogTitle className="text-3xl font-headline mt-2">{displayName}</DialogTitle>
                        <DialogDescription className="text-base italic text-accent">"{cat.tagline}"</DialogDescription>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground text-center md:text-left">{cat.description}</p>
                    
                    <div className="space-y-3 flex-grow">
                         <Card>
                            <CardContent className="p-3">
                                <div className="flex items-start gap-3">
                                    <Swords className="w-5 h-5 mt-0.5 text-green-500 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-sm">Strength</h4>
                                        <p className="text-xs text-muted-foreground">{cat.strength}</p>
                                    </div>
                                </div>
                            </CardContent>
                         </Card>
                          <Card>
                            <CardContent className="p-3">
                                <div className="flex items-start gap-3">
                                    <HeartCrack className="w-5 h-5 mt-0.5 text-red-500 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-sm">Weakness</h4>
                                        <p className="text-xs text-muted-foreground">{cat.weakness}</p>
                                    </div>
                                </div>
                            </CardContent>
                         </Card>
                    </div>

                    <Button onClick={onOpenDiary} className="w-full mt-auto" variant="outline">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Diary
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
