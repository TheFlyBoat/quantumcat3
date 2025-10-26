'use client';

import { useMemo } from 'react';
import { useAuth, LoginPromptReason } from '@/context/auth-context';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const reasonCopy: Record<LoginPromptReason, string> = {
  'box-opens': 'You have opened the box a few times now. Let\'s keep those discoveries safe.',
  'points': 'You\'ve earned a stash of Fish Points. Save them before another timeline steals them.',
  'customize': 'You\'re about to remix the box. Save your layouts across every universe.',
  'gallery': 'Your gallery is filling up. Lock it in before the quantum fog rolls in.',
};

export function LoginPrompt() {
  const { loginPromptOpen, loginPromptReason, dismissLoginPrompt, openLoginModal, storageMode } = useAuth();

  const supportingCopy = useMemo(() => {
    if (!loginPromptReason) return null;
    return reasonCopy[loginPromptReason];
  }, [loginPromptReason]);

  if (storageMode === 'cloud') {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dismissLoginPrompt();
    }
  };

  return (
    <Dialog open={loginPromptOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <Badge variant="outline" className="w-fit mb-2 text-xs font-semibold">Guest Mode</Badge>
          <DialogTitle className="text-lg sm:text-xl">🐾 Want to keep your cats safe in this reality forever?</DialogTitle>
          <DialogDescription>
            Save your progress to never lose your collection, badges, and points.
          </DialogDescription>
        </DialogHeader>
        {supportingCopy && (
          <p className={cn('text-sm text-muted-foreground', 'mt-2')}>{supportingCopy}</p>
        )}
        <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <Button variant="ghost" onClick={dismissLoginPrompt} className="w-full sm:w-auto">
            Not Now
          </Button>
          <Button onClick={() => openLoginModal(loginPromptReason ?? undefined)} className="w-full sm:w-auto">
            Save My Cats
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
