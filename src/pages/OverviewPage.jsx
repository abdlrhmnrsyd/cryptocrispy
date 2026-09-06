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
  ArrowUpRight,
  BarChart2,
  Grid
} from 'lucide-react';

import HeroSplineChart from '../components/dashboard/HeroSplineChart';
import AssetDonutChart from '../components/dashboard/AssetDonutChart';
import CashflowBarChart from '../components/dashboard/CashflowBarChart';
import CryptoAssetCard from '../features/market/components/CryptoAssetCard';
import { useMarketStore } from '../stores/useMarketStore';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { assets } = useMarketStore();
  const [showCardsGrid, setShowCardsGrid] = useState(true);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      {/* 1. Top Bar Greeting matching reference screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome back, Mahbubul
          </h1>
          <p className="text-xs text-[#9A9AB0] mt-0.5">
            Your current sales summary and activity
          </p>
        </div>

        {/* Right Actions matching screenshot */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/subscription')}
            className="px-3.5 py-1.5 rounded-xl bg-[#161620] border border-white/10 hover:border-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upgrade now</span>
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="p-2 rounded-xl bg-[#121218] border border-[#1E1E28] text-[#9A9AB0] hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shadow-md cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#121218] flex items-center justify-center text-xs font-bold text-white">
              M
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Hero Card: Total Balance & Electric Blue Spline Chart matching screenshot */}
      <div className="card-dark-glow rounded-3xl p-6 relative overflow-hidden space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-[#9A9AB0] font-medium">Total balance</div>
            <div className="text-2xl md:text-3xl font-black font-mono text-white mt-1">
              $107,843.82
            </div>
          </div>

          <button
            onClick={() => navigate('/portfolio')}
            className="px-3.5 py-1.5 rounded-xl bg-[#181824] border border-[#222230] text-white hover:bg-[#202030] text-xs font-semibold shadow-sm transition-colors"
          >
            View report
          </button>
        </div>

        {/* Spline Wave Chart component */}
        <HeroSplineChart />
      </div>

      {/* 3. Middle Row: 3 Metric Cards matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's revenue */}
        <div className="card-dark rounded-2xl p-4 space-y-3 relative group">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9A9AB0] font-medium">Today's revenue</span>
            <button className="text-[#626278] hover:text-white p-1">
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

            {/* Mini Green Sparkline */}
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
            <span className="text-xs text-[#9A9AB0] font-medium">Today's orders</span>
            <button className="text-[#626278] hover:text-white p-1">
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

            {/* Mini Red Sparkline */}
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
            <span className="text-xs text-[#9A9AB0] font-medium">Avg. order value</span>
            <button className="text-[#626278] hover:text-white p-1">
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

            {/* Mini Green Sparkline */}
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

      {/* 4. Bottom Row: Donut Chart & 3D Bar Chart matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <AssetDonutChart />
        </div>
        <div className="lg:col-span-7">
          <CashflowBarChart />
        </div>
      </div>

      {/* 5. Interactive Crypto Intelligence Cards Grid (Visible by default) */}
      <div className="pt-6 border-t border-[#1E1E28] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Grid className="w-4 h-4 text-blue-400" />
              Crypto AI Intelligence Cards Grid
            </h2>
            <p className="text-xs text-[#9A9AB0]">
              Detailed crypto cards with embedded Lightweight Charts & AI price trajectory forecasts
            </p>
          </div>

          <button
            onClick={() => setShowCardsGrid(!showCardsGrid)}
            className="px-3 py-1.5 rounded-xl bg-[#161620] border border-[#22222E] text-xs font-semibold text-white hover:bg-[#1C1C28] flex items-center gap-1.5"
          >
            <span>{showCardsGrid ? 'Hide Crypto Cards' : 'View Crypto Cards'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCardsGrid ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showCardsGrid && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {assets.map((asset) => (
              <CryptoAssetCard key={asset.symbol} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
