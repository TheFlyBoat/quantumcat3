<<<<<<< HEAD
'use client';

import { useEffect, useMemo, useState } from 'react';
=======

'use client';

import { useEffect, useState } from 'react';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { QuantumCatBox } from '@/components/quantum-cat-box';
import { MessageDisplay } from '@/components/message-display';
import { DevPanel } from '@/components/dev-panel';
import { TutorialOverlay } from '@/components/tutorial-overlay';
<<<<<<< HEAD
import { OnboardingTour } from '@/components/onboarding-tour';
import { MainActions } from '@/components/main-actions';
import { ShareCard } from '@/components/share-card';
import { TitleDisplay } from '@/components/title-display';
import { SplashScreen } from '@/components/splash-screen';
import { useCatLogic } from '@/lib/hooks/use-cat-logic';
import { useDevMode } from '@/lib/hooks/use-dev-mode';
import { ShareAsset, useShare } from '@/lib/hooks/use-share';
=======
import { MainActions } from '@/components/main-actions';
import { ShareCard } from '@/components/share-card';
import { TitleDisplay } from '@/components/title-display';
import { useCatLogic } from '@/lib/hooks/use-cat-logic';
import { useDevMode } from '@/lib/hooks/use-dev-mode';
import { useShare } from '@/lib/hooks/use-share';
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
import { useDiary } from '@/context/diary-context';
import { useBadges } from '@/context/badge-context';
import { useSound } from '@/context/sound-context';
import { useBoxSkin } from '@/context/box-skin-context';
import { useToast } from '@/hooks/use-toast';
import { playSound } from '@/lib/audio';
<<<<<<< HEAD
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export default function HomePage({ onInteraction, setRevealedCatId }: { onInteraction?: () => void; setRevealedCatId?: (id: string | null) => void; }) {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showTapHint, setShowTapHint] = useState(false);
    const [isAmbientShaking, setIsAmbientShaking] = useState(false);
    const [isGeneratingShare, setIsGeneratingShare] = useState(false);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [shareAsset, setShareAsset] = useState<ShareAsset | null>(null);
    const [currentCatId, setCurrentCatId] = useState<string | null>(null);
    const [showSplash, setShowSplash] = useState(true);
    const [unlockCountdown, setUnlockCountdown] = useState('');

    const { toast } = useToast();
    const { toggleDiaryEntry, isMessageSaved: isDiaryMessageSaved } = useDiary();
    const { lastUnlockedBadgeId, triggerCelebration } = useBadges();
    const { reduceMotion } = useSound();
    const { selectedSkin } = useBoxSkin();
    const { storageMode, localProgressMessageSeen, markLocalMessageSeen } = useAuth();

    const {
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
    } = useCatLogic({
        onInteraction,
        setRevealedCatId: (id) => {
            setCurrentCatId(id);
            setRevealedCatId?.(id);
        },
        onCatReveal: (catId: string, _message: string) => {
            setCurrentCatId(catId);
        }
    });
=======
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

    const { catState = { outcome: 'initial' }, message, isLoading, isRevealing, revealedCatName, handleBoxClick, handleReset, setCatState, setMessage, setRevealedCatName } = useCatLogic({
        onInteraction,
        setRevealedCatId,
        onCatReveal: (catId, msg) => {
            setIsMessageSaved(false);
        }
    })|| {};
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68

    const { isDevMode, handleTitleClick, handleDevCatSelect, allCats } = useDevMode({
        handleReset,
        setCatState,
        setMessage,
        setRevealedCatName,
        setRevealedCatId
    });

