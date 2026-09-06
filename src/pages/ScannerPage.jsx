import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Sparkles, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';

export default function ScannerPage() {
  const navigate = useNavigate();
  const { assets, setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const [filterTab, setFilterTab] = useState('ALL');

  const filteredAssets = assets.filter((asset) => {
    if (filterTab === 'BULLISH') return asset.aiSentiment === 'Bullish';
    if (filterTab === 'BEARISH') return asset.aiSentiment === 'Bearish';
    if (filterTab === 'HIGH_CONFIDENCE') return asset.aiConfidence >= 80;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Scan className="w-5 h-5 text-blue-500" />
            AI Market Scanner
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time algorithmic scanner filtering order block confluences & momentum</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-white dark:bg-[#0D1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {['ALL', 'BULLISH', 'BEARISH', 'HIGH_CONFIDENCE'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Dense Scanner Table */}
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#070A11] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Asset</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">24h Change</th>
                <th className="py-3 px-4 font-semibold">AI Sentiment</th>
                <th className="py-3 px-4 font-semibold">Confidence</th>
                <th className="py-3 px-4 font-semibold">Liquidity Profile</th>
                <th className="py-3 px-4 font-semibold">Volatility</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredAssets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-800 dark:text-white">
                      {asset.base.slice(0, 3)}
                    </div>
                    <div>
                      <div>{asset.symbol}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{asset.name}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-slate-900 dark:text-white">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3 px-4 font-medium">
                    <span className={`flex items-center gap-1 ${asset.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {asset.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {asset.change24h}%
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        asset.aiSentiment === 'Bullish'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                          : asset.aiSentiment === 'Bearish'
                          ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                          : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
                      }`}
                    >
                      {asset.aiSentiment}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {asset.aiConfidence}%
                  </td>

                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {asset.liquidityScore}
                  </td>

                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {asset.volatility}
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
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
                      Chart
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
