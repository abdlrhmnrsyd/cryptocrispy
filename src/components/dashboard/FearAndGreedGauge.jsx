import { useState } from 'react';
import { Gauge, TrendingUp, AlertTriangle, ShieldCheck, History } from 'lucide-react';

export default function FearAndGreedGauge() {
  const [activeRange, setActiveRange] = useState('NOW');

  // Fear & Greed Index score (0 - 100)
  const score = 78;
  const status = 'Extreme Greed';
  const prevDay = 74;
  const prevWeek = 68;
  const prevMonth = 52;

  // Calculate rotation for needle (-90 deg at 0 to +90 deg at 100)
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className="bg-white dark:bg-[#0E1626] border border-slate-300 dark:border-slate-700/90 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Fear & Greed Index</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Macro Market Psychology Meter</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>Bull Dominance</span>
        </span>
      </div>

      {/* Speedometer Arc & Score Display */}
      <div className="flex flex-col items-center justify-center pt-2 relative">
        <div className="relative w-48 h-28 overflow-hidden flex items-end justify-center">
          {/* Background SVG Gauge Arc */}
          <svg className="w-48 h-48 -mb-20 transform -rotate-180" viewBox="0 0 100 100">
            {/* Arc segments: Extreme Fear (Red), Fear (Orange), Neutral (Yellow), Greed (Light Green), Extreme Greed (Emerald) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#EF4444"
              strokeWidth="8"
              strokeDasharray="25 226"
              strokeDashoffset="0"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#F97316"
              strokeWidth="8"
              strokeDasharray="25 226"
              strokeDashoffset="-26"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#EAB308"
              strokeWidth="8"
              strokeDasharray="25 226"
              strokeDashoffset="-52"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#22C55E"
              strokeWidth="8"
              strokeDasharray="25 226"
              strokeDashoffset="-78"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10B981"
              strokeWidth="8"
              strokeDasharray="26 226"
              strokeDashoffset="-104"
            />
          </svg>

          {/* Needle Indicator */}
          <div
            className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom rounded-full bg-slate-900 dark:bg-white shadow-lg transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute -top-1 -left-0.5 ring-2 ring-white dark:ring-slate-900" />
          </div>

          {/* Needle Base Pin */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 dark:bg-white ring-4 ring-blue-500/30" />
        </div>

        {/* Center Score & Classification */}
        <div className="text-center mt-3">
          <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 leading-none">
            {score}
          </div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white mt-1">
            {status}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            Updated 12 mins ago from aggregated derivatives & volatility
          </p>
        </div>
      </div>

      {/* Historical Sentiment Benchmarks */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/70 text-center font-mono">
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800">
          <span className="text-[9px] font-sans font-bold text-slate-500 dark:text-slate-400 block uppercase">Yesterday</span>
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{prevDay}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800">
          <span className="text-[9px] font-sans font-bold text-slate-500 dark:text-slate-400 block uppercase">Last Week</span>
          <span className="text-xs font-black text-emerald-500 dark:text-emerald-400">{prevWeek}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800">
          <span className="text-[9px] font-sans font-bold text-slate-500 dark:text-slate-400 block uppercase">Last Month</span>
          <span className="text-xs font-black text-amber-500">{prevMonth}</span>
        </div>
      </div>
    </div>
  );
}
