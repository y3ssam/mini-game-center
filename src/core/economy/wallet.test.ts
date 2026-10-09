import { describe, expect, it } from 'vitest';
import { applyWalletTransaction, createInitialWallet } from './wallet';

describe('shared wallet', () => {
  it('starts with the one-time starting balance', () => {
    expect(createInitialWallet()).toEqual({ balance: 600, processedTransactionIds: [] });
  });

  it('debits only affordable whole-coin amounts', () => {
    const wallet = createInitialWallet();
    expect(applyWalletTransaction(wallet, { id: 'bet-1', direction: 'debit', amount: 200 }))
      .toMatchObject({ status: 'applied', wallet: { balance: 400 } });
    expect(applyWalletTransaction(wallet, { id: 'bet-2', direction: 'debit', amount: 601 }))
      .toMatchObject({ status: 'insufficient', wallet: { balance: 600 } });
  });

  it('settles a transaction only once', () => {
    const once = applyWalletTransaction(createInitialWallet(), {
      id: 'job-1',
      direction: 'credit',
      amount: 20,
    });
    expect(once.wallet.balance).toBe(620);
    expect(applyWalletTransaction(once.wallet, {
      id: 'job-1',
      direction: 'credit',
      amount: 20,
    })).toMatchObject({ status: 'duplicate', wallet: { balance: 620 } });
  });

  it('rejects invalid and overflowing amounts', () => {
    const wallet = createInitialWallet();
    for (const amount of [0, -1, NaN, 1.5, Number.MAX_SAFE_INTEGER]) {
      const result = applyWalletTransaction(wallet, { id: 'invalid', direction: 'credit', amount });
      expect(result.status).toBe('invalid');
      expect(result.wallet).toBe(wallet);
    }
  });
});
