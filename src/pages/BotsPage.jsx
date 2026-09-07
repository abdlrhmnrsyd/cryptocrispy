import { useState } from 'react';
import { Bot, Play, Pause, Settings, Plus, Sparkles, X, CheckCircle2, TrendingUp, ShieldAlert } from 'lucide-react';
import { MOCK_BOTS } from '../services/mockCryptoData';

export default function BotsPage() {
  const [bots, setBots] = useState(MOCK_BOTS);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [newBotName, setNewBotName] = useState('');
  const [newBotStrategy, setNewBotStrategy] = useState('Neural Grid Scalper');
  const [newBotAllocation, setNewBotAllocation] = useState('10000');
  const [deployedToast, setDeployedToast] = useState(null);

  const toggleBotStatus = (botId) => {
    setBots((prev) =>
      prev.map((b) =>
        b.id === botId ? { ...b, status: b.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : b
      )
    );
  };

  const handleDeployBot = (e) => {
    e.preventDefault();
    if (!newBotName.trim()) return;

    const newBot = {
      id: Date.now(),
      name: newBotName,
      strategy: `${newBotStrategy} with adaptive volatility triggers and stop-loss bounds.`,
      status: 'ACTIVE',
      allocated: `$${parseInt(newBotAllocation).toLocaleString()}`,
      pnl30d: '+12.4%',
      winRate: '78.2%',
      drawdown: '-2.8%',
      pairs: ['BTC/USDT', 'SOL/USDT'],
    };

    setBots([newBot, ...bots]);
    setShowDeployModal(false);
    setNewBotName('');
    setDeployedToast(`AI Bot "${newBot.name}" successfully initiated and deployed!`);
    setTimeout(() => setDeployedToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-blue-600" />
            AI Algorithmic Trading Bots
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Autonomous order execution strategies powered by neural pattern detection & order flow anomalies
          </p>
        </div>

        <button
          onClick={() => setShowDeployModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-500/25 active:scale-95 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New AI Bot</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Active Running Bots</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {bots.filter((b) => b.status === 'ACTIVE').length} / {bots.length}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High execution uptime
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Capital Managed</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            $135,000
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Institutional risk parity
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Weighted 30d Alpha Return</span>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            +21.84%
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Outperforming benchmark
          </span>
        </div>
      </div>

      {/* Bot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
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
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{bot.winRate}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-400 dark:text-slate-500 block">Max Drawdown</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold">{bot.drawdown}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-semibold text-slate-400 dark:text-slate-500 block">Model</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">V2 Neural</span>
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
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  bot.status === 'ACTIVE'
                    ? 'bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                    : 'bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                }`}
              >
                {bot.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{bot.status === 'ACTIVE' ? 'Pause Bot' : 'Activate Bot'}</span>
              </button>

              <button
                onClick={() => alert(`Configuring parameters for ${bot.name}`)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
                title="Bot Configuration"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deploy Bot Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Bot className="w-4 h-4 text-blue-500" />
                <span>Deploy New AI Trading Bot</span>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDeployBot} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Bot Identifier Name</label>
                <input
                  type="text"
                  required
                  value={newBotName}
                  onChange={(e) => setNewBotName(e.target.value)}
                  placeholder="e.g., Alpha Surge BTC-SOL"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Algorithmic Strategy Model</label>
                <select
                  value={newBotStrategy}
                  onChange={(e) => setNewBotStrategy(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                >
                  <option>Neural Grid Scalper (Mean Reversion)</option>
                  <option>Whale Order Flow Momentum</option>
                  <option>DCA Liquidity Sweep Harvester</option>
                  <option>Triangular Cross-Exchange Arbitrage</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Allocated Capital ($ USD)</label>
                <input
                  type="number"
                  required
                  value={newBotAllocation}
                  onChange={(e) => setNewBotAllocation(e.target.value)}
                  placeholder="10000"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Initiate & Deploy Strategy</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {deployedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{deployedToast}</span>
        </div>
      )}
    </div>
  );
}
