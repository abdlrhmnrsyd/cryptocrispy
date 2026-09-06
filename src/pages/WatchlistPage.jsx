import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Sparkles, TrendingUp, TrendingDown, ArrowUpRight, Plus, Grid, List } from 'lucide-react';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';
import { useWatchlistStore } from '../stores/useWatchlistStore';
import CryptoAssetCard from '../features/market/components/CryptoAssetCard';

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { assets, setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const { savedSymbols, toggleWatchlist, isWatchlisted } = useWatchlistStore();

  const [activeTab, setActiveTab] = useState('SAVED');
  const [viewMode, setViewMode] = useState('GRID');
  const [newSymbolInput, setNewSymbolInput] = useState('');

  const displayedAssets = assets.filter((asset) => {
    if (activeTab === 'SAVED') return savedSymbols.includes(asset.symbol);
    if (activeTab === 'GAINERS') return asset.change24h > 0;
    if (activeTab === 'LOSERS') return asset.change24h < 0;
    return true;
  });

  const handleAddSymbol = (e) => {
    e.preventDefault();
    if (!newSymbolInput.trim()) return;
    const clean = newSymbolInput.trim().toUpperCase();
    const found = assets.find((a) => a.symbol.includes(clean) || a.base.includes(clean));
    if (found) {
      if (!savedSymbols.includes(found.symbol)) {
        toggleWatchlist(found.symbol);
      }
      setNewSymbolInput('');
    } else {
      alert(`Asset "${newSymbolInput}" not found. Try BTC, ETH, SOL, XRP, AVAX...`);
    }
  };

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      {/* Header & Quick Add Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-500" />
            AI Watchlist & Market Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Monitored crypto assets with continuous AI sentiment and neural forecast tracking</p>
        </div>

        {/* Quick Add Asset Input Form */}
        <form onSubmit={handleAddSymbol} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={newSymbolInput}
              onChange={(e) => setNewSymbolInput(e.target.value)}
              placeholder="Add coin (e.g. BTC, ETH)..."
              className="px-3.5 py-1.5 bg-white dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 w-52"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        </form>
      </div>

      {/* Filter Tabs & View Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center bg-white dark:bg-[#0D1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {[
            { id: 'SAVED', label: `Saved Watchlist (${savedSymbols.length})` },
            { id: 'GAINERS', label: 'Top Gainers' },
            { id: 'LOSERS', label: 'Top Losers' },
            { id: 'ALL', label: 'All Cryptos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid vs Table Toggle */}
        <div className="flex items-center bg-white dark:bg-[#0D1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            onClick={() => setViewMode('GRID')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'GRID' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('TABLE')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'TABLE' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Rendering: Grid vs Table */}
      {displayedAssets.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-xs">
          <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Watchlisted Assets Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Click the bookmark button on any crypto asset card or search above to save tokens to your watchlist.
          </p>
        </div>
      ) : viewMode === 'GRID' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {displayedAssets.map((asset) => (
            <CryptoAssetCard key={asset.symbol} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#070A11] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 font-semibold">Watchlist</th>
                  <th className="py-3 px-4 font-semibold">Asset</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">24h Change</th>
                  <th className="py-3 px-4 font-semibold">AI Sentiment</th>
                  <th className="py-3 px-4 font-semibold">AI Target TP</th>
                  <th className="py-3 px-4 font-semibold">AI Stop SL</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {displayedAssets.map((asset) => {
                  const bookmarked = isWatchlisted(asset.symbol);
                  return (
                    <tr key={asset.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleWatchlist(asset.symbol)}
                          className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                        </button>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-white">
                          {asset.base.slice(0, 3)}
                        </div>
                        <div>
                          <div className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{asset.symbol}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{asset.name}</div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900 dark:text-white">
                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-3.5 px-4 font-medium">
                        <span className={`flex items-center gap-1 ${asset.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {asset.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {asset.change24h}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            asset.aiSentiment === 'Bullish'
                              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                              : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                          }`}
                        >
                          {asset.aiSentiment} ({asset.aiConfidence}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        ${asset.aiTargetPrice.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-red-600 dark:text-red-400 font-bold">
                        ${asset.aiStopLoss.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => openAnalysisModal(asset)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-blue-500" />
                          Scan AI
                        </button>
                        <button
                          onClick={() => {
                            setActiveSymbol(asset.symbol);
                            navigate('/markets');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          Trade
                          <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
