import { ChevronDown, PieChart } from 'lucide-react';

export default function AssetDonutChart() {
  const items = [
    { label: 'Bitcoin (BTC)', amount: '$52,480.20', percentage: '48.6%', color: '#3B82F6' },
    { label: 'Ethereum (ETH)', amount: '$28,910.50', percentage: '26.8%', color: '#06B6D4' },
    { label: 'Solana (SOL)', amount: '$16,420.00', percentage: '15.2%', color: '#8B5CF6' },
    { label: 'USDT Stable', amount: '$10,033.12', percentage: '9.4%', color: '#10B981' },
  ];

  return (
    <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-5 space-y-4 transition-all shadow-xs hover:shadow-lg">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Portfolio Asset Allocation</h3>
        </div>
        <button className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#121829] border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer">
          <span>✦ Real-Time</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* Donut Chart & Itemized Legend Row */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        {/* Segmented SVG Donut */}
        <div className="relative w-36 h-36 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* BTC segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="16"
              strokeDasharray="116 124"
              strokeDashoffset="0"
            />
            {/* ETH segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="16"
              strokeDasharray="64 176"
              strokeDashoffset="-118"
            />
            {/* SOL segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="16"
              strokeDasharray="36 204"
              strokeDashoffset="-184"
            />
            {/* USDT segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeDasharray="22 218"
              strokeDashoffset="-222"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Assets</span>
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">4 Crypto</span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 flex-1 text-xs w-full">
          {items.map((item) => (
            <div key={item.label} className="space-y-1 p-2 rounded-xl bg-slate-50 dark:bg-[#121829]/60 border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate font-semibold">{item.label}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-blue-500">{item.percentage}</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white font-mono pl-3.5 text-xs">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
