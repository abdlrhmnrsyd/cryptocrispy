import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Mail,
  FileText,
  BarChart3,
  Calendar,
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
          className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-[220px] bg-[#0B0B0E] border-r border-[#1E1E28] z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Top Control Bar matching screenshot */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1E1E28]">
            <button className="p-1.5 rounded-lg bg-[#121218] border border-[#1E1E28] text-[#9A9AB0] hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161620] border border-[#1E1E28] text-[10px] font-medium text-[#9A9AB0]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Quick start</span>
            </div>
          </div>

          {/* Core Pages Section matching screenshot */}
          <div className="space-y-1 text-xs">
            {PAGES.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-[#181822] text-white border border-white/10 shadow-lg shadow-black/40'
                      : 'text-[#9A9AB0] hover:text-white hover:bg-[#121218]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-[#626278]'}`} />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* PAGES Category matching screenshot */}
          <div className="space-y-1 text-xs">
            <div className="px-3 text-[10px] font-bold tracking-widest text-[#626278] uppercase mb-1.5">
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
                  className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-[#181822] text-white border border-white/10'
                      : 'text-[#9A9AB0] hover:text-white hover:bg-[#121218]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#626278]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* APPS Category matching screenshot */}
          <div className="space-y-1 text-xs">
            <div className="px-3 text-[10px] font-bold tracking-widest text-[#626278] uppercase mb-1.5">
              APPS
            </div>
            {APPS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#9A9AB0] hover:text-white hover:bg-[#121218] transition-all font-medium"
                >
                  <Icon className="w-4 h-4 text-[#626278]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Logout Link matching screenshot */}
        <div className="p-4 border-t border-[#1E1E28]">
          <button
            onClick={() => alert('Logged out')}
            className="flex items-center gap-2 text-xs font-semibold text-[#9A9AB0] hover:text-red-400 transition-colors w-full px-2 py-1.5"
          >
            <LogOut className="w-4 h-4 text-[#626278]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
