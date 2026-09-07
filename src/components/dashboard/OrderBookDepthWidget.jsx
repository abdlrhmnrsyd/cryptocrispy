import { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, Activity } from 'lucide-react';

export default function OrderBookDepthWidget() {
  const [selectedAsset, setSelectedAsset] = useState('BTC');

  const bidRatio = 64; // 64% Long/Bid
  const askRatio = 36; // 36% Short/Ask

  const bids = [
    { price: 108920, amount: 14.52, depth: 95 },
    { price: 108850, amount: 28.10, depth: 80 },
    { price: 108780, amount: 42.60, depth: 65 },
    { price: 108700, amount: 65.40, depth: 45 },
  ];

  const asks = [
    { price: 108980, amount: 11.20, depth: 40 },
    { price: 109050, amount: 19.80, depth: 55 },
    { price: 109120, amount: 31.40, depth: 70 },
    { price: 109200, amount: 52.10, depth: 90 },
  ];

  return (
    <div className="bg-white dark:bg-[#0E1626] border border-slate-300 dark:border-slate-700/90 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Order Book Liquidity Depth</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Live Institutional Bids vs Asks Ratio</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
          <Activity className="w-3 h-3 text-blue-500" />
          <span>Spread $10.00 (0.01%)</span>
        </div>
      </div>

      {/* Bid vs Ask Pressure Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-mono font-bold">
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5" /> {bidRatio}% Bids ($14.8M)
          </span>
          <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
            {askRatio}% Asks ($8.3M) <ArrowDown className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-300 dark:border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-l-full transition-all duration-500"
            style={{ width: `${bidRatio}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-r-full transition-all duration-500"
            style={{ width: `${askRatio}%` }}
          />
        </div>
      </div>

      {/* Mini Depth Columns (Bids Left, Asks Right) */}
      <div className="grid grid-cols-2 gap-3 text-[11px] font-mono pt-1">
        {/* Bids Column */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
            <span>Bid Price</span>
            <span>Size (BTC)</span>
          </div>
          {bids.map((b, i) => (
            <div key={i} className="relative flex justify-between py-0.5 px-1 rounded hover:bg-emerald-500/10">
              <div
                className="absolute inset-y-0 right-0 bg-emerald-500/15 rounded pointer-events-none"
                style={{ width: `${b.depth}%` }}
              />
              <span className="font-bold text-emerald-600 dark:text-emerald-400 relative z-10">${b.price.toLocaleString()}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 relative z-10">{b.amount}</span>
            </div>
          ))}
        </div>

        {/* Asks Column */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-sans font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
            <span>Ask Price</span>
            <span>Size (BTC)</span>
          </div>
          {asks.map((a, i) => (
            <div key={i} className="relative flex justify-between py-0.5 px-1 rounded hover:bg-rose-500/10">
              <div
                className="absolute inset-y-0 left-0 bg-rose-500/15 rounded pointer-events-none"
                style={{ width: `${a.depth}%` }}
              />
              <span className="font-bold text-rose-600 dark:text-rose-400 relative z-10">${a.price.toLocaleString()}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 relative z-10">{a.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
