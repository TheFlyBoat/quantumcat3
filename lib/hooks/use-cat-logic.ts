
'use client';

import { useState, useEffect } from 'react';
import { CatState, CatOutcome } from '@/lib/types';
import { useAchievements } from '@/context/achievements-context';
import { useCatCollection } from '@/context/cat-collection-context';
import { usePoints } from '@/context/points-context';
import { generateCatMessage } from '@/ai/flows/generate-cat-message';
import fallbackMessages from '@/lib/fallback-messages.json';
import catData from '@/lib/cat-data.json';
import { playSound } from '@/lib/audio';
import { useBoxSkin } from '@/context/box-skin-context';
import { useTheme } from 'next-themes';

const outcomesData = catData.outcomes as Record<CatOutcome, { title: string; cats: { id: string, rarity: number }[] }>;
const allCats = catData.cats as {id: string, name: string, description: string, type: string, points: number}[];

export function useCatLogic({ onInteraction, setRevealedCatId, onCatReveal }: {
    onInteraction?: () => void;
    setRevealedCatId?: (id: string | null) => void;
    onCatReveal: (catId: string, message: string) => void;
}) {
    const [catState, setCatState] = useState<CatState>({ outcome: 'initial' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);
    const [revealedCatName, setRevealedCatName] = useState<string | null>(null);

    const { recordObservation } = useAchievements();
    const { unlockCat } = useCatCollection();
    const { addPoints } = usePoints();
    const { selectedSkin } = useBoxSkin();
    const { setTheme } = useTheme();

    useEffect(() => {
        if (setRevealedCatId) {
            setRevealedCatId(catState.catId || null);
        }
        if (catState.catId === 'breu') {
            setTheme('dark');
        } else {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme !== 'dark') {
                setTheme(storedTheme || 'light');
            }
        }
    }, [catState.catId, setRevealedCatId, setTheme]);

    const handleBoxClick = async () => {
        if (isLoading || catState.outcome !== 'initial' || isRevealing) return;

        onInteraction?.();

        playSound('click-1');
        setIsRevealing(true);
        setMessage('');
        setRevealedCatName(null);

        const randomState = Math.random();
        let determinedOutcome: CatOutcome;

        if (randomState < 0.47) {
            determinedOutcome = 'alive';
        } else if (randomState < 0.94) {
            determinedOutcome = 'dead';
        } else {
            determinedOutcome = 'paradox';
        }

        const outcomeInfo = outcomesData[determinedOutcome];
        const totalRarity = outcomeInfo.cats.reduce((sum, cat) => sum + cat.rarity, 0);
        let randomRarity = Math.random() * totalRarity;
        let selectedCatId: string | undefined;

        for (const cat of outcomeInfo.cats) {
            randomRarity -= cat.rarity;
            if (randomRarity <= 0) {
                selectedCatId = cat.id;
                break;
            }
        }
        if (!selectedCatId) {
            selectedCatId = outcomeInfo.cats[outcomeInfo.cats.length - 1].id;
        }

        recordObservation(selectedCatId, determinedOutcome);
        const cat = allCats.find(c => c.id === selectedCatId);
        if (cat) {
            unlockCat(cat.id, { celebrateImmediately: false });
        }

        generateCatMessage({}).then(response => {
            setMessage(response.message);
            onCatReveal(selectedCatId!, response.message);
        }).catch(error => {
            console.error("AI message generation failed:", error);
            const fallbackMessage = fallbackMessages.messages[Math.floor(Math.random() * fallbackMessages.messages.length)];
            setMessage(fallbackMessage);
            onCatReveal(selectedCatId!, fallbackMessage);
        });

        setTimeout(() => {
            setIsRevealing(false);
            setIsLoading(true);

            switch (selectedSkin) {
                case 'shiny':
                    playSound('reveal-shiny');
                    break;
                case 'cardboard':
                    playSound('reveal-cardboard');
                    break;
                default:
                    playSound('reveal-default');
                    break;
            }

            setTimeout(() => {
                setIsLoading(false);
                setCatState({ outcome: determinedOutcome, catId: undefined });

                setTimeout(() => {
                    setCatState({ outcome: determinedOutcome, catId: selectedCatId });
                }, 300);

                setTimeout(() => {
                    if (cat) {
                        setRevealedCatName(cat.name);
                        addPoints(cat.points);
                    }
                }, 800);

            }, 1400);
        }, 1500);
    };

    const handleReset = () => {
        onInteraction?.();
        playSound('click-2');
        if (setRevealedCatId) {
            setRevealedCatId(null);
        }
        if (document.documentElement.classList.contains('dark')) {
            const storedTheme = localStorage.getItem('theme');
            setTheme(storedTheme || 'light');
        }
        setCatState({ outcome: 'initial' });
        setMessage('');
        setRevealedCatName(null);
    };

    return { catState, message, isLoading, isRevealing, revealedCatName, handleBoxClick, handleReset, setCatState, setMessage, setRevealedCatName };
}
