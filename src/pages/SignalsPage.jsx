import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { MOCK_SIGNALS } from '../services/mockCryptoData';
import { useMarketStore } from '../stores/useMarketStore';

export default function SignalsPage() {
  const navigate = useNavigate();
  const { setActiveSymbol } = useMarketStore();
  const [filterDirection, setFilterDirection] = useState('ALL');

  const filteredSignals = MOCK_SIGNALS.filter((sig) => {
    if (filterDirection === 'LONG') return sig.direction === 'LONG';
    if (filterDirection === 'SHORT') return sig.direction === 'SHORT';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-200/90 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-700 dark:text-amber-300">AI Risk & Probability Notice:</strong> All signals are generated via quantitative algorithmic models & structural confluences. They represent statistical probabilities, not guaranteed profits. Always employ strict risk management.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            AI Trading Signals
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time high-confluence entry setups detected by machine learning models</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-white dark:bg-[#0D1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {['ALL', 'LONG', 'SHORT'].map((dir) => (
            <button
              key={dir}
              onClick={() => setFilterDirection(dir)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterDirection === dir
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dir}
            </button>
          ))}
        </div>
      </div>

      {/* Signal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSignals.map((signal) => (
          <div
            key={signal.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all space-y-4 shadow-sm dark:shadow-lg group"
          >
            {/* Signal Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white text-sm">
                  {signal.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {signal.symbol}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{signal.setupType}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-black tracking-wider ${
                    signal.direction === 'LONG'
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30'
                  }`}
                >
                  {signal.direction}
                </span>
              </div>
            </div>

            {/* Price Levels Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <div>
                <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">Entry Level</span>
                <span className="text-slate-900 dark:text-white font-bold">${signal.entry.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">Take Profit</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">${signal.target.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">Stop Loss</span>
                <span className="text-red-600 dark:text-red-400 font-bold">${signal.stopLoss.toLocaleString()}</span>
              </div>
            </div>

            {/* Signal Metrics & Confluence Detail */}
            <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase">AI Reasoning</div>
              <p className="text-[11px] leading-relaxed">{signal.details}</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">R:R Ratio <strong className="text-slate-900 dark:text-white font-mono">{signal.riskReward}</strong></span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{signal.confidence}% Confidence</span>
              </div>

              <button
                onClick={() => {
                  setActiveSymbol(signal.symbol);
                  navigate('/markets');
                }}
                className="py-1.5 px-3 rounded-lg bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-semibold text-xs flex items-center gap-1 transition-all"
              >
                <span>Chart Setup</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