<<<<<<< HEAD
    const { shareCardRef, createShareAsset, rewardShare } = useShare(message);
    const revealedCatId = catState?.catId;
    const activeCatId = catState?.catId ?? currentCatId;
    const isCurrentMessageSaved = !!(activeCatId && message && isDiaryMessageSaved(activeCatId, message));

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                const alreadySeen = sessionStorage.getItem('quantum-cat-splash') === 'seen';
                if (alreadySeen) {
                    setShowSplash(false);
                }
            }
        } catch (error) {
            console.warn('Unable to access sessionStorage for splash screen state', error);
        }
    }, []);

    useEffect(() => {
        try {
            const onboardingSeen = localStorage.getItem('quantum-cat-onboarding-v1');
            if (!onboardingSeen) {
                setShowOnboarding(true);
            }
        } catch (e) {
            console.error("Could not access localStorage for onboarding", e);
=======
    const { shareCardRef, handleShare } = useShare(message, revealedCatName);

    useEffect(() => {
        try {
            const tutorialSeen = localStorage.getItem('quantum-cat-tutorial-seen');
            if (!tutorialSeen) {
                setShowTutorial(true);
            }
        } catch (e) {
            console.error("Could not access localStorage for tutorial", e);
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
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
<<<<<<< HEAD
        if (!message || !lastUnlockedBadgeId || !revealedCatId || isRevealing || isLoading) return;

        const words = message.trim().split(/\s+/).filter(Boolean);
        const estimatedReadingTime = Math.min(8000, Math.max(2500, words.length * 400));

        const celebrationDelay = setTimeout(() => {
            triggerCelebration();
        }, estimatedReadingTime);

        return () => clearTimeout(celebrationDelay);
    }, [message, lastUnlockedBadgeId, triggerCelebration, revealedCatId, isRevealing, isLoading]);

    useEffect(() => {
        if (storageMode !== 'local') return;
        if (localProgressMessageSeen) return;
        if (catState?.outcome === 'initial' || !catState?.catId) return;

        toast({
            title: 'Progress saved locally',
            description: 'Your cats and fortunes are saved on this device.',
        });
        markLocalMessageSeen();
    }, [storageMode, localProgressMessageSeen, catState?.outcome, catState?.catId, toast, markLocalMessageSeen]);

    useEffect(() => {
        if (!isDailyLocked || !nextAvailableAt) {
            setUnlockCountdown('');
            return;
        }

        const updateCountdown = () => {
            const diff = nextAvailableAt - Date.now();
            if (diff <= 0) {
                setUnlockCountdown('');
                if (typeof window !== 'undefined') {
                    window.setTimeout(() => {
                        refreshDailyLock();
                    }, 0);
                }
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            let formatted: string;
            if (hours > 0) {
                formatted = `${hours}h ${minutes.toString().padStart(2, '0')}m`;
            } else if (minutes > 0) {
                formatted = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
            } else {
                formatted = `${seconds}s`;
            }

            setUnlockCountdown(formatted);
        };

        updateCountdown();
        const interval = window.setInterval(updateCountdown, 1000);

        return () => window.clearInterval(interval);
    }, [isDailyLocked, nextAvailableAt, refreshDailyLock]);

    const handleToggleSaveMessage = () => {
        if (!activeCatId || !message) return;
        playSound('haptic-1');
        const saved = toggleDiaryEntry(activeCatId, message);
        toast({
            description: saved
                ? "Message saved to this cat's diary in your gallery."
                : "Message removed from this cat's diary.",
        });
    };

    const handleSplashComplete = () => {
        setShowSplash(false);
        try {
            sessionStorage.setItem('quantum-cat-splash', 'seen');
        } catch (error) {
            console.warn('Unable to persist splash screen state', error);
        }
    };

    const handleOnboardingDismiss = () => {
        setShowOnboarding(false);
        setShowTapHint(true);
        try {
            localStorage.setItem('quantum-cat-onboarding-v1', 'true');
        } catch (e) {
            console.error("Could not set localStorage for onboarding", e);
        }
    };

    const onBoxClick = () => {
        if (showOnboarding) {
            return;
        }
        if (isDailyLocked) {
            toast({
                title: 'Quantum core recharging',
                description: unlockCountdown
                    ? `Come back in ${unlockCountdown} for the next observation.`
                    : 'Come back tomorrow at midnight for the next observation.',
            });
            return;
        }
        if (showTapHint) {
            setShowTapHint(false);
=======
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
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        }
        handleBoxClick();
    };

<<<<<<< HEAD
    const shareText = useMemo(() => {
        if (revealedCatName) {
            return `I opened the box and my cat is a ${revealedCatName}! What state will your cat be in?`;
        }
        return 'I opened the quantum cat box! What state will your cat be in?';
    }, [revealedCatName]);

    const nativeShareAvailable = useMemo(() => {
        return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    }, []);

    const downloadAttributeSupported = useMemo(() => {
        if (typeof document === 'undefined') {
            return false;
        }
        const anchor = document.createElement('a');
        return typeof anchor.download !== 'undefined';
    }, []);

    const handleShareRequest = async () => {
        if (isGeneratingShare) return;
        playSound('click-2');

        setIsGeneratingShare(true);
        toast({
            title: 'Generating your share card...',
            description: 'Please wait a moment.',
        });

        try {
            const asset = await createShareAsset();
            setShareAsset(asset);
            setIsShareDialogOpen(true);
            toast({
                title: 'Share card ready!',
                description: 'Choose how you want to share it.',
            });
        } catch (error) {
            if (error instanceof Error && error.message.includes('not ready')) {
                toast({
                    title: 'Cannot share yet',
                    description: 'The reveal is not complete.',
                    variant: 'destructive',
                });
            } else {
                console.error('Failed to prepare share card:', error);
                toast({
                    title: 'Sharing Failed',
                    description: 'Could not generate the image. Please try again.',
                    variant: 'destructive',
                });
            }
        } finally {
            setIsGeneratingShare(false);
        }
    };

    const handleNativeShare = async () => {
        if (!shareAsset) return;
        if (!nativeShareAvailable) {
            toast({
                title: 'Sharing not supported',
                description: 'Your device does not support direct sharing.',
                variant: 'destructive',
            });
            return;
        }

        try {
            if (typeof navigator.canShare === 'function' && !navigator.canShare({ files: [shareAsset.file] })) {
                throw new Error('Unsupported share type');
            }

            await navigator.share({
                title: 'The Quantum Cat',
                text: shareText,
                files: [shareAsset.file],
                url: 'https://thequantumcat.app',
            });

            rewardShare();
            toast({
                title: 'Shared!',
                description: '10 Fish Points awarded.',
            });
            setIsShareDialogOpen(false);
            setShareAsset(null);
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                toast({
                    title: 'Share canceled',
                    description: 'No worries—try again whenever you like.',
                });
                return;
            }

            console.error('Native share failed:', error);
            toast({
                title: 'Share unavailable',
                description: 'Try saving the image and sharing it manually.',
                variant: 'destructive',
            });
        }
    };

    const handleDownloadShare = () => {
        if (!shareAsset) return;

        try {
            if (downloadAttributeSupported) {
                const link = document.createElement('a');
                link.href = shareAsset.dataUrl;
                link.download = 'quantum-cat.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                window.open(shareAsset.dataUrl, '_blank', 'noopener,noreferrer');
            }

            rewardShare();
            toast({
                title: 'Image saved!',
                description: '10 Fish Points awarded. Share it from your gallery.',
            });
            setIsShareDialogOpen(false);
            setShareAsset(null);
        } catch (error) {
            console.error('Failed to download share card:', error);
            toast({
                title: 'Download failed',
                description: 'Try long-pressing the image or taking a screenshot.',
                variant: 'destructive',
            });
        }
    };

    const closeShareDialog = () => {
        setIsShareDialogOpen(false);
        setShareAsset(null);
    };

    return (
        <>
            {showSplash ? (
                <SplashScreen onComplete={handleSplashComplete} />
            ) : (
                <>
                    <OnboardingTour
                        open={showOnboarding}
                        onComplete={handleOnboardingDismiss}
                        onSkip={handleOnboardingDismiss}
                    />

                    <div className="absolute left-[-1000px] top-[-1000px]">
                        <div ref={shareCardRef} style={{ width: '320px', height: '520px' }}>
                            <ShareCard catState={catState} message={message} boxSkin={selectedSkin} />
                        </div>
                    </div>

                    <TitleDisplay name={revealedCatName} onTitleClick={handleTitleClick} reduceMotion={reduceMotion} />

                    {isDevMode && <DevPanel allCats={allCats} onCatSelect={handleDevCatSelect} catState={catState} message={message} />}

                    <div className="relative h-64 flex items-center justify-center mt-4">
                        {showTapHint && !isDailyLocked && <TutorialOverlay reduceMotion={reduceMotion} />}
                        <QuantumCatBox
                            onClick={onBoxClick}
                            isLoading={isLoading}
                            isRevealing={isRevealing}
                            catState={catState}
                            isAmbientShaking={isAmbientShaking}
                            isLocked={isDailyLocked}
                            lockMessage={isDailyLocked ? (unlockCountdown ? `Reopens in ${unlockCountdown}` : 'Reopens at midnight') : undefined}
                        />
                    </div>

                    <div className="h-28 mt-4 flex flex-col justify-center items-center">
                        {catState.outcome !== 'initial' && (
                            <div className='w-full flex flex-col items-center'>
                                <MessageDisplay message={message} catState={catState} />
                                {message && (
                                    <MainActions
                                        onSave={handleToggleSaveMessage}
                                        onShare={handleShareRequest}
                                        onReset={handleReset}
                                        isSaved={isCurrentMessageSaved}
                                        reduceMotion={reduceMotion}
                                        isShareDisabled={isGeneratingShare}
                                        isResetDisabled={isDailyLocked}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    <Dialog open={isShareDialogOpen} onOpenChange={(open) => {
                        if (!open) {
                            closeShareDialog();
                        }
                    }}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Share your discovery</DialogTitle>
                                <DialogDescription>
                                    Send the card to Instagram, WhatsApp, or anywhere else.
                                </DialogDescription>
                            </DialogHeader>

                            {shareAsset ? (
                                <div className="space-y-4">
                                    <div className="overflow-hidden rounded-lg border bg-background/50">
                                        <img
                                            src={shareAsset.dataUrl}
                                            alt="Quantum Cat share card"
                                            className="w-full"
                                        />
                                    </div>

                                    {nativeShareAvailable && (
                                        <Button onClick={handleNativeShare}>
                                            Share via device…
                                        </Button>
                                    )}

                                    <Button variant="outline" onClick={handleDownloadShare}>
                                        Save image to share manually
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center">
                                        Tip: After saving, open your Photos or Files app and share the image to Instagram or WhatsApp.
                                    </p>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Preparing your card…</p>
                            )}
                        </DialogContent>
                    </Dialog>
                    {isDailyLocked && (
                        <div className="mt-12 flex justify-center px-6 pb-6">
                            <p className="max-w-md text-center text-sm text-muted-foreground">
                                {unlockCountdown
                                    ? `Daily observation complete. The box recharges in ${unlockCountdown}.`
                                    : 'Daily observation complete. The box will recharge at midnight.'}
                            </p>
                        </div>
                    )}
                </>
            )}
=======
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
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
        </>
    );
}
