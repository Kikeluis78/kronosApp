'use client';

import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { MiniKit, Tokens, tokenToDecimals } from '@worldcoin/minikit-js';
import { useState } from 'react';

/**
 * Componente Pay
 * Permite realizar pagos de prueba usando MiniKit
 * Incluye feedback en tiempo real (pending, success, failed)
 */
export const Pay = () => {
  // Estado del botón / transacción
  const [buttonState, setButtonState] = useState<
    'pending' | 'success' | 'failed' | undefined
  >(undefined);

  // Función que se ejecuta al dar click en "Pay"
  const onClickPay = async () => {
    try {
      // Obtenemos la dirección de un usuario de prueba
      const address = (await MiniKit.getUserByUsername('alex')).walletAddress;

      // Indicamos que la transacción está en progreso
      setButtonState('pending');

      // Llamada a API local para iniciar pago y obtener referencia
      const res = await fetch('/api/initiate-payment', { method: 'POST' });
      const { id } = await res.json();

      // Ejecutamos el pago con MiniKit
      const result = await MiniKit.commandsAsync.pay({
        reference: id,
        to: address ?? '0x0000000000000000000000000000000000000000',
        tokens: [
          {
            symbol: Tokens.WLD, // Token Worldcoin
            token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
          },
          {
            symbol: Tokens.USDC, // Token USDC corregido
            token_amount: tokenToDecimals(0.1, Tokens.USDC).toString(),
          },
        ],
        description: 'Test example payment for minikit',
      });

      console.log('Resultado de la transacción:', result.finalPayload);

      // Verificamos el estado de la transacción
      if (result.finalPayload.status === 'success') {
        setButtonState('success');
      } else {
        setButtonState('failed');
        setTimeout(() => setButtonState(undefined), 3000); // Reseteamos feedback tras fallo
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      setButtonState('failed');
      setTimeout(() => setButtonState(undefined), 3000);
    }
  };

  return (
    <div className="grid w-full gap-4">
      {/* Título del widget */}
      <p className="text-lg font-semibold">Pay</p>

      {/* Componente LiveFeedback muestra mensajes según el estado */}
      <LiveFeedback
        label={{
          failed: 'Payment failed',
          pending: 'Payment pending',
          success: 'Payment successful',
        }}
        state={buttonState}
        className="w-full"
      >
        {/* Botón principal de pago */}
        <Button
          onClick={onClickPay}
          disabled={buttonState === 'pending'}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Pay
        </Button>
      </LiveFeedback>
    </div>
  );
};
