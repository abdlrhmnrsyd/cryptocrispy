import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  BarChart3,
  Folder,
  MessageSquare,
  Radio,
  Share2,
  LogOut,
  ArrowLeft,
  Zap,
  Sparkles
} from 'lucide-react';

const PAGES = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Markets & Workspace', path: '/markets', icon: BarChart3 },
  { label: 'AI Analyst', path: '/ai-analyst', icon: Zap },
  { label: 'Market Scanner', path: '/scanner', icon: Radio },
  { label: 'Trading Signals', path: '/signals', icon: Sparkles },
  { label: 'Watchlist', path: '/watchlist', icon: Folder },
];

const SECONDARY_PAGES = [
  { label: 'Portfolio', path: '/portfolio', icon: FileText },
  { label: 'Bots & Algorithmic', path: '/bots', icon: CheckSquare, badge: 'New' },
];

const APPS = [
  { label: 'Discord Bot Stream', path: '/developer', icon: MessageSquare },
  { label: 'Spectrum Feed', path: '/alerts', icon: Radio },
  { label: 'Slack Webhooks', path: '/subscription', icon: Share2 },
];

export default function AppSidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-[220px] bg-white/95 dark:bg-[#070A11]/95 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800/80 z-50 flex flex-col justify-between transition-all duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-5">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <button
              onClick={() => window.history.back()}
              title="Go Back"
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>AI Co-Pilot</span>
            </div>
          </div>

          {/* Core Pages Section */}
          <div className="space-y-1 text-xs">
            {PAGES.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === '/' 
                ? (location.pathname === '/' || location.pathname === '/overview')
                : location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-2xs translate-x-0.5'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-[#0D1117]/80 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* PAGES Category */}
          <div className="space-y-1 text-xs">
            <div className="px-3 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1.5">
              PAGES
            </div>
            {SECONDARY_PAGES.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 translate-x-0.5'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-[#0D1117]/80 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* APPS Category */}
          <div className="space-y-1 text-xs">
            <div className="px-3 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1.5">
              APPS
            </div>
            {APPS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 font-medium ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 translate-x-0.5'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-[#0D1117]/80 hover:translate-x-0.5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Logout Link */}
        <div className="p-3.5 border-t border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={() => alert('Logged out')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors w-full px-2.5 py-2 rounded-xl hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
