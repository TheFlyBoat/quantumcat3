
'use client';

import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { playSound } from '@/lib/audio';

interface NicknameDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onNicknameSet: (nickname: string) => void;
}

export function NicknameDialog({ isOpen, onOpenChange, onNicknameSet }: NicknameDialogProps) {
    const { updateDisplayName } = useAuth();
    const [nickname, setNickname] = useState('');

    const handleNicknameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedNickname = nickname.trim();
        if (trimmedNickname.length > 2) {
            await updateDisplayName(trimmedNickname);
            onNicknameSet(trimmedNickname);
            playSound('celebration-magic');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create your nickname</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleNicknameSubmit} className="space-y-4">
                    <Input
                        placeholder="Enter your nickname..."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={20}
                    />
                    <Button type="submit" className="w-full">Save Nickname</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
