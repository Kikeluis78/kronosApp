// src/components/AuthButton.tsx
'use client';
import { walletAuth } from '@/auth/wallet';
import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { useMiniKit } from '@worldcoin/minikit-js/minikit-provider';
import { useCallback, useEffect, useState, ButtonHTMLAttributes } from 'react';
import React from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ className, ...props }) => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) return;
    setIsPending(true);
    try { await walletAuth(); } 
    catch (error) { console.error(error); } 
    finally { setIsPending(false); }
  }, [isInstalled, isPending]);

  useEffect(() => {
    if (isInstalled && !isPending) {
      setIsPending(true);
      walletAuth().finally(() => setIsPending(false));
    }
  }, [isInstalled, isPending]);

  return (
    <LiveFeedback
      label={{ failed: 'Failed to login', pending: 'Logging in', success: 'Logged in' }}
      state={isPending ? 'pending' : undefined}
    >
      <Button
        onClick={onClick}
        disabled={isPending}
        size="lg"
        variant="primary"
        className={className}
        {...props}
      >
        Login with Wallet
      </Button>
    </LiveFeedback>
  );
};
