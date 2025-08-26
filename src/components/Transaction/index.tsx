'use client';

import TestContractABI from '@/abi/TestContract.json';
import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { MiniKit } from '@worldcoin/minikit-js';
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { worldchain } from 'viem/chains';

/**
 * Transaction Component
 * ---------------------
 * Permite interactuar con un contrato de prueba.
 * Patrón general:
 * 1. Disparar la transacción
 * 2. Guardar transaction_id para monitorear
 * 3. Esperar confirmación con useEffect
 */
export const Transaction = () => {
  // Dirección del contrato de prueba
  const myContractToken = '0xF0882554ee924278806d708396F1a7975b732522';

  // Estado del botón de transacción
  const [buttonState, setButtonState] = useState<
    'pending' | 'success' | 'failed' | undefined
  >(undefined);

  // Qué botón está activo
  const [whichButton, setWhichButton] = useState<'getToken' | 'usePermit2'>(
    'getToken',
  );

  // transaction_id para monitoreo
  const [transactionId, setTransactionId] = useState<string>('');

  // Cliente RPC para consultar blockchain
  const client = createPublicClient({
    chain: worldchain,
    transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
  });

  // Hook para monitorear la transacción
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
    error,
  } = useWaitForTransactionReceipt({
    client,
    appConfig: {
      app_id: process.env.WLD_CLIENT_ID as `app_${string}`,
    },
    transactionId,
  });

  // useEffect para actualizar estado de botón según confirmación
  useEffect(() => {
    if (transactionId && !isConfirming) {
      if (isConfirmed) {
        console.log('Transaction confirmed!');
        setButtonState('success');
        setTimeout(() => setButtonState(undefined), 3000);
      } else if (isError) {
        console.error('Transaction failed:', error);
        setButtonState('failed');
        setTimeout(() => setButtonState(undefined), 3000);
      }
    }
  }, [isConfirmed, isConfirming, isError, error, transactionId]);

  // Función para mint de token
  const onClickGetToken = async () => {
    setTransactionId('');
    setWhichButton('getToken');
    setButtonState('pending');

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: myContractToken,
            abi: TestContractABI,
            functionName: 'mintToken',
            args: [],
          },
        ],
      });

      if (finalPayload.status === 'success') {
        console.log(
          'Transaction submitted, waiting for confirmation:',
          finalPayload.transaction_id,
        );
        setTransactionId(finalPayload.transaction_id);
      } else {
        console.error('Transaction submission failed:', finalPayload);
        setButtonState('failed');
        setTimeout(() => setButtonState(undefined), 3000);
      }
    } catch (err) {
      console.error('Error sending transaction:', err);
      setButtonState('failed');
      setTimeout(() => setButtonState(undefined), 3000);
    }
  };

  // Función para usar Permit2 con el token mintado
  const onClickUsePermit2 = async () => {
    setTransactionId('');
    setWhichButton('usePermit2');
    setButtonState('pending');

    const address = (await MiniKit.getUserByUsername('alex')).walletAddress;

    // Permit2 válido por 30 minutos
    const permitTransfer = {
      permitted: {
        token: myContractToken,
        amount: (0.5 * 10 ** 18).toString(),
      },
      nonce: Date.now().toString(),
      deadline: Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString(),
    };

    const transferDetails = {
      to: address,
      requestedAmount: (0.5 * 10 ** 18).toString(),
    };

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: myContractToken,
            abi: TestContractABI,
            functionName: 'signatureTransfer',
            args: [
              [
                [
                  permitTransfer.permitted.token,
                  permitTransfer.permitted.amount,
                ],
                permitTransfer.nonce,
                permitTransfer.deadline,
              ],
              [transferDetails.to, transferDetails.requestedAmount],
              'PERMIT2_SIGNATURE_PLACEHOLDER_0',
            ],
          },
        ],
        permit2: [
          {
            ...permitTransfer,
            spender: myContractToken,
          },
        ],
      });

      if (finalPayload.status === 'success') {
        console.log(
          'Transaction submitted, waiting for confirmation:',
          finalPayload.transaction_id,
        );
        setTransactionId(finalPayload.transaction_id);
      } else {
        console.error('Transaction submission failed:', finalPayload);
        setButtonState('failed');
      }
    } catch (err) {
      console.error('Error sending transaction:', err);
      setButtonState('failed');
    }
  };

  return (
    <div className="grid w-full gap-4">
      {/* Título del widget */}
      <p className="text-lg font-semibold">Transaction</p>

      {/* Botón Get Token */}
      <LiveFeedback
        label={{
          failed: 'Transaction failed',
          pending: 'Transaction pending',
          success: 'Transaction successful',
        }}
        state={whichButton === 'getToken' ? buttonState : undefined}
        className="w-full"
      >
        <Button
          onClick={onClickGetToken}
          disabled={buttonState === 'pending'}
          size="lg"
          variant="primary"
          className="w-full"
        >
          Get Token
        </Button>
      </LiveFeedback>

      {/* Botón Use Permit2 */}
      <LiveFeedback
        label={{
          failed: 'Transaction failed',
          pending: 'Transaction pending',
          success: 'Transaction successful',
        }}
        state={whichButton === 'usePermit2' ? buttonState : undefined}
        className="w-full"
      >
        <Button
          onClick={onClickUsePermit2}
          disabled={buttonState === 'pending'}
          size="lg"
          variant="tertiary"
          className="w-full"
        >
          Use Permit2
        </Button>
      </LiveFeedback>
    </div>
  );
};
