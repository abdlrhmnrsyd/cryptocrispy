import { create } from 'zustand';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cryptocrispy_theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  }
  return 'light'; // Default Light Mode as requested
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (newTheme) => {
    localStorage.setItem('cryptocrispy_theme', newTheme);
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    set({ theme: newTheme });
  },
  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },
}));
