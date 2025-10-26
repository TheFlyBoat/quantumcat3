
'use client';

import { useEffect, useState } from 'react';
import { QuantumCatBox } from '@/components/quantum-cat-box';
import { MessageDisplay } from '@/components/message-display';
import { DevPanel } from '@/components/dev-panel';
import { TutorialOverlay } from '@/components/tutorial-overlay';
import { MainActions } from '@/components/main-actions';
import { ShareCard } from '@/components/share-card';
import { TitleDisplay } from '@/components/title-display';
import { useCatLogic } from '@/lib/hooks/use-cat-logic';
import { useDevMode } from '@/lib/hooks/use-dev-mode';
import { useShare } from '@/lib/hooks/use-share';
import { useDiary } from '@/context/diary-context';
import { useBadges } from '@/context/badge-context';
import { useSound } from '@/context/sound-context';
import { useBoxSkin } from '@/context/box-skin-context';
import { useToast } from '@/hooks/use-toast';
import { playSound } from '@/lib/audio';
import { cn } from '@/lib/utils';

export default function HomePage({ onInteraction, setRevealedCatId }: { onInteraction?: () => void; setRevealedCatId?: (id: string | null) => void; }) {
    const [isMessageSaved, setIsMessageSaved] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [isAmbientShaking, setIsAmbientShaking] = useState(false);

    const { toast } = useToast();
    const { addDiaryEntry } = useDiary();
    const { lastUnlockedBadgeId, triggerCelebration } = useBadges();
    const { reduceMotion } = useSound();
    const { selectedSkin } = useBoxSkin();

    const { catState, message, isLoading, isRevealing, revealedCatName, handleBoxClick, handleReset, setCatState, setMessage, setRevealedCatName } = useCatLogic({
        onInteraction,
        setRevealedCatId,
        onCatReveal: (catId, msg) => {
            setIsMessageSaved(false);
        }
    });

    const { isDevMode, handleTitleClick, handleDevCatSelect, allCats } = useDevMode({
        handleReset,
        setCatState,
        setMessage,
        setRevealedCatName,
        setRevealedCatId
    });

    const { shareCardRef, handleShare } = useShare(message, revealedCatName);

    useEffect(() => {
        try {
            const tutorialSeen = localStorage.getItem('quantum-cat-tutorial-seen');
            if (!tutorialSeen) {
                setShowTutorial(true);
            }
        } catch (e) {
            console.error("Could not access localStorage for tutorial", e);
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (catState.outcome === 'initial' && !isLoading && !isRevealing && !reduceMotion) {
            interval = setInterval(() => {
                const shouldShake = Math.random() < 0.2;
                if (shouldShake) {
                    setIsAmbientShaking(true);
                    setTimeout(() => setIsAmbientShaking(false), 500);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [catState.outcome, isLoading, isRevealing, reduceMotion]);

    useEffect(() => {
        if (message && lastUnlockedBadgeId) {
            setTimeout(() => {
                triggerCelebration();
            }, 3000);
        }
    }, [message, lastUnlockedBadgeId, triggerCelebration]);

    const handleSaveMessage = () => {
        if (isMessageSaved || !catState.catId || !message) return;
        playSound('haptic-1');
        addDiaryEntry(catState.catId, message);
        setIsMessageSaved(true);
        toast({
            title: "Message Saved",
            description: "You can find it in the cat's diary in your gallery.",
        });
    };

    const onBoxClick = () => {
        if (showTutorial) {
            setShowTutorial(false);
            try {
                localStorage.setItem('quantum-cat-tutorial-seen', 'true');
            } catch (e) {
                console.error("Could not set localStorage for tutorial", e);
            }
        }
        handleBoxClick();
    };

    return (
        <>
            <div className="absolute left-[-1000px] top-[-1000px]">
                <div ref={shareCardRef} style={{ width: '320px', height: '520px' }}>
                    <ShareCard catState={catState} message={message} boxSkin={selectedSkin} />
                </div>
            </div>

            <TitleDisplay name={revealedCatName} onTitleClick={handleTitleClick} reduceMotion={reduceMotion} />

            {isDevMode && <DevPanel allCats={allCats} onCatSelect={handleDevCatSelect} catState={catState} message={message} />}

            <div className="relative h-64 flex items-center justify-center mt-4">
                {showTutorial && <TutorialOverlay reduceMotion={reduceMotion} />}
                <QuantumCatBox
                    onClick={onBoxClick}
                    isLoading={isLoading}
                    catState={catState}
                    isAmbientShaking={isAmbientShaking}
                />
            </div>

            <div className="h-28 mt-4 flex flex-col justify-center items-center">
                {catState.outcome !== 'initial' && (
                    <div className='w-full flex flex-col items-center'>
                        <MessageDisplay message={message} catState={catState} />
                        {message && (
                            <MainActions
                                onSave={handleSaveMessage}
                                onShare={handleShare}
                                onReset={handleReset}
                                isSaved={isMessageSaved}
                                reduceMotion={reduceMotion}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
