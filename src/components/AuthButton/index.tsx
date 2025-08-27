'use client';
import { walletAuth } from '@/auth/wallet';
import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { useMiniKit } from '@worldcoin/minikit-js/minikit-provider';
import { useCallback, useEffect, useState, ButtonHTMLAttributes } from 'react';

// -------------------------------
// Props extendidas para AuthButton
// -------------------------------
interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // opcional, para Tailwind
}

export const AuthButton = ({ className, ...props }: AuthButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) return;

    setIsPending(true);
    try {
      await walletAuth();
    } catch (error) {
      console.error('Error al autenticar Wallet', error);
    } finally {
      setIsPending(false);
    }
  }, [isInstalled, isPending]);

  useEffect(() => {
    const authenticate = async () => {
      if (isInstalled && !isPending) {
        setIsPending(true);
        try {
          await walletAuth();
        } catch (error) {
          console.error('Error automático al autenticar Wallet', error);
        } finally {
          setIsPending(false);
        }
      }
    };
    authenticate();
  }, [isInstalled, isPending]);

  return (
    <LiveFeedback
      label={{
        failed: 'Failed to login',
        pending: 'Logging in',
        success: 'Logged in',
      }}
      state={isPending ? 'pending' : undefined}
    >
      <Button
        onClick={onClick}
        disabled={isPending}
        size="lg"
        variant="primary"
        className={className} // <-- ahora acepta Tailwind
        {...props}           // <-- permite pasar otras props a Button
      >
        Login with Wallet
      </Button>
    </LiveFeedback>
  );
};
