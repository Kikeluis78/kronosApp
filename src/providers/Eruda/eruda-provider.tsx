'use client';

import eruda from 'eruda';
import { ReactNode, useEffect } from 'react';

/**
 * Eruda Component
 * -------------------------
 * Wrapper para habilitar la consola de depuración Eruda en dispositivos móviles.
 * Solo se inicializa en cliente (`window` definido).
 * 
 * Uso:
 *   <Eruda>
 *     <App />  // Toda tu app queda envuelta
 *   </Eruda>
 */
export const Eruda = (props: { children: ReactNode }) => {
  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window !== 'undefined') {
      try {
        // Inicializa Eruda
        eruda.init();
      } catch (error) {
        console.log('Eruda failed to initialize', error);
      }
    }
  }, []);

  // Renderiza los hijos normalmente
  return <>{props.children}</>;
};
