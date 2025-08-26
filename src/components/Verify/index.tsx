'use client';
import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';
import { useState } from 'react';

/**
 * Verify Component
 * ------------------
 * Componente que permite verificar al usuario mediante World ID usando MiniKit.
 * 
 * Características:
 * - Usa comandos MiniKit en cliente (Next.js 'use client')
 * - Permite verificar por dispositivo (Device) o por Orb
 * - Muestra feedback en tiempo real sobre la verificación
 * - Envía la prueba al servidor para validación
 * 
 * Read More: https://docs.world.org/mini-apps/commands/verify#verifying-the-proof
 */
export const Verify = () => {
  // Estado del botón (feedback visual)
  const [buttonState, setButtonState] = useState<
    'pending' | 'success' | 'failed' | undefined
  >(undefined);

  // Tipo de verificación seleccionado
  const [whichVerification, setWhichVerification] = useState<VerificationLevel>(
    VerificationLevel.Device,
  );

  // Función que se ejecuta al presionar "Verify"
  const onClickVerify = async (verificationLevel: VerificationLevel) => {
    setButtonState('pending');
    setWhichVerification(verificationLevel);

    // Ejecuta la verificación con MiniKit
    const result = await MiniKit.commandsAsync.verify({
      action: 'test-action', // Acción registrada en el Developer Portal
      verification_level: verificationLevel,
    });
    console.log(result.finalPayload);

    // Enviar prueba al servidor para validar
    const response = await fetch('/api/verify-proof', {
      method: 'POST',
      body: JSON.stringify({
        payload: result.finalPayload,
        action: 'test-action',
      }),
    });

    const data = await response.json();

    // Actualiza el estado del botón según la validación
    if (data.verifyRes.success) {
      setButtonState('success');
    } else {
      setButtonState('failed');
      setTimeout(() => {
        setButtonState(undefined);
      }, 2000);
    }
  };

  return (
    <div className="grid w-full gap-4">
      {/* Título del componente */}
      <p className="text-lg font-semibold">Verify</p>

      {/* Botón Device */}
      <LiveFeedback
        label={{
          failed: 'Failed to verify',
          pending: 'Verifying',
          success: 'Verified',
        }}
        state={
          whichVerification === VerificationLevel.Device
            ? buttonState
            : undefined
        }
        className="w-full"
      >
        <Button
          onClick={() => onClickVerify(VerificationLevel.Device)}
          disabled={buttonState === 'pending'}
          size="lg"
          variant="tertiary"
          className="w-full"
        >
          Verify (Device)
        </Button>
      </LiveFeedback>

      {/* Botón Orb */}
      <LiveFeedback
        label={{
          failed: 'Failed to verify',
          pending: 'Verifying',
          success: 'Verified',
        }}
        state={
          whichVerification === VerificationLevel.Orb ? buttonState : undefined
        }
        className="w-full"
      >
        <Button
          onClick={() => onClickVerify(VerificationLevel.Orb)}
          disabled={buttonState === 'pending'}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Verify (Orb)
        </Button>
      </LiveFeedback>
    </div>
  );
};
