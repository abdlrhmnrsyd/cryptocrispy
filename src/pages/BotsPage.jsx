import { useState } from 'react';
import { Cpu, Play, Pause, Settings, BarChart2, ShieldCheck, Activity } from 'lucide-react';
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
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-violet-400" />
            AI Algorithmic Trading Bots
          </h1>
          <p className="text-xs text-[#A1A1AA]">Automated order execution strategies powered by neural pattern detection</p>
        </div>
      </div>

      {/* Bot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
          >
            {/* Top Info & Status */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      bot.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'
                    }`}
                  />
                  <span className="text-xs font-extrabold tracking-wider uppercase text-white">
                    {bot.status}
                  </span>
                </div>
                <span className="text-[10px] text-[#71717A] font-mono">{bot.allocated} Allocated</span>
              </div>

              <h2 className="text-sm font-bold text-white mb-1">{bot.name}</h2>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed">{bot.strategy}</p>
            </div>

            {/* Performance Stats Grid */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-xs">
              <div>
                <span className="text-[9px] uppercase font-semibold text-[#71717A] block">30d Return</span>
                <span className="font-extrabold font-mono text-emerald-400">{bot.pnl30d}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-[#71717A] block">Win Rate</span>
                <span className="font-extrabold font-mono text-violet-300">{bot.winRate}%</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-[#71717A] block">Total Trades</span>
                <span className="font-mono text-white">{bot.totalTrades}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-[#71717A] block">Max Drawdown</span>
                <span className="font-mono text-red-400">{bot.drawdown}</span>
              </div>
            </div>

            {/* Active Pairs */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#71717A]">
              <span>Active Pairs:</span>
              {bot.pairs.map((p) => (
                <span key={p} className="px-1.5 py-0.5 rounded bg-[#18181B] border border-[#27272A] text-[#A1A1AA] font-mono">
                  {p}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#27272A]">
              <button
                onClick={() => toggleBotStatus(bot.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  bot.status === 'ACTIVE'
                    ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {bot.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{bot.status === 'ACTIVE' ? 'Pause Bot' : 'Activate Bot'}</span>
              </button>

              <button className="p-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white border border-[#27272A]">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
