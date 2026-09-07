import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Zap, Radio, Bell, ArrowUpRight, TrendingUp, TrendingDown, Keyboard } from 'lucide-react';
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';
import SearchCommand from './SearchCommand';
import AIAnalysisProgressModal from '../../features/ai-analysis/components/AIAnalysisProgressModal';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';
import { useThemeStore } from '../../stores/useThemeStore';
import { useMarketStore } from '../../stores/useMarketStore';
import { useAIStore } from '../../stores/useAIStore';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const { setSearchOpen, assets } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Global key listener for '?' to open shortcuts
  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const tickerAssets = [
    { symbol: 'BTC', price: '$108,950', change: '+3.42%', positive: true },
    { symbol: 'ETH', price: '$3,820', change: '+5.18%', positive: true },
    { symbol: 'SOL', price: '$245.80', change: '+8.90%', positive: true },
    { symbol: 'XRP', price: '$2.65', change: '-1.20%', positive: false },
    { symbol: 'DOGE', price: '$0.38', change: '+12.4%', positive: true },
    { symbol: 'ADA', price: '$1.15', change: '+2.10%', positive: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060911] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200 relative">
      {/* Top Live Ticker Bar */}
      <div className="h-7 bg-slate-900 text-slate-300 dark:bg-[#04060C] dark:text-slate-400 text-[10px] font-mono flex items-center overflow-hidden border-b border-slate-800 z-40 select-none">
        <div className="px-3 bg-blue-600 text-white font-bold tracking-wider flex items-center gap-1.5 h-full shrink-0 uppercase text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Ticker</span>
        </div>
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 px-4 whitespace-nowrap">
          {tickerAssets.concat(tickerAssets).map((t, idx) => (
            <div key={idx} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <span className="font-bold text-slate-200">{t.symbol}</span>
              <span className="text-slate-400">{t.price}</span>
              <span className={`flex items-center font-bold ${t.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.positive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Layout Container */}
      <div className="lg:pl-[220px] flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 md:p-6 min-w-0 overflow-y-auto pb-24">
          <Outlet />
        </main>
      </div>

      {/* Floating Bottom Quick-Action Glass Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1.5 p-2 rounded-2xl bg-white/80 dark:bg-[#0D121F]/80 backdrop-blur-xl border border-slate-200 dark:border-blue-500/30 shadow-2xl neon-glow-blue animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#121829] hover:bg-slate-200 dark:hover:bg-blue-600/20 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-blue-500" />
          <span>Search</span>
          <kbd className="text-[9px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-1 py-0.2 rounded">⌘K</kbd>
        </button>

        <button
          onClick={() => openAnalysisModal(assets[0])}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-100" />
          <span>AI Deep Scan</span>
        </button>

        <button
          onClick={() => navigate('/signals')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#121829] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Signals</span>
        </button>

        <button
          onClick={() => navigate('/markets')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#121829] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-500" />
          <span>Terminal</span>
        </button>

        <button
          onClick={() => setIsShortcutsOpen(true)}
          title="Terminal Shortcuts (?)"
          className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#121829] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          <Keyboard className="w-4 h-4 text-purple-400" />
        </button>
      </div>

      {/* Modals & Overlays */}
      <SearchCommand />
      <AIAnalysisProgressModal />
      <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </div>
  );
}
