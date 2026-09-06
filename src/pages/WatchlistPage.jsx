import { useNavigate } from 'react';
import { Bookmark, Sparkles, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { assets, setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-violet-400" />
            Watchlist & Market Intelligence
          </h1>
          <p className="text-xs text-[#A1A1AA]">Monitored crypto assets with continuous AI sentiment and structure tracking</p>
        </div>
      </div>

      <div className="bg-[#111113] border border-[#27272A] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#09090B] text-[#71717A] border-b border-[#27272A] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Asset</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">24h Change</th>
                <th className="py-3 px-4 font-semibold">AI Sentiment</th>
                <th className="py-3 px-4 font-semibold">Key Support</th>
                <th className="py-3 px-4 font-semibold">Key Resistance</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/50">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-[#18181B]/60 transition-colors group">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center font-bold text-xs">
                      {asset.base.slice(0, 3)}
                    </div>
                    <div>
                      <div className="group-hover:text-violet-400 transition-colors">{asset.symbol}</div>
                      <div className="text-[10px] text-[#71717A] font-normal">{asset.name}</div>
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
                          : asset.aiSentiment === 'Bearish'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}
                    >
                      {asset.aiSentiment} ({asset.aiConfidence}%)
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-emerald-400">
                    ${asset.support.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-red-400">
                    ${asset.resistance.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openAnalysisModal(asset)}
                      className="px-2.5 py-1 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-violet-400" />
                      Analyze
                    </button>
                    <button
                      onClick={() => {
                        setActiveSymbol(asset.symbol);
                        navigate('/markets');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#FAFAFA] border border-[#27272A] text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      Trade
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
