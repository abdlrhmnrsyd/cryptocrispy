import { useEffect } from 'react';
import { X, Command, Keyboard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { category: 'Navigation', items: [
      { key: 'G then D', desc: 'Go to Dashboard', action: () => { navigate('/'); onClose(); } },
      { key: 'G then M', desc: 'Go to Markets Terminal', action: () => { navigate('/markets'); onClose(); } },
      { key: 'G then S', desc: 'Go to AI Trading Signals', action: () => { navigate('/signals'); onClose(); } },
      { key: 'G then W', desc: 'Go to Watchlist', action: () => { navigate('/watchlist'); onClose(); } },
    ]},
    { category: 'Actions', items: [
      { key: '⌘ K', desc: 'Open Command Palette & Search' },
      { key: '?', desc: 'Toggle Keyboard Shortcuts Modal' },
      { key: 'Esc', desc: 'Close open modal or dropdown' },
    ]},
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#0D121F] border border-slate-300 dark:border-blue-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-xs neon-glow-blue animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-500 border border-blue-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Terminal Shortcuts</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Pro Trader Keyboard Navigation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-4">
          {shortcuts.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {group.category}
              </div>
              <div className="space-y-1.5">
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={item.action}
                    className={`flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121829] border border-slate-200 dark:border-slate-800/80 ${
                      item.action ? 'hover:border-blue-500/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#162032]' : ''
                    } transition-all`}
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{item.desc}</span>
                    <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#070A11] border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white text-[10px] shadow-2xs">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">Esc</kbd> to dismiss</span>
          <span className="font-mono text-blue-500 font-bold">CryptoCrispy Terminal v2.0</span>
        </div>
      </div>
    </div>
  );
}
