import { useState } from 'react';
import { Radio, ArrowUpRight, ArrowDownLeft, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

export default function WhaleAlertStream() {
  const [filter, setFilter] = useState('ALL');

  const alerts = [
    {
      id: 1,
      type: 'OUTFLOW',
      asset: 'BTC',
      amount: '2,840 BTC',
      usdValue: '$309.4M',
      from: 'Binance Hot Wallet',
      to: 'Institutional Custody (Coinbase)',
      time: '2m ago',
      impact: 'HIGH BULLISH',
      positive: true
    },
    {
      id: 2,
      type: 'TRANSFER',
      asset: 'ETH',
      amount: '45,000 ETH',
      usdValue: '$171.9M',
      from: 'Lido Staked ETH Vault',
      to: 'Unknown Whale 0x7a3...91e',
      time: '7m ago',
      impact: 'NEUTRAL ACCUMULATION',
      positive: true
    },
    {
      id: 3,
      type: 'INFLOW',
      asset: 'SOL',
      amount: '350,000 SOL',
      usdValue: '$86.0M',
      from: 'Whale 0x98f...4b2',
      to: 'Kraken Exchange',
      time: '14m ago',
      impact: 'POTENTIAL VOLATILITY',
      positive: false
    },
    {
      id: 4,
      type: 'OUTFLOW',
      asset: 'USDT',
      amount: '120,000,000 USDT',
      usdValue: '$120.0M',
      from: 'Tether Treasury',
      to: 'Bybit Derivatives Vault',
      time: '21m ago',
      impact: 'FRESH LIQUIDITY EXPANSION',
      positive: true
    }
  ];

  const filteredAlerts = alerts.filter(a => filter === 'ALL' || a.type === filter);

  return (
    <div className="bg-white dark:bg-[#0E1626] border border-slate-300 dark:border-slate-700/90 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-500">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Whale Alert & Smart Money</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Institutional On-Chain Tracking Feed</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#131D30] p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono">
          {['ALL', 'OUTFLOW', 'INFLOW'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                filter === tab ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-2.5">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#131D30] border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${alert.positive ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-500 border border-rose-500/30'}`}>
                {alert.type === 'OUTFLOW' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 dark:text-white text-xs font-mono">{alert.amount}</span>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">({alert.usdValue})</span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${alert.positive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-rose-500/10 text-rose-500 border-rose-500/30'}`}>
                    {alert.impact}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  {alert.from} → <span className="font-semibold text-slate-900 dark:text-slate-200">{alert.to}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              <span>{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
