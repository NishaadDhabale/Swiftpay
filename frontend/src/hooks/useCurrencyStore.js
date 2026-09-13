import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCurrencyStore = create(
  persist(
    (set) => ({
      currency: 'INR',
      setCurrency: (currency) => set({ currency }),
      toggleCurrency: () =>
        set((state) => ({ currency: state.currency === 'INR' ? 'USD' : 'INR' })),
    }),
    { name: 'swiftpay-currency' }
  )
);
