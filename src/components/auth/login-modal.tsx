'use client';

import { useMemo } from 'react';
import { useAuth } from '@/context/auth-context';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoginCard } from '@/components/auth/login-card';
import { Badge } from '@/components/ui/badge';

export function LoginModal() {
  const { loginModalOpen, closeLoginModal, loginPromptReason } = useAuth();

  const reasonLabel = useMemo(() => {
    switch (loginPromptReason) {
      case 'box-opens':
        return 'Triggered by multiple box opens';
      case 'points':
        return 'Triggered by reaching 10+ points';
      case 'customize':
        return 'Triggered while customizing the box';
      case 'gallery':
        return 'Triggered from the gallery';
      default:
        return null;
    }
  }, [loginPromptReason]);

  return (
    <Dialog open={loginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader className="space-y-2">
          <Badge variant="outline" className="w-fit">Sync Available</Badge>
          <DialogTitle className="text-lg sm:text-xl">Sign in to keep your collection everywhere</DialogTitle>
          <DialogDescription>
            Your points, cats, favourites, and layout preferences will stay in sync across every device once you log in.
          </DialogDescription>
          {reasonLabel && (
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{reasonLabel}</p>
          )}
        </DialogHeader>
        <LoginCard
          className="shadow-none border border-border/50 bg-card"
          allowGuest={false}
          onSuccess={closeLoginModal}
        />
      </DialogContent>
    </Dialog>
  );
}
