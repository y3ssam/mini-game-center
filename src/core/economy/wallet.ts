/** All amounts use whole, virtual coins. This pure function owns balance validation. */
export interface WalletData {
  balance: number;
  processedTransactionIds: string[];
}

export interface WalletTransaction {
  id: string;
  direction: 'credit' | 'debit';
  amount: number;
}

export type WalletTransactionStatus = 'applied' | 'duplicate' | 'invalid' | 'insufficient';

export function createInitialWallet(): WalletData {
  return { balance: 600, processedTransactionIds: [] };
}

export function applyWalletTransaction(
  wallet: WalletData,
  transaction: WalletTransaction,
): { status: WalletTransactionStatus; wallet: WalletData } {
  const { id, amount, direction } = transaction;
  if (
    typeof id !== 'string' ||
    !id.trim() ||
    !Number.isSafeInteger(amount) ||
    amount <= 0 ||
    (direction !== 'credit' && direction !== 'debit') ||
    !Number.isSafeInteger(wallet.balance) ||
    wallet.balance < 0 ||
    !Array.isArray(wallet.processedTransactionIds)
  ) {
    return { status: 'invalid', wallet };
  }

  if (wallet.processedTransactionIds.includes(id)) {
    return { status: 'duplicate', wallet };
  }

  if (direction === 'debit' && amount > wallet.balance) {
    return { status: 'insufficient', wallet };
  }

  const balance = wallet.balance + (direction === 'credit' ? amount : -amount);
  if (!Number.isSafeInteger(balance) || balance < 0) {
    return { status: 'invalid', wallet };
  }

  return {
    status: 'applied',
    wallet: { balance, processedTransactionIds: [...wallet.processedTransactionIds, id] },
  };
}
