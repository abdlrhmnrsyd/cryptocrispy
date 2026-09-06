import { useState } from 'react';
import { Search, Bell, Menu, Activity, Sparkles, X, Sun, Moon } from 'lucide-react';
import UserMenu from './UserMenu';
import { useMarketStore } from '../../stores/useMarketStore';
import { useThemeStore } from '../../stores/useThemeStore';

export default function TopBar({ onToggleSidebar }) {
  const { setSearchOpen } = useMarketStore();
  const { theme, toggleTheme } = useThemeStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-14 bg-white dark:bg-[#070A11] border-b border-slate-200 dark:border-slate-800/80 px-4 flex items-center justify-between sticky top-0 z-30 transition-colors">
      {/* Left: Mobile Toggle & Global Search Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center justify-between w-full max-w-sm px-3 py-1.5 bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-blue-500/50 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
            <span className="truncate">Search markets, signals, AI analysis...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Market Status, Theme Switcher, Notifications & User */}
      <div className="flex items-center gap-3">
        {/* Live Market Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-full text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-800 dark:text-white">Market Live</span>
          <span className="text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-2 flex items-center gap-1">
            <Activity className="w-3 h-3 text-blue-500" /> 12ms ping
          </span>
        </div>

        {/* Theme Switcher Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all flex items-center gap-1.5 text-xs font-semibold"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-in fade-in" />
          ) : (
            <Moon className="w-4 h-4 text-blue-600 animate-in fade-in" />
          )}
          <span className="hidden sm:inline capitalize">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-[#070A11]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" /> AI Alert Feed
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-emerald-500/20">
                  <div className="flex items-center justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>BTC Liquidity Sweep</span>
                    <span className="text-[10px] text-slate-400">2m ago</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">Bullish sweep at $108,950 with high volume recovery.</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-blue-500/20">
                  <div className="flex items-center justify-between font-semibold text-blue-600 dark:text-blue-400">
                    <span>XRP Breakout Signal</span>
                    <span className="text-[10px] text-slate-400">18m ago</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">Breakout of local structure confirmed with 88% confidence.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
