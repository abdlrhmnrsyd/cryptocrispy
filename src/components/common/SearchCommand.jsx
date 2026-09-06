import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp, Zap, Bot, ArrowRight, X } from 'lucide-react';
import { useMarketStore } from '../../stores/useMarketStore';
import { useAIStore } from '../../stores/useAIStore';

export default function SearchCommand() {
  const navigate = useNavigate();
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery, assets, setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredAssets = assets.filter(
    (a) =>
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickLinks = [
    { label: 'Market Overview', path: '/', icon: TrendingUp },
    { label: 'Trading Workspace', path: '/markets', icon: TrendingUp },
    { label: 'AI Market Scanner', path: '/scanner', icon: Zap },
    { label: 'AI Analyst Chat', path: '/ai-analyst', icon: Bot },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Search Header Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070A11]">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crypto assets, signals, AI analysis, commands..."
            className="w-full h-12 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button onClick={() => setSearchOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Crypto Assets Results */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Crypto Assets & Intelligence
            </div>
            <div className="space-y-1">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-transparent hover:border-blue-500/30 cursor-pointer group transition-all"
                  onClick={() => {
                    setActiveSymbol(asset.symbol);
                    setSearchOpen(false);
                    navigate('/markets');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-800 dark:text-white text-xs">
                      {asset.base.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {asset.symbol} <span className="text-slate-400 dark:text-slate-500 font-normal">({asset.name})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        ${asset.price.toLocaleString()} • Vol ${asset.volume24h}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold ${
                          asset.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {asset.change24h >= 0 ? '+' : ''}
                        {asset.change24h}%
                      </span>
                      <div className="text-[9px] text-blue-600 dark:text-blue-400 font-medium">{asset.aiSentiment} ({asset.aiConfidence}%)</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchOpen(false);
                        openAnalysisModal(asset);
                      }}
                      className="p-1.5 rounded bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-600/40 border border-blue-200 dark:border-blue-500/30 text-[10px] font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500" /> Analyze
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(link.path);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-blue-500" />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#070A11] border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Navigate with arrows or click items</span>
          <span><kbd className="px-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
