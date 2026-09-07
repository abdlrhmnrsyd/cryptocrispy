import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  PieChart,
  Coins,
  BarChart2,
  Bot,
  TrendingUp,
  Bell,
  CandlestickChart,
  Cloud,
  CreditCard,
  LifeBuoy,
  UserCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AppSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggedOutToast, setLoggedOutToast] = useState(false);

  const PRIMARY_MENU = [
    { label: 'Dashboard', path: '/', alias: ['/dashboard', '/overview'], icon: Home },
    { label: 'Markets', path: '/markets', icon: Coins },
    { label: 'Portfolio', path: '/portfolio', icon: PieChart },
  ];

  const SECONDARY_MENU = [
    { label: 'AI Assistant', path: '/ai-assistant', alias: ['/ai-analyst'], icon: BarChart2 },
    { label: 'AI Bot', path: '/ai-bot', alias: ['/bots'], icon: Bot },
    { label: 'Insights', path: '/insights', icon: TrendingUp },
    { label: 'Alert System', path: '/alerts', alias: ['/alert-system'], icon: Bell },
    {
      label: 'Trade Simulator',
      path: '/trade-simulator',
      icon: CandlestickChart,
      badge: 'Coming Soon'
    },
    { label: 'Developer API', path: '/developer', icon: Cloud },
    { label: 'Subscription', path: '/subscription', icon: CreditCard },
    { label: 'Help', path: '/help', icon: LifeBuoy },
  ];

  const BOTTOM_MENU = [
    { label: 'Profile', path: '/profile', alias: ['/settings'], icon: UserCircle },
  ];

  const isItemActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.alias && item.alias.includes(location.pathname)) return true;
    if (item.path === '/' && (location.pathname === '/' || location.pathname === '/overview')) return true;
    return false;
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setLoggedOutToast(true);
    setTimeout(() => {
      setLoggedOutToast(false);
      navigate('/');
    }, 2000);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[230px] bg-white dark:bg-[#070A11] border-r border-slate-200/80 dark:border-slate-800/80 z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } select-none`}
      >
        {/* Top & Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 scrollbar-thin">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pb-4 pt-1 mb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none"
                aria-label="Toggle Navigation"
              >
                <Menu className="w-5 h-5 stroke-[2]" />
              </button>
              <NavLink
                to="/"
                onClick={onClose}
                className="text-[17px] font-semibold tracking-tight text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                CryptoCrispy
              </NavLink>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              aria-label="Close Sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Group 1: Dashboard & Portfolio */}
          <div className="space-y-1">
            {PRIMARY_MENU.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                    active
                      ? 'bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                        active ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Clean Thin Divider Line */}
          <div className="py-2">
            <div className="h-px bg-slate-200/80 dark:border-slate-800 dark:bg-slate-800/80 mx-1" />
          </div>

          {/* Group 2: Features List */}
          <div className="space-y-1">
            {SECONDARY_MENU.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                    active
                      ? 'bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                        active ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-medium tracking-tight px-2 py-0.5 rounded-full shrink-0 ml-1.5 transition-colors ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-[#64748B] text-white shadow-xs'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Profile & Logout */}
        <div className="px-3.5 py-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1">
          {BOTTOM_MENU.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                  active
                    ? 'bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 font-medium'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    active ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <button
            onClick={() => setShowLogoutModal(true)}
            className="group flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/70 dark:hover:bg-rose-950/20 transition-all duration-150 cursor-pointer text-left"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-rose-500 transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Sign Out of CryptoCrispy?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You will need to sign in again to access trading bots, API keys, and real-time private telemetry.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-md shadow-rose-600/25 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {loggedOutToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Session signed out successfully. Redirecting...</span>
        </div>
      )}
    </>
  );
}
