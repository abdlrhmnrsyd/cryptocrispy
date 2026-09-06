import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Sparkles,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ChevronDown,
  Plus,
  ArrowRight,
  Grid,
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
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Welcome back, Mahbubul
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-sm shadow-violet-500/20">
              ✦ AI Intelligence Active
            </span>
          </h1>
          <p className="text-xs text-[#B4B4CF] mt-0.5">
            Real-time market analytics, neural price forecasts, and institutional signals
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAnalysisModal(heroBtc)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-violet-600/30"
          >
            <Sparkles className="w-4 h-4 text-violet-200" />
            <span>AI Deep Scan</span>
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="p-2 rounded-xl bg-[#1B1B2B] border border-[#292940] text-[#B4B4CF] hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 p-0.5 shadow-md cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#151521] flex items-center justify-center text-xs font-bold text-white">
              M
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI Forecast Hero Banner */}
      <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-[#1B1B2C] via-[#1F1C33] to-[#151521] border border-violet-500/40 shadow-2xl relative overflow-hidden ai-card-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/15 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/40">
                <Sparkles className="w-4 h-4 text-violet-300" />
              </span>
              <span className="text-xs font-bold tracking-widest text-violet-300 uppercase">
                ✦ AI NEURAL MARKET CO-PILOT
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#B4B4CF] uppercase font-semibold">Macro Sentiment:</span>
                <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider">
                  BULLISH CONTINUATION
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-[#292940] pl-4">
                <span className="text-xs text-[#B4B4CF] uppercase font-semibold">AI Confidence:</span>
                <span className="text-base font-extrabold text-violet-300 font-mono">91%</span>
              </div>
            </div>

            <p className="text-sm text-white leading-relaxed">
              Institutional taker volume delta and liquidity sweeps confirm <strong className="text-violet-300">BTC/USDT</strong> continuation toward <strong className="text-emerald-400">$116,800</strong> target range.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-[#B4B4CF] bg-[#151521]/80 p-2.5 rounded-xl border border-[#292940]">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bullish 4H Market Structure Shift (MSS)</span>
              </div>
              <div className="flex items-center gap-2 text-[#B4B4CF] bg-[#151521]/80 p-2.5 rounded-xl border border-[#292940]">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Liquidity sweep cleared at $108,950</span>
              </div>
            </div>
          </div>

          {/* Quick AI Targets */}
          <div className="w-full lg:w-72 shrink-0 bg-[#0F0F18]/90 border border-violet-500/30 rounded-2xl p-4 space-y-3 text-xs shadow-xl">
            <div className="text-xs font-bold text-violet-300 uppercase tracking-wider border-b border-[#232338] pb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              AI Technical Boundaries
            </div>
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between text-[#B4B4CF]">
                <span>Support Level:</span> <span className="text-emerald-400 font-bold">$109,200</span>
              </div>
              <div className="flex justify-between text-[#B4B4CF]">
                <span>Resistance Level:</span> <span className="text-red-400 font-bold">$114,800</span>
              </div>
              <div className="flex justify-between text-[#B4B4CF]">
                <span>Order Block OB:</span> <span className="text-violet-300 font-bold">$108,800</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('/markets');
              }}
              className="w-full py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 border border-violet-500/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>Open Trading Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Top Hero Card: Total Balance & Blue Spline Wave Chart */}
      <div className="card-dark-glow rounded-3xl p-6 relative overflow-hidden space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-[#B4B4CF] font-medium">Total balance</div>
            <div className="text-2xl md:text-3xl font-black font-mono text-white mt-1">
              $107,843.82
            </div>
          </div>

          <button
            onClick={() => navigate('/portfolio')}
            className="px-3.5 py-1.5 rounded-xl bg-[#1B1B2B] border border-[#292940] text-white hover:bg-[#232338] text-xs font-semibold shadow-sm transition-colors"
          >
            View report
          </button>
        </div>

        <HeroSplineChart />
      </div>

      {/* 4. Middle Row: 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's revenue */}
        <div className="card-dark rounded-2xl p-4 space-y-3 relative group">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B4B4CF] font-medium">Today's revenue</span>
            <button className="text-[#757595] hover:text-white p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold font-mono text-white">$1,380</div>
              <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 mt-1">
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
        <div className="card-dark rounded-2xl p-4 space-y-3 relative group">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B4B4CF] font-medium">Today's orders</span>
            <button className="text-[#757595] hover:text-white p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold font-mono text-white">53</div>
              <div className="text-[11px] font-medium text-red-400 flex items-center gap-1 mt-1">
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
        <div className="card-dark rounded-2xl p-4 space-y-3 relative group">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B4B4CF] font-medium">Avg. order value</span>
            <button className="text-[#757595] hover:text-white p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold font-mono text-white">$34.86</div>
              <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 mt-1">
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
      <div className="pt-6 border-t border-[#292940] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Crypto AI Intelligence Cards Grid
            </h2>
            <p className="text-xs text-[#B4B4CF]">
              Crypto asset cards featuring AI prediction paths, forecast bands, and embedded Lightweight Charts
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-[#151521] p-1 rounded-xl border border-[#292940]">
            {['ALL', 'BULLISH', 'BEARISH', 'HIGH_CONFIDENCE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterTab === tab
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-[#757595] hover:text-white'
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
