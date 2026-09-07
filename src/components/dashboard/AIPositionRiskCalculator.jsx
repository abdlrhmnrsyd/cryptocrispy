import { useState } from 'react';
import { Calculator, Zap, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

export default function AIPositionRiskCalculator() {
  const [positionType, setPositionType] = useState('LONG');
  const [entryPrice, setEntryPrice] = useState(108950);
  const [leverage, setLeverage] = useState(10);
  const [margin, setMargin] = useState(1000);

  // Computed Values
  const positionSize = margin * leverage;
  const targetTP = positionType === 'LONG' ? entryPrice * 1.072 : entryPrice * 0.928;
  const stopLoss = positionType === 'LONG' ? entryPrice * 0.978 : entryPrice * 1.022;
  const liqPrice = positionType === 'LONG'
    ? entryPrice * (1 - 1 / leverage * 0.9)
    : entryPrice * (1 + 1 / leverage * 0.9);

  const potentialProfit = positionSize * 0.072;
  const potentialLoss = positionSize * 0.022;
  const riskRewardRatio = (potentialProfit / potentialLoss).toFixed(2);

  return (
    <div className="bg-white dark:bg-[#0E1626] border border-slate-300 dark:border-slate-700/90 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-500">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">AI Position & Risk Calculator</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Leverage Simulator & R:R Optimizer</p>
          </div>
        </div>

        {/* Position Type Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
          <button
            onClick={() => setPositionType('LONG')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              positionType === 'LONG' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-white'
            }`}
          >
            LONG
          </button>
          <button
            onClick={() => setPositionType('SHORT')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              positionType === 'SHORT' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-500 hover:text-white'
            }`}
          >
            SHORT
          </button>
        </div>
      </div>

      {/* Margin Input & Leverage Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="text-[10px] font-sans font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
              Margin ($ USDT)
            </label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(Math.max(10, Number(e.target.value)))}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#131D30] border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-sans font-bold uppercase text-slate-500 dark:text-slate-400">
                Leverage
              </label>
              <span className="text-xs font-black font-mono text-blue-500">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Key Output Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-50 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[9px] font-sans uppercase font-bold text-slate-500 dark:text-slate-400 block">Total Position</span>
          <span className="font-extrabold text-slate-900 dark:text-white text-sm">${positionSize.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[9px] font-sans uppercase font-bold text-slate-500 dark:text-slate-400 block">Est. Liq Price</span>
          <span className="font-extrabold text-rose-500 text-sm">${Math.round(liqPrice).toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[9px] font-sans uppercase font-bold text-slate-500 dark:text-slate-400 block">Profit Target (TP)</span>
          <span className="font-extrabold text-emerald-500 text-sm">+${Math.round(potentialProfit).toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[9px] font-sans uppercase font-bold text-slate-500 dark:text-slate-400 block">Risk / Reward</span>
          <span className="font-extrabold text-blue-400 text-sm">1 : {riskRewardRatio}</span>
        </div>
      </div>

      {/* AI Recommendation Advice */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-xs text-blue-600 dark:text-blue-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="text-[11px] font-medium">
            AI recommends max <strong className="text-blue-400">12x leverage</strong> at current BTC implied volatility (IV 54.2%).
          </span>
        </div>
      </div>
    </div>
  );
}
