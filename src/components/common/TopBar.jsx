import { useState } from 'react';
import { Search, Bell, Menu, Activity, Sparkles, X } from 'lucide-react';
import UserMenu from './UserMenu';
import { useMarketStore } from '../../stores/useMarketStore';

export default function TopBar({ onToggleSidebar }) {
  const { setSearchOpen } = useMarketStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-14 bg-[#09090B] border-b border-[#27272A] px-4 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Toggle & Global Search Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#18181B] lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center justify-between w-full max-w-sm px-3 py-1.5 bg-[#111113] border border-[#27272A] rounded-lg text-xs text-[#71717A] hover:text-[#A1A1AA] hover:border-[#3F3F46] transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#71717A] group-hover:text-violet-400 transition-colors" />
            <span className="truncate">Search markets, signals, AI analysis...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-[#71717A] bg-[#18181B] border border-[#27272A] rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Market Status, AI Engine Status, Notifications & User */}
      <div className="flex items-center gap-3">
        {/* Live Market Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-[#111113] border border-[#27272A] rounded-full text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white">Market Live</span>
          <span className="text-[#71717A] border-l border-[#27272A] pl-2 flex items-center gap-1">
            <Activity className="w-3 h-3 text-violet-400" /> 12ms ping
          </span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#18181B] border border-transparent hover:border-[#27272A] transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full ring-2 ring-[#09090B]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl z-50 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#27272A]">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" /> AI Alert Feed
                </div>
                <button onClick={() => setShowNotifications(false)} className="text-[#71717A] hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2 rounded-lg bg-[#18181B] border border-emerald-500/20">
                  <div className="flex items-center justify-between font-semibold text-emerald-400">
                    <span>BTC Liquidity Sweep</span>
                    <span className="text-[10px] text-[#71717A]">2m ago</span>
                  </div>
                  <p className="text-[#A1A1AA] text-[11px] mt-0.5">Bullish sweep at $108,950 with high volume recovery.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#18181B] border border-violet-500/20">
                  <div className="flex items-center justify-between font-semibold text-violet-300">
                    <span>XRP Breakout Signal</span>
                    <span className="text-[10px] text-[#71717A]">18m ago</span>
                  </div>
                  <p className="text-[#A1A1AA] text-[11px] mt-0.5">Breakout of local structure confirmed with 88% confidence.</p>
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
