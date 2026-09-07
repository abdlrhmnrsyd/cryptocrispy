import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Sparkles,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';

import HeroSplineChart from '../components/dashboard/HeroSplineChart';
import AssetDonutChart from '../components/dashboard/AssetDonutChart';
import CashflowBarChart from '../components/dashboard/CashflowBarChart';
import FearAndGreedGauge from '../components/dashboard/FearAndGreedGauge';
import WhaleAlertStream from '../components/dashboard/WhaleAlertStream';
import OrderBookDepthWidget from '../components/dashboard/OrderBookDepthWidget';
import AIPositionRiskCalculator from '../components/dashboard/AIPositionRiskCalculator';
import CryptoAssetCard from '../features/market/components/CryptoAssetCard';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { assets } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const [filterTab, setFilterTab] = useState('ALL');

  const heroBtc = assets.find((a) => a.base === 'BTC') || assets[0];

  const filteredAssets = assets.filter((asset) => {
    if (filterTab === 'BULLISH') return asset.aiSentiment === 'Bullish';
    if (filterTab === 'BEARISH') return asset.aiSentiment === 'Bearish';
    if (filterTab === 'HIGH_CONFIDENCE') return asset.aiConfidence >= 80;
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      {/* 1. Top Bar Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            Welcome back, Mahbubul
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-2xs">
              ✦ AI Intelligence Active
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time market analytics, neural price forecasts, and institutional signals
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAnalysisModal(heroBtc)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-600/25 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-100" />
            <span>AI Deep Scan</span>
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="p-2.5 rounded-xl bg-white dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/30 transition-all active:scale-95"
            aria-label="Alerts"
          >
            <Bell className="w-4 h-4" />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#0D1117] flex items-center justify-center text-xs font-black text-slate-900 dark:text-white">
              M
            </div>
          </div>
        </div>
      </div>      {/* 2. AI Forecast Hero Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-slate-900/40 to-[#0D121F] border border-blue-500/30 dark:border-blue-500/40 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 blur-3xl pointer-events-none rounded-full animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/10 blur-2xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 neon-glow-blue">
                <Sparkles className="w-4 h-4 text-blue-300" />
              </span>
              <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                ✦ AI NEURAL MARKET CO-PILOT
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase font-semibold">Macro Sentiment:</span>
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 tracking-wider neon-glow-emerald">
                  BULLISH CONTINUATION
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-700/80 pl-3">
                <span className="text-xs text-slate-400 uppercase font-semibold">Confidence:</span>
                <span className="text-base font-black text-blue-400 font-mono">91%</span>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              Institutional taker volume delta and liquidity sweeps confirm <strong className="text-blue-400">BTC/USDT</strong> continuation toward <strong className="text-emerald-400">$116,800</strong> target range.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
              <div className="flex items-center gap-2.5 text-slate-300 bg-[#0D121F]/90 p-3 rounded-2xl border border-slate-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Bullish 4H Market Structure Shift (MSS)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 bg-[#0D121F]/90 p-3 rounded-2xl border border-slate-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Liquidity sweep cleared at $108,950</span>
              </div>
            </div>
          </div>

          {/* Quick AI Targets */}
          <div className="w-full lg:w-80 shrink-0 bg-[#0D121F]/95 backdrop-blur-md border border-blue-500/30 rounded-2xl p-4.5 space-y-3.5 text-xs shadow-2xl">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                AI Boundaries
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">24H</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Support:</span> <span className="text-emerald-400 font-bold text-sm">$109,200</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Resistance:</span> <span className="text-rose-400 font-bold text-sm">$114,800</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Order Block:</span> <span className="text-blue-300 font-bold text-sm">$108,800</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/markets');
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30 active:scale-95 cursor-pointer"
            >
              <span>Open Trading Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Top Hero Card: Total Balance & Blue Spline Wave Chart */}
      <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 relative overflow-hidden space-y-4 shadow-xs dark:shadow-2xl transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Total Portfolio Balance</div>
            <div className="text-3xl md:text-4xl font-black font-mono text-slate-900 dark:text-white mt-1 tracking-tight">
              $107,843.82
            </div>
          </div>

          <button
            onClick={() => navigate('/portfolio')}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#121829] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            View Full Report
          </button>
        </div>

        <HeroSplineChart />
      </div>

      {/* 4. Middle Row: 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's revenue */}
        <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/40 rounded-2xl p-4.5 space-y-3 relative group transition-all shadow-xs hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Today's Revenue</span>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-md">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">$1,380</div>
              <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14% vs last mo</span>
              </div>
            </div>

            <svg className="w-20 h-10" viewBox="0 0 100 40">
              <path
                d="M 0 30 Q 25 35, 50 15 T 100 5"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Win Rate */}
        <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/40 rounded-2xl p-4.5 space-y-3 relative group transition-all shadow-xs hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">AI Signal Win Rate</span>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-md">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">88.4%</div>
              <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1 font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>High Confluence</span>
              </div>
            </div>

            <svg className="w-20 h-10" viewBox="0 0 100 40">
              <path
                d="M 0 25 Q 30 10, 60 20 T 100 8"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Active Positions */}
        <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/40 rounded-2xl p-4.5 space-y-3 relative group transition-all shadow-xs hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Open Positions</span>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-md">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">12 Active</div>
              <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+$4,820 Floating PnL</span>
              </div>
            </div>

            <svg className="w-20 h-10" viewBox="0 0 100 40">
              <path
                d="M 0 35 Q 25 25, 50 10 T 100 8"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 5. Bottom Row: Donut Chart & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <AssetDonutChart />
        </div>
        <div className="lg:col-span-7">
          <CashflowBarChart />
        </div>
      </div>

      {/* Institutional Market Dynamics: Sentiment & Whale Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FearAndGreedGauge />
        <WhaleAlertStream />
      </div>

      {/* Institutional Execution & Risk Engine: Order Book Depth & AI Position Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrderBookDepthWidget />
        <AIPositionRiskCalculator />
      </div>

      {/* 6. AI Crypto Intelligence Cards Grid */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Crypto AI Intelligence Cards Grid
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Crypto asset cards featuring AI prediction paths, forecast bands, and embedded Lightweight Charts
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-white dark:bg-[#0D121F] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            {['ALL', 'BULLISH', 'BEARISH', 'HIGH_CONFIDENCE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  filterTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Crypto Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {filteredAssets.map((asset) => (
            <CryptoAssetCard key={asset.symbol} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
