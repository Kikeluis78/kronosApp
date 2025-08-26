'use client';

import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// Carga dinámica de ErudaProvider, solo en cliente
const ErudaProvider = dynamic(
  () => import('@/providers/Eruda').then((c) => c.ErudaProvider),
  { ssr: false },
);

// -------------------------------
// Props tipadas para ClientProviders
// -------------------------------
interface ClientProvidersProps {
  children: ReactNode;
  session: Session | null; // Datos de sesión de next-auth
}

/**
 * ClientProviders
 * -------------------------------
 * Wrapper global que provee contextos esenciales a toda la app
 *
 * Providers incluidos:
 * 1. ErudaProvider
 *    - Consola de depuración en desarrollo.
 * 2. MiniKitProvider
 *    - Requerido para funcionalidad Worldcoin MiniKit.
 * 3. SessionProvider
 *    - Contexto de sesión para autenticación de usuarios.
 */
export default function ClientProviders({
  children,
  session,
}: ClientProvidersProps) {
  return (
    <ErudaProvider>
      <MiniKitProvider>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </MiniKitProvider>
    </ErudaProvider>
  );
}
