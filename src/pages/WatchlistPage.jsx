import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Sparkles, TrendingUp, TrendingDown, ArrowUpRight, Plus, Trash2, Grid, List, Check } from 'lucide-react';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';
import { useWatchlistStore } from '../stores/useWatchlistStore';
import CryptoAssetCard from '../features/market/components/CryptoAssetCard';

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { assets, setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const { savedSymbols, toggleWatchlist, isWatchlisted } = useWatchlistStore();

  const [activeTab, setActiveTab] = useState('SAVED'); // 'SAVED', 'GAINERS', 'LOSERS', 'ALL'
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID' or 'TABLE'
  const [newSymbolInput, setNewSymbolInput] = useState('');

  // Filtered Assets based on Active Tab
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
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-violet-400" />
            AI Watchlist & Market Intelligence
          </h1>
          <p className="text-xs text-[#B4B4CF]">Monitored crypto assets with continuous AI sentiment and neural forecast tracking</p>
        </div>

        {/* Quick Add Asset Input Form */}
        <form onSubmit={handleAddSymbol} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={newSymbolInput}
              onChange={(e) => setNewSymbolInput(e.target.value)}
              placeholder="Add coin (e.g. BTC, ETH)..."
              className="px-3.5 py-1.5 bg-[#1B1B2B] border border-[#292940] rounded-xl text-xs text-white placeholder-[#757595] focus:outline-none focus:border-violet-500/50 w-52"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors shadow-md shadow-violet-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        </form>
      </div>

      {/* Filter Tabs & View Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#292940]">
        <div className="flex items-center bg-[#151521] p-1 rounded-xl border border-[#292940]">
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
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-[#757595] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid vs Table Toggle */}
        <div className="flex items-center bg-[#151521] p-1 rounded-xl border border-[#292940]">
          <button
            onClick={() => setViewMode('GRID')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'GRID' ? 'bg-violet-600 text-white' : 'text-[#757595] hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('TABLE')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'TABLE' ? 'bg-violet-600 text-white' : 'text-[#757595] hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Rendering: Grid vs Table */}
      {displayedAssets.length === 0 ? (
        <div className="p-12 text-center bg-[#151521] border border-[#292940] rounded-2xl space-y-3">
          <Bookmark className="w-8 h-8 text-[#757595] mx-auto" />
          <h3 className="text-sm font-bold text-white">No Watchlisted Assets Found</h3>
          <p className="text-xs text-[#B4B4CF] max-w-sm mx-auto">
            Click the bookmark button on any crypto asset card or search above to save tokens to your watchlist.
          </p>
        </div>
      ) : viewMode === 'GRID' ? (
        /* Grid of Crypto Cards with Embedded Charts & Prediction Lines */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {displayedAssets.map((asset) => (
            <CryptoAssetCard key={asset.symbol} asset={asset} />
          ))}
        </div>
      ) : (
        /* Dense Watchlist Table */
        <div className="bg-[#151521] border border-[#292940] rounded-2xl overflow-hidden shadow-xl animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0E0E14] text-[#757595] border-b border-[#292940] uppercase text-[10px] tracking-wider">
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
              <tbody className="divide-y divide-[#292940]">
                {displayedAssets.map((asset) => {
                  const bookmarked = isWatchlisted(asset.symbol);
                  return (
                    <tr key={asset.symbol} className="hover:bg-[#1B1B2B] transition-colors group">
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleWatchlist(asset.symbol)}
                          className="p-1 rounded text-[#757595] hover:text-amber-400 transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1B1B2B] flex items-center justify-center font-bold text-xs">
                          {asset.base.slice(0, 3)}
                        </div>
                        <div>
                          <div className="group-hover:text-violet-400 transition-colors">{asset.symbol}</div>
                          <div className="text-[10px] text-[#757595] font-normal">{asset.name}</div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-white">
                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-3.5 px-4 font-medium">
                        <span className={`flex items-center gap-1 ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {asset.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {asset.change24h}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            asset.aiSentiment === 'Bullish'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {asset.aiSentiment} ({asset.aiConfidence}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">
                        ${asset.aiTargetPrice.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-red-400 font-bold">
                        ${asset.aiStopLoss.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => openAnalysisModal(asset)}
                          className="px-2.5 py-1 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-violet-400" />
                          Scan AI
                        </button>
                        <button
                          onClick={() => {
                            setActiveSymbol(asset.symbol);
                            navigate('/markets');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#1B1B2B] hover:bg-[#232338] text-white border border-[#292940] text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          Trade
                          <ArrowUpRight className="w-3 h-3 text-[#757595]" />
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
