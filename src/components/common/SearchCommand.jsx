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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Search Header Input */}
        <div className="flex items-center px-4 border-b border-[#27272A] bg-[#09090B]">
          <Search className="w-4 h-4 text-[#71717A] mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crypto assets, signals, AI analysis, commands..."
            className="w-full h-12 bg-transparent text-sm text-white placeholder-[#71717A] focus:outline-none"
            autoFocus
          />
          <button onClick={() => setSearchOpen(false)} className="p-1 text-[#71717A] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Crypto Assets Results */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold tracking-wider text-[#71717A] uppercase">
              Crypto Assets & Intelligence
            </div>
            <div className="space-y-1">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#18181B]/50 hover:bg-[#18181B] border border-transparent hover:border-[#27272A] cursor-pointer group transition-all"
                  onClick={() => {
                    setActiveSymbol(asset.symbol);
                    setSearchOpen(false);
                    navigate('/markets');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#27272A] flex items-center justify-center font-bold text-white text-xs">
                      {asset.base.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                        {asset.symbol} <span className="text-[#71717A] font-normal">({asset.name})</span>
                      </div>
                      <div className="text-[10px] text-[#71717A]">
                        ${asset.price.toLocaleString()} • Vol ${asset.volume24h}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold ${
                          asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {asset.change24h >= 0 ? '+' : ''}
                        {asset.change24h}%
                      </span>
                      <div className="text-[9px] text-violet-400 font-medium">{asset.aiSentiment} ({asset.aiConfidence}%)</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchOpen(false);
                        openAnalysisModal(asset);
                      }}
                      className="p-1.5 rounded bg-violet-600/20 text-violet-300 hover:bg-violet-600/40 border border-violet-500/30 text-[10px] font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-violet-400" /> Analyze
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-semibold tracking-wider text-[#71717A] uppercase">
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
                    className="flex items-center justify-between p-2 rounded-lg bg-[#18181B]/50 hover:bg-[#18181B] text-[#A1A1AA] hover:text-white border border-[#27272A] text-left transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-violet-400" />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#71717A]" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#09090B] border-t border-[#27272A] text-[11px] text-[#71717A] flex items-center justify-between">
          <span>Navigate with arrows or click items</span>
          <span><kbd className="px-1 bg-[#18181B] border border-[#27272A] rounded">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
