import { useState } from 'react';
import { Cpu, Play, Pause, Settings } from 'lucide-react';
import { MOCK_BOTS } from '../services/mockCryptoData';

export default function BotsPage() {
  const [bots, setBots] = useState(MOCK_BOTS);

  const toggleBotStatus = (botId) => {
    setBots((prev) =>
      prev.map((b) =>
        b.id === botId ? { ...b, status: b.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : b
      )
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            AI Algorithmic Trading Bots
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Automated order execution strategies powered by neural pattern detection</p>
        </div>
      </div>

      {/* Bot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm dark:shadow-lg"
          >
            {/* Top Info & Status */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      bot.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-xs font-extrabold tracking-wider uppercase text-slate-900 dark:text-white">
                    {bot.status}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{bot.allocated} Allocated</span>
              </div>

              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{bot.name}</h2>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{bot.strategy}</p>
            </div>

            {/* Performance Stats Grid */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-400 dark:text-slate-500 block">30d Return</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{bot.pnl30d}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-400 dark:text-slate-500 block">Win Rate</span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{bot.winRate}%</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-400 dark:text-slate-500 block">Total Trades</span>
                <span className="text-slate-900 dark:text-white font-bold">{bot.totalTrades}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-400 dark:text-slate-500 block">Max Drawdown</span>
                <span className="text-red-600 dark:text-red-400 font-bold">{bot.drawdown}</span>
              </div>
            </div>

            {/* Active Pairs */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              <span>Active Pairs:</span>
              {bot.pairs.map((p) => (
                <span key={p} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  {p}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => toggleBotStatus(bot.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  bot.status === 'ACTIVE'
                    ? 'bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30'
                    : 'bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                }`}
              >
                {bot.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{bot.status === 'ACTIVE' ? 'Pause Bot' : 'Activate Bot'}</span>
              </button>

              <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
