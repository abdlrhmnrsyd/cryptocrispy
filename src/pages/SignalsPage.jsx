import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldAlert, Sparkles, ArrowUpRight, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
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
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">AI Risk & Probability Notice:</strong> All signals are generated via quantitative algorithmic models & structural confluences. They represent statistical probabilities, not guaranteed profits. Always employ strict risk management.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-400" />
            AI Trading Signals
          </h1>
          <p className="text-xs text-[#A1A1AA]">Real-time high-confluence entry setups detected by machine learning models</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-[#111113] p-1 rounded-xl border border-[#27272A]">
          {['ALL', 'LONG', 'SHORT'].map((dir) => (
            <button
              key={dir}
              onClick={() => setFilterDirection(dir)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterDirection === dir
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-[#71717A] hover:text-white'
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
            className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] hover:border-violet-500/40 transition-all space-y-4 shadow-lg group"
          >
            {/* Signal Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center font-bold text-white text-sm">
                  {signal.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm group-hover:text-violet-400 transition-colors">
                    {signal.symbol}
                  </div>
                  <div className="text-[10px] text-[#71717A] font-medium">{signal.setupType}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-black tracking-wider ${
                    signal.direction === 'LONG'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/15 text-red-400 border border-red-500/30'
                  }`}
                >
                  {signal.direction}
                </span>
              </div>
            </div>

            {/* Price Levels Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs font-mono">
              <div>
                <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">Entry Level</span>
                <span className="text-white font-bold">${signal.entry.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">Take Profit</span>
                <span className="text-emerald-400 font-bold">${signal.target.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">Stop Loss</span>
                <span className="text-red-400 font-bold">${signal.stopLoss.toLocaleString()}</span>
              </div>
            </div>

            {/* Signal Metrics & Confluence Detail */}
            <div className="text-xs text-[#A1A1AA] bg-[#18181B]/50 p-2.5 rounded-lg border border-[#27272A]/60 space-y-1">
              <div className="text-[10px] font-semibold text-violet-300 uppercase">AI Reasoning</div>
              <p className="text-[11px] leading-relaxed">{signal.details}</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-[#27272A] text-xs">
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-[#71717A]">R:R Ratio <strong className="text-white font-mono">{signal.riskReward}</strong></span>
                <span className="text-violet-400 font-semibold">{signal.confidence}% Confidence</span>
              </div>

              <button
                onClick={() => {
                  setActiveSymbol(signal.symbol);
                  navigate('/markets');
                }}
                className="py-1.5 px-3 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 font-semibold text-xs flex items-center gap-1 transition-all"
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
