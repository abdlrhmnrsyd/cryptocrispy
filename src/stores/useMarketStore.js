import { create } from 'zustand';
import { CRYPTO_ASSETS } from '../services/mockCryptoData';

export const useMarketStore = create((set, get) => ({
  assets: CRYPTO_ASSETS,
  activeSymbol: 'BTC/USDT',
  activeAsset: CRYPTO_ASSETS[0],
  timeframe: '4H',
  overlays: {
    liquidity: true,
    supportResistance: true,
    fvg: true,
    orderBlock: true,
    targetSl: true,
  },
  searchQuery: '',
  isSearchOpen: false,

  setActiveSymbol: (symbol) => {
    const asset = get().assets.find((a) => a.symbol === symbol) || get().assets[0];
    set({ activeSymbol: symbol, activeAsset: asset });
  },

  setTimeframe: (tf) => set({ timeframe: tf }),

  toggleOverlay: (overlayKey) =>
    set((state) => ({
      overlays: {
        ...state.overlays,
        [overlayKey]: !state.overlays[overlayKey],
      },
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
}));
