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
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, Mahbubul
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40 shadow-xs">
              ✦ AI Intelligence Active
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time market analytics, neural price forecasts, and institutional signals
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAnalysisModal(heroBtc)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/30"
          >
            <Sparkles className="w-4 h-4 text-blue-100" />
            <span>AI Deep Scan</span>
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="p-2 rounded-xl bg-white dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md cursor-pointer">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#0D1117] flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">
              M
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI Forecast Hero Banner */}
      <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-slate-50 to-white dark:from-[#0D1527] dark:via-[#111A2E] dark:to-[#0D1117] border border-blue-200 dark:border-blue-500/30 shadow-md dark:shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-600/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-300" />
              </span>
              <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-300 uppercase">
                ✦ AI NEURAL MARKET CO-PILOT
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Macro Sentiment:</span>
                <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 tracking-wider">
                  BULLISH CONTINUATION
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">AI Confidence:</span>
                <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">91%</span>
              </div>
            </div>

            <p className="text-sm text-slate-800 dark:text-white leading-relaxed">
              Institutional taker volume delta and liquidity sweeps confirm <strong className="text-blue-600 dark:text-blue-400">BTC/USDT</strong> continuation toward <strong className="text-emerald-600 dark:text-emerald-400">$116,800</strong> target range.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-[#0D1117]/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Bullish 4H Market Structure Shift (MSS)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-[#0D1117]/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Liquidity sweep cleared at $108,950</span>
              </div>
            </div>
          </div>

          {/* Quick AI Targets */}
          <div className="w-full lg:w-72 shrink-0 bg-white dark:bg-[#070A11]/90 border border-slate-200 dark:border-blue-500/30 rounded-2xl p-4 space-y-3 text-xs shadow-md dark:shadow-xl">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              AI Technical Boundaries
            </div>
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Support Level:</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">$109,200</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Resistance Level:</span> <span className="text-red-600 dark:text-red-400 font-bold">$114,800</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Order Block OB:</span> <span className="text-blue-600 dark:text-blue-300 font-bold">$108,800</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/markets');
              }}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Open Trading Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Top Hero Card: Total Balance & Blue Spline Wave Chart */}
      <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 relative overflow-hidden space-y-4 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total balance</div>
            <div className="text-2xl md:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
              $107,843.82
            </div>
          </div>

          <button
            onClick={() => navigate('/portfolio')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors"
          >
            View report
          </button>
        </div>

        <HeroSplineChart />
      </div>

      {/* 4. Middle Row: 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's revenue */}
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 relative group transition-colors shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Today's revenue</span>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">$1,380</div>
              <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>14% last mo</span>
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

        {/* Card 2: Today's orders */}
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 relative group transition-colors shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Today's orders</span>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">53</div>
              <div className="text-[11px] font-medium text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>14% last mo</span>
              </div>
            </div>

            <svg className="w-20 h-10" viewBox="0 0 100 40">
              <path
                d="M 0 10 Q 25 5, 50 25 T 100 35"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Avg. order value */}
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 relative group transition-colors shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg. order value</span>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">$34.86</div>
              <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>25% last mo</span>
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

      {/* 6. AI Crypto Intelligence Cards Grid */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Crypto AI Intelligence Cards Grid
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Crypto asset cards featuring AI prediction paths, forecast bands, and embedded Lightweight Charts
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-white dark:bg-[#0D1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
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
