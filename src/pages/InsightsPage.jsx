import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Zap,
  Flame,
  Globe2,
  Calendar,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Layers,
  BarChart3,
  Filter,
  DollarSign
} from 'lucide-react';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';

export default function InsightsPage() {
  const { assets } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const [activeSector, setActiveSector] = useState('ALL');
  const [timeframe, setTimeframe] = useState('24H');

  const SECTOR_NARRATIVES = [
    { id: 'AI', name: 'AI & Autonomous Agents', change: '+14.8%', volume: '$2.4B', sentiment: 'Extreme Bullish', topAsset: 'NEAR / RENDER', color: 'blue' },
    { id: 'L1', name: 'Layer 1 High-Throughput', change: '+8.3%', volume: '$7.9B', sentiment: 'Strong Bullish', topAsset: 'SOL / SUI', color: 'emerald' },
    { id: 'RWA', name: 'Real World Assets (RWA)', change: '+5.6%', volume: '$920M', sentiment: 'Bullish', topAsset: 'ONDO / LINK', color: 'cyan' },
    { id: 'DEFI', name: 'DeFi & Restaking Yield', change: '+3.1%', volume: '$3.8B', sentiment: 'Neutral Accumulation', topAsset: 'UNI / AAVE', color: 'purple' },
    { id: 'MEME', name: 'Speculative Momentum', change: '-2.4%', volume: '$4.1B', sentiment: 'High Volatility', topAsset: 'DOGE / PEPE', color: 'amber' },
  ];

  const ON_CHAIN_METRICS = [
    {
      title: 'Exchange Net Outflow',
      value: '-18,420 BTC',
      subtext: 'Accumulation in cold storage',
      status: 'Bullish',
      positive: true,
    },
    {
      title: 'Stablecoin Supply Ratio (SSR)',
      value: '4.82',
      subtext: 'Dry powder ready for deployment',
      status: 'High Liquidity',
      positive: true,
    },
    {
      title: 'Whale Holdings (>1k BTC)',
      value: '3.18M BTC',
      subtext: '+0.8% net 7d accumulation',
      status: 'Aggressive Buy',
      positive: true,
    },
    {
      title: 'Estimated Leverage Ratio',
      value: '0.245',
      subtext: 'Healthy derivative positioning',
      status: 'Moderate Risk',
      positive: false,
    },
  ];

  const UPCOMING_CATALYSTS = [
    { date: 'SEP 12', time: '13:30 UTC', event: 'US Core CPI Inflation Print', impact: 'HIGH', bias: 'Market Volatility' },
    { date: 'SEP 18', time: '18:00 UTC', event: 'FOMC Federal Funds Rate Decision', impact: 'CRITICAL', bias: 'Bullish Liquidity' },
    { date: 'SEP 25', time: '08:00 UTC', event: 'Quarterly Derivatives Expiry ($9.8B)', impact: 'HIGH', bias: 'Price Magnet' },
    { date: 'OCT 04', time: '12:00 UTC', event: 'Institutional Ethereum ETF Staking Proposal', impact: 'MEDIUM', bias: 'DeFi Catalyst' },
  ];

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Market Insights & Alpha Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Institutional on-chain telemetry, narrative rotations, liquidity heatmaps, and macro catalysts
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          {['1H', '24H', '7D', '30D'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeframe === t
                  ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top Banner: Key Market Thesis */}
      <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 border border-blue-500/30 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Institutional Macro Thesis
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                Confidence 94%
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
              Sustained Exchange Outflows indicate High-Conviction Institutional Accumulation Phase
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Whale clusters have absorbed over 18,400 BTC from centralized reserves during local consolidations. Derivative funding rates remain reset, dampening liquidation cascade probability for the upcoming 7 days.
            </p>
          </div>
        </div>

        <button
          onClick={() => openAnalysisModal(assets[0])}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shrink-0 transition-all shadow-md shadow-blue-500/25 active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <span>Run AI Deep Scan</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid: On-Chain Liquidity Radar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            On-Chain Liquidity & Reserve Indicators
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">Updated 1m ago</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ON_CHAIN_METRICS.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/30 transition-all space-y-2"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium">{m.title}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  m.positive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}>
                  {m.status}
                </span>
              </div>
              <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                {m.value}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                {m.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Sector Narratives Heatmap & Economic Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Narratives (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Narrative Rotations & Sector Capital Flow
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Where institutional capital and retail liquidity are clustering</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Leading:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">AI Agents (+14.8%)</span>
            </div>
          </div>

          <div className="space-y-3">
            {SECTOR_NARRATIVES.map((sec) => (
              <div
                key={sec.id}
                className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{sec.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Vol: {sec.volume}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>Key Assets: <strong className="text-slate-700 dark:text-slate-200">{sec.topAsset}</strong></span>
                    <span>•</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{sec.sentiment}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`text-sm font-black font-mono flex items-center gap-0.5 ${
                    sec.change.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {sec.change.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {sec.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Calendar & Catalysts (1 Col) */}
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Macro Catalysts Calendar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">High-impact financial & protocol events</p>
          </div>

          <div className="space-y-3">
            {UPCOMING_CATALYSTS.map((cat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    {cat.date} • {cat.time}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    cat.impact === 'CRITICAL'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      : cat.impact === 'HIGH'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                  }`}>
                    {cat.impact}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {cat.event}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Expected Impact: {cat.bias}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
