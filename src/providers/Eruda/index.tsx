'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Import dinámico de Eruda para que solo se cargue en cliente
const Eruda = dynamic(() => import('./eruda-provider').then((c) => c.Eruda), {
  ssr: false, // Evita renderizado del lado servidor
});

/**
 * ErudaProvider
 * -------------------------
 * Wrapper que activa Eruda solo en entornos de desarrollo.
 * 
 * Props:
 *  - children: ReactNode (componentes a envolver)
 * 
 * Comportamiento:
 *  - Si NEXT_PUBLIC_APP_ENV === 'production', renderiza solo los children.
 *  - Si es desarrollo, envuelve los children en Eruda para depuración.
 */
export const ErudaProvider = (props: { children: ReactNode }) => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    // No inicializar Eruda en producción
    return props.children;
  }
  // Inicializa Eruda en desarrollo
  return <Eruda>{props.children}</Eruda>;
};
