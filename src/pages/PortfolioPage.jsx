import { Wallet, TrendingUp, PieChart, RefreshCw } from 'lucide-react';
import { MOCK_PORTFOLIO } from '../services/mockCryptoData';

export default function PortfolioPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-500" />
            Institutional Portfolio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time asset balances, performance metrics, and asset allocation</p>
        </div>

        <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors w-fit shadow-xs">
          <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
          <span>Sync Exchange API</span>
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Portfolio Balance</div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            ${MOCK_PORTFOLIO.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{MOCK_PORTFOLIO.change24hPercent}% (+$1,245.80 24h)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Unrealized P&L</div>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            +${MOCK_PORTFOLIO.totalPnlAmount.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            +{MOCK_PORTFOLIO.totalPnlPercent}% All-Time Return
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Allocated Assets</div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">4 Crypto Assets</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">64.4% BTC Dominance</div>
        </div>
      </div>

      {/* Grid: Asset Allocation & Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Allocation Breakdown (1 Col) */}
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-500" />
            Asset Allocation
          </h2>

          <div className="space-y-3">
            {MOCK_PORTFOLIO.allocations.map((item) => (
              <div key={item.asset} className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name} ({item.asset})
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">{item.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Holdings Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Asset Holdings & Performance</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 pb-2 uppercase text-[10px]">
                  <th className="py-2.5 font-semibold">Asset</th>
                  <th className="py-2.5 font-semibold">Holdings</th>
                  <th className="py-2.5 font-semibold">Avg Buy</th>
                  <th className="py-2.5 font-semibold">Total Value</th>
                  <th className="py-2.5 font-semibold text-right">Unrealized P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 font-mono">
                {MOCK_PORTFOLIO.allocations.map((item) => {
                  const pnl = ((item.value / (item.amount * item.avgBuy)) - 1) * 100;
                  return (
                    <tr key={item.asset} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                          {item.asset}
                        </span>
                        {item.name}
                      </td>
                      <td className="py-3 text-slate-900 dark:text-white">
                        {item.amount} {item.asset}
                      </td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">${item.avgBuy.toLocaleString()}</td>
                      <td className="py-3 text-slate-900 dark:text-white font-bold">${item.value.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className={`font-bold ${pnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
