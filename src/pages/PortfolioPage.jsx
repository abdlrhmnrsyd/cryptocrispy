import { Wallet, TrendingUp, ArrowUpRight, PieChart, ArrowDownRight, RefreshCw } from 'lucide-react';
import { MOCK_PORTFOLIO } from '../services/mockCryptoData';

export default function PortfolioPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-5 h-5 text-violet-400" />
            Institutional Portfolio
          </h1>
          <p className="text-xs text-[#A1A1AA]">Real-time asset balances, performance metrics, and asset allocation</p>
        </div>

        <button className="px-3 py-1.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white border border-[#27272A] text-xs font-semibold flex items-center gap-1.5 transition-colors w-fit">
          <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
          <span>Sync Exchange API</span>
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-1">
          <div className="text-xs text-[#71717A] uppercase font-semibold">Total Portfolio Balance</div>
          <div className="text-2xl font-black font-mono text-white">
            ${MOCK_PORTFOLIO.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{MOCK_PORTFOLIO.change24hPercent}% (+$1,245.80 24h)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-1">
          <div className="text-xs text-[#71717A] uppercase font-semibold">Total Unrealized P&L</div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            +${MOCK_PORTFOLIO.totalPnlAmount.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 font-semibold">
            +{MOCK_PORTFOLIO.totalPnlPercent}% All-Time Return
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-1">
          <div className="text-xs text-[#71717A] uppercase font-semibold">Allocated Assets</div>
          <div className="text-2xl font-black font-mono text-white">4 Crypto Assets</div>
          <div className="text-xs text-violet-400 font-semibold">64.4% BTC Dominance</div>
        </div>
      </div>

      {/* Grid: Asset Allocation & Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Allocation Breakdown (1 Col) */}
        <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-violet-400" />
            Asset Allocation
          </h2>

          <div className="space-y-3">
            {MOCK_PORTFOLIO.allocations.map((item) => (
              <div key={item.asset} className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-[#FAFAFA]">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name} ({item.asset})
                  </span>
                  <span className="font-mono text-[#A1A1AA]">{item.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#18181B] rounded-full overflow-hidden">
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
        <div className="lg:col-span-2 bg-[#111113] border border-[#27272A] rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white">Asset Holdings & Performance</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#27272A] text-[#71717A] pb-2 uppercase text-[10px]">
                  <th className="py-2.5 font-semibold">Asset</th>
                  <th className="py-2.5 font-semibold">Holdings</th>
                  <th className="py-2.5 font-semibold">Avg Buy</th>
                  <th className="py-2.5 font-semibold">Total Value</th>
                  <th className="py-2.5 font-semibold text-right">Unrealized P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]/50 font-mono">
                {MOCK_PORTFOLIO.allocations.map((item) => {
                  const pnl = ((item.value / (item.amount * item.avgBuy)) - 1) * 100;
                  return (
                    <tr key={item.asset} className="hover:bg-[#18181B]/50 transition-colors">
                      <td className="py-3 font-bold font-sans text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#27272A] flex items-center justify-center text-[10px]">
                          {item.asset}
                        </span>
                        {item.name}
                      </td>
                      <td className="py-3 text-white">
                        {item.amount} {item.asset}
                      </td>
                      <td className="py-3 text-[#A1A1AA]">${item.avgBuy.toLocaleString()}</td>
                      <td className="py-3 text-white font-bold">${item.value.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className={`font-bold ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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
