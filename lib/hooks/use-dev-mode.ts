
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import catData from '@/lib/cat-data.json';
import { CatState, CatOutcome } from '@/lib/types';

const allCats = catData.cats as {id: string, name: string, description: string, type: string, points: number}[];

export function useDevMode({
    handleReset,
    setCatState,
    setMessage,
    setRevealedCatName,
    setRevealedCatId
}: {
    handleReset: () => void;
    setCatState: (state: CatState) => void;
    setMessage: (message: string) => void;
    setRevealedCatName: (name: string | null) => void;
    setRevealedCatId?: (id: string | null) => void;
}) {
    const [isDevMode, setIsDevMode] = useState(false);
    const [devModeClickCount, setDevModeClickCount] = useState(0);
    const { toast } = useToast();

    const handleTitleClick = () => {
        const newCount = devModeClickCount + 1;
        setDevModeClickCount(newCount);
        if (newCount >= 7) {
            const newDevModeState = !isDevMode;
            setIsDevMode(newDevModeState);
            setDevModeClickCount(0);
            toast({
                title: `Dev mode ${newDevModeState ? 'enabled' : 'disabled'}`,
                description: 'Click the title 7 times to toggle.',
            });
        }
    };

    const handleDevCatSelect = (catId: string) => {
        if (!isDevMode) return;

        handleReset();

        setTimeout(() => {
            const selectedCat = allCats.find(c => c.id === catId);
            if (!selectedCat) return;

            let outcome: CatOutcome = 'initial';
            if (selectedCat.type === 'Alive') outcome = 'alive';
            else if (selectedCat.type === 'Dead') outcome = 'dead';
            else if (selectedCat.type === 'Paradox') outcome = 'paradox';

            if (setRevealedCatId) setRevealedCatId(catId);
            setCatState({ outcome: outcome, catId: undefined });

            setTimeout(() => {
                setCatState({ outcome, catId });
                setRevealedCatName(selectedCat.name);
                setMessage(`(Dev) Displaying ${selectedCat.name}.`);
            }, 300);

        }, 100);
    };

    return { isDevMode, handleTitleClick, handleDevCatSelect, allCats };
}
