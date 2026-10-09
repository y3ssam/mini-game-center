import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  applyWalletTransaction,
  createInitialWallet,
  type WalletData,
  type WalletTransaction,
  type WalletTransactionStatus,
} from './wallet';

interface WalletStore extends WalletData {
  transact: (transaction: WalletTransaction) => WalletTransactionStatus;
}

/**
 * The wallet is created once for a new browser save and rehydrated on return.
 * Feature modules must call transact rather than editing balance directly.
 */
export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      ...createInitialWallet(),
      transact: (transaction) => {
        const result = applyWalletTransaction(get(), transaction);
        if (result.status === 'applied') set(result.wallet);
        return result.status;
      },
    }),
    {
      name: 'mini-game-center-wallet-v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ balance, processedTransactionIds }) => ({
        balance,
        processedTransactionIds,
      }),
    },
  ),
);
