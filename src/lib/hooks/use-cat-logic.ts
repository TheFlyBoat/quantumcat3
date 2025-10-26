
'use client';

<<<<<<< HEAD
import { useState, useEffect, useCallback, useRef } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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

<<<<<<< HEAD
const LAST_OPEN_STORAGE_KEY = 'quantum-cat-last-open';

const getStartOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getNextMidnight = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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
<<<<<<< HEAD
    const [isDailyLocked, setIsDailyLocked] = useState(false);
    const [nextAvailableAt, setNextAvailableAt] = useState<number | null>(null);
    const unlockTimerRef = useRef<ReturnType<typeof setTimeout>>();
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

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

<<<<<<< HEAD
    const lockForToday = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            const now = new Date();
            localStorage.setItem(LAST_OPEN_STORAGE_KEY, now.toISOString());
            setIsDailyLocked(true);
            setNextAvailableAt(getNextMidnight(now).getTime());
        } catch (error) {
            console.warn('Unable to persist daily lock state', error);
        }
    }, []);

    const refreshDailyLock = useCallback(() => {
        if (typeof window === 'undefined') {
            setIsDailyLocked(false);
            setNextAvailableAt(null);
            return;
        }

        let stored: string | null = null;
        try {
            stored = localStorage.getItem(LAST_OPEN_STORAGE_KEY);
        } catch (error) {
            console.warn('Unable to read daily lock state', error);
        }

        const now = new Date();
        const todayStart = getStartOfDay(now);
        let locked = false;

        if (stored) {
            const parsed = new Date(stored);
            if (!Number.isNaN(parsed.getTime())) {
                const lastDayStart = getStartOfDay(parsed);
                locked = lastDayStart.getTime() === todayStart.getTime();
            }
        }

        setIsDailyLocked(locked);
        setNextAvailableAt(locked ? getNextMidnight(now).getTime() : null);
    }, []);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (typeof window !== 'undefined') {
            timeoutId = window.setTimeout(() => {
                refreshDailyLock();
            }, 0);
        }

        return () => {
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [refreshDailyLock]);

    useEffect(() => {
        if (unlockTimerRef.current) {
            clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = undefined;
        }

        if (!isDailyLocked || !nextAvailableAt) {
            return;
        }

        const now = Date.now();
        const delay = nextAvailableAt - now;

        if (delay <= 0) {
            if (typeof window !== 'undefined') {
                window.setTimeout(() => {
                    refreshDailyLock();
                }, 0);
            }
            return;
        }

        unlockTimerRef.current = setTimeout(() => {
            refreshDailyLock();
        }, delay + 1000);

        return () => {
            if (unlockTimerRef.current) {
                clearTimeout(unlockTimerRef.current);
                unlockTimerRef.current = undefined;
            }
        };
    }, [isDailyLocked, nextAvailableAt, refreshDailyLock]);

    useEffect(() => {
        return () => {
            if (unlockTimerRef.current) {
                clearTimeout(unlockTimerRef.current);
            }
        };
    }, []);

    const handleBoxClick = async () => {
        if (isLoading || catState.outcome !== 'initial' || isRevealing) return;
        if (isDailyLocked) {
            playSound('haptic-3');
            return;
        }
=======
    const handleBoxClick = async () => {
        if (isLoading || catState.outcome !== 'initial' || isRevealing) return;
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

        onInteraction?.();

        playSound('click-1');
<<<<<<< HEAD
        lockForToday();
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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
<<<<<<< HEAD
        if (isDailyLocked) {
            playSound('haptic-3');
            return;
        }
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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

<<<<<<< HEAD
    return {
        catState,
        message,
        isLoading,
        isRevealing,
        revealedCatName,
        handleBoxClick,
        handleReset,
        setCatState,
        setMessage,
        setRevealedCatName,
        isDailyLocked,
        nextAvailableAt,
        refreshDailyLock,
    };
=======
    return { catState, message, isLoading, isRevealing, revealedCatName, handleBoxClick, handleReset, setCatState, setMessage, setRevealedCatName };
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
}
