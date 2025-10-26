
'use client';

<<<<<<< HEAD
import { useCallback, useEffect, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { usePoints } from '@/context/points-context';
import { useBadges } from '@/context/badge-context';
import { useAuth } from '@/context/auth-context';
import { defaultUserData, saveUserData } from '@/lib/user-data';

export interface ShareAsset {
    dataUrl: string;
    file: File;
}

export function useShare(message: string) {
    const shareCardRef = useRef<HTMLDivElement>(null);
    const { addPoints } = usePoints();
    const { isBadgeUnlocked, unlockBadge } = useBadges();
    const { user, setUserData, storageMode, userData } = useAuth();
    const sessionShareCountRef = useRef(0);

    useEffect(() => {
        sessionShareCountRef.current = userData?.shareCount ?? 0;
    }, [userData]);

    const createShareAsset = useCallback(async (): Promise<ShareAsset> => {
        if (!shareCardRef.current || !message) {
            throw new Error('Share content is not ready yet.');
        }

        const dataUrl = await htmlToImage.toPng(shareCardRef.current, {
            cacheBust: true,
            pixelRatio: 2,
            fontEmbedCSS: `@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');`
        });
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'quantum-cat.png', { type: 'image/png' });

        return { dataUrl, file };
    }, [message]);

    const rewardShare = useCallback(() => {
        let newShareCount = 0;

        setUserData(prevData => {
            const base = prevData ?? defaultUserData;
            newShareCount = (base.shareCount ?? 0) + 1;
            return { ...base, shareCount: newShareCount };
        });

        if (storageMode === 'cloud' && user && user !== 'guest') {
            void saveUserData(user.uid, { shareCount: newShareCount });
        } else {
            sessionShareCountRef.current = newShareCount;
        }

        addPoints(10);

        if (newShareCount === 1 && !isBadgeUnlocked('storyteller')) {
            unlockBadge('storyteller');
        }

        if (newShareCount >= 5 && !isBadgeUnlocked('viral-cat')) {
            unlockBadge('viral-cat');
        }
    }, [addPoints, isBadgeUnlocked, unlockBadge, setUserData, storageMode, user]);

    return { shareCardRef, createShareAsset, rewardShare };
=======
import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { useToast } from '@/hooks/use-toast';
import { usePoints } from '@/context/points-context';
import { useBadges } from '@/context/badge-context';
import { playSound } from '@/lib/audio';

export function useShare(message: string, revealedCatName: string | null) {
    const shareCardRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const { addPoints } = usePoints();
    const { isBadgeUnlocked, unlockBadge } = useBadges();

    const handleShare = async () => {
        playSound('click-2');
        if (!shareCardRef.current || !message) {
            setTimeout(() => toast({
                title: 'Cannot share yet',
                description: 'The reveal is not complete.',
                variant: 'destructive',
            }), 0);
            return;
        }

        setTimeout(() => toast({
            title: 'Generating your share card...',
            description: 'Please wait a moment.',
        }), 0);

        try {
            const shareCount = parseInt(localStorage.getItem('quantum-cat-share-count') || '0');
            const newShareCount = shareCount + 1;
            localStorage.setItem('quantum-cat-share-count', newShareCount.toString());
            addPoints(10);

            if (newShareCount === 1 && !isBadgeUnlocked('first-share')) {
                unlockBadge('first-share');
            }

            if (newShareCount >= 10 && !isBadgeUnlocked('10-shares')) {
                unlockBadge('10-shares');
            }

            const dataUrl = await htmlToImage.toPng(shareCardRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                fontEmbedCSS: `@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');`
            });
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'quantum-cat.png', { type: 'image/png' });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'The Quantum Cat',
                    text: `I opened the box and my cat is a ${revealedCatName}! What state will your cat be in?`,
                    files: [file],
                    url: 'https://thequantumcat.app',
                });
            } else {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'quantum-cat.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => toast({
                    title: "Image downloaded!",
                    description: "Sharing isn't supported on this browser, so the image was downloaded instead to your Downloads folder.",
                }), 0);
            }
        } catch (error) {
            console.error('Sharing failed:', error);
            setTimeout(() => toast({
                title: 'Sharing Failed',
                description: 'Could not generate or share the image. Please try again.',
                variant: 'destructive',
            }), 0);
        }
    };

    return { shareCardRef, handleShare };
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
}
