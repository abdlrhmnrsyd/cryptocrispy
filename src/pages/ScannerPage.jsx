import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Sparkles, Filter, ArrowUpRight, TrendingUp, TrendingDown, Layers } from 'lucide-react';
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
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Scan className="w-5 h-5 text-violet-400" />
            AI Market Scanner
          </h1>
          <p className="text-xs text-[#A1A1AA]">Real-time algorithmic scanner filtering order block confluences & momentum</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-[#111113] p-1 rounded-xl border border-[#27272A]">
          {['ALL', 'BULLISH', 'BEARISH', 'HIGH_CONFIDENCE'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterTab === tab
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-[#71717A] hover:text-white'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Dense Scanner Table */}
      <div className="bg-[#111113] border border-[#27272A] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#09090B] text-[#71717A] border-b border-[#27272A] uppercase text-[10px] tracking-wider">
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
            <tbody className="divide-y divide-[#27272A]/50">
              {filteredAssets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-[#18181B]/60 transition-colors group">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#27272A] flex items-center justify-center text-xs">
                      {asset.base.slice(0, 3)}
                    </div>
                    <div>
                      <div>{asset.symbol}</div>
                      <div className="text-[10px] text-[#71717A] font-normal">{asset.name}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-white">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3 px-4 font-medium">
                    <span className={`flex items-center gap-1 ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {asset.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {asset.change24h}%
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        asset.aiSentiment === 'Bullish'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : asset.aiSentiment === 'Bearish'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}
                    >
                      {asset.aiSentiment}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-violet-300">
                    {asset.aiConfidence}%
                  </td>

                  <td className="py-3 px-4 text-[#A1A1AA]">
                    {asset.liquidityScore}
                  </td>

                  <td className="py-3 px-4 text-[#A1A1AA]">
                    {asset.volatility}
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
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
                      className="px-2.5 py-1 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#FAFAFA] border border-[#27272A] text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      Chart
                      <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
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
