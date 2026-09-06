import { create } from 'zustand';
import { CRYPTO_ASSETS } from '../services/mockCryptoData';

export const useWatchlistStore = create((set, get) => ({
  savedSymbols: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT'],

  toggleWatchlist: (symbol) => {
    const current = get().savedSymbols;
    if (current.includes(symbol)) {
      set({ savedSymbols: current.filter((s) => s !== symbol) });
    } else {
      set({ savedSymbols: [...current, symbol] });
    }
  },

  isWatchlisted: (symbol) => get().savedSymbols.includes(symbol),

  addWatchlist: (symbol) => {
    if (!get().savedSymbols.includes(symbol)) {
      set((state) => ({ savedSymbols: [...state.savedSymbols, symbol] }));
    }
  },

  removeWatchlist: (symbol) => {
    set((state) => ({ savedSymbols: state.savedSymbols.filter((s) => s !== symbol) }));
  },
}));
