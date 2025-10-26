
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import catData from '@/lib/cat-data.json';
import { useCatCollection } from '@/context/cat-collection-context';
import { Lock } from 'lucide-react';
import { GingerCatIcon, GhostCatIcon, ShadowCatIcon, BonesCatIcon, IdentityCrisisCatIcon, AltCat, BreuCatIcon, ZumbiCatIcon, BlizzardCatIcon, VoodooCatIcon, SleepyCatIcon, HologramCatIcon, GravityCatIcon, GlitchCatIcon } from '@/components/cats';
import { useState } from 'react';
import { CatDiarySheet } from '@/components/cat-diary-sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CatProfileDialog } from '@/components/cat-profile-dialog';

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

export default function GalleryPage() {
    const allCats = catData.cats as {id: string, name: string, description: string, type: string, tagline: string, strength: string, weakness: string}[];
    
    const catGroups = allCats.reduce((acc, cat) => {
        if (!acc[cat.type]) {
            acc[cat.type] = [];
        }
        acc[cat.type].push(cat);
        return acc;
    }, {} as Record<string, typeof allCats>);

    const groupOrder = ['Alive', 'Dead', 'Paradox'];

    const { isUnlocked } = useCatCollection();
    const [selectedCat, setSelectedCat] = useState<any | null>(null);
    const [diaryCat, setDiaryCat] = useState<any | null>(null);

    const handleCatClick = (cat: any) => {
        if (isUnlocked(cat.id)) {
            setSelectedCat(cat);
        }
    }

    const openDiaryForCat = (cat: any) => {
        setSelectedCat(null); // Close the profile dialog
        setDiaryCat(cat);
    }

    return (
        <div className="w-full space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Cat Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {groupOrder.map(groupName => (
                        <div key={groupName}>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">{groupName} Cats</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {catGroups[groupName]?.map((cat) => {
                                    const unlocked = isUnlocked(cat.id);
                                    const CatComponent = catComponentMap[cat.id];
                                    return (
                                        <Card 
                                            key={cat.id} 
                                            className={cn(
                                                "overflow-hidden aspect-square flex flex-col",
                                                unlocked ? 'cursor-pointer hover:border-primary' : 'cursor-default'
                                            )}
                                            onClick={() => handleCatClick(cat)}
                                        >
                                            <CardContent className={cn(
                                                "p-2 flex-grow h-full flex items-center justify-center relative",
                                                unlocked ? "bg-gradient-to-br from-primary/20 via-background to-background" : "bg-muted/50"
                                            )}>
                                                {unlocked && CatComponent ? (
                                                    <>
                                                        <CatComponent className="w-full h-full" />
                                                        <Badge variant="secondary" className="absolute top-2 right-2">{cat.type}</Badge>
                                                    </>
                                                ) : CatComponent ? (
                                                    <CatComponent className="w-full h-full silhouette" />
                                                ) : (
                                                    <Lock className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </CardContent>
                                            <CardFooter className="p-2 justify-center bg-background/50">
                                                <p className="text-sm font-bold text-center">{unlocked ? cat.name : '???'}</p>
                                            </CardFooter>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {selectedCat && (
                <CatProfileDialog
                    cat={selectedCat}
                    open={!!selectedCat}
                    onOpenChange={(isOpen) => !isOpen && setSelectedCat(null)}
                    onOpenDiary={() => openDiaryForCat(selectedCat)}
                />
            )}
            {diaryCat && (
                <CatDiarySheet 
                    cat={diaryCat} 
                    open={!!diaryCat}
                    onOpenChange={(isOpen) => !isOpen && setDiaryCat(null)}
                />
            )}
        </div>
    );
}
