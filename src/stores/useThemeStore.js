import { create } from 'zustand';

const applyThemeToDOM = (theme) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }
};

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cryptocrispy_theme');
    if (saved === 'light' || saved === 'dark') {
      applyThemeToDOM(saved);
      return saved;
    }
  }
  applyThemeToDOM('light');
  return 'light'; // Default Light Mode as requested
};

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (newTheme) => {
    localStorage.setItem('cryptocrispy_theme', newTheme);
    applyThemeToDOM(newTheme);
    set({ theme: newTheme });
  },
  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },
}));
