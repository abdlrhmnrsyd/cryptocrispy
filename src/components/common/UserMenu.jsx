import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Key, CreditCard, LogOut, Settings, CheckCircle2 } from 'lucide-react';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-xs">
          AR
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-xs font-semibold text-slate-800 dark:text-white leading-tight">Abdul Rahman</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">Pro Analyst</div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 text-xs divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-3 py-2.5">
            <p className="font-semibold text-slate-900 dark:text-white">Abdul Rahman Rasyid</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">abdul.rasyid@cryptocrispy.ai</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-md w-fit">
              <CheckCircle2 className="w-3 h-3" /> API Active
            </div>
          </div>

          <div className="py-1">
            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile & Account</span>
            </NavLink>
            <NavLink
              to="/developer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <Key className="w-3.5 h-3.5" />
              <span>API Keys & Credentials</span>
            </NavLink>
            <NavLink
              to="/subscription"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Subscription & Billing</span>
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </NavLink>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                alert('Logged out successfully');
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800/50 text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
