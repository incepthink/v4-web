import { useCallback, useMemo } from 'react';

import stableStringify from 'fast-json-stable-stringify';
import { useChainId, useSignTypedData, useSwitchChain } from 'wagmi';

import { ConnectorType, getSignTypedData, WalletInfo } from '@/constants/wallets';

import { usePhantomWallet } from '@/hooks/usePhantomWallet';

import { getSelectedDydxChainId } from '@/state/appSelectors';
import { useAppSelector } from '@/state/appTypes';

import { useEnvConfig } from './useEnvConfig';

export default function useSignForWalletDerivation(wallet: WalletInfo | undefined) {
  const selectedDydxChainId = useAppSelector(getSelectedDydxChainId);
  const ethereumChainId = useEnvConfig('ethereumChainId');
  const chainId = Number(ethereumChainId);
  const currentChainId = useChainId();

  const signTypedData = useMemo(() => getSignTypedData(selectedDydxChainId), [selectedDydxChainId]);

  const { signTypedDataAsync } = useSignTypedData();
  const { switchChainAsync } = useSwitchChain();

  // Detect if user is on mobile
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const signEvmMessage = useCallback(
    async (isMetaMask: boolean) => {
      // Mobile-specific handling
      if (isMobile) {
        try {
          // Check if we're on the correct chain
          if (currentChainId !== chainId) {
            console.log(`Switching from chain ${currentChainId} to ${chainId}`);
            try {
              await switchChainAsync({ chainId });
              // Wait for chain switch to complete
              await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (switchError) {
              console.log('Chain switch failed, continuing with current chain:', switchError);
            }
          }

          // Try signing with retry logic for mobile
          let lastError;
          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              console.log(`Mobile sign attempt ${attempt}/3`);

              const signature = await signTypedDataAsync({
                ...signTypedData,
                domain: {
                  ...signTypedData.domain,
                  ...(isMetaMask ? ({ verifyingContract: '' } as {}) : {}),
                  chainId,
                },
              });

              return signature;
            } catch (error) {
              lastError = error;
              console.log(`Mobile sign attempt ${attempt} failed:`, error);

              if (attempt < 3) {
                // Wait before retry
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
              }
            }
          }

          throw lastError;
        } catch (error) {
          console.error('Mobile signing failed:', error);

          // If the error is about invalid chainId, provide a helpful message
          if (error?.message?.includes('chainId') || error?.message?.includes('chain')) {
            throw new Error(
              "Please ensure you're connected to Ethereum Mainnet in your wallet and try again."
            );
          }

          throw error;
        }
      }

      // Desktop signing logic (unchanged)
      return signTypedDataAsync({
        ...signTypedData,
        domain: {
          ...signTypedData.domain,
          ...(isMetaMask ? ({ verifyingContract: '' } as {}) : {}),
          chainId,
        },
      });
    },
    [signTypedData, signTypedDataAsync, chainId, isMobile, currentChainId, switchChainAsync]
  );

  const { signMessage: phantomSignMessage } = usePhantomWallet();

  const signSolanaMessage = useCallback(async (): Promise<string> => {
    const signature = await phantomSignMessage(stableStringify(signTypedData));
    // Left pad the signature with a 0 byte so that the signature is 65 bytes long, a solana signature is 64 bytes by default.
    return Buffer.from([0, ...signature]).toString('hex');
  }, [phantomSignMessage, signTypedData]);

  const signMessage = useCallback(async (): Promise<string> => {
    if (wallet?.connectorType === ConnectorType.PhantomSolana) {
      return signSolanaMessage();
    }

    const isMetaMask =
      wallet?.connectorType === ConnectorType.Injected && wallet.name === 'MetaMask';

    return signEvmMessage(isMetaMask);
  }, [signEvmMessage, signSolanaMessage, wallet?.connectorType, wallet?.name]);

  return signMessage;
}
